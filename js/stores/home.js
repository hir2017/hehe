import { observable, autorun, computed, action } from 'mobx';
import { socket, baseCurrencyId } from '../api/socket';

class HomeStore {
    @observable allCoins = [];
    @observable hotCoins = [];

    cacheCoins = []

    @action
    getAllCoins() {
        // this.allCoins = require('../mock/coins.json')
        // this.cacheCoins = this.allCoins
        const ctx = this
        socket.off('list')
        socket.emit('list')
        socket.on('list', function(data) {
            ctx.allCoins = data[0].tradeCoins;
            ctx.cacheCoins = data[0].tradeCoins;
        })

    }

    @action
    sortCoins (field, type) {
        console.log(type, 'type')
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

        const res = Array.from(this.allCoins).filter((item) => {
            return item.currencyNameEn === name
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

    @action
    getHomeLoginedData(id = baseCurrencyId) {
        const context = this
        socket.off('loginAfter')
        socket.emit('loginAfter', { baseCurrencyId: id })
        socket.on('loginAfter', function(data) {
            const res = context.currencyCombination(data)
            console.log(res)
        })
    }

    @action
    fetchHotMarkets() {
        this.hotCoins = [{
                "currencyName": "BTC",
                "currentAmount": 0.0014574,
                "volume": 394374.334,
                "changeRate": '3.4',
                "klines": "0.00142630,0.00143350,0.00143420,0.00144750,0.00145970,0.00145600,0.00145690,0.00144820,0.00146550,0.00146500,0.00147240,0.00147230,0.00146780,0.00147180,0.00146630,0.00145070,0.00145410,0.00145340,0.00143660,0.00144680,0.00143960,0.00144500,0.00144050,0.00144250".split(','),
            },
            {
                "currencyName": "EOS",
                "currentAmount": 0.0014573,
                "volume": 394374.334,
                "changeRate": '61.4',
                "klines": "0.00142630,0.00143350,0.00143420,0.00144750,0.00145970,0.00145600,0.00145690,0.00144820,0.00146550,0.00146500,0.00147240,0.00147230,0.00146780,0.00147180,0.00146630,0.00145070,0.00145410,0.00145340,0.00143660,0.00144680,0.00143960,0.00144500,0.00144050,0.00144250".split(','),
            },
            {
                "currencyName": "ETH",
                "currentAmount": 0.0024574,
                "volume": 394374.334,
                "changeRate": '61.4',
                "klines": "0.00142630,0.00143350,0.00143420,0.00144750,0.00145970,0.00145600,0.00145690,0.00144820,0.00146550,0.00146500,0.00147240,0.00147230,0.00146780,0.00147180,0.00146630,0.00145070,0.00145410,0.00145340,0.00143660,0.00144680,0.00143960,0.00144500,0.00144050,0.00144250".split(','),
            },
            {
                "currencyName": "NANO",
                "currentAmount": 0.0024576,
                "volume": 394374.334,
                "changeRate": '61.4',
                "klines": "0.00142630,0.00143350,0.00143420,0.00144750,0.00145970,0.00145600,0.00145690,0.00144820,0.00146550,0.00146500,0.00147240,0.00147230,0.00146780,0.00147180,0.00146630,0.00145070,0.00145410,0.00145340,0.00143660,0.00144680,0.00143960,0.00144500,0.00144050,0.00144250".split(','),
            },
            {
                "currencyName": "NANO",
                "currentAmount": 0.0024586,
                "volume": 394374.334,
                "changeRate": '-61.4',
                "klines": "0.00142630,0.00143350,0.00143420,0.00144750,0.00145970,0.00145600,0.00145690,0.00144820,0.00146550,0.00146500,0.00147240,0.00147230,0.00146780,0.00147180,0.00146630,0.00145070,0.00145410,0.00145340,0.00143660,0.00144680,0.00143960,0.00144500,0.00144050,0.00144250".split(','),
            }
        ]
    }
}

export default HomeStore;