import { observable, computed, autorun, action, runInAction } from 'mobx';
import { takeCoin, getTakeCoinInfo } from '../api/http';
import md5 from '../lib/md5';

class CoinWithdrawStore {
    // 提币的地址列表
    @observable addressList = [];
    @observable defaultAddress = {};
    // 最小提币数量
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
    @observable sendingcode = false;
    // google验证码
    @observable googleCode = '';
    @observable phoneCode = '';
    @observable $submiting = false;
    @observable isFetching = false;
    @observable authType = 'phone';
    // 图片id
    codeid = '';

    constructor(stores) {
        this.captchaStore = stores.captchaStore;
        this.userInfoStore = stores.userInfoStore;
        this.authStore = stores.authStore;
    }

    @computed
    get supportAuthTypes() {
        let arr = [];

        if (this.userInfoStore.userInfo.isGoogleAuth == 1) {
            arr[arr.length] = 'google';
        }

        if (this.userInfoStore.userInfo.isValidatePhone) {
            arr[arr.length] = 'phone';
        }

        return arr;
    }

    @action
    getTakeCoinInfo(currencyId) {
        this.isFetching = true;

        getTakeCoinInfo(currencyId)
            .then((data) => {
                runInAction(() => {
                    if (data.status == 200) {
                        this.takeCoinInfo = data.attachment;
                        this.addressList = data.attachment.resp.addressList;
                        this.defaultAddress = data.attachment.resp.defaultAddress;

                        if (this.defaultAddress.address) {
                            this.address = this.defaultAddress.address;
                            this.note = this.defaultAddress.note;
                        }
                    }

                    this.isFetching = false;
                })
            }).catch(() => {
                this.isFetching = false;
            })
    }
    /**
     * 最小提币限额
     */
    @computed
    get amountLowLimit() {
        if (this.takeCoinInfo.detail) {
            return this.takeCoinInfo.detail.amountLowLimit || 0;
        } else {
            return 0;
        }
    }

    /**
     * 实际到账金额
     */
    @computed
    get withdrawValue() {
        let { feeType } = this.takeCoinInfo.detail;
        let { fee, point } = this.takeCoinInfo.resp;
        let amount = 0;

        if (this.amount) {
            if (feeType === 1) {
                // feeType--1是固定2是百分比
                amount = this.amount - fee;
            } else {
                amount = this.amount - this.amount * fee;
            }
        }

        return amount;
    }
    /**
     * 可提币
     */
    @computed
    get cashAmount() {
        if (this.takeCoinInfo.resp) {
            return this.takeCoinInfo.resp.cashAmount || 0;
        } else {
            return 0;
        }

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
        // console.log(md5(this.tradepwd + UPEX.config.dealSalt + this.authStore.uid));
        return md5(this.tradepwd + UPEX.config.salt);
        // return md5(this.tradepwd + UPEX.config.dealSalt + this.authStore.uid);
    }

    @computed
    get md5FdPwd() {
        return md5(this.tradepwd + UPEX.config.salt);
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

        if (this.amount > 0 && this.amount < this.amountLowLimit) {
            result.pass = false;
            result.message = UPEX.lang.template('不能少于最小提币数量');
            this.validAmount = false;
        }

        if (!this.tradepwd) {
            result.pass = false;
            this.validTradePwd = false;
        }

        return result;
    }
    /**
     * 重置状态与值
     */
    @action.bound
    reset() {
        this.addressList = [];
        this.defaultAddress = {};
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
        this.sendingcode = false;
        // google验证码
        this.googleCode = '';
        this.phoneCode = '';
    }

    @action
    changeSubmitingStatusTo(status) {
        this.$submiting = status;
    }

}

export default CoinWithdrawStore;