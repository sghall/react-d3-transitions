import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';

export function sortByKey(key, ascending) {
  return function (a, b) {
    let result = 0;

    if (a[key] > b[key]) {
      result = ascending ? 1: -1;
    }
    if (a[key] < b[key]) {
      result = ascending ? -1: 1;
    }

    return result;
  };
}

export function getUpdateHandler(keyFunc) {
  return function({view, trbl, mounted, removed}, sortKey, data) {
    let nodes = {};

    let dims = [
      view[0] - trbl[1] - trbl[3],
      view[1] - trbl[0] - trbl[2]
    ];

    let x = scaleLinear()
      .range([0, dims[0]])
      .domain([0, max(data, d => d[sortKey])]);

    let y = scaleBand()
      .rangeRound([0, dims[1]])
      .padding(0.1)
      .domain(data.map(keyFunc));

    for (let i = 0; i < data.length; i++) {
      let val = data[i];
      let key = keyFunc(val);

      nodes[key] = {
        udid: key,
        data: val,
        size: [x(val[sortKey]), y.bandwidth()],
        yVal: y(key)
      };

      if (mounted[key] && !removed[key]) {
        nodes[key].mode = 'updating';
      } else {
        nodes[key].mode = 'mounting';
      }
    }

    for (let key in mounted) {
      if (!nodes[key] && !removed[key]) {
        nodes[key] = {
          udid: mounted[key].udid,
          data: mounted[key].data,
          size: mounted[key].size,
          yVal: mounted[key].yVal,
          mode: 'removing'
        };
      }
    }

    return {
      mounted: nodes,
      removed: {},
      sortKey: sortKey,
      xScale: x,
      yScale: y,
      isFetching: false
    };
  };
}
