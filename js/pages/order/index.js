/**
 * @fileoverview  用户个人信息
 * @author 陈立英
 * @date 2018-05-19
 */
import '../../../css/order.css';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';

@inject('orderStore', 'commonStore')
@observer
class UserPage extends Component {
	constructor(props){
		super(props);

		this.tabs = [
			{
				index: 0,
				path: 'open',
				title: UPEX.lang.template('当前委托')
			},
			{
				index: 1,
				path: 'history',
				title: UPEX.lang.template('历史委托')
			},
			{
				index: 2,
				path: 'success',
				title: UPEX.lang.template('已成交')
			},
		];
	}

	componentDidMount() {
		this.props.commonStore.getAllCoinPoint();
		this.props.orderStore.getPersonalTradingPwd();
	}

	handleClickTab=(item, e)=>{
		browserHistory.push('/order/' + item.path)
	}

    render() {
    	let store = this.props.orderStore;

    	let path = location.pathname.split('/').pop();

		let target = this.tabs.filter((item)=>{
			return item.path === path;
		})[0];

		if (!target) {
			target = this.tabs[0];
		}

        return (
        	<div className="order-wrapper">
        		<div className="order-body-inner clearfix">
	        		<div className="order-menu">
	        			<div className="order-menu-box">
		        			<h2>{ UPEX.lang.template('订单信息')}</h2>
		        			<ul>
		        				{
		        					this.tabs.map((item, index)=>{
		        						let cls = item.index == target.index ? 'selected' : '';

		        						return (
		        							<li className={cls} key={index} onClick={this.handleClickTab.bind(this, item)}>{ item.title }</li>
		        						)
		        					})
		        				}
		        			</ul>
	        			</div>
	        		</div>
	        		<div className="order-main">
	        			{ this.props.commonStore.coinPointReady ? this.props.children : null }
	        		</div>
	        	</div>
        	</div>
        )
    }
}

export default UserPage;