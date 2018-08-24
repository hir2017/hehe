import { observable, computed, action, runInAction } from 'mobx';
import { getTradeCoinsOfBaseCoin , getAllCurrencyRelations } from '../api/http';
import MarketListStore from './market';

export default class TradeStore {
	// 页面主题。浅色：light；深色：dark
    @observable theme = UPEX.cache.getCache('theme') || 'dark';
    @observable dataReady = false;
    // 当前交易币对
    @observable currentTradeCoin = {
        currencyNameEn: '--',
        currentTradeCoin: '--',
        currentAmountText: '--',
        highPriceText: '--',
        lowPriceText: '--',
        volumeText: '--',
    };

    @observable entrust = {
        sell: [],
        buy: []
    }

    @observable asks = {};
    @observable bids = {};

    @observable tradeHistory = { content: [] };

    @observable expandOrderTable = false;

    constructor(stores) {
    	this.commonStore = stores.commonStore;
    	this.marketListStore = new MarketListStore(stores);

    	this.minContentHeight = 320;
    	this.minChartHeight = 320; // K线图最小高度270
    	this.headerHeight = 60;
    	this.space = 10;
    }

    @computed get contentHeight() {
        return Math.max(this.commonStore.windowDimensions.height - this.headerHeight - this.space, this.minContentHeight);
    }

    @computed get mainChartHeight() {
        return Math.max(this.contentHeight * 0.7, this.minChartHeight);
    }

    @computed get mainOrderHeight() {
        if (this.expandOrderTable) {
            return Math.max(this.contentHeight, 0);
        } else {
            return Math.max(this.contentHeight * 0.3 - this.space, 0);
        }
    }

    @action changeThemeTo = (value) => {
        this.theme = value;
        UPEX.cache.setCache('theme', value);
    }

    @action fetchDataReady() {
    	this.dataReady = true
    }

    @action updateEntrust(data) {
        this.entrust = data;
    }

    @action updateTradeHistory(data) {
    	this.tradeHistory = data;
    }

    @action isExpandOrderTable(status){
        this.expandOrderTable = status;
    }

    @action updateCurrentTradeCoin(data) {
    	this.currentTradeCoin = data;
    }

    @action updateAsks(data){
        this.asks = data;
    }

    @action updateBids(data){
        this.bids = data;
    }
}