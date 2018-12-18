import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { Link, browserHistory } from 'react-router';
import { setTradePwdSendCode } from '@/api/http';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import SmsBtn from '@/mods/common/sms-btn';

import AutoCompleteHack from '@/mods/common/auto-complete-hack';

import PageForm from '@/components/page-user/page-form';
import { createGetProp } from '@/components/utils';

@inject('userInfoStore')
@observer
export default class SettingTradingPassword extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.$sendBtn = <SmsBtn sendCode={setTradePwdSendCode.bind(this, { type: 2 })} />;
        console.log('wqeqwew');
        this.PageProps = {
            title: UPEX.lang.template('设置资金密码'),
            formClass: 'modify-password-box'
        };

        const getProp = createGetProp(this);
        this.inputsData = [
            {
                label: UPEX.lang.template('资金密码'),
                className: 'new-pwd',
                inputProps: getProp('password'),
                tip: UPEX.lang.template('密码由8-16数字、字母和特殊字符组成')
            },
            {
                label: UPEX.lang.template('确认密码'),
                inputProps: getProp('comfirmPwd')
            }
        ];
        this.vCodeData = {
            label: UPEX.lang.template('短信验证码'),
            className: 'sms-code',
            inputProps: {
                onChange: e => {
                    this.setVal(e, 'vCode');
                }
            }
        };
    }

    componentDidMount() {}

    state = {
        password: '',
        comfirmPwd: '',
        vCode: '',
        ivCode: '111'
    };

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
        const reg = UPEX.tradePwdReg;
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

        this.props.userInfoStore.bindTradingPwd(this.state.password, this.state.vCode, this.state.ivCode, 'codeid').then(res => {
            if (res.status == 200) {
                browserHistory.push('/user/setpwd');
            }
        });
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading_tpwd;
        const { PageProps, inputsData, vCodeData, $sendBtn } = this;

        return (
            <PageForm {...PageProps}>
                <FormView>
                    <AutoCompleteHack />
                    {inputsData.map((item, i) => {
                        return <FormItem key={i} {...item} />;
                    })}
                    <FormItem {...vCodeData} after={$sendBtn} />
                    <FormItem>
                        <Button loading={loading} className="submit-btn" onClick={this.submit}>
                            {UPEX.lang.template('提交')}
                        </Button>
                    </FormItem>
                </FormView>
            </PageForm>
        );
    }
}
