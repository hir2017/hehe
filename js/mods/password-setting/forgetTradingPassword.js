import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { Link, browserHistory } from 'react-router';
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
            message.error(UPEX.lang.template('交易密码不能为空'));
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
            message.error(UPEX.lang.template('交易密码和确认密码不一致'));
            return;
        }
        if (!this.state.vCode) {
            message.error(UPEX.lang.template('短信验证码不能为空'));
            return;
        }

        let reqResult = this.props.userInfoStore.forgetTradingPwd(this.state.password, this.state.vCode, this.state.ivCode, codeid, 2);
        reqResult.then(data => {
            if(data) {
                setTimeout(() => {
                    browserHistory.push('/user/setpwd');
                }, 300)
            }
        })
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        /*
            state = {
                password: '',
                comfirmPwd: '',
                vCode: '',
                ivCode: ''
            };
        */
        const getProp = createGetProp(this);
        const inputsData = {
            password: {
                label: UPEX.lang.template('新交易密码'),
                inputProps: getProp('password'),
                className: 'new-pwd',
                tip: UPEX.lang.template('密码由6-18数字、字母和特殊字符组成')
            },
            comfirmPwd: {
                label: UPEX.lang.template('确认密码'),
                inputProps: getProp('comfirmPwd')
            },
            ivCode: {
                label: UPEX.lang.template('图片验证码'),
                className: 'v-code',
                inputProps: getProp('ivCode', 'none')
            },
            vCode: {
                label: UPEX.lang.template('短信确认码'),
                className: 'v-code',
                inputProps: getProp('vCode', 'none')
            }
        };

        const PageProps = {
            title: UPEX.lang.template('重置交易密碼'),
            formClass: 'modify-password-box'
        };
        return (
            <PageForm {...PageProps}>
                <InputItem {...inputsData.password} />
                <InputItem {...inputsData.comfirmPwd} />
                <div>
                    <InputItem {...inputsData.ivCode} />
                    <div className="item v-code-button">
                        <img onClick={this.captchaChange} src={captcha} />
                    </div>
                </div>
                <div>
                   <InputItem {...inputsData.vCode} />
                    <div className="item v-code-button">
                        <Vcodebutton imgCode={this.state.ivCode} codeid={codeid} type="phone" />
                    </div>
                </div>
                <div style={{ display: 'none' }} className="massage">
                    {UPEX.lang.template('不方便接短信？可使用')}&nbsp;&nbsp;&nbsp;&nbsp;<Link>Google{UPEX.lang.template('驗證碼')}</Link>
                </div>
                <div className="submit">
                    <Button loading={loading} className="ace-submit-item" onClick={this.submit}>
                        {UPEX.lang.template('提交')}
                    </Button>
                </div>
            </PageForm>
        );
    }
}
