import * as validateUtils from '@/lib/util/validate';
import { getRealLocation, getUserAuthInfo } from '@/api/http';
import moment from 'moment';
import React from 'react';
import { Select, Radio } from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;

const action = {};
// 提交检测
action.validate = function() {
    // TODO: 优化下
    const { state } = this;
    let allPass = true;
    let mesData = state.errorMsg;
    let mesMap = {
        firstName: UPEX.lang.template('请填写真实姓氏'),
        secondName: UPEX.lang.template('请填写真实名字'),
        address: UPEX.lang.template('请完善地址信息'),
        idCardType: UPEX.lang.template('请选择证件类型'),
        idCard: UPEX.lang.template('请填写证件号码'),
        profession: UPEX.lang.template('请选择职业'),
        annualsalary: UPEX.lang.template('请选择年薪'),
        gender: UPEX.lang.template('请选择性别'),
        realLocation: UPEX.lang.template('请选择国家/地区'),
    };
    // 对字段做遍历
    for (let _name in mesMap) {
        if (!state[_name]) {
            mesData[_name] = mesMap[_name];
            allPass = false;
        } else {
            mesData[_name] = '';
        }
    }
    // 校验日期
    if (!state.birthday) {
        mesData.birthday = UPEX.lang.template('请完善出生日期');
        allPass = false;
    } else {
        mesData.birthday = '';
    }
    this.setState({
        errorMsg: mesData
    });
    return allPass;
};
// 提交，上传数据
action.submit = function() {
    if (!this.validate()) {
        return;
    }
    const { state } = this;

    let data = {
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
        annualSalary: state.annualsalary,
        gender: state.gender,
        realLocation: state.realLocation,
    };
    // 缓存数据
    this.props.updateCache('cacheBase', data);
    // 保存数据到store
    this.props.userInfoStore.addIdentityInfo(data);
    this.props.changeStep(2);
};

// 属性值设置
action.setVal = function(name, e) {
    let str = e.target.value;
    let val = str.trim();
    let result = '';
    if (val !== '') {
        if (['address', 'firstName', 'secondName'].indexOf(name) !== -1) {
            if (validateUtils.checkLength(str, 200)) {
                return;
            }
            result = str;
        }
        // 身份证校验 30位 大写字母和数字
        if (name === 'idCard') {
            val = val.toUpperCase();
            if (!validateUtils.isNumberOrUpCaseCode(val) || validateUtils.checkLength(val, 30)) {
                return;
            }
            result = val;
        }
    }
    this.setState({
        [name]: result
    });
};

// 日期变更
action.dateChange = function(name, date, dateString) {
    this.setState({
        birthday: dateString
    });
};

// 检测是否被驳回
action.checkIsAuthPrimary = function() {
    const { userInfo = {} } = this.props.userInfoStore;
    if (userInfo.isAuthPrimary === -1) {
        getUserAuthInfo().then(res => {
            if (res.status === 200) {
                // console.log(res)
                const data = res.attachment;
                let birthday = data.birthDay.split(' ')[0];
                this.defaultDate.birthday = moment(birthday, 'YYYY-MM-DD');
                this.setState({
                    firstName: data.firstName,
                    secondName: data.secondName,
                    birthday,
                    idCardType: data.idType + '',
                    idCard: data.idNumber,
                    resortType: data.resortType + '',
                    resortTypeOther: data.resortTypeOther + '',
                    address: data.location,
                    profession: data.profession + '',
                    annualsalary: data.annualSalary + '',
                    realLocation: userInfo.realLocation + '',
                    gender: userInfo.gender + '',
                });
            }
        });
    }
};

/**
 * @assets field, [targetKey], event
 */
action.onSelectChange = function(...assets) {
    let _name = assets[0];
    let _val = assets.length === 3 ? assets[2].target[assets[1]] : assets[1];
    let _state = {
        [_name]: _val
    };
    // 如果是地区 且不等于 1(本地)
    if(_name === 'realLocation') {
        _state.idCardType = _val == '1' ? '1' : '3'; // 1:身份证  3: 护照
    }
    this.setState(_state);
};

// 获取地区
action.getRealLocation = function() {
    let local = UPEX.cache.getCache('lang');
    let langMap = {
        'zh-CN': 1,
        'zh-TW': 2,
        'en-US': 3
    };
    getRealLocation({
        language: langMap[local] || 1
    }).then(res => {
        if (res.status === 200) {
            console.log(res);
            this.setState({
                locationArr: res.attachment.map(item => {
                    return {
                        value: item.val + '',
                        label: item.ename
                    };
                })
            });
        }
    });
};

// 职业列表
action.professionList = function() {
    let list = [
        { value: '1', label: UPEX.lang.template('军公教') },
        { value: '2', label: UPEX.lang.template('专业技术人员') },
        { value: '3', label: UPEX.lang.template('行政人员') },
        { value: '4', label: UPEX.lang.template('金融业') },
        { value: '5', label: UPEX.lang.template('农、林、牧、渔、水利业生产人员') },
        { value: '6', label: UPEX.lang.template('生产、运输设备操作') },
        { value: '7', label: UPEX.lang.template('学生') },
        { value: '8', label: UPEX.lang.template('自由职业者') }
    ];
    return list.map((item, i) => {
        return (
            <Option key={i} value={item.value}>
                {item.label}
            </Option>
        );
    });
};

// 薪水列表
action.annualsalaryList = function() {
    let list = [
        { value: '1', label: UPEX.lang.template('0-50万') },
        { value: '2', label: UPEX.lang.template('50-100万') },
        { value: '3', label: UPEX.lang.template('150-200万') },
        { value: '4', label: UPEX.lang.template('200-250万') },
        { value: '5', label: UPEX.lang.template('250万以上') }
    ];
    return list.map((item, i) => {
        return (
            <Option key={i} value={item.value}>
                {item.label}
            </Option>
        );
    });
};

// 资金用途列表
action.useOfFundsList = function() {
    let list = [
        { value: '1', label: UPEX.lang.template('投资、买卖数位货币') },
        { value: '2', label: UPEX.lang.template('储存数位货币') },
        { value: '3', label: UPEX.lang.template('其他') }
    ];
    return list.map((item, i) => {
        return (
            <Radio key={i} value={item.value}>
                {item.label}
            </Radio>
        );
    });
};

// 地区列表
action.locationList = function() {
    return this.state.locationArr.map((item, i) => {
        return (
            <Option key={i} value={item.value}>
                {item.label}
            </Option>
        );
    });
};
// 身份证列表
action.idCardList = function() {
    let list = [
        { value: '1', label: UPEX.lang.template('台湾身份证') },
        { value: '3', label: UPEX.lang.template('护照') },
    ];
    return list.map((item, i) => {
        return (
            <Option key={i} value={item.value}>
                {item.label}
            </Option>
        );
    });
};

// 性别列表
action.genderList = function() {
    let list = [
        { value: '1', label: UPEX.lang.template('男') },
        { value: '2', label: UPEX.lang.template('女') },
        { value: '3', label: UPEX.lang.template('其他') },
    ];
    return list.map((item, i) => {
        return (
            <Option key={i} value={item.value}>
                {item.label}
            </Option>
        );
    });
};

export default function (target, name, descriptor) {
    let _proto = target.prototype;

    Object.assign(_proto, action);
};
