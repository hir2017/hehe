import { observable, computed, autorun, action, runInAction } from 'mobx';
import { getCoinAccount  } from '../api/http';



class Assets {
	@observable accountData = {};
	@observable isFetchingList = true;
	
	constructor(stores) {
        this.authStore = stores.authStore;
    }

    @computed
    get list(){
    	return this.accountData.coinList;
    }
    @computed
    get allMoney() {
    	return this.accountData.allMoney;
    }
	/**
     *  获取资产列表
     */
    @action
    getUserCoinAccount() {
        // if (!this.authStore.isLogin) {
        //     return;
        // }

        getCoinAccount().then((data) => {
        	
        	data =  require('../mock/assets.json');
        	
        	runInAction(()=>{
        		this.accountData = data.attachment;
        		this.isFetchingList = false;
        	})
        })
    }
}

export default Assets;