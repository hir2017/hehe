/**
 * @fileoverview 注册页面
 * @author 陈立英
 * @date 2018-04-26
 * 问题1：注册的时候密码没有加密
 * 问题2: 发送验证码有2个接口：user/sendEmailForRegister 和 user/sendMail。这2个接口有什么区别
 * 问题3: 提交表单失败
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Icon, message, Checkbox } from 'antd';
import { Link, browserHistory } from 'react-router';
import toAction from './action';
import { TabView, AreaCodeSelectView , SMSCodeView } from './views';
import YidunCaptcha  from '../../mods/yidun-captcha';
import UrlUtil from '../../lib/url';

@inject('loginStore')
@observer
class Register extends Component {
    constructor(props) {
        super(props);

        this.action = toAction(this.props.loginStore);

        this.tabs = [
            {
                id: 'email',
                title: UPEX.lang.template('邮箱注册')
            },
            {
                id: 'phone',
                title: UPEX.lang.template('手机注册')
            }
        ];

        this.yidunCaptcha = new YidunCaptcha({
            type: 'register-login',
            lang: UPEX.lang.language == 'en-US' ? 'en': UPEX.lang.language
        })
    }

    componentDidMount() {
        this.yidunCaptcha.init((validate, captchaId)=>{
            this.action.sendVercode('register', validate, captchaId);
        })

        this.updateInviteCode();
    }

    updateInviteCode() {
        let inviteCode = UrlUtil.query('invite_code') || '';

        this.props.loginStore.setInviteCode(inviteCode);
    }

    componentWillUnmount() {
        this.action.destroy();
    }

    sendVercode = (e) => {
        let verifyResult = this.action.verifyInfoBeforeSendCode();

        if (verifyResult) {
            this.yidunCaptcha.show();
        }
    }

    submit = (e) => {
        this.action.submitRegister();
    }

    queryHasPhone = (e) => {
        this.action.queryHasPhone();
    }

    clearInput=(field)=> {
        this.refs[field].focus();
        this.action.clearInput(field);
        this.action.clearVerifyResult(field);
    }

    onFocusInput=(field, e)=>{
        if (field == 'phone' || field == 'email') {
            this.action.onFocusInput(field, e);
        }

        if (field == 'phone') return;

        $(e.currentTarget).parents('.input-wrapper').attr('data-type', 'focus');
    }

    onBlurInput(field, e){
        if (field == 'phone') return;

        let timer;
        let node = $(e.currentTarget).parents('.input-wrapper');

        timer = setTimeout(()=>{
            clearTimeout(timer);
            node.attr('data-type', 'blur');
        }, 100)
    }

    render() {
        let store = this.props.loginStore;
        let action = this.action;
        let $selectAreaCode;
        let $inputAccount;
        let $submitBtn;

        switch(store.mode) {
            case 'phone':
                // 手机区域码选择
                $selectAreaCode = <AreaCodeSelectView defaultValue={store.selectedCountry.code} onChange={action.onAreaCodeChange}/>;
                // 填写注册的手机账号
                $inputAccount = (
                    <div className="input-wrapper" key="phone">
                        <div className="input-box">
                            <input
                                ref="phone"
                                type="tel"
                                value={store.phone}
                                className={store.phoneResult[0] && !store.hasPhone ? '' : 'wrong'}
                                placeholder={UPEX.lang.template('手机')}
                                onChange={ (e)=>action.onChangeField('phone', e) }
                                onBlur={this.queryHasPhone}
                                onFocus={ (e)=>this.onFocusInput('phone', e)}
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                        { store.phone ? <div className="icon-delete" onClick={this.clearInput.bind(this, 'phone')}></div> : null}
                        { store.phoneResult[0] ?  null : <div className="warn">{store.phoneResult[1]}</div>}
                    </div>
                );

                break;
            case 'email':
                // 填写注册的邮箱账号
                $inputAccount = (
                    <div className="input-wrapper" key="email">
                        <div className="input-box">
                            <input
                                ref="email"
                                type="text"
                                value={store.email}
                                className={store.emailResult[0] ? '' : 'wrong'}
                                placeholder={UPEX.lang.template('邮箱')}
                                onChange={ (e)=>action.onChangeField('email', e) }
                                onBlur={ (e)=>this.onBlurInput('email', e) }
                                onFocus={ (e)=>this.onFocusInput('email', e) }
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                        { store.email ? <div className="icon-delete" onClick={this.clearInput.bind(this, 'email')}></div> : null}
                        { store.emailResult[0] ? null : <div className="warn">{store.emailResult[1]}</div> }
                    </div>
                )
                break;
        }

        // 提交按钮
        if (store.enableRegister) {
            if (store.submiting) {
                $submitBtn = (
                    <button type="button" ref="signIn" className="submit-btn register-btn">
                        {UPEX.lang.template('注册中')}
                    </button>
                )
            } else {
                $submitBtn = (
                    <button type="button" ref="signIn" className="submit-btn register-btn" onClick={this.submit}>
                        {UPEX.lang.template('注册')}
                    </button>
                )
            }
        } else {
            $submitBtn = (
                <button type="button" ref="signIn" className="submit-btn register-btn disabled">
                    {UPEX.lang.template('注册')}
                </button>
            );
        }

        return (
            <div className="register-wrapper register-box">
                <div className="register-form-wrapper">
                    <div className="register-form">
                        <h3 className="register-form-title">{UPEX.lang.template('注册')}</h3>
                        <TabView data={this.tabs} current={store.mode} onClick={action.onChangeMode}/>
                        <div className="register-mode-content">
                            { $selectAreaCode }
                            { $inputAccount }
                            <div className="input-wrapper">
                                <div className="input-box">
                                    <input
                                        type="password"
                                        ref="pwd"
                                        value={store.pwd}
                                        className={store.pwdResult[0] ? '' : 'wrong'}
                                        placeholder={UPEX.lang.template('密码')}
                                        maxLength="16"
                                        autoComplete="off"
                                        onChange={ (e)=>action.onChangeField('pwd', e) }
                                        onBlur={ (e)=>this.onBlurInput('pwd', e) }
                                        onFocus={ (e)=>this.onFocusInput('pwd', e) }
                                    />
                                </div>
                                { store.pwd ? <div className="icon-delete" onClick={this.clearInput.bind(this, 'pwd')}></div> : null}
                                { store.pwdResult[0] ? null : <div className="warn">{ store.pwdResult[1] }</div>}
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box">
                                    <input
                                        type="password"
                                        ref="twicepwd"
                                        value={store.twicepwd}
                                        className={store.twicePwdResult[0] ? '' : 'wrong'}
                                        maxLength="16"
                                        autoComplete="off"
                                        placeholder={UPEX.lang.template('确认密码')}
                                        onChange={(e)=>action.onChangeField('twicepwd', e)}
                                        onBlur={ (e)=>this.onBlurInput('twicepwd', e) }
                                        onFocus={ (e)=>this.onFocusInput('pwd', e) }
                                    />
                                </div>
                                { store.twicepwd ? <div className="icon-delete" onClick={this.clearInput.bind(this, 'twicepwd')}></div> : null}
                                { store.twicePwdResult[0] ? null : <div className="warn">{ store.twicePwdResult[1]}</div>}
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box useryz-box">
                                    <input
                                        type="text"
                                        ref="vercode"
                                        value={store.vercode}
                                        placeholder={store.mode == 'email' ? UPEX.lang.template('邮箱验证码') : UPEX.lang.template('手机验证码')}
                                        className={store.validVercode ? '' : 'wrong'}
                                        onChange={(e)=>action.onChangeField('vercode', e)}
                                        maxLength="6"
                                        autoComplete="off"
                                    />
                                    <SMSCodeView onClick={this.sendVercode} disabled={store.disabledCodeBtn} fetching={store.sending}/>
                                </div>
                                {
                                    !store.validVercode ? (
                                        <div className="warn">
                                            {store.mode == 'email' ? UPEX.lang.template('请填写正确的邮箱验证码') : UPEX.lang.template('请填写正确的手机验证码')}
                                        </div>
                                    ) : null
                                }
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        ref="invitecode"
                                        value={store.inviteId}
                                        autoComplete="off"
                                        placeholder={UPEX.lang.template('邀请码')}
                                        onChange={(e)=>action.onChangeField('inviteCode', e)}
                                    />
                                </div>
                                { store.inviteId ? <div className="icon-delete" onClick={this.clearInput.bind(this, 'phone')}></div> : null}
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box user-protocol">
                                    <Checkbox onChange={action.onChangeAgreeCheckBox}>{UPEX.lang.template('我已阅读并同意')}</Checkbox>
                                    <a target="_blank" href={UPEX.config.docUrls.privacyPolicy}>
                                        《{UPEX.lang.template('隐私条款')}》
                                    </a>
                                    <a target="_blank" href={UPEX.config.docUrls.riskDisclosure}>
                                        《{UPEX.lang.template('风险披露与免责声明')}》
                                    </a>
                                </div>
                            </div>
                            <div className="input-wrapper">
                                { $submitBtn }
                            </div>
                            <div className="register-extra">
                                <Link to="/login"> <span className="login-link" dangerouslySetInnerHTML={{__html: UPEX.lang.template('我有账号，去登录')}}></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
