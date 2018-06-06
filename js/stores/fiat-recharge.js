/**
 * 法币充值
 */
import { observable, computed, autorun, action, runInAction } from 'mobx';

class FiatRechargeStore {
	@observable balance = ''; // 充值金额

	/**
	 * 设置充值金额
	 */
	@action
	setBalance(value) {
		this.balance = value;
	}
}

export default FiatRechargeStore;