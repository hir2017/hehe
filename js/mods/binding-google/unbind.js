import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { Link, browserHistory } from 'react-router';
import Vcodebutton from '../common/authcode-btn';

import InputItem from '../../components/form/input-item';
import PageForm from '../../components/page-user/page-form';
import { createGetProp } from '../../components/utils';

@inject('userInfoStore', 'captchaStore')
@observer
export default class ReBinding extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
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

        this.props.userInfoStore.rmBindGA(this.state.google, this.state.vCode).then(res => {
            if (res.status == 200) {
                browserHistory.push('/user/google');
            } else {
                this.props.captchaStore.fetch();
            }
        });
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
            title: UPEX.lang.template('解绑Google验证器'),
            formClass: 'modify-password-box modify-google-box',
            tipComponent: <Alert className="ace-form-tips" type="warning" showIcon message={UPEX.lang.template('为了您的资金安全，修改Google验证码后，24小时内不可以提币')} />
        };

        return (
            <PageForm {...PageProps}>
                <div>
                    <InputItem {...inputsData.ivCode} />
                    <div className="item v-code-button">
                        <img onClick={this.captchaChange} src={captcha} />
                    </div>
                </div>
                <div className="input-vcode-wrapper">
                    <InputItem {...inputsData.vCode} />
                    <div className="item v-code-button">
                        <Vcodebutton imgCode={this.state.ivCode} GaOrTradePwd={true} codeid={codeid} type="phone" />
                    </div>
                </div>
                <InputItem {...inputsData.google} />
                <div className="info">
                    <Link to="/user/google-guide" className="exc-link underline">{UPEX.lang.template('Google验证器使用教程')}</Link>
                </div>
                <Button className="exc-submit-item" loading={loading} onClick={this.submit}>
                    {UPEX.lang.template('解绑')}
                </Button>
            </PageForm>
        );
    }
}
