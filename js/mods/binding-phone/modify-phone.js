import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message, Select } from 'antd';
import NumberUtil from '../../lib/util/number';
import { browserHistory } from 'react-router';
import { isPhone } from '../../lib/util/validate';
const Option = Select.Option;
import SendVCodeBtn from '../common/v-code-btn';
import InputItem from '../../components/form/input-item';
import PageForm from '../../components/page-user/page-form';
import { createGetProp } from '../../components/utils';
import { modifyPhoneSendMsg, modifyPhoneAction } from '../../api/http';

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
                label: UPEX.lang.template('谷歌验证码'),
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
        const loginStore = this.props.loginStore;
        const { userInfo = {} } = this.props.userInfoStore;
        let options = [];
        $.map(loginStore.countries, (item, key) => {
            options[options.length] = (
                <Option value={key} key={key}>
                    {UPEX.lang.template(key)}(+{NumberUtil.prefixed(item.areacode, 4)})
                </Option>
            );
        });

        const { inputsData, PageProps } = this;
        let nvCodeBtn = <SendVCodeBtn sendCode={this.sendCode.bind(this, 'new')} validateFn={this.validateFrom.bind(this, 'partical')} />;
        let vCodeBtn = <SendVCodeBtn sendCode={this.sendCode.bind(this, 'old')} noSlide={true} />;
        return (
            <PageForm {...PageProps}>
                <div className="item-area">
                    <Select showSearch size="large" style={{ width: '100%' }} onChange={this.onAreaCodeChange} defaultValue={loginStore.selectedCountry.code}>
                        {options}
                    </Select>
                </div>
                <InputItem {...inputsData.phone} value={this.state.phone} />
                <InputItem {...inputsData.nvCode} afterNode={nvCodeBtn} />
                {userInfo.isGoogleAuth ? <InputItem {...inputsData.gaCode} /> : <InputItem {...inputsData.vCode} afterNode={vCodeBtn} />}
                {/* <InputItem {...inputsData.vCode} afterNode={vCodeBtn} /> */}
                <Button loading={this.state.loading} className="exchange-submit-item" onClick={this.submit}>
                    {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
