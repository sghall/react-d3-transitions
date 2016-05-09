import moment from 'moment';
import { area, stack, stackOffsetSilhouette } from 'd3-shape';
import { extent, merge, shuffle } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { fruits } from '../data/';

const data = shuffle(fruits).slice(0, 20);

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

export function getData(days) {
  let timeNow = moment();
  
  let dates = {};
  let names = {};

  for (let i = 0; i < data.length; i++) {
    let name = data[i].name;
    names[name] = genRandomSeries(days);
  }

  let items = [];

  for (let i = 0; i < days; i++) {
    let date = timeNow.clone().subtract(i, 'days').toISOString();
    dates[date] = true;

    let item = {date};

    for (let j = 0; j < data.length; j++) {
      let name = data[j].name;
      item[name] = Math.floor(names[name][i] * 100000);
    }

    items.push(item);
  }

  return [items, Object.keys(dates).sort(), Object.keys(names).sort()];
}

export function getNodePaths(dataSet, series, dates) {

  function getPath(x, y, layout) {
    return area()
      .x(d => x(d))
      .y1((d, i) => y(layout[i][1]))
      .y0((d, i) => y(layout[i][0]))(dates);
  }

  let layout = stack()
    .keys(series)
    .value((d, key) => d[key])
    .offset(stackOffsetSilhouette)(dataSet);

  let x = scaleBand()
    .range([0, dims[0]])
    .domain([dates[0], dates[dates.length - 1]]);

  let y = scaleLinear()
    .range([0, dims[1]])
    .domain(extent(merge(merge(layout))));

  let values = [];

  for (let k = 0; k < series.length; k++) {
    values.push({
      path: getPath(x, y, layout[k]),
      name: series[k]
    });
  }

  return values;
}


