/**
 * 法币充值
 */
import { observable, computed, autorun, action, runInAction } from 'mobx';
import { getUserBankInfo, getUserBindCards } from '../api/http';

class FiatRechargeStore {
	@observable bankCardsList = []; // 银行列表
	@observable accountAmount = 0 ;  // 当前余额
	@observable selectedCard = 'none'; // 选中的银行卡
	@observable balance = '000'; // 金额
    @observable step = 'start';
    @observable userAccountInfo = {}; // 账号信息
	@observable $submiting = false;
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
	getInfo() {
		getUserBankInfo().then((data)=>{
			runInAction(()=>{
				if (data.status == 200) {
					let { bankCards, accountAmount } = data.attachment;
					this.userAccountInfo = data.attachment;
					this.accountAmount = accountAmount;
				}
			})
        })

        getUserBindCards().then((data) => {
            runInAction(()=>{
				if (data.status == 200) {
                    this.bankCardsList = data.attachment;
				}
			})
        });
    }

    /**
	 * 属性变更
	 */
    @action
    setVal(val, field) {
        this[field] = val;
    }


	/**
     * 实际到账金额
     */
    @computed
    get withdrawValue() {
        let { fee, point, feeType} = this.userAccountInfo;
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
	 * 设置充值金额
	 */
	@action
	setBalance(value) {
		this.balance = value;
	}
	/**
	 * 选中的充值银行卡
	 */
	// @action
	// selectCardForRecharge(cardId) {
	// 	let result = this.bankCardsList.filter((item)=>{
	// 		return item.providerId === cardId;
	// 	})
	// 	this.selectedCard = result[0];
	// }

	@computed
	get selectBindCardInfo() {
        const {bankCardsList, selectedCard} = this
        let result = bankCardsList.filter(item => {
            return item.id === selectedCard
        })
		return result[0] || {};
	}

	@action
	changeSubmitingStatusTo(status){
		this.$submiting = status;
	}

	@action
	nextStep() {
		this.step = 'apply';
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
        return md5(this.tradepwd + UPEX.config.dealSalt + this.authStore.uid);
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

    @action.bound
    verifyBeforeSubmit() {
        var result = {
            pass: true,
            message: ''
        }

        if (!this.tradepwd) {
            result.pass = false;
            this.validTradePwd = false;
        }

        return result;
    }

}

export default FiatRechargeStore;
