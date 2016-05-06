import {
  EXAMPLE_REQUEST_DATA,
  EXAMPLE_RECEIVE_DATA,
  EXAMPLE_REQUEST_FAIL,
  EXAMPLE_REMOVED_NODE,
  EXAMPLE_UPDATE_ORDER,
  EXAMPLE_UPDATE_COUNT
} from '../actions/exampleActions';

import { getUpdateHandler, sortByKey } from '../utils';

let update = getUpdateHandler(d => d.State);

function removedNode(state, udid) {
  let removed = {};
  removed[udid] = true;

  return Object.assign({}, state.removed, removed);
}

let initialState = {
  data: [],
  view: [500, 325],            // ViewBox: Width, Height
  trbl: [15, 10, 10, 30],       // Margins: Top, Right, Bottom, Lrft
  yScale: null,                 // Ordinal y-scale (not actually needed)
  xScale: null,                 // Linear x-scale for obtaining updated ticks
  mounted: {},                  // Currently Mounted Nodes
  removed: {},                  // Nodes removed since last update
  showTop: 15,                  // Number of bars to swow
  sortKey: 'Under 5 Years',     // The age group currently selected
  isFetching: false,            // Is the data fetching from server
  requestErr: false             // Was there an issue retrieving the data
};

export function exampleReducer(state = initialState, action) {
  let data;

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
    data = action.data.sort(sortByKey(state.sortKey)).slice(0, state.showTop);
    return Object.assign({}, state, update(state, state.sortKey, data), {data: action.data});

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
