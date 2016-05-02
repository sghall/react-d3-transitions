import {
  EXAMPLE_REQUEST_DATA,
  EXAMPLE_RECEIVE_DATA,
  EXAMPLE_REQUEST_FAIL,
  EXAMPLE_REMOVED_NODE,
  EXAMPLE_UPDATE_ORDER
} from '../actions/exampleActions';

import { getUpdateHandler, sortByKey } from '../utils';

let update = getUpdateHandler(d => d.State);

function removeNode(state, key) {
  let removed = {};
  removed[key] = true;

  return Object.assign({}, state.removed, removed);
}

let initialState = {
  view: [1000, 300],         // ViewBox: Width, Height
  trbl: [10, 10, 10, 30],    // Margins: Top, Right, Bottom, Lrft
  yScale: null,              // Ordinal y-scale (not actually needed)
  xScale: null,              // Linear x-scale for obtaining updated ticks
  mounted: {},               // Currently Mounted Nodes
  removed: {},               // Nodes removed since last update
  showTop: 15,               // Number of bars to swow
  sortKey: '18 to 24 Years', // The age group currently selected
  isFetching: false,         // Is the data fetching from server
  requestErr: false          // Was there an issue retrieving the data
};

export function exampleReducer(state = initialState, action) {

  switch (action.type) {

  case EXAMPLE_REQUEST_DATA:
    return Object.assign({}, state, {
      isFetching: true,
      requestErr: false
    });

  case EXAMPLE_REQUEST_FAIL:
    return Object.assign({}, state, {
      requestErr: true,
      isFetching: false
    });

  case EXAMPLE_RECEIVE_DATA:
    let data0 = action.data.sort(sortByKey(state.sortKey)).slice(0, state.showTop);
    return Object.assign({}, state, update(state, state.sortKey, data0));

  case EXAMPLE_UPDATE_ORDER:
    let data1 = action.data.sort(sortByKey(action.sortKey)).slice(0, state.showTop);
    return Object.assign({}, state, update(state, action.sortKey, data1));

  case EXAMPLE_REMOVED_NODE:
    return Object.assign({}, state, {
      removed: removeNode(state, action.item)
    });

  default:
    return state;
  }
}
