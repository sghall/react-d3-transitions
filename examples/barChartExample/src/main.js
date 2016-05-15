import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Example from './components';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import configureStore from './store';
let store = configureStore();

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Example />
    </MuiThemeProvider>
	</Provider>, document.getElementById('content')
);
