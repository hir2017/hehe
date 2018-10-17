import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Select, Checkbox, Button, Radio, DatePicker } from 'antd';
import { isNumberOrCode } from '@/lib/util/validate';
import moment from 'moment';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import InputItem from '@/components/form/input-item';
import AceForm from '@/components/form/form';
import { createGetProp } from '@/components/utils';

const Option = Select.Option;
const RadioGroup = Radio.Group;

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
        annualsalaryMes: '',
        selectDays: []
    };

    setVal(e, name) {
        const data = {};
        data[name] = e.target.value.trim();
        this.setState(data);
    }

    isLeapYear(iYear) {
        if (iYear % 4 == 0 && iYear % 100 != 0) {
            return true;
        } else {
            if (iYear % 400 == 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    // params(3): msgField, name, val; params(2): name, val;
    selectChange(...params) {
        let data = {};
        if (params.length === 3) {
            data[0] = '';
            data[params[1]] = params[2];
        } else {
            data[params[0]] = params[1];
        }
        if (['year', 'month'].indexOf(params[0]) !== -1) {
            let tempVal = parseInt(params[1]);
            let dayNum = 0;
            // 暂时不处理年的
            if (params[0] === 'month') {
                if (tempVal === 2) {
                    dayNum = this.isLeapYear() ? 29 : 28;
                } else {
                    dayNum = [1, 3, 5, 7, 8, 10, 12].indexOf(tempVal) !== -1 ? 31 : 30;
                }
                data.selectDays = this.days(dayNum);
                data.day = '';
            }
        }
        this.setState(data);
    }

    dateChange(name, date, dateString) {
        this.setState({
            birthday: dateString
        })
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
        const { state } = this;
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

        for (let _name in mesMap) {
            if (!this.state[_name]) {
                mesData[_name + 'Mes'] = mesMap[_name];
                allPass = false;
            } else {
                mesData[_name + 'Mes'] = '';
            }
        }

        if (!state.birthday) {
            mesData.birthdayMes = UPEX.lang.template('请完善出生日期');
            allPass = false;
        } else {
            mesData.birthdayMes = '';
        }

        this.setState(mesData);

        if (allPass) {
            this.props.userInfoStore.addIdentityInfo({
                firstName: state.firstName,
                secondName: state.secondName,
                birthday: state.birthday,
                idType: state.idCardType,
                idNumber: state.idCard,
                resortType: state.resortType,
                resortTypeOther: state.resortTypeOther,
                address: state.address,
                postCode: state.postCode,
                profession: state.profession,
                annualsalary: state.annualsalary
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
            birthday: {
                label: UPEX.lang.template('出生日期'),
                error: state.birthdayMes
            },
            address: {
                label: UPEX.lang.template('住址'),
                inputProps: getProp('address', 'none'),
                tip: UPEX.lang.template('请如实填写地址，并保证和身份证反面的信息一致'),
                error: state.addressMes
            },
            idCardType: {
                label: UPEX.lang.template('证件类型'),
                tip: UPEX.lang.template('目前暂时只开放给拥有台湾身份证的用户使用'),
                error: state.idCardTypeMes
            },
            areaCode: {
                label: UPEX.lang.template('邮递区号'),
                inputProps: getProp('postCode', 'none'),
                tip: UPEX.lang.template('请如实填写地址，并保证和身份证反面的信息一致'),
                error: state.postCodeMes
            },
            idCard: {
                label: UPEX.lang.template('证件号码'),
                inputProps: {
                    className: 'input',
                    onChange: e => {
                        if (e.target.value.trim() !== '') {
                            if (!isNumberOrCode(e.target.value.trim())) {
                                return;
                            }
                        }
                        this.setVal(e, 'idCard');
                    }
                },
                tip: UPEX.lang.template('为保证款项可能有退还的情形，因此填写真实身份证号'),
                error: state.idCardMes
            },
            profession: {
                label: UPEX.lang.template('职业'),
                error: state.professionMes
            },
            annualsalary: {
                label: UPEX.lang.template('职业'),
                error: state.annualsalaryMes
            },
        };

        let birthdayVals = state.birthday ? { value: moment(state.birthday, 'YYYY-MM-DD') } : {};
        return (
            <AceForm className="auth-step-1">
                <FormView>
                    <FormItem {...inputsData.firstName} tip={UPEX.lang.template('填写之姓名必须与日后提领的银行账户名相同')}/>
                    <FormItem {...inputsData.secondName} />
                    <FormItem {...inputsData.birthday}>
                        <DatePicker size="default"  {...birthdayVals} onChange={this.dateChange.bind(this, 'birthday')} />
                    </FormItem>
                    <FormItem {...inputsData.address} />
                    <FormItem {...inputsData.areaCode} />
                    <FormItem {...inputsData.idCardType}>
                        <Select onChange={this.selectChange.bind(this, 'idCardTypeMes', 'idCardType')} placeholder={UPEX.lang.template('请选择')}>
                            <Option value="1">{UPEX.lang.template('台湾身份证')}</Option>
                        </Select>
                    </FormItem>
                    <FormItem {...inputsData.idCard} value={this.state.idCard} />
                    <FormItem {...inputsData.profession}>
                        <Select onChange={this.selectChange.bind(this, 'professionMes', 'profession')} placeholder={UPEX.lang.template('请选择职业')}>
                            <Option value={1}>{UPEX.lang.template('军公教')}</Option>
                            <Option value={2}>{UPEX.lang.template('专业技术人员')}</Option>
                            <Option value={3}>{UPEX.lang.template('行政人员')}</Option>
                            <Option value={4}>{UPEX.lang.template('金融业')}</Option>
                            <Option value={5}>{UPEX.lang.template('农、林、牧、渔、水利业生产人员')}</Option>
                            <Option value={6}>{UPEX.lang.template('生产、运输设备操作')}</Option>
                            <Option value={7}>{UPEX.lang.template('学生')}</Option>
                            <Option value={8}>{UPEX.lang.template('自由职业者')}</Option>
                        </Select>
                    </FormItem>
                    <FormItem {...inputsData.annualsalary}>
                        <Select onChange={this.selectChange.bind(this, 'annualsalaryMes', 'annualsalary')} placeholder={UPEX.lang.template('请选择年薪')}>
                            <Option value={1}>{UPEX.lang.template('0-50万')}</Option>
                            <Option value={2}>{UPEX.lang.template('50-100万')}</Option>
                            <Option value={3}>{UPEX.lang.template('150-200万')}</Option>
                            <Option value={4}>{UPEX.lang.template('200-250万')}</Option>
                            <Option value={5}>{UPEX.lang.template('250万以上')}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label={UPEX.lang.template('资金用途')}>
                        <RadioGroup onChange={this.useOfFundsChange} value={this.state.resortType}>
                            <Radio value={1}>{UPEX.lang.template('投资、买卖数位货币')}</Radio>
                            <Radio value={2}>{UPEX.lang.template('储存数位货币')}</Radio>
                            <Radio value={3}>{UPEX.lang.template('其他')}</Radio>
                        </RadioGroup>
                        {this.state.resortType === 3 ? <Input onChange={this.resortTypeOtherChange} /> : null}
                    </FormItem>
                    <FormItem>
                        <Checkbox onChange={this.checkHandel}>
                            <span
                                className="checkbox-text"
                                dangerouslySetInnerHTML={{
                                    __html: UPEX.lang.template('勾选选项表示您同意我们的用户条款和隐私条款', {
                                        href1: UPEX.lang.template('服务条款网页链接'),
                                        href2: UPEX.lang.template('隐私保护网页链接')
                                    })
                                }}
                            />
                        </Checkbox>
                    </FormItem>
                    <FormItem>
                        <Button onClick={this.next} className="submit-btn" disabled={!state.check}>{UPEX.lang.template('下一步')}</Button>
                    </FormItem>
                </FormView>
            </AceForm>
        );
    }
}
