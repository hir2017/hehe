import { observable, computed, autorun, action, runInAction } from 'mobx';
import { getCoinAccount, selectUserAddress } from '../api/http';

class Account {
    @observable accountData = {};
    @observable baseCoinInfo = {};
    @observable isFetching = false;
    @observable visibleMoney = false;
    @observable currentCoin = {
        currencyNameEn: '',
        currencyId: '',
        amountLowLimit: 0
    }; // 当前币种

    constructor(stores) {
        this.authStore = stores.authStore;
        this.commonStore = stores.commonStore;
    }

    @computed
    get coinList() {
        return this.accountData.coinList || [];
    }

    @computed
    get allMoney() {
        if (this.accountData.allMoney > 0) {
            return NumberUtil.formatNumber(this.accountData.allMoney, this.commonStore.pointPrice);
        } else {
            return 0.00;
        }
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
            if (accountData && accountData.coinList.length > 0) {
                accountData.coinList.forEach((item, index) => {
                    if (parseFloat(item.amount) > 0) {
                        coinList[coinList.length] = item;
                    }
                });
                accountData.coinList = coinList;
            }
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
        this.isFetching = true;
        this.originAccountData = {};
        this.accountData = {};

        return getCoinAccount().then((data) => {
            // data = require('../mock/assets.json');
            runInAction(() => {
                if (data.status == 200) {
                    // 从数字币列表从筛选出基础币
                    let coinList = []; // 数字币
                    let info = {}; // 基础币
                    let len = data.attachment.coinList.length;
                    let pointPrice = this.commonStore.pointPrice;

                    for (let i = 0; i < len; i++) {
                        let item = data.attachment.coinList[i];
                        // 币种配置小数位走
                        if (item.currencyNameEn == UPEX.config.baseCurrencyEn ) {
                            item.cashAmount = NumberUtil.formatNumber(item.cashAmount, pointPrice);
                            item.amount = NumberUtil.formatNumber(item.amount, pointPrice);
                            item.freezeAmount = NumberUtil.formatNumber(item.freezeAmount, pointPrice);
                            item.twd_value = NumberUtil.formatNumber(item.twd_value, pointPrice);

                            info = item;
                        } else {
                            item.cashAmount = NumberUtil.separate(item.cashAmount);
                            item.amount = NumberUtil.separate(item.amount);
                            item.freezeAmount = NumberUtil.separate(item.freezeAmount);

                            item.twd_value = NumberUtil.formatNumber(item.twd_value, pointPrice);
                            coinList[coinList.length] = item;
                        }
                    }

                    this.baseCoinInfo = info;
                    data.attachment.coinList = coinList;

                    // 拷贝存储数据
                    this.originAccountData = JSON.parse(JSON.stringify(data.attachment));
                    this.accountData = data.attachment;

                    if (typeof callback == 'function') {
                        callback();
                    }
                }
                this.isFetching = false;
            })
        }).catch(() => {
            runInAction(() => {
                this.isFetching = false;
            })
        })
    }

    @action
    updateCurrentCoin(data) {
        this.currentCoin = data;
    }
    /**
     * 查询当前币种地址及二维码
     */
    @action
    selectUserAddress(currencyId, currencyNameEn) {
        selectUserAddress(currencyId)
            .then((data) => {
                // data = require('../mock/address.json');
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
            })
            .catch(() => {

            })
    }
}

export default Account;
