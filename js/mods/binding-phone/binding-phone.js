import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message, Select } from 'antd';
import { Link } from 'react-router';
import Vcodebutton from '../common/authcode-btn';
import NumberUtil from '../../lib/util/number';
const Option = Select.Option;

import InputItem from '../../common-mods/form/input-item';
import PageForm from '../../common-mods/page-user/page-form';
import { createGetProp } from '../../common-mods/utils';

@inject('userInfoStore', 'captchaStore', 'loginStore')
@observer
export default class BindingPhone extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.onAreaCodeChange = this.onAreaCodeChange.bind(this);
        this.captchaChange = this.captchaChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            areacode: NumberUtil.prefixed(this.props.loginStore.selectedCountry.areacode, 4)
        });
        this.props.captchaStore.fetch();
    }

    state = {
        phone: '',
        vCode: '',
        ivCode: '',
        areacode: '',
        evCode: '',
        vcodeAbled: false,
        submitAbled: false,
    };

    setVal(e, name) {
        const val = e.target.value;
        const state = this.state;
        const data = {};
        data[name] = val;
        if(['phone', 'ivCode'].indexOf(name) !== -1) {
            data.vcodeAbled = state.phone !== '' && state.ivCode !== '';
        }
        if(['vCode', 'evCode'].indexOf(name) !== -1) {
            data.submitAbled = state.vCode !== '' && state.evCode !== '';
        }
        this.setState(data);
    }

    onAreaCodeChange(val) {
        this.setState({
            areacode: NumberUtil.prefixed(this.props.loginStore.countries[val].areacode, 4)
        });
    }

    captchaChange() {
        this.props.captchaStore.fetch();
    }

    submit() {
        if (!this.state.phone) {
            message.error(UPEX.lang.template('请填写手机号'));
            return;
        }
        if (!this.state.vCode) {
            message.error(UPEX.lang.template('请填写短信验证码'));
            return;
        }
        if (!this.state.evCode) {
            message.error(UPEX.lang.template('请填写邮箱验证码'));
            return;
        }

        this.props.userInfoStore.bindPEAction(this.state.evCode, this.state.vCode, this.state.areacode + this.state.phone, 2);
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const loginStore = this.props.loginStore;
        let options = [];
        $.map(loginStore.countries, (item, key) => {
            options[options.length] = (
                <Option value={key} key={key}>
                    {UPEX.lang.template(key)}(+{NumberUtil.prefixed(item.areacode, 4)})
                </Option>
            );
        });

        const getProp = createGetProp(this);
        const inputsData = {
            phone: {
                label: UPEX.lang.template('手机号'),
                inputProps: getProp('phone', 'none')
            },
            ivCode: {
                label: UPEX.lang.template('图片验证码'),
                className: 'v-code',
                inputProps: getProp('ivCode', 'none')
            },
            vCode: {
                label: UPEX.lang.template('短信验证码'),
                className: 'v-code',
                inputProps: getProp('vCode', 'none')
            },
            evCode: {
                label: UPEX.lang.template('邮箱验证码'),
                inputProps: getProp('evCode', 'none')
            }
        };

        const PageProps = {
            title: UPEX.lang.template('绑定手机'),
            formClass: 'modify-password-box'
        };
        return (
            <PageForm {...PageProps}>
                <div className="item-area">
                    <Select showSearch size="large" style={{ width: '100%' }} onChange={this.onAreaCodeChange} defaultValue={loginStore.selectedCountry.code}>
                        {options}
                    </Select>
                </div>
                <InputItem {...inputsData.phone} />
                <div>
                     <InputItem {...inputsData.ivCode} />
                     <div className="item v-code-button">
                        <img onClick={this.captchaChange} src={captcha} />
                    </div>
                </div>




                <div className="user-sp-sms-btn-box">
                    <Vcodebutton
                        message={UPEX.lang.template('请填写手机号')}
                        emailOrphone={this.state.phone}
                        areacode={this.state.areacode}
                        disabled={!this.state.vcodeAbled}
                        newBind={true}
                        type={2}
                        imgCode={this.state.ivCode}
                        codeid={codeid}
                    />
                    <p className="sp-tip">
                        {UPEX.lang.template('请填写收到的验证码')}
                    </p>
                    <InputItem {...inputsData.evCode} />
                    <InputItem {...inputsData.vCode} />
                </div>
                <Button loading={loading} disabled={!this.state.submitAbled} className="ace-submit-item" onClick={this.submit}>
                        {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
