/**
 * 卖盘
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@inject('tradeStore')
@observer
class SellOrderView extends Component {
	componentDidMount() {
		this.resetScrollTop();
	}

	resetScrollTop(){
		this.refs.scroller.scrollTop = 2000;
	}

	haneleClickOrder(item){
		let store = this.props.tradeStore;

		if (store.tradeType == 'market') {
            return;
        }
		store.setDealBuyPrice(item.current); // 买入价格
		store.setDealSellPrice(item.current); // 卖出价格
	}

	render() {
		let store = this.props.tradeStore;

		return (
			<div className="trade-sell">
				<div className="list-wrap" ref="scroller">
					<ul className="list">
						{ 
							store.entrust.sell.map((item, index)=>{
								return (
									<li key={index} data-type="sell" data-index={item.index} onClick={this.haneleClickOrder.bind(this, item)}>
										<div className="cell price redrate">{item.newcurrent}</div>
										<div className="cell number">{item.newnumber}</div>
										<div className="cell total">{item.newtotal}</div>
										<div className="bar" style={{ width: `${item.depth}%` }}></div>
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

export default SellOrderView;