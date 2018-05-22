import { observable, computed, autorun, action, runInAction } from 'mobx';
import { getCoinAccount  } from '../api/http';

class Assets {
	@observable accountData = {};
	@observable isFetchingList = true;
    @observable visibleMoney = false;
	
	constructor(stores) {
        this.authStore = stores.authStore;
    }

    @computed
    get list(){
    	return this.accountData.coinList;
    }
    @computed
    get allMoney() {
    	return this.accountData.allMoney || '0.00';
    }

    @action
    handleVisibleMoney() {
        this.visibleMoney = !this.visibleMoney;
    }
    
    @action
    filterByName(value){
        let accountData = JSON.parse(JSON.stringify(this.originAccountData));
        let coinList = [];

        value = value.toLowerCase();

        if (value) {
            accountData.coinList.forEach((item, index) => {
                if (item.currencyNameEn.toLowerCase().indexOf(value) > -1) {
                    coinList[coinList.length] = item;
                }
            });
            accountData.coinList = coinList;
        }

        this.accountData = accountData;
    }

    @action
    filterZeroAmount(filterZero){
        let accountData = JSON.parse(JSON.stringify(this.originAccountData));
        let coinList = [];

        if (filterZero) {
            accountData.coinList.forEach((item, index) => {
                if (item.amount > 0) {
                    coinList[coinList.length] = item;
                }
            });
            accountData.coinList = coinList;
        }

        this.accountData = accountData;
    }

	/**
     *  获取资产列表
     * @params type = 1，查看全部；type = 2查看资产非0的
     */
    @action
    getUserCoinAccount(type) {
        // if (!this.authStore.isLogin) {
        //     return;
        // }

        getCoinAccount().then((data) => {
        	data = require('../mock/assets.json');
        	
        	runInAction(()=>{
                // 拷贝存储数组
                this.originAccountData = JSON.parse(JSON.stringify(data.attachment));
                this.accountData =  data.attachment;
        		this.isFetchingList = false;
        	})
        })
    }
}

export default Assets;