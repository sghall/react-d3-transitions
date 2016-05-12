import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePaths, toggledName, removedNode, alterOffset } from '../actions';
import { Table, TableRow, TableRowColumn, TableBody } from 'material-ui/table';
import { Card, CardHeader } from 'material-ui/Card';
import Slider from 'material-ui/Slider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Chart } from '../components/Chart';
import { XAxis } from '../components/XAxis';
import { Path } from '../components/Path';

import { utcFormat } from 'd3-time-format';
const parseDate = utcFormat('%-d/%-m/%Y');

import { scaleOrdinal } from 'd3-scale';

export class Example extends Component {

  constructor(props) {
    super(props);

    let colors = scaleOrdinal()
      .domain(this.props.names.map(d => d.name))
      .range(['#9C6744', '#C9BEB9', '#CFA07E', '#C4BAA1', '#C2B6BF', '#8FB5AA', '#85889E', '#9C7989', '#91919C', '#99677B', '#918A59', '#6E676C', '#6E4752', '#6B4A2F', '#998476', '#8A968D', '#968D8A', '#968D96', '#CC855C', '#967860', '#929488', '#949278', '#A0A3BD', '#BD93A1', '#65666B', '#6B5745', '#6B6664', '#695C52', '#56695E', '#69545C', '#565A69', '#696043', '#63635C', '#636150', '#333131', '#332820', '#302D30', '#302D1F', '#2D302F', '#CFB6A3']);

    this.state = {duration: 1000, colorMap: colors, activeName: ''};
  }

  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(updatePaths());
  }

  removeItem(key) {
    let {dispatch} = this.props;
    dispatch(removedNode(key));
  }

  setDuration(e, value) {
    this.setState({
      duration: Math.floor(value * 10000)
    });
  }

  setActiveName(name) {
    this.setState({
      activeName: name
    });
  }

  toggleName(index) {
    let { dispatch } = this.props;
    dispatch(toggledName(index));
  }

  render() {
    let {view, trbl, names, mounted, dispatch, offset, xScale, yScale} = this.props;
    let {duration, colorMap, activeName} = this.state;

    let pathNodes = Object.keys(mounted).map(key => {
      let node = mounted[key];
      return (
        <Path 
          key={key} node={node} duration={duration}
          fill={key === activeName ? '#FF4C4C': colorMap(key)}
          xScale={xScale} yScale={yScale}
          removeNode={this.removeItem.bind(this)}
          makeActive={this.setActiveName.bind(this, key)}
        />
      );
    });

    let tableRows = names.map(item => {
      return (
        <TableRow
          key={item.name}
          selected={item.show === true}
          onMouseOver={this.setActiveName.bind(this, item.name)} 
          style={{
            cursor: 'pointer', 
            backgroundColor: item.name === activeName ? 'red': 'rgba(0,0,0,0)'
          }}
        >
          <TableRowColumn>{item.name}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <Card>
        <CardHeader
          title='React Chart Transitions'
          subtitle='Enter, update and exit pattern using React 15.0, D3 4.0 and Redux'
          actAsExpander={false}
          showExpandableButton={false}
        />
        <div className='row' style={{marginLeft: 0, marginRight: 0}}>
          <div className='col-md-5 col-sm-5'>
            <div className='row'>
              <div className='col-md-5 col-sm-5'style={{paddingLeft: 20}}>
                <span>Chart Offset:</span>
                <RadioButtonGroup 
                  name='offsets'
                  valueSelected={offset}
                  onChange={(e, d) => dispatch(alterOffset(d))}
                >
                  <RadioButton
                    value="stacked"
                    label="Stacked"
                  />
                  <RadioButton
                    value="stream"
                    label="Stream"
                  />
                  <RadioButton
                    value="expand"
                    label="Expand"
                  />
                </RadioButtonGroup>
              </div>
              <div className='col-md-7 col-sm-7'>
                <div className='row'>
                  <div className='col-md-12 col-sm-12'>
                    <span>Transition Duration: {(duration / 1000).toFixed(1)}</span>
                    <Slider
                      style={{margin: '10px 0px'}}
                      defaultValue={0.1}
                      onChange={this.setDuration.bind(this)}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12 col-sm-12'>
                    <RaisedButton
                      primary={true}
                      label='Reload'
                      onClick={() => location.reload()}
                      style={{width: '100%'}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6 col-sm-7'>
            <h4 style={{margin: 0}}>Random Counts of Fruits Over Time</h4>
            <p>This data is completely fictitious.  It's creating random series of data for 20 randomly chosen fruit names. It uses the same data generator used in Mike Bostock's <a href='https://bl.ocks.org/mbostock/4060954'>stream graph example</a>.</p>
          </div>
        </div>
        <div className='row' style={{marginTop: 10}}>
          <div
            className='col-md-3 col-sm-3'
            onMouseLeave={this.setActiveName.bind(this, '')}
          >
            <Table
              height={'550px'}
              multiSelectable={true}
              wrapperStyle={{width: '100%'}}
              onCellClick={d => this.toggleName(d)}
            >
              <TableBody
                deselectOnClickaway={false}
              >
                {tableRows}
              </TableBody>
            </Table>
          </div>
          <div
            className='col-md-8 col-sm-8'
            style={{padding: 0}}
            onMouseLeave={this.setActiveName.bind(this, '')} 
          >
            <Chart view={view} trbl={trbl}>
              {pathNodes}
              <XAxis
                xScale={xScale}
                yScale={yScale}
                format={parseDate}
                duration={duration}
              />
              <text
                x={5} y={15} 
                fill='#fff'
                style={{pointerEvents: 'none'}}
              >{activeName}</text>
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
  view: PropTypes.array.isRequired,
  trbl: PropTypes.array.isRequired,
  names: PropTypes.array.isRequired,
  offset: PropTypes.string.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  mounted: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  let {view, trbl, names, mounted, offset, xScale, yScale} = state;
  return {view, trbl, names, mounted, offset, xScale, yScale};
}

export default connect(mapStateToProps)(Example);
