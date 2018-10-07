/**
 * 邀请返佣 － 订单记录
 */
import React, { Component } from "react";

class OrderView extends Component {
	constructor(props) {
		super(props);

		this.tabs = [
			{
				index: 0,
				path: 'brokerage',
				title: UPEX.lang.template('返佣记录')
			},
			{
				index: 1,
				path: 'invitee',
				title: UPEX.lang.template('邀请明细')
			}
		];

		this.state = {
			selectedIndex: 0
		}
	}

	handleClickTab=(index, e)=>{
		this.setState({
			selectedIndex: index
		});
	}

	render() {
		let { selectedIndex } = this.state;

		return (
			<div className="invite-record">
				<div className="record-menu">
        			<ul>
        				{
        					this.tabs.map((item, index)=>{
        						let cls = item.index == selectedIndex ? 'selected' : '';

        						return (
        							<li className={cls} key={index} onClick={this.handleClickTab.bind(this, index)}>
        								<h3>{ item.title }</h3>
        							</li>
        						)
        					})
        				}
        			</ul>
    			</div>
    			<div className="record-main">
    				<div className={`record-panel ${selectedIndex == 0 ? 'selected' : 'hidden'}`}>
    					<BrokerageListView/>
    				</div>
    				<div className={`record-panel ${selectedIndex == 1 ? 'selected' : 'hidden'}`}>
    					<InviteeListView/>
    				</div>
    			</div>
			</div>
		);
	}
}

class BrokerageListView extends Component {
	render() {
		return (
			<div>
				<div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无返佣记录，快去邀请好友')}</div>
			</div>
		)
	}
}

class InviteeListView extends Component {
	render() {
		return (
			<div>
				<div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无邀请明细，快去邀请好友')}</div>
			</div>
		)
	}
}

export default OrderView;
