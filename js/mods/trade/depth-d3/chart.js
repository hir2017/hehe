import React from 'react';
import { withFauxDOM } from 'react-faux-dom';
import Chart from './index';

class DepthChart extends React.Component {
  static defaultProps = {
    orders: {},
    connectFauxDOM: ()=>{}
  }
  constructor(props) {
    super(props);

    const target = props.connectFauxDOM('div');
    
    this.state = {
      chart: new Chart(target),
      orders: props.orders,
    };
  }

  shouldComponentUpdate(nextProps) {
    this.state.chart.update(nextProps.orders);
    return false;
  }

  render() {
    const { chart, orders } = this.state;
    chart.draw(orders);

    return this.state.chart.canvas.node().toReact()
  }
}


export default withFauxDOM(DepthChart);