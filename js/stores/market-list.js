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
    @observable dataReady = false; // 获取币种
    @observable noCoin = false; // 没有币种
    @observable selectedCoin = {}; // 选中的币种

    cacheCoinArr = [];

    constructor(stores) {
        this.commonStore = stores.commonStore;
    }

    /**
     * 推荐的热门数字币列表
     */
    @computed
    get hotCoins() {
        let list = [];

        if (this.tradeCoins.length > 0) {
            list = this.tradeCoins.filter((item) => {
                return item.recommend === 1;
            })
        }

        return list.slice(0, 5); // 返回最新的5个即可
    }

    @action
    getData() {
        this.getMarketList();
        this.quoteNotify();
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
                    this.selectedCoin = this.tradeCoins[0];
                    // this.allCoins = result.tradeCoins;
                    // this.cacheCoins = JSON.parse(JSON.stringify(result.tradeCoins));
                } else {
                    this.noCoin = true;
                }

                this.dataReady = false;
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
            this.cacheCoinArr[this.cacheCoinArr.length] = item.currencyNameEn;
            item = this.parseCoinItem(item);
        });

        return arr;
    }

    parseCoinItem(item) {
        item.changeRateText = NumberUtil.asPercent(item.changeRate);
        // 最新成交价
        item.currentAmount = NumberUtil.formatNumber(item.currentAmount, this.commonStore.pointPrice);
        // 最高价
        item.highPrice = NumberUtil.formatNumber(item.highPrice, this.commonStore.pointPrice);
        // 最低价
        item.lowPrice = NumberUtil.formatNumber(item.lowPrice, this.commonStore.pointPrice);
        // 开盘价
        item.openPrice = NumberUtil.formatNumber(item.openPrice, this.commonStore.pointPrice);
        // 收盘价
        item.closePrice = NumberUtil.formatNumber(item.closePrice, this.commonStore.pointPrice);
        // 24小时成交数量
        item.volume = NumberUtil.formatNumber(item.volume, item.pointNum);
        // 成交额
        item.amount = NumberUtil.formatNumber(item.volume, this.commonStore.pointPrice);

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
    }
    // 更新选中的交易币
    @action
    setSelectedCoin(item) {
        this.selectedCoin = item;
    }

    @action
    reset(){

    }
}

export default MarketListStore;