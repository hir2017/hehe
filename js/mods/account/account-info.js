import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
const Option = Select.Option;
import { Link , browserHistory } from 'react-router';

@inject('accountStore')
@observer
class InfoView extends Component {
	
	handleAllMoney=(e)=>{
		this.props.accountStore.handleVisibleMoney();
	}

	handleFiatRecharge=(e)=>{
		browserHistory.push('/account/balance/recharge');
	}

	handleFiatWidthdraw=(e)=>{
		browserHistory.push('/account/balance/withdraw');
	}

	handleCoinRecord=(e)=>{
		browserHistory.push('/account/coinrecord');
	}

	handleFiatRecord=(e)=>{
		browserHistory.push('/account/fiatrecord');
	}

	render() {
		let store = this.props.accountStore;
		
		return (
			<div className="account-hd-box">
				<div className="account-title">
					<h2>{ UPEX.lang.template('我的资产') }</h2>
					<div className="account-count">
						<label>{ UPEX.lang.template('总资产折合')}TWD</label>
						<Select defaultValue="TWD" className="hidden">
					    	<Option value="TWD">TWD</Option>
					    	<Option value="CNY">CNY</Option>
					    	<Option value="HKD">HKD</Option>
					    	<Option value="USD">USD</Option>
					    </Select>
					    <label>≈</label>
					    <em>{`NT$ ${store.allMoney}`}</em>
					</div>
				</div>
				<div className="account-content clearfix">
                    <div className="account-amount">
                        <div className="amount">
                            <label>{ UPEX.lang.template('可用余额')} </label>
                            <em>{ store.visibleMoney ? `NT$ ${store.baseCoinInfo.cashAmount || 0}` : '******'} </em>
                            <i className={store.visibleMoney ? 'open': 'close'} onClick={this.handleAllMoney}></i>
                        </div>
                        <div className="actions">
                            <button className="btn" onClick={this.handleFiatRecharge}>
                            	{ UPEX.lang.template('充值') }
                            </button>
                            <button className="btn" onClick={this.handleFiatWidthdraw}>
                            	{ UPEX.lang.template('提现') }
                            </button>
                        </div>
                    </div>
                    <div className="account-record">
                        <button className="btn" onClick={this.handleCoinRecord}>
                        	{ UPEX.lang.template('数位资产记录') }
                        </button>
                        <button className="btn" onClick={this.handleFiatRecord}>
                        	{ UPEX.lang.template('法币资金记录') }
                        </button>
                    </div>
				</div>
			</div>
		)
	}
}

export default InfoView;