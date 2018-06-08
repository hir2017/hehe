/**
 * 法币充值
 */
import { observable, computed, autorun, action, runInAction } from 'mobx';
import { getUserBankInfo } from '../api/http';

class FiatRechargeStore {
	@observable bankCardsList = []; // 银行列表
	@observable accountAmount = 0 ;  // 当前余额
	@observable selectedCard = {}; // 选中的银行卡
	@observable balance = '000'; // 金额
	@observable step = 'start';
	@observable $submiting = false;

	@action
	getInfo() {
		getUserBankInfo().then((data)=>{
			runInAction(()=>{
				if (data.status == 200) {
					let { bankCards, accountAmount } = data.attachment;
					this.bankCardsList = bankCards;
					this.accountAmount = accountAmount;
				}
			})
		})
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