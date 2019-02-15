import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { Link } from 'react-router';
import { setTradePwdSendCode } from '@/api/http';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import SmsBtn from '@/mods/common/sms-btn';
import Numberutils from  '@/lib/util/number';
import AceForm from '@/components/form/form';
import PageWrapper from '@/components/page-user/page-wrapper';
import { createGetProp } from '@/components/utils';
import { browserHistory } from 'react-router';
import { Loading } from '@/mods/authhoc/user';
import { NoAuth } from '@/mods/authhoc/user/auth';

@inject('userInfoStore')
@observer
class Google extends Component {
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
    }

    componentDidMount() {
        this.props.userInfoStore.getGaSecretKey();
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
        if (name == 'vCode' || name == 'google') {
            val = val.slice(0,6);
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

        this.props.userInfoStore.bindGA(this.state.google, this.state.vCode).then(res => {
            if(res.status === 200) {
                browserHistory.push('/user/google');
            }
        });
    }

    init = () => {
        return this.props.userInfoStore.getUserInfo();
    }

    render() {
        const store = this.props.userInfoStore;
        const loading = store.submit_loading;
        const gaSecretKey = store.gaSecretKey || {};
        const { inputsData, $sendBtn, state } = this;

        return (
            <PageWrapper title={UPEX.lang.template('绑定Google验证器')}>
                <Loading init={this.init}>
                    { store.userInfo.isGoogleAuth == 1 ? (
                        <NoAuth  title={UPEX.lang.template('已绑定Google验证器')}/>
                    ) : (
                        <AceForm className="modify-password-box google-auth-box">
                            <div className="google-auth-message">
                                {gaSecretKey.qrcode ? <img src={`data:image/png;base64,${gaSecretKey.qrcode}`} /> : <img />}
                                <div className="code-sms">{gaSecretKey.secretKey}</div>
                            </div>
                            <FormView>
                                <FormItem {...inputsData.vCode} value={state.vCode} after={$sendBtn} />
                                <FormItem {...inputsData.google} value={state.google} />
                            </FormView>
                            <Button loading={loading} className="exc-submit-item" onClick={this.submit}>
                                {UPEX.lang.template('绑定')}
                            </Button>
                            <div className="info">
                                <Link to="/user/google-guide">{UPEX.lang.template('Google验证器使用教程')}</Link>
                            </div>
                        </AceForm>
                    )}
                </Loading>
            </PageWrapper>
        );
    }
}

export default Google;
