import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { interpolateNumber, interpolateTransformSvg } from 'd3-interpolate';

const duration = 1500;

export class Bar extends Component {

  componentDidMount() {
    let {props: {data: {yVal, size: [w, h]}}, refs: {node, rect}} = this;

    rect.setAttribute('width', w);
    rect.setAttribute('height', h);

    let interp0 = interpolateTransformSvg('translate(0,500)', `translate(0,${yVal})`);
    let interp1 = interpolateNumber(1e-6, 1);

    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      node.setAttribute('transform', interp0(t));
      node.setAttribute('opacity', interp1(t));
      if (t === 1) {
        this.transition.stop();
      }
    });
  }

  componentWillReceiveProps(next) {
    let {props: {data: {yVal, udid, size: [w, h]}, removeNode}, refs: {node, rect}} = this;

    this.transition.stop();

    if (next.data.type === 'UPDATING') {
      let interp0 = interpolateTransformSvg(`translate(0,${yVal})`, `translate(0,${next.data.yVal})`);
      let interp1 = interpolateNumber(w, next.data.size[0]);
      let interp2 = interpolateNumber(h, next.data.size[1]);

      node.setAttribute('opacity', 1);

      this.transition = timer(elapsed => {
        let t = elapsed < duration ? (elapsed / duration): 1;
        node.setAttribute('transform', interp0(t));
        rect.setAttribute('width', interp1(t));
        rect.setAttribute('height', interp2(t));
        if (t === 1) {
          this.transition.stop();
        }
      }); 
    } else { // REMOVING
      let interp0 = interpolateTransformSvg(`translate(0,${yVal})`, 'translate(0,500)');
      let interp1 = interpolateNumber(1, 1e-6);

      this.transition = timer(elapsed => {
        let t = elapsed < duration ? (elapsed / duration): 1;
        node.setAttribute('transform', interp0(t));
        node.setAttribute('opacity', interp1(t));
        if (t === 1) {
          this.transition.stop();
          removeNode(udid);
        }
      });
    }
  }

  componentWillUnmount() {
    this.transition.stop();
  }

  render() {
    let {data: { udid, size }} = this.props;

    return (
      <g ref='node' opacity={1e-6}>
        <rect
          ref='rect'
          fill='rgba(0,0,255,0.5)'
          >
        </rect>
        <text
          fontSize={'10px'}
          fill='white'
          dy='0.35em'
          x={-20}
          y={size[1] / 2}
        >{udid}</text>
      </g>
    );
  }
}

Bar.propTypes = {
  data: PropTypes.object.isRequired,
  removeNode: PropTypes.func.isRequired
};
