/**
 * @fileoverview 首页币种line
 * @author xia xiang feng
 * @date 2018-05-10
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import NumberUtil from '../../../lib/util/number';
var dayjs = require('dayjs');
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

@inject('commonStore')
@observer
export default class extends Component {

    option(hours24TrendList = []) {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                formatter([data]) {
                    return [
                        `时间：${data.name}`,
                        `价格：NT$${data.value}`
                    ].join('<br/>')
                }
            },
            grid: [{
                left: '0%',
                top: '0%',
                right: '0%',
                height: '90%'
            }],
            xAxis: {
                nameLocation: 'center',
                type: 'category',
                boundaryGap: false,
                data: hours24TrendList.map((item) => {
                    return dayjs(item[0]).format('HH:mm');
                }), // ['7:00', '9:00', '11:00', '12:00', '14:00'],
                axisLine: {
                    lineStyle: {
                        color: '#c5c5c5',
                        fontSize: '14px',
                    }
                },
            },
            yAxis: {
                type: 'value',
                show: false
            },
            series: [{
                data: hours24TrendList.map((item) => {
                    return item[1];
                }), // [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                itemStyle: {
                    color: '#9bbff7'
                },
                lineStyle: {
                    color: '#9bbff7'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#9bbff7' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#fff' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            }]
        }
    }

    componentDidUpdate() {
        const { hours24TrendList } = this.props

        let charts = document.getElementById('home-coin-line')

        if (!echarts.getInstanceByDom(charts)) {
            const _myCharts = echarts.init(charts)
            // 初始化价格趋势图
            _myCharts.setOption(this.option(hours24TrendList))
        } else {
            echarts.getInstanceByDom(charts).setOption(this.option(hours24TrendList))
        }
    }

    componentDidMount() {
        const { hours24TrendList } = this.props
        var myChart = echarts.init(document.getElementById('home-coin-line'));
        // 绘制图表
        myChart.setOption(this.option(hours24TrendList));
    }

    render() {
        return <div className = "coin-line-box" id = "home-coin-line" ></div>
    }

}
