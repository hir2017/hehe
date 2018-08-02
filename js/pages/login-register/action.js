import { message } from 'antd';
import { sendEmailForRegister, sendMail, resetPwd, userRegister, queryPhone, userLogin, userLogin2, sendLoginCodeSend } from '../../api/http';
import { browserHistory } from 'react-router';
import Timer from '../../lib/timer';
import md5 from '../../lib/md5';

export default (store) => {
    return {
        onChangeMode(mode) {
            store.changeModeTo(mode);
        },

        onAreaCodeChange(code, e) {
            store.setAreaCode(code);
        },

        onChangeEmail(e) {
            let value = e.currentTarget.value.trim();
            
            // 不允许输入汉字
            value = value.replace(UPEX.config.replaceHZReg, '');
            
            store.setEmail(value);
        },

        onBlurEmail(e){
            store.checkValidEmail();
        },

        onChangePhone(e) {
            let value = e.currentTarget.value.trim();
            
            // 替换所有的非数字
            value = value.replace(UPEX.config.replaceNaNReg, '');

            store.setPhone(value);
        },


        // onChangeImgCode(e) {
        //     let value = e.currentTarget.value.trim();

        //     // store.changeValidImgCodeTo(true);
        //     // store.setImgCode(value);
        // },

        onChangeGoogleCode(e) {
            let value = e.currentTarget.value.trim();

            store.setGoogleCode(value);
        },

        onChangePwd(e) {
            let value = e.currentTarget.value.trim();

            store.setPasswrod(value);
        },

        onBlurPwd(e){
            store.checkValidPwd();
        },

        onChangeTwicePwd(e) {
            let value = e.currentTarget.value.trim();

            store.setTwicePasswrod(value);
        },

        onBlurTwicePwd(e){
            store.checkValidTwicePwd();
        },

        onChangeVercode(e) {
            let value = e.currentTarget.value.trim();

            store.changeValidVercodeTo(true);
            store.setVercode(value);
        },

        onChangeLoginVerCode(e) {
            let value = e.currentTarget.value.trim();

            store.setLoginPhoneCode(value);
        },

        onChangeInviteCode(e) {
            let value = e.currentTarget.value.trim();

            store.setInviteCode(value);
        },

        onChangeAgreeCheckBox(e) {
            store.setAgress(e.target.checked);
        },

        // bugfixed 自动获取焦点之后，鼠标光标没有在最后
        moveCaretAtEnd(e) {
            var temp_value = e.target.value
            e.target.value = ''
            e.target.value = temp_value;
        },

        verifyInfoBeforeSendCode() {
            let { verifyInfoBeforeSendCode } = store;

            //  验证表单信息
            if (!verifyInfoBeforeSendCode.pass) {
                message.destroy();
                verifyInfoBeforeSendCode.message && message.error(verifyInfoBeforeSendCode.message);
                return false;
            }
            
            if (store.disabledCodeBtn) {
                return false;
            }

            return true;
        },

        // 注册的时候，发送短信验证码和邮箱验证码
        sendVercode(type, validate, captchaId) {
            let { updateSending } = store;

            updateSending(true);

            let fetchFn = type == 'resetpwd' ? sendMail : sendEmailForRegister;
            
            // 发送手机／邮件验证码
            fetchFn({
                account: store.account,
                validate: validate,
                captchaId: captchaId
            }).then((data) => {
                updateSending(false);

                switch (data.status) {
                    case 200:
                        // 发送成功
                        store.disabledSMSOrPhoneCode(true);
                        // store.changeValidImgCodeTo(true);
                        store.changeValidVercodeTo(true);

                        let timer = this.timer = new Timer({
                            remainTime: 60,
                            isDoubleBit: true,
                            selector: {
                                second: '[data-second]'
                            }
                        });

                        this.timer.on('end', () => {
                            store.disabledSMSOrPhoneCode(false);
                        });
                        break;
                    case 412:
                        // 图片验证码错误
                        message.error(data.message);
                        // store.changeValidImgCodeTo(false);
                        break;
                    case 414: // 邮箱已经绑定
                    default:
                        // 其他错误
                        message.error(data.message);
                }
            }).catch(()=>{
                updateSending(false);
                return false;
            })
        },

        submitResetPwd() {
            let { verifyInfoBeforeSubmit, updateSubmiting } = store;

            //  验证表单信息
            if (!verifyInfoBeforeSubmit.pass) {
                message.destroy();
                message.error(verifyInfoBeforeSubmit.message);
                return;
            }

            if (store.submiting) {
                return;
            }

            updateSubmiting(true);

            return resetPwd({
                account: store.account,
                pwd: store.pwd,
                vercode: store.vercode
            }).then((data) => {
                let result = false;
                updateSubmiting(false);

                switch (data.status) {
                    case 200:
                        result = true;
                        // message.success(UPEX.lang.template('成功，将跳转登录页面'));

                        setTimeout(() => {
                            browserHistory.push('/login');
                        }, 100)

                        break;
                    case 403:
                        // 邮箱或者手机验证码错误
                        message.error(data.message);
                        store.changeValidVercodeTo(false);
                        break;
                    case 402: // 验证码过期
                    default:
                        // 其他错误
                        message.error(data.message);
                }
            }).catch(()=>{
                updateSubmiting(false);
                return false;
            })
        },

        submitRegister() {
            let { verifyInfoBeforeSubmit, updateSubmiting } = store;
            //  验证表单信息
            if (!verifyInfoBeforeSubmit.pass) {
                message.destroy();
                message.error(verifyInfoBeforeSubmit.message);
                return;
            }

            if (!store.agree) {
                return;
            }

            if (store.submiting) {
                return;
            }

            updateSubmiting(true);

            userRegister({
                account: store.account,
                pwd: store.pwd,
                vercode: store.vercode,
                inviteId: store.inviteId
            }).then((data) => {
                updateSubmiting(false);

                switch (data.status) {
                    case 200:
                        store.disabledSMSOrPhoneCode(false);
                        message.success(UPEX.lang.template('成功，将跳转登录页面'));

                        setTimeout(() => {
                            browserHistory.push('/login');
                        }, 100)

                        break;
                    case 403:
                        store.changeValidVercodeTo(false);
                        break;
                    default:
                        message.error(data.message);
                        break;
                }
            }).catch(() => {
                updateSubmiting(false);
            })
        },

        queryHasPhone() {
            let phone = store.phone;

            if (!store.checkValidPhone()){
                return;
            }

            if (!phone || phone.length !== 11) {
                store.changeHasPhoneTo(false);
                return;
            }

            queryPhone(store.areaCode + store.phone)
                .then((data) => {
                    if (data.status == 200) {
                        // 可用，未被占用
                        store.changeHasPhoneTo(false);
                    } else {
                        message.error(data.message);
                        store.changeHasPhoneTo(true);
                    }
                })
        },

        checkUser() {
            let { verifyInfoBeforeLogin } = store;

            //  验证表单信息
            if (verifyInfoBeforeLogin.pass) {
                return true;
            } else {
                return verifyInfoBeforeLogin.message;
            }
        },

        checkUser2(type) {
            if (type == 'phone') {
                if (store.phonecode) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (store.googlecode) {
                    return true;
                } else {
                    return false;
                }
            }

        },

        userLogin(validate, captchaId) {
            const { updateSubmiting } = store;

            if (store.submiting) {
                return;
            }

            updateSubmiting(true);

            return userLogin({
                email: store.account,
                pwd: md5(store.pwd + UPEX.config.salt),
                validate: validate,
                captchaId: captchaId,
            }).then((data) => {
                updateSubmiting(false);

                switch (data.status) {
                    case 200:
                        store.authStore.update({
                            uid: data.attachment.uid,
                            token: data.attachment.token
                        });
                        break;
                    case 5555:
                        break;
                    default:
                        // do something
                }

                return data;
            }).catch(() => {
                updateSubmiting(false);
            })
        },

        userLogin2(type) {
            const { updateSubmiting } = store;
            let authType = 0;
            let vercode = '';

            switch (type) {
                case 'google':
                    authType = 1;
                    vercode = store.googlecode;
                    break;
                case 'phone':
                    authType = 2;
                    vercode = store.phonecode;
                    break;
                case 'email':
                    authType = 3;
                    break;
            }

            if (store.submiting) {
                return;
            }

            updateSubmiting(true);

            return userLogin2({
                authType,
                emailOrPhone: store.account,
                clientPassword: vercode,
            }).then((data) => {
                updateSubmiting(false);

                switch (data.status) {
                    case 200:
                        store.authStore.update({
                            uid: data.attachment.uid,
                            token: data.attachment.token
                        });
                        break;
                    case 5558:  // 谷歌密碼輸入有誤
                    case 20104: // 谷歌密碼輸入有誤
                    default:
                        // message.error(data.message);
                }

                return data;
            }).catch(()=>{
                updateSubmiting(false);
            })
        },
        /**
         * 发送手机验证码
         */
        sendLoginCodeSend() {
            let { disabledCodeBtn, updateSending } = store;
            
            if (disabledCodeBtn) {
                return;
            }

            updateSending(true);

            // 发送手机／邮件验证码
            sendLoginCodeSend({
                authType: 1,
                emailOrPhone: store.account,
            }).then((data) => {
                updateSending(false);

                switch (data.status) {
                    case 200:
                        // 发送成功
                        store.disabledSMSOrPhoneCode(true);

                        let timer = this.timer2 = new Timer({
                            remainTime: 60,
                            isDoubleBit: true,
                            selector: {
                                second: '[data-second]'
                            }
                        });

                        this.timer2.on('end', () => {
                            store.disabledSMSOrPhoneCode(false);
                        });
                        break;
                    case 412:
                        // 图片验证码错误
                        message.error(data.message);
                        break;
                    default:
                        // 其他错误
                        message.error(data.message);
                }
            }).catch(()=>{
                updateSending(false);
                return false;
            })
        },

        destroy() {
            this.timer && this.timer.destroy();
            this.timer2 && this.timer2.destroy();
            store.reset();
        }
    }
}
