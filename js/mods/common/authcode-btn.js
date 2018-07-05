/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';

let time;

@inject('userInfoStore', 'captchaStore')
@observer
export default class SettingTradingPassword extends Component {
    constructor() {
        super();
        this.sendCode = this.sendCode.bind(this);
    }

    state = {
        num: 60,
        show: true
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

    async sendCode() {
        if(!this.state.show) {
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

        let res;
        if (this.props.modifyBind) {
            //修改手机发送验证码
            const phone = this.props.areacode + this.props.phone;
            res = await this.props.userInfoStore.mPhoneSendMsg(phone, this.props.codeid, this.props.imgCode, this.props.type);
        } else if (this.props.newBind) {
            //绑定手机邮箱发送验证
            const emailOrphone = this.props.areacode + this.props.emailOrphone;
            res = await this.props.userInfoStore.bindPESendCode(this.props.codeid, this.props.imgCode, emailOrphone, this.props.type);
        } else if (this.props.bind) {
            //老版本绑定修改手机邮箱发送验证码
            const phone = this.props.areacode == '86' ? this.props.phone : this.props.areacode + this.props.phone;
            res = await this.props.userInfoStore.bindSendCode(this.props.imgCode, this.props.codeid, this.props.type, phone);
        } else if (this.props.phoneAuth) {
            //开关手机认证发送验证码
            res = await this.props.userInfoStore.phAuthSendCode(this.props.type);
        } else if (this.props.bankAndWithdraw) {
            //解绑银行卡/提现发送手机证码
            res = await this.props.userInfoStore.sendMessageBankAndWithdraw(this.props.imgCode, this.props.codeid);
        } else {
            res = await this.props.userInfoStore.sendCode(this.type, this.props.imgCode, this.props.codeid);
        }
        if (res.status === 200) {
            const ctx = this;
            this.setState({
                show: false
            });
            time = setInterval(() => {
                let num = ctx.state.num;
                ctx.setState({
                    num: num - 1
                });
                if (num === 1) {
                    clearInterval(time);
                    ctx.setState({
                        num: 60,
                        show: true
                    });
                }
            }, 1000);
        } else {
            this.props.captchaStore.fetch();
            message.error(UPEX.lang.template(res.message));
        }
    }

    componentWillUnmount() {
        clearInterval(time);
    }

    render() {
        const {state, props} = this;
        return (
            <div className="sms-btn">
                <button type="button" style={props.style || null} disabled={props.disabled} onClick={this.sendCode}  className="send-v-code-button">
                    {state.show ? UPEX.lang.template('发送验证码') : state.num}
                </button>
            </div>
        );
    }
}
