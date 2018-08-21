import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message, Select } from 'antd';
import NumberUtil from '../../lib/util/number';
import { isPhone } from '../../lib/util/validate';
const Option = Select.Option;
import { browserHistory } from 'react-router';
import SendVCodeBtn from '../common/v-code-btn';
import InputItem from '../../components/form/input-item';
import PageForm from '../../components/page-user/page-form';
import { createGetProp } from '../../components/utils';
import { bindPhoneOrEmailSendCode, bindPhoneOrEmailAction } from '../../api/http';

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
            areacode: NumberUtil.prefixed(this.props.loginStore.selectedCountry.areacode, 4)
        });
    }

    setVal(e, name) {
        this.setState({
            [name]: e.target.value.trim()
        });
    }

    onAreaCodeChange(val) {
        this.setState({
            areacode: NumberUtil.prefixed(this.props.loginStore.countries[val].areacode, 4)
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
        const loginStore = this.props.loginStore;
        let options = [];

        $.map(loginStore.countries, (item, key) => {
            options[options.length] = (
                <Option value={key} key={key}>
                    {UPEX.lang.template(key)}(+{NumberUtil.prefixed(item.areacode, 4)})
                </Option>
            );
        });

        const { inputsData, PageProps } = this;
        let afterNode = <SendVCodeBtn sendCode={this.sendCode.bind(this)} validateFn={this.validateFrom.bind(this, 'partical')} />;
        return (
            <PageForm {...PageProps}>
                <div className="item-area">
                    <Select showSearch size="large" style={{ width: '100%' }} onChange={this.onAreaCodeChange} defaultValue={loginStore.selectedCountry.code}>
                        {options}
                    </Select>
                </div>
                <InputItem {...inputsData.phone} value={this.state.phone} />
                <InputItem {...inputsData.vCode} afterNode={afterNode} />
                <Button loading={this.state.loading} className="exchange-submit-item" onClick={this.submit.bind(this)}>
                    {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
