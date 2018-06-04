/**
 * 委托中的订单
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';

@inject('authStore','tradeStore')
@observer
class OpenOrder extends Component{
	handleCancel(orderNo){

	}
	render(){
		let store = this.props.tradeStore;
		let $content;

		if (!this.props.authStore.isLogin) {
			$content = <div className="mini-tip">{UPEX.lang.template('登录后可查看委托中订单')}</div>
		} else if(store.isFetchingOrderList){
			$content = <div className="mini-tip">{ UPEX.lang.template('正在加载')}</div>
		} else if(store.openOrderList.length == 0) {
			$content = <div className="mini-tip">{ UPEX.lang.template('暂无委托中订单') }</div>;
		} else {
			$content = (
				<ul>
					{
						store.openOrderList.map((item, index)=>{
							let status;

							if (item.status == 2) {
								status = UPEX.lang.template('全部成交')
							} else if (item.status == 1) {
								status = UPEX.lang.template('部分成交');
							} else {
								status = UPEX.lang.template('未成交');
							}

							return (
								<li key={index}>
									<dl>
										<dd className="time">{item.orderTime}</dd>
										<dd className="type">{item.buyOrSell == 1 ? <label className="buy">{UPEX.lang.template('买入')}</label>: <label className="sell">{UPEX.lang.template('卖出')}</label> }</dd>
										<dd className="name">{item.currencyNameEn}</dd>
										<dd className="number">{item.num}</dd>
										<dd className="price">{item.price}</dd>
										<dd className="total">{'委托金额'}</dd>
										<dd className="rate">{'成交率'}</dd>
										<dd className="status">{status}</dd>
										<dd className="action" onClick={this.handleCancel.bind(this, item.orderNo)}>{ UPEX.lang.template('撤单')}</dd>
									</dl>
								</li>
							)
						})
					}
				</ul>
			)
		}
		return (
			<div className="open-order">
				<div className="tradeorder-table-hd">
					<ul>
						<li className="time">{ UPEX.lang.template('时间') }</li>
						<li className="type">{ UPEX.lang.template('买卖') }</li>
						<li className="name">{ UPEX.lang.template('币种') }</li>
						<li className="number">{ UPEX.lang.template('委托数量') }</li>
						<li className="price">{ UPEX.lang.template('委托单价') }</li>
						<li className="total">{ UPEX.lang.template('委托金额') }</li>
						<li className="rate">{ UPEX.lang.template('成交率') }</li>
						<li className="status">{ UPEX.lang.template('状态') }</li>
						<li className="action">{ UPEX.lang.template('操作') }</li>
					</ul>
				</div>
				<div className="tradeorder-table-bd">
				{$content}
				</div>
			</div>
		)
	}
}

export default OpenOrder;