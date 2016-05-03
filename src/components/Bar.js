import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { interpolateNumber, interpolateTransformSvg } from 'd3-interpolate';
import { format } from 'd3-format';

const duration = 1500;
const percentFormat = format('.1%');

export class Bar extends Component {

  componentDidMount() {
    let {props: {data: {yVal, size: [w, h]}}, refs: {node, rect, text}} = this;

    rect.setAttribute('width', w);
    rect.setAttribute('height', h);
    text.setAttribute('x', w - 3);


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
    let {props: {data: {yVal, udid, size: [w, h]}, removeNode}, refs: {node, rect, text}} = this;

    this.transition.stop();

    if (next.data.type === 'UPDATING') {
      let interp0 = interpolateTransformSvg(`translate(0,${yVal})`, `translate(0,${next.data.yVal})`);
      let interp1 = interpolateNumber(w, next.data.size[0]);
      let interp2 = interpolateNumber(h, next.data.size[1]);
      let interp3 = interpolateNumber(w - 3, next.data.size[0] - 3);

      node.setAttribute('opacity', 1);

      this.transition = timer(elapsed => {
        let t = elapsed < duration ? (elapsed / duration): 1;
        node.setAttribute('transform', interp0(t));
        rect.setAttribute('width', interp1(t));
        rect.setAttribute('height', interp2(t));
        text.setAttribute('x', interp3(t));
        if (t === 1) {
          this.transition.stop();
        }
      });
    } else if (next.data.type === 'MOUNTING') {
      rect.setAttribute('width', next.data.size[0]);
      rect.setAttribute('height', next.data.size[1]);
      text.setAttribute('x', next.data.size[0] - 3);

      let interp0 = interpolateTransformSvg('translate(0,500)', `translate(0,${next.data.yVal})`);
      let interp1 = interpolateNumber(1e-6, 1);

      this.transition = timer(elapsed => {
        let t = elapsed < duration ? (elapsed / duration): 1;
        node.setAttribute('transform', interp0(t));
        node.setAttribute('opacity', interp1(t));
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
    let {xScale, data: { udid, size, xVal }} = this.props;

    return (
      <g ref='node' opacity={1e-6}>
        <rect
          ref='rect'
          className='bar'
          opacity={0.6}
          fill='#0097a7'
        />
        <text
          fontSize={'10px'}
          fill='white'
          dy='0.35em'
          x={-20}
          y={size[1] / 2}
        >{udid}</text>
        <text
          ref='text'
          fontSize={'10px'}
          textAnchor='end'
          fill='white'
          dy='0.35em'
          y={size[1] / 2}
        >{percentFormat(xScale.invert(xVal))}</text>
      </g>
    );
  }
}

Bar.propTypes = {
  data: PropTypes.object.isRequired,
  xScale: PropTypes.func.isRequired,
  removeNode: PropTypes.func.isRequired
};
