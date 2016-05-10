import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { interpolateNumber } from 'd3-interpolate';

export class Path extends Component {

  componentDidMount() {
    this.isMounting(this.props, this.refs);
  }

  isMounting(props, refs) {
    let {node} = refs;
    let {node: {path}, duration} = props;

    node.setAttribute('d', path);

    let interp1 = interpolateNumber(1e-6, 1);

    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      node.setAttribute('opacity', interp1(t));
      if (t === 1) {
        this.transition.stop();
      }
    });
  }

  // isUpating(props, next, refs) {
  //   let {yScale, node: {xVal, yVal}, duration} = props;

  //   let interp0 = interpolateTransformSvg(`translate(0,${yVal})`, `translate(0,${next.node.yVal})`);

  //   let begVals = {w: xVal, h: yScale.bandwidth(), x: xVal - 3};
  //   let endVals = {w: next.node.xVal, h: next.yScale.bandwidth(), x: next.node.xVal - 3};
  //   let interp1 = interpolateObject(begVals, endVals);

  //   refs.node.setAttribute('opacity', 1);

  //   this.transition = timer(elapsed => {
  //     let t = elapsed < duration ? (elapsed / duration): 1;
  //     refs.node.setAttribute('transform', interp0(t));

  //     let {w, h, x} = interp1(t);
  //     refs.rect.setAttribute('width', w);
  //     refs.rect.setAttribute('height', h);
  //     refs.text.setAttribute('x', x);
  //     if (t === 1) {
  //       this.transition.stop();
  //     }
  //   });
  // }

  // isRemoving(props, refs) {
  //   let {node: {yVal, udid}, removeNode, duration} = props;

  //   let interp0 = interpolateTransformSvg(`translate(0,${yVal})`, 'translate(0,500)');
  //   let interp1 = interpolateNumber(1, 1e-6);

  //   this.transition = timer(elapsed => {
  //     let t = elapsed < duration ? (elapsed / duration): 1;
  //     refs.node.setAttribute('transform', interp0(t));
  //     refs.node.setAttribute('opacity', interp1(t));
  //     if (t === 1) {
  //       this.transition.stop();
  //       removeNode(udid);
  //     }
  //   });
  // }

  // componentWillReceiveProps(next) {
  //   let { props, refs } = this;

  //   if (props.node !== next.node) {
  //     this.transition.stop();

  //     if (next.node.type === 'MOUNTING') {
  //       this.isMounting(next, refs);
  //     } else if (next.node.type === 'UPDATING') {
  //       this.isUpating(props, next, refs);
  //     } else if (next.node.type === 'REMOVING') {
  //       this.isRemoving(props, refs);
  //     } else {
  //       throw new Error('Invalid Node Type');
  //     }  
  //   }
  // }

  componentWillUnmount() {
    this.transition.stop();
  }

  render() {
    let {fill} = this.props;

    return (
      <path
        ref='node'
        className='node-path'
        stroke={'#fff'}
        strokeWidth={'0.5px'}
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
