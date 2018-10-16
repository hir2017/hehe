/**
 * 法币充值
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message, AutoComplete } from 'antd';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import toAction from './fiat-withdraw-action';
import AutoCompleteHack from '@/mods/common/auto-complete-hack';
import CardSelect from './bind-card-select';
import OrderInfo from './fiat-order-info';

const Option = Select.Option;

@inject('fiatWithdrawStore', 'userInfoStore')
@observer
class FiatRechargeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        }
        this.action = toAction(this.props.fiatWithdrawStore, this.props.userInfoStore);
    }

    componentDidMount() {
        this.props.fiatWithdrawStore.resetProps();
        this.action.getInfo();
    }

    componentWillUnmount() {
        this.action.destroy();
    }

    handleNextStep = e => {
        const { accountAmount, balance } = this.props.fiatWithdrawStore;
        try {
            if (parseInt(balance) > parseFloat(accountAmount)) {
                message.error(UPEX.lang.template('请填写正确的提现金额'));
                return;
            }
        } catch (error) {
            console.error(error);
        }
        this.action.nextStep();
    };

    handleOrder = e => {
        this.action.handleSubmit();
    };

    handleBack = e => {
        this.props.fiatWithdrawStore.nextStep('step1');
    };

    render() {
        let store = this.props.fiatWithdrawStore;
        let action = this.action;
        let $formContent;

        if (store.step == 'apply') {
            let currCardInfo = store.selectBindCardInfo;
            const orderData = {
                labels: {
                    title: UPEX.lang.template('提现信息确认'),
                    card: UPEX.lang.template('提现银行卡'),
                    count: UPEX.lang.template('提现金额')
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
                        <label className="rw-form-label">{UPEX.lang.template('验证方式')}</label>
                        <div className="rw-form-info">
                            <ul className="tab-nav">
                                {store.supportAuthTypes.map((item, index) => {
                                    let text;

                                    if (item == 'phone') {
                                        text = UPEX.lang.template('手机验证');
                                    } else if (item == 'google') {
                                        text = UPEX.lang.template('Google验证');
                                    }

                                    return (
                                        <li
                                            key={item}
                                            onClick={() => action.changeAuthTypeTo(item)}
                                            className={store.authType == item ? 'tab-item selected' : 'tab-item'}
                                        >
                                            {text}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="rw-form-item">
                        <label className="rw-form-label" />
                        <div className="rw-form-info">
                            <AutoCompleteHack />
                            {store.authType == 'phone' ? (
                                <div className="input-button-box">
                                    <div className="input-box">
                                        <input
                                            type="text"
                                            name="fia_no_auto2"
                                            autoComplete="off"
                                            data-key="phonecode"
                                            value={store.phoneCode}
                                            placeholder={UPEX.lang.template('请填写短信验证码')}
                                            onChange={action.onChangeInput}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={action.sendEmailPhoneCode}
                                        className={`rw-sp-vcode-btn  ${store.sendingcode ? 'disabled' : ''}`}
                                    >
                                        <div className={store.sendingcode ? 'code-sending' : 'code-sending hidden'}>
                                            {UPEX.lang.template('重发')}（<span data-second="second" ref="second" />
                                            s）
                                        </div>
                                        <div className={store.sendingcode ? 'code-txt hidden' : 'code-txt'}>{UPEX.lang.template('获取验证码')}</div>
                                    </button>
                                </div>
                            ) : (
                                <div className="input-box">
                                    <input
                                        type="number"
                                        name="fia_no_auto2"
                                        data-key="googlecode"
                                        autoComplete="off"
                                        value={store.googleCode}
                                        placeholder={UPEX.lang.template('请填写Google验证码')}
                                        onChange={action.onChangeInput}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="rw-form-item">
                        <label className="rw-form-label">{UPEX.lang.template('资金密码')}</label>
                        <div className="rw-form-info">
                            <div className={`input-box ${store.validTradePwd ? '' : 'wrong'}`}>
                                <input
                                    type="password"
                                    name="fia_no_auto3"
                                    data-key="tradepwd"
                                    value={store.tradepwd}
                                    autoComplete="off"
                                    placeholder={UPEX.lang.template('请输入资金密码')}
                                    onChange={action.onChangeInput}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rw-form-item">
                        <label className="rw-form-label" />
                        <div className="rw-form-info">
                            {UPEX.config.baseCurrencySymbol}
                            {UPEX.lang.template('实际到账金额:{num}', { num: store.withdrawValue })}
                        </div>
                    </div>
                    <div className="rw-form-item">
                        <label className="rw-form-label" />
                        <div className="rw-form-info">
                            <button type="button" className="submit-btn" onClick={this.handleOrder}>
                                {UPEX.lang.template('确认提现')}
                            </button>
                        </div>
                    </div>
                    <div className="rw-form-item">
                        <label className="rw-form-label" />
                        <div className="rw-form-info">
                            <button type="button" className="problem-btn rw-sp-vcode-btn" onClick={this.handleBack}>
                                {UPEX.lang.template('返回修改')}
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            const SelectData = {
                type: 'withdraw',
                setVal: (val, field) => {
                    store.setVal(val, field);
                },
                cards: store.bankCardsList.filter(item => item.status === 1),
                count: store.accountAmount,
                labels: { card: UPEX.lang.template('选择提现的银行卡'), balance: UPEX.lang.template('提现金额') }
            };
            // FormView
            // FormItem
            $formContent = (
                <div className="rw-form">
                    <CardSelect {...SelectData} />
                    <div className="rw-form-item">
                        <label className="rw-form-label" />
                        <div className="rw-form-info">
                            <button type="button" className="submit-btn" onClick={this.handleNextStep}>
                                {UPEX.lang.template('下一步')}
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return <div>{$formContent}</div>;
    }
}

export default FiatRechargeView;
