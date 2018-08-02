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
import ImgVerifyCode  from '../../mods/verify-code/img';
import { TabView, AreaCodeSelectView , SMSCodeView } from './views';

@inject('loginStore', 'captchaStore')
@observer
class Register extends Component {
    constructor(props) {
        super(props);

        this.action = toAction(this.props.loginStore, this.props.captchaStore);

        this.state = {
            phone: ''
        }

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
    }

    componentWillUnmount() {
        this.action.destroy();
    }

    sendVercode = e => {
        this.action.sendVercode();
    }

    submit = e => {
        this.action.submitRegister();
    }

    queryHasPhone = e => {
        this.action.queryHasPhone();
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
                                type="tel"
                                ref="phone"
                                value={store.phone}
                                className={store.validPhone && !store.hasPhone ? '' : 'wrong'}
                                placeholder={UPEX.lang.template('手机')}
                                onChange={action.onChangePhone}
                                onBlur={this.queryHasPhone}
                                onFocus={action.moveCaretAtEnd}
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                        {!store.validPhone ? <div className="warn">{UPEX.lang.template('请填写正确的手机号')}</div> : null}
                    </div>
                );

                break;
            case 'email':
                // 填写注册的邮箱账号
                $inputAccount = (
                    <div className="input-wrapper" key="email">
                        <div className="input-box">
                            <input
                                type="text"
                                ref="email"
                                value={store.email}
                                className={store.validEmail ? '' : 'wrong'}
                                placeholder={UPEX.lang.template('邮箱')}
                                onChange={action.onChangeEmail}
                                onBlur={action.onBlurEmail}
                                onFocus={action.moveCaretAtEnd}
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                        {!store.validEmail ? <div className="warn">{UPEX.lang.template('请填写正确的邮箱')}</div> : null}
                    </div>
                )
                break;
        }

        // 提交按钮
        if (store.agree) {
            if (store.submiting) {
                $submitBtn = (
                    <button type="button" ref="signIn" className="submit-btn">
                        {UPEX.lang.template('注册中')}
                    </button>
                )
            } else {
                $submitBtn = (
                    <button type="button" ref="signIn" className="submit-btn" onClick={this.submit}>
                        {UPEX.lang.template('注册')}
                    </button>
                )
            }
        } else {
            $submitBtn = (
                <button type="button" ref="signIn" className="submit-btn disabled">
                    {UPEX.lang.template('注册')}
                </button>
            );
        }

        return (
            <div className="register-wrapper register-box">
                <div className="register-form-wrapper">
                    <div className="register-form">
                        <h3 className="title"> {UPEX.lang.template('注册')} </h3>
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
                                        className={store.validPwd ? '' : 'wrong'}
                                        placeholder={UPEX.lang.template('密码')}
                                        maxLength="16"
                                        autoComplete="off"
                                        onChange={action.onChangePwd}
                                        onBlur={action.onBlurPwd}
                                    />
                                </div>
                                {!store.validPwd ? <div className="warn">{UPEX.lang.template('密码至少由大写字母+小写字母+数字，8-16位组成')}</div> : null}
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box">
                                    <input
                                        type="password"
                                        ref="twicepwd"
                                        value={store.twicepwd}
                                        className={store.validTwicePwd ? '' : 'wrong'}
                                        maxLength="16"
                                        autoComplete="off"
                                        placeholder={UPEX.lang.template('确认密码')}
                                        onChange={action.onChangeTwicePwd}
                                        onBlur={action.onBlurTwicePwd}
                                    />
                                </div>
                                {!store.validTwicePwd ? <div className="warn">{UPEX.lang.template('两次密码输入不一致')}</div> : null}
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box yz-box">
                                    <input
                                        type="text"
                                        ref="picCode"
                                        value={store.imgcode}
                                        placeholder={UPEX.lang.template('请参照右侧输入')}
                                        onChange={action.onChangeImgCode}
                                        maxLength="5"
                                        autoComplete="off"
                                        className={store.validImgCode ? '' : 'wrong'}
                                    />
                                    <ImgVerifyCode/>
                                </div>
                                {!store.validImgCode ? <div className="warn">{UPEX.lang.template('请填写正确的图片验证码')}</div> : null}
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box useryz-box">
                                    <input
                                        type="text"
                                        ref="vercode"
                                        value={store.vercode}
                                        placeholder={store.mode == 'email' ? UPEX.lang.template('邮箱验证码') : UPEX.lang.template('手机验证码')}
                                        maxLength="6"
                                        autoComplete="off"
                                        className={store.validVercode ? '' : 'wrong'}
                                        onChange={action.onChangeVercode}
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
                            <div className="input-wrapper hidden">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        ref="invitecode"
                                        value={store.inviteId}
                                        autoComplete="off"
                                        placeholder={UPEX.lang.template('邀请码')}
                                        onChange={action.onChangeInviteCode}
                                    />
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box user-protocol">
                                    <Checkbox onChange={action.onChangeAgreeCheckBox}>{UPEX.lang.template('我已阅读并同意')}</Checkbox>
                                    <a target="_blank" href={UPEX.lang.template('服务条款网页链接')}>
                                        《{UPEX.lang.template('服务条款')}》
                                    </a>
                                </div>
                            </div>
                            <div className="input-wrapper">
                                { $submitBtn }
                            </div>
                            <div className="register-extra">
                                <Link to="/login"> {UPEX.lang.template('我有账号，去登录')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
