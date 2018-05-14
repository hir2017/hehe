/**
 * 交易中心
 * TODO 第二个版本，优化自适应方案
 */
import { observable, computed, autorun, action } from 'mobx';
import { socket } from '../api/socket';
import { getBaseCoin , getUserOrderList } from '../api/http';

import NumberUtil from '../lib/util/number';

class TradeStore {
    // 页面主题。浅色：light；深色：dark
    @observable theme = 'light';
    @observable coinInfo = {};
    @observable coinRealTime = [];
    @observable loginedMarkets = {};
    @observable pointPrice = 4;
    @observable baseCurrencyId = 1;
    @observable currencyId = 2;
    originMarkets = {};
    

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.entrustStore = stores.tradeEntrustStore;
        this.orderStore = stores.tradeOrderStore;
        this.headerHeight = 60;
        this.space = 10;
        this.handleHeight = 320; // 操作区域高度 280
        this.minChartHeight = 270; // K线图最小高度270
        this.minContentHeight = 270;
    }

    @computed
    get contentHeight() {
        return Math.max(this.commonStore.windowDimensions.height - this.headerHeight - this.space * 2, this.minContentHeight);
    }

    @computed
    get extraOrderHeight() {
        return Math.max(this.contentHeight - this.handleHeight, 0);
    }

    @computed
    get iframeHeight() {
        return Math.max(this.contentHeight - this.handleHeight, this.minChartHeight);
    }

    @computed
    get mainOrderHeight() {
        return Math.max(this.contentHeight - this.iframeHeight, 0);
    }

    @computed
    get currentCoinChangeRate() {

        if (typeof this.coinInfo.changeRate !== 'undefined') {
            return (this.coinInfo.changeRate >= 0 ? '+' : '-') + this.coinInfo.changeRate.toFixed(2) + '%';
        } else {
            return '0.00%';
        }
    }

    @computed
    get changeRateStatus() {

        if (typeof this.coinInfo.changeRate !== 'undefined') {
            return (this.coinInfo.changeRate >= 0 ? 'positive' : 'negative');
        } else {
            return 'positive';
        }
    }

    @computed
    get currentCoinLowPrice() {
        return NumberUtil.formatPrice(this.coinInfo.lowPrice, 4);
    }

    @computed
    get currentCoinHighPrice() {
        return NumberUtil.formatPrice(this.coinInfo.highPrice, 4);
    }

    @computed
    get currentCoinVolume() {
        return NumberUtil.formatPrice(this.coinInfo.volume, 4);
    }

    @computed
    get currentAmount() {
        return NumberUtil.formatPrice(this.coinInfo.currentAmount, 4);
    }

    @action
    changeThemeTo = (value) => {
        this.theme = value;
    }

    @action 
    filterByName=(value)=>{
        let loginedMarkets = JSON.parse(JSON.stringify(this.originMarkets));
        
        value = value.toLowerCase();

        if (value) {
            loginedMarkets.forEach((obj, index) => {
                // 遍历
                let tradeCoins = [];
                
                obj.tradeCoins.forEach((item, index)=>{                    
                    if (item.currencyNameEn.toLowerCase().indexOf(value) > -1) {
                        tradeCoins[tradeCoins.length] = item;
                    }
                })

                obj.tradeCoins = tradeCoins;
            });
        }

        this.loginedMarkets = loginedMarkets;
    }
    /**
     * 根据当前成交价排序
     */
    @action
    sortByCurrentAmount() {

    }
    /**
     * 根据涨跌幅度排序
     */
    @action 
    stortByChangeRate(){

    }
    /**
     * 根据成交量排序
     */
    @action
    stortByVolume(){

    }
    /**
     * 首页查看交易币
     */
    @action
    getTradeCoinData() {
        socket.off('loginAfterChangeTradeCoin');
        socket.emit('loginAfterChangeTradeCoin', {
            baseCurrencyId: this.baseCurrencyId,
            tradeCurrencyId: this.currencyId
        });
        socket.on('loginAfterChangeTradeCoin', (data) => {
            console.log('+++++++++++++++++++++++++');
            console.log('loginAfterChangeTradeCoin', data);
            
            this.coinInfo = data.currentTradeCoin;
            this.coinRealTime = data.currentTradeCoinRealTime;
        });
    }
    /**
     * 交易历史
     */
    @action
    getTradeHistory() {
        socket.emit('tradeHistory', {
            baseCurrencyId: this.baseCurrencyId,
            tradeCurrencyId: this.currencyId
        });

        socket.on('tradeHistory', (data) => {
            console.log('+++++++++++++');
            console.log('tradeHistory', data);
        })
    }
    @action
    getEntrust(){
        this.entrustStore.getEntrust(this.baseCurrencyId, this.currencyId);
    }

    @action
    getUserOrderList(){
        this.orderStore.getUserOrderList(this.baseCurrencyId, this.currencyId);
    }
    /**
     * 行情通知
     */
    @action
    quoteNotify() {
        socket.emit('quoteNotify')
        socket.on('quoteNotify', (data) => {
            console.log('+++++++++++++');
            console.log('quoteNotify', data);
        })
    }
    /**
     * 获取基础币列表
     */
    @action
    getTradeCoinsOfBaseCoin() {

    }

    /**
     * 获取基本币种
     */
    @action
    getBaseCoin() {
        getBaseCoin().then((data) => {
            console.log('++++++++++++');
        })
    }
    /**
     * 登录后显示首页行情
     */
    @action
    getLoginedMarket() {
        socket.off('loginAfter')
        socket.emit('loginAfter', { baseCurrencyId: this.baseCurrencyId })
        socket.on('loginAfter', (data) => {
            console.log('+++++++++++++');
            console.log('loginAfter', data);
            // parseLoginedMarkets(data);
            // 拷贝存储数组
            this.originMarkets = JSON.parse(JSON.stringify(data));
            this.loginedMarkets = data;            
        })
    }
}


function parseLoginedMarkets(loginedMarkets){
    loginedMarkets.forEach((obj, index) => {
        // 遍历，1. 按成交量降序排列，2. 按最新成交价降序排序
        obj.tradeCoins.map((item, index)=>{
            // 24小时涨跌幅
            item.changeRate = (item.changeRate >= 0 ? '+' : '-') + item.changeRate.toFixed(2) + '%';
            // 最新成交价
            item.currentAmount = item.currentAmount.toFixed(item.pointPrice);
            // 最高价
            item.highPrice = item.highPrice.toFixed(item.pointPrice);
            // 最低价
            item.lowPrice = item.lowPrice.toFixed(item.pointPrice);
            // 24小时成交数量
            item.volume = item.volume.toFixed(item.pointPrice);

            if (index == 0) {
                this.pointPrice = item.pointPrice;
            }
        })
        // .sort(function(objA, objB) {
        //     const preItem = parseFloat(objA.amount.toFixed(objA.pointPrice))
        //     const nowItem = parseFloat(objB.amount.toFixed(objB.pointPrice))
            
        //     if (preItem < nowItem) {
        //         return true;
        //     } else {
        //         if (preItem == nowItem) {
        //             const _preItem = parseFloat(objA.currentAmount.toFixed(objA.pointPrice))
        //             const _nowItem = parseFloat(objB.currentAmount.toFixed(objB.pointPrice))
                    
        //             if (_preItem < _nowItem) {
        //                 return 1;
        //             } else {
        //                 return -1;
        //             }
        //         }

        //         return -1;
        //     }
        // });
    })
}

export default TradeStore;