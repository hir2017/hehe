/**
 * @fileoverview 登录页面
 * @author 陈立英
 * @date 2018-04-26
 *  开启谷歌登录验证：
 *  开启手机登录验证：
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon , Modal } from 'antd';
import {  Link , browserHistory } from 'react-router';
import toAction from './action';
import { TabView , AreaCodeSelectView, SMSCodeView } from './views';
import YidunCaptcha  from '../../mods/yidun-captcha';

@inject('loginStore')
@observer
class Login extends Component {
    constructor(props){
        super(props);

        this.action = toAction(this.props.loginStore);

        this.state = {
            loginErrorText: '',
            step: 'login' // login: 登录，google: 谷歌认证；phone：手机认证
        }

        this.tabs = [
            {
                id: 'email',
                title: UPEX.lang.template('邮箱')
            },
            {
                id: 'phone',
                title: UPEX.lang.template('手机号')
            }
        ];

        this.sendLoginVercodeFirst = true;

        this.yidunCaptcha = new YidunCaptcha({
            type: 'register-login',
            lang: UPEX.lang.language == 'en-US' ? 'en': UPEX.lang.language
        })
    }

    componentDidMount() {
        this.yidunCaptcha.init((validate, captchaId)=>{
            this.handleUserLogin(validate, captchaId);
        })
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.location !== this.props.location) {
            let state = nextProps.location.state;

            if (state && state.step){

                if (this.state.step !== state.step) {
                    this.setState({
                        step: state.step
                    });
                }
            }
        }
    }

    componentWillUnmount(){
        this.action.destroy();
    }


    handleLogin=()=>{
        let result = this.action.checkUser();

        if (result == true ) {

            this.setState({
                loginErrorText: ''
            });
            this.yidunCaptcha.show();
        } else {
            this.setState({
                loginErrorText: result
            });
        }
    }

    handleUserLogin(validate, captchaId){
        let store = this.props.loginStore;
        this.action.userLogin(validate, captchaId).then((data)=>{
            switch(data.status){
                case 200:
                    this.handleLoginSuccess(data.attachment);
                    break;
                case 5555: // 需要进行谷歌认证
                    this.setState({
                        step: 'google'
                    });
                    break;
                case 5557:
                    store.disabledSMSOrPhoneCode(false);
                    store.updateSending(false);
                    this.setState({
                        step: 'phone'
                    });
                    break;
                case 405:
                    this.setState({
                        loginErrorText: UPEX.lang.template('输入错误，您还有{num}次机会尝试',{ num: data.attachment.times})
                    });
                    break;
                default:
                    this.setState({
                        loginErrorText: data.message
                    });
            }
        })
    }

    handleLoginSuccess(result) {
        browserHistory.push('/webtrade');

        if (result.authLevel == 0) {
            /*
             * 如果用户等级为KYC0
             * 登录后跳转到首页
             * 弹出窗口提示用户先完成身份认证以开启交易
             * 操作：取消，去认证
             * 文案：您尚未进行安全级别认证，请完成身份认证及银行卡绑定获取充提和交易权限
            */
            Modal.confirm({
                prefixCls: "exc-dialog",
                content: UPEX.lang.template('请先进行身份认证'),
                okText: UPEX.lang.template('身份认证'),
                cancelText: UPEX.lang.template('我再想想'),
                iconType: 'exclamation-circle',
                onOk() {
                    browserHistory.push('/user/authentication');
                }
            });
        }
    }

    handleLoginVerifyCode=(e)=>{
        let { step } =  this.state;

        if (this.action.checkUser2(step)) {
            this.action.userLogin2(step).
                then((data)=>{
                    switch(data.status){
                        case 200:
                            this.handleLoginSuccess(data.attachment);
                            break;
                        default:
                            if (data.status == 5556 && this.sendLoginVercodeFirst) {
                                this.setState({
                                    loginErrorText: UPEX.lang.template('请填写正确的短信验证码')
                                });
                                return;
                            }
                            this.setState({
                                loginErrorText: data.message
                            });
                    }
                })
        } else {
            this.setState({
                loginErrorText: step == 'phone' ? UPEX.lang.template('请填写短信验证码') : UPEX.lang.template('请填写谷歌验证码')
            });
        }
    }

    sendLoginVercode=(e)=>{
        this.sendLoginVercodeFirst = false;
        this.action.sendLoginCodeSend();
    }

    keyLogin=(e)=>{
        if (e.keyCode === 13) {
            this.handleLogin()
        }
    }

    keyLoginSecond =(e)=>{
        if (e.keyCode === 13) {
            this.handleLoginVerifyCode()
        }
    }

    onChangeMode=(item)=>{
        if (this.props.loginStore.mode !== item) {
            this.setState({
                loginErrorText: ''
            });
        }

        this.action.onChangeMode(item);
    }

    render() {
        let store = this.props.loginStore;
        let { step } = this.state;
        let action = this.action;
        let $selectAreaCode;
        let $inputAccount;
        let $submitBtn;


        switch(store.mode) {
            case 'phone':
                $selectAreaCode = <AreaCodeSelectView defaultValue={store.selectedCountry.code} onChange={action.onAreaCodeChange}/>;
                $inputAccount = (
                    <div className="input-wrapper" key='phone'>
                        <div className="input-box">
                            <input
                                type="text"
                                value={store.phone}
                                name="phone"
                                placeholder={ UPEX.lang.template('手机') }
                                onChange={action.onChangePhone}
                                onFocus={action.moveCaretAtEnd}
                                autoFocus
                            />
                        </div>
                    </div>
                )
                break;
            case 'email':
                $inputAccount = (
                    <div className="input-wrapper" key='email'>
                        <div className="input-box">
                            <input
                                type="text"
                                name="email"
                                placeholder={ UPEX.lang.template('邮箱') }
                                onChange={ action.onChangeEmail }
                                onBlur={ action.onBlurEmail }
                                onFocus={action.moveCaretAtEnd}
                                autoFocus
                            />
                        </div>
                    </div>
                )
                break;
        }


        if (step == 'google' || step == 'phone') {
            let $inputbox;

            if (step == 'google') {
                $inputbox  =  (
                    <div className="input-wrapper">
                        <div className="input-box">
                            <input
                                type="tel"
                                onChange={ action.onChangeGoogleCode}
                                maxLength="6"
                                autoComplete="off"
                                placeholder={ UPEX.lang.template('Google验证码') }
                                onKeyDown={ this.keyLoginSecond }
                                autoFocus
                            />
                        </div>
                    </div>
                )
            } else if (step == 'phone') {
                $inputbox = (
                    <div className="input-wrapper">
                        <div className="input-box useryz-box">
                            <input
                                type="text"
                                onChange={ action.onChangeLoginVerCode}
                                maxLength="6"
                                autoComplete="off"
                                placeholder={ UPEX.lang.template('短信验证码') }
                                onKeyDown={ this.keyLoginSecond }
                                autoFocus
                            />
                            <SMSCodeView onClick={this.sendLoginVercode} disabled={store.disabledCodeBtn} fetching={store.sending}/>
                        </div>
                    </div>
                )
            }

            return (
                <div className="register-wrapper login-box">
                    <div className="register-form-wrapper">
                        <div className="register-form">
                            <h3 className="register-form-title"> { UPEX.lang.template('登录')} </h3>
                            <div className="register-mode-content">
                                { $inputbox }
                                { this.state.loginErrorText ? <div className="error-tip">{this.state.loginErrorText}</div> : '' }

                                <div className="input-wrapper">
                                    <div className="login-input">
                                        {
                                            store.submiting ?
                                            <button type="button" className="submit-btn login-btn">{ UPEX.lang.template('登录中') }</button>
                                            :
                                            <button type="button" className="submit-btn login-btn" onClick={ this.handleLoginVerifyCode }>{ UPEX.lang.template('登录') }</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (store.submiting) {
            $submitBtn = (
                <button type="button" className="submit-btn login-btn">{ UPEX.lang.template('登录中') }</button>
            )
        } else {
            $submitBtn = (
                <button type="button" className="submit-btn login-btn" onClick={ this.handleLogin }>{ UPEX.lang.template('登录') }</button>
            )
        }

        return (
            <div className="register-wrapper">
                <div className="register-form-wrapper">
                    <div className="register-form">
                        <h3 className="register-form-title">{ UPEX.lang.template('登录')}</h3>
                        <TabView data={this.tabs} current={store.mode} onClick={this.onChangeMode}/>
                        <div className="register-mode-content">
                            { $selectAreaCode }
                            { $inputAccount }
                            <div className="input-wrapper">
                                <div className="input-box">
                                    <input
                                        type="password"
                                        name="password"
                                        value={store.pwd}
                                        placeholder={ UPEX.lang.template('密码') }
                                        maxLength="16"
                                        onChange={ action.onChangePwd }
                                        onKeyDown={ this.keyLogin }
                                    />
                                </div>
                            </div>

                            { this.state.loginErrorText ? <div className="error-tip">{this.state.loginErrorText}</div> : '' }

                            <div className="input-wrapper">
                                { $submitBtn }
                            </div>
                            <div className="register-extra clearfix">
                                <div className="fl forget-pwd">
                                    <Link to="/resetpwd">{ UPEX.lang.template('忘记密码?') }</Link>
                                </div>
                                <div className="fr newser-register">
                                    <Link to="/register"> { UPEX.lang.template('立即注册')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
