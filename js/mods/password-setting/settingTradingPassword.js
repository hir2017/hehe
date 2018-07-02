/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { Link, browserHistory} from 'react-router';
import Vcodebutton from '../common/authcode-btn';

import InputItem from '../../common-mods/form/input-item';
import PageForm from '../../common-mods/page-user/page-form';
import { createGetProp } from '../../common-mods/utils';

@inject('userInfoStore', 'captchaStore')
@observer
export default class SettingTradingPassword extends Component {
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
            message.error(UPEX.lang.template('资金密码不能为空'));
            return;
        }
        const reg = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/;
        if (this.state.password && !reg.test(this.state.password)) {
            message.error(UPEX.lang.template('密码由6-18数字、字母和特殊字符组成'));
            return;
        }
        if (!this.state.comfirmPwd) {
            message.error(UPEX.lang.template('确认密码不能为空'));
            return;
        }
        if (this.state.password !== this.state.comfirmPwd) {
            message.error(UPEX.lang.template('资金密码和确认密码不一致'));
            return;
        }
        if (!this.state.vCode) {
            message.error(UPEX.lang.template('短信验证码不能为空'));
            return;
        }

        this.props.userInfoStore.bindTradingPwd(this.state.password, this.state.vCode, this.state.ivCode, codeid).then(data => {
            if (data) {
                browserHistory.push('/user/setpwd');
            }
        });
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading_tpwd;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const PageProps = {
            title: UPEX.lang.template('設置交易密碼'),
            formClass: 'modify-password-box'
        };
        // state = {
        //     password: '',
        //     comfirmPwd: '',
        //     vCode: '',
        //     ivCode: ''
        // };
        const getProp = createGetProp(this);
        const inputsData = [
            {
                label: UPEX.lang.template('资金密码'),
                className: 'new-pwd',
                inputProps: getProp('password'),
                tip: UPEX.lang.template('密码由6-18数字、字母和特殊字符组成')
            },
            {
                label: UPEX.lang.template('确认密码'),
                inputProps: getProp('comfirmPwd')
            }
        ];
        const ivCodeData = {
            label: UPEX.lang.template('图片验证码'),
            className: 'v-code',
            inputProps: getProp('ivCode', 'none')
        };
        const vCodeData = {
            label: UPEX.lang.template('短信验证码'),
            className: 'v-code',
            inputProps: getProp('vCode', 'none')
        };
        return (
            <PageForm {...PageProps}>
                {inputsData.map((item, i) => {
                    return <InputItem key={i} {...item} />;
                })}
                <div>
                    <InputItem {...ivCodeData} />
                    <div className="item v-code-button">
                        <img onClick={this.captchaChange} src={captcha} />
                    </div>
                </div>
                <div className="input-vcode-wrapper">
                     <InputItem {...vCodeData} />
                    <div className="item v-code-button">
                        <Vcodebutton imgCode={this.state.ivCode} codeid={codeid} type="phone" />
                    </div>
                </div>
                <div style={{ display: 'none' }} className="massage">
                    {UPEX.lang.template('不方便接短信？可使用')}&nbsp;&nbsp;&nbsp;&nbsp;<Link>Google{UPEX.lang.template('驗證碼')}</Link>
                </div>
                <Button loading={loading} className="ace-submit-item" onClick={this.submit}>
                    {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
