/**
 * 卖盘
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@inject('tradeStore')
@observer
class SellOrder extends Component {
	haneleClickOrder(item){
		let store = this.props.tradeStore;

		store.setDealBuyPrice(item.current); // 买入价格
		store.setDealSellPrice(item.current); // 卖出价格
	}

	render() {
		let store = this.props.tradeStore;

		return (
			<div className="trade-sell">
				<ul className="list">
					{ 
						store.newEntrustData.sell.map((item, index)=>{
							return (
								<li key={index} data-type="sell" onClick={this.haneleClickOrder.bind(this, item)}>
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

export default SellOrder;