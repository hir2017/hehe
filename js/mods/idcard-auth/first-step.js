import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { getUserAuthInfo } from '@/api/http';
import { Input, Select, Checkbox, Button, Radio, DatePicker } from 'antd';
import moment from 'moment';
import * as validateUtils from '@/lib/util/validate';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import InputItem from '@/components/form/input-item';
import AceForm from '@/components/form/form';
import { createGetProp } from '@/components/utils';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import zh_TW from 'antd/lib/locale-provider/zh_TW';

const Option = Select.Option;
const RadioGroup = Radio.Group;

@inject('userInfoStore')
@observer
export default class FirstStep extends Component {
    constructor() {
        super();
        this.next = this.next.bind(this);
        let date18 = moment().subtract(18, 'years');
        this.defaultDate = {
            birthdayInit: false,
            birthday: date18,
        };
        this.state = {
            firstName: '',
            firstNameMes: '',
            secondName: '',
            secondNameMes: '',
            birthday: date18.format('YYYY-MM-DD'),
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
        };
        this.inputsData = {
            firstName: {
                label: UPEX.lang.template('真实姓氏'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'firstName')
                },
                tip: UPEX.lang.template('填写之姓名必须与日后提领的银行账户名相同')
            },
            secondName: {
                label: UPEX.lang.template('真实名字'),
                className: 'last',
                inputProps: {
                    onChange: this.setVal.bind(this, 'secondName')
                },
            },
            birthday: {
                label: UPEX.lang.template('出生日期'),
            },
            address: {
                label: UPEX.lang.template('住址'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'address')
                },
                tip: UPEX.lang.template('请如实填写地址，我们可能会给您邮寄活动礼品或其他物品'),
            },
            idCardType: {
                label: UPEX.lang.template('证件类型'),
                tip: UPEX.lang.template('目前暂时只开放给拥有台湾身份证的用户使用'),
            },
            postCode: {
                label: UPEX.lang.template('邮递区号'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'postCode')
                },
                tip: UPEX.lang.template('请填写住址地区的邮递区号'),
            },
            idCard: {
                label: UPEX.lang.template('证件号码'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'idCard')
                },
                tip: UPEX.lang.template('请填写真实身份证号，否则会影响您的资金进出'),
            },
            profession: {
                label: UPEX.lang.template('职业'),
            },
            annualsalary: {
                label: UPEX.lang.template('年薪'),
            },
        }
        let _lang = UPEX.lang.language;
        let _locale = en_US;
        if(_lang === 'zh-CN') {
            _locale = zh_CN;
        }
        if(_lang === 'zh-TW') {
            _locale = zh_TW;
        }
        this.locale = _locale;
    }

    componentDidMount() {
        const {userInfo = {}} = this.props.userInfoStore;
        if(userInfo.isAuthPrimary === -1) {
            getUserAuthInfo().then(res => {
                if(res.status === 200) {
                    // console.log(res)
                    const data = res.attachment;
                    let birthday = data.birthDay.split(' ')[0];
                    this.defaultDate.birthday = moment(birthday, 'YYYY-MM-DD');
                    this.setState({
                        firstName: data.firstName,
                        secondName: data.secondName,
                        birthday,
                        idCardType: data.idType * 1,
                        idCard: data.idNumber,
                        resortType: data.resortType * 1,
                        resortTypeOther: data.resortTypeOther,
                        address: data.location,
                        profession: data.profession * 1,
                        annualsalary: data.annualSalary,
                    })
                }
            })
        }

    }

    setVal(name, e) {
        let str = e.target.value;
        let val =  str.trim();
        let result = '';
        if(val !== '') {
            if(['address', 'firstName', 'secondName'].indexOf(name) !== -1) {
                if(validateUtils.checkLength(str, 200)) {
                    return;
                }
                result = str;
            }
            // 身份证校验 30位 大写字母和数字
            if(name === 'idCard') {
                if(!validateUtils.isNumberOrUpCaseCode(val) || validateUtils.checkLength(val, 30)) {
                    return;
                }
                result = val;
            }
        }
        this.setState({
            [name]: result
        });
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
        this.setState(data);
    }

    dateChange(name, date, dateString) {
        this.setState({
            birthday: dateString
        })
    }

    checkHandel = (e) => {
        this.setState({
            check: e.target.checked
        });
    }

    useOfFundsChange = (e) => {
        this.setState({
            resortType: e.target.value
        });
    }

    resortTypeOtherChange = (e) => {
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
            // postCode: UPEX.lang.template('请填写区域号码'),
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
        const { state, inputsData, defaultDate } = this;
        let birthdayVals = state.birthday ? { value: moment(state.birthday, 'YYYY-MM-DD') } : {};
        return (
            <AceForm className="auth-step-1">
                <FormView>
                    <FormItem {...inputsData.firstName} value={state.firstName} error={state.firstNameMes}/>
                    <FormItem {...inputsData.secondName} value={state.secondName} error={state.secondNameMes}/>
                    <FormItem {...inputsData.birthday} error={state.birthdayMes}>
                        <LocaleProvider locale={this.locale}>
                            <DatePicker size="default" defaultValue={defaultDate.birthday} {...birthdayVals} onChange={this.dateChange.bind(this, 'birthday')} />
                        </LocaleProvider>
                    </FormItem>
                    <FormItem {...inputsData.address} value={state.address} error={state.addressMes}/>
                    {/* <FormItem {...inputsData.postCode} value={state.postCode} error={state.postCodeMes}/> */}
                    <FormItem {...inputsData.idCardType} error={state.idCardTypeMes}>
                        <Select onChange={this.selectChange.bind(this, 'idCardTypeMes', 'idCardType')} value={state.idCardType}  placeholder={UPEX.lang.template('请选择')}>
                            <Option value={1}>{UPEX.lang.template('台湾身份证')}</Option>
                        </Select>
                    </FormItem>
                    <FormItem {...inputsData.idCard} value={state.idCard} error={state.idCardMes}/>
                    <FormItem {...inputsData.profession} error={state.professionMes}>
                        <Select onChange={this.selectChange.bind(this, 'professionMes', 'profession')} value={state.profession} placeholder={UPEX.lang.template('请选择职业')}>
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
                    <FormItem {...inputsData.annualsalary} error={state.annualsalaryMes}>
                        <Select onChange={this.selectChange.bind(this, 'annualsalaryMes', 'annualsalary')} value={state.annualsalary} placeholder={UPEX.lang.template('请选择年薪')}>
                            <Option value={1}>{UPEX.lang.template('0-50万')}</Option>
                            <Option value={2}>{UPEX.lang.template('50-100万')}</Option>
                            <Option value={3}>{UPEX.lang.template('150-200万')}</Option>
                            <Option value={4}>{UPEX.lang.template('200-250万')}</Option>
                            <Option value={5}>{UPEX.lang.template('250万以上')}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label={UPEX.lang.template('资金用途')}>
                        <RadioGroup onChange={this.useOfFundsChange} value={state.resortType}>
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
