/**
 * @fileoverview  google
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch, message } from 'antd';
import { Link } from 'react-router';
import Vcodebutton from '../common/authcode-btn';

import InputItem from '../../common-mods/form/input-item';
import PageForm from '../../common-mods/page-user/page-form';
import { createGetProp } from '../../common-mods/utils';

@inject('userInfoStore', 'captchaStore')
@observer
export default class ReBinding extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
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

    captchaChange() {
        this.props.captchaStore.fetch();
    }

    submit() {
        const codeid = this.props.captchaStore.codeid;
        if (!this.state.google) {
            message.error(UPEX.lang.template('Google验证码不能为空'));
            return;
        }
        if (!this.state.vCode) {
            message.error(UPEX.lang.template('短信验证码不能为空'));
            return;
        }

        // this.props.userInfoStore.resetPwd(this.state.newPwd, this.state.vCode, this.state.ivCode, codeid, pwd)
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
        const PageProps = {
            title: UPEX.lang.template('重置google验证器'),
            formClass: 'modify-password-box binding-phone-content'
        };
        return (
            <PageForm {...PageProps}>
                <div className="binding-phone-content">
                    <div className="binding-phone-left reBinding-left">
                        <img src={`'data:image/png;base64,${gaSecretKey.qrcode}`} />
                        <div>
                            <div className="key-title">Google{UPEX.lang.template('密鑰')}</div>
                            <div className="key">{gaSecretKey.secretKey}</div>
                            <div className="key-message">{UPEX.lang.template('請將密鑰記錄在紙上并安全的保存')}</div>
                        </div>
                    </div>
                    <div className="binding-phone-right reBinding-right">
                        <div className="modify-password-box">
                            <div className="item">
                                <span className="lable">{UPEX.lang.template('Google验证码')}</span>
                                <input onChange={this.googleChange} className="input" />
                            </div>
                            <div className="item v-code">
                                <span className="lable">{UPEX.lang.template('图片验证码')}</span>
                                <input onChange={this.ivCodeChange} onChange={this.ivCodeChange} className="input" />
                            </div>
                            <div className="item v-code-button">
                                <img onClick={this.captchaChange} src={captcha} />
                            </div>
                            <div className="item v-code">
                                <span className="lable">{UPEX.lang.template('短信验证码')}</span>
                                <input onChange={this.vCodeChange} className="input" />
                            </div>
                            <div className="item v-code-button">
                                <Vcodebutton imgCode={this.state.ivCode} codeid={codeid} type="phone" />
                            </div>
                            <div className="info">
                                <Link to="">Google{UPEX.lang.template('验证器使用教程')}</Link>
                            </div>
                            <div>
                                <Button loading={loading} onClick={this.submit}>
                                    {UPEX.lang.template('绑定')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </PageForm>
        );
    }
}
