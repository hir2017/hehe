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
				<div className="table-hd">
					<div className="time">{ UPEX.lang.template('时间')}</div>
					<div className="price">{ UPEX.lang.template('价格')}({store.currentTradeCoin.baseCurrencyNameEn})</div>
					<div className="number">{ UPEX.lang.template('数量')}({store.currentTradeCoin.currencyNameEn})</div>
				</div>
				<div className="table-bd">
					<ul>
						{
							store.tradeHistory.content.map((item, index)=>{
								return (
									<li key={index} data-type={item.buyOrSell == 1 ? 'buy' : 'sell'} onClick={this.haneleClickOrder.bind(this, item)}> 
										<div className="time">{ item.time }</div>
										<div className="price">{ item.current }</div>
										<div className="number">{ item.amount }</div>
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