/**
 * @fileoverview 注册页面
 * @author 陈立英
 * @date 2018-04-26
 * 问题1：注册的时候密码没有加密
 * 问题2: 发送验证码有2个接口：user/sendEmailForRegister 和 user/sendMail。这2个接口有什么区别
 * 问题3: 提交表单失败
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon, message } from 'antd';
import {  Link , browserHistory } from 'react-router';
import countryCode from '../../mods/register/country-code';
import toAction from './action';

@inject('userStore')
@observer
class Register extends Component {
    constructor(props){
        super(props);

        this.action = toAction(this.props.userStore);
    }

    componentDidMount() {
        // 组件加载完调用图片验证码
        this.action.getImgCaptcha();
    }

    componentWillUnmount(){
        this.action.destroyTimer(); 
    }

    sendVercode=(e)=>{
        this.action.sendVercode();
    }

    submit=(e) =>{
        this.action.submitRegister();
    }

    queryHasPhone=(e)=>{
        this.action.queryHasPhone();
    }

    render() {
        let store = this.props.userStore;
        let action = this.action;

        console.log(store.agress);

        return (
            <div className="register-wrapper">
                <div className="register-form">
                    <h3 className="title"> { UPEX.lang.template('注册')} </h3>
                    <ul className="register-mode-tabs clearfix">
                        {
                            ['email', 'phone'].map((item, index)=>{
                                let cls = 'register-mode-tab';
                                let txt;
                                
                                if (store.mode === item) {
                                    cls += ' selected';
                                }

                                if (item == 'email') {
                                    txt = UPEX.lang.template('邮箱注册');
                                } else {
                                    txt = UPEX.lang.template('手机注册')
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
                                <div className="input-wrapper" key="email">
                                    <div className="input-box">
                                        <Icon type="mail"/>
                                        <input
                                            type="text" 
                                            ref="email"
                                            className={ store.validEmail ? '' : 'wrong'}
                                            placeholder={ UPEX.lang.template('邮箱') }
                                            onInput={ action.onChangeEmail }
                                        />
                                    </div>
                                    { !store.validEmail ? <div className="warn">* { UPEX.lang.template('邮箱格式错误')}</div> : null }
                                </div>
                            ) : (
                                <div className="input-wrapper" key="phone">
                                    <div className="input-box input-phone">
                                        <span className="area-code">+{store.areaCode}</span>
                                        <input
                                            type="text" 
                                            ref="phone"
                                            className={ store.validPhone && !store.hasPhone ? '' : 'wrong'}
                                            placeholder={ UPEX.lang.template('手机') }
                                            onInput={  action.onChangePhone }
                                            onBlur={ this.queryHasPhone }
                                        />
                                    </div>
                                    { !store.validPhone ? <div className="warn">* { UPEX.lang.template('手机号格式错误')}</div> : null }
                                </div>
                            )
                        }
                        <div className="input-wrapper">
                            <div className="input-box">
                                <Icon type="lock"/>
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
                                <Icon type="lock"/>
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
                            <div className="input-box yz-box">
                                <Icon type="safety"/>
                                <input 
                                    type="text" 
                                    ref="picCode" 
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
                                <Icon type="safety"/>
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
                                <Icon type="code-o"/>
                                <input 
                                    type="text" 
                                    ref="invitecode"
                                    placeholder={ UPEX.lang.template('邀请码')}
                                    onInput={ action.onChangeInviteCode }
                                />
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <div className="input-box user-protocol">
                                <input 
                                    ref="checkboxBtn"
                                    type="checkbox"
                                    onChange={ action.onChangeAgreeCheckBox } 
                                />
                                <label>{ UPEX.lang.template('我已阅读并同意')} </label>
                                <a target='_blank' href="#">《{ UPEX.lang.template('服务条款')}》</a>
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <div className="input-box">
                                <button ref="signIn" className={ store.agree ? 'submit-btn': 'submit-btn disabled'} onClick={ this.submit }>{ UPEX.lang.template('注册') }</button>
                            </div>
                        </div>

                        <div className="register-extra">
                            { UPEX.lang.template('已有帐户？')}
                            <Link to="/login"> { UPEX.lang.template('登录')}</Link>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default Register;