/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
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
export default class ModifyPassword extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        // this.captchaChange = this.captchaChange.bind(this);

        this.state = {
            password: '',
            newPwd: '',
            comfirmPwd: '',
            vCode: '',
            ivCode: ''
        }

        this.yidunCaptcha = new YidunCaptcha({
            element: '#floatCaptcha',
            type: 'modify-pwd',
            mode: 'float',
            width: '100%',
            lang: UPEX.lang.language == 'en-US' ? 'en': UPEX.lang.language
        });
    }

    componentWillMount() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        this.props.userInfoStore.getUserInfo();
        const store = this.props.authStore || {};
        if(store.uid) {
            this.props.userInfoStore.isGoogleAuth();
        }
        // this.captchaChange();
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
        const userInfo = this.props.userInfoStore.userInfo || {};
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        const codeid = this.props.captchaStore.codeid;
        
        if (!this.state.password) {
            message.error(UPEX.lang.template('请输入登录密码'));
            return;
        }
        if (!this.state.newPwd) {
            message.error(UPEX.lang.template('请输入新登录密码'));
            return;
        }
        if (!this.state.comfirmPwd) {
            message.error(UPEX.lang.template('请输入确认密码'));
            return;
        }
        if (this.state.newPwd !== this.state.comfirmPwd) {
            message.error(UPEX.lang.template('新登录密码和确认密码不一致'));
            return;
        }

        const checkPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d\S]{8,16}$/.test(this.state.newPwd);

        if (this.state.newPwd && !checkPwd) {
            message.error(UPEX.lang.template('密码至少由大写字母+小写字母+数字，8-16位组成'));
            return;
        }  

        // 没有滑动易盾验证码
        if (!this.validate) {
            message.error(UPEX.lang.template('请完成滑动图片验证'));
            return;
        } 
        
        const pwd = md5(this.state.password + UPEX.config.salt);
        const type = gaBindSuccess ? 1 : userInfo.phone ? 2 : 3;

        let reqResult = this.props.userInfoStore.resetPwd(this.state.newPwd, this.state.vCode, this.state.ivCode, codeid, pwd, type, this.validate, this.captchaId);
        
        reqResult.then(data => {
            if (data) {
                this.props.userInfoStore.pwdTriggerClear();
                this.props.authStore.clear();
                setTimeout(() => {
                    browserHistory.push('/login');
                }, 300);

            } else {
                this.props.captchaStore.fetch();
            }
        });
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading_pwd;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const userInfo = this.props.userInfoStore.userInfo || {};
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        const getProp = createGetProp(this);
        const inputsData = [
            { label: UPEX.lang.template('登录密码'), inputProps: getProp('password') },
            {
                label: UPEX.lang.template('新登录密码'),
                className: 'new-pwd',
                inputProps: getProp('newPwd'),
                tip: UPEX.lang.template('密码至少由大写字母+小写字母+数字，8-16位组成')
            },
            {
                label: UPEX.lang.template('确认密码'),
                inputProps: getProp('comfirmPwd')
            }
        ];
        // const vCodeData = {
        //     label: UPEX.lang.template('图片验证码'),
        //     className: 'v-code',
        //     inputProps: getProp('ivCode', 'none')
        // };
        // const GAData = {
        //     label: UPEX.lang.template('Google验证码'),
        //     inputProps: getProp('vCode', 'none')
        // };
        // const pcodeData = {
        //     label: !userInfo.phone ? UPEX.lang.template('邮箱验证码') : UPEX.lang.template('短信验证码'),
        //     className: 'v-code',
        //     inputProps: getProp('vCode', 'none')
        // };
        const PageProps = {
            title: UPEX.lang.template('修改登录密码'),
            formClass: 'modify-password-box'
        };

        return (
            <PageForm {...PageProps}>
                <AutoCompleteHack />
                {inputsData.map((item, i) => {
                    return <InputItem key={i} {...item} />;
                })}
                <div id="floatCaptcha"></div>
                {

                /* 
                <div>
                    <InputItem {...vCodeData} />
                    <div className="item v-code-button">
                        <img onClick={this.captchaChange} src={captcha} />
                    </div>
                </div>
                {gaBindSuccess ? (
                    <InputItem {...GAData} />
                ) : (
                    <div className="input-vcode-wrapper">
                        <InputItem {...pcodeData} />
                        <div className="item v-code-button">
                            <Vcodebutton imgCode={this.state.ivCode} codeid={codeid} type={!userInfo.phone ? 'email' : 'phone'} />
                        </div>
                    </div>
                )} */}
                <Button loading={loading} className="exchange-submit-item" onClick={this.submit}>
                    {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
