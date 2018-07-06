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
    @observable imgcode = ''; // 图片验证码
    @observable inviteId = ''; // 邀请码
    @observable agree = false; // 同意协议 
    @observable googlecode = ''; // 谷歌验证码
    @observable selectedCountry = {
        areacode: '0886',
        code: 'TW',
        name: 'Taiwan'
    }; // 选中的国家区域
    @observable sendingcode = false;
    @observable sendingphonecode = false;
    @observable validImgCode = true; // 图片验证码
    @observable validVercode = true; // 邮箱or手机验证码
    @observable hasPhone = false; // 手机是否已经被占用
    @observable logining = false;
    @observable validPhone = true;
    @observable validEmail = true;
    @observable validPwd = true;
    @observable validTwicePwd = true;

    constructor(stores) {
        this.captchaStore = stores.captchaStore;
        this.authStore = stores.authStore;

        if (UPEX.config.systemLanguage == 'zh-CN') {
            this.selectedCountry = {
                areacode: '0086',
                code: 'CN',
                name: 'China'
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
        this.imgcode = ''; // 图片验证码
        this.inviteId = ''; // 邀请码
        this.agree = false; // 同意协议 
        this.googlecode = ''; // 谷歌验证码
        this.sendingcode = false;
        this.sendingphonecode = false;
        this.validImgCode = true; // 图片验证码
        this.validVercode = true; // 邮箱or手机验证码
        this.hasPhone = false; // 手机是否已经被占用
        this.logining = false;
    }

    @computed
    get captcha() {
        return this.captchaStore.captcha;
    }

    @computed
    get codeid() {
        return this.captchaStore.codeid;
    }

    @computed
    get account() {
        return this.mode == 'email' ? this.email : `${this.areaCode}${this.phone}`;
    }

    // 检查邮箱是否合法. true合法，false不合法
    @action
    checkValidEmail() {
        let ret = true;

        if (this.email) {
            if (UPEX.config.emailReg.test(this.email)) {
                ret = true;
            } else {
                ret = false;
            }
        }

        this.validEmail = ret;

        return ret;
    }

    // 检查密码是否合法
    @action
    checkValidPwd() {
        let ret;

        if (UPEX.config.pwdReg.test(this.pwd) || this.pwd.length === 0) {
            ret = true;
        } else {
            ret = false;
        }

        this.validPwd = ret;

        return ret;
    }

    @action
    checkValidPhone() {
        let ret;

        if (UPEX.config.phoneReg.test(this.phone) || this.phone.length === 0) {
            ret = true;
        } else {
            ret = true; //不限制手机格式
        }

        this.validPhone = ret;

        return ret;
    }

    @action
    checkValidTwicePwd() {
        let ret;

        if (this.twicepwd && this.twicepwd !== this.pwd) {
            ret = false;
        } else {
            ret = true;
        }

        this.validTwicePwd = ret;

        return ret;
    }

    // 发送验证码验证
    @computed
    get verifyInfoBeforeSendCode() {
        let mode = this.mode;
        let result = {
            pass: true,
            message: ''
        };
        let email = this.email;
        let phone = this.phone;

        if (mode == 'email') {
            if (!email) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写邮箱'); 
                return result;
            }
            if (!this.validEmail) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写正确的邮箱');

                return result;
            }
        } else {
            if (!phone) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写手机号');

                return result;
            }

            if (!this.validPhone) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写正确的手机号');

                return result;
            }
        }

        return result;
    }

    @computed
    get verifyInfoBeforeLogin() {
        let mode = this.mode;
        let result = {
            pass: true,
            message: ''
        };

        let email = this.email;
        let phone = this.phone;
        let pwd = this.pwd;
        let imgcode = this.imgcode;

        if (mode == 'email') {
            if (!email) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写邮箱'); 
                return result;
            }
            if (!this.validEmail) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写正确的邮箱');

                return result;
            }
        } else {
            if (!phone) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写手机号');

                return result;
            }

            if (!this.validPhone) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写正确的手机号');

                return result;
            }
        }

        if (!pwd) {
            result.pass = false;
            result.message = UPEX.lang.template('请输入密码');

            return result;
        }

        return result;
    }

    // 提交表单验证
    @computed
    get verifyInfoBeforeSubmit() {
        let mode = this.mode;
        let result = {
            pass: true,
            message: ''
        };

        let email = this.email;
        let phone = this.phone;
        let pwd = this.pwd;
        let vercode = this.vercode;
        // 1. 邮箱 or 电话号码
        // 2. 密码 or 二次确认密码

        if (mode == 'email') {
            if (!email) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写邮箱'); 
                return result;
            }
            if (!this.validEmail) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写正确的邮箱');

                return result;
            }
        } else {
            if (!phone) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写手机号');

                return result;
            }

            if (!this.validPhone) {
                result.pass = false;
                result.message = UPEX.lang.template('请填写正确的手机号');

                return result;
            }
        }

        if (!pwd) {
            result.pass = false;
            result.message = UPEX.lang.template('请输入密码');

            return result;
        }

        if (!vercode) {
            result.pass = false;
            
            if (mode == 'email') {
                result.message = UPEX.lang.template('请填写邮箱验证码');
            } else {
                result.message = UPEX.lang.template('请填写手机验证码');
            }

            return result;
        }

        return result;
    }

    @action
    updateLogining(status) {
        this.logining = status;
    }

    @action
    changeModeTo(mode) {
        this.mode = mode;
    }

    @action
    changeSendingCodeTo(status) {
        this.sendingcode = status;
    }

    @action
    changeSendingPhoneCodeTo(status) {
        this.sendingphonecode = status;
    }

    @action
    changeValidVercodeTo(status) {
        this.validVercode = status;
    }

    @action
    changeImgCodeTo(status) {
        this.validImgCode = status;
    }

    @action
    changeHasPhoneTo(status) {
        this.hasPhone = status;
    }

    @action
    setPasswrod(value) {
        this.pwd = value;
    }

    @action
    setTwicePasswrod(value) {
        this.twicepwd = value;
    }

    @action
    setEmail(value) {
        this.email = value;
    }

    @action
    setPhone(value) {
        this.phone = value;
    }

    @computed
    get areaCode() {
        return this.selectedCountry.areacode;
    }

    @action
    setAreaCode(code) {
        this.selectedCountry = this.countries[code];
    }

    @action
    setImgCode(code) {
        this.imgcode = code;
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
}

export default LoginInfoBaseStore;