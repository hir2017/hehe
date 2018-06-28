/**
 * @fileoverview 首页币种line
 * @author xia xiang feng
 * @date 2018-05-10
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import NumberUtil from '../../../lib/util/number';
import DateUtil from '../../../lib/util/date';
import { getTradeKline }  from '../../../api/http';
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
    static defaultProps = {
        pair: ''
    }

    componentDidMount(){
        this.get24Kline();
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    get24Kline=()=>{
        getTradeKline({
            symbol: this.props.pair, 
            interval: 60, 
            limit: 24
        }).then((res)=>{
            let hours24TrendList = [];

            if (res.status == 200) {
                res.attachment.forEach((item, index)=>{
                    let arr = [];

                    arr[arr.length] = +new Date(item.createTime.replace(/-/g, '/')); // 时间
                    arr[arr.length] = item.current; // 价格

                    hours24TrendList[hours24TrendList.length] = arr;
                })

                this.drawKline(hours24TrendList);
            }
        });

        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.get24Kline();
        }, 60 * 1000) // 60秒请求一次
    }

    drawKline(hours24TrendList) {
        // 绘制图表
        let charts = document.getElementById('home-coin-line')

        if (!echarts.getInstanceByDom(charts)) {
            const _myCharts = echarts.init(charts)
            // 初始化价格趋势图
            _myCharts.setOption(this.option(hours24TrendList))
        } else {
            echarts.getInstanceByDom(charts).setOption(this.option(hours24TrendList))
        }
    }


    option(hours24TrendList = []) {
        let self = this;

        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                formatter([data]) {
                    
                    let price = NumberUtil.formatNumber(data.value, self.props.commonStore.pointPrice);
                    
                    return [
                        `时间：${data.name}`,
                        `价格：NT$${price}`
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
                    return DateUtil.formatDate(item[0], 'HH:mm');
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

    render() {
        return <div className = "coin-line-box" id = "home-coin-line" ></div>
    }

}
