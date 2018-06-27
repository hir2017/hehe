import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Pagination} from 'antd';

@inject('coinWithdrawRecordStore')
@observer
class List extends Component {
	static defaultProps = {
		currencyId: 0
	}

	constructor(props){
		super(props);

		this.state = {
			displayIndex: -1
		}

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


    triggerShowDetail=(index)=>{
    	if (index == this.state.displayIndex) {
    		this.setState({
	        	displayIndex: -1
	        });
    	} else {
    		this.setState({
	        	displayIndex: index
	        });
    	}
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
							// 状态备用
							let status = '';
							
							switch (item.confirms){
								case 'Success':
									status =  UPEX.lang.template('成功');
									break;
								case 'Reject':
									status =  UPEX.lang.template('拒绝');
									break;
								case 'Verify':
									status =  UPEX.lang.template('审核中');
									break;
								default:
									// 数字：网络确认数
									status = UPEX.lang.template('提币中({num}/{total})', {num: item.confirms, total: item.finalConfirms});
							}

							return (
								<li key={index} className={this.state.displayIndex == item.id ? 'collapse-content-active' : ''} data-id={item.id}>
									<dl>
										<dd className="status">{status}</dd>
										<dd className="name">{item.currencyNameEn}</dd>
										<dd className="num">{item.amount}</dd>
										<dd className="time">{item.createTime}</dd>
										<dd className="fee">{item.fee}</dd>
										<dd className="address">{UPEX.lang.template('地址')} : {item.address}</dd>
										<dd className="action">
											<button onClick={this.triggerShowDetail.bind(this, item.id)}>{ this.state.displayIndex == item.id ? UPEX.lang.template('收起') : UPEX.lang.template('展开')}</button>
										</dd>
									</dl>
									<div className="detail-content">
										{UPEX.lang.template('Txid:{value}', { value: item.walletWaterSn || '--'})}
									</div>
								</li>
							)
						})
					}
				</ul>
			)
		}

		return (
			<div className="order-table coin-withdraw-list">
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
								<th className="action"><span className="pr10">{UPEX.lang.template('操作')}</span></th>
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