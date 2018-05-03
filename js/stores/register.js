/**
 * @fileoverview 注册
 * @author 陈立英
 */
import { observable, computed, autorun, action } from 'mobx';
import { fetchPicCaptcha, queryPhone, sendEmailForRegister, userRegister } from './api';

class RegisterStore {
    // 注册方式，邮箱：email；手机：phone
    @observable registerMode = 'email';
    @observable email = ''; // 邮箱
    @observable phone = ''; // 手机
    @observable areaCode = '86';
    @observable pwd = ''; // 密码
    @observable twicepwd = ''; // 确认密码
    @observable vercode = ''; // 邮箱验证码或者短信验证码
    @observable imgcode = ''; // 图片验证码
    @observable inviteId = ''; //
    @observable captcha = ''; // 图片验证码    
    @observable picCaptcha = true; // 图片验证码 		
    @observable validCaptcha = true; // 图片验证码匹配
    @observable codeid = ''; // 图片验证码uuid
    @observable agress = false; // 是否同意服务条款
    @observable codesending = false;

    constructor() {
        // autorun(() => {

        // });
    }

    @action
    changeModeTo(mode) {
        this.registerMode = mode;
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

    @action
    setAreaCode(code) {
        this.areaCode = code;
    }

    @action
    setPicCode(code) {
        this.imgcode = code;
    }

    @action 
    setPicCaptcha(value){
    	this.picCaptcha = value;
    }

    @action 
    setInviteCode(code){
    	this.inviteId = code;
    }

    @action
    setAgress(value){
    	this.agress = value;
    }

    @action 
    setVercode(value) {
    	this.vercode = value;
    }

    @action
    changeValidCaptchaTo(value){
    	this.validCaptcha = value;
    }

    @action 
    changeSendingStatusTo(status){
    	this.codesending = status;
    }


    // 检查邮箱是否合法. true合法，false不合法
    @computed
    get checkEmail() {
        let ret = true;

        if (this.email) {
            if (UPEX.config.emailReg.test(this.email)) {
                ret = true;
            } else {
                ret = false;
            }
        }

        return ret;
    }

    // 检查密码是否合法
    @computed
    get checkPwd() {
        let ret;

        if (UPEX.config.pwdReg.test(this.pwd) || this.pwd.length === 0) {
            ret = true;
        } else {
            ret = false;
        }

        return ret;
    }

    @computed
    get checkPhone() {
        let ret;

        if (UPEX.config.phoneReg.test(this.phone) || this.phone.length === 0) {
            ret = true;
        } else {
            ret = false;
        }

        return ret;
    }

    @computed
    get checkTwicePwd() {
        let ret;

        if (this.twicepwd && this.twicepwd !== this.pwd) {
            ret = false;
        } else {
            ret = true;
        }

        return ret;
    }

    @computed
    get checkUserBeforeSendCode() {
        let mode = this.registerMode;
        let result = {
            pass: true,
            message: ''
        };
        let email = this.email;
        let phone = this.phone;
        let pwd = this.pwd;

        if (mode == 'email') {
            if (!email || !this.checkEmail) {
                result.pass = false;
                result.message = UPEX.lang.template('请确认邮箱是否正确');

                return result;
            }
        } else {
            if (!phone || !this.checkPhone) {
                result.pass = false;
                result.message = UPEX.lang.template('请确认手机号是否正确');

                return result;
            }
        }

        if (!pwd || !this.checkPwd || !this.checkTwicePwd) {
            result.pass = false;
            result.message = UPEX.lang.template('请确认密码是否正确');

            return result;
        }

        return result;
    }


    @computed
    get checkUserBeforeRegister() {
        let mode = this.registerMode;
        let result = {
            pass: true,
            message: ''
        };

        let email = this.email;
        let phone = this.phone;
        let pwd = this.pwd;
        let vercode = this.vercode;

        if ((this.checkEmail || this.checkPhone) && this.checkPwd && this.checkTwicePwd && this.validCaptcha) {
			
			if (mode == 'email') {
	            if (!email) {
	                result.pass = false;
	                result.message = UPEX.lang.template('请确认邮箱是否正确');

	                return result;
	            }
	        } else {
	            if (!phone) {
	                result.pass = false;
	                result.message = UPEX.lang.template('请确认手机号是否正确');

	                return result;
	            }
	        }

	        if (!pwd) {
	            result.pass = false;
	            result.message = UPEX.lang.template('请确认密码是否正确');

	            return result;
	        }

	        if (!vercode) {
	        	result.pass = false;
                if (mode == 'email') {
                    result.message = UPEX.lang.template('请确认邮箱验证码是否正确');    
                } else {
                    result.message = UPEX.lang.template('请确认手机验证码是否正确');
                }
	        	

	        	return result;
	        }
		} else {
			result.pass = false;
        	result.message = UPEX.lang.template('请填写正确的用户信息');
        	return result;
		}

        return result;
    }


    @action
    blurPhone() {
        let validCaptcha = this.validCaptcha;

        if (!validCaptcha) {
        	this.changeValidCaptchaTo(true);
        }
    }

    //检查手机号是否占用
    @action
    queryHasPhone() {
        let phone = this.phone;

        if (!phone || phone.length !== 11) {
            this.hasPhone = false;
            return;
        }

        queryPhone(phone)
            .then((data) => {
                if (data.status == 200) {
                    this.hasPhone = false; // 可用，未被占用
                } else {
                    this.hasPhone = true;
                }
            })
    }

    @action
    fetchPicCaptcha = () => {

        fetchPicCaptcha()
            .then((data) => {
                console.log(data);
                this.captcha = 'data:image/png;base64,' + data.attachment.IMGCode;
                this.codeid = data.attachment.codeUUID;
            })
    }

    @action
    sendEmailForRegister = () => {
        let mode = this.registerMode;
        let account = mode == 'email' ? this.email : this.phone;

        return sendEmailForRegister({
        	account, 
        	imgcode: this.imgcode, 
        	codeid: this.codeid
        });
    }

    @action 
    userRegister = ()=>{
    	let account = this.registerMode == 'email' ? this.email : `${this.areaCode}${this.phone}`;

    	return userRegister({
    		account: account,
	        pwd: this.pwd,
	        vercode: this.vercode,
	        inviteId: this.inviteId,
	        imgcode: this.imgcode,
	        codeid: this.codeid
        });
    }
}

export default RegisterStore;