import moment from 'moment';
import { area, stack, stackOffsetNone, stackOffsetSilhouette, stackOffsetExpand } from 'd3-shape';
import { extent, merge, shuffle } from 'd3-array';
import { scaleUtc, scaleLinear } from 'd3-scale';
import { utcParse } from 'd3-time-format';
import { fruits } from '../data/';

const data = shuffle(fruits).slice(0, 10);

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

  return a.map(d => +Math.max(0, d).toFixed(3));
}

export function getInitialValues(days) {
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
    item.total = 0;

    for (let j = 0; j < data.length; j++) {
      let label = data[j].name;
      let value = Math.floor(names[label][i] * 1000); 
      item[label] = value;
      item.total += value;
    }

    items.push(item);
  }

  return [
    items,
    Object.keys(names).sort().map(d => ({name: d, show: true})),
    Object.keys(dates).sort()
  ];
}

function getPath(x, y, yVals, dates) {
  return area()
    .x(d => x(d))
    .y0((d, i) => y(yVals[i][0]))
    .y1((d, i) => y(yVals[i][1]))(dates);
}

export function getPathsAndScales(dims, data, names, dates, offset) {

  names = names.filter(d => d.show === true).map(d => d.name);
  dates = dates.map(d => utcParse('%Y-%m-%dT%H:%M:%S.%LZ')(d));

  let layoutOffset = stackOffsetNone;

  if (offset === 'stream') {
    layoutOffset = stackOffsetSilhouette;
  } else if (offset === 'expand') {
    layoutOffset = stackOffsetExpand;
  }

  let layout = stack()
    .keys(names)
    .value((d, key) => d[key])
    .offset(layoutOffset)(data);

  let x = scaleUtc()
    .range([0, dims[0]])
    .domain([dates[0], dates[dates.length - 1]]);

  let y = scaleLinear()
    .range([dims[1], 0])
    .domain(extent(merge(merge(layout))));

  let paths = {};

  for (let k = 0; k < names.length; k++) {
    paths[names[k]] = getPath(x, y, layout[k], dates);
  }

  return [paths, x, y];
}


