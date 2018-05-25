import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {  Select, DatePicker, Pagination } from 'antd';

const Option = Select.Option;

@inject('orderStore')
@observer
class List extends Component {
	componentDidMount() {
		this.props.orderStore.getSuccessOrderList();
	}

	onChangePagination(pageNo){
		let params = {
			pageNo
		};

		this.props.orderStore.getSuccessOrderList(params);
	}
	// 开始时间
	onChangeStartTime(value, dateString){
		let params = {
			pageNo: 1,
			beginTime: dateString === null ? null : dateString
		};

		this.props.orderStore.getSuccessOrderList(params);
	}
	// 结束时间
	onChangeEndTime(value, dateString) {
		let params = {
			pageNo: 1,
			endTime: dateString === null ? null : dateString
		};

		this.props.orderStore.getSuccessOrderList(params);
	}

	onChangeCurrency=(value)=>{
		let params = {
			pageNo: 1,
			currencyId: value
		}
		this.props.orderStore.getSuccessOrderList(params);
	}

	onChangeBuyOrSell=(value)=>{
		let params = {
			pageNo: 1,
			buyOrSell: value
		}
		this.props.orderStore.getSuccessOrderList(params);
	}

	render() {
		let store = this.props.orderStore;
		let $content;
		
		if(store.isFetchingSuccessList){
			$content = <div className="mini-tip">{ UPEX.lang.template('正在加载')}</div>
		} else if(store.successOrderList.length == 0) {
			$content = <div className="mini-tip">{ UPEX.lang.template('暂无数据') }</div>;
		} else {
			$content = (
				<div>
					<ul className="list">
						{
							store.successOrderList.map((item, index)=>{
								return (
									<li key={index}>
										<dl>
											<dd className="time">{item.orderTime}</dd>
											<dd className="name">{item.currencyNameEn}</dd>
											<dd className="num">{item.num}</dd>
											<dd className="inorout">{item.buyOrSell == 1 ? <label className="buy">{UPEX.lang.template('买入')}</label>: <label className="sell">{UPEX.lang.template('卖出')}</label> }</dd>
											<dd className="tradeprice">{item.tradePrice}</dd>
											<dd className="fee">{item.fee}</dd>
											<dd className="amount">{item.tradeAmount}</dd>
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
					<div className="filter-box">
    					<ul>
    						<li>
    							<label>{UPEX.lang.template('币种')}</label>
    							<Select defaultValue="0" onChange={this.onChangeCurrency}>
    								<Option value="0">{UPEX.lang.template('全部')}</Option>
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
    					</ul>
					</div>
				</div>
				<div className="order-table success-list-table">
					<div className="table-hd">
						<table>
							<tbody>
								<tr>
									<th className="time">{UPEX.lang.template('时间')}</th>
									<th className="name">{UPEX.lang.template('币种')}</th>
									<th className="num">{UPEX.lang.template('委托数量')}</th>
									<th className="inorout">{UPEX.lang.template('买卖')}</th>
									<th className="tradeprice">{UPEX.lang.template('成交价格')}</th>
									<th className="fee">{UPEX.lang.template('手续费')}</th>
									<th className="amount">{UPEX.lang.template('成交金额')}</th>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="table-bd">
						{ $content }
					</div>
				</div>
			</div>
		)
	}
}

export default List;