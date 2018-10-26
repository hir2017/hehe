import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';


@inject('userInfoStore', 'captchaStore')
@observer
export default class SettingTradingPassword extends Component {
    constructor() {
        super();
        this.sendCode = this.sendCode.bind(this);
        this.time = null;
    }

    state = {
        num: 60,
        show: true,
        loading: false
    };

    get type() {
        switch (this.props.type) {
            case 'phone':
                return 2;
                break;
            case 'email':
                return 3;
                break;
            default:
                break;
        }
    }


    sendCode() {
        if (!this.state.show) {
            return false;
        }
        const { beforeClick } = this.props;
        if (beforeClick && !beforeClick()) {
            return;
        }
        if (!this.props.imgCode && !this.props.phoneAuth) {
            message.error(UPEX.lang.template('请填写图片验证码'));
            return;
        }
        if (this.props.newBind && !this.props.emailOrphone) {
            message.error(UPEX.lang.template(this.props.message));
            return;
        }
        if ((this.props.type == 2 || this.props.type == 3) && !this.props.phone && this.props.bind) {
            message.error(UPEX.lang.template(this.props.message));
            return;
        }
        this.setState({
            loading: true
        })
        let req;
        if (this.props.modifyBind) {
            //修改手机发送验证码
            const phone = this.props.areacode + this.props.phone;
            req = this.props.userInfoStore.mPhoneSendMsg(phone, this.props.codeid, this.props.imgCode, this.props.type);
        } else if (this.props.newBind) {
            //绑定手机邮箱发送验证
            const emailOrphone = this.props.areacode + this.props.emailOrphone;
            req = this.props.userInfoStore.bindPESendCode(this.props.codeid, this.props.imgCode, emailOrphone, this.props.type);
        } else if (this.props.bind) {
            //老版本绑定修改手机邮箱发送验证码
            const phone = this.props.areacode == '86' ? this.props.phone : this.props.areacode + this.props.phone;
            req = this.props.userInfoStore.bindSendCode(this.props.imgCode, this.props.codeid, this.props.type, phone);
        } else if (this.props.phoneAuth) {
            //开关手机认证发送验证码
            req = this.props.userInfoStore.phAuthSendCode(this.props.type);
        } else if (this.props.bankAndWithdraw) {
            //解绑银行卡/提现发送手机证码
            req = this.props.userInfoStore.sendMessageBankAndWithdraw(this.props.imgCode, this.props.codeid);
        } else if(this.props.GaOrTradePwd) {
            req = this.props.userInfoStore.sendCodeGaOrTradePwd(this.type, this.props.imgCode, this.props.codeid);
        } else if(this.props.tradePwd) {
            req = this.props.userInfoStore.setTradePwdSendCode(this.type, this.props.imgCode, this.props.codeid);
        }
         else {
            req = this.props.userInfoStore.sendCode(this.type, this.props.imgCode, this.props.codeid);
        }
        req.then(res => {
            const _state = {
                loading: false,
                show: false
            }
            if (res.status === 200) {
                const ctx = this;
                this.time = setInterval(() => {
                    let num = ctx.state.num;
                    ctx.setState({
                        num: num - 1
                    });
                    if (num === 1) {
                        clearInterval(this.time);
                        ctx.setState({
                            num: 60,
                            show: true
                        });
                    }
                }, 1000);
            } else {
                _state.show = true;
                this.props.captchaStore.fetch();
                message.error(UPEX.lang.template(res.message));
            }
            this.setState(_state)
        }).catch(error => {
            this.setState({
                loading: false,
                show: true
            });
            console.error('do sendCode', error);
        });

        return;
    }

    componentDidMount() {
        const {props} = this;
        if(props.getCtx) {
            props.getCtx(this);
        }
    }


    componentWillUnmount() {
        clearInterval(this.time);
    }

    render() {
        const { state, props } = this;
        return (
            <div className={`sms-btn ${state.show ? 'no-send' : 'sending'}`}>
                {state.loading ? (
                    <button type="button"  style={props.style || null} disabled={true}  className="send-v-code-button">
                        {UPEX.lang.template('发送中')}
                    </button>
                ) : (
                    <button type="button" style={props.style || null} disabled={!state.show} onClick={this.sendCode} className="send-v-code-button">
                        {state.show ? UPEX.lang.template('发送验证码') : `${UPEX.lang.template('重发')}(${state.num}s)`}
                    </button>
                )}
            </div>
        );
    }
}
