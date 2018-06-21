import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {  Select, DatePicker, Pagination } from 'antd';

const Option = Select.Option;
import toAction from './record-action';

@inject('commonStore','successStore', 'authStore')
@observer
class List extends Component {
	static defaultProps = {
		pagination: true // 是否分页， true分页，false不分页
	}

	constructor(props){
		super(props);

		this.action = toAction(this.props.successStore, this.props.authStore);
	}

	componentDidMount() {
		if (!this.props.pagination) {
			this.action.getData({
				size: 0
			});
		} else {
			this.action.getData({
				size: 10
			});
		}
	}

	onChangePagination(page){
		this.action.handleFilter('page', {
			page
		});
	}
	// 开始时间
	onChangeStartTime(value, dateString){
		this.action.handleFilter('startTime', {
			beginTime: dateString
		})
	}
	// 结束时间
	onChangeEndTime(value, dateString) {
		this.action.handleFilter('endTime', {
			endTime: dateString
		})
	}

	onChangeCurrency=(value)=>{
		this.action.handleFilter('currencyId', {
			currencyId: value
		})
	}

	onChangeBuyOrSell=(value)=>{
		this.action.handleFilter('buyOrSell', {
			buyOrSell: value
		})
	}

	render() {
		let store = this.props.successStore;
		let $content;
		
		if (!this.props.authStore.isLogin) {
			$content = <div className="mini-tip">{ UPEX.lang.template('登录后可查看已完成订单')}</div>
		} else if (!store.isFetching && store.orderList.length == 0) {
			$content = <div className="mini-tip">{ UPEX.lang.template('暂无数据') }</div>;
		} else {
			$content = (
				<ul className="list">
					{
						store.orderList.map((item, index)=>{
							return (
								<li key={index}>
									<dl>
										<dd className="time">{item.orderTime}</dd>
										<dd className="inorout">{item.buyOrSell == 1 ? <label className="buy">{UPEX.lang.template('买入')}</label>: <label className="sell">{UPEX.lang.template('卖出')}</label> }</dd>
										<dd className="name">{item.currencyNameEn}</dd>
										<dd className="num">{item.num}</dd>
										<dd className="tradeprice">{item.tradePrice}</dd>
										<dd className="fee">{item.fee}</dd>
										<dd className="amount">{item.tradeAmount}</dd>
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
					<h2>{ UPEX.lang.template('已完成')}</h2>
					<div className="filter-box">
    					<ul>
    						<li>
    							<label>{UPEX.lang.template('时间')}</label>
    							<DatePicker 
    								onChange={this.onChangeStartTime.bind(this)} 
    								placeholder={UPEX.lang.template('选择日期')}
    								allowClear={false}
    							/>
	                            <i>-</i>
	                            <DatePicker 
	                            	onChange={this.onChangeEndTime.bind(this)} 
	                            	placeholder={UPEX.lang.template('选择日期')}
	                            	allowClear={false}
	                            />
    						</li>
    						<li>
    							<label>{UPEX.lang.template('币种')}</label>
    							<Select defaultValue="0" onChange={this.onChangeCurrency}>
    								<Option value="0">{UPEX.lang.template('全部')}</Option>
    								{
    									this.props.commonStore.productList.map((item)=>{
    										if (item.currencyNameEn !== 'TWD') {
    											return <Option value={item.currencyId} key={item.currencyId}>{item.currencyNameEn}</Option>
    										}
    									})
    								}
    							</Select>
    						</li>
    						<li>
    							<label>{UPEX.lang.template('类型')}</label>
    							<Select defaultValue="0" onChange={this.onChangeBuyOrSell}>
    								<Option value="0">{UPEX.lang.template('全部')}</Option>
    								<Option value="1">{UPEX.lang.template('买')}</Option>
    								<Option value="2">{UPEX.lang.template('卖')}</Option>
    							</Select>
    						</li>
    					</ul>
					</div>
				</div>
				<div className="order-table success-list-table">
					<div className="table-hd">
						<table>
							<tbody>
								<tr>
									<th className="time">{UPEX.lang.template('时间')}</th>
									<th className="inorout">{UPEX.lang.template('买卖')}</th>
									<th className="name">{UPEX.lang.template('币种')}</th>
									<th className="num">{UPEX.lang.template('委托数量')}</th>
									<th className="tradeprice">{UPEX.lang.template('成交价格')}</th>
									<th className="fee">{UPEX.lang.template('手续费')}</th>
									<th className="amount">{UPEX.lang.template('成交金额')}</th>
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