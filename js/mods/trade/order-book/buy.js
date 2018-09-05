/**
 * 买盘
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@inject('tradeStore')
@observer
class BuyOrderView extends Component {
	componentDidMount() {
		this.resetScrollTop();
	}

	haneleClickOrder(item){
		let store = this.props.tradeStore;
		
		if (store.tradeType == 'market') {
            return;
        }
		store.setDealBuyPrice(item.current); // 买入价格
		store.setDealSellPrice(item.current); // 卖出价格
	}

	resetScrollTop(){
		this.refs.scroller.scrollTop = 0;
	}
	
	render() {
		let store = this.props.tradeStore;

		return (
			<div className="trade-buy" ref="scroller">
				<div className="list-wrap">
					<ul className="list">
						{ 
							store.entrust.buy.map((item, index)=>{
								return (
									<li key={index} data-type="buy" data-index={item.index} onClick={this.haneleClickOrder.bind(this, item)}>
										<div className="cell price greenrate">{item.newcurrent}</div>
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

export default BuyOrderView;