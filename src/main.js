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

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
};

class App extends Component {
  render() {
    return (
      <div 
        className='row'
        style={{backgroundColor: 'rgb(48, 48, 48)', minHeight: 1000}}
      >
        <Tabs>
          <Tab label="Item One" >
            <div className='col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1'>
              <Example />
            </div>
          </Tab>
          <Tab label="Item Two" >
            <div className='col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1'>
              <Example />
            </div>
          </Tab>
          <Tab label="Item Three" >
            <div className='col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1'>
              <Example />
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


