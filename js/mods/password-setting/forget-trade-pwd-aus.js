import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { browserHistory } from 'react-router';
import { setTradePwdSendCode } from '@/api/http';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import SmsBtn from '@/mods/common/sms-btn';

import AutoCompleteHack from '../common/auto-complete-hack';

import InputItem from '../../components/form/input-item';
import PageForm from '../../components/page-user/page-form';
import { createGetProp } from '../../components/utils';

@inject('userInfoStore')
@observer
export default class SettingTradingPassword extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        const getProp = createGetProp(this);
        this.$sendBtn = <SmsBtn sendCode={setTradePwdSendCode.bind(this, { type: 2 })} />;
        this.inputsData = {
            password: {
                label: UPEX.lang.template('新资金密码'),
                inputProps: getProp('password'),
                className: 'new-pwd',
                tip: UPEX.lang.template('密码由8-16数字、字母和特殊字符组成')
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
                label: UPEX.lang.template('短信验证码'),
                className: 'sms-code',
                inputProps: {
                    onChange: e => {
                        this.setVal(e, 'vCode');
                    }
                }
            }
        };
        this.PageProps = {
            title: UPEX.lang.template('重置资金密码'),
            formClass: 'modify-password-box'
        };
        this.state = {
            password: '',
            comfirmPwd: '',
            vCode: '',
            ivCode: ''
        };
    }

    setVal(e, name) {
        const data = {};
        data[name] = e.target.value;
        this.setState(data);
    }

    submit() {
        if (!this.state.password) {
            message.error(UPEX.lang.template('请输入资金密码'));
            return;
        }
        const reg = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{8,16}/;
        if (this.state.password && !reg.test(this.state.password)) {
            message.error(UPEX.lang.template('密码由8-16数字、字母和特殊字符组成'));
            return;
        }
        if (!this.state.comfirmPwd) {
            message.error(UPEX.lang.template('请输入确认密码'));
            return;
        }
        if (this.state.password !== this.state.comfirmPwd) {
            message.error(UPEX.lang.template('资金密码和确认密码不一致'));
            return;
        }
        if (!this.state.vCode) {
            message.error(UPEX.lang.template('请填写短信验证码'));
            return;
        }

        let reqResult = this.props.userInfoStore.forgetTradingPwd(this.state.password, this.state.vCode, 1, 1, 2);
        reqResult.then(data => {
            if (data) {
                setTimeout(() => {
                    browserHistory.push('/user/setpwd');
                }, 300);
            }
        });
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const { inputsData, PageProps, $sendBtn } = this;
        return (
            <PageForm {...PageProps}>
                <FormView>
                    <AutoCompleteHack />
                    <FormItem {...inputsData.password} />
                    <FormItem {...inputsData.comfirmPwd} />
                    <FormItem {...inputsData.vCode} after={$sendBtn} />
                    <FormItem>
                        <Button loading={loading} className="exc-submit-item" onClick={this.submit}>
                            {UPEX.lang.template('提交')}
                        </Button>
                    </FormItem>
                </FormView>
            </PageForm>
        );
    }
}
