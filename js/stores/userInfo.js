import { observable, action, computed} from 'mobx';
import { hashHistory, browserHistory } from 'react-router';
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
    submitKycC
} from '../api/http'
import { message } from 'antd'

class UserInfo {
    @observable submit_loading = false
    @observable submit_loading_pwd = false
    @observable submit_loading_tpwd = false
    @observable showCountDown = false
    @observable userInfo = {};
    @observable isFetchingInfo = true;
    @observable loginRecord = []
    @observable identityInfo = {
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
    }
    @observable gaSecretKey = {}
    @observable gaBindSuccess = false
    @observable questionsLsit = {
        list: []
    }
    @observable bankCardList = []

    constructor(stores) {
        this.captchaStore = stores.captchaStore;
    }

    @action
    async getUserInfo() {
        this.isFetchingInfo = true;
        const res = await personalInfo()
        this.userInfo = res.attachment;
        this.isFetchingInfo = false;
    }
    /**
     * 安全等级
     */
    @computed
    authLevel() {
        if (this.userInfo.authLevel == 3) {
            return 'C';
        } else if (this.userInfo.authLevel == 2) {
            return 'B';
        } else if (this.userInfo.authLevel == 1) {
            return 'A';
        } else {
            return '';
        }
    }

    @action
    async getLoginRecord() {
        const res = await loginRecord()
        this.loginRecord = res.attachment
    }

    @action
    addIdentityInfo(data) {
        this.identityInfo.firstName = data.firstName
        this.identityInfo.secondName = data.secondName
        this.identityInfo.birthday = data.birthday
        this.identityInfo.idType = data.idType
        this.identityInfo.idNumber = data.idNumber
        this.identityInfo.resortType = data.resortType,
        this.identityInfo.resortTypeOther = data.resortTypeOther,
        this.identityInfo.address = data.address,
        this.identityInfo.postCode = data.postCode,
        this.identityInfo.profession = data.profession,
        this.identityInfo.annualsalary = data.annualsalary
    }

    @action
    async sendCode(type, imgCode, imgCodeId) {
        const res = await sendCodeInUserCenter(type, imgCode, imgCodeId)
        if (res.status !== 200) {
            console.error('sendCode error')
        } else {
            this.showCountDown = true
        }

        return res
    }

    @action
    async bindSendCode(imgCode, imgCodeId, type, phone) {
        const res = await bindPhoneSendMsg(imgCode, imgCodeId, type, phone)
        if (res.status !== 200) {
            console.error('bindSendCode error')
        }

        return res
    }

    @action
    async bindTradingPwd(newFdPassWord, vercode, imgCode, imgCodeId, passWord) {
        try {
            this.submit_loading_tpwd = true
            const res = await bindFdPwd(newFdPassWord, vercode, imgCode, imgCodeId, passWord)
            this.submit_loading_tpwd = false
            if (res.status !== 200) {
                if (res.status === 412) {
                    this.captchaStore.fetch()
                }
                message.error(res.message)
                console.error('bindTradingPwd error')
            } else {
                this.getUserInfo()
                message.success(UPEX.lang.template('设置成功'))
            }
        } catch (e) {
            console.error(e)
            this.submit_loading_tpwd = false
            message.error('Network Error')
        }
    }

    @action
    async resetPwd(newPassWord, vercode, imgCode, imgCodeId, passWord, type) {
        try {
            this.submit_loading_pwd = true
            const res = await resetPwdInUserCenter(newPassWord, vercode, imgCode, imgCodeId, passWord, type)
            this.submit_loading_pwd = false
            if (res.status !== 200) {
                if (res.status === 412) {
                    this.captchaStore.fetch()
                }
                message.error(res.message)
                console.error('resetPwd error')
            } else {
                message.success(UPEX.lang.template('登录密码修改成功，请从新登录'))
            }
        } catch (e) {
            console.error(e)
            this.submit_loading_pwd = false
            message.error('Network Error')
        }
    }

    @action
    async getGaSecretKey() {
        try {
            const res = await getSecretKey()
            this.gaSecretKey = res.attachment
        } catch (e) {
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async ask(detail, urlkey) {
        try {
            this.submit_loading = true
            const res = await addAsk(detail, urlkey)
            this.submit_loading = false
            if (res.status !== 200) {
                message.error(res.message)
                console.error('ask error')
            } else {
                message.success(UPEX.lang.template('问题反馈成功'))
            }
        } catch (e) {
            console.error(e)
            this.submit_loading = false
            message.error('Network Error')
        }
    }

    @action
    async questions(page) {
        try {
            const res = await getQuestions(page)
            this.questionsLsit = res.attachment || {}
        } catch (e) {
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async identityAuthentication(info) {
        try {
            const res = await submitUserInfo(info)
            if (res.status === 200) {
                this.getUserInfo()
                return res
            } else {
                message.error(res.message)
            }
        } catch (e) {
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async bindGA(clientPassword, verCode) {
        try {
            this.submit_loading = true
            const res = await bindGoogleAuth(clientPassword, verCode)
            this.submit_loading = false
            if (res.status === 200) {
                this.gaBindSuccess = true
                this.getUserInfo()
                message.success(UPEX.lang.template('绑定成功'))
            } else {
                message.error(res.message)
            }
        } catch (e) {
            this.submit_loading = false
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async rmBindGA(clientPassword, verCode) {
        try {
            this.submit_loading = true
            const res = await closeGoogleAuth(clientPassword, verCode)
            this.submit_loading = false
            if (res.status === 200) {
                this.gaBindSuccess = false
                message.success(UPEX.lang.template('解除绑定成功'))
            } else {
                message.error(res.message)
            }
        } catch (e) {
            this.submit_loading = false
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async authInfo() {
        try {
            const res = await selectAuthLevel()
            if (res.data.status === 200) {
                console.log(res.data, 'data')
            } else {
                message.error(res.data.message)
            }
        } catch (e) {
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async modifyPhone(newPhone, oldPhone, oldVercode, vercode) {
        try {
            const res = await bindPhone(newPhone, oldPhone, oldVercode, vercode)
            if (res.status === 200) {
                console.log(res.data, 'data')
            } else {
                message.error(res.message)
            }
        } catch (e) {
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async bindPESendCode(codeid, imgcode, phoneOrEmail, type) {
        try {
            const res = await bindPhoneOrEmailSendCode(codeid, imgcode, phoneOrEmail, type)
            return res
        } catch (e) {
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async isGoogleAuth() {
        try {
            const res = await isUsedGoogleAuth()
            if (res.status === 200) {
                this.gaBindSuccess = res.attachment.isUsed === 1
            } else {
                message.error(res.message)
            }
        } catch (e) {
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async bindPEAction(EmailCode, phoneCode, phoneOrEmail, type) {
        try {
            this.submit_loading = true
            const res = await bindPhoneOrEmailAction(EmailCode, phoneCode, phoneOrEmail, type)
            this.submit_loading = false
            if (res.status === 200) {
                message.success(UPEX.lang.template('绑定成功'))
                if (type === 1) {
                    browserHistory.push('/user/emailSuccess');
                } else if (type === 2) {
                    browserHistory.push('/user/phoneSuccess');
                }
            } else {
                message.error(res.message)
            }
        } catch (e) {
            this.submit_loading = false
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async mPhoneSendMsg(phone, codeid, imgcode, type) {
        try {
            const res = await modifyPhoneSendMsg(phone, codeid, imgcode, type)
            return res
        } catch (e) {
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async newModifyPhone(newCode, newPhone, oldCode, type) {
        try {
            this.submit_loading = true
            const res = await modifyPhoneAction(newCode, newPhone, oldCode, type)
            this.submit_loading = false
            if (res.status === 200) {
                message.success(UPEX.lang.template('修改成功'))
            } else {
                message.error(res.message)
            }
        } catch (e) {
            this.submit_loading = false
            console.error(e)
            message.error('Network Error')
        }
    }
    
    @action
    async phoneSwitch(smsCode, status) {
        try {
            this.submit_loading = true
            const res = await phoneAuthSwitch(smsCode, status)
            this.submit_loading = false
            if (res.status === 200) {
                message.success(UPEX.lang.template('修改成功'))
            } else {
                message.error(res.message)
            }
        } catch (e) {
            this.submit_loading = false
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async fdPwdSwitch(fdPwd, enabled) {
        try {
            this.submit_loading = true
            const res = await updateFdPwdEnabled(fdPwd, enabled)
            this.submit_loading = false
            if (res.status === 200) {
                this.getUserInfo()
                message.success(UPEX.lang.template('修改成功'))
            } else {
                message.error(res.message)
            }
        } catch (e) {
            this.submit_loading = false
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async bindVerifyCard(cardNo,
        cardName,
        openBank,
        branchNo,
        branchName,
        tradePwd,
        imgUrl) {
        try {
            this.submit_loading = true
            const res = await bindVerifyCardInfo(cardNo,
                cardName,
                openBank,
                branchNo,
                branchName,
                tradePwd,
                imgUrl)
            this.submit_loading = false
            if (res.status === 200) {
                message.success(UPEX.lang.template('绑定成功'))
            } else {
                message.error(res.message)
            }
        } catch (e) {
            this.submit_loading = false
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async bankCardInfo() {
        try {
            const res = await getBindBankCardInfo()
            this.bankCardList = res.attachment || []
        } catch(e) {
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async forgetTradingPwd(newPwd, vercode, imgCode, imgCodeId, type) {
        try {
            this.submit_loading = true
            const res = await forgetFdPwd(newPwd, vercode, imgCode, imgCodeId, type)
            this.submit_loading = false
            if (res.status === 200) {
                message.success(UPEX.lang.template('修改成功'))
            } else {
                message.error(res.message)
            }
        } catch (e) {
            this.submit_loading = false
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async questionDetails (id) {
        try {
            const res = await questionDetail(id)
            console.log(res, 'res')
        } catch (e) {
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async phAuthSendCode(type) {
        try {
            const res = await phoneAuthSendCode(type)
            return res
        } catch (e) {
            console.error(e)
            message.error('Network Error')
        }
    }

    @action
    async kycC() {
        try {
            this.submit_loading = true
            const res = await submitKycC()
            this.submit_loading = false
            if (res.status === 200) {
                message.success(UPEX.lang.template('申请成功'))
            } else {
                message.error(res.message)
            }
        } catch (e) {
            this.submit_loading = false
            console.error(e)
            message.error('Network Error')
        }
    }
}

export default UserInfo;