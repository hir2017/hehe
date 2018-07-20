/**
 * @fileoverview 登录页面
 * @author 陈立英
 * @date 2018-04-26
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
import { Link } from 'react-router';
import toAction from './action';
import {isPhone} from '../../lib/util/validate';
const Option = Select.Option;

@inject('loginStore')
@observer
class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.action = toAction(this.props.loginStore);

        this.state = {
            phone: ''
        }
    }

    componentDidMount() {
        this.action.getImgCaptcha();
    }

    componentWillUnmount() {
        this.action.destroy();
    }

    sendVercode = e => {
        this.action.sendVercode('resetpwd');
    };

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

        let options = [];

        $.map(store.countries, (item, key) => {
            options[options.length] = (
                <Option value={key} key={key}>
                    {UPEX.lang.template(key)}(+{item.areacode})
                </Option>
            );
        });

        return (
            <div className="register-wrapper resetpwd-box">
                <div className="register-form">
                    <h3 className="title"> {UPEX.lang.template('忘记密码')} </h3>
                    <ul className="register-mode-tabs clearfix">
                        {['email', 'phone'].map((item, index) => {
                            let cls = 'register-mode-tab';
                            let txt;

                            if (store.mode === item) {
                                cls += ' selected';
                            }

                            if (item == 'email') {
                                txt = UPEX.lang.template('邮箱方式找回');
                            } else {
                                txt = UPEX.lang.template('手机方式找回');
                            }

                            return (
                                <li key={item}>
                                    <button type="button" className={cls} onClick={action.onChangeMode.bind(this, item)}>
                                        {txt}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="register-mode-content">
                        {store.mode == 'email' ? null : (
                            <div className="input-wrapper">
                                <div className="input-box">
                                    <Select onChange={action.onAreaCodeChange} defaultValue={store.selectedCountry.code}>
                                        {options}
                                    </Select>
                                </div>
                            </div>
                        )}
                        {store.mode == 'email' ? (
                            <div className="input-wrapper" key="email">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        placeholder={UPEX.lang.template('邮箱')}
                                        onInput={action.onChangeEmail}
                                        onBlur={action.onBlurEmail}
                                        autoFocus
                                        autoComplete="off"
                                    />
                                </div>
                                {!store.validEmail ? <div className="warn">{UPEX.lang.template('请填写正确的邮箱')}</div> : null}
                            </div>
                        ) : (
                            <div className="input-wrapper" key="phone">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        placeholder={UPEX.lang.template('手机')}
                                        value={this.state.phone}
                                        onInput={e => {
                                            if (e.currentTarget.value.trim() !== '') {
                                                if (!isPhone(e.currentTarget.value.trim())) {
                                                    return;
                                                }
                                            }
                                            this.setState({
                                                phone: e.currentTarget.value.trim()
                                            });
                                            action.onChangePhone(e);
                                        }}
                                        onBlur={action.onBlurPhone}
                                        autoFocus
                                        autoComplete="off"
                                    />
                                </div>
                                {!store.validPhone ? <div className="warn">{UPEX.lang.template('请填写正确的手机号')}</div> : null}
                            </div>
                        )}
                        <div className="input-wrapper">
                            <div className="input-box yz-box">
                                <input
                                    type="text"
                                    placeholder={UPEX.lang.template('请参照右侧输入')}
                                    maxLength="5"
                                    autoComplete="off"
                                    onInput={action.onChangeImgCode}
                                    className={store.validImgCode ? '' : 'wrong'}
                                />
                                <div className="codeimg">
                                    <img src={store.captcha} onClick={action.getImgCaptcha} alt="" />
                                </div>
                            </div>
                            {!store.validImgCode ? <div className="warn">{UPEX.lang.template('请填写正确的图片验证码')}</div> : null}
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
                                    onInput={action.onChangeVercode}
                                />
                                <div className="yzcode">
                                    <button type="button" onClick={this.sendVercode} className={store.sendingcode ? 'disabled' : ''}>
                                        <div className={store.sendingcode ? 'code-sending' : 'code-sending hidden'}>
                                            {UPEX.lang.template('重发')}（<span data-second="second" ref="second" />s）
                                        </div>
                                        <div className={store.sendingcode ? 'code-txt hidden' : 'code-txt'}>{UPEX.lang.template('发送验证码')}</div>
                                    </button>
                                </div>
                            </div>
                            {!store.validVercode ? (
                                <div className="warn">
                                    {store.mode == 'email' ? UPEX.lang.template('请填写正确的邮箱验证码') : UPEX.lang.template('请填写正确的手机验证码')}
                                </div>
                            ) : null}
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
                                    onInput={action.onChangePwd}
                                    onBlur={action.onBlurPwd}
                                />
                            </div>
                            {!store.validPwd ? <div className="warn">{UPEX.lang.template('密码至少由大写字母+小写字母+数字，8-16位组成')}</div> : null}
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
                                    onInput={action.onChangeTwicePwd}
                                    onBlur={action.onBlurTwicePwd}
                                />
                            </div>
                            {!store.validTwicePwd ? <div className="warn">{UPEX.lang.template('两次密码输入不一致')}</div> : null}
                        </div>

                        <div className="input-wrapper">
                            {store.submiting ? (
                                <button type="button" className="submit-btn">
                                    {UPEX.lang.template('提交中')}
                                </button>
                            ) : (
                                <button type="button" className="submit-btn" onClick={this.submit}>
                                    {UPEX.lang.template('提交')}
                                </button>
                            )}
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
        );
    }
}

export default ResetPassword;
