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
        gaCode: ''
    };

    onAreaCodeChange(val) {
        this.setState({
            areacode: this.props.loginStore.countries[val].areacode
        });
    }

    setVal(e, name) {
        const data = {};
        data[name] = e.target.value;
        this.setState(data);
    }

    captchaChange() {
        this.props.captchaStore.fetch();
    }

    checkPhone() {
        const {phone} = this.state;
        if(phone.length === 0) {
            message.error(UPEX.lang.template('手机号不能为空') );
            return false;
        }
        // if(!UPEX.config.phoneReg.test(phone)) {
        //     message.error(UPEX.lang.template('手机号格式错误'));
        //     return false;
        // }
        return true;
    }

    submit() {
        const codeid = this.props.captchaStore.codeid;
        const captcha = this.props.captchaStore.captcha;
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        if (!this.state.phone) {
            message.error(UPEX.lang.template('新手机号不能为空'));
            return;
        }
        if (!this.state.nvCode) {
            message.error(UPEX.lang.template('新短信确认码不能为空'));
            return;
        }
        if (!this.state.vCode && !gaBindSuccess) {
            message.error(UPEX.lang.template('短信确认码不能为空'));
            return;
        }

        if (!this.state.gaCode && gaBindSuccess) {
            message.error(UPEX.lang.template('谷歌确认码不能为空'));
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
                {/* GA也可以优化 */}
                {gaBindSuccess ? <InputItem {...inputsData.gaCode} /> : <InputItem {...inputsData.vCode} />}
                <div className="input-vcode-wrapper">
                    <InputItem {...inputsData.nvCode} />
                    <div className="item v-code-button">
                        <Vcodebutton
                            message="新手机号不能为空"
                            phone={this.state.phone}
                            areacode={this.state.areacode}
                            modifyBind={true}
                            beforeClick={this.checkPhone.bind(this)}
                            type={gaBindSuccess ? 1 : 2}
                            imgCode={this.state.ivCode}
                            codeid={codeid}
                        />
                    </div>
                </div>
                <div className="massage" style={{ display: 'none' }}>
                    {UPEX.lang.template('不方便接短信？可使用')}&nbsp;&nbsp;&nbsp;&nbsp;<Link>Google{UPEX.lang.template('驗證碼')}</Link>
                </div>
                <Button loading={loading}  className="ace-submit-item" onClick={this.submit}>
                    {UPEX.lang.template('提交')}
                </Button>
            </PageForm>
        );
    }
}
