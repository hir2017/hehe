import { message } from 'antd';
import { socket } from '../../../api/socket';

export default (store, authStore) => {
    return {
        fetch() {
            let timer;
            let request = () => {
                this.getMarketListInfo();
                timer && clearTimeout(timer);
                timer = setTimeout(() => {
                    fetch();
                }, 10 * 1000); // 10秒钟轮询查询
            }

            request();

            this.quoteNotify();

            if (authStore.isLogin) {
                this.getCollectCoinsList();
            } else {
                this.getCollectDataFromLocal();
            }
        },

        getMarketListInfo() {
            socket.off('list');
            socket.emit('list');
            socket.on('list', (data) => {
                runInAction('quote list', () => {
                    this.dataReady = true;

                    let marketMap = {};
                    let marketList = [];

                    data.forEach((market, index) => {
                        marketList[marketList.length] = market.info.currencyNameEn;
                        market.tradeCoins[0].currentAmount = +new Date() % 9;
                        marketMap[market.info.currencyNameEn] = market.tradeCoins;
                    })

                    if (this.isFirst) {
                        // 默认选中的是第一个基础币
                        this.marketList = marketList;
                        this.selectedMarketCode = data[0].info.currencyNameEn;
                    }

                    this.isFirst = false;

                    this.marketMap = marketMap;
                })
            })
        }
    }
})