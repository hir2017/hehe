import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Select, Checkbox, Button, Radio, DatePicker, LocaleProvider, Row, Col } from 'antd';
import moment from 'moment';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import AceForm from '@/components/form/form';
// 多语言
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import zh_TW from 'antd/lib/locale-provider/zh_TW';
// 绑定action、inputData
import bindAction from './action/first';

const Option = Select.Option;
const RadioGroup = Radio.Group;

@inject('userInfoStore')
@observer
@bindAction
export default class FirstStep extends Component {
    constructor() {
        super();
        let date18 = moment().subtract(18, 'years');
        this.defaultDate = {
            birthdayInit: false,
            birthday: date18,
        };
        this.state = {
            firstName: '',
            secondName: '',
            birthday: date18.format('YYYY-MM-DD'),
            idCardType: '1',
            idCard: '',
            check: false,
            resortType: '1',
            resortTypeOther: '',
            address: '',
            profession: '',
            annualsalary: '',
            realLocation: '1',
            locationArr: [],
            errorMsg: {},
        };
        this.inputsData = {
            firstName: {
                label: UPEX.lang.template('真实姓氏'),
                inputProps: {
                    onChange: this.onInput.bind(this, 'firstName')
                },
            },
            secondName: {
                label: UPEX.lang.template('真实名字'),
                className: 'last',
                inputProps: {
                    onChange: this.onInput.bind(this, 'secondName')
                },
            },
            address: {
                label: UPEX.lang.template('住址'),
                inputProps: {
                    onChange: this.onInput.bind(this, 'address')
                },
                tip: UPEX.lang.template('请如实填写地址，我们可能会给您邮寄活动礼品或其他物品'),
            },
            idCard: {
                label: UPEX.lang.template('证件号码'),
                inputProps: {
                    onChange: this.idCardOnInput.bind(this)
                },
                tip: UPEX.lang.template('请填写真实身份证号，否则会影响您的资金进出'),
            }
        };
        // 日期选择多语言
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
        // 判断是否被驳回，如果被驳回则调取上次提交信息
        this.checkIsAuthPrimary();
        // 获取地区列表
        this.getRealLocation();
    }

    render() {
        const { state, inputsData, defaultDate } = this;
        let birthdayVals = state.birthday ? { value: moment(state.birthday, 'YYYY-MM-DD') } : {};
        return (
            <AceForm className="auth-step-1">
                <FormView>
                    <FormItem label={UPEX.lang.template('国家/地区')} error={state.errorMsg.realLocation}>
                        <Select showSearch onChange={this.locationOnSelect.bind(this)} value={state.realLocation}  placeholder={UPEX.lang.template('请选择')}>
                            {this.locationList()}
                        </Select>
                    </FormItem>
                    <FormItem label={UPEX.lang.template('证件类型')}  error={state.errorMsg.idCardType}>
                        <Select disabled onChange={this.onSelect.bind(this, 'idCardType')} value={state.idCardType}  placeholder={UPEX.lang.template('请选择')}>
                            {this.idCardList()}
                        </Select>
                    </FormItem>
                    <FormItem {...inputsData.idCard} value={state.idCard} error={state.errorMsg.idCard}/>
                    <FormItem className="name-row" tip={UPEX.lang.template('填写之姓名必须与日后提领的银行账户名相同')} >
                        <FormItem {...inputsData.secondName} value={state.secondName} error={state.errorMsg.secondName}/>
                        <FormItem {...inputsData.firstName} value={state.firstName} error={state.errorMsg.firstName}/>
                    </FormItem>
                    <FormItem label={UPEX.lang.template('性别')} error={state.errorMsg.gender}>
                        <Select onChange={this.onSelect.bind(this, 'gender')} value={state.gender}  placeholder={UPEX.lang.template('请选择')}>
                            {this.genderList()}
                        </Select>
                    </FormItem>
                    <FormItem  label={UPEX.lang.template('出生日期')} error={state.errorMsg.birthday}>
                        <LocaleProvider locale={this.locale}>
                            <DatePicker size="default" defaultValue={defaultDate.birthday} {...birthdayVals} onChange={this.dateChange.bind(this, 'birthday')} />
                        </LocaleProvider>
                    </FormItem>
                    <FormItem {...inputsData.address} value={state.address} error={state.errorMsg.address}/>
                    <FormItem label={UPEX.lang.template('职业')} error={state.errorMsg.profession}>
                        <Select onChange={this.onSelect.bind(this, 'profession')} value={state.profession} placeholder={UPEX.lang.template('请选择职业')}>
                            {this.professionList()}
                        </Select>
                    </FormItem>
                    <FormItem label={UPEX.lang.template('年薪')} error={state.errorMsg.annualsalary}>
                        <Select onChange={this.onSelect.bind(this, 'annualsalary')} value={state.annualsalary} placeholder={UPEX.lang.template('请选择年薪')}>
                            {this.annualsalaryList()}
                        </Select>
                    </FormItem>
                    <FormItem className="resort-type" label={UPEX.lang.template('资金用途')}>
                        <RadioGroup onChange={this.onChecked.bind(this, 'resortType')} value={state.resortType}>
                            {this.useOfFundsList()}
                        </RadioGroup>
                        {this.state.resortType == '3' ? <Input onChange={this.onInput.bind(this, 'resortTypeOther')} value={state.resortTypeOther}/> : null}
                    </FormItem>
                    <FormItem>
                        <Button onClick={this.submit.bind(this)} className="submit-btn" disabled={!state.check}>{UPEX.lang.template('下一步')}</Button>
                        <Checkbox onChange={this.onChecked.bind(this, 'check')}>
                            <span
                                className="checkbox-text"
                                dangerouslySetInnerHTML={{
                                    __html: UPEX.lang.template('勾选选项表示您同意我们的用户条款和隐私条款', {
                                        href1: UPEX.lang.template('用户协议网页链接'),
                                        href2: UPEX.lang.template('隐私条款网页链接')
                                    })
                                }}
                            />
                        </Checkbox>
                    </FormItem>
                </FormView>
            </AceForm>
        );
    }
}
