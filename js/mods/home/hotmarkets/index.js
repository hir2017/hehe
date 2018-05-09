/**
 * @fileoverview 热门币种信息
 * @author 陈立英
 * @date 2018-04-26
 * K线图［24小时收盘价格］
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import klineChart from './chart';

const mockData = "0.00142630,0.00143350,0.00143420,0.00144750,0.00145970,0.00145600,0.00145690,0.00144820,0.00146550,0.00146500,0.00147240,0.00147230,0.00146780,0.00147180,0.00146630,0.00145070,0.00145410,0.00145340,0.00143660,0.00144680,0.00143960,0.00144500,0.00144050,0.00144250".split(',');

@observer
class HotMarkets extends Component{
	componentDidMount() {
		klineChart.setData({
			data: mockData,
			width: 230,
			height: 40
		});
		let linePath = klineChart.getPath();
		let fillPath = klineChart.getFill();

		$(this.refs.testchart).attr('d', linePath);
		$(this.refs.testfill).attr('d', fillPath);
	}

	render() {
		
		return (
			<div className="hot-markets">
				<div className="kline">
					<div className="svg-container">
					<svg  version="1.1" xmlns="http://www.w3.org/2000/svg">
						<g transform="translate(0.5,0.5)">
							<path ref="testchart" stroke="rgba(224,251,200,1)" fill="none" strokeWidth="1" ></path>
							<path ref="testfill" fill="rgba(247,253,241,1)" stroke="none" ></path>
						</g>
					</svg>
				</div>
				</div>


			</div>
		);
	}
}

export default HotMarkets;