import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container } from './common/Container';
import { Bar } from './Bar';
import { removedItem, fetchData } from '../actions/exampleActions';

export class Example extends Component {


  componentDidMount() {
    let { dispatch } = this.props;

    dispatch(fetchData());
  }

  removeItem(letter) {
    let { dispatch } = this.props;
    dispatch(removedItem(letter));
  }

  render() {
    let { view, trbl, mounted } = this.props;


    let barNodes = Object.keys(mounted).map(key => {
      let bar = mounted[key];
      return (
        <Bar 
          key={bar.udid}
          data={bar}
          removeItem={this.removeItem.bind(this)}
        />
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

