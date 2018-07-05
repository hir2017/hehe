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
        evCode: ''
    };

    setVal(e, name) {
        const data = {};
        data[name] = e.target.value;
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
                label: UPEX.lang.template('短信确认码'),
                inputProps: getProp('vCode', 'none')
            },
            evCode: {
                label: UPEX.lang.template('邮箱确认码'),
                className: 'v-code',
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
                <InputItem {...inputsData.vCode} />
                <div className="input-vcode-wrapper">
                    <InputItem {...inputsData.evCode} />
                    <div className="item v-code-button">
                        <Vcodebutton
                            message={UPEX.lang.template('请填写手机号')}
                            emailOrphone={this.state.phone}
                            areacode={this.state.areacode}
                            newBind={true}
                            type={2}
                            imgCode={this.state.ivCode}
                            codeid={codeid}
                        />
                    </div>
                </div>
                <div className="massage" style={{ display: 'none' }}>
                    {UPEX.lang.template('不方便接短信？可使用')}&nbsp;&nbsp;&nbsp;&nbsp;<Link>Google{UPEX.lang.template('驗證碼')}</Link>
                </div>
                <Button loading={loading} className="ace-submit-item" onClick={this.submit}>
                        {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
