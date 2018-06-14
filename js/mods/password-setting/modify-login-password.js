/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { Link, browserHistory } from 'react-router';
import Vcodebutton from '../common/authcode-btn';
import md5 from '../../lib/md5';

@inject('userInfoStore', 'captchaStore', 'authStore')
@observer
export default class ModifyPassword extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.captchaChange = this.captchaChange.bind(this);
    }

    componentWillMount() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        this.props.userInfoStore.getUserInfo();
        this.props.userInfoStore.isGoogleAuth();
        this.captchaChange();
    }

    state = {
        password: '',
        newPwd: '',
        comfirmPwd: '',
        vCode: '',
        ivCode: ''
    };

    setVal(e, name) {
        const data = {};
        data[name] = e.target.value;
        this.setState(data);
    }

    captchaChange() {
        this.props.captchaStore.fetch();
    }

    submit() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        const codeid = this.props.captchaStore.codeid;
        if (!this.state.password) {
            message.error(UPEX.lang.template('登录密码不能为空'));
            return;
        }
        if (!this.state.newPwd) {
            message.error(UPEX.lang.template('新登录密码不能为空'));
            return;
        }
        if (!this.state.comfirmPwd) {
            message.error(UPEX.lang.template('确认密码不能为空'));
            return;
        }
        if (this.state.newPwd !== this.state.comfirmPwd) {
            message.error(UPEX.lang.template('新登录密码和确认密码不一致'));
            return;
        }
        if (!this.state.vCode && !gaBindSuccess) {
            message.error(UPEX.lang.template('短信验证码不能为空'));
            return;
        }
        if (!this.state.vCode && gaBindSuccess) {
            message.error(UPEX.lang.template('谷歌验证码不能为空'));
            return;
        }

        const checkPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d\S]{8,16}$/.test(this.state.newPwd);

        if (this.state.newPwd && !checkPwd) {
            message.error(UPEX.lang.template('密码至少由大写字母+小写字母+数字，8-16位组成'));
            return;
        }

        const pwd = md5(this.state.password + UPEX.config.salt);
        const type = gaBindSuccess ? 1 : userInfo.phone ? 2 : 3;

        let reqResult = this.props.userInfoStore.resetPwd(this.state.newPwd, this.state.vCode, this.state.ivCode, codeid, pwd, type);
        reqResult.then(data => {
            if (data) {
                this.props.userInfoStore.pwdTriggerClear();
                this.props.authStore.clear();
                browserHistory.push('/login');
            }
        });
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading_pwd;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const userInfo = this.props.userInfoStore.userInfo || {};
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        const getProp = (name, type = 'password') => {
            const result = {
                className: 'input',
                onChange: e => {
                    this.setVal(e, name);
                }
            };
            if (type !== 'none') {
                result.type = type;
            }
            return result;
        };

        return (
            <div className="page-content-inner">
                <div className="content-title">{UPEX.lang.template('修改登錄密碼')}</div>
                <section className="content-body">
                    <div className=" modify-password-box">
                        <div className="item">
                            <span className="lable">{UPEX.lang.template('登录密码')}</span>
                            <input {...getProp('password')} />
                        </div>
                        <div className="item new-pwd">
                            <span className="lable">{UPEX.lang.template('新登录密码')}</span>
                            <input {...getProp('newPwd')} />
                            <span className="item-left-meassage">*{UPEX.lang.template('密码至少由大写字母+小写字母+数字，8-16位组成')}</span>
                        </div>
                        <div className="item">
                            <span className="lable">{UPEX.lang.template('确认密码')}</span>
                            <input {...getProp('comfirmPwd')} />
                        </div>
                        <div>
                            <div className="item v-code">
                                <span className="lable">{UPEX.lang.template('图片验证码')}</span>
                                <input {...getProp('ivCode', 'none')} />
                            </div>
                            <div className="item v-code-button">
                                <img onClick={this.captchaChange} src={captcha} />
                            </div>
                        </div>
                        {gaBindSuccess ? (
                            <div className="item">
                                <span className="lable">{UPEX.lang.template('谷歌验证码')}</span>
                                <input {...getProp('vCode', 'none')} />
                            </div>
                        ) : (
                            <div>
                                <div className="item v-code">
                                    <span className="lable">{!userInfo.phone ? UPEX.lang.template('邮箱验证码') : UPEX.lang.template('短信验证码')}</span>
                                    <input {...getProp('vCode', 'none')} />
                                </div>
                                <div className="item v-code-button">
                                    <Vcodebutton imgCode={this.state.ivCode} codeid={codeid} type={!userInfo.phone ? 'email' : 'phone'} />
                                </div>
                            </div>
                        )}
                        <div className="submit">
                            <Button loading={loading} onClick={this.submit}>
                                {UPEX.lang.template('提交')}
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
