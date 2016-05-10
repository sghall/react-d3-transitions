import React,
 { Component,
 PropTypes } from 'react';
import { connect } from 'react-redux';

// Action Creator Functions
import { updatePaths,
 toggledName,
 removedNode } from '../actions';

// Material UI Components
import { Table,
 TableRow,
 TableRowColumn,
 TableBody } from 'material-ui/table';
import {Card,
 CardHeader } from 'material-ui/Card';
import Slider from 'material-ui/Slider';
import FlatButton from 'material-ui/FlatButton';

// Local Example Components
import { Chart } from './Chart';
import { Axis } from './Axis';
import { Path } from './Path';

import { utcFormat } from 'd3-time-format';
const parseDate = utcFormat('%-d/%-m/%Y');
import { scaleOrdinal } from 'd3-scale';

export class Example extends Component {

  constructor(props) {
    super(props);

    let colors = scaleOrdinal()
      .domain(this.props.names.map(d => d.name))
      .range([
        '#9C6744',
        '#C9BEB9',
        '#CFA07E',
        '#C4BAA1',
        '#C2B6BF',
        '#8FB5AA',
        '#85889E',
        '#9C7989',
        '#91919C',
        '#99677B',
        '#36352B',
        '#33332F',
        '#2B242A',
        '#918A59',
        '#6E676C',
        '#6E4752',
        '#6B4A2F',
        '#998476',
        '#8A968D',
        '#968D8A',
        '#968D96',
        '#CC855C',
        '#967860',
        '#929488',
        '#949278',
        '#A0A3BD',
        '#BD93A1',
        '#65666B',
        '#6B5745',
        '#6B6664',
        '#695C52',
        '#56695E',
        '#69545C',
        '#565A69',
        '#696043',
        '#63635C',
        '#636150',
        '#333131',
        '#332820',
        '#302D30',
        '#302D1F',
        '#2D302F',
        '#CFB6A3'
      ]);

    this.state ={
      duration: 1000,
      showTopN: 15,
      colorMap: colors
    };
  }

  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(updatePaths());
  }

  removeItem(key) {
    let {dispatch} = this.props;
    dispatch(removedNode(key));
  }

  setDuration(e,
   value) {
    this.setState({
      duration: Math.floor(value * 10000)
    });
  }

  setShowTopN(e,
   value) {
    this.setState({
      showTopN: Math.floor(value * 20) + 5
    });
  }

  render() {
    let {view,
     trbl,
     names,
     mounted,
     dispatch,
     xScale,
     yScale} = this.props;
    let {duration,
     showTopN,
     colorMap} = this.state;

    let pathNodes =Object.keys(mounted).map(key => {
      let node = mounted[key];
      return (
        <Path 
          key={key}
          node={node}
          fill={colorMap(key)}
          xScale={xScale}
          yScale={yScale}
          duration={duration}
          removeNode={this.removeItem.bind(this)}
        />
      );
    });

    let tableRows = names.map(fruit => {
      return (
        <TableRow
          key={fruit.name}
          selected={fruit.show === true} 
          style={{cursor: 'pointer'}}
        >
          <TableRowColumn>{fruit.name}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <Card>
        <CardHeader
          title='React Chart Transitions'
          subtitle='Enter,
           update and exit pattern using React 15.0,
           D3 4.0 and Redux'
          actAsExpander={false}
          showExpandableButton={false}
        />
        <div className='row' style={{marginLeft: 0,
         marginRight: 0}}>
          <div className='col-md-6'>
            <span>Show Top {showTopN} States:</span>
            <Slider
              style={{margin: '5px 0px'}}
              defaultValue={0.5}
              onChange={this.setShowTopN.bind(this)}
              onDragStop={() => dispatch(toggledName(showTopN))}
            />
          </div>
          <div className='col-md-6'>
            <span>Transition Duration: {(duration / 1000).toFixed(1)} Seconds</span>
            <Slider
              style={{margin: '5px 0px'}}
              defaultValue={0.1}
              onChange={this.setDuration.bind(this)}
            />
          </div>
        </div>
        <div className='row' style={{margin: '20px 0px'}}>
          <div className='col-md-12'>
            <h4>Top States by Age Bracket,
             2008</h4>
            <p>The bar chart shows the top states for the selected age bracket sorted by population percentage.</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'>
            <Table
              multiSelectable={true}
              wrapperStyle={{width: '100%'}}
              onCellClick={d => dispatch(toggledName(d))}
            >
              <TableBody
                deselectOnClickaway={false}
              >
                {tableRows}
              </TableBody>
            </Table>
          </div>
          <div className='col-md-8' style={{padding: 0}}>
            <Chart view={view} trbl={trbl}>
              {pathNodes}
              <Axis
                xScale={xScale}
                yScale={yScale}
                format={parseDate}
                duration={duration}
              />
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
  dates: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  mounted: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {example} = state;

  return {
    view: example.view,
    trbl: example.trbl,
    names: example.names,
    dates: example.dates,
    xScale: example.xScale,
    yScale: example.yScale,
    mounted: example.mounted
  };
}

export default connect(mapStateToProps)(Example);
