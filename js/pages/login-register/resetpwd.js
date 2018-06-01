/**
 * @fileoverview 登录页面
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Tabs , Icon , Popover , Select} from 'antd';
import {  Link } from 'react-router';
import toAction from './action';
const Option = Select.Option;

@inject('loginStore')
@observer
class ResetPassword extends Component {
    constructor(props){
    	super(props);

        this.action = toAction(this.props.loginStore);
    }

    componentDidMount() {
        this.action.getImgCaptcha();
    }

    componentWillUnmount(){
        this.action.destroyTimer(); 
    }

    sendVercode=(e)=>{
        this.action.sendVercode('resetpwd');
    }

    submit=(e) =>{
        this.action.submitResetPwd();
    }

    render() {
        let store = this.props.loginStore;
        let action = this.action;

        let options = [];

        $.map(store.countries, (item, key)=>{
            options[options.length] = <Option value={key} key={key}>{UPEX.lang.template(key)}(+{item.areacode})</Option>
        })

        return (
            <div className="register-wrapper">
                <div className="register-form">                    
                    <h3 className="title"> { UPEX.lang.template('忘记密码')} </h3>
                    <ul className="register-mode-tabs clearfix">
                        {
                            ['email', 'phone'].map((item, index)=>{
                                let cls = 'register-mode-tab';
                                let txt;
                                
                                if (store.mode === item) {
                                    cls += ' selected';
                                }

                                if (item == 'email') {
                                    txt = UPEX.lang.template('邮箱方式找回');
                                } else {
                                    txt = UPEX.lang.template('手机方式找回')
                                }

                                return (
                                    <li key={item}>
                                        <button className={cls} onClick={ action.onChangeMode.bind(this, item)}>{ txt }</button>
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
                                    { !store.validEmail ? <div className="warn">* { UPEX.lang.template('邮箱格式错误')}</div> : null }
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
                                    { !store.validPhone ? <div className="warn">* { UPEX.lang.template('手机号格式错误')}</div> : null }
                                </div>
                            )
                        }
                        <div className="input-wrapper">
                            <div className="input-box yz-box">
                                <input
                                    type="text" 
                                    placeholder={ UPEX.lang.template('图片验证') }
                                    onInput={ action.onChangeImgCode }
                                    className={ store.validImgCode ? '' : 'wrong' }
                                />
                                <div className="codeimg">
                                    <img src={ store.captcha } onClick={ action.getImgCaptcha } alt=""/>
                                </div>
                            </div>
                            { !store.validImgCode ? <div className="warn">* { UPEX.lang.template('图片验证码错误')}</div> : null }
                        </div>
                        <div className="input-wrapper">
                            <div className="input-box useryz-box">
                                <input 
                                    type="text" 
                                    ref="vercode" 
                                    placeholder={ store.mode == 'email' ? UPEX.lang.template('邮箱验证码') : UPEX.lang.template('手机验证码') }
                                    className={ store.validVercode ? '' : 'wrong' }
                                    onInput={ action.onChangeVercode }
                                />
                                <div className="yzcode">
                                    <button onClick={ this.sendVercode } className={ store.sendingcode ? 'disabled' : ''} >
                                        <div className={ store.sendingcode ? 'code-sending': 'code-sending hidden'}>{ UPEX.lang.template('重发')}（<span data-second="second" ref="second"></span>s）</div>
                                        <div className={ store.sendingcode ? 'code-txt hidden' : 'code-txt'}>{  UPEX.lang.template('发送验证码') }</div>
                                    </button>
                                </div>
                            </div>
                            { !store.validVercode ? <div className="warn">* { store.mode == 'email' ? UPEX.lang.template('邮箱验证码错误') : UPEX.lang.template('手机验证码错误') }</div> : null }
                        </div>
                        <div className="input-wrapper">
                            <div className="input-box">
                                <input
                                    type="password" 
                                    ref="pwd"
                                    className={ store.validPwd ? '' : 'wrong'}
                                    placeholder={ UPEX.lang.template('密码') }
                                    onInput={ action.onChangePwd }
                                />
                            </div>
                            { !store.validPwd ? <div className="warn">* { UPEX.lang.template('密码至少由大写字母+小写字母+数字，8-16位组成')}</div> : null }
                        </div>
                        <div className="input-wrapper">
                            <div className="input-box">
                                <input
                                    type="password" 
                                    ref="twicepwd"
                                    className={ store.validTwicePwd ? '' : 'wrong'}
                                    placeholder={ UPEX.lang.template('确认密码') }
                                    onInput={ action.onChangeTwicePwd }
                                />
                            </div>
                            { !store.validTwicePwd ? <div className="warn">* { UPEX.lang.template('两次密码输入不一致')}</div> : null }
                        </div>
                        
                        <div className="input-wrapper">
                            <div className="input-box">
                                <button className="submit-btn" onClick={ this.submit }>{ UPEX.lang.template('确认') }</button>
                            </div>
                        </div>
                        <div className="register-extra clearfix">
                            <div className="fl login">
                                <Link to="/login">{ UPEX.lang.template('登录') }</Link>
                            </div>
                            <div className="fr register">
                                <Link to="/register"> { UPEX.lang.template('注册')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default ResetPassword;