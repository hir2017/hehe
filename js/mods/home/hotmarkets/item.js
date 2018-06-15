import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import klineChart from './chart';

@observer
class HotCoin extends Component {
	constructor(props){
		super(props);
	}
	
	componentDidMount() {
		let node = $(this.refs.kline);
		let width = node.width();
		let height = node.height();

		klineChart.setData({
			data: this.props.data.hours24TrendList,
			width: width,
			height: height
		});

		let linePath = klineChart.getPath();
		let fillPath = klineChart.getFill();

		$(this.refs.testchart).attr('d', linePath);
		$(this.refs.testfill).attr('d', fillPath);
	}

	render() {
		let data = this.props.data;
		
		return (
			<div className={ data.changeRate >= 0 ? 'recommend-item positive' : 'recommend-item negative' }>
				<div className="recommend-item-name">{ data.currencyNameEn }</div>
				<div className="recommend-item-price">NT$ { data.currentAmount }</div>
				<div className="recommend-item-volume">{ UPEX.lang.template('成交额 NT$ {num}', { num : data.amount })}</div>
				<div className="recommend-item-change">{ data.changeRateText }</div>
				<div className="recommend-item-kline" ref="kline">
					<svg  version="1.1" xmlns="http://www.w3.org/2000/svg">
						<g transform="translate(0.5,0.5)">
							<path ref="testchart" stroke="rgba(224,251,200,1)" fill="none" strokeWidth="1" ></path>
							<path ref="testfill" fill="rgba(247,253,241,1)" stroke="none" ></path>
						</g>
					</svg>
				</div>
			</div>
		);
	}
}

export default HotCoin;