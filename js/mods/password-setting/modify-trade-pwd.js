/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message, Alert } from 'antd';
import { Link, browserHistory } from 'react-router';
import Vcodebutton from '../common/authcode-btn';
import md5 from '../../lib/md5';

import AutoCompleteHack from '../common/auto-complete-hack';

import InputItem from '../../components/form/input-item';
import PageForm from '../../components/page-user/page-form';
import { createGetProp } from '../../components/utils';
import YidunCaptcha from '../yidun-captcha';

@inject('userInfoStore', 'captchaStore', 'authStore')
@observer
export default class ModifyTradingPassword extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.captchaChange = this.captchaChange.bind(this);

        this.state = {
            password: '',
            newPwd: '',
            comfirmPwd: '',
            vCode: '',
            ivCode: '',
            loginErrorText: ''
        };

        this.yidunCaptcha = new YidunCaptcha({
            element: '#floatCaptcha',
            type: 'modify-pwd',
            mode: 'float',
            width: '100%',
            lang: UPEX.lang.language == 'en-US' ? 'en': UPEX.lang.language
        });
    }

    componentWillMount() {
        // this.props.captchaStore.fetch();
    }

    componentDidMount() {
        this.yidunCaptcha.init((validate, captchaId)=>{
            this.validate = validate;
            this.captchaId = captchaId;
        })
    }

    setVal(e, name) {
        const data = {};
        data[name] = e.target.value;
        this.setState(data);
    }

    captchaChange() {
        // this.props.captchaStore.fetch();
    }

    submit() {
        const codeid = this.props.captchaStore.codeid;

        if (!this.state.password) {
            message.error(UPEX.lang.template('请输入资金密码'));
            return;
        }
        if (!this.state.newPwd) {
            message.error(UPEX.lang.template('请输入新资金密码'));
            return;
        }
        if (!this.state.comfirmPwd) {
            message.error(UPEX.lang.template('请输入确认密码'));
            return;
        }
        if (this.state.newPwd !== this.state.comfirmPwd) {
            message.error(UPEX.lang.template('新资金密码和确认密码不一致'));
            return;
        }

        const checkPwd = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{8,16}/.test(this.state.newPwd);

        if (this.state.newPwd && !checkPwd) {
            message.error(UPEX.lang.template('密码由8-16数字、字母和特殊字符组成'));
            return;
        }

        // 没有滑动易盾验证码
        if (!this.validate) {
            message.error(UPEX.lang.template('请完成滑动图片验证'));
            return;
        }

        const pwd = md5(this.state.password + UPEX.config.dealSalt + this.props.authStore.uid);
        let reqResult = this.props.userInfoStore.modifytradingPwd(this.state.newPwd, pwd, this.validate, this.captchaId);

        reqResult
            .then(data => {
                if (data.state) {
                    browserHistory.push('/user/setpwd');
                } else {
                    if(data.num !== 'none' && data.num !== null) {
                        this.setState({
                            loginErrorText: UPEX.lang.template('输入错误，您还有{num}次机会尝试',{ num: data.num})
                        });
                    }
                    this.validate = '';
                    this.captchaId = '';
                    this.yidunCaptcha.captchaIns.refresh();
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading_tpwd;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const userInfo = this.props.userInfoStore.userInfo || {};

        const getProp = createGetProp(this);
        const inputsData = [
            {
                label: UPEX.lang.template('资金密码'),
                error: this.state.loginErrorText,
                className: 'new-pwd',
                inputProps: getProp('password'),
                tip: UPEX.lang.template('密码由8-16数字、字母和特殊字符组成')
            },
            {
                label: UPEX.lang.template('新资金密码'),
                inputProps: getProp('newPwd')
            },
            {
                label: UPEX.lang.template('确认密码'),
                className: 'set-trade-pwd-last-input',
                inputProps: getProp('comfirmPwd')
            }
        ];

        const PageProps = {
            title: UPEX.lang.template('修改资金密码'),
            formClass: 'modify-password-box modify-tradepwd-box',
            tipComponent: <Alert className="ace-form-tips" type="warning" showIcon message={UPEX.lang.template('为了您的资金安全，忘记资金密码并修改成功后，24小时内不可以提现提币')} />
        };

        return (
            <PageForm {...PageProps}>
                <AutoCompleteHack />
                {inputsData.map((item, i) => {
                    return <InputItem key={i} {...item} />;
                })}
                <div id="floatCaptcha"></div>
                <Button loading={loading} className="exc-submit-item" onClick={this.submit}>
                    {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
