import * as d3 from '../../../lib/d3';


const Data = {"timestamp": "1529634440", "bids": [["6650.92", "0.08265795"], ["6649.47", "1.49930000"], ["6649.37", "8.55600000"], ["6649.34", "1.00000000"], ["6648.60", "1.00000000"], ["6647.68", "0.57200000"], ["6647.67", "5.67252100"], ["6646.24", "1.50000000"], ["6645.64", "0.00203000"], ["6644.95", "4.64290000"], ["6644.08", "0.15500000"], ["6644.06", "18.74975900"], ["6643.53", "0.22400800"], ["6642.71", "3.85390000"], ["6642.50", "2.00000000"], ["6642.33", "0.01000000"], ["6642.22", "0.00537913"], ["6642.17", "5.54345664"], ["6640.50", "1.96663173"], ["6640.00", "1.00000000"], ["6639.91", "7.14000000"], ["6639.80", "1.00000000"], ["6639.45", "5.00000000"], ["6637.33", "1.00000000"], ["6637.30", "7.55808000"], ["6637.20", "1.93600000"], ["6635.67", "0.00148992"], ["6635.56", "0.39651247"], ["6635.00", "1.00000000"], ["6634.64", "17.11200000"], ["6634.63", "13.00000000"], ["6634.55", "7.26000000"], ["6634.28", "0.15000000"], ["6634.20", "4.00000000"], ["6633.64", "1.63600000"], ["6633.06", "1.32000000"], ["6631.99", "6.66003973"], ["6631.24", "1.99800000"], ["6630.00", "0.51136274"], ["6629.48", "6.74650000"], ["6629.02", "0.01000000"], ["6628.91", "0.60000000"], ["6627.22", "3.00000000"], ["6625.00", "0.40000000"], ["6624.47", "5.90243000"], ["6622.95", "1.84500000"], ["6622.53", "14.85020000"], ["6621.77", "8.54850340"], ["6620.78", "1.00000000"], ["6620.08", "0.69240000"], ["6619.11", "0.04200000"], ["6618.67", "5.00000000"], ["6618.66", "8.80257700"], ["6618.47", "0.00600000"], ["6615.73", "0.01000000"], ["6615.61", "0.07500000"], ["6615.33", "5.19000000"], ["6615.28", "0.70760000"], ["6615.09", "0.10024875"], ["6615.00", "0.20000000"], ["6614.37", "0.20000000"], ["6614.09", "5.22000000"], ["6612.79", "0.03017183"], ["6612.27", "6.05855400"], ["6612.00", "0.10019131"], ["6611.75", "1.00000000"], ["6610.83", "0.22094653"], ["6610.42", "0.20000000"], ["6610.00", "0.00348883"], ["6609.99", "0.40479075"], ["6609.87", "0.47072887"], ["6609.71", "3.90000000"], ["6609.00", "0.01050000"], ["6608.26", "12.52500000"], ["6607.46", "0.00623913"], ["6606.67", "0.00115015"], ["6606.60", "8.28799700"], ["6606.30", "0.00881015"], ["6606.04", "0.20000000"], ["6605.60", "0.00100000"], ["6605.08", "0.34603214"], ["6604.42", "7.86000000"], ["6602.00", "0.25000000"], ["6601.01", "5.00000000"], ["6601.00", "60.00000000"], ["6600.72", "0.10024875"], ["6600.00", "23.38834326"], ["6599.87", "19.98000000"], ["6598.69", "0.01000000"], ["6597.75", "0.50000000"], ["6594.70", "1.12000000"], ["6594.37", "0.20000000"], ["6594.00", "1.05269400"], ["6591.79", "12.52500000"], ["6591.16", "10.85000000"], ["6591.00", "0.10000000"], ["6590.03", "0.01000000"], ["6590.00", "0.30000000"], ["6589.88", "3.00000000"], ["6586.00", "0.01840000"]], "asks": [["6657.95", "6.03182749"], ["6659.96", "0.25681582"], ["6660.00", "8.00000000"], ["6662.33", "0.01000000"], ["6663.51", "1.30600000"], ["6664.31", "1.00000000"], ["6664.86", "1.50210000"], ["6664.94", "0.15500000"], ["6664.96", "8.55600000"], ["6665.00", "9.00000000"], ["6665.08", "1.00000000"], ["6666.09", "1.00000000"], ["6666.63", "5.00000000"], ["6666.66", "0.01600000"], ["6666.86", "0.00600000"], ["6668.57", "2.45834100"], ["6668.98", "1.19400000"], ["6670.00", "9.00000000"], ["6671.16", "2.23600000"], ["6671.24", "1.00000000"], ["6671.25", "6.33321214"], ["6673.85", "7.50800730"], ["6674.55", "13.00000000"], ["6674.60", "12.50000000"], ["6675.00", "8.00000000"], ["6676.58", "5.91071111"], ["6678.13", "17.11200000"], ["6678.14", "2.50100000"], ["6678.81", "5.02800000"], ["6679.29", "4.00000000"], ["6679.91", "0.74070000"], ["6680.00", "8.00000000"], ["6682.78", "6.02069500"], ["6684.71", "0.65930000"], ["6685.00", "8.00000000"], ["6685.48", "7.72459600"], ["6687.35", "2.14598210"], ["6687.69", "0.15000000"], ["6688.62", "5.00000000"], ["6688.63", "6.16324830"], ["6689.67", "0.10504622"], ["6691.10", "6.66250000"], ["6691.28", "12.50000000"], ["6691.86", "1.45200000"], ["6694.11", "4.93976400"], ["6696.70", "7.60000000"], ["6697.14", "0.00962352"], ["6697.45", "11.34700000"], ["6698.77", "0.00140606"], ["6699.27", "3.29696500"], ["6700.13", "0.00314934"], ["6701.81", "4.80633600"], ["6702.10", "0.04400000"], ["6703.95", "7.06000000"], ["6703.96", "19.98000000"], ["6704.04", "0.01048802"], ["6706.74", "5.00000000"], ["6706.75", "3.22132900"], ["6708.01", "12.50000000"], ["6708.93", "0.01000000"], ["6709.40", "5.94388201"], ["6709.73", "0.50000000"], ["6711.92", "4.70197500"], ["6714.66", "5.11680000"], ["6716.00", "0.11437248"], ["6716.09", "14.96200000"], ["6724.78", "12.50000000"], ["6728.68", "0.17658000"], ["6731.24", "0.00888240"], ["6733.13", "0.01000000"], ["6733.32", "0.01039661"], ["6734.10", "0.00500000"], ["6737.97", "0.92058058"], ["6739.87", "0.01000000"], ["6740.00", "0.00114016"], ["6741.07", "0.11633000"], ["6741.59", "12.50000000"], ["6747.87", "0.04995163"], ["6750.46", "0.01000000"], ["6754.17", "0.16441000"], ["6754.91", "0.11171875"], ["6755.00", "5.49000000"], ["6755.91", "0.29624198"], ["6757.21", "0.01000000"], ["6758.45", "12.50000000"], ["6765.50", "3.79000000"], ["6766.00", "3.90000000"], ["6766.20", "3.92841914"], ["6770.74", "0.01000000"], ["6775.34", "12.50000000"], ["6777.00", "0.66600000"], ["6780.00", "0.82458341"], ["6781.00", "0.05000000"], ["6781.68", "0.00905000"], ["6786.68", "0.00090176"], ["6787.70", "1.13000000"], ["6790.00", "0.31453157"], ["6791.53", "1.00000000"], ["6792.28", "12.50000000"], ["6792.33", "0.16162000"]]}

function last(array) {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}

class Chart {
  constructor(target) {

    this.container = target;
    this.setDimensions();
    this.setTransitions();
    this.drawScene();
  }

  get canvas() {
    return this.renderedCanvas();
  }

  renderedCanvas() {
    return this.scene;
  }

  draw(orders) {


    this.orders = Data;

    this.setLimits();
    this.setScales();
    this.setGraphicLimit();

    this.drawOrdersArea('asks');
    this.drawOrdersArea('bids');
    this.drawAxes();
  }

  setDimensions() {
    this.dimensions = {
      width: $('#tradeMainKline').width() - 40,
      height: $('#tradeMainKline').height() - 40
    };

    this.margins = {
      top: 40,
      right: 60,
      bottom: 50,
      left: 60,
    };
  }

  setTransitions() {
    this.transitions = d3.transition().duration(250);
  }

  setLimits() {
    const lowestPrice = Number(last(this.orders.bids)[0]);
    const highestPrice = Number(last(this.orders.asks)[0]);

    this.midpoint = (Number(this.orders.asks[0][1]) + Number(this.orders.bids[0][1])) / 2;

    const midpointDiff = Math.max((this.midpoint - lowestPrice), (highestPrice - this.midpoint));
    const topValue = Math.max(last(this.orders.asks)[2], last(this.orders.bids)[2]);

    this.limits = {
      left: this.midpoint - midpointDiff,
      right: this.midpoint + midpointDiff,
      top: topValue * 1.1,
    };
  }

  setGraphicLimit() {
    const asksBase = [
      this.orders.asks[0][1],
      null,
      0,
    ];

    const asksHighest = [
      this.limits.right,
      null,
      last(this.orders.asks)[2],
    ];

    const bidsBase = [
      this.orders.bids[0][1],
      null,
      0,
    ];

    const bidsLowest = [
      this.limits.left,
      null,
      last(this.orders.bids)[2],
    ];

    this.asks = [asksBase, ...this.orders.asks, asksHighest];
    this.bids = [bidsBase, ...this.orders.bids, bidsLowest];
  }

  setScales() {
    this.xScale = d3
      .scaleLinear()
      .domain([this.limits.left, this.limits.right])
      .range([this.margins.left + 1, this.dimensions.width - this.margins.right]);

    this.yScale = d3
      .scaleLinear()
      .domain([0, this.limits.top])
      .range([this.dimensions.height - this.margins.top - this.margins.bottom, 0]);
  }

  drawScene() {
    this.scene = d3
      .select(this.container)
      .append('svg')
      .attr('width', this.dimensions.width)
      .attr('height', this.dimensions.height)
      .attr('class', 'chart');
  }

  defineShapes() {
    const area = d3.area()
      .x(d => this.xScale(d[0]))
      .y1(d => this.yScale(d[2]))
      .y0(this.yScale(0))
      .curve(d3.curveStepAfter);

    const line = d3.line()
      .x(d => this.xScale(d[0]))
      .y(d => this.yScale(d[2]))
      .curve(d3.curveStepAfter);

    this.shapes = { area, line };
  }

  defineAxes() {
    const left = d3.axisLeft(this.yScale).ticks(5, 's').tickSizeOuter(0);
    const right = d3.axisRight(this.yScale).ticks(5, 's').tickSizeOuter(0);
    const bottom = d3.axisBottom(this.xScale).ticks(10, 's').tickSizeOuter(0);

    this.axes = { left, right, bottom };
  }

  drawAxes() {
    this.defineAxes();
    const { left, right, bottom } = this.axes;

    this.scene
      .append('g')
      .attr('transform', `translate(${this.margins.left}, ${this.margins.top})`)
      .attr('class', 'axis axis-left')
      .call(left);

    this.scene
      .append('g')
      .attr('transform', `translate(${this.dimensions.width - this.margins.right}, ${this.margins.top})`)
      .attr('class', 'axis axis-right')
      .call(right);

    this.scene
      .append('g')
      .attr('transform', `translate(0, ${this.dimensions.height - this.margins.bottom})`)
      .attr('class', 'axis axis-bottom')
      .call(bottom);
  }

  updateAxes() {
    this.defineAxes();
    const { left, right, bottom } = this.axes;

    d3.select('.axis-left')
      .transition(this.transitions)
      .call(left);

    d3.select('.axis-right')
      .transition(this.transitions)
      .call(right);

    d3.select('.axis-bottom')
      .transition(this.transitions)
      .call(bottom);
  }

  drawOrdersArea(type) {
    this.defineShapes();
    const { area, line } = this.shapes;

    this.scene
      .append('path')
      .datum(this[type])
      .attr('class', `chart-area chart-area--${type}`)
      .attr('d', area)
      .attr('transform', `translate(0, ${this.margins.top})`);

    this.scene
      .append('path')
      .datum(this[type])
      .attr('class', `chart-line chart-line--${type}`)
      .attr('d', line)
      .attr('transform', `translate(0, ${this.margins.top})`);
  }

  updateOrdersArea(type) {
    this.defineShapes();
    const { area, line } = this.shapes;

    d3.select(`.chart-area--${type}`)
      .transition(this.transitions)
      .attr('d', () => area(this[type]));

    d3.select(`.chart-line--${type}`)
      .transition(this.transitions)
      .attr('d', () => line(this[type]));
  }

  update(orders) {
    this.orders = orders;

    d3.selectAll('*').interrupt();

    this.setLimits();
    this.setScales();
    this.setGraphicLimit();

    this.updateOrdersArea('asks');
    this.updateOrdersArea('bids');
    this.updateAxes();
  }
}


export default Chart;