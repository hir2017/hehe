import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'antd';
import klineChart from './chart';
import { browserHistory } from 'react-router';
import { getTradeKline }  from '../../../api/http';

@observer
class HotCoin extends Component {
	static defaultProps = {
        pair: ''
    }
    
	constructor(props){
		super(props);
	}
	
	componentDidMount() {
		// 推荐币种的24小时K线数据，一次性行为，不需要实时更新
		this.get24KlineData();
	}

	get24KlineData(){
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
	}

	drawKline(data){
		let node = $(this.refs.kline);
		let width = node.width();
		let height = node.height();

		klineChart.setData({
			data: data,
			width: width,
			height: height
		});

		let linePath = klineChart.getPath();
		let fillPath = klineChart.getFill();

		$(this.refs.testchart).attr('d', linePath);
		$(this.refs.testfill).attr('d', fillPath);
	}

	handleTrade=(data)=>{
		browserHistory.push(`/webtrade/TWD_${data.currencyNameEn}`);
	}

	render() {
		let data = this.props.data;
		let type = data.changeRate >= 0 ? 'positive' : 'negative';
		let trendIcon;

		if (data.currentAmount >= data.previousPrice) {
            trendIcon = <Icon type="arrow-up" style={{fontSize: 12}}/>;
        } else {
            trendIcon = <Icon type="arrow-down" style={{fontSize: 12}}/>;
        }
                                                    

		return (
			<div className={`recommend-item ${type}`} onClick={this.handleTrade.bind(this, data)}>
				<div className="recommend-item-name">{ data.currencyNameEn }</div>
				<div className="recommend-item-price">NT$ { data.currentAmountText }</div>
				<div className="recommend-item-volume">{ UPEX.lang.template('成交额 {num}{unit}', { num : data.amountText, unit: data.baseCurrencyNameEn })}</div>
				<div className="recommend-item-rate">{ data.changeRateText }</div>
				{
					type == 'positive' ? (
						<div className="recommend-item-kline" ref="kline" key="positive">
							<svg  version="1.1" xmlns="http://www.w3.org/2000/svg">
								<g transform="translate(0.5,0.5)">
									<path ref="testchart" stroke="rgba(224,251,200,1)" fill="none" strokeWidth="1" ></path>
									<path ref="testfill" fill="rgba(247,253,241,1)" stroke="none" ></path>
								</g>
							</svg>
						</div>
					) : (
						<div className="recommend-item-kline" ref="kline" key="negative">
							<svg  version="1.1" xmlns="http://www.w3.org/2000/svg">
								<g transform="translate(0.5,0.5)">
									<path ref="testchart" stroke="rgba(248,227,232,1)" fill="none" strokeWidth="1" ></path>
									<path ref="testfill" fill="rgba(250,243,245,1)" stroke="none" ></path>
								</g>
							</svg>
						</div>
					)
				}
			</div>
		);
	}
}

export default HotCoin;