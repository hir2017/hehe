import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Select} from 'antd';

const Option = Select.Option;
import {Link, browserHistory} from 'react-router';

@inject('accountStore', 'userInfoStore', 'commonStore')
@observer
class InfoView extends Component {
    handleAllMoney = e => {
        this.props.accountStore.handleVisibleMoney();
    };

    skipTo(path) {
        browserHistory.push(path);
    }

    render() {
        let store = this.props.accountStore;
        // TODO: 把计算放到store里面, 计算法币的限制行为状态, 把commonStore嵌到userInfoStore
        const {actionRoles} = this.props.userInfoStore;
        const {coinsMap} = this.props.commonStore;
        let baseCurrency = coinsMap[UPEX.config.baseCurrencyEn];
        let btnDisable = {
            recharge: baseCurrency['rechargeStatus'] == 2 || actionRoles['recharge'] == 2,
            withdraw: baseCurrency['withdrawStatus'] == 2 || actionRoles['withdraw'] == 2
        };
        return (
            <div className="account-hd-box">
                <div className="account-title">
                    <h2>{UPEX.lang.template('我的资产')}</h2>
                    <div className="account-count">
                        <label>{UPEX.lang.template('总资产折合')}</label>
                        <label>{UPEX.config.baseCurrencyEn}</label>
                        <label>≈</label>
                        <em>
                            {`NT$${store.allMoney || '0.00'}`} {UPEX.config.baseCurrencyEn}
                        </em>
                    </div>
                </div>
                <div className="account-content clearfix">
                    <div className="account-amount">
                        <div className="amount-hd">
                            <label>{UPEX.lang.template('可用余额')} </label>
                            <span className={store.visibleMoney ? "switch hide" : "switch"}
                                  onClick={this.handleAllMoney}>
                                {store.visibleMoney ? UPEX.lang.template('隐藏金额') : UPEX.lang.template('显示金额')}
                            </span>
                        </div>
                        <div className="amount-bd clearfix">
                            <div className="amount">
                                {UPEX.config.version === 'ace' ? (
                                    <em>
                                        <span className="unit">{UPEX.config.baseCurrencySymbol}</span>
                                        {store.visibleMoney ? `${store.baseCoinInfo.cashAmount || 0}` : '******'}{' '}
                                    </em>
                                ) : (
                                    <em>
                                        {store.visibleMoney ? `${store.baseCoinInfo.cashAmount || 0}` : '******'}{' '}
                                        <span className="unit">{UPEX.config.baseCurrencySymbol}</span>
                                    </em>
                                )}
                            </div>
                            <div className="actions">
                                <button type="button" title={btnDisable.recharge ? UPEX.lang.template('当前币种暂停此操作') : ''}
                                        disabled={btnDisable.recharge} className="btn recharge-btn"
                                        onClick={this.skipTo.bind(this, '/account/balance/recharge')}>
                                    {UPEX.lang.template('充值')}
                                </button>
                                <button type="button" title={btnDisable.withdraw ? UPEX.lang.template('当前币种暂停此操作') : ''}
                                        disabled={btnDisable.withdraw} className="btn withdraw-btn"
                                        onClick={this.skipTo.bind(this, '/account/balance/withdraw')}>
                                    {UPEX.lang.template('提现')}
                                </button>
                            </div>
                        </div>
                        <ul className="amount-ft clearfix">
                            <li>
                                <label>{UPEX.lang.template('冻结资金')}</label>
                                <em>
                                    {UPEX.config.baseCurrencySymbol} {store.visibleMoney ? `${store.baseCoinInfo.freezeAmount || 0}` : '******'}{' '}
                                </em>
                            </li>
                            <li>
                                <label>{UPEX.lang.template('资金总额')}</label>
                                <em>
                                    {UPEX.config.baseCurrencySymbol} {store.visibleMoney ? `${store.baseCoinInfo.amount || 0}` : '******'}{' '}
                                </em>
                            </li>
                        </ul>
                    </div>
                    <div className="account-record">
                        <button type="button" className="btn" onClick={this.skipTo.bind(this, '/account/coinrecord')}>
                            <span>{UPEX.lang.template('数位资产记录')}</span>
                        </button>
                        <button type="button" className="btn" onClick={this.skipTo.bind(this, '/account/fiatrecord')}>
                            <span>{UPEX.lang.template('法币资金记录')}</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoView;
