import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container } from './common/Container';
import { Text } from './Text';
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
    let { mounted } = this.props;
    let view = [1000, 500];
    let trbl = [35, 50, 50, 50];

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
              {textNodes}
            </Container>
          </div>
        </div>
      </div>
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

