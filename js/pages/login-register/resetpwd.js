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
import { TabView , AreaCodeSelectView , SMSCodeView } from './views';
import YidunCaptcha  from '../../mods/yidun-captcha';

@inject('loginStore')
@observer
class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.action = toAction(this.props.loginStore);

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

        this.yidunCaptcha = new YidunCaptcha({
            type: 'modify-pwd',
            lang: UPEX.lang.language == 'en-US' ? 'en': UPEX.lang.language
        })
    }

    componentDidMount() {
        this.yidunCaptcha.init((validate, captchaId)=>{
            this.action.sendVercode('resetpwd', validate, captchaId);
        })
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
        this.action.submitResetPwd();
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

        $(e.currentTarget).parents('.input-wrapper').attr('data-type', 'focus');
    }

    onBlurInput(field, e){
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

        switch (store.mode) {
            case 'phone':

                $selectAreaCode = <AreaCodeSelectView defaultValue={store.selectedCountry.code} onChange={action.onAreaCodeChange}/>;

                $inputAccount = (
                    <div className="input-wrapper" key="phone">
                        <div className="input-box">
                            <input
                                ref="phone"
                                type="text"
                                value={store.phone}
                                placeholder={UPEX.lang.template('手机')}
                                onChange={ (e)=>action.onChangeField('phone', e) }
                                onFocus={ (e)=>this.onFocusInput('phone', e)}
                                onBlur={ (e)=>this.onBlurInput('phone', e)}
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                        { store.phone ? <div className="icon-delete" onClick={this.clearInput.bind(this, 'phone')}></div> : null}
                        { store.phoneResult[0] ? null : <div className="warn">{ store.phoneResult[1]}</div>}
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
                                onChange={ (e)=>action.onChangeField('email', e) }
                                onFocus={ (e)=>this.onFocusInput('email', e)}
                                onBlur={ (e)=>this.onBlurInput('email', e) }
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                        { store.phone ? <div className="icon-delete" onClick={this.clearInput.bind(this, 'phone')}></div> : null}
                        { store.emailResult[0] ? null :  <div className="warn">{ store.emailResult[1]}</div>}
                    </div>
                )
                break;
        }

        if (store.enableResetPwd) {
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
        } else {
            $submitBtn = (
                <button type="button" className="submit-btn disabled">
                    {UPEX.lang.template('提交')}
                </button>
            )
        }
        

        return (
            <div className="register-wrapper resetpwd-box">
                <div className="register-form-wrapper">
                    <div className="register-form">
                        <h3 className="register-form-title">{UPEX.lang.template('忘记密码')}</h3>
                        <TabView data={this.tabs} current={store.mode} onClick={action.onChangeMode}/>
                        <div className="register-mode-content">
                            { $selectAreaCode }
                            { $inputAccount }
                            <div className="input-wrapper">
                                <div className="input-box useryz-box">
                                    <input
                                        type="text"
                                        ref="vercode"
                                        maxLength="6"
                                        autoComplete="off"
                                        placeholder={store.mode == 'email' ? UPEX.lang.template('邮箱验证码') : UPEX.lang.template('手机验证码')}
                                        className={store.validVercode ? '' : 'wrong'}
                                        onChange={(e)=>action.onChangeField('vercode', e)}
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
                                        ref="pwd"
                                        type="password"
                                        maxLength="16"
                                        autoComplete="off"
                                        value={store.pwd}
                                        className={store.pwdResult[0] ? '' : 'wrong'}
                                        placeholder={UPEX.lang.template('密码')}
                                        onChange={ (e)=>action.onChangeField('pwd', e) }
                                        onBlur={ (e)=>this.onBlurInput('pwd', e) }
                                        onFocus={ (e)=>this.onFocusInput('pwd', e)}
                                    />
                                </div>
                                { store.pwd ? <div className="icon-delete" onClick={this.clearInput.bind(this, 'pwd')}></div> : null}
                                { store.pwdResult[0] ? null : <div className="warn">{ store.pwdResult[1] }</div>}
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box">
                                    <input
                                        ref="twicepwd"
                                        type="password"
                                        maxLength="16"
                                        autoComplete="off"
                                        value={store.twicepwd}
                                        className={store.twicePwdResult[0] ? '' : 'wrong'}
                                        placeholder={UPEX.lang.template('确认密码')}
                                        onChange={ (e)=>action.onChangeField('twicepwd', e) }
                                        onBlur={ (e)=>this.onBlurInput('twicepwd', e) }
                                        onFocus={ (e)=>this.onFocusInput('twicepwd', e)}
                                    />
                                </div>
                                { store.twicepwd ? <div className="icon-delete" onClick={this.clearInput.bind(this, 'twicepwd')}></div> : null}
                                { store.twicePwdResult[0] ? null : <div className="warn">{ store.twicePwdResult[1]}</div>}
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
