import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { Link, browserHistory } from 'react-router';
import { setTradePwdSendCode } from '@/api/http';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import SmsBtn from '@/mods/common/sms-btn';

import InputItem from '../../components/form/input-item';
import PageForm from '../../components/page-user/page-form';
import { createGetProp } from '../../components/utils';

@inject('userInfoStore')
@observer
export default class ReBinding extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        const getProp = createGetProp(this);
        this.$sendBtn = <SmsBtn sendCode={setTradePwdSendCode.bind(this, {type: 2})} />;
        this.inputsData = {
            google: {
                label: UPEX.lang.template('Google验证码'),
                inputProps: getProp('google', 'none')
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
            title: UPEX.lang.template('解绑Google验证器'),
            formClass: 'modify-password-box'
        };
    }


    state = {
        google: '',
        vCode: '',
        ivCode: ''
    };

    setVal(e, name) {
        const data = {};
        data[name] = e.target.value;
        this.setState(data);
    }


    submit() {
        if (!this.state.google) {
            message.error(UPEX.lang.template('请填写Google验证码'));
            return;
        }
        if (!this.state.vCode) {
            message.error(UPEX.lang.template('请填写短信验证码'));
            return;
        }

        this.props.userInfoStore.rmBindGA(this.state.google, this.state.vCode).then(data => {
            if(data) {
                browserHistory.push('/user/google');
            }
        });
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const {inputsData, PageProps, $sendBtn} = this;

        return (
            <PageForm {...PageProps}>
                <FormView>
                    <FormItem {...inputsData.vCode} after={$sendBtn} />
                </FormView>
                <InputItem {...inputsData.google} />
                <div className="info">
                    <Link to="/user/google-guide" className="exc-link underline">{UPEX.lang.template('Google验证器使用教程')}</Link>
                </div>
                <Button className="exc-submit-item" loading={loading} onClick={this.submit}>
                    {UPEX.lang.template('解绑')}
                </Button>
            </PageForm>
        );
    }
}
