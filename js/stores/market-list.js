/**
 * 行情列表
 * FOR 首页 和 交易中心
 */
import { observable, computed, autorun, action, runInAction } from 'mobx';
import { addOptional, cancleOptional, listOptional } from '../api/http'
import NumberUtil from '../lib/util/number';
import { socket } from '../api/socket';

class MarketListStore {
    @observable baseCoinInfo = {}; // 基础币
    @observable tradeCoins = []; // 交易币列表
    @observable cacheCoins = [];
    @observable collectCoinsList = []; // 用户收藏列表
    @observable dataReady = false; // 获取币种
    @observable noCoin = false; // 没有币种
    @observable sortByKey = ''; // 按{key}排序
    @observable sortByType = 'desc'; // 排序方式，升序:asc, 降序: desc
    @observable onlyCollectedCoins = false; // 只查看收藏的交易币
    @observable searchValue = '';
    @observable marketList = []; // ['TWDT','BTC','Optional']
    @observable marketMap = {};
    @observable selectedMarketCode = '';
    @observable selectedCoinCode = '';

    tradeCoinsCollected = {};
    tradeCoinsSearched = {};
    isFirst = true;

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.authStore = stores.authStore;

        this.handler = autorun(() => {
            // do something
            
        })
    }

    @action
    reset() {
        this.baseCoinInfo = {}; // 基础币
        this.tradeCoins = []; // 交易币列表
        this.cacheCoins = [];
        this.collectCoinsList = []; // 用户收藏列表
        this.dataReady = false; // 获取币种
        this.noCoin = false; // 没有币种
        this.sortByKey = ''; // 按{key}排序
        this.sortByType = 'desc'; // 排序方式，升序:asc, 降序: desc
        this.onlyCollectedCoins = false; // 只查看收藏的交易币
        this.searchValue = '';
        this.selectedMarketCode = '';
        this.selectedCoinCode = '';
        this.isFirst = true;
    }

    // 法币市场。币对列表
    @computed get hotCoins() {
        let market = this.marketMap[UPEX.config.baseCurrencyEn];
        let hotCoins;

        if (market.length > 0) {
            hotCoins = market.filter((item) => {
                if (item.recommend === 1) {
                    item = this.parseCoinItem(item);
                    return true;
                }
            });
        }

        return hotCoins;
    }

    // 选中的市场列表
    @computed get selectedTradeCoins() {
        let tradeCoins = this.marketMap[this.selectedMarketCode];

        tradeCoins.forEach((item, index) => {
            item.index = index;
            item = this.parseCoinItem(item);
        });

        return tradeCoins;
    }
    /**
     * 市场默认的币种
     */
    @computed get defaultTradeCoin() {
        let tradeCoins = this.marketMap[this.selectedMarketCode];

        return tradeCoins[0];
    }

    @computed get selectedCoin() {
        let tradeCoins, coin;

        if (this.selectedCoinCode) {
            tradeCoins = this.marketMap[this.selectedMarketCode];

            coin = tradeCoins.filter((item) => {
                return item.currencyNameEn === this.selectedCoinCode;
            })[0]

        }

        return coin || this.defaultTradeCoin;
    }

    @action
    getData() {
        let timer;
        let fetch = () => {
            this.getMarketListInfo();
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                fetch();
            }, 10 * 1000); // 10秒钟轮询查询
        }

        fetch();

        this.quoteNotify();

        if (this.authStore.isLogin) {
            this.getCollectCoinsList();
        } else {
            this.getCollectDataFromLocal();
        }
    }

    /**
     * 行情列表
     */
    @action
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
                    // 添加自选
                    marketList[marketList.length] = 'Optional';
                    this.marketList = marketList;
                    // 默认选中的是第一个基础币
                    this.selectedMarketCode = data[0].info.currencyNameEn;
                }

                this.isFirst = false;

                this.marketMap = marketMap;

                // if (result) {
                //     this.baseCoinInfo = result.info;

                //     let tradeCoinsMap = {};

                //     for (var i = result.tradeCoins.length - 1; i >= 0; i--) {
                //         tradeCoinsMap[result.tradeCoins[i].currencyId] = result.tradeCoins[i];
                //     }

                //     if (this.isFirst) {
                //         this.cacheCoins = this.parseCoinList(result.tradeCoins);
                //         this.tradeCoins = [...this.cacheCoins];
                //         this.selectedCoin = this.tradeCoins[0];
                //     } else {
                //         this.cacheCoins = this.parseCoinList(result.tradeCoins);

                //         if (this.tradeCoins.length > 0) {
                //             this.tradeCoins.forEach((item, index) => {
                //                 this.tradeCoins[index] = tradeCoinsMap[item.currencyId];
                //             })
                //         }
                //         // 更新选中的数据
                //         this.selectedCoin = tradeCoinsMap[this.selectedCoin.currencyId];
                //     }
                // } else {
                //     this.noCoin = true;
                // }
            })
        })
    }

    @action
    getCollectDataFromLocal() {
        this.collectCoinsList = UPEX.cache.getCache('collectist') || [];
    }

    @action
    addCollectDataToLocal(item) {
        this.collectCoinsList[this.collectCoinsList.length] = item;
        UPEX.cache.setCache('collectist', this.collectCoinsList);
    }

    @action
    removeCollectDataFromLocal(data) {
        $.each(this.collectCoinsList, (i, item) => {
            if (item.tradeCurrencyId == data.tradeCurrencyId) {
                this.collectCoinsList.splice(i, 1);
                return false;
            }
        });

        UPEX.cache.setCache('collectist', this.collectCoinsList);
    }

    @action
    clearCollectDataFromLocal() {
        UPEX.cache.removeCache('collectist');
    }
    /**
     * 行情通知
     */
    @action
    quoteNotify() {
        socket.off('quoteNotify');
        socket.emit('quoteNotify');
        socket.on('quoteNotify', (data) => {
            runInAction('quote change', () => {
                /**
                 * 更新行情
                 */
                this.updateTradeCoin(data);
            })
        })
    }

    @action
    getCollectCoinsList() {
        listOptional().then((res) => {
            if (res.status == 200) {
                runInAction(() => {
                    this.clearCollectDataFromLocal();
                    this.collectCoinsList = res.attachment;
                });
            }
        })
    }
    /**
     * 销毁socket事件
     */
    @action
    destorys() {
        socket.off('quoteNotify');
        socket.off('list');
    }
    /**
     * 格式化交易币列表信息
     */
    parseCoinList(arr = []) {
        // 遍历，1. 按成交量降序排列，2. 按最新成交价降序排序
        arr.forEach((item, index) => {
            item = this.parseCoinItem(item);
        });

        return arr;
    }

    parseCoinItem(item) {
        item.changeRateText = NumberUtil.asPercent(item.changeRate);
        // 最新成交价
        item.currentAmountText = NumberUtil.formatNumber(item.currentAmount, item.pointPrice);
        // 最高价
        item.highPriceText = NumberUtil.formatNumber(item.highPrice, item.pointPrice);
        // 最低价
        item.lowPriceText = NumberUtil.formatNumber(item.lowPrice, item.pointPrice);
        // 开盘价
        item.openPriceText = NumberUtil.formatNumber(item.openPrice, item.pointPrice);
        // 收盘价
        item.closePriceText = NumberUtil.formatNumber(item.closePrice, item.pointPrice);
        // 24小时成交数量
        item.volumeText = NumberUtil.formatNumber(item.volume, item.pointNum);
        // 成交额
        item.amountText = NumberUtil.formatNumber(item.amount, item.pointPrice);

        return item;
    }

    /**
     * 更新基础币信息
     */
    @action
    updateBaseCoin(item) {
        this.baseCoinInfo = this.parseCoinItem(item);
    }

    /**
     * 更新交易币信息
     */
    @action
    updateTradeCoin(data) {

        this.tradeCoins.map((item, index) => {
            if (item.baseCurrencyId === data.baseCurrencyId && item.currencyId === data.currencyId) {
                this.tradeCoins[index] = this.parseCoinItem(data);
                return false;
            }
        })

        this.cacheCoins.map((item, index) => {
            if (item.baseCurrencyId === data.baseCurrencyId && item.currencyId === data.currencyId) {
                this.cacheCoins[index] = this.parseCoinItem(data);
                return false;
            }
        })
    }
    // 更新选中的交易币
    @action
    updateSelectedCoinCode(value) {
        this.selectedCoinCode = value;
    }

    @action
    updateSelectedMarketCode(value) {
        this.selectedMarketCode = value;
    }
    /**
     * 排序
     */
    @action
    sortByCondition(field) {
        // 默认降序
        let tradeCoins = [];
        let type;

        if (this.sortByKey == field) {
            type = this.sortByType == 'desc' ? 'asc' : 'desc';
        } else {
            type = 'desc';
        }

        // 遍历，1. 按成交量降序排列，2. 按最新成交价降序排序
        tradeCoins = this.tradeCoins.sort((a, b) => {
            if (type === 'asc') {
                return a[field] - b[field];
            } else {
                return b[field] - a[field];
            }
        });

        this.sortByType = type;
        this.sortByKey = field;
        this.tradeCoins = tradeCoins;
    }
    /**
     * 只查看收藏
     */
    @action
    filterCollectCoins(checked) {
        const data = this.collectCoinsList;
        let tradeCoins = [];

        this.onlyCollectedCoins = checked;

        if (!checked) {
            if (this.searchValue) {
                this.filterByName(this.searchValue);
                return;
                // tradeCoins = this.tradeCoinsSearched;
            } else {
                tradeCoins = [...this.cacheCoins];
            }
        } else {
            tradeCoins = this.tradeCoins.filter((item) => {
                return data.some((_item) => {
                    return _item.tradeCurrencyId === item.currencyId && _item.baseCurrencyId === item.baseCurrencyId
                })
            })

            this.tradeCoinsCollected = tradeCoins;
        }

        this.tradeCoins = tradeCoins;
    }

    /**
     * 搜索
     */
    @action
    filterByName(name) {
        let tradeCoins = [],
            tradeCoinsTemp = [];

        this.searchValue = name;

        if (this.onlyCollectedCoins) {
            tradeCoinsTemp = this.tradeCoinsCollected;
        } else {
            tradeCoinsTemp = [...this.cacheCoins];
        }

        if (name) {
            name = name.toLowerCase();

            tradeCoinsTemp.forEach((item, index) => {
                if (item.currencyNameEn.toLowerCase().indexOf(name) > -1) {
                    tradeCoins[tradeCoins.length] = item;
                }
            });

            this.tradeCoinsSearched = tradeCoins;
        } else {
            tradeCoins = tradeCoinsTemp;
        }

        this.tradeCoins = tradeCoins;
    }

    @action
    toggleCollectCoin(data) {
        if (this.authStore.isLogin) {
            toDo = data.selected ? cancleOptional : addOptional;

            toDo(data).then((res) => {
                if (res.status !== 200) {
                    console.error(res.message);
                }

                this.getCollectCoinsList();
            });
        } else {
            // 若用户不登录，维护一套本地缓存的收藏列表
            let item = {
                baseCurrencyId: data.baseCurrencyId,
                tradeCurrencyId: data.currencyId,
                status: 1
            }

            if (data.selected) {
                this.removeCollectDataFromLocal(item);
            } else {
                this.addCollectDataToLocal(item);
            }

        }
    }

}

export default MarketListStore;