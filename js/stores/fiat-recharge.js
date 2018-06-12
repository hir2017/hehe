/**
 * 法币充值
 */
import { observable, computed, autorun, action, runInAction } from 'mobx';
import { getUserBankInfo, getUserBindCards } from '../api/http';

class FiatRechargeStore {
	@observable bankCardsList = []; // 银行列表
	@observable accountAmount = 0 ;  // 当前余额
	@observable selectedCard = {}; // 选中的银行卡
	@observable selectedBindCard = ''; // 选中的绑定银行卡
	@observable balance = '000'; // 金额
	@observable step = 'start';
	@observable $submiting = false;

	@action
	getInfo() {

		getUserBankInfo().then((data)=>{
			runInAction(()=>{
				if (data.status == 200) {
					let { accountAmount } = data.attachment;
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
	 * 设置充值金额
	 */
	@action
	setBalance(value) {
		this.balance = value;
    }

    /**
	 * 选择绑定卡
	 */
    @action
    setVal(val, field) {
        this[field] = val;
    }

    /**
	 * 创建充值订单
	 */
    @action
    createOrder() {
        console.log(this.balance, this.selectedBindCard)
    }

	/**
	 * 选中的充值银行卡
	 */
	@action.bound
	selectCardForRecharge(cardId) {
		let result = this.bankCardsList.filter((item)=>{
			return item.providerId === cardId;
		})

		this.selectedCard = result[0];
	}

	@computed
	get cardId() {
		return this.selectedCard.providerId;
	}

	@action
	changeSubmitingStatusTo(status){
		this.$submiting = status;
	}

	@action.bound
	orderSuccess() {
		this.step = 'success';
	}
}

export default FiatRechargeStore;
