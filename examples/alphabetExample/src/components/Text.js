import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { interpolateObject, interpolateNumber } from 'd3-interpolate';

const duration = 750;

export class Text extends Component {

  componentDidMount() {
    this.isEntering(this.props, this.refs);
  }

  componentWillReceiveProps(next) {
    let {props, refs} = this;

    if (props.node !== next.node) {
      this.transition.stop();

      switch (next.node.type) {
      case 'ENTERING':
        return this.isEntering(next, refs);
      case 'UPDATING':
        return this.isUpating(props, next, refs);
      case 'EXITING':
        return this.isExiting(props, refs);
      default:
        throw new Error('Invalid Node Type!');
      }
    }
  }

  isEntering({node: {xVal}}, {node}) {

    node.setAttribute('x', xVal);

    let interp = interpolateObject({opacity: 1e-6, y: 0}, {opacity: 1, y: 200});
    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      let {opacity, y } = interp(t);
      node.setAttribute('y', y);
      node.setAttribute('opacity', opacity);
      if (t === 1) {
        this.transition.stop();
      }
    });
  }

  isUpating({node: {xVal, udid}, removeItem}, next, {node}) {

    let interp = interpolateNumber(xVal, next.node.xVal);
    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      node.setAttribute('x', interp(t));
      if (t === 1) {
        this.transition.stop();
      }
    });
  }

  isExiting({node: {udid}, removeItem}, {node}) {
    let interp = interpolateObject({y: 200, opacity: 1}, {y: 400, opacity: 1e-6});

    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      let { y, opacity } = interp(t);
      node.setAttribute('y', y);
      node.setAttribute('opacity', opacity);
      if (t === 1) {
        this.transition.stop();
        removeItem(udid);
      }
    }); 
  }

  componentWillUnmount() {
    this.transition.stop();
  }

  render() {
    let {props: {node: {udid, fill}}} = this;

    return (
      <text
        ref='node'
        dy='0.35em'
        fill={fill}
        opacity={1e-6}
      >{udid}</text>
    );
  }
}

Text.propTypes = {
  node: PropTypes.shape({
    udid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    xVal: PropTypes.number.isRequired
  }).isRequired,
  removeItem: PropTypes.func.isRequired
};
