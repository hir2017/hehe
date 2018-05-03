/**
 * @fileoverview 注册页面
 * @author 陈立英
 * @date 2018-04-26
 * 表单验证：
 *    邮箱：输入实时verify邮箱有效性
 *    手机：
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon, message } from 'antd';
import {  Link , browserHistory} from 'react-router';
import Timer from '../../lib/timer';
import Header from '../../mods/header';
import Footer from '../../mods/footer';
import countryCode from '../../mods/register/country-code';

@inject('commonStore', 'registerStore')
@observer
class Register extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        // 组件加载完调用图片验证码
        this.props.registerStore.fetchPicCaptcha();
        console.log(Timer);
    }

    componentWillUnmount(){
        this.destroyTimer(); 
    }

    destroyTimer(){
        this.timer && this.timer.destroy(); 
    }

    handleSwitchMode(mode){
        this.props.registerStore.changeModeTo(mode);
    }

    // 发送验证码
    sendCaptcha=(e)=> {
        let registerStore = this.props.registerStore;
        let { checkUserBeforeSendCode, sendEmailForRegister } = registerStore;

        // 验证邮箱/手机、密码
        if (!checkUserBeforeSendCode.pass) {
            message.error(checkUserBeforeSendCode.message);
            return;
        }

        if (registerStore.codesending) {
            return;
        }

        let timer = this.timer = new Timer({
            remainTime : 60,
            isDoubleBit: true,
            selector: {
                second:'[data-second]'
            }
        });

        this.timer.on('end' ,  () =>{
            registerStore.changeSendingStatusTo(false);
        });

        registerStore.changeSendingStatusTo(true);

        sendEmailForRegister()
            .then((data) => {
                if (data.status ==  200) {
                    registerStore.setPicCaptcha(true);
                } else if (data.status == 412){
                    registerStore.changeSendingStatusTo(false);
                    registerStore.setPicCaptcha(false);
                    message.error(UPEX.lang.template('图片验证码错误'));
                
                    this.destroyTimer();
                    this.getPicCaptcha()
                } else {
                    registerStore.changeSendingStatusTo(false);
                    message.error(data.message);

                    this.destroyTimer();
                    this.getPicCaptcha();
                } 
            });
    }

    handleSubmit=()=>{
        let { checkUserBeforeRegister, userRegister } = this.props.registerStore;

        // 验证邮箱/手机、密码、验证码等
        if (!checkUserBeforeRegister.pass) {
            message.error(checkUserBeforeRegister.message);
            return;
        }
        // 没有勾选同意服务协议
        if(!this.props.registerStore.agress) {
            return;
        }

        userRegister().
            then((data)=>{
                switch (data.status) {
                    case 200:
                        message.success(UPEX.lang.template('成功，将跳转登录页面'));
                        browserHistory.push('/login');
                        break;
                    case 403:
                        this.props.registerStore.changeValidCaptchaTo(false);
                        this.getPicCaptcha();
                        break;
                    default:
                        message.error(data.message);
                        this.getPicCaptcha();
                        break;
                }
            })
    }

    onChangeEmail=(e)=>{
        let value = e.currentTarget.value.trim();

        this.props.registerStore.setEmail(value);        
    }

    onChangePhone = (e)=>{
        let value = e.currentTarget.value.trim();
       
        this.props.registerStore.setPhone(value);        
    }

    onChangePwd = (e)=>{
        let value = e.currentTarget.value.trim();
       
        this.props.registerStore.setPasswrod(value);        
    }

    onChangeTwicePwd=(e)=>{
        let value = e.currentTarget.value.trim();

        this.props.registerStore.setTwicePasswrod(value);
    }

    onChangePicCode=(e)=>{
        let value = e.currentTarget.value.trim();

        this.props.registerStore.setPicCode(value);
    }

    onChangeVercode=(e)=> {
        let value = e.currentTarget.value.trim();

        this.props.registerStore.setVercode(value);
    }

    onChangeInviteCode=(e)=>{
        let value = e.currentTarget.value.trim();

        this.props.registerStore.setInviteCode(value);
    }

    handleChange=(e)=>{
        let value = e.currentTarget.value.trim();

        this.props.registerStore.setAreaCode(value);
    }

    blurPhone=(e)=>{
        this.props.registerStore.blurPhone();
    }

    // 检查手机号是否占用
    queryHasPhone=(e)=>{
        this.props.registerStore.queryHasPhone();
    }

    getPicCaptcha=(e)=>{
        this.props.registerStore.fetchPicCaptcha();
    }

    checkboxBtn=(e)=>{
        let checked = e.currentTarget.checked == true;
        
        this.props.registerStore.setAgress(checked);
    }

    render() {
        let registerStore = this.props.registerStore;
        let $options;

        let country = countryCode.map((cur,index)=>{
            if (cur.code == registerStore.areaCode) {
                return <option selected={true} value={cur.code} key={index}>{cur.en}</option>
            }
            return <option value={cur.code} key={index}>{cur.en}</option>
        })

        return (
            <div className="register-wrapper tobottom-footer" style={{ minHeight: this.props.commonStore.windowDimensions.height}}>
                <Header/>
                <div className="register-main">
                    <div className="register-form">
                        <div className="register-mode-tabs clearfix">
                            {
                                ['email', 'phone'].map((item, index)=>{
                                    let cls = 'register-mode-tab';
                                    let txt;
                                    
                                    if (registerStore.registerMode === item) {
                                        cls += ' selected';
                                    }

                                    if (item == 'email') {
                                        txt = UPEX.lang.template('邮箱注册');
                                    } else {
                                        txt = UPEX.lang.template('手机注册')
                                    }

                                    return (
                                        <div  className={cls} key={index} onClick={this.handleSwitchMode.bind(this, item)}>{ txt }</div>
                                    )
                                })
                            }
                        </div>
                        <div className="register-mode-content">
                            {
                                registerStore.registerMode == 'email' ? null : (
                                    <div className="input-wrapper">
                                        <div className="input-box">
                                            <select onChange={ this.handleChange }>
                                                { country }
                                            </select>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                registerStore.registerMode == 'email' ? (
                                    <div className="input-wrapper" key="email">
                                        <div className="input-box">
                                            <Icon type="lock"/>
                                            <input
                                                type="text" 
                                                ref="email"
                                                className={ registerStore.checkEmail ? '' : 'wrong'}
                                                placeholder={ UPEX.lang.template('邮箱') }
                                                onInput={ this.onChangeEmail }
                                            />
                                        </div>
                                        { !registerStore.checkEmail ? <div className="warn">* { UPEX.lang.template('邮箱格式错误')}</div> : null }
                                    </div>
                                ) : (
                                    <div className="input-wrapper" key="phone">
                                        <div className="input-box input-phone">
                                            <span className="area-code">+{registerStore.areaCode}</span>
                                            <input
                                                type="text" 
                                                ref="phone"
                                                className={ registerStore.checkPhone && !registerStore.hasPhone ? '' : 'wrong'}
                                                placeholder={ UPEX.lang.template('手机') }
                                                onInput={  this.onChangePhone }
                                                onBlur={ this.queryHasPhone }
                                            />
                                        </div>
                                        { !registerStore.checkPhone ? <div className="warn">* { UPEX.lang.template('手机号格式错误')}</div> : null }
                                    </div>
                                )
                            }
                            <div className="input-wrapper">
                                <div className="input-box">
                                    <Icon type="lock"/>
                                    <input
                                        type="password" 
                                        ref="pwd"
                                        className={ registerStore.checkPwd ? '' : 'wrong'}
                                        placeholder={ UPEX.lang.template('密码') }
                                        onInput={ this.onChangePwd }
                                    />
                                </div>
                                { !registerStore.checkPwd ? <div className="warn">* { UPEX.lang.template('密码至少由大写字母+小写字母+数字，8-16位组成')}</div> : null }
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box">
                                    <Icon type="lock"/>
                                    <input
                                        type="password" 
                                        ref="twicepwd"
                                        className={ registerStore.checkTwicePwd ? '' : 'wrong'}
                                        placeholder={ UPEX.lang.template('确认密码') }
                                        onInput={ this.onChangeTwicePwd }
                                    />
                                </div>
                                { !registerStore.checkTwicePwd ? <div className="warn">* { UPEX.lang.template('两次密码输入不一致')}</div> : null }
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box yz-box">
                                    <Icon type="safety"/>
                                    <input 
                                        type="text" 
                                        ref="picCode" 
                                        placeholder={ UPEX.lang.template('图片验证') }
                                        onInput={ this.onChangePicCode }
                                        className={ registerStore.picCaptcha ? '' : 'wrong' }
                                    />
                                    <div className="codeimg">
                                        <img src={ registerStore.captcha } onClick={ this.getPicCaptcha } alt=""/>
                                    </div>
                                </div>
                                { !registerStore.picCaptcha ? <div className="warn">{ UPEX.lang.template('图片验证码错误')}</div> : null }
                            </div>
                            <div className="input-wrapper">
                                <div className="input-box useryz-box">
                                    <Icon type="safety"/>
                                    <input 
                                        type="text" 
                                        ref="picCode" 
                                        placeholder={ registerStore.registerMode == 'email' ? UPEX.lang.template('邮箱验证码') : UPEX.lang.template('手机验证码') }
                                        className={ registerStore.validCaptcha ? '' : 'wrong' }
                                        onInput={ this.onChangeVercode }
                                        onBlur={ this.blurPhone }
                                    />
                                    <div className="yzcode">
                                        <button onClick={ this.sendCaptcha } className={ registerStore.codesending ? 'disabled' : ''} >
                                            <div className={ registerStore.codesending ? 'code-sending': 'code-sending hidden'}>{ UPEX.lang.template('重发')}(<span data-second="second" ref="second"></span>)s</div>
                                            <div className={ registerStore.codesending ? 'code-txt hidden' : 'code-txt'}>{  UPEX.lang.template('发送验证码') }</div>
                                        </button>
                                    </div>
                                </div>
                                { !registerStore.validCaptcha ? <div className="warn">{ registerStore.registerMode == 'email' ? UPEX.lang.template('邮箱验证码错误') : UPEX.lang.template('手机验证码错误') }</div> : null }
                            </div>

                            <div className="input-wrapper">
                                <div className="input-box">
                                    <Icon type="code-o"/>
                                    <input 
                                        type="text" 
                                        ref="invitecode"
                                        placeholder={ UPEX.lang.template('邀请码')}
                                        onInput={ this.onChangeInviteCode }
                                    />
                                </div>
                            </div>

                            <div className="input-wrapper">
                                <div className="input-box user-protocol">
                                    <input 
                                        ref="checkboxBtn"
                                        type="checkbox"
                                        onChange={ this.checkboxBtn } 
                                    />
                                    <label>{ UPEX.lang.template('我已阅读并同意')} </label>
                                    <a target='_blank' href="#">《{ UPEX.lang.template('服务条款')}》</a>
                                </div>
                            </div>

                            <div className="input-wrapper">
                                <div className="input-box">
                                    <button ref="signIn" className={ registerStore.agress ? 'submit-btn': 'submit-btn disabled'} onClick={ this.handleSubmit }>{ UPEX.lang.template('注册') }</button>
                                </div>
                            </div>

                            <div className="go-login">
                                { UPEX.lang.template('已有帐户？')}
                                <Link to="/login"> { UPEX.lang.template('登录')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div> 
        );
    }
}

export default Register;