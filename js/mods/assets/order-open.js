import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Checkbox, Icon, Pagination, message } from 'antd';
import PopupTradePwd from './tradepwd';

@inject('orderStore')
@observer
class List extends Component {
	componentDidMount() {
		this.props.orderStore.getOpenOrderList();
	}

	onChangePagination(pageNo){
		this.props.orderStore.getOpenOrderList({
			pageNo
		});
	}

	/**
	 * 点击撤单，判断是否需要的填写交易密码
	 */
	handleCancel=(orderNo)=>{
		let { tradePasswordStatus,  cancelOrder} = this.props.orderStore;

		if (tradePasswordStatus ==  1) {
			this.refs.popup.setState({
				visible: true
			})
		} else {
			message.error(verifyCancelOrder.message);
		}
	}

	render() {
		let store = this.props.orderStore;
		let $content;
		

		if (store.isFetchingOpenList){
			$content = <div className="mini-tip">{UPEX.lang.template('正在加载')}</div>
		} else if(store.openOrderList.length == 0) {
			$content = <div className="mini-tip">{UPEX.lang.template('暂无数据')}</div>;
		} else {
			$content = (
				<div>
					<ul className="list">
						{
							store.openOrderList.map((item, index)=>{
								let status;
								switch(item.status) {
									case 0:
										status = UPEX.lang.template('未成交');
										break;
									case 1:
										status = UPEX.lang.template('部分成交');
										break;
								}

								return (
									<li key={index}>
										<dl>
											<dd className="time">{item.orderTime}</dd>
											<dd className="name">{item.currencyNameEn}</dd>
											<dd className="num">{`成交数量/${item.num}`}</dd>
											<dd className="price">{item.price}</dd>
											<dd className="inorout">{item.buyOrSell == 1 ? <label className="buy">{UPEX.lang.template('买入')}</label>: <label className="sell">{UPEX.lang.template('卖出')}</label> }</dd>
											<dd className="rate">{'成交率'}</dd>
											<dd className="amount">{'成交金额'}</dd>
											<dd className="status">{status}</dd>
											<dd className="action"><button onClick={this.handleCancel.bind(this, item.orderNo)}>{UPEX.lang.template('撤单')}</button></dd>
										</dl>
									</li>
								)
							})
						}
					</ul>
					<Pagination defaultCurrent={1} total={50} onChange={this.onChangePagination.bind(this)} />
				</div>
			)
		}

		return (
			<div className="order-main-box">
				<div className="order-header">
					<h2>{ UPEX.lang.template('当前委托')}</h2>
					<div className="filter-box hidden">
    					<ul>
    						<li><button>{UPEX.lang.template('取消卖单')}</button></li>
    						<li><button>{UPEX.lang.template('取消买单')}</button></li>
    						<li><button>{UPEX.lang.template('取消全部')}</button></li>
    					</ul>
					</div>
				</div>
				<div className="order-table open-list-table">
					<div className="table-hd">
						<table>
							<tbody>
								<tr>
									<th className="time">{UPEX.lang.template('时间')}</th>
									<th className="name">{UPEX.lang.template('币种')}</th>
									<th className="num">{UPEX.lang.template('成交数量/委托数量')}</th>
									<th className="price">{UPEX.lang.template('委托价格')}</th>
									<th className="inorout">{UPEX.lang.template('买卖')}</th>
									<th className="rate">{UPEX.lang.template('成交率')}</th>
									<th className="amount">{UPEX.lang.template('成交金额')}</th>
									<th className="status">{UPEX.lang.template('状态')}</th>
									<th className="action">{UPEX.lang.template('操作')}</th>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="table-bd">
						{ $content }
					</div>
				</div>
				<PopupTradePwd ref="popup"/>
			</div>
		)
	}
}

export default List;