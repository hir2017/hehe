import { observable, computed, autorun, action, runInAction } from 'mobx';

class RechargeStore {
	@observable banklist = [];
	@observable amount = 0;

	/**
	 * 充值金额
	 */
	@action
	setAmount(value){
		this.amount = value;
	}
	/**
	 * 请求充值信息
	 */
	@action
	getRechargeInfo() {

	}
}

export default RechargeStore;