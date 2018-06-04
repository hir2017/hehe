import { observable, computed, autorun, action, runInAction } from 'mobx';
import { takeCoinSendPhoneCode, takeCoinSendEmailCode, takeCoin, getTakeCoinInfo } from '../api/http';
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
    // 交易密码
    @observable tradepwd = '';
    @observable validTradePwd = true;
    // 邮箱验证码
    @observable emailCode = '';
    @observable validEmailCode = true;
    // google验证码
    @observable google = '';
    // 图片id
    codeid = '';

     constructor(stores) {
        this.captchaStore = stores.captchaStore;
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
    updateCurrentCoin(info) {
        this.currentCoin = info;
    }
    
    @action
    setAddress(value) {
        this.address = value;
    }
   
    @action
    setNote(value) {
        this.note = value;
    }

    @action
    setAmount(value) {
        this.amount = value;
    }

    @action
    setVercode(value) {
        this.vercode = value;
    }

    @action
    setTradePassword(value) {
        this.tradepwd = value;
    }

    @action.bound
    getImgCaptcha() {
        this.captchaStore.fetch();
    }

    @computed
    get md5TradePassword(){
        return md5(this.tradepwd + UPEX.config.salt);
    }

    @action
    setEmailCode(value) {
        this.emailCode = value;
    }

    @action
    verifyBeforeSubmit() {
        var result = {
            pass: true,
            message: ''
        }

        if (!this.note) {
            result.pass = false;
            this.validNote = false;
        }

        if(!this.address) {
            result.pass = false;
            this.validAddress = false;
        }

        if(!this.amount) {
            result.pass = false;
            this.validAmount = false;
        }

        if(!this.tradepwd) {
            result.pass = false;
            this.validTradePwd = false;
        }

        if (!this.emailCode) {
            result.pass = false;
            this.validEmailCode = false;
        }
        console.log(result);
        return result;
    }

    /**
     * 提币
     */
    @action
    takeCoin() {
        return takeCoin({
            currencyId: this.currentCoin.currencyId,
            fdPwd: this.md5TradePassword,
            note: this.note,
            address: this.address,
            emailCode: this.emailCode,
            vercode: this.vercode,
            codeid: this.captchaStore.codeid,
            amount: this.amount,
            gAuth: this.google,
        }).then((data)=>{

        })
    }
    /**
     * 实际到账金额
     */
    @computed
    withdrawValue() {

    }

}

export default CoinWithdrawStore;