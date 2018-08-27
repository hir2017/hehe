/**
 * @fileoverview  用户个人信息
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Breadcrumb } from 'antd';

@inject('tradePwdStore', 'currencyStore', 'commonStore')
@observer
class RecordPage extends Component {
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
				title: UPEX.lang.template('成交明细')
			},
		];
	}

	componentDidMount() {
		this.props.commonStore.getAllCoinPoint();
		this.props.currencyStore.getCurrencyPoints();
		this.props.tradePwdStore.getPersonalTradingPwd();
	}

	handleClickTab=(item, e)=>{
		browserHistory.push('/account/record/' + item.path)
	}

    render() {
    	let path = location.pathname.split('/').pop();

		let target = this.tabs.filter((item)=>{
			return item.path === path;
		})[0];

		if (!target) {
			target = this.tabs[0];
		}

        return (
        	<div className="order-wrapper page-order">
        		<Breadcrumb separator=">">
                    <Breadcrumb.Item>{UPEX.config.sitename}</Breadcrumb.Item>
                    <Breadcrumb.Item>{UPEX.lang.template('订单中心')}</Breadcrumb.Item>
                </Breadcrumb>
        		<div className="order-body-inner clearfix">
	        		<div className="order-menu">
	        			<ul>
	        				{
	        					this.tabs.map((item, index)=>{
	        						let cls = item.index == target.index ? 'selected' : '';

	        						return (
	        							<li className={cls} key={index} onClick={this.handleClickTab.bind(this, item)}>
	        								<h3>{ item.title }</h3>
	        							</li>
	        						)
	        					})
	        				}
	        			</ul>
        			</div>
	        		<div className="order-main">
	        			{ this.props.currencyStore.currencyDataReady ? this.props.children : null }
	        		</div>
	        	</div>
        	</div>
        )
    }
}

export default RecordPage;
