<h2>React D3 Chart Transitions</h2>
<h4>Smooth transitions with no contention over the DOM</h4>

This repo contains several examples of using React 15.0 in conjunction with the new D3 4.0 ES6 modules.  Each example is a mini Redux app that you can check out locally using the instructions below.

The only assumptions are that you have Webpack and ESlint installed globally...
```html
npm install webpack eslint -g
```

<h2>Examples:</h2>
<h3>Stacked Chart Example</h3>
<img src="README/stacked.png" height="250px"/>
```html
Download the repo...

cd examples/stackedChartExample
npm install
webpack --watch
python -m SimpleHTTPServer 7070 (or use your favorite local server!)

Go to http://localhost:7070/

For better performance you can use the production webpack config...
webpack --config webpack.prod.config.js --progress --profile --colors

For even better performance you can remove the redux-logger from store.js
```

<h3>Bar Chart Example</h3>
<img src="README/bar.png" height="250px"/>
```html
Download the repo...

$ cd examples/barChartExample
$ npm install
$ webpack
$ python -m SimpleHTTPServer 7070 (or use your favorite local server!)

Go to http://localhost:7070/

For better performance you can use the production webpack config...
$ webpack --config webpack.prod.config.js --progress --profile --colors

For even better performance you can remove the redux-logger from store.js
```

<h3>Alphabet Example</h3>
<img src="README/alphabet.png" height="250px"/>
```html
Download the repo...

$ cd examples/alphabetExample
$ npm install
$ webpack
$ python -m SimpleHTTPServer 7070 (or use your favorite local server!)

Go to http://localhost:7070/

For better performance you can use the production webpack config...
$ webpack --config webpack.prod.config.js --progress --profile --colors

For even better performance you can remove the redux-logger from store.js
```



