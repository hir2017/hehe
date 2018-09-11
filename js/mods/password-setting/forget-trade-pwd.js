import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { Link, browserHistory } from 'react-router';
import Vcodebutton from '../common/authcode-btn';

import AutoCompleteHack from '../common/auto-complete-hack';

import InputItem from '../../components/form/input-item';
import PageForm from '../../components/page-user/page-form';
import { createGetProp } from '../../components/utils';

@inject('userInfoStore', 'captchaStore')
@observer
export default class SettingTradingPassword extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.captchaChange = this.captchaChange.bind(this);
    }

    componentWillMount() {
        this.props.captchaStore.fetch();
    }

    state = {
        password: '',
        comfirmPwd: '',
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
        if (!this.state.password) {
            message.error(UPEX.lang.template('请输入资金密码'));
            return;
        }
        const reg = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{8,16}/;
        if (this.state.password && !reg.test(this.state.password)) {
            message.error(UPEX.lang.template('密码由8-16数字、字母和特殊字符组成'));
            return;
        }
        if (!this.state.comfirmPwd) {
            message.error(UPEX.lang.template('请输入确认密码'));
            return;
        }
        if (this.state.password !== this.state.comfirmPwd) {
            message.error(UPEX.lang.template('资金密码和确认密码不一致'));
            return;
        }
        if (!this.state.vCode) {
            message.error(UPEX.lang.template('请填写短信验证码'));
            return;
        }

        let reqResult = this.props.userInfoStore.forgetTradingPwd(this.state.password, this.state.vCode, this.state.ivCode, codeid, 2);
        reqResult.then(data => {
            if(data) {
                setTimeout(() => {
                    browserHistory.push('/user/setpwd');
                }, 300)
            } else {
                this.props.captchaStore.fetch();
            }
        })
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        /*
            state = {
                password: '',
                comfirmPwd: '',
                vCode: '',
                ivCode: ''
            };
        */
        const getProp = createGetProp(this);
        const inputsData = {
            password: {
                label: UPEX.lang.template('新资金密码'),
                inputProps: getProp('password'),
                className: 'new-pwd',
                tip: UPEX.lang.template('密码由8-16数字、字母和特殊字符组成')
            },
            comfirmPwd: {
                label: UPEX.lang.template('确认密码'),
                inputProps: getProp('comfirmPwd')
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
            title: UPEX.lang.template('重置资金密码'),
            formClass: 'modify-password-box'
        };
        return (
            <PageForm {...PageProps}>
                <AutoCompleteHack />
                <InputItem {...inputsData.password} />
                <InputItem {...inputsData.comfirmPwd} />
                <div>
                    <InputItem {...inputsData.ivCode} />
                    <div className="item v-code-button">
                        <img onClick={this.captchaChange} src={captcha} />
                    </div>
                </div>
                <div className="input-vcode-wrapper">
                   <InputItem {...inputsData.vCode} />
                    <div className="item v-code-button">
                        <Vcodebutton tradePwd={true} imgCode={this.state.ivCode} codeid={codeid} type="phone" />
                    </div>
                </div>
                <div style={{ display: 'none' }} className="massage">
                    {UPEX.lang.template('不方便接短信？可使用')}&nbsp;&nbsp;&nbsp;&nbsp;<Link>{UPEX.lang.template('Google验证码')}</Link>
                </div>
                <div className="submit">
                    <Button loading={loading} className="exc-submit-item" onClick={this.submit}>
                        {UPEX.lang.template('提交')}
                    </Button>
                </div>
            </PageForm>
        );
    }
}
