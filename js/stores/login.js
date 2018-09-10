import { observable, computed, autorun, action } from 'mobx';
import Countries from '../mods/select-country/country-list';
import { personalInfo } from '../api/http';
import NumberUtil from '../lib/util/number';


class LoginInfoBaseStore {
    @observable countries = Countries;
    @observable mode = 'email'; // 注册方式，邮箱：email；手机：phone
    @observable email = ''; // 邮箱
    @observable phone = ''; // 手机
    @observable pwd = ''; // 密码
    @observable twicepwd = ''; // 确认密码
    @observable vercode = ''; // 邮箱验证码或者短信验证码
    @observable phonecode = ''; // 手机验证码
    @observable inviteId = ''; // 邀请码
    @observable agree = false; // 同意协议
    @observable googlecode = ''; // 谷歌验证码
    @observable selectedCountry = {
        areacode: '0886',
        code: 'TW',
        name: 'Taiwan'
    }; // 选中的国家区域
    @observable sending = false;
    @observable disabledCodeBtn = false;
    @observable validVercode = true; // 邮箱or手机验证码
    @observable hasPhone = false; // 手机是否已经被占用
    @observable submiting = false; // 提交中：登录、注册等请求

    @observable emailResult = [true, ''];
    @observable phoneResult = [true, ''];
    @observable pwdResult = [true, ''];
    @observable twicePwdResult = [true, ''];

    constructor(stores) {
        this.authStore = stores.authStore;

        if (UPEX.config.version == 'infinitex') {
            this.selectedCountry = {
                areacode: '0061',
                code: 'AU',
                name: 'Australia'
            };
        } else {
            this.selectedCountry = {
                areacode: '0086',
                code: 'TW',
                name: 'Taiwan'
            };
        }
    }

    @action
    reset() {
        this.mode = 'email'; // 注册方式，邮箱：email；手机：phone
        this.email = ''; // 邮箱
        this.phone = ''; // 手机
        this.pwd = ''; // 密码
        this.twicepwd = ''; // 确认密码
        this.vercode = ''; // 邮箱验证码或者短信验证码
        this.phonecode = ''; // 手机验证码
        this.inviteId = ''; // 邀请码
        this.agree = false; // 同意协议
        this.googlecode = ''; // 谷歌验证码
        this.disabledCodeBtn = false; // 禁用发送验证码按钮
        this.validVercode = true; // 邮箱or手机验证码
        this.hasPhone = false; // 手机是否已经被占用
        this.submiting = false;
        this.sending = false;

        this.emailResult = [true, ''];
        this.phoneResult = [true, ''];
        this.pwdResult = [true, ''];
        this.twicePwdResult = [true, ''];
    }

    @computed get account() {
        return this.mode == 'email' ? this.email : `${this.areaCode}${this.phone}`;
    }

    // 发送验证码验证
    @computed get verifyInfoBeforeSendCode() {
        let mode = this.mode;
        let result = {
            pass: true,
            message: ''
        };

        if (mode == 'email') {
            if (this.email == '') {
                return {
                    pass: false,
                    message: UPEX.lang.template('请填写邮箱')
                }
            }

            if (!this.emailResult[0]) {
                return {
                    pass: false,
                    message: this.emailResult[1]
                }
            }
        } else {
            if (this.phone == '') {
                return {
                    pass: false,
                    message: UPEX.lang.template('请填写手机号')
                }
            }
            if (!this.phoneResult[0]) {
                return {
                    pass: false,
                    message: this.phoneResult[1]
                }
            }
        }

        return result;
    }

    // 是否允许登录
    @computed get enableLogin() {
        let mode = this.mode;
        let result = false;

        if (mode == 'email') {
            if (this.email && this.pwd && this.emailResult[0] && this.pwdResult[0]) {
                result = true;
            }
        } else {
            if (this.phone && this.pwd && this.phoneResult[0] && this.pwdResult[0]) {
                result = true;
            }
        }

        // console.log(this.emailResult[0], this.pwdResult[0], this.email, this.phone, this.pwd);

        return result;
    }

    // 是否允许注册
    @computed get enableRegister() {
        let mode = this.mode;
        let result = false;

        if (mode == 'email') {
            if (this.email && this.pwd && this.twicepwd && this.pwd == this.twicepwd && this.emailResult[0] && this.pwdResult[0]  && this.agree && this.vercode) {
                result = true;
            }
        } else {
            if (this.phone && this.pwd && this.twicepwd && this.pwd == this.twicepwd && this.phoneResult[0] && this.pwdResult[0]  && this.agree && this.vercode) {
                result = true;
            }
        }

        return result;
    }

    // 是否允许充值密码
    @computed get enableResetPwd() {
        let mode = this.mode;
        let result = false;

        if (mode == 'email') {
            if (this.email && this.pwd && this.twicepwd && this.pwd == this.twicepwd && this.emailResult[0] && this.pwdResult[0] &&  this.vercode) {
                result = true;
            }
        } else {
            if (this.phone && this.pwd && this.twicepwd && this.pwd == this.twicepwd && this.phoneResult[0] && this.pwdResult[0] &&  this.vercode) {
                result = true;
            }
        }

        return result;
    }

    @action.bound
    updateSubmiting(status) {
        this.submiting = status;
    }

    @action.bound
    updateSending(status) {
        this.sending = status;
    }

    @action changeModeTo(mode) {
        this.reset();
        this.mode = mode;
    }

    @action disabledSMSOrPhoneCode(status) {
        this.disabledCodeBtn = status;
    }

    @action changeValidVercodeTo(status) {
        this.validVercode = status;
    }

    @action changeHasPhoneTo(status) {
        this.hasPhone = status;
    }

    @action setPasswrod(value) {
        this.pwd = value;
    }

    @action setTwicePasswrod(value) {
        this.twicepwd = value;
    }

    @action setEmail(value) {
        this.email = value;
    }

    @action setPhone(value) {
        this.phone = value;
    }

    @computed get areaCode() {
        return this.selectedCountry.areacode;
    }

    @action setAreaCode(code) {
        this.selectedCountry = this.countries[code];
    }


    @action
    setInviteCode(code) {
        this.inviteId = code;
    }

    @action
    setAgress(value) {
        this.agree = value;
    }

    @action
    setVercode(value) {
        this.vercode = value;
    }

    @action
    setGoogleCode(value) {
        this.googlecode = value;
    }

    @action
    setLoginPhoneCode(value) {
        this.phonecode = value;
    }

    @action clearField(key) {
        this[key] = '';
    }

    @action updateEmailResult(result) {
        this.emailResult = result;
    }

    @action clearEmailResult(field) {
        this.emailResult = [true, ''];
    }


    @action updatePhoneResult(result) {
        this.phoneResult = result;
    }

    @action clearPhoneResult(field) {
        this.phoneResult = [true, ''];
    }

    @action updatePwdResult(result) {
        this.pwdResult = result;
    }

    @action clearPwdResult(field) {
        this.pwdResult = [true, ''];
    }

    @action updateTwicePwdResult(result) {
        this.twicePwdResult = result;
    }

    @action clearTwicePwdResult(field) {
        this.twicePwdResult = [true, ''];
    }
}

export default LoginInfoBaseStore;