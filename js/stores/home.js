import { observable, autorun, computed, action } from 'mobx';
import { socket, baseCurrencyId } from '../api/socket';

class HomeStore {
    @observable allCoins = [];
    @observable hotCoins = [];

    @action
    getAllCoins() {
        socket.emit('indexAllCoins', { type: 1 })
        socket.on('indexAllCoins', function(data) {
            console.log('data', data);
            if (data.type === 1) {
                data.attachment.forEach((item) => {
                    item.update = false;
                })

                this.allCoins = data.attachment;
            }
        })

    }

    @action
    getHomeLoginedData(id = baseCurrencyId) {
        socket.off('loginAfter')
        socket.emit('loginAfter', { baseCurrencyId: id })
        socket.on('loginAfter', function(data) {
            console.log('+++++++++++++loginAfter', data);
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