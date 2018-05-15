/**
 * 我的订单模块
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import OpenOrder from './open-order';
import HistoryOrder from './history-order';

@inject('tradeOrderStore')
@observer
class MyOrder extends Component {
	constructor(props){
		super(props);

		this.tabs = [{
			title: UPEX.lang.template('委托中订单')
		}, {
			title: UPEX.lang.template('已完成订单')
		}]
	}
	onChange=(e)=>{
		// true隐藏，false不隐藏
		let checked = e.currentTarget.checked == true;

		this.props.tradeOrderStore.filterOtherCurrency(checked);
	}

	handleClickTab(index){
		this.props.tradeOrderStore.setTabIndex(index);
	}

	render() {
		let store = this.props.tradeOrderStore;

		return (
			<div className="tradeorder-wrapper">
				<div className="tradeorder-hd clearfix">
					<ul>
						{
							this.tabs.map((item, index)=>{
								let cls = store.tabIndex == index ? 'selected' : '';
								return (
									<li key={index} className={cls} onClick={this.handleClickTab.bind(this, index)}>{item.title}</li>
								)
							})
						}
					</ul>
				</div>
				<div className="tradeorder-bd">
					{
						store.tabIndex == 0 ? <OpenOrder/> : <HistoryOrder/>
					}
				</div>				
			</div>
		);
	}
}

export default MyOrder;