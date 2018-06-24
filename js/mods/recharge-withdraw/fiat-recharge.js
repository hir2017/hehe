/**
 * 法币充值
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import { Select } from 'antd';
const Option = Select.Option;
import toAction from './fiat-recharge-action';

import CardSelect from './bind-card-select';
import OrderInfo from './fiat-order-info';

// 金流類型
const cashTypes = () => {
    return [
        // { val: 'PD-ATM-POST', label: UPEX.lang.template('郵局實體ATM') }, // 无该资质渠道
        { val: 'PD-ATM-CTCB', label: UPEX.lang.template('中國信託實體ATM') }, // 只显示订单，没有支付
        // { val: 'PD-ATM-HNCB', label: UPEX.lang.template('華南實體ATM') }, // 只显示订单，没有支付
        // { val: 'PD-ATM-SINOPAC', label: UPEX.lang.template('永豐實體ATM') }, // 只显示订单，没有支付
        { val: 'PD-ATM-SCSB', label: UPEX.lang.template('上海商銀即時ATM') }, // 无该资质渠道
        // { val: 'PD-WEBATM-POST', label: UPEX.lang.template('郵局WEB-ATM') }, // 无该资质渠道
        // { val: 'PD-WEBATM-TCB', label: UPEX.lang.template('合庫WEBATM') },// 可使用
        // { val: 'PD-WEBATM-CTCB', label: UPEX.lang.template('中國信託WEB-ATM') },// 可使用
        { val: 'PD-WEBATM-HNCB', label: UPEX.lang.template('華南WEB-ATM') },// 可使用
        // { val: 'PD-WEBATM-TSCB', label: UPEX.lang.template('台新WEB-ATM') },// 可使用
        // { val: 'PD-WEBATM-SINOPAC', label: UPEX.lang.template('永豐WEB-ATM') },// 可使用
        { val: 'PD-WEBATM-ESUN', label: UPEX.lang.template('玉山銀行WEB-ATM') }// 可使用
    ];
};

@inject('fiatRechargeStore')
@observer
class FiatRechargeView extends Component {
    constructor(props) {
        super(props);

        this.action = toAction(this.props.fiatRechargeStore);
    }

    componentDidMount() {
        this.props.fiatRechargeStore.resetProps();
        this.props.fiatRechargeStore.getInfo();
    }

    handleOrder = e => {
        this.action.handleRecharge();
    };

    onConfirm = e => {
        browserHistory.push('/account/fiatrecord');
    };

    render() {
        let store = this.props.fiatRechargeStore;
        let $formContent;

        if (store.step == 'success') {
            let currCardInfo = store.selectBindCardInfo;
            const orderData = {
                labels: {
                    title: UPEX.lang.template('充值信息确认'),
                    card: UPEX.lang.template('充值银行卡'),
                    count: UPEX.lang.template('充值金额')
                },
                count: store.balance,
                card: currCardInfo.cardNo,
                user: currCardInfo.cardName,
                bank: currCardInfo.openBank
            };
            $formContent = (
                <div className="rw-form">
                    <OrderInfo {...orderData} />
                    <div className="rw-form-item">
                        <label className="rw-form-label" />
                        <div className="rw-form-info">
                            <button className="submit-btn" onClick={this.onConfirm}>
                                {UPEX.lang.template('已完成支付')}
                            </button>
                            <button className="problem-btn">
                                <Link>{UPEX.lang.template('支付遇到问题')}</Link>
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            const setVal = (val, field) => {
                store.setVal(val, field);
            }
            const SelectData = {
                type: 'recharge',
                setVal,
                cards: store.bankCardsList,
                count: store.accountAmount,
                labels: { card: UPEX.lang.template('选择充值的银行卡'), balance: UPEX.lang.template('充值金额') }
            };
            $formContent = (
                <div className="rw-form">
                    <CardSelect {...SelectData} />
                    <div className="rw-form-item">
                        <label className="rw-form-label">{UPEX.lang.template('金流類型')}</label>
                        <div className="rw-form-info">
                            <Select
                                defaultValue={store.cashType}
                                onChange={val => {
                                    setVal(val, 'cashType');
                                }}
                            >
                                {cashTypes().map((cur, index) => {
                                    return (
                                        <Option key={index} value={cur.val}>
                                            {cur.label}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </div>
                    </div>
                    <div className="rw-form-item">
                        <div className="rw-form-info">
                            <button className="submit-btn" onClick={this.handleOrder}>
                                {UPEX.lang.template('去网上银行充值')}
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {$formContent}
                <div className="rw-form">
                    <div className="rw-form-info">
                        <div className="warmprompt">
                            <h4 className="warmprompt-title">{UPEX.lang.template('充值遇到了问题')}</h4>
                            <div className="warmprompt-content">
                                <ul>
                                    <li>1. 我們只支持已綁定的銀行卡充值，如沒有綁定銀行賬戶，請先綁定;</li>
                                    <li>2. 不同銀行資金到賬時間不一樣。如果充值后資金未幾時到賬，請聯繫您的銀行；</li>
                                    <li>3. 如遇任何充值問題請聯繫我們的客服 support@acex.one</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FiatRechargeView;
