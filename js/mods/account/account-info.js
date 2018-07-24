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
						<label>{ UPEX.lang.template('总资产折合')}</label>
						<label>{UPEX.config.baseCurrencyEn}</label>
					    <label>≈</label>
					    <em>{`NT$${store.allMoney || '0.00'}`}</em>
					</div>
				</div>
				<div className="account-content clearfix">
                    <div className="account-amount">
                    	<div className="amount-hd">
                    		<label>{ UPEX.lang.template('可用余额')} </label>
                    		<span  className="switch" onClick={this.handleAllMoney}>
                    			{store.visibleMoney ? UPEX.lang.template('隐藏金额'): UPEX.lang.template('显示金额')}
                    		</span>
                    	</div>
                        <div className="amount-bd clearfix">
                        	<div className="amount">
                            	<em><span className="unit">{UPEX.config.baseCurrencySymbol}</span>{ store.visibleMoney ? `${store.baseCoinInfo.cashAmount || 0}` : '******'} </em>
                            </div>
                            <div className="actions">
	                            <button type="button" className="btn recharge-btn" onClick={this.handleFiatRecharge}>
	                            	{ UPEX.lang.template('充值') }
	                            </button>
	                            <button type="button" className="btn withdraw-btn" onClick={this.handleFiatWidthdraw}>
	                            	{ UPEX.lang.template('提现') }
	                            </button>
	                        </div>
                        </div>
                        <ul className="amount-ft clearfix">
                        	<li>
                        		<label>{UPEX.lang.template('冻结资金')}</label>
                        		<em>{UPEX.config.baseCurrencySymbol} { store.visibleMoney ? `${store.baseCoinInfo.freezeAmount || 0}` : '******'} </em>
                        	</li>
                        	<li>
                        		<label>{UPEX.lang.template('资金总额')}</label>
                        		<em>{UPEX.config.baseCurrencySymbol} { store.visibleMoney ? `${store.baseCoinInfo.amount || 0}` : '******'} </em>
                        	</li>
                        </ul>
                    </div>
                    <div className="account-record">
                        <button type="button" className="btn" onClick={this.handleCoinRecord}>
                        	<i></i>
                        	<span>{ UPEX.lang.template('数位资产记录') }</span>
                        </button>
                        <button type="button" className="btn" onClick={this.handleFiatRecord}>
                        	<i></i>
                        	<span>{ UPEX.lang.template('法币资金记录') }</span>
                        </button>
                    </div>
				</div>
			</div>
		)
	}
}

export default InfoView;
