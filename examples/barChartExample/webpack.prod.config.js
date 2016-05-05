/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}})
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
