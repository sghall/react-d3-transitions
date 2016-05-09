import {
  EXAMPLE_REMOVED_NODE,
  EXAMPLE_TOGGLED_NAME,
  EXAMPLE_UPDATE_PATHS
} from '../actions';

import { scaleLinear, scaleBand } from 'd3-scale';
import { getInitialValues } from './utils';

let [data, names, dates] = getInitialValues(200);
console.log('data: ', data, 'names: ', 'Dates: ', dates);

let initialState = {
  data: data,
  view: [500, 325],         // ViewBox: Width, Height
  trbl: [15, 10, 10, 30],   // Margins: Top, Right, Bottom, Left
  names: names,
  dates: dates,
  yScale: () => {},         // Ordinal y-scale
  xScale: () => {},         // Linear x-scale
  mounted: {},              // Currently Mounted Nodes
  removed: {}               // Nodes removed since last update
};

// function sortByKey(key, ascending) {
//   return function (a, b) {
//     let result = 0;
  
//     if (a[key] > b[key]) {
//       result = ascending ? 1: -1;
//     }
//     if (a[key] < b[key]) {
//       result = ascending ? -1: 1;
//     }

//     return result;
//   };
// }

// function getUpdateHandler(keyFunc) {
//   return function({view, trbl, mounted, removed}, sortKey, data) {
//     let nodes = {};

//     let dims = [
//       view[0] - trbl[1] - trbl[3],
//       view[1] - trbl[0] - trbl[2]
//     ];

//     let x = scaleLinear()
//       .range([0, dims[0]])
//       .domain([0, data.reduce((m, d) => m > d[sortKey] ? m: d[sortKey], 0)]);

//     let y = scaleBand()
//       .rangeRound([0, dims[1]])
//       .padding(0.1)
//       .domain(data.map(keyFunc));

//     for (let i = 0; i < data.length; i++) {
//       let val = data[i];
//       let key = keyFunc(val);

//       nodes[key] = {
//         udid: key,
//         data: val,
//         yVal: y(key),
//         xVal: x(val[sortKey])
//       };

//       if (mounted[key] && !removed[key]) {
//         nodes[key].type = 'UPDATING';
//       } else {
//         nodes[key].type = 'MOUNTING';
//       }
//     }

//     for (let key in mounted) {
//       if (!nodes[key] && !removed[key]) {
//         nodes[key] = {
//           udid: mounted[key].udid,
//           data: mounted[key].data,
//           yVal: mounted[key].yVal,
//           xVal: mounted[key].xVal,
//           type: 'REMOVING'
//         };
//       }
//     }

//     return {
//       mounted: nodes,
//       removed: {},
//       sortKey: sortKey,
//       xScale: x,
//       yScale: y,
//       isFetching: false
//     };
//   };
// }

// let update = getUpdateHandler(d => d.State);

function update(state, action) {
  let {index} = action;

  let names = [
    ...state.names.slice(0, index),
    {name: state.names[index].name, show: !state.names[index].show},
    ...state.names.slice(index + 1)
  ];

  return {names};
}


// function removedNode(state, udid) {
//   let removed = {};
//   removed[udid] = true;

//   return Object.assign({}, state.removed, removed);
// }

export function exampleReducer(state = initialState, action) {

  switch (action.type) {

  case EXAMPLE_TOGGLED_NAME:
    return Object.assign({}, state, update(state, action));

  case EXAMPLE_REMOVED_NODE:
    return state;

  case EXAMPLE_UPDATE_PATHS:
    return state;


  default:
    return state;
  }
}
