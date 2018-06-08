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

            store.setEmail(value);
        },
        onChangePhone(e) {
            let value = e.currentTarget.value.trim();

            store.setPhone(value);
        },
        onChangeImgCode(e) {
            let value = e.currentTarget.value.trim();

            store.changeImgCodeTo(true);
            store.setImgCode(value);
        },

        onChangeGoogleCode(e){
            let value = e.currentTarget.value.trim();

            store.setGoogleCode(value);
        },

        onChangePwd(e) {
            let value = e.currentTarget.value.trim();

            store.setPasswrod(value);
        },

        onChangeTwicePwd(e) {
            let value = e.currentTarget.value.trim();

            store.setTwicePasswrod(value);
        },

        onChangeVercode(e) {
            let value = e.currentTarget.value.trim();

            store.changeValidVercodeTo(true);
            store.setVercode(value);
        },

        onChangeLoginVerCode(e){
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

        getImgCaptcha() {
            return store.captchaStore.fetch();
        },

        // 验证用户信息
        sendVercode(type) {
            let { verifyInfoBeforeSendCode } = store;

            //  验证表单信息
            if (!verifyInfoBeforeSendCode.pass) {
                message.error(verifyInfoBeforeSendCode.message);
                return;
            }

            if (store.sendingcode) {
                return;
            }

            let fetchFn = type == 'resetpwd' ? sendMail : sendEmailForRegister;
            
            // 发送手机／邮件验证码
            fetchFn({
                account: store.account,
                imgcode: store.imgcode,
                codeid: store.codeid
            }).then((data) => {
                switch (data.status) {
                    case 200:
                        // 发送成功
                        let timer = this.timer = new Timer({
                            remainTime: 60,
                            isDoubleBit: true,
                            selector: {
                                second: '[data-second]'
                            }
                        });

                        this.timer.on('end', () => {
                            store.changeSendingCodeTo(false);
                        });

                        store.changeSendingCodeTo(true);
                        store.changeImgCodeTo(true);
                        store.changeValidVercodeTo(true);

                        break;
                    case 412:
                        // 图片验证码错误
                        message.error(data.message);
                        store.changeImgCodeTo(false);
                        this.getImgCaptcha();
                        break;
                    case 414: // 邮箱已经绑定
                    default:
                        // 其他错误
                        message.error(data.message);
                        this.getImgCaptcha();
                }
            });
        },

        submitResetPwd() {
            let { verifyInfoBeforeSubmit } = store;

            //  验证表单信息
            if (!verifyInfoBeforeSubmit.pass) {
                message.error(verifyInfoBeforeSubmit.message);
                return;
            }

            resetPwd({
                account: store.account,
                pwd: store.pwd,
                vercode: store.vercode,
                imgcode: store.imgcode,
                codeid: store.codeid
            }).then((data) => {
                switch (data.status) {
                    case 200:
                        message.success(UPEX.lang.template('成功，将跳转登录页面'));

                        setTimeout(() => {
                            browserHistory.push('/login');
                        }, 100)

                        break;
                    case 403:
                        // 邮箱或者手机验证码错误
                        message.error(data.message);
                        store.changeValidVercodeTo(false);
                        this.getImgCaptcha();
                        break;
                    case 402: // 验证码过期
                    default:
                        // 其他错误
                        message.error(data.message);
                        this.getImgCaptcha();
                }
            })
        },

        submitRegister() {
            let { verifyInfoBeforeSubmit , updateLogining } = store;
            //  验证表单信息
            if (!verifyInfoBeforeSubmit.pass) {
                message.error(verifyInfoBeforeSubmit.message);
                return;
            }

            if (!store.agree) {
                return;
            }

            userRegister({
                account: store.account,
                pwd: store.pwd,
                vercode: store.vercode,
                inviteId: store.inviteId,
                imgcode: store.imgcode,
                codeid: store.codeid
            }).then((data) => {
                
                switch (data.status) {
                    case 200:
                        store.changeSendingCodeTo(false);
                        message.success(UPEX.lang.template('成功，将跳转登录页面'));
                       
                        setTimeout(() => {
                            browserHistory.push('/login');
                        }, 100)

                        break;
                    case 403:
                        store.changeValidVercodeTo(false);
                        this.getImgCaptcha();
                        break;
                    default:
                        message.error(data.message);
                        this.getImgCaptcha();
                        break;
                }
            }).catch(()=>{

            })
        },

        queryHasPhone() {
            let phone = store.phone;

            if (!phone || phone.length !== 11) {
                store.changeHasPhoneTo(false);
                return;
            }

            queryPhone(phone)
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
            if (store.account && store.pwd && store.imgcode) {
                return true;
            } else {
                return false;
            }
        },

        checkUser2(type){
            if (type == 'phone') {
                if (store.phonecode) {
                    return true;
                } else {
                    return false;
                } 
            } else{
                if (store.googlecode) {
                    return true;
                } else {
                    return false;
                }
            }
           
        },

        userLogin() {
            const { updateLogining } = store;
            
            updateLogining(true);

            return userLogin({
                email: store.account,
                pwd: md5(store.pwd + UPEX.config.salt),
                imgcode: store.imgcode,
                codeid: store.codeid
            }).then((data) => {
                updateLogining(false);

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
                        this.getImgCaptcha();
                }

                return data;
            }).catch(()=>{
                updateLogining(false);
            })
        },

        userLogin2(type) {
            let authType = 0;
            let vercode = '';

            switch(type) {
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
            return userLogin2({
                authType,
                emailOrPhone: store.account,
                clientPassword: vercode,
            }).then((data) => {
                switch (data.status) {
                    case 200:
                        store.authStore.update({
                            uid: data.attachment.uid,
                            token: data.attachment.token
                        });
                        break;
                    default:
                        message.error(data.message);
                }

                return data;
            });
        },
        /**
         * 发送验证码
         */
        sendLoginCodeSend() {
            // 发送手机／邮件验证码
            sendLoginCodeSend({
                authType: 1,
                emailOrPhone: store.account,
            }).then((data) => {
                switch (data.status) {
                    case 200:
                        // 发送成功
                        let timer = this.timer2 = new Timer({
                            remainTime: 60,
                            isDoubleBit: true,
                            selector: {
                                second: '[data-second]'
                            }
                        });

                        this.timer2.on('end', () => {
                            store.changeSendingPhoneCodeTo(false);
                        });

                        store.changeSendingPhoneCodeTo(true);

                        break;
                    case 412:
                        // 图片验证码错误
                        message.error(data.message);
                        break;
                    default:
                        // 其他错误
                        message.error(data.message);
                }
            });
        },

        destroy() {
            this.timer && this.timer.destroy();
            this.timer2 && this.timer2.destroy();
            store.reset();
        }
    }
}