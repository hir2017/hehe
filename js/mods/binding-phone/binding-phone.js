import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import NumberUtil from '@/lib/util/number';
import { isPhone } from '@/lib/util/validate';
import { browserHistory } from 'react-router';
import SendVCodeBtn from '@/mods/common/v-code-btn';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import PageForm from '@/components/page-user/page-form';
import { createGetProp } from '@/components/utils';
import { bindPhoneOrEmailSendCode, bindPhoneOrEmailAction } from '@/api/http';
import AreaSelect from '@/mods/common/area-select';

@inject('userInfoStore', 'captchaStore', 'loginStore')
@observer
export default class BindingPhone extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.onAreaCodeChange = this.onAreaCodeChange.bind(this);
        const getProp = createGetProp(this);
        this.state = {
            phone: '',
            vCode: '',
            areacode: '',
            loading: false
        };

        this.inputsData = {
            phone: {
                label: UPEX.lang.template('手机号'),
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
            vCode: {
                label: UPEX.lang.template('短信验证码'),
                className: 'sms-code',
                inputProps: getProp('vCode', 'none')
            }
        };

        this.PageProps = {
            title: UPEX.lang.template('绑定手机'),
            formClass: 'modify-password-box'
        };
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

    onAreaCodeChange(val, CountryMap) {
        this.setState({
            areacode: CountryMap[val].areacode
        });
    }

    sendCode({ validate, captchaId }) {
        return bindPhoneOrEmailSendCode({
            NECaptchaValidate: validate,
            captchaId,
            phoneOrEmail: this.state.areacode + this.state.phone,
            type: 2
        })
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
        const { state } = this;
        if (!state.phone) {
            message.error(UPEX.lang.template('请填写手机号'));
            return;
        }
        if (type === 'all') {
            if (!state.vCode) {
                message.error(UPEX.lang.template('请填写短信验证码'));
                return;
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
            phoneOrEmail: state.areacode + state.phone,
            type: 2,
        }).then(res => {
            this.setState({
                loading: false
            });
            if (res.status === 200) {
                message.success(UPEX.lang.template('绑定成功'));
                browserHistory.push('/user/phoneSuccess');
            } else {
                this.props.userInfoStore.pickErrMsg(res, 'phone bindPhoneOrEmailAction');
            }
        });
    }

    render() {
        const {state} = this;
        const loginStore = this.props.loginStore;
        let options = [];

        const { inputsData, PageProps } = this;
        let afterNode = <SendVCodeBtn sendCode={this.sendCode.bind(this)} validateFn={this.validateFrom.bind(this, 'partical')} />;
        return (
            <PageForm {...PageProps}>
                <FormView>
                    <FormItem className="item-area">
                        <AreaSelect onChange={this.onAreaCodeChange} defaultValue={loginStore.selectedCountry.code} />
                    </FormItem>
                    <FormItem {...inputsData.phone} value={state.phone} />
                    <FormItem {...inputsData.vCode} value={state.vCode} after={afterNode} />
                    <FormItem>
                        <Button loading={state.loading} className="submit-btn" onClick={this.submit.bind(this)}>
                            {UPEX.lang.template('提交')}
                        </Button>
                    </FormItem>

                </FormView>
            </PageForm>
        );
    }
}
