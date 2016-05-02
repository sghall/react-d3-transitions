import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container } from './common/Container';
import { Bar } from './Bar';
import { fetchData, updateSortOrder, removedNode } from '../actions/exampleActions';

let ages = ['Under 5 Years', '5 to 13 Years', '14 to 17 Years', '18 to 24 Years', '16 Years and Over', '18 Years and Over', '15 to 44 Years', '45 to 64 Years', '65 Years and Over', '85 Years and Over'];

export class Example extends Component {


  componentDidMount() {
    let { dispatch } = this.props;

    dispatch(fetchData());
  }

  removeItem(key) {
    let { dispatch } = this.props;
    dispatch(removedNode(key));
  }

  render() {
    let {view, trbl, mounted, dispatch, sortKey} = this.props;


    let barNodes = Object.keys(mounted).map(key => {
      let bar = mounted[key];
      return (
        <Bar 
          key={key}
          data={bar}
          removeNode={this.removeItem.bind(this)}
        />
      );
    });

    let buttons = ages.map(age => {
      return (
        <div
          className='col-md-2'
          style={{
            margin: 2,
            borderRadius: 3,
            cursor: 'pointer',
            color: sortKey === age ? '#fff': '#333',
            backgroundColor: sortKey === age ? 'rgba(0,0,0,0.6)': 'rgba(0,0,0,0.3)'
          }}
          onClick={() => dispatch(updateSortOrder(age))}
        >{age}</div>
      );
    });

    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <h3>React Transitions</h3>
            <p>Enter, update and exit pattern using React 15.0, D3 4.0 and Redux</p>
          </div>
        </div>
        <div className='row'>
          {buttons.slice(0, 5)}
        </div>
        <div className='row'>
          {buttons.slice(5)}
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <a className='pull-right' href='https://bl.ocks.org/mbostock/raw/3808234/'>Code on Github</a>
            <a className='pull-left' href='https://bl.ocks.org/mbostock/raw/3808234/'>Mike Bosktock's Original</a>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <Container view={view} trbl={trbl}>
              {barNodes}
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

Example.propTypes = {
  view: PropTypes.array.isRequired,
  trbl: PropTypes.array.isRequired,
  sortKey: PropTypes.string.isRequired,
  mounted: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { example } = state;

  return {
    view: example.view,
    trbl: example.trbl,
    sortKey: example.sortKey,
    mounted: example.mounted
  };
}

export default connect(mapStateToProps)(Example);

