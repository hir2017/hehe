import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { Link } from 'react-router';
import Vcodebutton from '../common/authcode-btn';

import InputItem from '../../common-mods/form/input-item';
import PageForm from '../../common-mods/page-user/page-form';
import { createGetProp } from '../../common-mods/utils';

@inject('userInfoStore', 'captchaStore')
@observer
export default class BindingEmail extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.props.captchaStore.fetch();
    }

    state = {
        email: '',
        vCode: '',
        ivCode: '',
        pvCode: '',
        vcodeAbled: false,
        submitAbled: false,
    };

    captchaChange() {
        this.props.captchaStore.fetch();
    }

    setVal(e, name) {
        const val = e.target.value;
        const state = this.state;
        const data = {};
        data[name] = val;
        if(['email', 'ivCode'].indexOf(name) !== -1) {
            data.vcodeAbled = state.email !== '' && state.ivCode !== '';
        }
        if(['vCode', 'pvCode'].indexOf(name) !== -1) {
            data.submitAbled = state.vCode !== '' && state.pvCode !== '';
        }
        this.setState(data);

    }

    submit() {
        const codeid = this.props.captchaStore.codeid;
        if (!this.state.email) {
            message.error(UPEX.lang.template('请填写邮箱'));
            return;
        }
        if (!this.state.vCode) {
            message.error(UPEX.lang.template('请填写邮箱验证码'));
            return;
        }
        if (!this.state.pvCode) {
            message.error(UPEX.lang.template('请填写手机验证码'));
            return;
        }

        this.props.userInfoStore.bindPEAction(this.state.vCode, this.state.pvCode, this.state.email, 1);
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;

        const getProp = createGetProp(this);
        const inputsData = {
            email: {
                label: UPEX.lang.template('邮箱'),
                inputProps: getProp('email', 'none')
            },
            ivCode: {
                label: UPEX.lang.template('图片验证码'),
                className: 'v-code',
                inputProps: getProp('ivCode', 'none')
            },
            vCode: {
                label: UPEX.lang.template('邮箱验证码'),
                inputProps: getProp('vCode', 'none')
            },
            pvCode: {
                label: UPEX.lang.template('短信验证码'),
                className: 'v-code',
                inputProps: getProp('pvCode', 'none')
            }
        };

        const PageProps = {
            title: UPEX.lang.template('绑定邮箱'),
            formClass: 'modify-password-box'
        };

        return (
            <PageForm {...PageProps}>
                <InputItem {...inputsData.email} />
                <div>
                    <InputItem {...inputsData.ivCode} />
                    <div className="item v-code-button">
                        <img onClick={this.captchaChange.bind(this)} src={captcha} />
                    </div>
                </div>
                <div className="user-sp-sms-btn-box">
                    <Vcodebutton
                            message={UPEX.lang.template('请填写邮箱')}
                            emailOrphone={this.state.email}
                            areacode=""
                            disabled={!this.state.vcodeAbled}
                            newBind={true}
                            type={1}
                            imgCode={this.state.ivCode}
                            codeid={codeid}
                        />
                    <p className="sp-tip">{UPEX.lang.template('请填写收到的验证码')}</p>
                    <InputItem {...inputsData.vCode} />
                    <InputItem {...inputsData.pvCode} />
                </div>
                <Button loading={loading} disabled={!this.state.submitAbled} className="ace-submit-item" onClick={this.submit}>
                    {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
