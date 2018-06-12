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
    @observable cashType = 'PD-ATM-POST';
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
	 * 属性变更
	 */
    @action
    setVal(val, field) {
        this[field] = val;
    }

	/**
	 * 选中的充值银行卡
	 */
	@action.bound
	selectCardForRecharge(cardId) {
        this.selectedCard = cardId;
		// let result = this.bankCardsList.filter((item)=>{
		// 	return item.providerId === cardId;
		// })

		// this.selectedCard = result[0];
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
