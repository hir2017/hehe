/**
 * 我的订单模块
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
// import OpenOrder from './open-order';
// import HistoryOrder from './history-order';
import OpenOrder from '../../record-list/record-open';
import HistoryOrder from '../../record-list/record-success';

@inject('tradeStore')
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

	handleClickTab(index){
		this.props.tradeStore.setTabIndex(index);
	}

	componentDidMount() {
		$.channel.on('updateTradeUserAccount', ()=>{
			this.props.tradeStore.getUserAccount();
		})
	}

	componentWillUnmount(){
		$.channel.off('updateTradeUserAccount');
	}

	render() {
		let store = this.props.tradeStore;

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
						store.tabIndex == 0 ? <OpenOrder pagination={false}/> : <HistoryOrder pagination={false}/>
					}
				</div>				
			</div>
		);
	}
}

export default MyOrder;