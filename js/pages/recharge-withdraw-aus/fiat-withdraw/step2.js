import React from 'react';
import { Button, Card, message } from 'antd';
import { ausGetWithdrawCashFee, sendMessageWithdraw } from '@/api/http';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import SmsBtn from '@/mods/common/sms-btn';

export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tradePwd: '',
            smsCode: '',
            gaCode: '',
            captcha: '1',
            imgCode: '1'
        };
        this.codeid = '1';
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
    }

    componentDidMount() {
        const { info } = this.props;
        ausGetWithdrawCashFee({
            amount: info.amount
        })
            .then(res => {
                if (res.status === 200) {
                    let number = info.amount * 100 - res.attachment * 100;
                    this.setState({
                        fee: res.attachment,
                        real: parseFloat(number / 100, 10)
                    });
                }
            })
            .catch(err => {
                console.error(err, 'ausGetWithdrawCashFee');
            });
    }

    setVal(name, e) {
        this.setState({
            [name]: typeof e === 'object' ? e.target.value.trim() : e
        });
    }

    validate() {
        const { props, state } = this;
        if (state.tradePwd === '') {
            message.error(UPEX.lang.template('请输入资金密码'));
            return false;
        }
        if (props.isGa) {
            if (state.gaCode === '') {
                message.error(UPEX.lang.template('请填写谷歌验证码'));
                return false;
            }
        } else {
            if (state.smsCode === '') {
                message.error(UPEX.lang.template('请填写短信验证码'));
                return false;
            }
        }
        return true;
    }

    submit(e, back) {
        const { props, state } = this;
        if (back) {
            props.next(1, null);
            return;
        }
        if (!this.validate()) {
            return;
        }

        props.next(3, {
            ...state
        });
    }

    render() {
        const { props, inputData, state } = this;
        const info = props.info || {};

        const $sendBtn = <SmsBtn sendCode={sendMessageWithdraw.bind(this, state.imgCode, this.codeid)} />;

        return (
            <FormView>
                <FormItem label={UPEX.lang.template('提现信息确认')}>
                    <Card>
                        <p>
                            <label>{UPEX.lang.template('开户人(Account name)')}:</label>
                            <span className="val">{props.name}</span>
                        </p>
                        <p>
                            <label>{UPEX.lang.template('银行清算号(BSB)')}:</label>
                            <span className="val">{info.BSB}</span>
                        </p>
                        <p>
                            <label>{UPEX.lang.template('收款账号(Account Number)')}:</label>
                            <span className="val">{info.account}</span>
                        </p>
                        <p className="text">{UPEX.lang.template('为了您的资金安全，请确认您的银行卡信息是否正确')}</p>
                    </Card>
                </FormItem>
                <FormItem className="amount-info">
                    <div className="source">
                        {UPEX.lang.template('提现金额')}
                        <div className="val">
                            {info.amount} {UPEX.config.baseCurrencyEn}
                        </div>
                    </div>
                    <div className="real">
                        <p>
                            {UPEX.lang.template('到账金额')}: {UPEX.config.baseCurrencyEn} <em>{state.real}</em>
                        </p>
                        <p>
                            {UPEX.lang.template('手续费')}: {UPEX.config.baseCurrencyEn} <em>{state.fee}</em>
                        </p>
                    </div>
                </FormItem>
                <FormItem {...inputData.tradePwd} />
                {props.isGa ? <FormItem {...inputData.gaCode} /> : <FormItem {...inputData.smsCode} after={$sendBtn} />}
                <FormItem>
                    <Button className="submit-btn" onClick={this.submit.bind(this)}>
                        {UPEX.lang.template('确认提现')}
                    </Button>
                    <Button className="link-btn" onClick={this.submit.bind(this, 'back')}>
                        {UPEX.lang.template('返回修改')}
                    </Button>
                </FormItem>
            </FormView>
        );
    }
}
