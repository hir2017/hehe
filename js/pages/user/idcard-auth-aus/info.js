import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Select, Checkbox, Button, DatePicker, message } from 'antd';
import moment from 'moment';
import { getUserAuthInfo, submitUserInfo } from '@/api/http';
import FormItem from '@/mods/common/form/item';
const Option = Select.Option;
import getIdTypes from './getIdTypes';
import AceForm from '@/components/form/form';
import Captcha from '@/mods/common/active-slide-captcha';

@inject('userInfoStore')
@observer
export default class FirstStep extends Component {
    constructor(props) {
        super(props);
        this.idTypes = getIdTypes();
        this.defaultDate = {
            birthdayInit: false,
            birthday: moment().subtract(18, 'years'),
            idCardValidityInit: false,
            idCardValidity: moment().add(1, 'days')
        };
        this.state = {
            firstName: '',
            middleName: '',
            secondName: '',
            birthday: '',
            idCardType: '3',
            idCard: '',
            idCardValidity: '',
            address: '',
            validate: '',
            captchaId: '',
            checked: false,
            isSlide: false,
            loading: false,
            errMsg: {},
            slideIns: null
        };
        this.forms = {
            fields: [
                {
                    name: 'secondName',
                    msg: UPEX.lang.template('请填写名字')
                },
                {
                    name: 'middleName',
                    msg: UPEX.lang.template('请填写中间名')
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
                    name: 'idCardValidity',
                    target: 'IDCardOutOfTime',
                    initField: 'outofTime',
                    msg: UPEX.lang.template('请填写证件有效期')
                },
                {
                    name: 'address',
                    msg: UPEX.lang.template('请填写住址')
                }
            ]
        };
        this.inputData = {
            secondName: {
                label: UPEX.lang.template('名字'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'secondName')
                }
            },
            middleName: {
                label: UPEX.lang.template('中间名'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'middleName')
                }
            },
            firstName: {
                label: UPEX.lang.template('家族姓氏'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'firstName')
                }
            },
            birthday: {
                label: UPEX.lang.template('出生日期'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'birthday')
                }
            },
            idCardType: {
                label: UPEX.lang.template('证件类型')
            },
            idCard: {
                label: UPEX.lang.template('证件号码'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'idCard')
                }
            },
            idCardValidity: {
                label: UPEX.lang.template('证件有效期')
            },
            address: {
                label: UPEX.lang.template('住址'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'address')
                }
            },
            check: ''
        };
        this.getErrMsg = name => {
            const { state } = this;
            return state[name] === '' || state[name] === null ? state.errMsg[name] : '';
        };
        this.startDate = moment();
    }

    transStr(str) {
        return str.replace(/[\u4e00-\u9fa5]/g, 'aa').length;
    }

    validateStrLen(name, str) {
        // TODO: 校验字长 22:[secondName, middleName, firstName] 45:[idCard] 255:[address]
        let arrs = [['secondName', 'firstName'], ['idCard'], ['middleName', 'address']];

        if (arrs[0].indexOf(name) !== -1) {
            return this.transStr(str) <= 21;
        }
        if (arrs[1].indexOf(name) !== -1) {
            return this.transStr(str) <= 44;
        }

        if (arrs[2].indexOf(name) !== -1) {
            return this.transStr(str) <= 254;
        }
        return true;
    }

    // 格式验证
    formatValidation(name, str) {
        let format = {
            idCard: /^[0-9A-Z]+$/,
        }
        if(format[name]) {
            // 为空
            if(str === '') {
                return true;
            }
            // 正则校验
            return format[name].test(str);
        }
        return true;
    }

    setVal(name, e) {
        let str = typeof e === 'object' ? e.target.value : e;
        // 证件号地址允许输入空格
        if (['address', 'secondName', 'firstName', 'middleName', 'checked'].indexOf(name) === -1) {
            str = str.trim();
        }
        // 长度验证
        if (!this.validateStrLen(name, str)) {
            return;
        }
        // 格式验证
        if (!this.formatValidation(name, str)) {
            return;
        }
        this.setState({
            [name]: str
        });
    }

    dateChange(name ,date, dateString) {
        this.defaultDate[name + 'Init'] = true;
        this.setVal(name, dateString);
    }

    componentDidMount() {
        const { userInfo } = this.props.userInfoStore;
        let _needInit = userInfo.readFailReason === 0 && userInfo.isAuthPrimary === -1;

        // mock
        // _needInit = true;s

        if (_needInit) {
            getUserAuthInfo().then(res => {
                if (res.status === 200) {
                    const { forms } = this;
                    const sourceData = res.attachment || {};
                    let params = {};
                    forms.fields.forEach(item => {
                        let val = sourceData[item.initField || item.target || item.name];
                        if (['birthday', 'idCardValidity'].indexOf(item.name) !== -1) {
                            val = val.split(' ')[0];
                        }
                        if(['idCardType'].indexOf(item.name) !== -1) {
                            val = val + '';
                        }
                        params[item.name] = val;
                    });
                    this.defaultDate.birthdayInit = true;
                    this.defaultDate.idCardValidityInit = true;
                    this.setState(params);
                }
            });
        }
    }

    validate() {
        const { state, forms, idTypes } = this;
        let errors = {};
        let status = true;
        let params = {};
        // 非必填字段
        let nonessentials = ['middleName', 'idCardValidity'];

        forms.fields.forEach(item => {
            if (nonessentials.indexOf(item.name) === -1) {
                if (state[item.name] === '' || state[item.name] === null) {
                    errors[item.name] = item.msg;
                    status = false;
                } else {
                    errors[item.name] = '';
                }
            }
            params[item.target || item.name] = state[item.name];
        })
        this.setState({
            errMsg: errors
        });
        return status ? params : false;
    }

    submit() {
        let result = this.validate();
        if (!result) {
            return;
        }
        const { validate, captchaId } = this.state;
        const slideDisable = {
            validate: '',
            loading: false,
            isSlide: false,
            captchaId: ''
        };
        submitUserInfo({
            ...result,
            NECaptchaValidate: validate,
            captchaId
        })
            .then(res => {
                if (res.status === 200) {
                    message.success(UPEX.lang.template('提交成功'));
                } else {
                    message.error(res.message);
                }
            })
            .catch(err => {
                console.error('submitUserInfo', err);
                message.error('Network Error');
            })
            .then(data => {
                this.props.userInfoStore.getUserInfo();
                this.setState({
                    ...slideDisable
                });
                this.slideCtx.yidunCaptcha.captchaIns.refresh();
            });
    }

    render() {
        const { state, inputData, getErrMsg, idTypes, defaultDate } = this;
        let birthdayVals = state.birthday ? { value: moment(state.birthday, 'YYYY-MM-DD') } : {};
        return (
            <AceForm className="auth-base-info">
                <FormItem {...inputData.secondName} value={state.secondName} error={getErrMsg('secondName')} />
                <FormItem {...inputData.middleName} value={state.middleName} error={getErrMsg('middleName')} />
                <FormItem {...inputData.firstName} value={state.firstName} error={getErrMsg('firstName')} />
                <FormItem {...inputData.birthday} className={defaultDate.birthdayInit ? '' : 'default'} error={getErrMsg('birthday')}>
                    <DatePicker
                        size="default"
                        defaultValue={defaultDate.birthday}
                        {...birthdayVals}
                        onChange={this.dateChange.bind(this, 'birthday')}
                    />
                </FormItem>
                <FormItem {...inputData.idCardType}>
                    <Select defaultValue="3" value={state.idCardType} onChange={(val) => {
                        this.setState({
                            idCardType: val
                        })
                    }}>
                        {idTypes.map((item, i) => (
                            <Option key={i} value={item.value}>
                                {item.label}
                            </Option>
                        ))}
                    </Select>
                </FormItem>
                <FormItem {...inputData.idCard} value={state.idCard} error={getErrMsg('idCard')} />
                {
                    // <FormItem {...inputData.idCardValidity} error={getErrMsg('idCardValidity')} className={defaultDate.idCardValidityInit ? '' : 'default'}>
                    //     <DatePicker
                    //         size="default"
                    //         disabledDate={(currDate) => {
                    //             return currDate.valueOf() <= this.startDate.valueOf();
                    //         }}
                    //         defaultValue={defaultDate.idCardValidity}
                    //         {...idCardValidityVals}
                    //         onChange={this.dateChange.bind(this, 'idCardValidity')}
                    //     />
                    // </FormItem>
                }
                <FormItem {...inputData.address} value={state.address} error={getErrMsg('address')} />
                <FormItem>
                    <Captcha
                        status={this.state.resStatus}
                        completeCallBack={(validate, captchaId, slideIns) => {
                            this.setState({
                                isSlide: true,
                                validate,
                                captchaId
                            });
                            this.slideIns = slideIns
                        }}
                        afterInit={(ctx) => {
                            this.slideCtx = ctx;
                        }}
                    />
                </FormItem>

                <FormItem>
                    <Checkbox
                        onChange={e => {
                            this.setVal('checked', e.target.checked);
                        }}
                    >
                        <span
                            className="checkbox-text"
                            dangerouslySetInnerHTML={{
                                __html: UPEX.lang.template('勾选选项表示您同意我们的用户条款和隐私条款', {
                                    href1: UPEX.config.docUrls.kycPolicy,
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
                            {UPEX.lang.template('下一步')}
                        </Button>
                    )}
                </FormItem>
            </AceForm>
        );
    }
}
