import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {  Select, DatePicker, Pagination} from 'antd';
const Option = Select.Option;
import PopupTradePwd from './tradepwd';

@inject('commonStore','orderStore')
@observer
class List extends Component {
	componentDidMount() {
		this.props.commonStore.getAllCoinPoint();
		this.props.orderStore.getHistoryOrderList();
	}

	onChangePagination(pageNo){
		let params = {
			pageNo
		};

		this.props.orderStore.getHistoryOrderList(params);
	}
	// 开始时间
	onChangeStartTime(value, dateString){
		let params = {
			pageNo: 1,
			beginTime: dateString === null ? null : dateString
		};

		this.props.orderStore.getHistoryOrderList(params);
	}
	// 结束时间
	onChangeEndTime(value, dateString) {
		let params = {
			pageNo: 1,
			endTime: dateString === null ? null : dateString
		};

		this.props.orderStore.getHistoryOrderList(params);
	}

	onChangeCurrency=(value)=>{
		let params = {
			pageNo: 1,
			currencyId: Number(value)
		}
		this.props.orderStore.getHistoryOrderList(params);
	}

	onChangeBuyOrSell=(value)=>{
		let params = {
			pageNo: 1,
			buyOrSell: Number(value)
		}
		this.props.orderStore.getHistoryOrderList(params);
	}

	onChangeStatus=(value)=>{
		let params = {
			pageNo: 1,
			status: Number(value)
		}
		this.props.orderStore.getHistoryOrderList(params);
	}
	/**
	/**
	 * 点击撤单，判断是否需要的填写交易密码
	 */
	handleCancel=(orderNo)=>{
		let { tradePasswordStatus } = this.props.orderStore;
		this.currentOrderNo = orderNo;

		if (tradePasswordStatus == 1) {
			this.refs.popup.setState({
				visible: true
			});
		} else {
	        this.handelCancelOrder();
		}
	}

	handelCancelOrder=(e)=>{
		let { cancelOrder } = this.props.orderStore;

		cancelOrder(this.currentOrderNo).then((data)=>{
        	
        })
	}

	render() {
		let store = this.props.orderStore;
		let $content;
		
		if(store.isFetchingHistoryList){
			$content = <div className="mini-tip">{ UPEX.lang.template('正在加载')}</div>
		} else if(store.historyOrderList.length == 0) {
			$content = <div className="mini-tip">{ UPEX.lang.template('暂无数据') }</div>;
		} else {
			$content = (
				<div>
					<ul className="list">
						{
							store.historyOrderList.map((item, index)=>{
								let status;
								let action;
								// 0. 未成交 1. 部分成交 2. 全部成交 3. 委托失败 4. 全部撤单 5. 部分成交后撤单
								switch(item.status) {
									case 0:
										status = UPEX.lang.template('未成交');
										break;
									case 1:
										status = UPEX.lang.template('部分成交');
										break;
									case 2:
										status = UPEX.lang.template('全部成交');
										break;
									case 3:
										status = UPEX.lang.template('委托失败');
										break; 
									case 4:
										status = UPEX.lang.template('全部撤单');
										break;
									case 5:
										status = UPEX.lang.template('部分成交后撤单');
										break;
								}

								if ([2,4,5].indexOf(item.status) > -1) {
									action = '--';
								} else {
									action = <button onClick={this.handleCancel.bind(this, item.orderNo)}>{UPEX.lang.template('撤单')}</button>
								}
								
								return (
									<li key={index}>
										<dl>
											<dd className="time">{item.orderTime}</dd>
											<dd className="name">{item.currencyNameEn}</dd>
											<dd className="num">{`${item.tradeNum}/${item.num}`}</dd>
											<dd className="price">{item.price}</dd>
											<dd className="inorout">{item.buyOrSell == 1 ? <label className="buy">{UPEX.lang.template('买入')}</label>: <label className="sell">{UPEX.lang.template('卖出')}</label> }</dd>
											<dd className="tradeprice">--</dd>
											<dd className="status">{status}</dd>
											<dd className="action">{action}</dd>
										</dl>
									</li>
								)
							})
						}
					</ul>
					<Pagination defaultCurrent={1} total={store.totalHistoryPage} onChange={this.onChangePagination.bind(this)} />
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
    								{
    									this.props.commonStore.productList['TWD'].map((item)=>{
    										return <Option value={item.currencyId}>{item.currencyNameEn}</Option>
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
    						<li>
    							<label>{UPEX.lang.template('状态')}</label>
    							<Select defaultValue="12" onChange={this.onChangeStatus}>
    								<Option value="12">{UPEX.lang.template('全部')}</Option>
    								<Option value="2">{UPEX.lang.template('全部成交')}</Option>
    								<Option value="4">{UPEX.lang.template('全部撤单')}</Option>
    								<Option value="5">{UPEX.lang.template('部分成交后撤单')}</Option>
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
				<div className="order-table history-list-table">
					<div className="table-hd">
						<table>
							<tbody>
								<tr>
									<th className="time">{UPEX.lang.template('时间')}</th>
									<th className="name">{UPEX.lang.template('币种')}</th>
									<th className="num">{UPEX.lang.template('成交数量/委托数量')}</th>
									<th className="price">{UPEX.lang.template('委托价格')}</th>
									<th className="inorout">{UPEX.lang.template('买卖')}</th>
									<th className="tradeprice">{UPEX.lang.template('成交均价')}</th>
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
				<PopupTradePwd ref="popup" onSubmit={this.handelCancelOrder}/>
			</div>
		)
	}
}

export default List;