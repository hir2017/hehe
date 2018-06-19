import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Pagination} from 'antd';

@inject('coinWithdrawRecordStore')
@observer
class List extends Component {
	static defaultProps = {
		currencyId: 0
	}

	componentDidMount() {
		this.props.coinWithdrawRecordStore.getData({
			start: 1,
			currencyId: this.props.currencyId || 0
		});
	}

	onChangePagination(page){
		this.props.coinWithdrawRecordStore.getData({
			start: page
		});
	}

	render() {
		let store = this.props.coinWithdrawRecordStore;
		let $content;
		
		if (!store.isFetching && store.orderList.length == 0) {
			$content = <div className="mini-tip">{ UPEX.lang.template('您暂时没有提币记录') }</div>;
		} else {
			$content = (
				<ul className="list">
					{
						store.orderList.map((item, index)=>{
							return (
								<li key={index}>
									<dl>
										<dd className="status">{item.confirms}</dd>
										<dd className="name">{item.currencyNameEn}</dd>
										<dd className="num">{item.amount}</dd>
										<dd className="time">{item.createTime}</dd>
										<dd className="fee">{item.fee}</dd>
										<dd className="address">{UPEX.lang.template('地址')} : {item.address}</dd>
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
								<th className="fee">{UPEX.lang.template('手续费')}</th>
								<th className="address">{UPEX.lang.template('信息')}</th>
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