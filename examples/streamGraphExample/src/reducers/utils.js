import moment from 'moment';
import { area, stack, stackOffsetSilhouette } from 'd3-shape';
import { extent, merge, range } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';

export let colors = scaleOrdinal()
  .range(range(100).map(() => {
    return `rgb(0,${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
  }));

// Adapted from https://bl.ocks.org/mbostock/4060954
function genRandomSeries(m) {

  function bump(a) {
    let x = 1 / (0.1 + Math.random());
    let y = 2 * Math.random() - 0.5;
    let z = 10 / (0.1 + Math.random());

    for (let i = 0; i < m; i++) {
      let w = (i / m - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }

  let a = [];

  for (let i = 0; i < m; ++i) {
    a[i] = 0;
  }
  
  for (let i = 0; i < 5; ++i) {
    bump(a);
  } 
  return a.map(d => +Math.max(0, d).toFixed(5));
}

function leftpad(d, l) {  // :)
  d = `${d}`;

  let i = -1;

  l = l - d.length;

  while (++i < l) {
    d = `0${d}`;
  }

  return d;
}

export function getData(n, m, dims) {
  let dataSet = [];
  let xDomain = {};
  let yDomain = [];
  let zDomain = {};

  let series = {}; 

  for (let i = 0; i < n; i++) {
    series[`series-${i}`] = genRandomSeries(m);
  }

  for (let i = 0; i < m; i++) {
    let xVal = `x-${leftpad(i, 5)}`;
    let data = {xVal: xVal};
    xDomain[xVal] = true;

    for (let key in series) {
      data[key] = series[key][i];
    }
    dataSet.push(data);
  }

  xDomain = Object.keys(xDomain);
  zDomain = Object.keys(series);

  let layout = stack()
    .keys(zDomain)
    .value((d, k) => d[k])
    .offset(stackOffsetSilhouette)(dataSet);

  let xScale = scaleBand()
    .range([0, dims[0]])
    .domain(xDomain);

  yDomain = extent(merge(merge(layout)));

  let yScale = scaleLinear()
    .range([0, dims[1]])
    .domain(yDomain);

  let result = [];

  for (let k = 0; k < zDomain.length; k++) {
    series[zDomain[k]].path = area()
      .x(d => xScale(d))
      .y1((d, i) => yScale(layout[k][i][1]))
      .y0((d, i) => yScale(layout[k][i][0]))(xDomain);

    series[zDomain[k]].name = zDomain[k];

    result.push(series[zDomain[k]]);
  }

  return result;
} 


