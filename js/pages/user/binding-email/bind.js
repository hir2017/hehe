import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import SendVCodeBtn from '@/mods/common/v-code-btn';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import { createGetProp } from '@/components/utils';
import Card from '@ui/card';

import { Loading } from '@/mods/authhoc/user';

import Success from './mod-success';

import { bindPhoneOrEmailSendCode, bindPhoneOrEmailAction } from '@/api/http';

@inject('userInfoStore')
@observer
export default class BindingEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            vCode: '',
            loading: false,
            success: true
        };
        const getProp = createGetProp(this);
        this.inputsData = {
            email: {
                label: UPEX.lang.template('邮箱'),
                inputProps: getProp('email', 'none')
            },
            vCode: {
                label: UPEX.lang.template('邮箱验证码'),
                className: 'sms-code',
                inputProps: getProp('vCode', 'none')
            }
        };

        this.afterNode = <SendVCodeBtn sendCode={this.sendCode.bind(this)} validateFn={this.validateFrom.bind(this, 'partical')} />;
    }

    setVal(e, name) {
        let value = e.target.value.trim();
        value = value.replace(/[\u4e00-\u9fa5]/g, '');
        this.setState({
            [name]: value
        });
    }

    sendCode({ validate, captchaId }) {
        return bindPhoneOrEmailSendCode({
            NECaptchaValidate: validate,
            captchaId,
            phoneOrEmail: this.state.email,
            type: 1
        })
            .then(res => {
                if (res.status !== 200) {
                    if ([0, 9999, 9997].indexOf(res.status) === -1) {
                        message.error(res.message);
                    } else {
                        console.error(res.message);
                    }
                }
                return res;
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
                return false;
            });
    }

    validateFrom(type = 'all') {
        const { state } = this;
        if (!state.email) {
            message.error(UPEX.lang.template('请填写邮箱'));
            return false;
        }
        // 校验邮箱 UPEX.emailReg
        if (!UPEX.emailReg.test(state.email)) {
            message.error(UPEX.lang.template('请填写正确的邮箱地址'));
            return false;
        }
        if (type === 'all') {
            if (!state.vCode) {
                message.error(UPEX.lang.template('请填写邮箱验证码'));
                return false;
            }
        }
        return true;
    }

    submit() {
        const { state } = this;
        if (!this.validateFrom()) {
            return;
        }
        this.setState({
            loading: true
        });
        bindPhoneOrEmailAction({
            code: state.vCode,
            phoneOrEmail: state.email,
            type: 1
        }).then(res => {
            this.setState({
                loading: false
            });
            if (res.status === 200) {
                message.success(UPEX.lang.template('绑定成功'));
                this.setState({
                    success: true
                });
                this.props.userInfoStore.getUserInfo();
                // browserHistory.push('/user/emailSuccess');
            } else {
                result = false;
                this.props.userInfoStore.pickErrMsg(res, 'bindPEAction');
            }
        });
    }

    render() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        const { state, inputsData, afterNode } = this;
        let $content = null;
        // 已提交 或者 已绑定
        if(state.success || userInfo.isValidateEmail === 1) {
            $content = <Success userInfo={userInfo} />;
        }
        if (userInfo.isValidateEmail === 0) {
            $content = (
                <FormView>
                    <FormItem {...inputsData.email} value={state.email} />
                    <FormItem {...inputsData.vCode} value={state.vCode} after={afterNode} />
                    <FormItem>
                        <Button loading={state.loading} className="exc-submit-item" onClick={this.submit.bind(this)}>
                            {UPEX.lang.template('提交')}
                        </Button>
                    </FormItem>
                </FormView>
            );
        }

        return (
            <div className="page-content-inner  clearfix bind-email" >
                <Card title={UPEX.lang.template('邮箱绑定')}>
                    <Loading init={this.props.userInfoStore.getUserInfo}>
                        {$content}
                    </Loading>
                </Card>
            </div>
        );
    }
}
