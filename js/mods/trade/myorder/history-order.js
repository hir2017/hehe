/**
 * 已完成的订单
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@inject('authStore','tradeOrderStore')
@observer
class OpenOrder extends Component{
	handleCancel(orderNo){

	}
	
	render(){
		let store = this.props.tradeOrderStore;
		let $content;

		if (!this.props.authStore.isLogin) {
			$content = <div className="mini-tip">{ UPEX.lang.template('登录后可查看已完成订单')}</div>
		} else if(store.isFetching){
			$content = <div className="mini-tip">{ UPEX.lang.template('正在加载')}</div>
		} else if(store.openOrderList.length == 0) {
			$content = <div className="mini-tip">{ UPEX.lang.template('暂无委托中订单') }</div>;
		} else {
			$content = (
				<ul>
					{
						store.historyOrderList.map((item, index)=>{
							return (
								<li key={index}>
									<dl>
										<dd className="time">{item.orderTime}</dd>
										<dd className="type">{item.buyOrSell == 1 ? <label className="buy">{UPEX.lang.template('买入')}</label>: <label className="sell">{UPEX.lang.template('卖出')}</label> }</dd>
										<dd className="name">{'币种'}</dd>
										<dd className="price">{item.tradePrice}</dd>
										<dd className="number">{item.tradeNum}</dd>
										<dd className="total">{item.tradeAmount}</dd>
										<dd className="charge">{'手续费'}</dd>
									</dl>
								</li>
							)
						})
					}
				</ul>
			)
		}
		return (
			<div className="history-order">
				<div className="tradeorder-table-hd">
					<ul>
						<li className="time">{ UPEX.lang.template('时间') }</li>
						<li className="type">{ UPEX.lang.template('方向') }</li>
						<li className="name">{ UPEX.lang.template('币种') }</li>
						<li className="price">{ UPEX.lang.template('成交均价') }</li>
						<li className="number">{ UPEX.lang.template('成交数量') }</li>
						<li className="total">{ UPEX.lang.template('成交金额') }</li>
						<li className="charge">{ UPEX.lang.template('手续费') }</li>
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