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
										<dd className="status">成功</dd>
										<dd className="name">{item.currencyNameEn}</dd>
										<dd className="num">{item.amount}</dd>
										<dd className="time">2018-07-24  23:29:15</dd>
										<dd className="address">0x88380d78ac0074c0f60943212d518e984b4bb81</dd>
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
					{
						$content
					}
				</div>
			</div>
		);
	}
}

export default List;