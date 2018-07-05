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

import InputItem from '../../common-mods/form/input-item';
import PageForm from '../../common-mods/page-user/page-form';
import { createGetProp } from '../../common-mods/utils';

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
            message.error(UPEX.lang.template('请填写资金密码'));
            return;
        }
        if (!this.state.newPwd) {
            message.error(UPEX.lang.template('请填写新资金密码'));
            return;
        }
        if (!this.state.comfirmPwd) {
            message.error(UPEX.lang.template('请填写确认密码'));
            return;
        }
        if (this.state.newPwd !== this.state.comfirmPwd) {
            message.error(UPEX.lang.template('新资金密码和确认密码不一致'));
            return;
        }

        const checkPwd = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/.test(this.state.newPwd);

        if (this.state.newPwd && !checkPwd) {
            message.error(UPEX.lang.template('密码由6-18数字、字母和特殊字符组成'));
            return;
        }

        const pwd = md5(this.state.password + UPEX.config.dealSalt + this.props.authStore.uid);
        let reqResult = this.props.userInfoStore.modifytradingPwd(this.state.newPwd, pwd);
        reqResult
            .then(data => {
                console.log('after', data);
                if (data) {
                    browserHistory.push('/user/setpwd');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading_tpwd;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const userInfo = this.props.userInfoStore.userInfo || {};

        const getProp = createGetProp(this);
        const inputsData = [
            {
                label: UPEX.lang.template('资金密码'),
                className: 'new-pwd',
                inputProps: getProp('password'),
                tip: UPEX.lang.template('密码由6-18数字、字母和特殊字符组成')
            },
            {
                label: UPEX.lang.template('新资金密码'),
                inputProps: getProp('newPwd')
            },
            {
                label: UPEX.lang.template('确认密码'),
                inputProps: getProp('comfirmPwd')
            }
        ];
        // const vCodeData = {
        //     label: UPEX.lang.template('短信确认码'),
        //     className: 'v-code',
        //     inputProps: getProp('vCode', 'none')
        // }
        const PageProps = {
            title: UPEX.lang.template('修改资金密碼'),
            formClass: 'modify-password-box'
        };

        return (
            <PageForm {...PageProps}>
                {inputsData.map((item, i) => {
                    return <InputItem key={i} {...item} />;
                })}

                <Button loading={loading} className="ace-submit-item" onClick={this.submit}>
                    {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
