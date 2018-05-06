import { message } from 'antd';
import { sendEmailForRegister, resetPwd, userRegister, queryPhone, userLogin } from '../../stores/api';
import { browserHistory } from 'react-router';
import Timer from '../../lib/timer';

export default (store) => {
    return {
        onChangeMode(mode) {
            store.changeModeTo(mode);
        },

        onAreaCodeChange(e) {
            let value = e.currentTarget.value.trim();

            store.setAreaCode(value);
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

        onChangeInviteCode(e) {
            let value = e.currentTarget.value.trim();

            store.setInviteCode(value);
        },

        onChangeAgreeCheckBox(e) {

            let checked = e.currentTarget.checked == true;
            store.setAgress(checked);
        },

        changeSendingCodeTo(status) {
            store.changeSendingCodeTo(status);
        },

        getImgCaptcha() {
            return store.captchaStore.fetch();
        },

        // 验证用户信息
        sendVercode() {
            let { verifyInfoBeforeSendCode } = store;

            //  验证表单信息
            if (!verifyInfoBeforeSendCode.pass) {
                message.error(verifyInfoBeforeSendCode.message);
                return;
            }

            if (store.sendingcode) {
                return;
            }
            // 发送手机／邮件验证码
            sendEmailForRegister({
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
                            this.changeSendingCodeTo(false);
                        });

                        this.changeSendingCodeTo(true);
                        store.changeImgCodeTo(true);
                        store.changeValidVercodeTo(true);

                        break;
                    case 412:
                        // 图片验证码错误
                        message.error(data.message);
                        store.changeImgCodeTo(false);
                        this.getImgCaptcha();
                        break;
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
                    default:
                        // 其他错误
                        message.error(data.message);
                        this.getImgCaptcha();
                }
            })
        },

        submitRegister() {
            let { verifyInfoBeforeSubmit } = store;

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
                        message.success(UPEX.lang.template('成功，将跳转登录页面'));
                        browserHistory.push('/login');
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
                        store.changeHasPhoneTo(true);
                    }
                })
        },

        checkUser() {
            if (store.email && store.pwd && store.imgcode) {
                return true;
            } else {
                return false;
            }
        },

        userLogin() {
            return userLogin({
                email: store.account,
                pwd: store.pwd,
                imgcode: store.imgcode,
                codeid: store.codeid
            }).then((data) => {

                switch (data.status) {
                    case 200:
                        authStore.update({
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
            });
        },

        destroyTimer() {
            this.timer && this.timer.destroy();
        }
    }
}