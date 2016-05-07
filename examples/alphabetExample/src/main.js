import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Example from './components';
import DataGenerator from './components/DataGenerator';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import configureStore from './store';
let store = configureStore();

class App extends Component {
  render() {
    return (
      <div>
        <a href='https://github.com/sghall'>
          <img 
            style={{position: 'absolute', top: 0, right: 0, border: 0}}
            src='https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67' 
            alt='Fork me on GitHub' 
          />
          </a>
        <DataGenerator />
        <Example />
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <App />
    </MuiThemeProvider>
  </Provider>, document.getElementById('content')
);

