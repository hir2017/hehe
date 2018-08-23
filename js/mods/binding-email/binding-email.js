import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import SendVCodeBtn from '../common/v-code-btn';
import { browserHistory } from 'react-router';
import InputItem from '../../components/form/input-item';
import PageForm from '../../components/page-user/page-form';
import { createGetProp } from '../../components/utils';

import { bindPhoneOrEmailSendCode, bindPhoneOrEmailAction } from '../../api/http';

@inject('userInfoStore')
@observer
export default class BindingEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            vCode: '',
            loading: false
        };
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {}

    setVal(e, name) {
        this.setState({
            [name]: e.target.value.trim()
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
                    message.error(res.message);
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
        const {state} = this;
        if (!state.email) {
            message.error(UPEX.lang.template('请填写邮箱'));
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
            type: 1,
        }).then(res => {
            this.setState({
                loading: false
            });
            if (res.status === 200) {
                message.success(UPEX.lang.template('绑定成功'));
                browserHistory.push('/user/emailSuccess');
            } else {
                result = false;
                this.props.userInfoStore.pickErrMsg(res, 'bindPEAction');
            }
        });
    }

    render() {
        const { disabled, timer, loading } = this.state;
        const getProp = createGetProp(this);
        const inputsData = {
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

        const PageProps = {
            title: UPEX.lang.template('绑定邮箱'),
            formClass: 'modify-password-box'
        };
        let afterNode = <SendVCodeBtn sendCode={this.sendCode.bind(this)} validateFn={this.validateFrom.bind(this, 'partical')} />;
        return (
            <PageForm {...PageProps}>
                <InputItem {...inputsData.email} />
                <InputItem {...inputsData.vCode} afterNode={afterNode} />
                <Button loading={this.state.loading} className="exc-submit-item" onClick={this.submit.bind(this)}>
                    {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
