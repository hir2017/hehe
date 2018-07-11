import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import Chart from './mods/trade/depth-chart/chart';

const mockData = {
    "tradeCurrencyId": "54",
    "buy": [{
            "current": 4.5821613,
            "number": 681.1
        },
        {
            "current": 4.5817485,
            "number": 701.1
        },
        {
            "current": 4.5804697,
            "number": 696.4
        },
        {
            "current": 4.5801698,
            "number": 1135.4
        },
        {
            "current": 4.5784791,
            "number": 1155
        },
        {
            "current": 4.5781786,
            "number": 68.6
        },
        {
            "current": 4.5764885,
            "number": 58.2
        },
        {
            "current": 4.5761871,
            "number": 127.2
        },
        {
            "current": 4.5744976,
            "number": 229.6
        },
        {
            "current": 4.5741956,
            "number": 1210.6
        },
        {
            "current": 4.5737804,
            "number": 13.1
        },
        {
            "current": 4.572507,
            "number": 1106.2
        },
        {
            "current": 4.5722044,
            "number": 515
        },
        {
            "current": 4.5717882,
            "number": 76.4
        },
        {
            "current": 4.5705165,
            "number": 198.4
        },
        {
            "current": 4.5702129,
            "number": 1841.5
        },
        {
            "current": 4.5697961,
            "number": 10.4
        },
        {
            "current": 4.5685259,
            "number": 1893.6
        },
        {
            "current": 4.5682218,
            "number": 198.3
        },
        {
            "current": 4.567804,
            "number": 610.5
        },
        {
            "current": 4.5665353,
            "number": 534.2
        },
        {
            "current": 4.5662303,
            "number": 44.4
        },
        {
            "current": 4.5658119,
            "number": 13.1
        },
        {
            "current": 4.5645444,
            "number": 52.2
        },
        {
            "current": 4.5642388,
            "number": 40.8
        },
        {
            "current": 4.5638198,
            "number": 109.2
        },
        {
            "current": 4.5622476,
            "number": 67.8
        },
        {
            "current": 4.5618277,
            "number": 1096.1
        },
        {
            "current": 4.5602561,
            "number": 1603.6
        },
        {
            "current": 4.56,
            "number": 1
        }
    ],
    "sell": [{
            "current": 4.5839925,
            "number": 829
        },
        {
            "current": 4.5859686,
            "number": 3472.8
        },
        {
            "current": 4.6017753,
            "number": 26.4
        },
        {
            "current": 4.607703,
            "number": 560.9
        },
        {
            "current": 4.6254855,
            "number": 90
        },
        {
            "current": 4.6274616,
            "number": 65
        },
        {
            "current": 4.633389,
            "number": 1048.2
        },
        {
            "current": 4.637341,
            "number": 22.4
        },
        {
            "current": 4.6610512,
            "number": 39
        },
        {
            "current": 4.6709305,
            "number": 32086
        },
        {
            "current": 4.7025442,
            "number": 2987.5
        },
        {
            "current": 4.70452,
            "number": 5.1
        },
        {
            "current": 4.7124235,
            "number": 10
        },
        {
            "current": 4.7203268,
            "number": 10
        },
        {
            "current": 4.7321822,
            "number": 5.3
        },
        {
            "current": 4.7361338,
            "number": 20.8
        },
        {
            "current": 4.7400854,
            "number": 20
        },
        {
            "current": 4.7499647,
            "number": 22.1
        },
        {
            "current": 4.7677475,
            "number": 12.5
        },
        {
            "current": 4.7776268,
            "number": 269.1
        },
        {
            "current": 4.7875061,
            "number": 41
        },
        {
            "current": 4.7894819,
            "number": 12.4
        },
        {
            "current": 4.7954097,
            "number": 12.5
        },
        {
            "current": 4.8072648,
            "number": 66.3
        },
        {
            "current": 4.8112164,
            "number": 37.6
        }
    ],
    "baseCurrencyId": "1",
    "type": 1,
    "entrustScale": 200
}


class App extends Component {
    componentDidMount() {
        const ctx = document.getElementById('market-chart-depth');

        this.depth = new Chart(ctx, {
            type: 'line',
            data: {},
            options: {
                layout: {
                    padding: 5,
                },
                tooltips: {
                    enabled: false,
                    mode: 'index',
                    position: 'nearest',
                    custom: (tooltip) => {

                    },
                },
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                    }],
                    xAxes: [{
                        display: false,
                    }],
                },
            }
        });

        askPrices = [];
	    bidPrices = [];
	    askAmounts = { base: [], quote: [] };
	    bidAmounts = { base: [], quote: [] };

        this.depth.data.datasets = [
        {
          label: 'Buy',
          data: bidAmountsGraph,
          backgroundColor: 'rgba(38, 166, 154, 0.2)',
          borderColor: 'rgba(38, 166, 154, 1)',
          borderWidth: 3,
          // fill: false,
          pointStyle: 'circle',
          pointRadius: 3,
          pointBorderWidth: 1,
          pointBorderColor: '#1ABC9C',
          pointBackgroundColor: '#1ABC9C',
          hoverBackgroundColor: '#1ABC9C',
          hoverBorderColor: '#1ABC9C',
          hoverBorderWidth: 5,
          steppedLine: true,
          invertedStep: true,
        },
        {
          label: 'Sell',
          data: askAmountsGraph,
          backgroundColor: 'rgba(239, 83, 80, 0.2)',
          borderColor: '#EF5350',
          borderWidth: 3,
          // fill: false,
          pointStyle: 'circle',
          pointRadius: 3,
          pointBorderWidth: 1,
          pointBorderColor: '#EF5350',
          pointBackgroundColor: '#EF5350',
          hoverBackgroundColor: '#EF5350',
          hoverBorderColor: '#EF5350',
          hoverBorderWidth: 5,
          steppedLine: true,
        }];

      	this.depth.update();
    }

     render() {
        return (
        	<div>
        		<canvas id="market-chart-depth" className="market-chart" width="375" height="195"></canvas>
        	</div>
        );
    }
}

render(<App/>, document.getElementById('wrap'));