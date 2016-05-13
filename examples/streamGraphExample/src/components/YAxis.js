import React, { Component, PropTypes } from 'react';
import { YAxisTick } from './YAxisTick';

export class YAxis extends Component {

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

  update({yScale, format}, {mounted}) {

    if (!yScale.ticks) {
      return;
    }

    let nodes = {};
    let ticks = yScale.ticks(10);

    for (let i = 0; i < ticks.length; i++) {
      let val = ticks[i];
      let key = `tick-${val}`;

      nodes[key] = {
        udid: key,
        data: val,
        xVal: yScale(val)
      };

      if (mounted[key] && !this.removed[key]) {
        nodes[key].text = mounted[key].text,
        nodes[key].type = 'UPDATING';
      } else {
        nodes[key].text = format(Math.abs(val)),
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
        <YAxisTick
          key={key} tick={tick}
          xScale={xScale} yScale={yScale}
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

YAxis.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  format: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired
};
