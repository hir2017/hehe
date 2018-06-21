import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Checkbox, Icon, Pagination, message } from 'antd';
import toAction from './record-action';

@inject('commonStore','openStore', 'authStore',)
@observer
class List extends Component {
	static defaultProps = {
		pagination: true // 是否分页， true分也，false不分页
	}

	constructor(props){
		super(props);

		this.action = toAction(this.props.openStore, this.props.authStore);
		this.currentOrderNo = '';
	}

	componentDidMount() {
		if (!this.props.pagination) {
			this.action.getData({
				size: 0
			});
		} else {
			this.action.getData();
		}
	}

	onChangePagination(page){
		this.action.handleFilter('page', {
			page
		});
	}
	/**
	 * 点击撤单，判断是否需要的填写交易密码
	 */
	handleCancel=(item)=>{
		this.action.cancelOrder(item.currencyId , item.orderNo);
	}

	render() {
		let store = this.props.openStore;
		let $content;
		
		if (!this.props.authStore.isLogin) {
			$content = <div className="mini-tip">{ UPEX.lang.template('登录后可查看当前委托订单')}</div>
		} else if (!store.isFetching && store.orderList.length == 0) {
			$content = <div className="mini-tip">{UPEX.lang.template('暂无当前委托订单')}</div>;
		} else {
			$content = (
				<ul className="list">
					{
						store.orderList.map((item, index)=>{
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
										<dd className="inorout">{item.buyOrSell == 1 ? <label className="buy">{UPEX.lang.template('买入')}</label>: <label className="sell">{UPEX.lang.template('卖出')}</label> }</dd>
										<dd className="name">{item.currencyNameEn}</dd>
										<dd className="num">{`${item.tradeNum}/${item.num}`}</dd>
										<dd className="price">{item.price}</dd>
										<dd className="rate">{item.tradeRate}</dd>
										<dd className="amount">{item.tradeAmount}</dd>
										<dd className="status">{status}</dd>
										<dd className="action"><button onClick={this.handleCancel.bind(this, item)}>{UPEX.lang.template('撤单')}</button></dd>
									</dl>
								</li>
							)
						})
					}
				</ul>
			)
		}

		return (
			<div className="order-main-box">
				<div className="order-header">
					<h2>{ UPEX.lang.template('当前委托')}</h2>
				</div>
				<div className="order-table open-list-table">
					<div className="table-hd">
						<table>
							<tbody>
								<tr>
									<th className="time">{UPEX.lang.template('时间')}</th>
									<th className="inorout">{UPEX.lang.template('买卖')}</th>
									<th className="name">{UPEX.lang.template('币种')}</th>
									<th className="num">{UPEX.lang.template('成交数量/委托数量')}</th>
									<th className="price">{UPEX.lang.template('委托价格')}</th>
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
						{ store.isFetching ? <div className="mini-loading"></div> : null }
					</div>
					<div className="table-ft">
						{ store.total > 0 && this.props.pagination ? <Pagination current={store.current} total={store.total} pageSize={store.pageSize} onChange={this.onChangePagination.bind(this)} /> : null }
					</div>
				</div>
			</div>
		)
	}
}

export default List;