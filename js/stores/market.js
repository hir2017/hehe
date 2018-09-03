import { observable, computed, autorun, action, runInAction } from 'mobx';
import { addOptional, cancleOptional, listOptional } from '../api/http'
import { socket } from '../api/socket';

// 市场默认顺序
const marketSort = ['AUD', 'TWD', 'TWDT', 'BTC', 'ETH', 'GTO'];

export default class MarketStore {
    @observable marketNav = []; // 市场列表
    @observable marketMap = {};
    @observable currencyMap = {};
    @observable hotCurrencies = [];
    @observable selectedMarketCode = '';
    @observable selectedCurrency = {};
    @observable selectedCurrencies = [];
    @observable sortByKey = ''; // 按{key}排序
    @observable sortByType = 'desc'; // 排序方式，升序:asc, 降序: desc
    @observable collectCoinsList = []; // 自选列表
    @observable searchValue = '';

    constructor(stores) {
        this.authStore = stores.authStore;
        this.isInit = false;

        this.handler = autorun(() => {
            let selectedCurrencies;

            if (this.selectedMarketCode == 'Marked') {
                selectedCurrencies = this.filterMarked();

                if (this.searchValue) {
                    selectedCurrencies = this.filterByBame(selectedCurrencies, this.searchValue);
                }
            } else {
                let list = this.marketMap[this.selectedMarketCode] || [];

                if (this.searchValue) {
                    list = this.filterByBame(list, this.searchValue);
                }

                selectedCurrencies = this.getSelectedCurrencies(list);
            }

            this.selectedCurrencies = selectedCurrencies;
        });
    }

    getSelectedCurrencies(list) {
        if (this.sortByKey) {
            list = list.sort((a, b) => {
                if (this.sortByType === 'asc') {
                    return a[this.sortByKey] - b[this.sortByKey];
                } else {
                    return b[this.sortByKey] - a[this.sortByKey];
                }
            });
        }

        return list;
    }

    filterByBame(arr, name) {
        let result = [];

        if (name) {
            name = name.toLowerCase();

            arr.forEach((item, index) => {
                if (item.currencyNameEn.toLowerCase().indexOf(name) > -1) {
                    result[result.length] = item;
                }
            });
        } else {
            result = arr;
        }

        return result;
    }

    // 过滤自选
    filterMarked() {
        let list = [];

        $.each(this.collectCoinsList, (index, item)=>{
            let key = [item.baseCurrencyId, item.tradeCurrencyId].join('_');

            if (this.currencyMap[key]) {
                list[list.length] = this.currencyMap[key];
            }
        })

        list = this.getSelectedCurrencies(list);

        return list;
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

    @action updateCurrencies(data) {
        this.selectedCurrencies = data;
    }

    @action updateCurrency(data) {
        this.selectedCurrency = data;
    }

    // 获取热门的推荐列表
    @action updateHotCurrencies(arr) {
        let market = this.marketMap[UPEX.config.baseCurrencyEn];
        let currencies = [];

        // 推荐法币
        currencies = market.filter((item) => {
            return item.recommend === 1;
        })
        
        // 若法币不满足5个，再过滤其他币种补充
        if (currencies.length < 5) {
            $.each(arr, (index, market) => {
                if (market.info.currencyNameEn !== UPEX.config.baseCurrencyEn) {
                    $.each(market.tradeCoins, (idx, item) => {
                        if (item.recommend === 1) {
                            currencies[currencies.length] = item;
                        }
                    })
                }
            });
        }

        this.hotCurrencies = currencies.slice(0, 5);
    }

    @action updateSearchValue(value) {
        this.searchValue = value;
    }

    @action initMarket() {
        this.sortByKey = '';
        this.sortByType = 'desc';
        this.selectedCurrency = this.selectedCurrencies[0] || {};
    }

    @action getData() {
        let timer;
        let fetch = () => {
            this.getMarketListInfo();
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                fetch();
            }, 10 * 1000); // 10秒钟轮询查询
        }

        fetch();

        if (this.authStore.isLogin) {
            this.getCollectCoinsList();
        } else {
            this.getCollectDataFromLocal();
        }
    }

    // 获取行情列表信息
    @action getMarketListInfo() {
        socket.off('list');
        socket.emit('list');
        socket.on('list', (data) => {
            runInAction(() => {
                let marketMap = {};
                let marketNav = [];
                let currencyMap = {};
                let navTemp = [];

                data.forEach((market, index) => {
                    marketNav[marketNav.length] = market.info.currencyNameEn;
                    marketMap[market.info.currencyNameEn] = market.tradeCoins;

                    market.tradeCoins.map((item, index) => {
                        item.key = [item.baseCurrencyId, item.currencyId].join('_');

                        this.parseCoinItem(item);
                        currencyMap[item.key] = item;

                        if (this.selectedCurrency.key && this.selectedCurrency.key == item.key) {
                            this.selectedCurrency = item;
                        }
                    })
                })

                if (this.isInit == false) {
                    // 初始化默认选中的是第一个基础币
                    if (data[0]) {
                        this.selectedMarketCode = data[0].info.currencyNameEn;
                        this.selectedCurrency = data[0].tradeCoins[0];
                    }



                    for (let i = 0, len = marketSort.length; i < len; i++) {
                        let idx = marketNav.indexOf(marketSort[i]);

                        if (idx > -1) {
                            navTemp[navTemp.length] = marketSort[i];
                            marketNav.splice(idx, 1)
                        }
                    }

                    this.marketNav = navTemp.concat(marketNav);
                }

                // 市场导航排序
                this.isInit = true;

                this.marketMap = marketMap;
                this.currencyMap = currencyMap;

                // 更新热门推荐列表中的货币信息
                this.updateHotCurrencies(data);
            })
        })
    }

    @action updateMarketCode(code) {
        this.selectedMarketCode = code;
    }
    /**
     * 排序
     */
    @action sortByCondition(field) {
        let type;

        if (this.sortByKey == field) {
            type = this.sortByType == 'desc' ? 'asc' : 'desc';
        } else {
            type = 'desc';
        }

        this.sortByType = type;
        this.sortByKey = field;
    }

    @action getCollectCoinsList(callback) {
        listOptional().then((res) => {
            if (res.status == 200) {
                runInAction(() => {
                    this.clearCollectDataFromLocal();
                    this.collectCoinsList = res.attachment;

                    if (typeof callback == 'function') {
                        callback();
                    }
                });
            }
        })
    }

    @action toggleCollectCoin(data) {
        if (this.authStore.isLogin) {
            toDo = data.selected ? cancleOptional : addOptional;

            toDo(data).then((res) => {
                if (res.status !== 200) {
                    console.error(res.message);
                }

                this.getCollectCoinsList(() => {
                    if (this.collectCoinsList.length == 0 && this.selectedMarketCode == 'Marked') {
                        this.selectedCurrency = {};
                    }
                });
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

    // 添加自选
    @action addCollectDataToLocal(item) {
        this.collectCoinsList[this.collectCoinsList.length] = item;

        // 更新本地缓存的自选内容
        UPEX.cache.setCache('collectist', this.collectCoinsList);
    }
    // 删除自选
    @action removeCollectDataFromLocal(data) {
        $.each(this.collectCoinsList, (i, item) => {
            if (item.tradeCurrencyId == data.tradeCurrencyId) {
                this.collectCoinsList.splice(i, 1);
                return false;
            }
        });
        // 更新本地缓存的自选内容
        UPEX.cache.setCache('collectist', this.collectCoinsList);
    }

    @action getCollectDataFromLocal() {
        this.collectCoinsList = UPEX.cache.getCache('collectist') || [];
    }

    @action clearCollectDataFromLocal() {
        UPEX.cache.removeCache('collectist');
    }
}