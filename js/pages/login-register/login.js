/**
 * @fileoverview 登录页面
 * @author 陈立英
 * @date 2018-04-26
 *  <GaModal email={this.refs.uname}/> ？？？ 谷歌验证器的密码
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Tabs , Icon , Popover } from 'antd';
import {  Link , browserHistory } from 'react-router';
import countryCode from '../../mods/register/country-code';
import toAction from './action';

const wechatContent = (
    <div className="wechat"></div>
);

const tgContent = (
    <div className="telegram"></div>
);

@inject('userStore', 'authStore')
@observer
class Login extends Component {
    constructor(props){
    	super(props);

        this.action = toAction(this.props.userStore);

        this.state = {
            loginErrorText: ''
        }
    }

    componentDidMount() {
        // 组件加载完调用图片验证码
        this.action.getImgCaptcha();
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
                            // TODO 每次重新加载清除
                            // sessionStorage.removeItem('baseCurrencyId')
                            // sessionStorage.removeItem('currencyId')
                            // history.back();
                            setTimeout(() => {
                                browserHistory.push('/home');
                            }, 100)
                            break;
                        case 5555:
                            break;
                        default:
                            this.setState({
                                loginErrorText: "*" + data.message
                            }); 
                    }
                })
        } else {
            this.setState({
                loginErrorText: UPEX.lang.template('* 填写有误')
            });
        }
    }

    keyLogin=(e)=>{
        if (e.keyCode === 13) {
            this.handleLogin()
        }
    }

    render() {
        let store = this.props.userStore;
        let action = this.action;


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
                                        <select onChange={ action.onAreaCodeChange } value={store.areaCode}>
                                            {
                                                countryCode.map((cur,index)=>{
                                                    return <option value={cur.code} key={cur.locale}>{ UPEX.lang.template(cur.locale)}</option>
                                                })
                                            }
                                        </select>
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
                                    <div className="input-box input-phone">
                                        <span className="area-code">+{store.areaCode}</span>
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
                        <div className="error-tip">
                            { this.state.loginErrorText ? this.state.loginErrorText : '' }
                        </div>
                        <div className="input-wrapper">
                            <div className="login-input">
                                <button className="submit-btn login-btn" onClick={ this.handleLogin }>{ UPEX.lang.template('登录') }</button>
                            </div>
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