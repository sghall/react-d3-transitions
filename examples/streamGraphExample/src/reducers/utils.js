import moment from 'moment';
import { area, stack, stackOffsetSilhouette } from 'd3-shape';
import { extent, merge, range, shuffle } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { fruits } from '../data/';

const data = shuffle(fruits).slice(0, 20);

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

export function getData(m, dims) {
  let timeNow = moment();
  let dataSet = [];
  let xDomain = {}; // Dates
  let zDomain = {}; // Series

  for (let i = 0; i < m; i++) {
    let date = timeNow.subtract(i, 'days').toISOString();
    xDomain[date] = true;

    let item = {date};
    let vals = genRandomSeries(data.length);
    
    for (let j = 0; j < data.length; j++) {
      let name = data[j].name;
      zDomain[name] = true;
      item[name] = Math.floor(vals[j] * 10000);
    }

    dataSet.push(item);
  }

  console.log(dataSet);

  xDomain = Object.keys(xDomain);
  zDomain = Object.keys(zDomain);

  let layout = stack()
    .keys(zDomain)
    .value((d, k) => d[k])
    .offset(stackOffsetSilhouette)(dataSet);

  let xScale = scaleBand()
    .range([0, dims[0]])
    .domain(xDomain);

  console.log('layout', layout);
  // yDomain = extent(merge(merge(layout)));

  // let yScale = scaleLinear()
  //   .range([0, dims[1]])
  //   .domain(yDomain);

  // let result = [];

  // for (let k = 0; k < zDomain.length; k++) {
  //   series[zDomain[k]].path = area()
  //     .x(d => xScale(d))
  //     .y1((d, i) => yScale(layout[k][i][1]))
  //     .y0((d, i) => yScale(layout[k][i][0]))(xDomain);

  //   series[zDomain[k]].name = zDomain[k];

  //   result.push(series[zDomain[k]]);
  // }

  return [];
} 


