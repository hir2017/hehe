/**
 * @fileoverview  用户个人信息
 * @author 陈立英
 * @date 2018-05-19
 */
import '../../../css/order.css';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import HistoryOrderList from '../../mods/assets/order-history';
import OpenOrderList from '../../mods/assets/order-open';
import SuccessOrderList from '../../mods/assets/order-success';

@inject('orderStore', 'commonStore')
@observer
class UserPage extends Component {
	constructor(props){
		super(props);

		this.tabs = [
			{
				index: 0,
				title: UPEX.lang.template('当前委托')
			},
			{
				index: 1,
				title: UPEX.lang.template('历史委托')
			},
			{
				index: 2,
				title: UPEX.lang.template('已成交')
			},
		]
	}

	componentDidMount() {
		this.props.commonStore.getAllCoinPoint();
		this.props.orderStore.getPersonalTradingPwd();
	}

	handleClickTab=(item, e)=>{
		this.props.orderStore.setTabIndex(item.index);
	}

    render() {
    	let store = this.props.orderStore;
    	let $content;

    	switch(store.tabIndex) {
    		case 0:
    			$content = <OpenOrderList/>;
    			break;
    		case 1:
    			$content = <HistoryOrderList/>;
    			break;
    		case 2:
    			$content = <SuccessOrderList/>;
    			break;
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
		        						let cls = item.index == store.tabIndex ? 'selected' : '';

		        						return (
		        							<li className={cls} key={index} onClick={this.handleClickTab.bind(this, item)}>{ item.title }</li>
		        						)
		        					})
		        				}
		        			</ul>
	        			</div>
	        		</div>
	        		<div className="order-main">
	        			{ this.props.commonStore.coinPointReady ? $content : null }
	        		</div>
	        	</div>
        	</div>
        )
    }
}

export default UserPage;