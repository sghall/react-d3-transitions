import React, { Component, PropTypes } from 'react';
import { timer } from 'd3-timer';
import { interpolateNumber, interpolateTransformSvg } from 'd3-interpolate';

export class AxisTick extends Component {

  componentDidMount() {
    this.isMounting(this.props, this.refs);
  }

  isMounting(props, refs) {
    let {tick} = refs;
    let {tick: {xVal}, duration} = props;

    let interp0 = interpolateTransformSvg('translate(0,0)', `translate(${xVal},0)`);
    let interp1 = interpolateNumber(1e-6, 1);

    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      tick.setAttribute('transform', interp0(t));
      tick.setAttribute('opacity', interp1(t));
      if (t === 1) {
        this.transition.stop();
      }
    });
  }

  isUpating(props, next, refs) {
    let {tick} = refs;
    let {tick: {xVal}, duration} = props;

    let interp0 = interpolateTransformSvg(`translate(${xVal},0)`, `translate(${next.tick.xVal},0)`);
    let interp1 = interpolateNumber(tick.getAttribute('opacity'), 1);

    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      tick.setAttribute('transform', interp0(t));
      tick.setAttribute('opacity', interp1(t));
      if (t === 1) {
        this.transition.stop();
      }
    });
  }

  isRemoving(props, refs) {
    let {tick} = refs;
    let {tick: {udid}, duration, removeTick} = props;

    tick.setAttribute('opacity', 0);

    this.transition = timer(elapsed => {
      let t = elapsed < duration ? (elapsed / duration): 1;
      if (t === 1) {
        this.transition.stop();
        removeTick(udid);
      }
    });
  }

  componentWillReceiveProps(next) {
    let { props, refs } = this;

    if (props.tick !== next.tick) {
      this.transition.stop();

      if (next.tick.type === 'MOUNTING') {
        this.isMounting(next, refs);
      } else if (next.tick.type === 'UPDATING') {
        this.isUpating(props, next, refs);
      } else if (next.tick.type === 'REMOVING') {
        this.isRemoving(props, refs);
      } else {
        throw new Error('Invalid tick Type');
      }  
    }
  }

  componentWillUnmount() {
    this.transition.stop();
  }

  render() {
    let {yScale, tick: {text}} = this.props;

    let yRange = yScale.range();

    return (
      <g ref='tick' opacity={1e-6}>
        <line
          x1={0} y1={yRange[0]}
          x2={0} y2={yRange[1]}
          opacity={0.2}
          stroke='#fff'
        />
        <text
          fontSize={'9px'}
          textAnchor='middle'
          fill='white'
          x={0} y={-5} 
        >{text}</text>
      </g>
    );
  }
}

AxisTick.propTypes = {
  tick: PropTypes.object.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  removeTick: PropTypes.func.isRequired
};
