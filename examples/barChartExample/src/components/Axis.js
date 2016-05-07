import React, { Component, PropTypes } from 'react';
import { AxisTick } from './AxisTick';

export class Axis extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mounted: {}
    };
  }

  componentDidMount() {
    this.removed = {};
    this.update(this.props, this.state);
  }

  componentWillReceiveProps(next) {
    if (this.props.xScale !== next.xScale) {
      this.update(next, this.state);
    }
  }

  update({xScale, format}, {mounted}) {

    if (!xScale) {
      return;
    }

    let nodes = {};
    let ticks = xScale.ticks(5);

    for (let i = 0; i < ticks.length; i++) {
      let val = ticks[i];
      let key = `tick-${val}`;

      nodes[key] = {
        udid: key,
        data: val,
        xVal: xScale(val)
      };

      if (mounted[key] && !this.removed[key]) {
        nodes[key].text = mounted[key].text,
        nodes[key].type = 'UPDATING';
      } else {
        nodes[key].text = format(val),
        nodes[key].type = 'MOUNTING';
      }
    }

    for (let key in mounted) {
      if (!nodes[key] && !this.removed[key]) {
        nodes[key] = {
          udid: mounted[key].udid,
          data: mounted[key].data,
          text: mounted[key].text,
          xVal: mounted[key].xVal,
          type: 'REMOVING'
        };
      }
    }

    this.removed = {};

    this.setState({
      mounted: nodes
    });
  }

  removeTick(udid) {
    this.removed[udid] = true;
  }

  render() {
    let {mounted} = this.state;
    let {xScale, yScale, duration} = this.props;

    let ticks = Object.keys(mounted).map(key => {
      let tick = mounted[key];
      return (
        <AxisTick
          key={key}
          tick={tick}
          xScale={xScale}
          yScale={yScale}
          duration={duration}
          removeTick={this.removeTick.bind(this)}
        />
      );
    });

    return (
      <g>{ticks}</g>
    );
  }
}

Axis.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  format: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired
};
