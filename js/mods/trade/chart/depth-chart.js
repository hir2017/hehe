/**
 * 深度图, 自主研发一个深度图，基于canvas
 * 对买方来说，只要卖单价小于等于买入价，则交易就可以成交。对卖方来说，只要买单价大于等于卖出价，也是可以立即成交的。
 * 最有可能成交的就是买单最高价、卖单最低价
 * @author 陈立英
 * 备注：
 * 1、横坐标为买入、卖出价格刻度
 * 2、纵坐标为订单交易量总数。
 * 3、计算价格区间的交易总量：买单＝》低于等于当前价格的累计总量；卖单＝》高于等于当前价格的累计总量
 */
import React, {Component} from 'react';
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');


class DepthChart extends Component{
	static defaultProps = {
		depthAsks: [], // 卖方深度
		depthBids: []  // 买方深度
	}
	
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let node = document.getElementById('depth-chart');

		this.chart = echarts.init(node);

		this.setDepthData({
			bids: this.props.depthBids,
			asks: this.props.depthAsks
		});

		$(window).resize(() => {
            this.chart && this.chart.resize();
        });
	}

	componentWillReceiveProps(nextProps) {
		this.setDepthData({
			bids: nextProps.depthBids,
			asks: nextProps.depthAsks
		});     
    }

	// 深度图数据处理方法
	setDepthData(data){

        var chart = this.chart,
        	i = [],
        	o = [],
        	a = [];

        data.bids.length > 0 && data.bids.forEach((item, index)=>{
        	i[i.length] = item.price;
        	o[o.length] = item.totalvolume;
			a.push(null);
        })

        data.asks.length > 0 && data.asks.forEach((item, index)=>{
        	i[i.length] = item.price;
			a[a.length] = item.totalvolume;
        })
        
        chart.setOption({
        	grid: {
                top: 10,
                bottom: 30,
                left: 60,
                right: 10
            },
            tooltip: {
            	trigger: "axis",
                formatter: UPEX.lang.template('委托价') + ": {b0} <br/>" + UPEX.lang.template('累计')+ ": {c0}"
            },
            color: ["#75e08a", "#d66b5a"],
            xAxis: {
            	type: "category",
                axisPointer: {
                    type: "line"
                },
                boundaryGap: false,
                splitLine: {
                    show: !0,
                    lineStyle: { 
                    	type:'dashed',     
                        color: 'rgba(102,102,102,0.1)'
                    }
                },
                axisLine: {
	                lineStyle: {
	                    color: '#666666'
	                }
	            },
                data: i
            },
            yAxis: {
                type: "value",
                axisPointer: {
                    type: "line"
                },
                splitLine: {
                    show: !0,
                    lineStyle: {  
                    	type:'dashed',    
                        color: 'rgba(102,102,102,0.1)'
                    }
                },
                axisLine: {
	                lineStyle: {
	                    color: '#666666'
	                }
	            }
            },
            series: [{
                type: "line",
                step: "start",
                showAllSymbol: false,
                lineStyle: {
                    normal: {
                        color: "#33c280",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: "rgba(51, 194, 128, 0.2)"
                    }
                },
                data: o,
            },
            {
                type: "line",
                step: "start",
                showAllSymbol: false,
                lineStyle: {
                    normal: {
                        color: "#ef5d7f",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: "rgba(239, 93, 127, 0.2)"
                    }
                },
                data: a,
            }]
        });

        this.chart.resize()
	}

	dispose() {
		this.chart.dispose();
	}

	render() {
		return (
			<div className='trade-depth-chart' id="depth-chart" ref="depthchart"></div>
		);
	}
}

export default DepthChart;