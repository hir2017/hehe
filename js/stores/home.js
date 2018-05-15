import { observable, autorun, computed, action, configure, flow } from 'mobx';
import { socket, baseCurrencyId } from '../api/socket';
import { addOptional, cancleOptional, listOptional } from '../api/http'

class HomeStore {
    @observable allCoins = [];
    @observable hotCoins = [];
    @observable collectCoinsList = [];

    cacheCoins = []

    @action
    getAllCoins() {
        // this.allCoins = require('../mock/coins.json')
        // this.cacheCoins = this.allCoins
        const ctx = this
        socket.off('list')
        socket.emit('list')
        socket.on('list', function(data) {
            ctx.getAllCoinsSuccess (data)
        })

    }

    @action.bound
    getAllCoinsSuccess (data) {
        this.allCoins = data[0].tradeCoins;
        this.cacheCoins = data[0].tradeCoins;
        this.hotCoins = this.recommendCoins(data[0].tradeCoins);
    }

    @action
    sortCoins (field, type) {
        this.allCoins = this.allCoins.sort((a, b) => {
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
            this.allCoins = this.cacheCoins
            return
        }

        if(this.allCoins.length === 0) {
            this.allCoins = this.cacheCoins
        }

        const res = this.allCoins.filter((item) => {
            return item.currencyNameEn === name
        })
        
        this.allCoins = res
    }

    @action
    filterCollectCoins (checked) {
        const data = this.collectCoinsList
        if(!checked) {
            this.allCoins = this.cacheCoins
            return
        }
        const res = this.allCoins.filter((item) => {
            return data.some((_item) => {
                return _item.tradeCurrencyId === item.currencyId && _item.baseCurrencyId === item.baseCurrencyId
            })
        })

        this.allCoins = res
    }


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

    recommendCoins (data) {
        return data.filter((item) => {
            return item.recommend === 1
        })
    }

    async collectCoins (data) {
        const res = await addOptional (data)
        if (res.status !== 200) {
            console.error(res.message)
        } else {
            this.getCollectCoinsList()
        }
    }

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