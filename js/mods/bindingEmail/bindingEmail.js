import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { Link } from 'react-router';
import Vcodebutton from '../common/authcode-btn';

import InputItem from '../../common-mods/form/input-item';
import PageForm from '../../common-mods/page-user/page-form';
import { createGetProp } from '../../common-mods/utils';

@inject('userInfoStore', 'captchaStore')
@observer
export default class BindingEmail extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.props.captchaStore.fetch();
    }

    state = {
        email: '',
        vCode: '',
        ivCode: '',
        pvCode: ''
    };

    captchaChange() {
        this.props.captchaStore.fetch();
    }

    setVal(e, name) {
        const data = {};
        data[name] = e.target.value;
        this.setState(data);
    }

    submit() {
        const codeid = this.props.captchaStore.codeid;
        if (!this.state.email) {
            message.error(UPEX.lang.template('邮箱不能为空'));
            return;
        }
        if (!this.state.vCode) {
            message.error(UPEX.lang.template('邮箱验证码不能为空'));
            return;
        }
        if (!this.state.pvCode) {
            message.error(UPEX.lang.template('手机验证码不能为空'));
            return;
        }

        this.props.userInfoStore.bindPEAction(this.state.vCode, this.state.pvCode, this.state.email, 1);
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        /*
            state = {
                email: '',
                vCode: '',
                ivCode: '',
                pvCode: ''
            };
        */
        const getProp = createGetProp(this);
        const inputsData = {
            email: {
                label: UPEX.lang.template('邮箱'),
                inputProps: getProp('email', 'none')
            },
            ivCode: {
                label: UPEX.lang.template('图片验证码'),
                className: 'v-code',
                inputProps: getProp('ivCode', 'none')
            },
            vCode: {
                label: UPEX.lang.template('邮箱验证码'),
                inputProps: getProp('vCode', 'none')
            },
            pvCode: {
                label: UPEX.lang.template('短信确认码'),
                className: 'v-code',
                inputProps: getProp('pvCode', 'none')
            },
        };

        const PageProps = {
            title: UPEX.lang.template('绑定邮箱'),
            formClass: 'modify-password-box'
        };
        return (
            <PageForm {...PageProps}>
                <InputItem {...inputsData.email} />
                <div>
                   <InputItem {...inputsData.ivCode} />
                   <div className="item v-code-button">
                        <img onClick={this.captchaChange.bind(this)} src={captcha} />
                    </div>
                </div>
                <InputItem {...inputsData.vCode} />
                <div>
                    <InputItem {...inputsData.pvCode} />
                    <div className="item v-code-button">
                        <Vcodebutton message="邮箱不能为空" emailOrphone={this.state.email} areacode="" newBind={true} type={1} imgCode={this.state.ivCode} codeid={codeid} />
                    </div>
                </div>
                <div className="massage" style={{ display: 'none' }}>
                    {UPEX.lang.template('不方便接短信？可使用')}&nbsp;&nbsp;&nbsp;&nbsp;<Link>Google{UPEX.lang.template('驗證碼')}</Link>
                </div>
                <Button loading={loading} className="ace-submit-item" onClick={this.submit}>
                    {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
