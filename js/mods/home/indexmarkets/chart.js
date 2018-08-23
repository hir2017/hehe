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
        pair: '',
        pointPrice: ''
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
                this.drawKline(res.attachment);
            }
        });

        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.get24Kline();
        }, 60 * 1000) // 60秒请求一次
    }

    drawKline(data) {
        // 绘制图表
        let charts = document.getElementById('home-coin-line')

        if (!echarts.getInstanceByDom(charts)) {
            const _myCharts = echarts.init(charts)
            // 初始化价格趋势图
            _myCharts.setOption(this.option(data))
        } else {
            echarts.getInstanceByDom(charts).setOption(this.option(data))
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
                    let price;

                    if (self.props.pointPrice > 0) {
                        price = NumberUtil.formatNumber(data.value, self.props.pointPrice);
                    } else {
                        price = data.value;
                    }
                    
                    return [
                        `时间：${data.name}`,
                        `价格：${UPEX.config.baseCurrencySymbol}${price}`
                    ].join('<br/>')
                },
                extraCssText: "font-size: 12px;"
            },
            grid: [{
                left: '3%',
                top: '5%',
                right: '0%',
                width: '94%',
                height: '75%'
            }],
            xAxis: {
                nameLocation: 'center',
                type: 'category',
                boundaryGap: false,
                data: hours24TrendList.map((item) => {
                    return DateUtil.formatDate(item.currentTime, 'HH:mm');
                }), 
                axisLine: {
                    lineStyle: {
                        color: '#c1c5c8',
                        fontSize: '12px'
                    },
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                scale: true,
                show: false,
                min: function(value) {
                    return value.min  - (value.max - value.min) / hours24TrendList.length;
                }
            },
            series: [{
                data: hours24TrendList.map((item) => {
                    return item.current;
                }), 
                type: 'line',
                itemStyle: {
                    color: '#e8b802'
                },
                lineStyle: {
                    color: 'rgba(232,184,2,0.3)'
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
                            color: 'rgba(255,231,140,0.3)' // 0% 处的颜色
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
