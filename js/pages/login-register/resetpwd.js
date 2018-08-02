/**
 * @fileoverview 登录页面
 * @author 陈立英
 * @date 2018-04-26
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Icon } from 'antd';
import { Link } from 'react-router';
import toAction from './action';
const Option = Select.Option;
import ImgVerifyCode  from '../../mods/verify-code/img';
import { TabView , AreaCodeSelectView , SMSCodeView } from './views';

@inject('loginStore', 'captchaStore')
@observer
class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.action = toAction(this.props.loginStore, this.props.captchaStore);

        this.state = {
            phone: ''
        }

        this.tabs = [
            {
                id: 'email',
                title: UPEX.lang.template('邮箱方式找回')
            },
            {
                id: 'phone',
                title: UPEX.lang.template('手机方式找回')
            }
        ];
    }

    componentDidMount() {
        this.action.getImgCaptcha();
    }

    componentWillUnmount() {
        this.action.destroy();
    }

    sendVercode = e => {
        this.action.sendVercode('resetpwd');
    }

    submit = e => {
        this.action.submitResetPwd().then(data => {
            if(!data) {
                this.action.getImgCaptcha();
            }
        });
    };

    render() {
        let store = this.props.loginStore;
        let action = this.action;
        let $selectAreaCode;
        let $inputAccount;
        let $submitBtn;

        switch (store.mode) {
            case 'phone':

                $selectAreaCode = <AreaCodeSelectView defaultValue={store.selectedCountry.code} onChange={action.onAreaCodeChange}/>;

                $inputAccount = (
                    <div className="input-wrapper" key="phone">
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder={UPEX.lang.template('手机')}
                                value={store.phone}
                                onChange={action.onChangePhone}
                                onFocus={action.moveCaretAtEnd}
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                        { !store.validPhone ? <div className="warn">{UPEX.lang.template('请填写正确的手机号')}</div> : null }
                    </div>
                )

                break;
            case 'email':
                $inputAccount = (
                    <div className="input-wrapper" key="email">
                        <div className="input-box">
                            <input
                                type="text"
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
        if (store.submiting) {
            $submitBtn = (
                <button type="button" className="submit-btn">
                    {UPEX.lang.template('提交中')}
                </button>
            )
        } else {
            $submitBtn = (
                <button type="button" className="submit-btn" onClick={this.submit}>
                    {UPEX.lang.template('提交')}
                </button>
            )
        }

        return (
            <div className="register-wrapper resetpwd-box">
                <div className="register-form-wrapper">
                    <div className="register-form">
                        <h3 className="title"> {UPEX.lang.template('忘记密码')} </h3>
                        <TabView data={this.tabs} current={store.mode} onClick={action.onChangeMode}/>
                        <div className="register-mode-content">
                            { $selectAreaCode }
                            { $inputAccount }
                            <div className="input-wrapper">
                                <div className="input-box yz-box">
                                    <input
                                        type="text"
                                        placeholder={UPEX.lang.template('请参照右侧输入')}
                                        maxLength="5"
                                        autoComplete="off"
                                        onChange={action.onChangeImgCode}
                                        className={store.validImgCode ? '' : 'wrong'}
                                    />
                                    <ImgVerifyCode/>
                                </div>
                                { !store.validImgCode ? <div className="warn">{UPEX.lang.template('请填写正确的图片验证码')}</div> : null }
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box useryz-box">
                                    <input
                                        type="text"
                                        ref="vercode"
                                        maxLength="6"
                                        autoComplete="off"
                                        placeholder={store.mode == 'email' ? UPEX.lang.template('邮箱验证码') : UPEX.lang.template('手机验证码')}
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
                            <div className="input-wrapper">
                                <div className="input-box">
                                    <input
                                        type="password"
                                        ref="pwd"
                                        maxLength="16"
                                        autoComplete="off"
                                        className={store.validPwd ? '' : 'wrong'}
                                        placeholder={UPEX.lang.template('密码')}
                                        onChange={action.onChangePwd}
                                        onBlur={action.onBlurPwd}
                                    />
                                </div>
                                { !store.validPwd ? <div className="warn">{UPEX.lang.template('密码至少由大写字母+小写字母+数字，8-16位组成')}</div> : null }
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box">
                                    <input
                                        type="password"
                                        ref="twicepwd"
                                        maxLength="16"
                                        autoComplete="off"
                                        className={store.validTwicePwd ? '' : 'wrong'}
                                        placeholder={UPEX.lang.template('确认密码')}
                                        onChange={action.onChangeTwicePwd}
                                        onBlur={action.onBlurTwicePwd}
                                    />
                                </div>
                                { !store.validTwicePwd ? <div className="warn">{UPEX.lang.template('两次密码输入不一致')}</div> : null }
                            </div>

                            <div className="input-wrapper">
                                { $submitBtn }
                            </div>
                            <div className="register-extra clearfix">
                                <div className="fl login">
                                    <Link to="/login">{UPEX.lang.template('登录')}</Link>
                                </div>
                                <div className="fr register">
                                    <Link to="/register"> {UPEX.lang.template('注册')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPassword;
