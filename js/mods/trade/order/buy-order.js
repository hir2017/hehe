/**
 * 买盘
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@inject('tradeStore')
@observer
class BuyOrder extends Component {
	haneleClickOrder(item){
		let store = this.props.tradeStore;
		store.setDealBuyPrice(item.current); // 买入价格
		store.setDealSellPrice(item.current); // 卖出价格
	}
	render() {
		let store = this.props.tradeStore;

		return (
			<div className="trade-buy">
				<ul className="list">
					{ 
						store.newEntrustData.buy.map((item, index)=>{
							return (
								<li key={index} data-type="buy" onClick={this.haneleClickOrder.bind(this, item)}>
									<div className="cell price">{item.current}</div>
									<div className="cell number">{item.number}</div>
									<div className="cell total">{item.total || 0}</div>
									<div className="bar" style={{ width: `${item.depth}%` }}></div>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}

export default BuyOrder;