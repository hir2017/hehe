/**
 * @fileoverview OTC 提交form
 */
import React, { Component } from 'react';
import FormItem from '@/mods/common/form/item';
import AreaSelect from '@/mods/common/area-select';
import { Button, Select, message, Row, Col } from 'antd';
import YidunCaptcha from '@/mods/yidun-captcha';
import { observer, inject } from 'mobx-react';
import Api from '@/api';
import VerifyRules from '@/lib/util/verify';

@inject('loginStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        const store = props.loginStore;
        this.state = {
            secondName: '',
            firstName: '',
            email: '',
            code: store.selectedCountry.code,
            areaCode: store.selectedCountry.areacode,
            phone: '',
            msg: '',
            success: false
        };
        this.yidunCaptcha = new YidunCaptcha({
            type: 'register-login',
            lang: UPEX.lang.language == 'en-US' ? 'en' : UPEX.lang.language
        });
    }

    componentDidMount() {
        this.yidunCaptcha.init(this.handleSubmit);
    }

    handleSubmit = (validate, captchaId) => {
        const { state } = this;
        Api.otc
            .submit({
                NECaptchaValidate: validate,
                captchaId: captchaId,
                email: state.email,
                hasRegister: state.hasRegister,
                mobile: state.areaCode + state.phone,
                firstName: state.firstName,
                secondName: state.secondName,
                note: state.msg
            })
            .then(res => {
                if (res.status == 200) {
                    this.setState({
                        success: true
                    });
                } else {
                    message.error(res.message);
                }
            })
            .catch(err => {
                console.error('Api.otc.submit', err);
            });
    };

    validate() {
        const { state } = this;
        let temp = null;
        if (state.secondName.trim() == '') {
            message.warning(UPEX.lang.template('请填写名字'));
            return false;
        }
        if (state.firstName.trim() == '') {
            message.warning(UPEX.lang.template('请填写家族姓氏'));
            return false;
        }
        temp = VerifyRules.email(state.email);
        if (!temp[0] || state.email == '') {
            message.warning(UPEX.lang.template('请填写正确的邮箱地址'));
            return false;
        }
        temp = VerifyRules.mobile(state.phone);
        if (!temp[0] || state.phone == '') {
            message.warning(UPEX.lang.template('请填写正确的手机号'));
            return false;
        }

        return true;
    }

    onSubmit = () => {
        if (!this.validate()) {
            return;
        }
        this.yidunCaptcha.show();
    };

    onInput(name, e) {
        let str = e.target.value;
        if (str !== '') {
            // TODO: 校验字长 22:[secondName, firstName]
            if (['secondName', 'firstName'].indexOf(name) !== -1 && VerifyRules.stringLength(str, 22)) {
                return;
            }
            if (['msg'].indexOf(name) !== -1 && VerifyRules.stringLength(str, 250)) {
                return;
            }
        }
        this.setState({
            [name]: str
        });
    }

    onSelect(name, val, map) {
        let state = {
            [name]: val
        };
        if (name == 'code') {
            state.areaCode = map[val].areacode;
            state.code = val;
        }
        this.setState(state);
    }

    render() {
        const { state } = this;
        if (state.success) {
            return <div className="success">{UPEX.lang.template('感谢您对我们大宗OTC交易服务的兴趣与支持，我们将会尽快与您联系。')}</div>;
        }
        return (
            <div className="form">
                <header>
                    <h3> {UPEX.lang.template('即刻开启Inifnitex OTC交易')}</h3>
                    <p>{UPEX.lang.template('请填写以下表格并提交，我们OTC交易团队的成员将尽快联系您。')}</p>
                </header>
                <section>
                    <Row gutter={30}>
                        <Col span={12}>
                            <FormItem label={UPEX.lang.template('名字')} value={state.secondName} onChange={this.onInput.bind(this, 'secondName')} />
                        </Col>
                        <Col span={12}>
                            <FormItem label={UPEX.lang.template('家族姓氏')} value={state.firstName} onChange={this.onInput.bind(this, 'firstName')} />
                        </Col>
                    </Row>

                    <FormItem label={UPEX.lang.template('邮箱')} value={state.email} onChange={this.onInput.bind(this, 'email')} />
                    <Row gutter={30}>
                        <Col span={12}>
                            <FormItem label={UPEX.lang.template('区域号码')}>
                                <AreaSelect dropdownClassName="otc-form" value={state.code} onChange={this.onSelect.bind(this, 'code')} />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label={UPEX.lang.template('手机号')} value={state.phone} onChange={this.onInput.bind(this, 'phone')} />
                        </Col>
                    </Row>
                    <FormItem label={UPEX.lang.template('OTC-您当前是否是Infinitex 用户？')}>
                        <Select dropdownClassName="otc-form" onChange={this.onSelect.bind(this, 'hasRegister')}>
                            <Select.Option value="1">{UPEX.lang.template('是')}</Select.Option>
                            <Select.Option value="0">{UPEX.lang.template('否')}</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem className="msg" label={UPEX.lang.template('消息')} >
                        <textarea  value={state.msg} onChange={this.onInput.bind(this, 'msg')} placeholder={UPEX.lang.template('OTC-例如 “我想用100,000 AUD 购买BTC” 或 “我想用美元在大约5,100价格购买200个BTC”')}></textarea>
                    </FormItem>
                    <Button onClick={this.onSubmit}>{UPEX.lang.template('提交')}</Button>

                </section>
            </div>
        );
    }
}

export default View;
