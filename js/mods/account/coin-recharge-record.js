import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Checkbox, Icon, Pagination} from 'antd';

@inject('coinRechargeRecordStore')
@observer
class List extends Component {
	static defaultProps = {
		currencyId: 0
	}

	componentDidMount() {
		this.props.coinRechargeRecordStore.getData({
			start: 1,
			currencyId: this.props.currencyId || 0
		});
	}

	onChangePagination(page){
		this.props.coinRechargeRecordStore.getData({
			start: page
		});
	}

	render() {
		let store = this.props.coinRechargeRecordStore;
		let $content;
		
		if (!store.isFetching && store.orderList.length == 0) {
			$content = <div className="mini-tip">{ UPEX.lang.template('您暂时没有充币记录') }</div>;
		} else {
			$content = (
				<ul className="list">
					{
						store.orderList.map((item, index)=>{
							// 状态备用
							let status;

							switch(item.status) {
								case 1:
									status = UPEX.lang.template('充值中');
									break;
								case 2:
									status = UPEX.lang.template('充值成功');
									break;
								case 3:
									status = UPEX.lang.template('充值失败');
									break;
							}
							return (
								<li key={index}>
									<dl>
										<dd className="status">{item.confirms}</dd>
										<dd className="name">{item.currencyNameEn}</dd>
										<dd className="num">{item.coinNum}</dd>
										<dd className="time">{item.createTime}</dd>
										<dd className="address">{item.walletSn}</dd>
									</dl>
								</li>
							)
						})
					}
				</ul>
			)
		}

		return (
			<div className="account-record-list">
				<div className="table-hd">
					<table>
						<tbody>
							<tr>
								<th className="status">{UPEX.lang.template('状态')}</th>
								<th className="name">{UPEX.lang.template('币种')}</th>
								<th className="num">{UPEX.lang.template('数量')}</th>
								<th className="time">{UPEX.lang.template('时间')}</th>
								<th className="address">{UPEX.lang.template('来源地址')}</th>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="table-bd">
						{ $content }
						{ store.isFetching ? <div className="mini-loading"></div> : null }
				</div>
				<div className="table-ft">
					{ store.total > 0 ? <Pagination current={store.current} total={store.total} pageSize={store.pageSize} onChange={this.onChangePagination.bind(this)} /> : null }
				</div>
			</div>
		);
	}
}

export default List;