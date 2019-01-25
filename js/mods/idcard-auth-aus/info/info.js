import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Checkbox, Button, DatePicker, message } from 'antd';
import moment from 'moment';
import FormItem from '@/mods/common/form/item';
import AceForm from '@/components/form/form';
import Captcha from '@/mods/common/active-slide-captcha';
import bindAction from '../action/info';

@inject('userInfoStore')
@observer
@bindAction
export default class FirstStep extends Component {
    constructor(props) {
        super(props);
        this.defaultDate = {
            birthdayInit: false,
            birthday: moment().subtract(18, 'years'),
        };
        this.state = {
            firstName: '',
            middleName: '',
            secondName: '',
            birthday: '',
            idCardType: '3',
            idCard: '',
            address: '',
            validate: '',
            captchaId: '',
            gender: '1',
            checked: false,
            isSlide: false,
            loading: false,
            errMsg: {},
            locationArr: [],
            realLocation: '1',
            slideIns: null
        };
        this.forms = {
            fields: [
                {
                    name: 'secondName',
                    msg: UPEX.lang.template('请填写名字')
                },
                {
                    name: 'firstName',
                    msg: UPEX.lang.template('请填写家族姓氏')
                },
                {
                    name: 'birthday',
                    initField: 'birthDay',
                    msg: UPEX.lang.template('请填写出生日期')
                },
                {
                    name: 'idCardType',
                    target: 'idType',
                    msg: UPEX.lang.template('请填写证件类型')
                },
                {
                    name: 'idCard',
                    target: 'idNumber',
                    msg: UPEX.lang.template('请填写证件号码')
                },
                {
                    name: 'address',
                    initField: 'location',
                    msg: UPEX.lang.template('请填写住址')
                },
                {
                    name: 'realLocation',
                    initField: 'realLocation',
                    msg: UPEX.lang.template('请选择国家/地区')
                },
                {
                    name: 'gender',
                    initField: 'gender',
                    msg: UPEX.lang.template('请选择性别')
                }
            ]
        };
        this.inputData = {
            secondName: {
                label: UPEX.lang.template('名字'),
                inputProps: {
                    onChange: this.onInput.bind(this, 'secondName')
                }
            },
            firstName: {
                label: UPEX.lang.template('家族姓氏'),
                inputProps: {
                    onChange: this.onInput.bind(this, 'firstName')
                }
            },
            idCard: {
                label: UPEX.lang.template('证件号码'),
                inputProps: {
                    onChange: this.idCardOnInput.bind(this)
                }
            },
            address: {
                label: UPEX.lang.template('住址'),
                inputProps: {
                    onChange: this.onInput.bind(this, 'address')
                }
            },
            check: false
        };

        this.startDate = moment();
    }

    componentDidMount() {
        // 判断是否被驳回，如果被驳回则调取上次提交信息
        this.checkIsAuthPrimary();
        // 获取地区列表
        this.getRealLocation();
    }

    render() {
        const { state, inputData, defaultDate } = this;
        const {errMsg} = state;
        let birthdayVals = state.birthday ? { value: moment(state.birthday, 'YYYY-MM-DD') } : {};
        return (
            <AceForm className="auth-base-info">
                <FormItem label={UPEX.lang.template('国家/地区')} error={errMsg.realLocation}>
                    <Select showSearch filterOption={this.filterOption} defaultValue="1" value={state.realLocation} onChange={this.locationOnSelect.bind(this)}>
                        {this.locationList()}
                    </Select>
                </FormItem>
                <FormItem label={UPEX.lang.template('证件类型')}>
                    <Select defaultValue="3" value={state.idCardType} onChange={this.onSelect.bind(this, 'idCardType')}>
                        {this.idCardList()}
                    </Select>
                </FormItem>
                <FormItem {...inputData.idCard} value={state.idCard} error={errMsg.idCard} />
                <FormItem className="name-row">
                    <FormItem {...inputData.secondName} value={state.secondName} error={errMsg.secondName} />
                    <FormItem {...inputData.firstName} value={state.firstName} error={errMsg.firstName} />
                </FormItem>
                <FormItem label={UPEX.lang.template('性别')} error={state.errMsg.gender}>
                    <Select onChange={this.onSelect.bind(this, 'gender')} value={state.gender} placeholder={UPEX.lang.template('请选择')}>
                        {this.genderList()}
                    </Select>
                </FormItem>
                <FormItem label={UPEX.lang.template('出生日期')} className={defaultDate.birthdayInit ? '' : 'default'} error={errMsg.birthday}>
                    <DatePicker size="default" defaultValue={defaultDate.birthday} {...birthdayVals} onChange={this.dateChange.bind(this, 'birthday')} />
                </FormItem>
                <FormItem {...inputData.address} value={state.address} error={errMsg.address} />
                <FormItem>
                    <Captcha
                        status={this.state.resStatus}
                        completeCallBack={(validate, captchaId, slideIns) => {
                            this.setState({
                                isSlide: true,
                                validate,
                                captchaId
                            });
                            this.slideIns = slideIns;
                        }}
                        afterInit={ctx => {
                            this.slideCtx = ctx;
                        }}
                    />
                </FormItem>

                <FormItem>
                    <Checkbox onChange={this.onChecked.bind(this, 'checked')}>
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
                <FormItem>
                    {this.state.loading ? (
                        <Button className="submit-btn" disabled={true}>
                            {UPEX.lang.template('发送中')}
                        </Button>
                    ) : (
                        <Button className="submit-btn" disabled={!(this.state.checked && this.state.isSlide)} onClick={this.submit.bind(this)}>
                            {this.state.realLocation == '1' ? UPEX.lang.template('提交') : UPEX.lang.template('下一步')}
                        </Button>
                    )}
                </FormItem>
            </AceForm>
        );
    }
}
