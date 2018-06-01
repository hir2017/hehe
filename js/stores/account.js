import { observable, computed, autorun, action, runInAction } from 'mobx';
import { getCoinAccount, selectUserAddress } from '../api/http';

class Account {
    @observable accountData = {};
    @observable isFetching = false;
    @observable visibleMoney = false;
    @observable currentCoin = {
        currencyNameEn: '',
        currencyId: ''
    }; // 当前币种

    constructor(stores) {
        this.authStore = stores.authStore;
    }

    @computed
    get coinList() {
        return this.accountData.coinList || [];
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
    filterByName(value) {
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
    filterZeroAmount(filterZero) {
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
    getUserCoinAccount(callback) {
        if (this.isFetching) {
            return;
        }

        this.originAccountData = {};
        this.accountData = {};
        this.isFetching = true;

        getCoinAccount().then((data) => {
            data = require('../mock/assets.json');
            runInAction(() => {
                if (data.status == 200) {
                    // 拷贝存储数组
                    this.originAccountData = JSON.parse(JSON.stringify(data.attachment));
                    this.accountData = data.attachment;                    
                    
                    if (typeof callback =='function') {
                        callback();
                    }
                }
                this.isFetching = false;
            })
        }).catch(()=>{
            this.isFetching = false;
        })
    }

    @action
    updateCurrentCoin(data) {
        this.currentCoin =  data;
    }
    /**
     * 查询当前币种地址及二维码
     */
    @action
    selectUserAddress(currencyId, currencyNameEn) {
        selectUserAddress(currencyId)
            .then((data) => {
                data = require('../mock/address.json');
                runInAction(() => {
                    if (data.status == 200) {
                        // 拷贝存储数组
                        let currentCoin = Object.assign(data.attachment, {
                            currencyId,
                            currencyNameEn
                        });
                        this.updateCurrentCoin(currentCoin);
                    }
                })
            });
    }

    @action
    filterCurrentCoinByName() {

    }
}

export default Account;