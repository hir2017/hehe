/**
 * 交易中心
 * TODO 第二个版本，优化自适应方案
 */
import { observable, computed, autorun, action } from 'mobx';
import { socket, tradeCurrencyId, baseCurrencyId } from '../api/socket';
import { getBaseCoin, getUserOrderList } from '../api/http';
import NP from 'number-precision'
import NumberUtil from '../lib/util/number';
import TimeUtil from '../lib/util/date';

class TradeStore {
    // 页面主题。浅色：light；深色：dark
    @observable theme = 'light';
    @observable currentTradeCoin = {};
    @observable currentTradeCoinRealTime = [];
    @observable loginedMarkets = {};
    @observable type = 'all'; // 买盘buy、卖盘sell
    @observable tradeHistory = { content: [] };
    @observable personalAccount = { baseCoinBalance: 0, tradeCoinBalance: 0 };
    @observable entrust = { sell: [], buy: [] };
    @observable baseCurrencyId = baseCurrencyId;
    @observable currencyId = tradeCurrencyId;
    @observable dealBuyPrice = 0; // 交易买入价格
    @observable dealSellPrice = 0; // 交易卖出价格
    @observable dealBuyNum = 0; // 买入数量
    @observable dealSellNum = 0; // 卖出数量
    @observable buySliderValue = 0;
    @observable sellSliderValue = 0;
    @observable tradePriceErr = '';
    @observable tradeNumberErr = '';

    originMarkets = {};

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.authStore = stores.authStore;
        this.orderStore = stores.tradeOrderStore;
        this.headerHeight = 60;
        this.space = 10;
        this.handleHeight = 300; // 操作区域高度 280
        this.minChartHeight = 270; // K线图最小高度270
        this.minContentHeight = 270;
    }

    @computed
    get contentHeight() {
        return Math.max(this.commonStore.windowDimensions.height - this.headerHeight - this.space * 3, this.minContentHeight);
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

        if (typeof this.currentTradeCoin.changeRate !== 'undefined') {
            return (this.currentTradeCoin.changeRate >= 0 ? '+' : '') + this.currentTradeCoin.changeRate.toFixed(2) + '%';
        } else {
            return '0.00%';
        }
    }

    @computed
    get changeRateStatus() {

        if (typeof this.currentTradeCoin.changeRate !== 'undefined') {
            return (this.currentTradeCoin.changeRate >= 0 ? 'positive' : 'negative');
        } else {
            return 'positive';
        }
    }

    @computed
    get currentCoinLowPrice() {
        return NumberUtil.formatNumber(this.currentTradeCoin.lowPrice, this.pointPrice);
    }

    @computed
    get currentCoinHighPrice() {
        return NumberUtil.formatNumber(this.currentTradeCoin.highPrice, this.pointPrice);
    }

    @computed
    get currentCoinVolume() {
        return NumberUtil.formatNumber(this.currentTradeCoin.volume, this.pointPrice);
    }

    @computed
    get currentAmount() {
        return NumberUtil.formatNumber(this.currentTradeCoin.currentAmount, this.pointNum);
    }
    // 最佳买入价格
    @computed
    get bestBuyPrice() {
        let price = this.entrust.sell && this.entrust.sell[0] ? this.entrust.sell[0].current : 0; //行情中最新买入价格

        price = price ? price : this.currentTradeCoin.currentAmount;

        return price || 0;
    }

    // 最佳卖出价格
    @computed
    get bestSellPrice() {
        let price = this.entrust.buy && this.entrust.buy[0] ? this.entrust.buy[0].current : 0;

        price = price ? price : this.currentTradeCoin.currentAmount;

        return price || 0;
    }

    @computed
    get buySliderPercent() {
        return this.buySliderValue + '%';
    }

    @computed
    get sellSliderPercent() {
        return this.sellSliderValue + '%';
    }
    /**
     * 买入手续费
     */
    @computed
    get dealBuyFee() {
        let ret = 0;
        let authLevel = this.personalAccount.authLevel;
        let { feeKyc1, feeKyc2, feeKyc3, feeType } = this.currentTradeCoin.kycBuy || {};

        switch (authLevel) {
            case 1:
                ret = feeType === 1 ? `${feeKyc1}` : NP.times(feeKyc1, 100) + "%";
                break;
            case 2:
                ret = feeType === 1 ? `${feeKyc2}` : NP.times(feeKyc2, 100) + "%";
                break;
            case 3:
                ret = feeType === 1 ? `${feeKyc3}` : NP.times(feeKyc3, 100) + "%"
                break;
            default:

        }

        return ret;
    }
    /**
     * 卖出手续费
     */
    @computed
    get dealSellFee() {
        let ret = 0;
        let authLevel = this.personalAccount.authLevel;
        let { feeKyc1, feeKyc2, feeKyc3, feeType } = this.currentTradeCoin.kycSell || {};

        switch (authLevel) {
            case 1:
                ret = feeType === 1 ? `${feeKyc1}` : NP.times(feeKyc1, 100) + "%";
                break;
            case 2:
                ret = feeType === 1 ? `${feeKyc2}` : NP.times(feeKyc2, 100) + "%";
                break;
            case 3:
                ret = feeType === 1 ? `${feeKyc3}` : NP.times(feeKyc3, 100) + "%"
                break;
            default:

        }

        return ret;
    }

    @computed
    get pointPrice() {
        return this.currentTradeCoin.pointPrice;
    }

    @computed
    get pointNum() {
        return this.currentTradeCoin.pointNum;
    }

    @computed
    get entrustScale() {
        return this.entrust.entrustScale;
    }

    /**
     * 买入总金额
     */
    @computed
    get dealBuyTotalAmount() {
        let ret = NumberUtil.initNumber(this.dealBuyNum * this.dealBuyPrice, this.pointPrice);

        return ret;
    }

    /**
     * 卖出总金额
     */
    @computed
    get dealSellTotalAmount() {
        let ret = NumberUtil.initNumber(this.dealSellNum * this.dealSellPrice, this.pointPrice);

        return ret;
    }

    @computed
    get newEntrustData() {
        let entrust = JSON.parse(JSON.stringify(this.entrust));

        switch (this.type) {
            case 'all':
                entrust.sell = entrust.sell.slice(0, 10); // 默认显示10条
                entrust.buy = entrust.buy.slice(0, 10); // 默认显示10条
                break;
            case 'buy':
                entrust.sell = [];
                break;
            case 'sell':
                entrust.buy = [];
                break;
        }

        return entrust;
    }

    @action
    changeThemeTo = (value) => {
        this.theme = value;
    }

    @action
    setDealBuyPrice(price) {
        this.dealBuyPrice = price;
    }
    @action
    setDealSellPrice(price) {
        this.dealSellPrice = price;
    }

    @action
    setBuySliderValue(value) {
        this.buySliderValue = value;
    }

    @action
    setSellSliderValue(value) {
        this.sellSliderValue = value;
    }

    @action
    setDealBuyNum(value) {
        const { baseCoinBalance, tradeCoinBalance } = this.personalAccount;

        this.dealBuyNum = value;
    }

    @action
    setDealSellNum(value) {
        this.dealSellNum = value;
    }

    @action
    setType(type) {
        this.type = type;
    }

    @action
    checkTradePrice(amount, type) {
        const { entrustPriceMax, entrustPriceMin } = this.currentTradeCoin;
        let pass;

        if (amount < entrustPriceMin || amount > entrustPriceMax) {

            this.tradePriceErr = UPEX.lang.template('价格输入必须是{min}~{max}', { min: entrustPriceMin, max: entrustPriceMax });
            pass = false;
        } else {
            this.tradePriceErr = '';
            pass = true;
        }

        if (type == 'buy') {
            this.dealBuyPrice = NumberUtil.initNumber(amount, this.pointPrice);
        } else {
            this.dealSellPrice = NumberUtil.initNumber(amount, this.pointPrice);
        }

        return pass;
    }

    @action
    checkTradeNumber(number, type) {
        const { amountHighLimit, amountLowLimit } = this.currentTradeCoin;
        let pass;

        if (number < amountHighLimit || number > amountLowLimit) {

            this.tradeNumberErr = UPEX.lang.template('委託数量过低或超限');
            pass = false;
        } else {
            this.tradeNumberErr = '';

            pass = true;
        }

        if (type == 'buy') {
            this.dealBuyNum = NumberUtil.initNumber(number, this.pointNum);
        } else {
            this.dealSellNum = NumberUtil.initNumber(number, this.pointNum);
        }

        return pass;
    }

    @action
    filterByName = (value) => {
        let loginedMarkets = JSON.parse(JSON.stringify(this.originMarkets));

        value = value.toLowerCase();

        if (value) {
            loginedMarkets.forEach((obj, index) => {
                // 遍历
                let tradeCoins = [];

                obj.tradeCoins.forEach((item, index) => {
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
    stortByChangeRate() {

    }
    /**
     * 根据成交量排序
     */
    @action
    stortByVolume() {

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

            this.currentTradeCoin = data.currentTradeCoin;
            this.currentTradeCoinRealTime = data.currentTradeCoinRealTime;
        });
    }
    /**
     * 交易历史, 右侧实时行情图
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
            data = parseTradeHistory(data, this.pointPrice, this.pointNum);
            this.tradeHistory = data;
        })
    }
    @action
    getEntrust() {
        socket.emit('entrust', {
            baseCurrencyId: this.baseCurrencyId,
            tradeCurrencyId: this.currencyId
        });

        socket.on('entrust', (data) => {
            // data = require('../mock/entrust.json');
            console.log('+++++++++++++');
            console.log('entrust', data);
            data = parseEntrustData(data, this.pointPrice, this.pointNum);
            this.entrust = data;
        });
    }

    @action
    getUserOrderList() {
        if (!this.authStore.isLogin) {
            return;
        }
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
    /**
     * 查询个人币种余额
     */
    @action
    getUserAccount() {
        if (!this.authStore.isLogin) {
            return;
        }
        socket.emit('userAccount', {
            token: this.authStore.token,
            uid: this.authStore.uid,
            tradeCurrencyId: this.currencyId,
            baseCurrencyId: this.baseCurrencyId
        })
        socket.off('userAccount')
        socket.on('userAccount', function(data) {
            console.log('+++++++++++++userAccount', data);
            this.personalAccount = data;
        })
    }
}

// 格式化交易币信息
function parseLoginedMarkets(loginedMarkets) {
    loginedMarkets.forEach((obj, index) => {
        // 遍历，1. 按成交量降序排列，2. 按最新成交价降序排序
        obj.tradeCoins.map((item, index) => {
            // 24小时涨跌幅
            item.changeRate = (item.changeRate >= 0 ? '+' : '') + item.changeRate.toFixed(2) + '%';
            // 最新成交价
            item.currentAmount = item.currentAmount.toFixed(item.pointPrice);
            // 最高价
            item.highPrice = item.highPrice.toFixed(item.pointPrice);
            // 最低价
            item.lowPrice = item.lowPrice.toFixed(item.pointPrice);
            // 24小时成交数量
            item.volume = item.volume.toFixed(item.pointPrice);
        })
    })
}
// 格式化交易历史
function parseTradeHistory(data, pointPrice, pointNum) {

    data.content.forEach((item, index) => {
        item.time = TimeUtil.formatDate(item.time, 'HH:mm:ss'); // 时间
        item.current = NumberUtil.initNumber(item.current, pointPrice); // 价格
        item.amount = NumberUtil.initNumber(item.amount, pointNum); // 数量
    })

    return data;
}
// 格式化委托列表
function parseEntrustData(data, pointPrice, pointNum) {
    let buy = data.buy || [];
    let sell = data.sell || [];

    buy.forEach((item, index) => {
        item.current = NumberUtil.initNumber(item.current, pointPrice); // 价格
        item.number = NumberUtil.initNumber(item.number, pointNum); // 数量
        item.depth = parseInt((item.number * item.current / this.entrustScale).toFixed(this.pointNum));
    })

    sell.forEach((item, index) => {
        item.current = NumberUtil.initNumber(item.current, pointPrice); // 价格
        item.number = NumberUtil.initNumber(item.number, pointNum); // 数量
        item.depth = parseInt((item.number * item.current / this.entrustScale).toFixed(this.pointNum));
    })

    data.buy = buy;
    data.sell = sell.reverse(); // 倒序

    return data;

}

export default TradeStore;