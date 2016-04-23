import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { shuffle } from 'd3-array';
import { dataUpdate } from '../actions/exampleActions';

let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export class DataGenerator extends Component {

  componentDidMount() {
    let {props: { dispatch }} = this;

    dispatch(dataUpdate(alphabet));

    setInterval(() => {
      dispatch(dataUpdate(shuffle(alphabet)
        .slice(0, Math.floor(Math.random() * 26))
        .sort()));
    }, 2500);
  }

  render() {
    return null; 
  }
}

DataGenerator.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect((mapStateToProps))(DataGenerator);

