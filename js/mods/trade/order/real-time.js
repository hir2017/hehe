/**
 * 实时交易数据
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@inject('tradeStore')
@observer
class TradeRealTime extends Component {
	render() {
		let store = this.props.tradeStore;

		return (
			<div className="trade-realtime">
				<div className="table-hd">
					<div className="time">{ UPEX.lang.template('时间')}</div>
					<div className="price">{ UPEX.lang.template('价格')}</div>
					<div className="number">{ UPEX.lang.template('数量')}</div>
				</div>
				<div className="table-bd">
					<ul>
						{
							store.coinRealTime.map((item, index)=>{
								return (
									<li className="" key={index}>
										<div className="time">{ item.createTime }</div>
										<div className="price">{ item.current }</div>
										<div className="number">{ item.current }</div>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default TradeRealTime;