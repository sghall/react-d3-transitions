import { scaleLinear, scaleBand } from 'd3-scale';

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
      .domain([0, data.reduce((m, d) => m > d[sortKey] ? m: d[sortKey], 0)];

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
        yVal: y(key),
        xVal: x(val[sortKey])
      };

      if (mounted[key] && !removed[key]) {
        nodes[key].type = 'UPDATING';
      } else {
        nodes[key].type = 'MOUNTING';
      }
    }

    for (let key in mounted) {
      if (!nodes[key] && !removed[key]) {
        nodes[key] = {
          udid: mounted[key].udid,
          data: mounted[key].data,
          yVal: mounted[key].yVal,
          xVal: mounted[key].xVal,
          type: 'REMOVING'
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
