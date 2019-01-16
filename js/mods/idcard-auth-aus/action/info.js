import * as validateUtils from '@/lib/util/validate';
import { getRealLocation, getUserAuthInfo, submitUserInfo } from '@/api/http';
import React from 'react';
import { Select, Radio, message } from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;

const action = {};
//
/**
 * 表单信息  校验字段 错误信息
 * @initField  /user/userAuthInfo接口返回的对应字段, 用于初始化
 * @target  /user/submitUserInfo接口提交时转换对应字段, 用于提交
 */

// 提交检测
action.validate = function () {
    const { state, forms, idTypes } = this;
    let errors = {};
    let status = true;
    let params = {};
    // 非必填字段
    let nonessentials = [];

    forms.fields.forEach(item => {
        if (nonessentials.indexOf(item.name) === -1) {
            let _val = state[item.name];
            let _temp = true;
            if(_val === '' || _val === null) {
                _temp = false;
            }
            // 全是空格
            if(typeof _val == 'string') {
                _temp = _val.trim() != '';
            }
            if ( !_temp ) {
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
// 提交，上传数据
action.submit = function() {
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
    let params = {
        ...result,
        NECaptchaValidate: validate,
        captchaId
    };
    // TODO: 两个方向 直接提交 转成上传图片
    // console.log(params)
    if(params.realLocation == '1') {
        this.props.submit(params).catch(err => {
            console.error('submitUserInfo', err);
            message.error('Network Error');
        })
        .then(data => {
            this.props.userInfoStore.getUserInfo();
            this.setState({
                ...slideDisable
            });
            this.slideCtx.yidunCaptcha.captchaIns.refresh();
        });;
    } else {
        this.props.goToUpload(params);
    }
};


// 身份证输入 校验 30位 大写字母和数字
action.idCardOnInput = function(e) {
    let str = e.target.value;
    let val = str.trim();
    let result = '';
    if (val !== '') {
        // val = val.toUpperCase();
        if (!validateUtils.isIdcardOrPassport(val) || validateUtils.checkLength(val, 30)) {
            return;
        }
        result = val;
    }
    this.setState({
        idCard: result
    });
};


// 属性值设置  名称 地址允许输入空格
action.onInput = function(name, e) {
    let str = e.target.value;
    if (str !== '') {
         // TODO: 校验字长 22:[secondName, firstName]
        if (['secondName', 'firstName'].indexOf(name) !== -1 && this.transStr(str) > 21) {
            return ;
        }
        // TODO: 校验字长 255:[address]
        if (['address'].indexOf(name) !== -1 && this.transStr(str) > 254) {
            return ;
        }
    }
    this.setState({
        [name]: str
    });
};

action.onChecked = function(name, e) {
    this.setState({
        [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
};

// 日期变更
action.dateChange = function(name, date, dateString) {

    this.defaultDate[name + 'Init'] = true;
    // this.setVal(name, dateString);
    this.setState({
        birthday: dateString
    });
};

action.transStr = function (str) {
    return str.replace(/[\u4e00-\u9fa5]/g, 'aa').length;
}


// 检测是否被驳回
action.checkIsAuthPrimary = function() {
    const { userInfo } = this.props.userInfoStore;
    if (userInfo.readFailReason === 0 && userInfo.isAuthPrimary === -1) {
        getUserAuthInfo().then(res => {
            if (res.status === 200) {
                const { forms } = this;
                const sourceData = res.attachment || {};
                let params = {};
                forms.fields.forEach(item => {
                    let val = sourceData[item.initField || item.target || item.name];
                    if (['birthday'].indexOf(item.name) !== -1) {
                        val = val.split(' ')[0];
                    }
                    if (['idCardType'].indexOf(item.name) !== -1) {
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
};

/**
 * 国家、地区选择  如果是地区 且不等于 1(本地) 禁用驾驶证
 * @val: Array
 */
action.locationOnSelect = function(val) {
    let _state = {
        realLocation: val,
    };
    if(val !== '1') {
        _state.idCardType = '3';  // 2:驾驶照  3: 护照
    }
    this.setState(_state);
};
/**
 * @name: String
 * @val: String
 */
action.onSelect = function(name, val) {
    this.setState({
        [name]: val
    });
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

// 地区过滤
action.filterOption = function (inputValue, option) {
    let result = true;
    try {
        let reg = new RegExp(inputValue, 'i');
        result = reg.test(option.props.children);
    } catch (error) {
        console.error('location filterOption', error)
    }
    return result;
}

// 身份证列表
export const idCardList = function(val) {
    let list = [
        { value: '3', label: UPEX.lang.template('护照') },
        { value: '2', label: UPEX.lang.template('驾照') }
        // {value:'1', label: UPEX.lang.template('年龄证明')},
    ];
    // 获取身份类型
    if(val) {
      return  list.filter(item => {
          return item.value == val;
      })
    }
    // 非本地 只允许使用护照
    if(this.state.realLocation != '1') {
        list = [
            { value: '3', label: UPEX.lang.template('护照') },
        ]
    }
    return list.map((item, i) => {
        return (
            <Option key={i} value={item.value}>
                {item.label}
            </Option>
        );
    });
};
action.idCardList = idCardList;

// 性别列表
action.genderList = function() {
    let list = [
        { value: '1', label: UPEX.lang.template('男') },
        { value: '2', label: UPEX.lang.template('女') },
        { value: '3', label: UPEX.lang.template('其他') }
    ];
    return list.map((item, i) => {
        return (
            <Option key={i} value={item.value}>
                {item.label}
            </Option>
        );
    });
};

export default function(target, name, descriptor) {
    Object.assign(target.prototype, action);
}
