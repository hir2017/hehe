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
export default class ModifyTradingPassword extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.captchaChange = this.captchaChange.bind(this);
    }

    componentWillMount() {
        this.props.captchaStore.fetch();
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
        const codeid = this.props.captchaStore.codeid;
        if (!this.state.password) {
            message.error(UPEX.lang.template('交易密码不能为空'));
            return;
        }
        if (!this.state.newPwd) {
            message.error(UPEX.lang.template('新交易密码不能为空'));
            return;
        }
        if (!this.state.comfirmPwd) {
            message.error(UPEX.lang.template('确认密码不能为空'));
            return;
        }
        if (this.state.newPwd !== this.state.comfirmPwd) {
            message.error(UPEX.lang.template('新交易密码和确认密码不一致'));
            return;
        }

        const checkPwd = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/.test(this.state.newPwd);

        if (this.state.newPwd && !checkPwd) {
            message.error(UPEX.lang.template('密码由6-18数字、字母和特殊字符组成'));
            return;
        }

        const pwd = md5(this.state.password + UPEX.config.dealSalt + this.props.authStore.uid);
        let reqResult = this.props.userInfoStore.modifytradingPwd(this.state.newPwd, pwd);
        reqResult.then(data => {
            console.log('after', data)
            if (data) {
                browserHistory.push('/user/setpwd');
            }
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading_tpwd;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const userInfo = this.props.userInfoStore.userInfo || {};

        const getProp = name => {
            return {
                type: 'password',
                className: 'input',
                onChange: e => {
                    this.setVal(e, name);
                }
            };
        };

        return (
            <div>
                <div className="modify-password-title">{UPEX.lang.template('修改交易密碼')}</div>
                <div className="modify-password-box">
                    <div className="item new-pwd">
                        <span className="lable">{UPEX.lang.template('交易密码')}</span>
                        <input {...getProp('password')} />
                        <span className="item-left-meassage">*{UPEX.lang.template('密码由6-18数字、字母和特殊字符组成')}</span>
                    </div>
                    <div className="item">
                        <span className="lable">{UPEX.lang.template('新交易密码')}</span>
                        <input {...getProp('newPwd')} />
                    </div>
                    <div className="item">
                        <span className="lable">{UPEX.lang.template('确认密码')}</span>
                        <input {...getProp('comfirmPwd')} />
                    </div>
                    <div className="massage" style={{ display: 'none' }}>
                        {UPEX.lang.template('不方便接短信？可使用')}&nbsp;&nbsp;&nbsp;&nbsp;<Link>Google{UPEX.lang.template('驗證碼')}</Link>
                    </div>
                    <div className="submit">
                        <Button loading={loading} onClick={this.submit}>
                            {UPEX.lang.template('提交')}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
