import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { interpolateObject, interpolateNumber } from 'd3-interpolate';

const duration = 750;

export class Text extends Component {

  componentDidMount() {
    let {props: { data: { xVal }}, refs: { node }} = this;

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

  componentWillReceiveProps(next) {
    let {
      props: { data: { xVal, name }, removeItem }, refs: { node }
    } = this;

    this.transition.stop();

    if (next.data.type === 'updating') {
      let interp = interpolateNumber(xVal, next.data.xVal);
      this.transition = timer(elapsed => {
        let t = elapsed < duration ? (elapsed / duration): 1;
        node.setAttribute('x', interp(t));
        if (t === 1) {
          this.transition.stop();
        }
      }); 
    } else { // Removing
      let interp = interpolateObject({y: 200, opacity: 1}, {y: 400, opacity: 1e-6});
      this.transition = timer(elapsed => {
        let t = elapsed < duration ? (elapsed / duration): 1;
        let { y, opacity } = interp(t);
        node.setAttribute('y', y);
        node.setAttribute('opacity', opacity);
        if (t === 1) {
          this.transition.stop();
          removeItem(name);
        }
      }); 
    }
  }

  componentWillUnmount() {
    this.transition.stop();
  }

  render() {
    let {props: {data: { name, fill }}} = this;

    return (
      <text ref='node' dy='0.35em' fill={fill} opacity={1e-6}>{name}</text>
    );
  }
}

Text.propTypes = {
  data: PropTypes.object.isRequired,
  removeItem: PropTypes.func.isRequired
};
