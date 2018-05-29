import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Checkbox, Icon } from 'antd';

@inject('accountStore')
@observer
class List extends Component {
	handleSearch=(e)=>{

        let el = $(e.currentTarget);
        let val = el.val();
        
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
        	this.props.accountStore.filterByName(val);
        }, 100);
	}

	onChangeCheckBox=(e)=>{
        let checked = e.target.checked == true;

        this.props.accountStore.filterZeroAmount(checked);
	}

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
										<dd className="name">
											<img src={`${UPEX.config.imgHost}${item.icoUrl}`} alt=""/>
											{item.currencyNameEn}
										</dd>
										<dd className="total">{item.amount}</dd>
										<dd className="balance">{item.cashAmount}</dd>
										<dd className="freeze">{item.freezeAmount}</dd>
										<dd className="value">{item.btc_value}</dd>
										<dd className="actions">
											<button>{UPEX.lang.template('充币')}</button>
											<button>{UPEX.lang.template('提币')}</button>
											<button>{UPEX.lang.template('交易')}</button>
										</dd>
									</dl>
								</li>
							)
						})
					}
				</ul>
			)
		}

		return (
			<div className="account-list">
				<div className="account-filter-box">
					<div className="filter-input">
						<Icon type="search" />
						<input type="text" onChange={this.handleSearch} placeholder={UPEX.lang.template('搜索数字币')}/>
					</div>
					<div className="filter-radio">
						<Checkbox onChange={ this.onChangeCheckBox } >{UPEX.lang.template('隐藏资产为０的货币')}</Checkbox>
					</div>
				</div>
				<div className="account-result-list">
					<div className="table-hd">
						<table>
							<tbody>
								<tr>
									<th className="name">{UPEX.lang.template('币种')}</th>
									<th className="total">{UPEX.lang.template('总额')}</th>
									<th className="balance">{UPEX.lang.template('可用余额')}</th>
									<th className="freeze">{UPEX.lang.template('委托冻结')}</th>
									<th className="value">{UPEX.lang.template('价值')}</th>
									<th className="actions">{UPEX.lang.template('操作')}</th>
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
			</div>
		);
	}
}
export default List;