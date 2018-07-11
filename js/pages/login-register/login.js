/**
 * @fileoverview 登录页面
 * @author 陈立英
 * @date 2018-04-26
 * 开启谷歌登录验证：
 * 开启手机登录验证：
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Tabs , Icon , Popover, Select , Modal } from 'antd';
import {  Link , browserHistory } from 'react-router';
import toAction from './action';
const Option = Select.Option;

const wechatContent = (
    <div className="wechat"></div>
);

const tgContent = (
    <div className="telegram"></div>
);


@inject('loginStore', 'authStore')
@observer
class Login extends Component {
    constructor(props){
        super(props);

        this.action = toAction(this.props.loginStore);

        this.state = {
            loginErrorText: '',
            step: 'login' // login: 登录，google: 谷歌认证；phone：手机认证
        }
    }

    componentDidMount() {
        // 组件加载完调用图片验证码
        // this.action.getImgCaptcha();
        if (this.props.authStore.isLogin) {
            browserHistory.push('/home');
            return;
        }
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

            this.action.userLogin().
                then((data)=>{
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
        } else {
            this.setState({
                loginErrorText: result
            });
        }
    }

    handleLoginSuccess(result) { 

        switch(result.authLevel) {
            case 0:
                 /*
                 * 如果用户等级为KYC0
                 * 登录后跳转到首页
                 * 弹出窗口提示用户先完成身份认证以开启交易
                 * 操作：取消，去认证
                 * 文案：您尚未进行安全级别认证，请完成身份认证及银行卡绑定获取充提和交易权限
                */
                Modal.confirm({
                    prefixCls: "ace-dialog",
                    content: UPEX.lang.template('您尚未进行安全级别认证，请完成身份认证及银行卡绑定获取充提和交易权限'),
                    okText: UPEX.lang.template('去认证'),
                    cancelText: UPEX.lang.template('取消'),
                    iconType: 'exclamation-circle',
                    onOk() {    
                        browserHistory.push('/user/authentication');
                    }
                });
                browserHistory.push('/home');
                break;
            case 1:
                /*
                 * 如果用户等级为KYC1（即可以充提币）
                 * 登录后跳转到交易中心
                 * 弹出窗口用户提示用户如果想充提法币，先去完成银行卡绑定
                 * 操作：取消，去绑定
                 * 文案：您当前的安全等级为A，请绑定银行卡以获取充提新台币的权限并开启交易
                */
                Modal.confirm({
                    prefixCls: "ace-dialog",
                    content: UPEX.lang.template('您当前的安全等级为A，请绑定银行卡以获取充提新台币的权限并开启交易'),
                    okText: UPEX.lang.template('去认证'),
                    cancelText: UPEX.lang.template('取消'),
                    iconType: 'exclamation-circle',
                    onOk() {    
                        browserHistory.push('/user/bankInfo');
                    }
                });
                browserHistory.push('/webtrade');
                break;
            default:
                /**
                 * 如果用户等级为KYC2（即可以充提法币和交易）
                 * 登录后跳转到交易中心
                 * 不弹出任何提示窗口
                 */
                browserHistory.push('/webtrade');
                break;
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

        let options = [];

        $.map(store.countries, (item, key)=>{
            options[options.length] = <Option value={key} key={key}>{UPEX.lang.template(key)}(+{item.areacode})</Option>
        })

        if (step == 'google' || step == 'phone') {
            let $inputbox;
                
            if (step == 'google') {
                $inputbox  =  (
                    <div className="input-wrapper">
                        <div className="input-box">
                            <input
                                type="tel" 
                                onInput={ action.onChangeGoogleCode}
                                maxLength="6"
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
                                onInput={ action.onChangeLoginVerCode}
                                maxLength="6"
                                placeholder={ UPEX.lang.template('短信验证码') }
                                onKeyDown={ this.keyLoginSecond }
                                autoFocus
                            />
                            <div className="yzcode">
                                <button onClick={ this.sendLoginVercode } className={ store.sendingphonecode ? 'disabled' : ''} >
                                    <div className={ store.sendingphonecode ? 'code-sending': 'code-sending hidden'}>{ UPEX.lang.template('重发')}（<span data-second="second" ref="second2"></span>s）</div>
                                    <div className={ store.sendingphonecode ? 'code-txt hidden' : 'code-txt'}>{  UPEX.lang.template('发送验证码') }</div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            return (
                <div className="register-wrapper login-box">
                    <div className="register-form">
                        <h3 className="title"> { UPEX.lang.template('登录')} </h3>
                        <div className="register-mode-content">
                            { $inputbox }
                            { this.state.loginErrorText ? <div className="error-tip">{this.state.loginErrorText}</div> : '' }
                            
                            <div className="input-wrapper">
                                <div className="login-input">
                                    {
                                        store.submiting ?  
                                        <button className="submit-btn login-btn">{ UPEX.lang.template('登录中') }</button>
                                        :
                                        <button className="submit-btn login-btn" onClick={ this.handleLoginVerifyCode }>{ UPEX.lang.template('登录') }</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="register-wrapper">
                <div className="register-form">
                    <h3 className="title"> { UPEX.lang.template('登录')} </h3>
                    <ul className="register-mode-tabs clearfix">
                        {
                            ['email', 'phone'].map((item, index)=>{
                                let cls = 'register-mode-tab';
                                let txt;
                                
                                if (store.mode === item) {
                                    cls += ' selected';
                                }

                                if (item == 'email') {
                                    txt = UPEX.lang.template('邮箱');
                                } else {
                                    txt = UPEX.lang.template('手机号')
                                }

                                return (
                                    <li key={item}>
                                        <button className={cls} onClick={this.onChangeMode.bind(this, item)}>{ txt }</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className="register-mode-content">
                        {
                            store.mode == 'email' ? null : (
                                <div className="input-wrapper">
                                    <div className="input-box">
                                        <Select onChange={ action.onAreaCodeChange } defaultValue={store.selectedCountry.code}>
                                            { options }
                                        </Select>
                                    </div>
                                </div>
                            )
                        }
                        {
                            store.mode == 'email' ? (
                                <div className="input-wrapper" key='email'>
                                    <div className="input-box">
                                        <input
                                            type="text" 
                                            placeholder={ UPEX.lang.template('邮箱') }
                                            onInput={ action.onChangeEmail }
                                            onBlur={ action.onBlurEmail }
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="input-wrapper" key='phone'>
                                    <div className="input-box">
                                        <input
                                            type="text" 
                                            placeholder={ UPEX.lang.template('手机') }
                                            onInput={  action.onChangePhone }
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            )
                        }
                        <div className="input-wrapper">
                            <div className="input-box">
                                <input
                                    type="password" 
                                    placeholder={ UPEX.lang.template('密码') }
                                    maxLength="16"
                                    onInput={ action.onChangePwd }
                                    onKeyDown={ this.keyLogin }
                                />
                            </div>
                        </div>
                        <div className="input-wrapper hidden">
                            <div className="input-box yz-box">
                                <input
                                    type="text" 
                                    placeholder={ UPEX.lang.template('验证码') }
                                    onInput={ action.onChangeImgCode }
                                    maxLength="6"
                                    onKeyDown={ this.keyLogin }
                                />
                                <div className="codeimg">
                                    <img src={ store.captcha } onClick={ action.getImgCaptcha } alt=""/>
                                </div>
                            </div>
                        </div>
                        
                        { this.state.loginErrorText ? <div className="error-tip">{this.state.loginErrorText}</div> : '' }

                        <div className="input-wrapper">
                            {
                                store.submiting ?  
                                <button className="submit-btn login-btn">{ UPEX.lang.template('登录中') }</button>
                                : 
                                <button className="submit-btn login-btn" onClick={ this.handleLogin }>{ UPEX.lang.template('登录') }</button>
                            }
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
                <div className="register-icon hidden">
                    <Popover placement="bottom" content={wechatContent} trigger="click"></Popover>
                    <Popover placement="bottom" content={tgContent} trigger="click"></Popover>
                    <span>{ UPEX.lang.template('官方服务、交流') }</span>
                </div>
            </div> 
        );
    }
}

export default Login;