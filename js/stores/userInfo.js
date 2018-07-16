import { observable, action, computed } from 'mobx';
import {  browserHistory } from 'react-router';
import {
    personalInfo,
    loginRecord,
    sendCodeInUserCenter,
    bindFdPwd,
    resetPwdInUserCenter,
    bindPhoneSendMsg,
    getSecretKey,
    addAsk,
    getQuestions,
    submitUserInfo,
    bindGoogleAuth,
    closeGoogleAuth,
    selectAuthLevel,
    bindPhone,
    bindPhoneOrEmailSendCode,
    isUsedGoogleAuth,
    bindPhoneOrEmailAction,
    modifyPhoneSendMsg,
    modifyPhoneAction,
    phoneAuthSwitch,
    updateFdPwdEnabled,
    bindVerifyCardInfo,
    getBindBankCardInfo,
    forgetFdPwd,
    questionDetail,
    phoneAuthSendCode,
    submitKycC,
    modifyFdPwd,
    updateBindBankCardStatus,
    deleteBindBankCardRecord,
    sendMessageWithdraw
} from '../api/http';
import { message } from 'antd';

const pickErrMsg = (res, name) => {
    const statusMap = [0, 9999];
    if (statusMap.indexOf(res.status) !== -1) {
        console.error(`${name} error: ${res.message}`);
        browserHistory.push('/login');
    } else {
        message.error(res.message);
    }
};

class UserInfo {
    @observable submit_loading = false;
    @observable submit_loading_pwd = false;
    @observable submit_loading_tpwd = false;
    @observable showCountDown = false;
    @observable userInfo = {};
    @observable isFetchingInfo = true;
    @observable loginRecord = [];
    @observable
    identityInfo = {
        firstName: '',
        secondName: '',
        birthday: '',
        idType: '',
        idNumber: '',
        resortType: '',
        resortTypeOther: '',
        address: '',
        postCode: '',
        profession: '',
        annualsalary: ''
    };
    @observable gaSecretKey = {};
    @observable gaBindSuccess = false;
    @observable
    questionsLsit = {
        list: []
    };
    @observable bankCardList = [];
    @observable
    questionObj = {
        list: [],
        question: {
            detail: '',
            urlkey: ''
        }
    };

    constructor(stores) {
        this.captchaStore = stores.captchaStore;
    }

    @action
    async getUserInfo() {
        this.isFetchingInfo = true;
        const res = await personalInfo();
        this.userInfo = res.attachment;
        this.isFetchingInfo = false;
    }
    /**
     * 安全等级
     */
    @computed
    get authLevel() {
        let level = '';

        if (this.userInfo) {
            switch (this.userInfo.authLevel) {
                case 1:
                    level = 'A';
                    break;
                case 2:
                    level = 'B';
                    break;
                case 3:
                    level = 'C';
                    break;
                default:
                    level = '';
            }
        }

        return level;
    }

    @action
    async getLoginRecord() {
        const res = await loginRecord();
        this.loginRecord = res.attachment;
    }

    @action
    pwdTriggerClear() {
        this.userInfo = {};
        this.identityInfo = {
            firstName: '',
            secondName: '',
            birthday: '',
            idType: '',
            idNumber: '',
            resortType: '',
            resortTypeOther: '',
            address: '',
            postCode: '',
            profession: '',
            annualsalary: ''
        };
    }

    @action
    addIdentityInfo(data) {
        this.identityInfo.firstName = data.firstName;
        this.identityInfo.secondName = data.secondName;
        this.identityInfo.birthday = data.birthday;
        this.identityInfo.idType = data.idType;
        this.identityInfo.idNumber = data.idNumber;
        (this.identityInfo.resortType = data.resortType),
            (this.identityInfo.resortTypeOther = data.resortTypeOther),
            (this.identityInfo.address = data.address),
            (this.identityInfo.postCode = data.postCode),
            (this.identityInfo.profession = data.profession),
            (this.identityInfo.annualsalary = data.annualsalary);
    }

    @action
    async sendCode(type, imgCode, imgCodeId) {
        const res = await sendCodeInUserCenter(type, imgCode, imgCodeId);
        if (res.status !== 200) {
            console.error('sendCode error');
        } else {
            this.showCountDown = true;
        }

        return res;
    }

    @action
    async bindSendCode(imgCode, imgCodeId, type, phone) {
        const res = await bindPhoneSendMsg(imgCode, imgCodeId, type, phone);
        if (res.status !== 200) {
            console.error('bindSendCode error');
        }

        return res;
    }

    @action
    async bindTradingPwd(newFdPassWord, vercode, imgCode, imgCodeId, passWord) {
        let reqResult = false;
        try {
            this.submit_loading_tpwd = true;
            const res = await bindFdPwd(newFdPassWord, vercode, imgCode, imgCodeId, passWord);
            this.submit_loading_tpwd = false;
            if (res.status !== 200) {
                if (res.status === 412) {
                    this.captchaStore.fetch();
                }
                pickErrMsg(res, 'bindTradingPwd');
            } else {
                reqResult = true;
                this.getUserInfo();
                message.success(UPEX.lang.template('设置成功'));
            }
        } catch (e) {
            console.error(e);
            this.submit_loading_tpwd = false;
            message.error('Network Error');
        }
        return reqResult;
    }

    @action
    async resetPwd(newPassWord, vercode, imgCode, imgCodeId, passWord, type) {
        let reqResult = false;
        try {
            this.submit_loading_pwd = true;
            const res = await resetPwdInUserCenter(newPassWord, vercode, imgCode, imgCodeId, passWord, type);
            this.submit_loading_pwd = false;
            if (res.status !== 200) {
                if (res.status === 412) {
                    this.captchaStore.fetch();
                }
                pickErrMsg(res, 'resetPwd');
            } else {
                reqResult = true;
                message.success(UPEX.lang.template('登录密码修改成功，请重新登录'));
            }
        } catch (e) {
            console.error(e);
            this.submit_loading_pwd = false;
            message.error('Network Error');
        }
        return reqResult;
    }

    @action
    async getGaSecretKey() {
        try {
            const res = await getSecretKey();
            this.gaSecretKey = res.attachment;
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async ask(detail, urlkey) {
        let result = false;
        try {
            this.submit_loading = true;
            const res = await addAsk(detail, urlkey);
            this.submit_loading = false;
            if (res.status !== 200) {
                pickErrMsg(res, 'ask');
            } else {
                result = true;
                message.success(UPEX.lang.template('问题反馈成功'));
            }
        } catch (e) {
            console.error(e);
            this.submit_loading = false;
            message.error('Network Error');
        }
        return result;
    }

    @action
    async questions(page) {
        try {
            const res = await getQuestions(page);
            this.questionsLsit = res.attachment || {};
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async identityAuthentication(info) {
        try {
            const res = await submitUserInfo(info);
            if (res.status === 200) {
                this.getUserInfo();
                return res;
            } else {
                if (res.status === 2006) {
                    message.error(UPEX.lang.template('提交身份证已存在'));
                } else {
                    pickErrMsg(res, 'identityAuthentication');
                }
                return res;
            }
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async bindGA(clientPassword, verCode) {
        try {
            this.submit_loading = true;
            const res = await bindGoogleAuth(clientPassword, verCode);
            this.submit_loading = false;
            if (res.status === 200) {
                this.gaBindSuccess = true;
                this.getUserInfo();
                message.success(UPEX.lang.template('绑定成功'));
            } else {
                pickErrMsg(res, 'bindGA');
            }
        } catch (e) {
            this.submit_loading = false;
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async rmBindGA(clientPassword, verCode) {
        let result = false;
        try {
            this.submit_loading = true;
            const res = await closeGoogleAuth(clientPassword, verCode);
            this.submit_loading = false;
            if (res.status === 200) {
                result = true;
                this.gaBindSuccess = false;
                message.success(UPEX.lang.template('解除绑定成功'));
            } else {
                pickErrMsg(res, 'rmBindGA');
            }
        } catch (e) {
            this.submit_loading = false;
            console.error(e);
            message.error('Network Error');
        }
        return result;
    }

    @action
    async authInfo() {
        try {
            const res = await selectAuthLevel();
            if (res.data.status === 200) {
                console.log(res.data, 'data');
            } else {
                pickErrMsg(res.data, 'authInfo');
            }
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async modifyPhone(newPhone, oldPhone, oldVercode, vercode) {
        try {
            const res = await bindPhone(newPhone, oldPhone, oldVercode, vercode);
            if (res.status === 200) {
                console.log(res.data, 'data');
            } else {
                pickErrMsg(res, 'modifyPhone');
            }
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async bindPESendCode(codeid, imgcode, phoneOrEmail, type) {
        try {
            const res = await bindPhoneOrEmailSendCode(codeid, imgcode, phoneOrEmail, type);
            return res;
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async isGoogleAuth() {
        try {
            const res = await isUsedGoogleAuth();
            if (res.status === 200) {
                this.gaBindSuccess = res.attachment.isUsed === 1;
            } else {
                pickErrMsg(res, 'isGoogleAuth');
            }
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async bindPEAction(EmailCode, phoneCode, phoneOrEmail, type) {
        try {
            this.submit_loading = true;
            const res = await bindPhoneOrEmailAction(EmailCode, phoneCode, phoneOrEmail, type);
            this.submit_loading = false;
            if (res.status === 200) {
                message.success(UPEX.lang.template('绑定成功'));
                if (type === 1) {
                    browserHistory.push('/user/emailSuccess');
                } else if (type === 2) {
                    browserHistory.push('/user/phoneSuccess');
                }
            } else {
                pickErrMsg(res, 'bindPEAction');
            }
        } catch (e) {
            this.submit_loading = false;
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async mPhoneSendMsg(phone, codeid, imgcode, type) {
        try {
            const res = await modifyPhoneSendMsg(phone, codeid, imgcode, type);
            return res;
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async newModifyPhone(newCode, newPhone, oldCode, type) {
        let result = false;
        try {
            this.submit_loading = true;
            const res = await modifyPhoneAction(newCode, newPhone, oldCode, type);
            this.submit_loading = false;
            if (res.status === 200) {
                result = true;
                message.success(UPEX.lang.template('修改成功'));
            } else {
                const msgMap = {
                    '5558': UPEX.lang.template('请填写正确的Google验证码'),
                    '405': UPEX.lang.template('请填写正确的原手机短信验证码'),
                    '403': UPEX.lang.template('请填写正确的新手机短信验证码')
                };
                let tempMsg;
                tempMsg = msgMap[res.status] || res.message;
                if(res.status === 0 || res.status === 9999) {
                    pickErrMsg(res, 'newModifyPhone');
                } else {
                    message.error(tempMsg);
                }
            }
        } catch (e) {
            this.submit_loading = false;
            console.error(e);
            message.error('Network Error');
        }
        return result;
    }

    @action
    async phoneSwitch(smsCode, status) {
        let result = false;
        try {
            this.submit_loading = true;
            const res = await phoneAuthSwitch(smsCode, status);
            this.submit_loading = false;
            if (res.status === 200) {
                result = true;
                message.success(UPEX.lang.template('修改成功'));
            } else {
                pickErrMsg(res, 'phoneSwitch');
            }
        } catch (e) {
            this.submit_loading = false;
            console.error(e);
            message.error('Network Error');
        }
        return result;
    }

    @action
    async fdPwdSwitch(fdPwd, enabled) {
        let result = false;
        try {
            this.submit_loading = true;
            const res = await updateFdPwdEnabled(fdPwd, enabled);
            this.submit_loading = false;
            if (res.status === 200) {
                result = true;
                this.getUserInfo();
                message.success(UPEX.lang.template('修改成功'));
            } else {
                pickErrMsg(res, 'fdPwdSwitch');
            }
        } catch (e) {
            this.submit_loading = false;
            console.error(e);
            message.error('Network Error');
        }
        return result;
    }

    @action
    async bindVerifyCard(cardNo, userName, openBank, branchNo, branchName, tradePwd, imgUrl) {
        let result = false;
        try {
            this.submit_loading = true;
            const res = await bindVerifyCardInfo(cardNo, userName, openBank, branchNo, branchName, tradePwd, imgUrl);
            this.submit_loading = false;
            if (res.status === 200) {
                result = true;
                this.bankCardInfo();
                message.success(UPEX.lang.template('绑定成功'));
            } else {
                pickErrMsg(res, 'bindVerifyCard');
            }
        } catch (e) {
            this.submit_loading = false;
            console.error(e);
            message.error('Network Error');
        }
        return result;
    }

    @action
    async bankCardInfo() {
        try {
            const res = await getBindBankCardInfo();
            this.bankCardList = res.attachment || [];
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async forgetTradingPwd(newPwd, vercode, imgCode, imgCodeId, type) {
        let reqResult = false;
        try {
            this.submit_loading = true;
            const res = await forgetFdPwd(newPwd, vercode, imgCode, imgCodeId, type);
            this.submit_loading = false;
            if (res.status === 200) {
                reqResult = true;
                message.success(UPEX.lang.template('修改成功'));
            } else {
                pickErrMsg(res, 'forgetTradingPwd');
            }
        } catch (e) {
            this.submit_loading = false;
            console.error(e);
            message.error('Network Error');
        }
        return reqResult;
    }

    @action
    async questionDetails(id) {
        try {
            const res = await questionDetail(id);
            this.questionObj = res.attachment;
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async phAuthSendCode(type) {
        try {
            const res = await phoneAuthSendCode(type);
            return res;
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async kycC() {
        let result = true;
        try {
            this.submit_loading = true;
            const res = await submitKycC();
            this.submit_loading = false;
            if (res.status === 200) {
                result = true;
                message.success(UPEX.lang.template('申请成功'));
            } else {
                if (res.status === 41731) {
                    message.error(UPEX.lang.template('您的条件尚不符合提额条件'));
                } else {
                    pickErrMsg(res, 'kycC');
                }
            }
        } catch (e) {
            this.submit_loading = false;
            console.error(e);
            message.error('Network Error');
        }
        return result;
    }

    @action
    async modifytradingPwd(newFdPassWord, passWord) {
        let reqResult = false;
        try {
            this.submit_loading_tpwd = true;
            const res = await modifyFdPwd(newFdPassWord, passWord);
            this.submit_loading_tpwd = false;
            if (res.status !== 200) {
                pickErrMsg(res, 'modifytradingPwd');
            } else {
                reqResult = true;
                message.success(UPEX.lang.template('修改成功'));
            }
        } catch (e) {
            console.error(e);
            this.submit_loading_tpwd = false;
            message.error('Network Error');
        }
        return reqResult;
    }

    @action
    async updateBindBankCard(id, tradePwd, gAuth, phoneCode) {
        try {
            const res = await updateBindBankCardStatus(id, tradePwd, gAuth, phoneCode);
            if (res.status !== 200) {
                pickErrMsg(res, 'updateBindBankCard');
            } else {
                message.success(UPEX.lang.template('解绑成功'));
            }
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async deleteBindBankCard(id) {
        try {
            const res = await deleteBindBankCardRecord(id);
            if (res.status !== 200) {
                pickErrMsg(res, 'deleteBindBankCard');
            } else {
                this.bankCardInfo();
                message.success(UPEX.lang.template('删除成功'));
            }
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }

    @action
    async sendMessageBankAndWithdraw(vercode, codeid) {
        try {
            const res = await sendMessageWithdraw(vercode, codeid);
            return res;
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
    }
}

export default UserInfo;
