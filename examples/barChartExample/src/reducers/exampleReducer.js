import {
  EXAMPLE_REQUEST_DATA,
  EXAMPLE_RECEIVE_DATA,
  EXAMPLE_REQUEST_FAIL,
  EXAMPLE_REMOVED_NODE,
  EXAMPLE_UPDATE_ORDER,
  EXAMPLE_UPDATE_COUNT
} from '../actions/exampleActions';

import { getUpdateHandler, sortByKey } from '../utils';
import { data } from '../data';

let update = getUpdateHandler(d => d.State);

function removedNode(state, udid) {
  let removed = {};
  removed[udid] = true;

  return Object.assign({}, state.removed, removed);
}

let initialState = {
  data: data,
  view: [500, 325],         // ViewBox: Width, Height
  trbl: [15, 10, 10, 30],   // Margins: Top, Right, Bottom, Lrft
  yScale: null,             // Ordinal y-scale (not actually needed)
  xScale: null,             // Linear x-scale for obtaining updated ticks
  mounted: {},              // Currently Mounted Nodes
  removed: {},              // Nodes removed since last update
  showTop: 15,              // Number of bars to swow
  sortKey: 'Under 5 Years'  // The age group currently selected
};

export function exampleReducer(state = initialState, action) {
  let data;

  switch (action.type) {

  case EXAMPLE_UPDATE_ORDER:
    data = state.data.sort(sortByKey(action.sortKey)).slice(0, state.showTop);
    return Object.assign({}, state, update(state, action.sortKey, data));

  case EXAMPLE_UPDATE_COUNT:
    data = state.data.sort(sortByKey(state.sortKey)).slice(0, action.topN);
    return Object.assign({}, state, update(state, state.sortKey, data), {showTop: action.topN});

  case EXAMPLE_REMOVED_NODE:
    return Object.assign({}, state, {
      removed: removedNode(state, action.udid)
    });

  default:
    return state;
  }
}
