import { observable, action, computed, runInAction } from 'mobx';
import { browserHistory } from 'react-router';
import TimeUtil from '../lib/util/date';

import {
    personalInfo,
    loginRecord,
    sendCodeInUserCenter,
    sendCodeInGAOrTadePwd,
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
    isUsedGoogleAuth,
    modifyPhoneSendMsg,
    modifyPhoneAction,
    phoneAuthSwitch,
    updateFdPwdEnabled,
    bindVerifyCardInfo,
    getBindBankCardInfo,
    forgetFdPwd,
    questionDetail,
    phoneAuthSendCode,
    setTradePwdSendCode,
    submitKycC,
    modifyFdPwd,
    updateBindBankCardStatus,
    deleteBindBankCardRecord,
    sendMessageWithdraw,
    getUserActionLimit
} from '../api/http';
import { message } from 'antd';

const pickErrMsg = (res, name) => {
    if (res.status === 200) {
        return;
    }
    const statusMap = [0, 9999, 9997];

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

    // 用户行为限制状态 充提现 充提币交易
    /**
     * 'recharge' | 'withdraw' | 'recharge coin' | 'withdraw coin' | 'buy' | 'sell' | 'transfer'
     *
     * */
    @observable
    actionRoles = {
    }

    constructor(stores) {
        this.captchaStore = stores.captchaStore;
    }

    @action
    pickErrMsg(res, name) {
        if (res.status === 200) {
            return;
        }
        const statusMap = [0, 9999, 9997];

        if (statusMap.indexOf(res.status) !== -1) {
            // console.error(`${name} error: ${res.message}`);
            browserHistory.push('/login');
        } else {
            console.log(res.message);
            message.error(res.message);
        }
    };

    // 获取用户行为限制
    @action
    getActionLimit() {
        return getUserActionLimit()
            .then(res => {
                runInAction(() => {
                    if (res.status === 200) {
                        this.actionRoles = res.attachment.actionRoles;
                    }
                    pickErrMsg(res, 'getActionLimit');

                });
                return res;
            })
            .catch(err => {
                console.error(err, 'getActionLimit');
                return false;
            });
    }

    @action
    getUserInfo() {
        this.isFetchingInfo = true;
        return personalInfo()
            .then(res => {
                runInAction(() => {
                    this.userInfo = res.attachment;
                    this.isFetchingInfo = false;
                    pickErrMsg(res, 'getUserInfo');
                });
                return res;
            })
            .catch(err => {
                console.error(err, 'getUserInfo');
                return false;
            });
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
    getLoginRecord() {
        loginRecord()
            .then(res => {
                runInAction(() => {
                    if (res.status == 200) {
                        this.loginRecord = res.attachment;
                    }
                })
            })
            .catch(err => {
                console.error(err, 'getLoginRecord');
            });
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
    sendCode(type, imgCode, imgCodeId) {
        return sendCodeInUserCenter(type, imgCode, imgCodeId)
            .then(res => {
                if (res.status !== 200) {
                    console.error('sendCode error');
                } else {
                    this.showCountDown = true;
                }

                return res;
            })
            .catch(err => {
                console.error(err, 'sendCode');
            });
    }

    @action
    setTradePwdSendCode(type, imgCode, imgCodeId) {
        return setTradePwdSendCode(type, imgCode, imgCodeId)
            .then(res => {
                runInAction(() => {
                    if (res.status !== 200) {
                        console.error('sendCode error');
                    } else {
                        this.showCountDown = true;
                    }

                    return res;
                })
            })
            .catch(err => {
                console.error(err, 'sendCode');
            });
    }

    @action
    sendCodeGaOrTradePwd(type, imgCode, imgCodeId) {
        return sendCodeInGAOrTadePwd(type, imgCode, imgCodeId)
            .then(res => {
                runInAction(() => {
                    if (res.status !== 200) {
                        console.error('sendCode error');
                    } else {
                        this.showCountDown = true;
                    }
                    return res;
                })
            })
            .catch(err => {
                console.error(err, 'sendCode');
            });
    }

    @action
    bindSendCode(imgCode, imgCodeId, type, phone) {
        return bindPhoneSendMsg(imgCode, imgCodeId, type, phone)
            .then(res => {

                if (res.status !== 200) {
                    console.error('bindSendCode error');
                }
                return res;

            })
            .catch(err => {
                console.error(err, 'bindSendCode');
            });
    }

    @action
    bindTradingPwd(newFdPassWord, vercode, imgCode, imgCodeId, passWord) {
        this.submit_loading_tpwd = true;

        return bindFdPwd(newFdPassWord, vercode, imgCode, imgCodeId, passWord)
            .then(res => {
                runInAction(() => {
                    this.submit_loading_tpwd = false;
                    if (res.status !== 200) {
                        if (res.status === 412) {
                            this.captchaStore.fetch();
                        }
                        pickErrMsg(res, 'bindTradingPwd');
                    } else {
                        this.getUserInfo();
                        message.success(UPEX.lang.template('设置成功'));
                    }
                })

                return res;
            })
            .catch(e => {
                runInAction(() => {
                    console.error(e);
                    this.submit_loading_tpwd = false;
                    message.error('Network Error');
                })

                return {};
            });
    }

    @action
    resetPwd(newPassWord, vercode, imgCode, imgCodeId, passWord, type, validate, captchaId) {
        this.submit_loading_pwd = true;

        return resetPwdInUserCenter(newPassWord, vercode, imgCode, imgCodeId, passWord, type, validate, captchaId)
            .then(res => {
                runInAction(() => {
                    this.submit_loading_pwd = false;
                    if (res.status !== 200) {
                        if (res.status === 412) {
                            this.captchaStore.fetch();
                        }
                        pickErrMsg(res, 'resetPwd');
                    } else {
                        message.success(UPEX.lang.template('登录密码修改成功，请重新登录'));
                    }
                })

                return res;
            })
            .catch(e => {
                runInAction(() => {
                    console.error(e);
                    this.submit_loading_pwd = false;
                    message.error('Network Error');
                })

                return {};
            });
    }

    @action
    getGaSecretKey() {
        return getSecretKey()
            .then(res => {
                runInAction(() => {
                    this.gaSecretKey = res.attachment;
                })
            })
            .catch(err => {
                console.error(err, 'getGaSecretKey');
            });
    }

    @action
    ask(detail, urlkey) {
        this.submit_loading = true;
        return addAsk(detail, urlkey)
            .then(res => {
                runInAction(() => {
                    this.submit_loading = false;
                    if (res.status !== 200) {
                        pickErrMsg(res, 'ask');
                    } else {
                        message.success(UPEX.lang.template('问题反馈成功'));
                    }
                })

                return res;
            })
            .catch(e => {
                console.error(e);
                runInAction(() => {
                    this.submit_loading = false;
                    message.error('Network Error');
                })

                return {};
            });
    }

    @action
    questions(page) {
        getQuestions(page)
            .then(res => {
                runInAction(() => {
                    if (res.status === 200) {
                        res.attachment.list = res.attachment.list.map(item => {
                            item.createTime = TimeUtil.formatDate(item.createTimeStamp)
                            return item;
                        })
                    }
                    this.questionsLsit = res.attachment || {};
                })
            })
            .catch(e => {
                console.error(e, 'questions');
                message.error('Network Error');
            });
    }

    @action
    identityAuthentication(info) {
        return submitUserInfo(info)
            .then(res => {
                runInAction(() => {
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
                })
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
            });
    }

    @action
    bindGA(clientPassword, verCode) {
        this.submit_loading = true;
        return bindGoogleAuth(clientPassword, verCode)
            .then(res => {
                runInAction(() => {
                    this.submit_loading = false;
                    if (res.status === 200) {
                        this.gaBindSuccess = true;
                        this.getUserInfo();
                        message.success(UPEX.lang.template('绑定成功'));
                    } else {
                        pickErrMsg(res, 'bindGA');
                    }
                })
                return res;
            })
            .catch(e => {
                runInAction(() => {
                    this.submit_loading = false;
                    console.error(e);
                    message.error('Network Error');
                })

                return {};
            });
    }

    @action
    rmBindGA(clientPassword, verCode) {
        this.submit_loading = true;

        return closeGoogleAuth(clientPassword, verCode)
            .then(res => {
                runInAction(() => {
                    this.submit_loading = false;

                    if (res.status === 200) {
                        this.gaBindSuccess = false;
                        message.success(UPEX.lang.template('解除绑定成功'));
                    } else {
                        pickErrMsg(res, 'rmBindGA');
                    }
                })

                return res;
            })
            .catch(e => {
                runInAction(() => {
                    this.submit_loading = false;
                    console.error(e);
                    message.error('Network Error');
                })

                return {};
            });
    }

    @action
    authInfo() {
        selectAuthLevel()
            .then(res => {
                runInAction(() => {
                    if (res.data.status === 200) {
                        console.log(res.data, 'data');
                    } else {
                        pickErrMsg(res.data, 'authInfo');
                    }
                })
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
            });
    }

    @action
    modifyPhone(newPhone, oldPhone, oldVercode, vercode) {
        bindPhone(newPhone, oldPhone, oldVercode, vercode)
            .then(res => {
                runInAction(() => {
                    if (res.status === 200) {
                        console.log(res.data, 'data');
                    } else {
                        pickErrMsg(res, 'modifyPhone');
                    }
                })
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
            });
    }


    @action
    isGoogleAuth() {
        isUsedGoogleAuth()
            .then(res => {
                runInAction(() => {
                    if (res.status === 200) {
                        this.gaBindSuccess = res.attachment.isUsed === 1;
                    } else {
                        pickErrMsg(res, 'isGoogleAuth');
                    }
                })
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
            });
    }

    @action
    bindPEAction(EmailCode, phoneCode, phoneOrEmail, type) {
        this.submit_loading = true;
        return bindPhoneOrEmailAction(EmailCode, phoneCode, phoneOrEmail, type)
            .then(res => {
                runInAction(() => {
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
                })

                return res;
            })
            .catch(e => {
                runInAction(() => {
                    this.submit_loading = false;
                    console.error(e);
                    message.error('Network Error');
                })

                return {};
            });
    }

    @action
    mPhoneSendMsg(phone, codeid, imgcode, type) {
        return modifyPhoneSendMsg(phone, codeid, imgcode, type)
            .then(res => {
                return res;
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
            });
    }

    @action
    newModifyPhone(newCode, newPhone, oldCode, type) {
        this.submit_loading = true;

        return modifyPhoneAction(newCode, newPhone, oldCode, type)
            .then(res => {
                runInAction(() => {
                    this.submit_loading = false;

                    if (res.status === 200) {
                        message.success(UPEX.lang.template('修改成功'));
                    } else {
                        const msgMap = {
                            '5558': UPEX.lang.template('请填写正确的Google验证码'),
                            '405': UPEX.lang.template('请填写正确的原手机短信验证码'),
                            '403': UPEX.lang.template('请填写正确的新手机短信验证码')
                        };

                        let tempMsg;
                        tempMsg = msgMap[res.status] || res.message;

                        if (res.status === 0 || res.status === 9999) {
                            pickErrMsg(res, 'newModifyPhone');
                        } else {
                            message.error(tempMsg);
                        }
                    }
                });

                return res;
            })
            .catch(e => {
                runInAction(() => {
                    this.submit_loading = false;
                    console.error(e);
                    message.error('Network Error');
                });

                return {};
            });
    }

    @action
    phoneSwitch(smsCode, status) {
        this.submit_loading = true;

        return phoneAuthSwitch(smsCode, status)
            .then(res => {
                runInAction(() => {
                    this.submit_loading = false;

                    if (res.status === 200) {
                        message.success(UPEX.lang.template('修改成功'));
                    } else {
                        pickErrMsg(res, 'phoneSwitch');
                    }
                });

                return res;
            })
            .catch(e => {
                runInAction(() => {
                    this.submit_loading = false;
                    console.error(e);
                    message.error('Network Error');
                });

                return {};
            });
    }

    @action
    fdPwdSwitch(fdPwd, enabled) {
        this.submit_loading = true;

        return updateFdPwdEnabled(fdPwd, enabled)
            .then(res => {
                runInAction(() => {
                    this.submit_loading = false;

                    if (res.status === 200) {
                        this.getUserInfo();
                        message.success(UPEX.lang.template('修改成功'));
                    } else {
                        pickErrMsg(res, 'fdPwdSwitch');
                    }
                });

                return res;
            })
            .catch(e => {
                runInAction(() => {
                    this.submit_loading = false;
                    console.error(e);
                    message.error('Network Error');
                });

                return {};
            });
    }

    @action
    bindVerifyCard(cardNo, userName, openBank, branchNo, branchName, tradePwd, imgUrl) {
        this.submit_loading = true;
        return bindVerifyCardInfo(cardNo, userName, openBank, branchNo, branchName, tradePwd, imgUrl)
            .then(res => {
                runInAction(() => {
                    this.submit_loading = false;

                    if (res.status === 200) {
                        this.bankCardInfo();
                        message.success(UPEX.lang.template('提交银行卡提示'));
                    } else {
                        if (res.status === 13506 || res.status === 13501) {
                            message.error('已有账号绑定该银行卡');
                        } else {
                            pickErrMsg(res, 'bindVerifyCard');
                        }
                    }
                });

                return res;
            })
            .catch(e => {
                runInAction(() => {
                    this.submit_loading = false;
                    console.error(e);
                    message.error('Network Error');
                });

                return {};
            });
    }

    @action
    bankCardInfo() {
        getBindBankCardInfo()
            .then(res => {
                runInAction(() => {
                    this.bankCardList = res.attachment || [];
                });
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
            });
    }

    @action
    forgetTradingPwd(newPwd, vercode, imgCode, imgCodeId, type) {
        this.submit_loading = true;

        return forgetFdPwd(newPwd, vercode, imgCode, imgCodeId, type)
            .then(res => {
                runInAction(() => {
                    this.submit_loading = false;

                    if (res.status === 200) {
                        message.success(UPEX.lang.template('修改成功'));
                    } else {
                        pickErrMsg(res, 'forgetTradingPwd');
                    }
                });

                return res;
            })
            .catch(e => {
                runInAction(() => {
                    this.submit_loading = false;
                    console.error(e);
                    message.error('Network Error');
                });

                return {};
            });
    }

    @action
    questionDetails(id) {
        questionDetail(id)
            .then(res => {
                runInAction(() => {
                    if (res.status === 200) {
                        let stamp = res.attachment.question.createTimeStamp;
                        res.attachment.question.createTime = stamp ? TimeUtil.formatDate(stamp) : '';
                    }
                    this.questionObj = res.attachment;
                });
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
            });
    }

    @action
    phAuthSendCode(type) {
        return phoneAuthSendCode(type)
            .then(res => {
                return res;
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
            });
    }

    @action
    kycC() {
        this.submit_loading = true;
        return submitKycC()
            .then(res => {
                runInAction(() => {
                    this.submit_loading = false;

                    if (res.status === 200) {
                        message.success(UPEX.lang.template('申请成功'));
                    } else {
                        if (res.status === 41731) {
                            message.error(UPEX.lang.template('您的条件尚不符合提额条件'));
                        } else {
                            pickErrMsg(res, 'kycC');
                        }
                    }

                });
                return res;
            })
            .catch(e => {
                runInAction(() => {
                    this.submit_loading = false;
                    console.error(e);
                    message.error('Network Error');
                });

                return {};
            });
    }

    @action
    modifytradingPwd(newFdPassWord, passWord, validate, captchaId) {
        this.submit_loading_tpwd = true;

        return modifyFdPwd(newFdPassWord, passWord, validate, captchaId)
            .then(res => {
                runInAction(() => {
                    this.submit_loading_tpwd = false;
                    if (res.status !== 200) {
                        pickErrMsg(res, 'modifytradingPwd');
                    } else {
                        message.success(UPEX.lang.template('修改成功'));
                    }
                });

                return res;
            })
            .catch(e => {
                runInAction(() => {
                    console.error(e);
                    this.submit_loading_tpwd = false;
                    message.error('Network Error');
                });
                return {};
            });
    }

    @action
    updateBindBankCard(id, tradePwd, gAuth, phoneCode) {
        return updateBindBankCardStatus(id, tradePwd, gAuth, phoneCode)
            .then(res => {
                if (res.status !== 200) {
                    pickErrMsg(res, 'updateBindBankCard');
                } else {
                    message.success(UPEX.lang.template('解绑成功'));
                }
                return res
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
            });
    }

    @action
    deleteBindBankCard(id) {
        deleteBindBankCardRecord(id)
            .then(res => {
                if (res.status !== 200) {
                    pickErrMsg(res, 'deleteBindBankCard');
                } else {
                    this.bankCardInfo();
                    message.success(UPEX.lang.template('删除成功'));
                }
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
            });
    }

    @action
    sendMessageBankAndWithdraw(vercode, codeid) {
        return sendMessageWithdraw(vercode, codeid)
            .then(res => {
                return res;
            })
            .catch(e => {
                console.error(e);
                message.error('Network Error');
            });
    }
}

export default UserInfo;
