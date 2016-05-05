import React, { Component, PropTypes } from 'react';

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

  update({ticks, xScale}, {mounted}) {
    let nodes = {};

    for (let i = 0; i < ticks.length; i++) {
      let val = ticks[i];
      let key = `tick-${val}`;

      nodes[key] = {
        udid: key,
        data: val,
        xVal: xScale(val)
      };

      if (mounted[key] && !this.removed[key]) {
        nodes[key].type = 'UPDATING';
      } else {
        nodes[key].type = 'MOUNTING';
      }
    }

    for (let key in mounted) {
      if (!nodes[key] && !this.removed[key]) {
        nodes[key] = {
          udid: mounted[key].udid,
          data: mounted[key].data,
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

    return (
      <div></div>
    );
  }
}

Axis.propTypes = {
  ticks: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  format: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired
};
