import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Button, message, Alert } from 'antd';
import NumberUtil from '@/lib/util/number';
import { isPhone } from '@/lib/util/validate';
import SendVCodeBtn from '@/mods/common/v-code-btn';
import PageForm from '@/components/page-user/page-form';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import { createGetProp } from '@/components/utils';
import { modifyPhoneSendMsg, modifyPhoneAction } from '@/api/http';
import AreaSelect from '@/mods/common/area-select';

@inject('userInfoStore', 'captchaStore', 'loginStore')
@observer
export default class BindingPhone extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        const getProp = createGetProp(this);
        this.state = {
            phone: '',
            vCode: '',
            areacode: '',
            nvCode: '',
            gaCode: '',
            loading: false
        };

        this.inputsData = {
            phone: {
                label: UPEX.lang.template('新手机号'),
                inputProps: {
                    className: 'input',
                    onChange: e => {
                        if (e.target.value !== '') {
                            if (!isPhone(e.target.value)) {
                                return;
                            }
                        }
                        this.setVal(e, 'phone');
                    }
                }
            },
            gaCode: {
                label: UPEX.lang.template('Google验证码'),
                inputProps: getProp('gaCode', 'none')
            },
            vCode: {
                label: UPEX.lang.template('原手机短信确认码'),
                className: 'sms-code',
                inputProps: getProp('vCode', 'none')
            },
            nvCode: {
                label: UPEX.lang.template('新手机短信确认码'),
                className: 'sms-code',
                inputProps: getProp('nvCode', 'none')
            }
        };

        this.PageProps = {
            title: UPEX.lang.template('修改绑定手机'),
            formClass: 'modify-password-box modify-phone-box',
            tipComponent: <Alert className="ace-form-tips" type="warning" showIcon message={UPEX.lang.template('为了您的资金安全，修改手机绑定后，24小时内不可以提现提币')} />
        };
        this.nvCodeBtn = <SendVCodeBtn sendCode={this.sendCode.bind(this, 'new')} validateFn={this.validateFrom.bind(this, 'partical')} />;
        this.vCodeBtn = <SendVCodeBtn sendCode={this.sendCode.bind(this, 'old')} noSlide={true} />;
    }

    componentWillMount() {
        this.setState({
            areacode: this.props.loginStore.selectedCountry.areacode
        });
    }

    setVal(e, name) {
        let val = e.target.value.trim();
        if (name == 'vCode' || name == 'gaCode' || name == 'nvCode') {
            val = (val + '').slice(0,6);
        }

        this.setState({
            [name]: val
        });
    }

    onAreaCodeChange = (val, CountryMap) => {
        this.setState({
            areacode: CountryMap[val].areacode
        });
    }

    sendCode(type, { validate, captchaId }) {
        let params =
            type === 'new'
                ? {
                      NECaptchaValidate: validate,
                      phone: this.state.areacode + this.state.phone,
                      captchaId,
                      type: 1
                  }
                : {
                      type: 2
                  };
        return modifyPhoneSendMsg(params)
            .then(res => {
                if (res.status !== 200) {
                    if([0, 9999, 9997].indexOf(res.status) === -1) {
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
        const { userInfo = {} } = this.props.userInfoStore;
        if (!this.state.phone) {
            message.error(UPEX.lang.template('请填写新手机号'));
            return;
        }
        if (type === 'all') {
            if (!this.state.nvCode) {
                message.error(UPEX.lang.template('请填写新短信验证码'));
                return;
            }
            if (userInfo.isGoogleAuth) {
                if (!this.state.gaCode) {
                    message.error(UPEX.lang.template('请填写Google验证码'));
                    return;
                }
            } else {
                if (!this.state.vCode) {
                    message.error(UPEX.lang.template('请填写短信验证码'));
                    return;
                }
            }
        }
        return true;
    }

    submit() {
        const { state } = this;
        const { userInfo = {} } = this.props.userInfoStore;
        if (!this.validateFrom()) {
            return;
        }
        this.setState({
            loading: true
        });
        modifyPhoneAction({
            newCode: state.nvCode,
            newPhone: state.areacode + state.phone,
            oldCode: state[userInfo.isGoogleAuth ? 'gaCode' : 'vCode'],
            type: userInfo.isGoogleAuth ? 1 : 2
        }).then(res => {
            this.setState({
                loading: false
            });
            if (res.status === 200) {
                message.success(UPEX.lang.template('绑定成功'));
                browserHistory.push('/user/phoneSuccess');
            } else {
                result = false;
                this.props.userInfoStore.pickErrMsg(res, 'phone bindPhoneOrEmailAction');
            }
        });
    }

    render() {
        const { inputsData, PageProps, nvCodeBtn, vCodeBtn, state, props } = this;
        const loginStore = props.loginStore;
        const { userInfo = {} } = props.userInfoStore;

        let $vCode = null;
        if(userInfo.isGoogleAuth) {
            $vCode = <FormItem {...inputsData.gaCode} value={state.gaCode} />;
        } else {
            $vCode = <FormItem {...inputsData.vCode} value={state.vCode} after={vCodeBtn} />;
        }
        return (
            <PageForm {...PageProps}>
                <FormView>

                    <FormItem className="item-area">
                        <AreaSelect onChange={this.onAreaCodeChange} defaultValue={loginStore.selectedCountry.code} />
                    </FormItem>
                    <FormItem {...inputsData.phone} value={state.phone} />
                    <FormItem {...inputsData.nvCode} value={state.nvCode} after={nvCodeBtn} />
                    {$vCode}
                    <FormItem>
                        <Button loading={state.loading} className="submit-btn" onClick={this.submit}>
                            {UPEX.lang.template('提交')}
                        </Button>
                    </FormItem>
                </FormView>
            </PageForm>
        );
    }
}
