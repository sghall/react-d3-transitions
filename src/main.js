import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Example from './components/Example';
import {Tabs, Tab} from 'material-ui/Tabs';


import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from './store';
let store = configureStore();

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div 
        className='container'
      >
        <Tabs>
          <Tab label="Item One" >
            <div className='col-md-12 col-sm-12'>
              <Example />
            </div>
          </Tab>
          <Tab label="Item Two" >
            <div className='col-md-12 col-sm-12'>
              <h1>Example</h1>
              <p>Some more text for this example.</p>
            </div>
          </Tab>
          <Tab label="Item Three" >
            <div className='col-md-12 col-sm-12'>
              <h1>Example</h1>
              <p>Some more text for this example.</p>
            </div>
          </Tab>
        </Tabs>
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


