/**
 * 法币充值
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message, AutoComplete, Button } from 'antd';
import { sendMessageWithdraw } from '@/api/http';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import toAction from './fiat-withdraw-action';
import AutoCompleteHack from '@/mods/common/auto-complete-hack';
import CardSelect from './bind-card-select';
import OrderInfo from './fiat-order-info';
import SmsBtn from '@/mods/common/sms-btn';

const Option = Select.Option;

@inject('fiatWithdrawStore', 'userInfoStore')
@observer
class FiatRechargeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            tradePwd: '',
            smsCode: '',
            gaCode: ''
        };
        this.inputData = {
            tradePwd: {
                label: UPEX.lang.template('资金密码'),
                target: '',
                inputProps: {
                    onChange: this.setVal.bind(this, 'tradePwd'),
                    type: 'password'
                }
            },
            smsCode: {
                label: UPEX.lang.template('手机验证'),
                target: '',
                className: 'sms-code',
                inputProps: {
                    onChange: this.setVal.bind(this, 'smsCode')
                }
            },
            gaCode: {
                label: UPEX.lang.template('Google验证'),
                target: '',
                inputProps: {
                    onChange: this.setVal.bind(this, 'gaCode')
                }
            }
        };
        this.action = toAction(this.props.fiatWithdrawStore, this.props.userInfoStore);
    }

    setVal(name, e) {
        let val = typeof e === 'object' ? e.target.value.trim() : e;
        if (name == 'gaCode' || name == 'smsCode') {
            val = val.replace(UPEX.replaceNaNReg, '');
            val = val.slice(0, 6);
        }
        this.setState({
            [name]: val
        });
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
        const { userInfo = {} } = this.props.userInfoStore;
        if (this.state.tradePwd === '') {
            message.error(UPEX.lang.template('请填写资金密码'));
            return;
        }
        if(userInfo.isGoogleAuth && this.state.gaCode === '') {
            message.error(UPEX.lang.template('请填写Google验证码'));
            return ;
        } else {
            if (this.state.smsCode === '') {
                message.error(UPEX.lang.template('请填写短信验证码'));
                return;
            }
        }

        this.action.handleSubmit(this.state, userInfo);
    };

    handleBack = e => {
        this.props.fiatWithdrawStore.nextStep('step1');
    };

    render() {
        let store = this.props.fiatWithdrawStore;
        const { userInfo = {} } = this.props.userInfoStore;
        let action = this.action;
        let $formContent;
        const { inputData, state } = this;
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
            const $sendBtn = <SmsBtn sendCode={sendMessageWithdraw.bind(this, state.imgCode, this.codeid)} />;
            $formContent = (
                <FormView>
                    <FormItem>
                        <OrderInfo {...orderData} />
                    </FormItem>
                    <FormItem {...inputData.tradePwd} />
                    {userInfo.isGoogleAuth ? (
                        <FormItem {...inputData.gaCode} value={state.gaCode} />
                    ) : (
                        <FormItem {...inputData.smsCode} value={state.smsCode} after={$sendBtn} />
                    )}
                    <FormItem>
                        <div className="rw-form-info">
                            {UPEX.config.baseCurrencySymbol}
                            {UPEX.lang.template('实际到账金额:{num}', { num: store.withdrawValue })}
                        </div>
                    </FormItem>
                    <FormItem>
                        <Button className="submit-btn" onClick={this.handleOrder}>
                            {UPEX.lang.template('确认提现')}
                        </Button>
                        <Button className="link-btn" onClick={this.handleBack}>
                            {UPEX.lang.template('返回修改')}
                        </Button>
                    </FormItem>
                    {/* <div className="rw-form-item">
                        <label className="rw-form-label" />
                        <div className="rw-form-info">
                            <button type="button" className="" onClick={this.handleBack}>
                                {UPEX.lang.template('返回修改')}
                            </button>
                        </div>
                    </div> */}
                </FormView>
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
