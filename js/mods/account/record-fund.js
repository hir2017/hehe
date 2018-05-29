import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Checkbox, Icon } from 'antd';

@inject('accountStore')
@observer
class List extends Component {
	render() {
		let store = this.props.accountStore;
		let $content;
		
		if(store.isFetchingList){
			$content = <div className="mini-tip">{ UPEX.lang.template('正在加载')}</div>
		} else if(store.list.length == 0) {
			$content = <div className="mini-tip">{ UPEX.lang.template('暂无数据') }</div>;
		} else {
			$content = (
				<ul>
					{
						store.list.map((item, index)=>{
							return (
								<li key={index}>
									<dl>
										<dd className="no">2018192480114</dd>
										<dd className="time">2018-07-24  23:29:15</dd>
										<dd className="name">银行卡充值</dd>
										<dd className="sz">+2000</dd>
										<dd className="balance">373623.79</dd>
										<dd className="paymethod">373623.79</dd>
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
								<th className="no">{UPEX.lang.template('流水号')}</th>
								<th className="time">{UPEX.lang.template('日期')}</th>
								<th className="name">{UPEX.lang.template('名称')}</th>
								<th className="sz">{UPEX.lang.template('收/支')}</th>
								<th className="balance">{UPEX.lang.template('账户余额')}</th>
								<th className="paymethod">{UPEX.lang.template('支付方式')}</th>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="table-bd">
					{
						$content
					}
				</div>
			</div>
		);
	}
}

export default List;