import {
  APP_REMOVE_NODE,
  APP_TOGGLE_NAME,
  APP_UPDATE_PATHS,
  APP_CHANGE_OFFSET
} from '../actions';

import { getInitialValues, getPathsAndScales } from './utils';

let [data, names, dates] = getInitialValues(150);

let initialState = {
  data: data,               // The raw dataset with all names and dates
  view: [500, 275],         // ViewBox: Width, Height
  trbl: [15, 10, 10, 40],   // Margins: Top, Right, Bottom, Left
  names: names,             // An object with fruti names and active flag
  dates: dates,             // An array of UTC dates in the data series
  offset: 'stacked',        // The current offset: stacked, stream or expanded
  yScale: () => {},         // y-scale default value
  xScale: () => {},         // x-scale default value
  mounted: {},              // Currently Mounted Nodes
  removed: {}               // Nodes removed since last update
};

function updateNodes(state, names, offset) {
  let {view, trbl, data, dates, mounted, removed} = state;

  let nodes = {};

  let dims = [
    view[0] - trbl[1] - trbl[3],
    view[1] - trbl[0] - trbl[2]
  ];

  let [paths, x, y] = getPathsAndScales(dims, data, names, dates, offset);

  for (let key in paths) {
    nodes[key] = {
      udid: key,
      path: paths[key]
    };

    if (mounted[key] && !removed[key]) {
      nodes[key].type = 'UPDATING';
    } else {
      nodes[key].type = 'ENTERING';
    }
  }

  for (let key in mounted) {
    if (!nodes[key] && !removed[key]) {
      nodes[key] = {
        udid: mounted[key].udid,
        path: mounted[key].path, 
        type: 'EXITING'
      };
    }
  }

  return {
    mounted: nodes,
    removed: {},
    names: names,
    dates: dates,
    offset: offset,
    xScale: x,
    yScale: y
  };
}

function toggleNode(state, action) {
  let {index} = action;

  let names = [
    ...state.names.slice(0, index),
    {name: state.names[index].name, show: !state.names[index].show},
    ...state.names.slice(index + 1)
  ];

  return updateNodes(state, names, state.offset);
}


function removedNode(state, udid) {
  let removed = {};
  removed[udid] = true;

  return Object.assign({}, state.removed, removed);
}

export function reducer(state = initialState, action) {

  switch (action.type) {

  case APP_TOGGLE_NAME:
    return Object.assign({}, state, toggleNode(state, action));

  case APP_REMOVE_NODE:
    return Object.assign({}, state, {
      removed: removedNode(state, action.udid)
    });

  case APP_UPDATE_PATHS:
    return Object.assign({}, state, updateNodes(state, state.names, state.offset));

  case APP_CHANGE_OFFSET:
    return Object.assign({}, state, updateNodes(state, state.names, action.name));

  default:
    return state;
  }
}
