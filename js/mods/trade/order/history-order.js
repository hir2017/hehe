/**
 * 交易历史数据
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@inject('tradeStore')
@observer
class TradeRealTime extends Component {
	haneleClickOrder(item){
		let store = this.props.tradeStore;

		store.setDealBuyPrice(item.current); // 买入价格
		store.setDealSellPrice(item.current); // 卖出价格
	}
	
	render() {
		let store = this.props.tradeStore;
		
		return (
			<div className="trade-history">
				<div className="list-box-hd">
					{UPEX.lang.template('实时成交')}
				</div>
				<div className="list-box-bd">
					<div className="table-hd">
						<div className="time">{ UPEX.lang.template('时间')}</div>
						<div className="price">{ UPEX.lang.template('价格')}</div>
						<div className="number">{ UPEX.lang.template('数量')}</div>
					</div>
					<div className="table-bd">
						<ul>
							{
								store.tradeHistory.content.map((item, index)=>{
									let color = item.buyOrSell == 1 ? 'greenrate' : 'redrate';
									return (
										<li 
											key={index} 
											data-type={item.buyOrSell == 1 ? 'buy' : 'sell'} 
											onClick={this.haneleClickOrder.bind(this, item)}
											data-text={item.timeTextAll}
										> 
											<div className="time">{ item.timeText }</div>
											<div className={`price ${color}`}>{ item.currentText }</div>
											<div className="number">{ item.amountText }</div>
										</li>
									)
								})
							}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default TradeRealTime;