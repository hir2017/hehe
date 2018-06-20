/**
 * 资产列表
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Checkbox, Icon, message } from 'antd';
import { Link, browserHistory } from 'react-router';

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
		
		if(!store.isFetching && store.coinList.length == 0) {
			$content = <div className="mini-tip">{ UPEX.lang.template('暂无数据') }</div>;
		} else {
			$content = <AssetsListView/>;
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
						{ store.isFetching ? <div className="mini-loading"></div> : null}
					</div>
				</div>
			</div>
		);
	}
}

@inject('accountStore', 'userInfoStore')
@observer
class AssetsListView extends Component {
	handleCoinRecharge=(item, e)=>{
		let { userInfoStore } = this.props;
		
		if (userInfoStore.userInfo.authLevel >= 1) {
			browserHistory.push(`/account/coin/recharge/${item.currencyNameEn}`);
		} else {
			message.error(UPEX.lang.template('请先进行KYC1认证'));
		}
	}

	handleCoinWithdraw=(item, e)=>{
		browserHistory.push(`/account/coin/withdraw/${item.currencyNameEn}`);
	}

	handleCoinTrade=(item, e)=>{
		browserHistory.push(`/trade/TWD_${item.currencyNameEn}`);
	}
	
	render() {
		return (
			<ul>
				{
					this.props.accountStore.coinList.map((item, index)=>{
						return (
							<li key={index}>
								<dl>
									<dd className="name">
										<img src={`${item.icoUrl}`} alt=""/>
										{item.currencyNameEn}
									</dd>
									<dd className="total">{item.amount}</dd>
									<dd className="balance">{item.cashAmount}</dd>
									<dd className="freeze">{item.freezeAmount}</dd>
									<dd className="value">{item.twd_value}</dd>
									<dd className="actions">
										<button onClick={this.handleCoinRecharge.bind(this, item)}>
											{UPEX.lang.template('充币')}
										</button>
										<button onClick={this.handleCoinWithdraw.bind(this, item)}>
											{UPEX.lang.template('提币')}
										</button>
										<button onClick={this.handleCoinTrade.bind(this, item)}>
											{UPEX.lang.template('交易')}
										</button>
									</dd>
								</dl>
							</li>
						)
					})
				}
			</ul>
		)
	}
}


export default List;