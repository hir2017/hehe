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
    @observable selectedCoin = {}; // 选中的币种
    @observable sortByKey = ''; // 按{key}排序
    @observable sortByType = 'desc'; // 排序方式，升序:asc, 降序: desc
    @observable onlyCollectedCoins = false; // 只查看收藏的交易币
    @observable searchValue = '';

    tradeCoinsCollected = {};
    tradeCoinsSearched = {};

    constructor(stores) {
        this.commonStore = stores.commonStore;
    }

    @computed
    get hotCoins(){
        let hotCoins = [];
        
        if (this.cacheCoins.length > 0) {
            hotCoins = this.cacheCoins.filter((item) => {
                return item.recommend === 1;
            })
        }

        return hotCoins.slice(0, 5); // 返回最新的5个即可
    }


    @action
    getData() {
        this.getMarketList();
        this.quoteNotify();
        this.getCollectCoinsList();
    }
    /**
     * 行情列表
     */
    @action
    getMarketList() {
        socket.off('list');
        socket.emit('list');
        socket.on('list', (data) => {
            runInAction('quote list', () => {
                let result = data.filter((item) => {
                    return item.info.currencyNameEn === 'TWD'; // 只显示基础币=TWD
                })[0];

                if (result) {
                    this.baseCoinInfo = result.info;
                    this.tradeCoins = this.parseCoinList(result.tradeCoins);
                    this.cacheCoins = [...this.tradeCoins];
                    this.selectedCoin = this.tradeCoins[0];
                } else {
                    this.noCoin = true;
                }

                this.dataReady = true;
            })
        })
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
    async getCollectCoinsList () {
        const res = await listOptional ()
        
        if (res.status !== 200) {
            console.error(res.message)
        } else {
            runInAction(() => {
                this.collectCoinsList = res.attachment;    
            });
        }
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
        item.currentAmountText = NumberUtil.formatNumber(item.currentAmount, this.commonStore.pointPrice);
        // 最高价
        item.highPriceText = NumberUtil.formatNumber(item.highPrice, this.commonStore.pointPrice);
        // 最低价
        item.lowPriceText = NumberUtil.formatNumber(item.lowPrice, this.commonStore.pointPrice);
        // 开盘价
        item.openPriceText = NumberUtil.formatNumber(item.openPrice, this.commonStore.pointPrice);
        // 收盘价
        item.closePriceText = NumberUtil.formatNumber(item.closePrice, this.commonStore.pointPrice);
        // 24小时成交数量
        item.volumeText = NumberUtil.formatNumber(item.volume, item.pointNum);
        // 成交额
        item.amountText = NumberUtil.formatNumber(item.volume, this.commonStore.pointPrice);

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
        this.tradeCoins.filter((item) => {
            if (item.baseCurrencyId === data.baseCurrencyId && item.currencyId === data.currencyId) {
                item = this.parseCoinItem(data);
            }
        })
        this.cacheCoins.filter((item) => {
            if (item.baseCurrencyId === data.baseCurrencyId && item.currencyId === data.currencyId) {
                item = this.parseCoinItem(data);
            }
        })
    }
    // 更新选中的交易币
    @action
    setSelectedCoin(item) {
        this.selectedCoin = item;
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
    filterCollectCoins (checked) {
        const data = this.collectCoinsList;
        let tradeCoins = [];

        this.onlyCollectedCoins = checked;

        if (!checked) {
            if (this.searchValue) {
                tradeCoins = this.tradeCoinsSearched;
            } else {
                tradeCoins = [...this.cacheCoins];    
            }
        } else{
            tradeCoins = this.tradeCoins.filter((item) => {
                return data.some((_item) => {
                    return _item.tradeCurrencyId === item.currencyId && _item.baseCurrencyId === item.baseCurrencyId
                })
            })

            this.tradeCoinsCollected =  tradeCoins;
        }

        this.tradeCoins = tradeCoins;
    }

    /**
     * 搜索
     */
    @action
    filterByName (name) {
        let tradeCoins = [], tradeCoinsTemp = [];

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
        
        toDo = data.selected ? cancleOptional : addOptional;
        
        toDo(data).then((res)=>{
            if (res.status !== 200) {
                console.error(res.message);
            }

            this.getCollectCoinsList();
        });        
    }
}

export default MarketListStore;