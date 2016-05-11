import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { interpolateNumber, interpolateString } from 'd3-interpolate';

export class Path extends Component {

  componentDidMount() {
    this.isMounting(this.props, this.refs);
  }

  isMounting(props, refs) {
    let {node} = refs;
    let {node: {path}, duration} = props;

    node.setAttribute('opacity', 1e-6);
    node.setAttribute('d', path);
    node.style['cursor'] = 'pointer';
    node.style['pointer-events'] = 'all';

    let interp1 = interpolateNumber(1e-6, 0.8);

    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      node.setAttribute('opacity', interp1(t));
      if (t === 1) {
        this.transition.stop();
      }
    });
  }

  isUpating(props, next, refs) {
    let {node} = refs;
    let {node: {path}, duration} = next;

    node.setAttribute('opacity', 0.8);

    let interp1 = interpolateString(node.getAttribute('d'), path);

    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      node.setAttribute('d', interp1(t));
      if (t === 1) {
        this.transition.stop();
      }
    });
  }

  isRemoving(props, refs) {
    let {node} = refs;
    let {node: {udid}, removeNode} = props;

    node.setAttribute('opacity', 1e-6);
    node.style['pointer-events'] = 'none';

    this.transition.stop();
    removeNode(udid);

  }

  componentWillReceiveProps(next) {
    let { props, refs } = this;

    if (props.node !== next.node) {
      this.transition.stop();

      if (next.node.type === 'MOUNTING') {
        this.isMounting(next, refs);
      } else if (next.node.type === 'UPDATING') {
        this.isUpating(props, next, refs);
      } else if (next.node.type === 'REMOVING') {
        this.isRemoving(props, refs);
      } else {
        throw new Error('Invalid Node Type');
      }  
    }
  }

  componentWillUnmount() {
    this.transition.stop();
  }

  render() {
    let {fill} = this.props;

    return (
      <path
        ref='node'
        className='node-path'
        fill={fill}
      />
    );
  }
}

Path.propTypes = {
  fill: PropTypes.string.isRequired,
  node: PropTypes.shape({
    udid: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    path: React.PropTypes.string.isRequired
  }).isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  removeNode: PropTypes.func.isRequired
};
