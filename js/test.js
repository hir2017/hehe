import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

// const DepthChart {
// 	init(e){
// 		this.isInin = !0;
//         var t = this.el;
//         this.chart = window.echarts.init(t),
//         this.chart.setOption(e),
//         this.theme && this.setTheme(this.theme),
//         this.depthData && this.setDepthData(this.depthData),
//         this.resize()
// 	},
// 	setTheme(e){
// 		var t = this._theme[e] || this._theme[l.u.dark];
//         this.chart.setOption(t);
// 	},

// 	resize(){
// 		this.isInin && this.chart.resize()
// 	},

// 	setDepthData(e){
// 		var t = e || this.data,
//         n = this.chart,
//         i = [],
//         o = [],
//         a = [];
//         t.bids.length > 0 && t.bids.slice(0, 50).reduce(function(e, t) {
//             return i.unshift(Object(d.r)(Number(e.price), 8)),
//             o.unshift(Object(d.r)(Number(e.volume), 8)),
//             a.push(null),
//             {
//                 price: t.price,
//                 volume: +e.volume + +t.volume
//             }
//         });
//         t.asks.length > 0 && t.asks.slice(0, 50).reduce(function(e, t) {
//             return i.push(Object(d.r)(Number(e.price), 8)),
//             a.push(Object(d.r)(Number(e.volume), 8)),
//             {
//                 price: t.price,
//                 volume: +e.volume + +t.volume
//             }
//         });
//         n.setOption({
//             tooltip: {
//                 formatter: h.a.t("exchange['价格']") + ": {b0} <br/>" + h.a.t("exchange['数量']") + ": {c0}"
//             },
//             xAxis: {
//                 data: i
//             },
//             series: [{
//                 data: o
//             },
//             {
//                 data: a
//             }]
//         }),
//         this.chart.resize()
// 	},

// 	dispose() {
// 		this.chart.dispose()
// 	}
// }

class App extends Component {
	componentDidMount(){
		let node = document.getElementById('depth-chart');

		this.chart = echarts.init(node);

		var data = {
			bids: [{
            "price": 4.5821613,
            "volume": 681.1
        },
        {
            "price": 4.5817485,
            "volume": 701.1
        },
        {
            "price": 4.5804697,
            "volume": 696.4
        },
        {
            "price": 4.5801698,
            "volume": 1135.4
        },
        {
            "price": 4.5784791,
            "volume": 1155
        },
        {
            "price": 4.5781786,
            "volume": 68.6
        },
        {
            "price": 4.5764885,
            "volume": 58.2
        },
        {
            "price": 4.5761871,
            "volume": 127.2
        },
        {
            "price": 4.5744976,
            "volume": 229.6
        },
        {
            "price": 4.5741956,
            "volume": 1210.6
        },
        {
            "price": 4.5737804,
            "volume": 13.1
        },
        {
            "price": 4.572507,
            "volume": 1106.2
        },
        {
            "price": 4.5722044,
            "volume": 515
        },
        {
            "price": 4.5717882,
            "volume": 76.4
        },
        {
            "price": 4.5705165,
            "volume": 198.4
        },
        {
            "price": 4.5702129,
            "volume": 1841.5
        },
        {
            "price": 4.5697961,
            "volume": 10.4
        },
        {
            "price": 4.5685259,
            "volume": 1893.6
        },
        {
            "price": 4.5682218,
            "volume": 198.3
        },
        {
            "price": 4.567804,
            "volume": 610.5
        },
        {
            "price": 4.5665353,
            "volume": 534.2
        },
        {
            "price": 4.5662303,
            "volume": 44.4
        },
        {
            "price": 4.5658119,
            "volume": 13.1
        },
        {
            "price": 4.5645444,
            "volume": 52.2
        },
        {
            "price": 4.5642388,
            "volume": 40.8
        },
        {
            "price": 4.5638198,
            "volume": 109.2
        },
        {
            "price": 4.5622476,
            "volume": 67.8
        },
        {
            "price": 4.5618277,
            "volume": 1096.1
        },
        {
            "price": 4.5602561,
            "volume": 1603.6
        },
        {
            "price": 4.56,
            "volume": 1
        }
    ],
	        asks: [{
            "price": 4.5839925,
            "volume": 829
        },
        {
            "price": 4.5859686,
            "volume": 3472.8
        },
        {
            "price": 4.6017753,
            "volume": 26.4
        },
        {
            "price": 4.607703,
            "volume": 560.9
        },
        {
            "price": 4.6254855,
            "volume": 90
        },
        {
            "price": 4.6274616,
            "volume": 65
        },
        {
            "price": 4.633389,
            "volume": 1048.2
        },
        {
            "price": 4.637341,
            "volume": 22.4
        },
        {
            "price": 4.6610512,
            "volume": 39
        },
        {
            "price": 4.6709305,
            "volume": 32086
        },
        {
            "price": 4.7025442,
            "volume": 2987.5
        },
        {
            "price": 4.70452,
            "volume": 5.1
        },
        {
            "price": 4.7124235,
            "volume": 10
        },
        {
            "price": 4.7203268,
            "volume": 10
        },
        {
            "price": 4.7321822,
            "volume": 5.3
        },
        {
            "price": 4.7361338,
            "volume": 20.8
        },
        {
            "price": 4.7400854,
            "volume": 20
        },
        {
            "price": 4.7499647,
            "volume": 22.1
        },
        {
            "price": 4.7677475,
            "volume": 12.5
        },
        {
            "price": 4.7776268,
            "volume": 269.1
        },
        {
            "price": 4.7875061,
            "volume": 41
        },
        {
            "price": 4.7894819,
            "volume": 12.4
        },
        {
            "price": 4.7954097,
            "volume": 12.5
        },
        {
            "price": 4.8072648,
            "volume": 66.3
        },
        {
            "price": 4.8112164,
            "volume": 37.6
        }
    ],
		};

		this.setDepthData(data);
	}

	setDepthData(e){
		var t = e || this.data,
        n = this.chart,
        i = [],
        o = [],
        a = [];

        t.bids.length > 0 && t.bids.slice(0, 50).reduce(function(e, t) {
            return i.unshift(Number(e.price)),
            o.unshift(Number(e.volume)),
            a.push(null),
            {
                price: t.price,
                volume: +e.volume + +t.volume
            }
        });

        t.asks.length > 0 && t.asks.slice(0, 50).reduce(function(e, t) {
            return i.push(Number(e.price)),
            a.push(Number(e.volume)),
            {
                price: t.price,
                volume: +e.volume + +t.volume
            }
        });

        n.setOption({
        	grid: {
                top: 10,
                bottom: 30,
                left: 50,
                right: 10
            },
            tooltip: {
            	trigger: "axis",
                formatter: "exchange['价格']" + ": {b0} <br/>" + "exchange['数量']" + ": {c0}"
            },
            color: ["#75e08a", "#d66b5a"],
            xAxis: {
            	type: "category",
                axisPointer: {
                    type: "line"
                },
                data: i
            },
            yAxis: {
                type: "value",
                splitLine: {
                    show: !1
                }
            },
            series: [{
                type: "line",
                step: "start",
                data: o,
                lineStyle: {
                    normal: {
                        color: "#75e08a",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: "rgba(117, 224, 138, 0.2)"
                    }
                }
            },
            {
                type: "line",
                step: "start",
                data: a,
                lineStyle: {
                    normal: {
                        color: "#d66b5a",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: "rgba(214, 107, 90, 0.2)"
                    }
                }
            }]
        });

        this.chart.resize()
	}

	render(){
		return (
			<div id="depth-chart" style={{width: 1000, height: 800}}></div>
		)
	}
}

render(<App/>, document.getElementById('wrap'));