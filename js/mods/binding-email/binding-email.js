import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Button, message} from 'antd';
import SendVCodeBtn from '../common/v-code-btn';
import {browserHistory} from 'react-router';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import SmsBtn from '@/mods/common/sms-btn';
import InputItem from '../../components/form/input-item';
import PageForm from '../../components/page-user/page-form';
import {createGetProp} from '../../components/utils';

import {bindPhoneOrEmailSendCode, bindPhoneOrEmailAction} from '../../api/http';

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

        this.PageProps = {
            title: UPEX.lang.template('绑定邮箱'),
            formClass: 'modify-password-box'
        };
        this.afterNode =
            <SendVCodeBtn sendCode={this.sendCode.bind(this)} validateFn={this.validateFrom.bind(this, 'partical')}/>;
    }

    setVal(e, name) {
        this.setState({
            [name]: e.target.value.trim()
        });
    }

    sendCode({validate, captchaId}) {
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
        const {state} = this;
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
                browserHistory.push('/user/emailSuccess');
            } else {
                result = false;
                this.props.userInfoStore.pickErrMsg(res, 'bindPEAction');
            }
        });
    }

    render() {
        const {state, inputsData, PageProps, afterNode} = this;
        const userInfo = this.props.userInfoStore.userInfo || {};

        if (userInfo.isValidateEmail === 0) {
            return (
                <PageForm {...PageProps}>
                    <FormView>
                        <FormItem {...inputsData.email} />
                        <FormItem {...inputsData.vCode} after={afterNode}/>
                        <FormItem>
                            <Button loading={state.loading} className="exc-submit-item"
                                    onClick={this.submit.bind(this)}>
                                {UPEX.lang.template('提交')}
                            </Button>
                        </FormItem>
                    </FormView>
                </PageForm>
            )
        } else if (userInfo.isValidateEmail === 1) {
            return (
                <PageForm {...PageProps}>
                    <div className="has-bind">{UPEX.lang.template('您已绑定过邮箱')}</div>
                </PageForm>
            )
        }
        else {
            return null
        }

    }
}
