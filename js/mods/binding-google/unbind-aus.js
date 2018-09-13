import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message , Alert} from 'antd';
import { Link, browserHistory } from 'react-router';
import { setTradePwdSendCode } from '@/api/http';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import SmsBtn from '@/mods/common/sms-btn';
import Numberutils from  '@/lib/util/number';
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
            formClass: 'modify-password-box modify-google-box',
            tipComponent: <Alert className="ace-form-tips" type="warning" showIcon message={UPEX.lang.template('为了您的资金安全，修改Google验证码后，24小时不可以提币')} />
        };
    }


    state = {
        google: '',
        vCode: '',
    };

    setVal(e, name) {
        let val = e.target.value.trim();
        if(val !== '') {
            if(!Numberutils.isInteger(val)) {
                return;
            };
        }
        this.setState({
            [name]: val
        });
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
        const {inputsData, PageProps, $sendBtn, state} = this;

        return (
            <PageForm {...PageProps}>
                <FormView>
                    <FormItem {...inputsData.vCode} value={state.vCode} after={$sendBtn} />
                    <FormItem {...inputsData.google} value={state.google} />
                </FormView>
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
