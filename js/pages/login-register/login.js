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
import YidunCaptcha  from '@/mods/yidun-captcha';
import UrlUtil from '@/lib/url';

@inject('loginStore', 'tradeStore')
@observer
class Login extends Component {
    constructor(props){
        super(props);

        this.action = toAction(this.props.loginStore);

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

        this.state = {
            step: 'login', // login: 登录，google: 谷歌认证；phone：手机认证
            loginErrorText: '', // 提交之后的错误提示
        }
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

    componentWillMount(){
        // console.log('login componentWillMount', 1, this.props.route.path, location.href)
    }

    componentWillUnmount(){
        // console.log('login componentWillUnmount', 2, this.props.route.path, location.href)
        this.action.destroy();
    }


    handleLogin=()=>{
        this.setState({
            loginErrorText: ''
        });

        this.yidunCaptcha.show();
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
        let backUrl = UrlUtil.query('backUrl');

        if (backUrl) {
            browserHistory.push(backUrl);
            this.props.loginStore.authStore.updatePageId(result.uid);
            return;
        } else {
            browserHistory.push('/webtrade');
        }


        if (result.authLevel == 0) {
            /*
             * 如果用户等级为KYC0
             * 登录后跳转到首页
             * 弹出窗口提示用户先完成身份认证以开启交易
             * 操作：取消，去认证
             * 文案：您尚未进行安全级别认证，请完成身份认证及银行卡绑定获取充提和交易权限
            */
            Modal.confirm({
                prefixCls:  "exc-dialog",
                className: this.props.tradeStore.theme == 'dark' ? 'exc-dialog-dark' : 'exc-dialog-light',
                width: 540,
                content: UPEX.lang.template('请先进行身份认证'),
                okText: UPEX.lang.template('身份认证'),
                cancelText: UPEX.lang.template('我再想想'),
                onOk() {
                    browserHistory.push('/user/authentication');
                }
            });
        }
        this.props.loginStore.authStore.updatePageId(result.uid);
    }

    updateSelectedCountry() {
        try {
            UPEX.cache.setCache('selectedCountry', JSON.stringify(this.props.loginStore.selectedCountry));
        } catch (error) {
            console.error('updateSelectedCountry', error);
        }
    }

    handleLoginVerifyCode=(e)=>{
        let { step } =  this.state;

        if (this.action.checkUser2(step)) {
            this.action.userLogin2(step).
                then((data)=>{
                    switch(data.status){
                        case 200:
                            this.updateSelectedCountry();
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
                loginErrorText: step == 'phone' ? UPEX.lang.template('请填写短信验证码') : UPEX.lang.template('请填写Google验证码')
            });
        }
    }

    sendLoginVercode=(e)=>{
        this.sendLoginVercodeFirst = false;
        this.action.sendLoginCodeSend();
    }

    keyLogin=(e)=>{
        if (!this.props.loginStore.enableLogin) {
            return;
        }

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

    clearInput=(field)=> {
        this.refs[field].focus();
        this.action.clearInput(field);
        this.action.clearVerifyResult(field);
    }

    onFocusInput(field, e){
        if (field == 'phone' || field == 'email') {
            this.action.onFocusInput(field, e);
        }

        // 获取焦点后，隐藏接口提交的错误信息
        this.setState({
            loginErrorText: ''
        });

        $(e.currentTarget).parents('.input-wrapper').attr('data-type', 'focus');
    }

    onBlurInput(field, e) {
        let timer;
        let node = $(e.currentTarget).parents('.input-wrapper');

        timer = setTimeout(()=>{
            clearTimeout(timer);
            node.attr('data-type', 'blur');
        }, 300)
    }

    render() {
        let store = this.props.loginStore;
        let { step, loginErrorText } = this.state;
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
                                ref="phone"
                                type="text"
                                name="phone"
                                value={store.phone}
                                placeholder={ UPEX.lang.template('手机') }
                                onChange={ (e)=>action.onChangeField('phone', e)}
                                onBlur={ (e)=>this.onBlurInput('phone', e) }
                                onFocus={ (e)=>this.onFocusInput('phone', e)}
                                autoFocus
                                autoComplete="off"
                            />
                        </div>
                        { store.phone ? <div className="icon-delete" onClick={this.clearInput.bind(this, 'phone')}></div> : null}
                    </div>
                )
                break;
            case 'email':
                $inputAccount = (
                    <div className="input-wrapper" key='email'>
                        <div className="input-box">
                            <input
                                ref="email"
                                type="text"
                                name="email"
                                value={store.email}
                                placeholder={ UPEX.lang.template('邮箱') }
                                className={ store.emailResult[0] ? '' : 'wrong'}
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


        if (step == 'google' || step == 'phone') {
            let $inputbox;

            if (step == 'google') {
                $inputbox  =  (
                    <div className="input-wrapper">
                        <div className="input-box">
                            <input
                                ref="googlecode"
                                type="tel"
                                name="googlecode"
                                maxLength="6"
                                autoComplete="off"
                                value={store.googlecode}
                                onChange={ (e)=>action.onChangeField('googlecode', e)}
                                placeholder={ UPEX.lang.template('Google验证码') }
                                onKeyDown={ this.keyLoginSecond }
                                autoFocus = { UPEX.isIE ? false: true }
                            />
                        </div>
                    </div>
                )

                if (store.googlecode) {
                    if (store.submiting) {
                        $submitBtn = (
                            <button type="button" className="submit-btn login-btn">{ UPEX.lang.template('登录中') }</button>
                        )
                    } else {
                        $submitBtn = (
                            <button type="button" className="submit-btn login-btn" onClick={ this.handleLoginVerifyCode }>{ UPEX.lang.template('登录') }</button>
                        )
                    }
                } else {
                    // 验证不同过，不允许点击
                    $submitBtn = (
                        <button type="button" className="submit-btn disabled">{ UPEX.lang.template('登录') }</button>
                    )
                }
            } else if (step == 'phone') {
                $inputbox = (
                    <div className="input-wrapper">
                        <div className="input-box useryz-box">
                            <input
                                ref="vercode"
                                type="text"
                                name="vercode"
                                onChange={ (e)=>action.onChangeField('vercode', e)}
                                maxLength="6"
                                autoComplete="off"
                                placeholder={ UPEX.lang.template('短信验证码') }
                                onKeyDown={ this.keyLoginSecond }
                                autoFocus = { UPEX.isIE ? false: true }
                            />
                            <SMSCodeView onClick={this.sendLoginVercode} disabled={store.disabledCodeBtn} fetching={store.sending}/>
                        </div>
                    </div>
                )

                if (store.vercode) {
                    if (store.submiting) {
                        $submitBtn = (
                            <button type="button" className="submit-btn login-btn">{ UPEX.lang.template('登录中') }</button>
                        )
                    } else {
                        $submitBtn = (
                            <button type="button" className="submit-btn login-btn" onClick={ this.handleLoginVerifyCode }>{ UPEX.lang.template('登录') }</button>
                        )
                    }
                } else {
                    // 验证不同过，不允许点击
                    $submitBtn = (
                        <button type="button" className="submit-btn disabled">{ UPEX.lang.template('登录') }</button>
                    )
                }
            }

            return (
                <div className="register-wrapper login-box">
                    <div className="register-form-wrapper">
                        <div className="register-form">
                            <h3 className="register-form-title"> { UPEX.lang.template('登录')} </h3>
                            <div className="register-mode-content">
                                { $inputbox }
                                { loginErrorText ? <div className="error-tip">{loginErrorText}</div> : '' }

                                <div className="input-wrapper">
                                    <div className="login-input">
                                        { $submitBtn }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (store.enableLogin) {
            if (store.submiting) {
                $submitBtn = (
                    <button type="button" className="submit-btn login-btn">{ UPEX.lang.template('登录中') }</button>
                )
            } else {
                $submitBtn = (
                    <button type="button" className="submit-btn login-btn" onClick={ this.handleLogin }>{ UPEX.lang.template('登录') }</button>
                )
            }
        } else {
            // 验证不同过，不允许点击
            $submitBtn = (
                <button type="button" className="submit-btn disabled">{ UPEX.lang.template('登录') }</button>
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
                                        ref="pwd"
                                        type="password"
                                        name="pwd"
                                        value={store.pwd}
                                        className={store.pwdResult[0] ? '' : 'wrong'}
                                        placeholder={ UPEX.lang.template('密码') }
                                        maxLength="16"
                                        autoComplete="off"
                                        onChange={ (e)=>action.onChangeField('pwd', e) }
                                        onFocus={ (e)=>this.onFocusInput('pwd', e)}
                                        onBlur={ (e)=>this.onBlurInput('pwd', e) }
                                        onKeyDown={ this.keyLogin }
                                    />
                                </div>
                                { store.pwd ? <div className="icon-delete" onClick={this.clearInput.bind(this, 'pwd')}></div> : null}
                                { store.pwdResult[0] ? null : <div className="warn">{ store.pwdResult[1] }</div>}
                            </div>

                            { loginErrorText ? <div className="error-tip">{loginErrorText}</div> : '' }

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
