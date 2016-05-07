import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Material UI Components
import {Card, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { Chart } from './Chart';
import { Text } from './Text';
import { removeItem } from '../actions/exampleActions';

export class Example extends Component {

  removeItem(letter) {
    let { dispatch } = this.props;
    dispatch(removeItem(letter));
  }

  render() {
    let { mounted } = this.props;
    let view = [1000, 420];
    let trbl = [0, 10, 10, 10];

    let textNodes = Object.keys(mounted).map(key => {
      return (
        <Text 
          key={key}
          data={mounted[key]}
          removeItem={this.removeItem.bind(this)}
        />
      );
    });

    return (
      <Card>
        <CardHeader
          title="React Chart Transitions"
          subtitle="Enter, update and exit pattern using React 15.0, D3 4.0 and Redux"
          actAsExpander={false}
          showExpandableButton={false}
        />
        <div className='row' style={{margin: '20px 0px'}}>
          <div className='col-md-12'>
            <h4>General Update Pattern</h4>
            <p>Adapted from the <a href='https://bl.ocks.org/mbostock/3808234'>original example</a> from Mike Bostock</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12' style={{padding: 0}}>
            <Chart view={view} trbl={trbl}>
              {textNodes}
            </Chart>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-12'>
            <div className='pull-left'>
              <FlatButton
                linkButton={true}
                label='Mike Bostock Original'
                href='https://bost.ocks.org/mike/constancy/'
                target='_blank'
              />
            </div>
            <div className='pull-right'>
              <FlatButton
                linkButton={true}
                label='GitHub Link'
                href='https://github.com/callemall/material-ui'
                target='_blank'
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

Example.propTypes = {
  mounted: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { example } = state;

  return {
    mounted: example.mounted
  };
}

export default connect(mapStateToProps)(Example);

