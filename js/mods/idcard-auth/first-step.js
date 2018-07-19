import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Input, Select, Checkbox, Button, Radio } from 'antd';
import dayjs from 'dayjs';

const Option = Select.Option;
const RadioGroup = Radio.Group;

import InputItem from '../../components/form/input-item';
import AceForm from '../../components/form/form';
import { createGetProp } from '../../components/utils';

@inject('userInfoStore')
@observer
export default class FirstStep extends Component {
    constructor() {
        super();
        this.next = this.next.bind(this);
        this.checkHandel = this.checkHandel.bind(this);
        this.useOfFundsChange = this.useOfFundsChange.bind(this);
        this.resortTypeOtherChange = this.resortTypeOtherChange.bind(this);
    }

    state = {
        firstName: '',
        firstNameMes: '',
        secondName: '',
        secondNameMes: '',
        year: '',
        month: '',
        day: '',
        birthday: '',
        birthdayMes: '',
        idCardType: '',
        idCardTypeMes: '',
        idCard: '',
        idCardMes: '',
        check: false,
        resortType: 1,
        resortTypeOther: '',
        address: '',
        addressMes: '',
        postCode: '',
        postCodeMes: '',
        profession: '',
        professionMes: '',
        annualsalary: '',
        annualsalaryMes: ''
    };

    setVal(e, name) {
        const data = {};
        data[name] = e.target.value;
        this.setState(data);
    }
    // params(3): msgField, name, val; params(2): name, val;
    selectChange(...params) {
        let data = {};
        if(params.length === 3) {
            data[0] = '';
            data[params[1]] = params[2]
        } else {
            data[params[0]] = params[1]
        }
        this.setState(data);
    }

    years() {
        let count = 100;
        const yearA = [];
        while (count) {
            const year = dayjs()
                .subtract(100 - count, 'year')
                .format('YYYY');
            yearA.push(year);
            count--;
        }
        return yearA;
    }

    months() {
        let count = 12;
        const monthA = [];
        while (count) {
            let month = count--;
            if (month < 10) month = `0${month}`;
            monthA.push(month);
        }
        return monthA;
    }

    days() {
        let count = 30;
        const monthA = [];
        while (count) {
            let month = count--;
            if (month < 10) month = `0${month}`;
            monthA.push(month);
        }
        return monthA;
    }

    checkHandel(e) {
        this.setState({
            check: e.target.checked
        });
    }

    useOfFundsChange(e) {
        this.setState({
            resortType: e.target.value
        });
    }

    resortTypeOtherChange(e) {
        this.setState({
            resortTypeOther: e.target.value
        });
    }

    next() {
        let allPass = true;
        let mesData = {};
        let mesMap = {
            firstName: UPEX.lang.template('请填写真实姓氏'),
            secondName: UPEX.lang.template('请填写真实名字'),
            address: UPEX.lang.template('请完善地址信息'),
            postCode: UPEX.lang.template('请填写区域号码'),
            idCardType: UPEX.lang.template('请选择证件类型'),
            idCard: UPEX.lang.template('请填写证件号码'),
            profession: UPEX.lang.template('请选择职业'),
            annualsalary: UPEX.lang.template('请选择年薪')
        };

        for(let _name in mesMap) {
            if(!this.state[_name]) {
                mesData[_name + 'Mes'] = mesMap[_name];
                allPass = false;
            } else {
                mesData[_name + 'Mes'] = '';
            }
        }

        if (!this.state.year || !this.state.month || !this.state.day) {
            mesData.birthdayMes = UPEX.lang.template('请完善出生日期');
            allPass = false;
        } else {
            mesData.birthdayMes = '';
        }

        this.setState(mesData);

        if (allPass) {
            this.props.userInfoStore.addIdentityInfo({
                firstName: this.state.firstName,
                secondName: this.state.secondName,
                birthday: this.state.year + '-' + this.state.month + '-' + this.state.day,
                idType: this.state.idCardType,
                idNumber: this.state.idCard,
                resortType: this.state.resortType,
                resortTypeOther: this.state.resortTypeOther,
                address: this.state.address,
                postCode: this.state.postCode,
                profession: this.state.profession,
                annualsalary: this.state.annualsalary
            });
            this.props.changeStep(2);
        }
    }

    render() {
        const getProp = createGetProp(this);
        const { state } = this;
        const inputsData = {
            firstName: {
                label: UPEX.lang.template('真实姓氏'),
                inputProps: getProp('firstName', 'none'),
                error: state.firstNameMes
            },
            secondName: {
                label: UPEX.lang.template('真实名字'),
                className: 'last',
                inputProps: getProp('secondName', 'none'),
                error: state.secondNameMes
            },
            address: {
                label: UPEX.lang.template('住址'),
                inputProps: getProp('address', 'none'),
                tip: UPEX.lang.template('请如实填写地址，并保证和身份证反面的信息一致'),
                error: state.addressMes
            },
            areaCode: {
                label: UPEX.lang.template('邮递区号'),
                inputProps: getProp('postCode', 'none'),
                tip: UPEX.lang.template('请如实填写地址，并保证和身份证反面的信息一致'),
                error: state.postCodeMes
            },
            idCard: {
                label: UPEX.lang.template('证件号码'),
                inputProps: getProp('idCard', 'none'),
                tip: UPEX.lang.template('为保证款项可能有退还的情形，因此填写真实身份证号'),
                error: state.idCardMes
            }
        };
        const submitProp = this.state.check ? {onClick: this.next, className: 'ace-submit-item'} : {className:"ace-submit-item disabled", disabled: true}
        return (
            <AceForm className="auth-step-1">
                <div className="muti-filed clearfix">
                    <InputItem {...inputsData.firstName} />
                    <InputItem {...inputsData.secondName} />
                    <div className="message">{UPEX.lang.template('填写之姓名必须与日后提领的银行账户名相同')}</div>
                </div>
                <div className="ace-input-item select time-label">
                    <span className="label">{UPEX.lang.template('出生日期')}</span>
                    <div className="input">
                        <Select placeholder={UPEX.lang.template('年')} onChange={this.selectChange.bind(this, 'year')} >
                            {this.years().map((item, index) => {
                                return (
                                    <Option key={index} value={item}>
                                        {item}
                                        {UPEX.lang.template('年')}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Select placeholder={UPEX.lang.template('月')} onChange={this.selectChange.bind(this, 'month')} >
                            {this.months().map((item, index) => {
                                return (
                                    <Option key={index} value={item}>
                                        {item}
                                        {UPEX.lang.template('月')}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Select className="last" placeholder={UPEX.lang.template('日')} onChange={this.selectChange.bind(this, 'birthdayMes', 'day')} >
                            {this.days().map((item, index) => {
                                return (
                                    <Option key={index} value={item}>
                                        {item}
                                        {UPEX.lang.template('日')}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <span className="error-message">{this.state.birthdayMes}</span>
                </div>
                <InputItem {...inputsData.address} />
                <InputItem {...inputsData.areaCode} />
                <div className="ace-input-item select">
                    <span className="label">{UPEX.lang.template('证件类型')}</span>
                    <div className="input">
                        <Select onChange={this.selectChange.bind(this, 'idCardTypeMes', 'idCardType')} placeholder={UPEX.lang.template('请选择')}>
                            <Option value="1">{UPEX.lang.template('台湾身份证')}</Option>
                        </Select>
                    </div>
                    <span className="message">{UPEX.lang.template('目前暂时只开放给拥有台湾身份证的用户使用')}</span>
                    <span className="error-message">{this.state.idCardTypeMes}</span>
                </div>
                <InputItem {...inputsData.idCard} />
                <div className="muti-select clearfix">
                    <div className="ace-input-item select">
                        <span className="label">{UPEX.lang.template('职业')}</span>
                        <div className="input">
                            <Select onChange={this.selectChange.bind(this, 'professionMes', 'profession')} placeholder={UPEX.lang.template('请选择职业')}>
                                <Option value={1}>{UPEX.lang.template('军公教')}</Option>
                                <Option value={2}>{UPEX.lang.template('专业技术人员')}</Option>
                                <Option value={3}>{UPEX.lang.template('行政人员')}</Option>
                                <Option value={4}>{UPEX.lang.template('金融業')}</Option>
                                <Option value={5}>{UPEX.lang.template('农、林、牧、渔、水利业生产人员')}</Option>
                                <Option value={6}>{UPEX.lang.template('生产、运输设备操作')}</Option>
                                <Option value={7}>{UPEX.lang.template('学生')}</Option>
                                <Option value={8}>{UPEX.lang.template('自由职业者')}</Option>
                            </Select>
                        </div>
                        <span className="error-message">{this.state.professionMes}</span>

                    </div>
                    <div className="ace-input-item select last">
                        <span className="label">{UPEX.lang.template('年薪')}</span>
                        <div className="input">
                            <Select onChange={this.selectChange.bind(this, 'annualsalaryMes', 'annualsalary')} placeholder={UPEX.lang.template('请选择年薪')}>
                                <Option value={1}>{UPEX.lang.template('0-50万')}</Option>
                                <Option value={2}>{UPEX.lang.template('50-100万')}</Option>
                                <Option value={3}>{UPEX.lang.template('150-200万')}</Option>
                                <Option value={4}>{UPEX.lang.template('200-250万')}</Option>
                                <Option value={5}>{UPEX.lang.template('250万以上')}</Option>
                            </Select>
                        </div>
                        <span className="error-message">{this.state.annualsalaryMes}</span>
                    </div>
                    <div className="message">{UPEX.lang.template('目前暂时只开放给拥有台湾身份证的用户使用')}</div>
                </div>

                <div className="ace-input-item select radio">
                    <span className="label">{UPEX.lang.template('资金用途')}</span>
                    <div className="input">
                        <RadioGroup onChange={this.useOfFundsChange} value={this.state.resortType}>
                            <Radio value={1}>{UPEX.lang.template('投资、买卖数位货币')}</Radio>
                            <Radio value={2}>{UPEX.lang.template('储存数位货币')}</Radio>
                            <Radio value={3}>{UPEX.lang.template('其他')}</Radio>
                        </RadioGroup>
                        {this.state.resortType === 3 ? <Input onChange={this.resortTypeOtherChange} /> : null}
                    </div>
                </div>
                <div className="item align-left">
                    <Checkbox onChange={this.checkHandel}>
                        <span className="checkbox-text">{UPEX.lang.template('勾选选项表示您同意我们的用户条款和隐私条款')}</span>
                    </Checkbox>
                </div>
                <div className="submit">
                     <Button {...submitProp}>
                        {UPEX.lang.template('下一步')}
                    </Button>
                </div>

            </AceForm>
        );
    }
}
