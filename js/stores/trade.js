/**
 * 交易中心
 * TODO 第二个版本，优化自适应方案
 */
import { observable, computed, autorun, action } from 'mobx';
import { socket, baseCurrencyId } from '../api/socket';
import NumberUtil from '../lib/util/number';

class TradeStore {
    // 页面主题。浅色：light；深色：dark
    @observable theme = 'light';
    @observable coinInfo = {};
    @observable coinRealTime = [];

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.headerHeight = 60;
        this.space = 10;
        this.handleHeight = 280; // 操作区域高度 280
        this.minKlineHeight = 270; // K线图最小高度270
        this.minContentHeight = 270;
    }

    @computed
    get contentHeight() {
        return Math.max(this.commonStore.windowDimensions.height - this.headerHeight, this.minContentHeight);
    }

    @computed
    get extraOrderHeight() {
        return Math.max(this.contentHeight - this.space * 3 - this.handleHeight, 0);
    }

    @computed
    get iframeHeight() {
        return Math.max(this.contentHeight - this.handleHeight, this.minKlineHeight);
    }

    @computed
    get mainOrderHeight() {
        return Math.max(this.contentHeight - this.iframeHeight - this.space * 2, 0);
    }

    @computed
    get currentCoinChangeRate() {
        
        if (typeof this.coinInfo.changeRate !== 'undefined') {
            return (this.coinInfo.changeRate > 0 ? '+' : '-') + this.coinInfo.changeRate + '%';    
        } else {
            return '';
        } 
    }

    @computed
    get changeRateStatus() {  
        
        if (typeof this.coinInfo.changeRate !== 'undefined') {
            return (this.coinInfo.changeRate > 0 ? 'positive' : 'negative');
        } else {
            return '';
        } 
    }

    @computed
    get currentCoinLowPrice(){
        return NumberUtil.formatPrice(this.coinInfo.lowPrice, 4);
    }

    @computed
    get currentCoinHighPrice(){
        return NumberUtil.formatPrice(this.coinInfo.highPrice, 4);
    }

    @computed
    get currentCoinVolume(){
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
    /**
     * 首页查看交易币
     */
    @action
    getTradeCoinData() {
        socket.off('loginAfterChangeTradeCoin');
        socket.emit('loginAfterChangeTradeCoin', {
            baseCurrencyId: 1,
            tradeCurrencyId: 2
        });
        socket.on('loginAfterChangeTradeCoin', (data)=>{
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
            baseCurrencyId: 1,
            tradeCurrencyId: 2
        });

        socket.on('tradeHistory', (data)=>{
            console.log('+++++++++++++++++++++++++');
            console.log('tradeHistory', data);
        })
    }
}

export default TradeStore;