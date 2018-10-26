/**
 * 法币提现
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message, Button, Card } from 'antd';
import { sendMessageWithdraw } from '@/api/http';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import toAction from './action';
import CardSelect from '../bind-card-select';
import SmsBtn from '@/mods/common/sms-btn';

const Option = Select.Option;

@inject('fiatWithdrawStore', 'userInfoStore', 'accountStore')
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



    componentDidMount() {
        this.props.fiatWithdrawStore.resetProps();
        this.action.getInfo();
        this.props.accountStore.getUserActionLimit('withdraw');
    }

    componentWillUnmount() {
        this.action.destroy();
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

    handleNextStep = e => {
        const { accountAmount, balance } = this.props.fiatWithdrawStore;
        const {withdraw} = this.props.accountStore.cashLimit;
        if(parseFloat(balance) < withdraw.lowLimit) {
            message.error(UPEX.lang.template('最小提现金额为 {num}', {num: `${withdraw.lowLimit} ${UPEX.config.baseCurrencyEn}`}));
            return;
        }
        if(parseFloat(balance) > withdraw.highLimit) {
            message.error(UPEX.lang.template('最大提现金额为 {num}', {num: `${withdraw.highLimit} ${UPEX.config.baseCurrencyEn}`}));
            return;
        }

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
        if(userInfo.isGoogleAuth) {
            if(this.state.gaCode === '') {
                message.error(UPEX.lang.template('请填写Google验证码'));
                return ;
            }
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
        const {withdraw} = this.props.accountStore.cashLimit;
        const { userInfo = {} } = this.props.userInfoStore;
        let $formContent;
        const { inputData, state } = this;
        if (store.step == 'apply') {
            let currCardInfo = store.selectBindCardInfo;
            const $sendBtn = <SmsBtn sendCode={sendMessageWithdraw.bind(this, state.imgCode, this.codeid)} />;
            let fee = (parseInt(store.balance) - store.withdrawValue);
            $formContent = (
                <FormView >
                    <FormItem label={UPEX.lang.template('提现信息确认')}>
                        <Card>
                            <p>
                                <label>{UPEX.lang.template('开户人')}:</label>
                                <span className="val">{currCardInfo.cardName}</span>
                            </p>
                            <p>
                                <label>{UPEX.lang.template('开户银行')}:</label>
                                <span className="val">{currCardInfo.openBank}</span>
                            </p>
                            <p>
                                <label>{UPEX.lang.template('银行账号')}:</label>
                                <span className="val">{currCardInfo.cardNo}</span>
                            </p>
                            <p className="text">{UPEX.lang.template('为了您的资金安全，请确认您的银行卡信息是否正确')}</p>
                        </Card>
                    </FormItem>
                    <FormItem className="amount-info">
                        <div className="source">
                            {UPEX.lang.template('提现金额')}
                            <div className="val">
                                {store.balance} {UPEX.config.baseCurrencyEn}
                            </div>
                        </div>
                        <div className="real">
                            <p>
                                {UPEX.lang.template('到账金额')}: {UPEX.config.baseCurrencyEn} <em>{store.withdrawValue}</em>
                            </p>
                            <p>
                                {UPEX.lang.template('手续费')}: {UPEX.config.baseCurrencyEn} <em>{fee}</em>
                            </p>
                        </div>
                    </FormItem>
                    <FormItem {...inputData.tradePwd} />
                    {userInfo.isGoogleAuth ? (
                        <FormItem {...inputData.gaCode} value={state.gaCode} />
                    ) : (
                        <FormItem {...inputData.smsCode} value={state.smsCode} after={$sendBtn} />
                    )}
                    <FormItem>
                        <Button className="submit-btn" onClick={this.handleOrder}>
                            {UPEX.lang.template('确认提现')}
                        </Button>
                        <Button className="link-btn" onClick={this.handleBack}>
                            {UPEX.lang.template('返回修改')}
                        </Button>
                    </FormItem>
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
                labels: { card: UPEX.lang.template('选择提现的银行卡'), balance: UPEX.lang.template('提现金额')},
                lowLimit: `${withdraw.lowLimit} ${UPEX.config.baseCurrencyEn}`
            };

            $formContent = (
                <FormView>
                    <FormItem>
                        <CardSelect {...SelectData} />
                    </FormItem>
                    <FormItem>
                        <Button className="submit-btn" onClick={this.handleNextStep}>
                            {UPEX.lang.template('下一步')}
                        </Button>
                    </FormItem>
                </FormView>
            );
        }

        return <div>{$formContent}</div>;
    }
}

export default FiatRechargeView;
