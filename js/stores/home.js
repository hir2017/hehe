import { observable, computed, action, runInAction } from 'mobx';
import { socket, baseCurrencyId } from '../api/socket';
import { addOptional, cancleOptional, listOptional } from '../api/http'
import NumberUtil from '../lib/util/number';
import Select from 'antd';

class HomeStore {
    @observable allCoins = [];
    @observable hotCoins = [];
    @observable collectCoinsList = [];
    @observable coin = {};
    @observable isFetchingList = false;

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.marketListStore = stores.marketListStore;
    }

    /**
     * 复制交易币列表
     */
    @computed
    tradeCoins() {
        
        if (this.tradeCoins.length > 0) {

        } else {
            let data = { list: this.marketListStore.tradeCoins };    
        }
        
        
        return JSON.parse(JSON.stringify(data)).list;
    }



    @action
    sortCoins (field, type) {
        this.allCoins = this.tradeCoins.sort((a, b) => {
            if (type === 'asc') {
                return a[field] - b[field]
            } else {
                return b[field] - a[field]
            }
        })
    }

    @action
    filterCoin (name) {

        if(!name) {
            this.allCoins = this.tradeCoins;
            return
        }

        if(this.allCoins.length === 0) {
            this.allCoins = this.tradeCoins
        }

        const res = this.tradeCoins.filter((item) => {
            if (item.currencyNameEn) {
                return item.currencyNameEn.toLowerCase().includes(name.toLowerCase())
            }
        })

        this.allCoins = res;
    }

    @action
    selectCoin (baseID, id) {
        const res = this.allCoins.filter((item) => {
            return item.baseCurrencyId === baseID && item.currencyId === id
        })
        this.coin = res[0]
    }

    @action
    filterCollectCoins (checked) {
        const data = this.collectCoinsList
        if(!checked) {
            this.allCoins = this.tradeCoins
            return
        }
        const res = this.allCoins.filter((item) => {
            return data.some((_item) => {
                return _item.tradeCurrencyId === item.currencyId && _item.baseCurrencyId === item.baseCurrencyId
            })
        })

        this.allCoins = res
    }

    @action
    currencyCombination (data) {
        const coinArray = []
        for (const item of data) {
            console.log(item, 'item')
            coinArray.push(item.info)
            for (const childItem of item.tradeCoins) {
                coinArray.push(childItem)
            }
        }
        return coinArray
    }

    @action
    recommendCoins (data) {
        let list =  data.filter((item) => {
            return item.recommend === 1;
        })

        return list.slice(0, 5);
    }

    @action
    async collectCoins (data) {
        const res = await addOptional (data)
        if (res.status !== 200) {
            console.error(res.message)
        } else {
            this.getCollectCoinsList()
        }
    }

    @action
    async cancleCollectCoins (data) {
        const res = await cancleOptional (data)
        if (res.status !== 200) {
            console.error(res.message)
        } else {
            this.getCollectCoinsList()
        }
    }

    @action
    async getCollectCoinsList () {
        const res = await listOptional ()
        if (res.status !== 200) {
            console.error(res.message)
        } else {
            this.collectCoinsList = res.attachment
        }
    }
}

export default HomeStore;
