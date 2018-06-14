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

@inject('userInfoStore', 'captchaStore')
@observer
export default class ReBinding extends Component {
    constructor() {
        super();
        this.googleChange = this.googleChange.bind(this);
        this.ivCodeChange = this.ivCodeChange.bind(this);
        this.submit = this.submit.bind(this);
        this.vCodeChange = this.vCodeChange.bind(this);
        this.captchaChange = this.captchaChange.bind(this);
    }

    componentWillMount() {
        this.props.captchaStore.fetch();
    }

    state = {
        google: '',
        vCode: '',
        ivCode: ''
    };

    googleChange(e) {
        this.setState({
            google: e.target.value
        });
    }

    vCodeChange(e) {
        this.setState({
            vCode: e.target.value
        });
    }

    ivCodeChange(e) {
        this.setState({
            ivCode: e.target.value
        });
    }

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

        this.props.userInfoStore.rmBindGA(this.state.google, this.state.vCode);
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const gaSecretKey = this.props.userInfoStore.gaSecretKey || {};
        return (
            <div className="page-content-inner">
                <div className="content-title">{UPEX.lang.template('解绑google验证器')}</div>
                <section className="content-body">
                    <div className="binding-phone-content">
                        <div className="binding-phone-right reBinding-right rm-binding">
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
                                        {UPEX.lang.template('解绑')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
