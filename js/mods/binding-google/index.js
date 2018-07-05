/**
 * @fileoverview  google 认证
 * @author xia xiang feng
 * @date 2018-05-25
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { Link } from 'react-router';
import Vcodebutton from '../common/authcode-btn';

import InputItem from '../../common-mods/form/input-item';
import AceForm from '../../common-mods/form/form';
import { createGetProp } from '../../common-mods/utils';

@inject('userInfoStore', 'captchaStore')
@observer
class Google extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.captchaChange = this.captchaChange.bind(this);
    }

    componentWillMount() {
        this.props.userInfoStore.getGaSecretKey();
        this.props.captchaStore.fetch();
    }

    state = {
        google: '',
        vCode: '',
        ivCode: ''
    };

    setVal(e, name) {
        const data = {};
        data[name] = e.target.value;
        this.setState(data);
    }

    captchaChange() {
        this.props.captchaStore.fetch();
    }

    submit() {
        const codeid = this.props.captchaStore.codeid;
        if (!this.state.google) {
            message.error(UPEX.lang.template('请填写Google验证码'));
            return;
        }
        if (!this.state.vCode) {
            message.error(UPEX.lang.template('请填写短信验证码'));
            return;
        }

        this.props.userInfoStore.bindGA(this.state.google, this.state.vCode);
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const gaSecretKey = this.props.userInfoStore.gaSecretKey || {};

        const getProp = createGetProp(this);
        const inputsData = {
            google: {
                label: UPEX.lang.template('Google验证码'),
                inputProps: getProp('google', 'none')
            },
            ivCode: {
                label: UPEX.lang.template('图片验证码'),
                className: 'v-code',
                inputProps: getProp('ivCode', 'none')
            },
            vCode: {
                label: UPEX.lang.template('短信验证码'),
                className: 'v-code',
                inputProps: getProp('vCode', 'none')
            }
        };
        return (
            <AceForm className="modify-password-box google-auth-box">
                <div className="google-auth-message">
                    {gaSecretKey.qrcode ? <img src={`data:image/png;base64,${gaSecretKey.qrcode}`} /> : <img />}
                    <div className="code-sms">{gaSecretKey.secretKey}</div>
                </div>
                <InputItem {...inputsData.google} />
                <div>
                     <InputItem {...inputsData.ivCode} />
                     <div className="item v-code-button">
                        <img onClick={this.captchaChange} src={captcha} />
                    </div>
                </div>
                <div className="input-vcode-wrapper">
                    <InputItem {...inputsData.vCode} />
                    <div className="item v-code-button">
                        <Vcodebutton imgCode={this.state.ivCode} codeid={codeid} type="phone" />
                    </div>
                </div>
                <Button loading={loading} className="ace-submit-item" onClick={this.submit}>
                    {UPEX.lang.template('绑定')}
                </Button>
                <div className="info">
                    <Link to="/user/google-guide">Google{UPEX.lang.template('验证器使用教程')}</Link>
                </div>
            </AceForm>
        );
    }
}

export default Google;
