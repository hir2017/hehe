import { observable, computed, autorun, action, runInAction } from 'mobx';
import { takeCoin, getTakeCoinInfo } from '../api/http';
import md5 from '../lib/md5';

class CoinWithdrawStore {
    // 提币的地址列表
    @observable addressList = [];
    // 最小提币数量
    @observable amountLowLimit = 0;
    @observable takeCoinInfo = {
        detail: {},
        resp: {}
    };

    // 充值币种
    @observable currentCoin = {
        currencyId: '',
        currencyNameEn: ''
    }
    // 地址
    @observable address = '';
    @observable validAddress = true;
    // 地址备注
    @observable note = '';
    @observable validNote = true;
    // 提币数量
    @observable amount = '';
    @observable validAmount = true;
    // 图片验证码
    @observable vercode = '';
    @observable validImgCode = true;
    // 交易密码
    @observable tradepwd = '';
    @observable validTradePwd = true;
    // 邮箱验证码
    @observable emailCode = '';
    @observable validEmailCode = true;
    @observable sendingcode = false;
    // google验证码
    @observable googleCode = '';
    @observable phoneCode = '';
    // 图片id
    codeid = '';

    constructor(stores) {
        this.captchaStore = stores.captchaStore;
        this.userInfoStore = stores.userInfoStore;
    }

    @computed 
    get supportAuthTypes() {
        let arr = [];
        
        if (this.userInfoStore.userInfo.isAuthGooogle) {
            arr[arr.length] = 'google';
        }

        if (this.userInfoStore.userInfo.isValidatePhone) {
            arr[arr.length] = 'phone';
        }

        return arr;
    }

    @computed
    get authType() {
        if (this.userInfoStore.userInfo.isAuthGooogle) {
            return 'google';
        } 

        if (this.userInfoStore.userInfo.isValidatePhone) {
            return 'phone'
        }
    }

    @action
    getTakeCoinInfo(currencyId) {
        getTakeCoinInfo(currencyId)
            .then((data) => {
                runInAction(() => {
                    if (data.status == 200) {
                        this.takeCoinInfo = data.attachment;
                        this.addressList = data.attachment.resp.addressList;
                        this.amountLowLimit = data.attachment.detail.amountLowLimit;
                    }
                })
            })
    }
    @action
    getNoteByAddress(address) {
        let item = this.addressList.filter((item) => {
            return item.address === address;
        })

        return item[0].note
    }

    @action
    updateCurrentCoin(info) {
        this.currentCoin = info;
    }

    @action
    setAddress(value) {
        this.address = value;

        if (value) {
            this.validAddress = true;
        }
    }

    @action
    setNote(value) {
        this.note = value;

        if (value) {
            this.validNote = true;
        }
    }

    @action
    setAmount(value) {
        this.amount = value;

        if (value) {
            this.validAmount = true;
        }
    }

    @action
    setVercode(value) {
        this.vercode = value;

        if (value) {
            this.validImgCode = true;
        }
    }

    @action
    setTradePassword(value) {
        this.tradepwd = value;

        if (value) {
            this.validTradePwd = true;
        }
    }

    @action.bound
    getImgCaptcha() {
        this.captchaStore.fetch();
    }

    @computed
    get md5TradePassword() {
        return md5(this.tradepwd + UPEX.config.salt);
    }

    @action
    setEmailCode(value) {
        this.emailCode = value;

        if (value) {
            this.validEmailCode = true;
        }
    }

    @action
    setGoogleCode(value) {
        this.googleCode = value;
    }

    @action
    setPhoneCode(value) {
        this.phoneCode = value;
    }

    @action
    changeAuthTypeTo(type) {
        this.authType = type;
    }

    @action
    changeSendingCodeTo(status) {
        this.sendingcode = status;
    }

    @action
    changeImgCodeTo(status) {
        this.validImgCode = status;
    }

    @action
    changeEmailCodeTo(status) {
        this.validEmailCode = status
    }

    @action.bound
    verifyBeforeSubmit() {
        var result = {
            pass: true,
            message: ''
        }

        if (!this.note) {
            result.pass = false;
            this.validNote = false;
        }

        if (!this.address) {
            result.pass = false;
            this.validAddress = false;
        }

        if (!this.amount) {
            result.pass = false;
            this.validAmount = false;
        }

        if (!this.tradepwd) {
            result.pass = false;
            this.validTradePwd = false;
        }

        if (!this.emailCode) {
            result.pass = false;
            this.validEmailCode = false;
        }

        return result;
    }
    /**
     * 重置状态与值
     */
    @action.bound
    reset() {
        this.addressList = [];
        this.amountLowLimit = 0;
        this.takeCoinInfo = {
            detail: {},
            resp: {}
        };
        // 充值币种
        this.currentCoin = {
            currencyId: '',
            currencyNameEn: ''
        }
        // 地址
        this.address = '';
        this.validAddress = true;
        // 地址备注
        this.note = '';
        this.validNote = true;
        // 提币数量
        this.amount = '';
        this.validAmount = true;
        // 图片验证码
        this.vercode = '';
        this.validImgCode = true;
        // 交易密码
        this.tradepwd = '';
        this.validTradePwd = true;
        // 邮箱验证码
        this.emailCode = '';
        this.validEmailCode = true;
        this.sendingcode = false;
        // google验证码
        this.googleCode = '';
        this.phoneCode = '';
    }
    /**
     * 实际到账金额
     */
    @computed
    withdrawValue() {

    }

}

export default CoinWithdrawStore;