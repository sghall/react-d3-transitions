import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { interpolateObject, interpolateNumber } from 'd3-interpolate';

const duration = 1500;

export class Bar extends Component {

  componentDidMount() {
    let {props: { data: { yVal, size: [w, h] }}, refs: { node, rect }} = this;

    rect.setAttribute('width', w);
    rect.setAttribute('height', h);

    let interp = interpolateObject({opacity: 1e-6, y: 500}, {opacity: 0.5, y: yVal});
    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      let {opacity, y } = interp(t);
      rect.setAttribute('y', y);
      rect.setAttribute('opacity', opacity);
      if (t === 1) {
        this.transition.stop();
      }
    });
  }

  // componentWillReceiveProps(next) {
  //   let {
  //     props: {data: {size: [w, h] }, removeItem }, refs: { node }
  //   } = this;

  //   this.transition.stop();

  //   if (next.data.type === 'updating') {
  //     let interp = interpolateNumber(xVal, next.data.xVal);
  //     this.transition = timer(elapsed => {
  //       let t = elapsed < duration ? (elapsed / duration): 1;
  //       node.setAttribute('x', interp(t));
  //       if (t === 1) {
  //         this.transition.stop();
  //       }
  //     }); 
  //   } else { // Removing
  //     let interp = interpolateObject({y: 200, opacity: 1}, {y: 400, opacity: 1e-6});
  //     this.transition = timer(elapsed => {
  //       let t = elapsed < duration ? (elapsed / duration): 1;
  //       let { y, opacity } = interp(t);
  //       node.setAttribute('y', y);
  //       node.setAttribute('opacity', opacity);
  //       if (t === 1) {
  //         this.transition.stop();
  //         removeItem(name);
  //       }
  //     }); 
  //   }
  // }

  // componentWillUnmount() {
  //   this.transition.stop();
  // }

  render() {
    // let {data: { yVal, size: [w, h] }} = this.props;

    return (
      <g ref='node'>
        <rect
          ref='rect'
          fill='blue'
          opacity={1e-6}>
        </rect>
      </g>
    );
  }
}

Bar.propTypes = {
  data: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired
};
