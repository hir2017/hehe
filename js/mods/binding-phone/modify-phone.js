import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message, Select } from 'antd';
import { Link, browserHistory } from 'react-router';
import Vcodebutton from '../common/authcode-btn';
const Option = Select.Option;

import InputItem from '../../common-mods/form/input-item';
import PageForm from '../../common-mods/page-user/page-form';
import { createGetProp } from '../../common-mods/utils';

@inject('userInfoStore', 'captchaStore', 'loginStore')
@observer
export default class ModifyPhone extends Component {
    constructor() {
        super();
        this.onAreaCodeChange = this.onAreaCodeChange.bind(this);
        this.submit = this.submit.bind(this);
        this.captchaChange = this.captchaChange.bind(this);
    }

    componentWillMount() {
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        gaBindSuccess || this.props.userInfoStore.isGoogleAuth();
        this.props.captchaStore.fetch();
        this.setState({
            areacode: this.props.loginStore.selectedCountry.areacode
        });
    }

    state = {
        phone: '',
        vCode: '',
        ivCode: '',
        areacode: '',
        nvCode: '',
        gaCode: '',
        vcodeAbled: false,
        submitAbled: false,
    };

    onAreaCodeChange(val) {
        this.setState({
            areacode: this.props.loginStore.countries[val].areacode
        });
    }


    setVal(e, name) {
        const val = e.target.value;
        const state = this.state;
        const data = {};
        data[name] = val;
        if(['phone', 'ivCode'].indexOf(name) !== -1) {
            data.vcodeAbled = state.phone !== '' && state.ivCode !== '';
        }
        const tempArr = [this.props.userInfoStore.gaBindSuccess ? 'gaCode' : 'vCode', 'nvCode'];
        if(tempArr.indexOf(name) !== -1) {
            data.submitAbled = state[0] !== '' && state[1] !== '';
        }
        this.setState(data);
    }

    captchaChange() {
        this.props.captchaStore.fetch();
    }

    checkPhone() {
        const {phone} = this.state;
        if(phone.length === 0) {
            message.error(UPEX.lang.template('请填写手机号') );
            return false;
        }
        if(!UPEX.config.phoneReg.test(phone)) {
            message.error(UPEX.lang.template('请填写正确的手机号'));
            return false;
        }
        this.setState({
            vcodeAbled: true
        });
        return true;
    }

    submit() {
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        if (!this.state.phone) {
            message.error(UPEX.lang.template('请填写新手机号'));
            return;
        }
        if (!this.state.nvCode) {
            message.error(UPEX.lang.template('请填写新短信确认码'));
            return;
        }
        if (!this.state.vCode && !gaBindSuccess) {
            message.error(UPEX.lang.template('请填写短信确认码'));
            return;
        }

        if (!this.state.gaCode && gaBindSuccess) {
            message.error(UPEX.lang.template('请填写谷歌确认码'));
            return;
        }

        const type = gaBindSuccess ? 1 : 2;
        const code = gaBindSuccess ? this.state.gaCode : this.state.vCode;
        this.props.userInfoStore.newModifyPhone(this.state.nvCode, this.state.areacode + this.state.phone, code, type).then(data => {
            if(data) {
                browserHistory.push('/user/binding-phone');
            }
        })
    }

    render() {
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        const loading = this.props.userInfoStore.submit_loading;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const loginStore = this.props.loginStore;
        let options = [];
        $.map(loginStore.countries, (item, key) => {
            options[options.length] = (
                <Option value={key} key={key}>
                    {UPEX.lang.template(key)}(+{item.areacode})
                </Option>
            );
        });
        const getProp = createGetProp(this);
        const inputsData = {
            phone: {
                label: UPEX.lang.template('新手机号'),
                inputProps: getProp('phone', 'none')
            },
            ivCode: {
                label: UPEX.lang.template('图片验证码'),
                className: 'v-code',
                inputProps: getProp('ivCode', 'none')
            },
            gaCode: {
                label: UPEX.lang.template('谷歌验证码'),
                inputProps: getProp('gaCode', 'none')
            },
            vCode: {
                label: UPEX.lang.template('原手机短信确认码'),
                inputProps: getProp('vCode', 'none')
            },
            nvCode: {
                label: UPEX.lang.template('新手机短信确认码'),
                className: 'v-code',
                inputProps: getProp('nvCode', 'none')
            }
        };

        const PageProps = {
            title: UPEX.lang.template('修改绑定手机'),
            formClass: 'modify-password-box'
        };

        return (
            <PageForm {...PageProps}>
                <div className="item-area">
                    <Select size="large" style={{ width: '100%' }} onChange={this.onAreaCodeChange} defaultValue={loginStore.selectedCountry.code}>
                        {options}
                    </Select>
                </div>
                <InputItem {...inputsData.phone} />
                <div>
                    {/* 图片验证码可以优化 */}
                    <InputItem {...inputsData.ivCode} />
                    <div className="item v-code-button">
                        <img onClick={this.captchaChange} src={captcha} />
                    </div>
                </div>
                <div className="user-sp-sms-btn-box">
                    <Vcodebutton
                        message={UPEX.lang.template('请填写新手机号')}
                        phone={this.state.phone}
                        areacode={this.state.areacode}
                        modifyBind={true}
                        disabled={!this.state.vcodeAbled}
                        beforeClick={this.checkPhone.bind(this)}
                        type={gaBindSuccess ? 1 : 2}
                        imgCode={this.state.ivCode}
                        codeid={codeid}
                    />
                    <p className="sp-tip">
                        {UPEX.lang.template('请填写收到的验证码')}
                    </p>
                    {gaBindSuccess ? <InputItem {...inputsData.gaCode} /> : <InputItem {...inputsData.vCode} />}
                    <InputItem {...inputsData.nvCode} />
                </div>
                <Button loading={loading} disabled={!this.state.submitAbled} className="ace-submit-item" onClick={this.submit}>
                    {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
