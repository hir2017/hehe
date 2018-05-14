/**
 * 卖盘
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@inject('tradeEntrustStore')
@observer
class SellOrder extends Component {
	render() {
		let store = this.props.tradeEntrustStore;

		return (
			<div className="trade-sell">
				<ul className="list">
					{ 
						store.entrust && store.entrust.sell && store.entrust.sell.map((item, index)=>{
							return (
								<li key={index}>
									<div className="cell price">{item.current.toFixed(store.pointPrice)}</div>
									<div className="cell number">{item.number}</div>
									<div className="cell total">{(item.number * item.current).toFixed(store.pointPrice)}</div>
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