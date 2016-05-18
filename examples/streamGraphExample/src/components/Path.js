import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { interpolateNumber, interpolateString } from 'd3-interpolate';

export class Path extends Component {

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
        return this.isUpating(next, refs);
      case 'EXITING':
        return this.isExiting(props, refs);
      default:
        throw new Error('Invalid Node Type!');
      }
    }
  }

  isEntering({node: {path}, duration}, {node}) {

    node.setAttribute('opacity', 1e-6);
    node.setAttribute('d', path);
    node.style['cursor'] = 'pointer';
    node.style['pointer-events'] = 'all';

    let interp = interpolateNumber(1e-6, 0.8);

    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      node.setAttribute('opacity', interp(t));
      if (t === 1) {
        this.transition.stop();
      }
    });
  }

  isUpating({node: {path}, duration}, {node}) {

    node.setAttribute('opacity', 0.8);

    let interp = interpolateString(node.getAttribute('d'), path);

    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      node.setAttribute('d', interp(t));
      if (t === 1) {
        this.transition.stop();
      }
    });
  }

  isExiting({node: {udid}, removeNode}, {node}) {

    node.setAttribute('opacity', 1e-6);
    node.style['pointer-events'] = 'none';

    this.transition.stop();
    removeNode(udid);
  }

  componentWillUnmount() {
    this.transition.stop();
  }

  shouldComponentUpdate(next) {
    return next.fill !== this.props.fill;
  }

  render() {
    let {fill, makeActive} = this.props;

    return (
      <path
        ref='node'
        onMouseOver={makeActive}
        className='node-path'
        fill={fill}
      />
    );
  }
}

Path.propTypes = {
  fill: PropTypes.string.isRequired,
  node: PropTypes.shape({
    udid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }).isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  removeNode: PropTypes.func.isRequired,
  makeActive: PropTypes.func.isRequired
};
