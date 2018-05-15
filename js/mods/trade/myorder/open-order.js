/**
 * 委托中的订单
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
			$content = <div className="mini-tip">{ UPEX.lang.template('登录后可查看委托中订单')}</div>
		} else if(store.isFetching){
			$content = <div className="mini-tip">{ UPEX.lang.template('正在加载')}</div>
		} else if(store.openOrderList.length == 0) {
			$content = <div className="mini-tip">{ UPEX.lang.template('暂无委托中订单') }</div>;
		} else {
			$content = (
				<ul>
					{
						store.openOrderList.map((item, index)=>{
							return (
								<li key={index}>
									<dl>
										<dd className="time">{item.orderTime}</dd>
										<dd className="type">{item.buyOrSell == 1 ? <label className="buy">{UPEX.lang.template('买入')}</label>: <label className="sell">{UPEX.lang.template('卖出')}</label> }</dd>
										<dd className="name">{'币种'}</dd>
										<dd className="number">{item.num}</dd>
										<dd className="price">{item.price}</dd>
										<dd className="total">{'委托金额'}</dd>
										<dd className="rate">{'33%'}</dd>
										<dd className="status">{item.status == 1 ? UPEX.lang.template('未成交'): UPEX.lang.template('部分成交')}</dd>
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
						<li className="type">{ UPEX.lang.template('方向') }</li>
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