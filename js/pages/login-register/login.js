/**
 * @fileoverview 登录页面
 * @author 陈立英
 * @date 2018-04-26
 * 开启谷歌登录验证：
 * 开启手机登录验证：
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Tabs , Icon , Popover, Select } from 'antd';
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
        this.action.getImgCaptcha();
    }

    componentWillUnmount(){
        this.action.destroy(); 
    }

    handleLogin=()=>{
        if (this.action.checkUser()) {
            
            this.setState({
                loginErrorText: ''
            });

            this.action.userLogin().
                then((data)=>{
                    switch(data.status){
                        case 200:
                            
                            setTimeout(() => {
                                browserHistory.push('/home');
                            }, 100)
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
                        default:
                            this.setState({
                                loginErrorText: data.message
                            }); 
                    }
                })
        } else {
            this.setState({
                loginErrorText: UPEX.lang.template('账号或密码输入有误')
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
                            browserHistory.push('/home');
                            break;
                        case 5556:
                            // 后端确认：手机或者谷歌验证码错误码；图形验证码错误
                            // this.setState({
                            //     step: 'login'
                            // });
                            // 驗證碼過期，請重新登入
                            // break;
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

    render() {
        let store = this.props.loginStore;
        let action = this.action;

        let options = [];

        $.map(store.countries, (item, key)=>{
            options[options.length] = <Option value={key} key={key}>{UPEX.lang.template(key)}(+{item.areacode})</Option>
        })

        if (this.state.step == 'google') {
            return (
                <div className="register-wrapper login-box">
                    <div className="register-form">
                        <h3 className="title"> { UPEX.lang.template('登录')} </h3>
                        <div className="register-mode-content">
                             <div className="input-wrapper">
                                <div className="input-box">
                                    <input
                                        type="number" 
                                        onInput={ action.onChangeGoogleCode}
                                        placeholder={ UPEX.lang.template('Google验证码') }
                                    />
                                </div>
                            </div>
                            
                            { this.state.loginErrorText ? <div className="error-tip">{this.state.loginErrorText}</div> : '' }
                            
                            <div className="input-wrapper">
                                <div className="login-input">
                                    <button className="submit-btn login-btn" onClick={ this.handleLoginVerifyCode }>{ UPEX.lang.template('登录') }</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.step == 'phone') {
            return (
                <div className="register-wrapper">
                    <div className="register-form">
                        <h3 className="title"> { UPEX.lang.template('登录')} </h3>
                        <div className="register-mode-content">
                             <div className="input-wrapper">
                                <div className="input-box useryz-box">
                                    <input
                                        type="text" 
                                        onInput={ action.onChangeLoginVerCode}
                                        placeholder={ UPEX.lang.template('短信验证码') }
                                    />
                                    <div className="yzcode">
                                        <button onClick={ this.sendLoginVercode } className={ store.sendingphonecode ? 'disabled' : ''} >
                                            <div className={ store.sendingphonecode ? 'code-sending': 'code-sending hidden'}>{ UPEX.lang.template('重发')}（<span data-second="second" ref="second2"></span>s）</div>
                                            <div className={ store.sendingphonecode ? 'code-txt hidden' : 'code-txt'}>{  UPEX.lang.template('发送验证码') }</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            { this.state.loginErrorText ? <div className="error-tip">{this.state.loginErrorText }</div>: '' }
                            
                            <div className="input-wrapper">
                                <div className="login-input">
                                    <button className="submit-btn login-btn" onClick={ this.handleLoginVerifyCode }>{ UPEX.lang.template('登录') }</button>
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
                                        <button className={cls} onClick={action.onChangeMode.bind(this, item)}>{ txt }</button>
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
                                    onInput={ action.onChangePwd }
                                />
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <div className="input-box yz-box">
                                <input
                                    type="text" 
                                    placeholder={ UPEX.lang.template('验证码') }
                                    onInput={ action.onChangeImgCode }
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
                                store.logining ?  
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