/**
 * 交易中心
 * TODO 第二个版本，优化自适应方案
 */
import { observable, computed, autorun, action, runInAction } from 'mobx';
import { socket } from '../api/socket';
import { getBaseCoin, getUserOrderList, submitOrder, getPersonalTradingPwd, hasSettingDealPwd } from '../api/http';
import NP from 'number-precision';
import NumberUtil from '../lib/util/number';
import TimeUtil from '../lib/util/date';
import Url from '../lib/url';
import md5 from '../lib/md5';

class TradeStore {
    // 页面主题。浅色：light；深色：dark
    @observable theme = UPEX.cache.getCache('theme') || 'light';
    // 委托中的订单&已完成的订单
    @observable tabIndex = 0;
    @observable isFetchingOrderList = true;
    @observable openOrderList = []; // 委托中订单 == 当前委托
    @observable historyOrderList = []; // 历史订单 == 已完成订单

    @observable currentTradeCoin = {};
    @observable currentTradeCoinRealTime = [];
    @observable currentTradeCoinReady = false;
    @observable loginedMarkets = {};

    @observable type = 'all'; // 买盘buy、卖盘sell
    @observable tradeHistory = { content: [] };
    @observable personalAccount = { baseCoinBalance: 0, tradeCoinBalance: 0 };
    @observable entrust = { sell: [], buy: [] };
    @observable baseCurrencyId = 0;
    @observable currencyId = 0;
    @observable dealBuyPrice = 0; // 交易买入价格
    @observable dealSellPrice = 0; // 交易卖出价格
    @observable dealBuyNum = 0; // 买入数量
    @observable dealSellNum = 0; // 卖出数量
    @observable buySliderValue = 0;
    @observable sellSliderValue = 0;
    @observable validBuyPrice = true;
    @observable validBuyNum = true;
    @observable validSellPrice = true;
    @observable validSellNum = true;
    @observable tradePriceErr = '';
    @observable tradeNumberErr = '';
    @observable tradeBuyPassword = '';
    @observable tradeSellPassword = '';
    @observable tradePasswordStatus = 2; // 交易.  1：需要交易密码；2：不需要交易密码
    @observable isSubmiting = 0;
    @observable hasSettingDealPwd = false; // 是否设置交易密码

    @observable sortByKey = ''; // 按{key}排序
    @observable sortByType = 'desc'; // 排序方式，升序:asc, 降序: desc
   

    originMarkets = {};

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.authStore = stores.authStore;
        this.headerHeight = 60;
        this.space = 10;
        this.maxHandleHeight = 330; // 操作区域高度 280
        this.minHandleHeight = 280; // 操作区域高度 280
        this.minChartHeight = 270; // K线图最小高度270
        this.minContentHeight = 270;

        this.handlerEntrust = autorun(() => {

        })
    }

    @computed
    get handleHeight() {
        return this.tradePasswordStatus == 1 ? this.maxHandleHeight : this.minHandleHeight;
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
            return '+0.00%';
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

    @computed
    get depthAsks() {
        let asks = this.newEntrustData.buy;
        asks = [["0.07881501",3.33471407],["0.07884405",0.00253781],["0.07885862",2.69808833],["0.07887000",17.3004],["0.07890138",12.835],["0.07890139",4],["0.07891694",0.00253678],["0.07892120",6.43999005],["0.07893979",6.35946285],["0.07894100",0.28699999],["0.07894833",2.99888835],["0.07896692",0.00253632],["0.07897499",0.029258],["0.07898071",0.37468781],["0.07898072",0.00253499],["0.07898917",36.02348691],["0.07898918",59.4979827],["0.07898932",5],["0.07900000",58.43576794],["0.07900544",0.0025362],["0.07900765",19.1446],["0.07900980",0.0025325],["0.07901760",4.2141],["0.07906800",0.22899999],["0.07907702",12.073],["0.07908039",16.8082349],["0.07910000",0.08],["0.07911858",0.0087583],["0.07912264",0.37915823],["0.07913200",0.22899999],["0.07913350",0.013],["0.07913383",0.37933125],["0.07914640",3.17436132],["0.07915598",0.002645],["0.07919600",0.22899999],["0.07925360",0.00142211],["0.07928438",16.5065],["0.07930053",0.00190497],["0.07933254",0.00650756],["0.07939345",0.00304175],["0.07939352",0.012],["0.07940752",0.10738212],["0.07942862",70.5424889],["0.07942863",191.446],["0.07944403",0.01018991],["0.07947398",0.08822542],["0.07951500",0.25899999],["0.07955614",0.00856839],["0.07957341",0.17084821],["0.07958705",0.17343085]];
        return this.processData(asks, "asks", false)
    }

    @computed
    get depthBids() {
        let bids = this.newEntrustData.sell;

        bids = [["0.07881500",3.99622048],["0.07880000",7.26978452],["0.07874934",2.916],["0.07874933",2.14457517],["0.07874920",0.03540825],["0.07871813",7.43356254],["0.07871786",36.88],["0.07871612",0.07811163],["0.07870000",0.08],["0.07862449",4.4374],["0.07860000",0.17695408],["0.07859941",0.17321542],["0.07855786",0.00272639],["0.07854670",0.00348589],["0.07854324",3.16227532],["0.07853570",6.35747508],["0.07850113",0.50954678],["0.07850000",0.13207465],["0.07846977",5],["0.07846192",53.08057651],["0.07846191",19.1446],["0.07846190",0.0171589],["0.07846189",0.04],["0.07844372",17.3219],["0.07843011",5.5],["0.07841786",0.07464473],["0.07840468",0.00421893],["0.07838784",5],["0.07838440",0.459],["0.07837375",0.00894273],["0.07837258",0.01180936],["0.07836586",0.033421],["0.07834580",0.22824237],["0.07833876",5.9],["0.07833222",0.00199152],["0.07832004",0.01276812],["0.07831999",0.00773544],["0.07831989",0.06340815],["0.07831774",0.04769014],["0.07831268",0.25064866],["0.07831189",0.00128972],["0.07830020",0.012],["0.07830000",1.40721839],["0.07829880",0.0157],["0.07829804",3],["0.07829736",0.15246467],["0.07829473",7.29542594],["0.07827867",0.23952886],["0.07827380",0.00145152],["0.07827348",0.0573009]]

        return this.processData(bids, "bids", true);
    }
    // 最佳买入价格
    @computed
    get bestBuyPrice() {
        let price = this.entrust.sell && this.entrust.sell[0] ? this.entrust.sell[0].current : 0; //行情中最新买入价格

        price = price ? price : this.currentTradeCoin.currentAmount;

        return NumberUtil.initNumber(price || 0, this.pointPrice);
    }

    // 最佳卖出价格
    @computed
    get bestSellPrice() {
        let price = this.entrust.buy && this.entrust.buy[0] ? this.entrust.buy[0].current : 0;

        price = price ? price : this.currentTradeCoin.currentAmount;

        return NumberUtil.initNumber(price || 0, this.pointPrice);
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

    @computed
    get baseCoinBalance() {
        let ret = NumberUtil.initNumber(this.personalAccount.baseCoinBalance, this.pointPrice);

        return ret;
    }

    @computed
    get tradeCoinBalance() {
        let ret = NumberUtil.initNumber(this.personalAccount.tradeCoinBalance, this.pointPrice);

        return ret;
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
        let entrust = JSON.parse(JSON.stringify(this.parsedEntrustData));

        switch (this.type) {
            case 'all':
                entrust.sell = entrust.sell.slice(0, 10).reverse(); // 默认显示10条
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
    updateCurrency(baseCurrencyId, currencyId){
        this.baseCurrencyId = baseCurrencyId;
        this.currencyId = currencyId;  
    }

    @action
    changeThemeTo = (value) => {
        this.theme = value;
        UPEX.cache.setCache('theme', value) ;
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
        let baseCoinBalance = Number(this.baseCoinBalance.replace(/\,/gi, ''));
        let num = baseCoinBalance * value / 100;

        this.dealBuyNum = NumberUtil.initNumber(num, this.pointNum);
        this.buySliderValue = value;
    }

    @action
    setSellSliderValue(value) {
        let baseCoinBalance = Number(this.baseCoinBalance.replace(/\,/gi, ''));
        let num = baseCoinBalance * value / 100;
        
        this.dealSellNum = NumberUtil.initNumber(num, this.pointNum);
        this.sellSliderValue = value;
    }

    @action
    setDealBuyNum(value) {
        let baseCoinBalance = Number(this.baseCoinBalance.replace(/\,/gi, ''));
        let result;
        let precent;

        if (baseCoinBalance === 0) {
            result = 0;
        } else {
            precent = value / baseCoinBalance * 100;

            if (precent > 100) {
                precent = 100;
            } else if (precent < 0) {
                precent = 0;
            }
        }

        this.buySliderValue = precent;
        this.dealBuyNum = value;
    }

    @action
    setDealSellNum(value) {
        let baseCoinBalance = Number(this.baseCoinBalance.replace(/\,/gi, ''));
        let result;
        let precent;

        if (baseCoinBalance === 0) {
            result = 0;
        } else {
            precent = value / baseCoinBalance * 100;

            if (precent > 100) {
                precent = 100;
            } else if (precent < 0) {
                precent = 0;
            }
        }

        this.sellSliderValue = precent;
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
             let tradeCoins = [];

            loginedMarkets.tradeCoins.forEach((item, index) => {
                if (item.currencyNameEn.toLowerCase().indexOf(value) > -1) {
                    tradeCoins[tradeCoins.length] = item;
                }
            })

            loginedMarkets.tradeCoins = tradeCoins;
        }

        this.loginedMarkets = loginedMarkets;
    }

    @action
    sortByCondition(field) {
        // 默认降序
        let loginedMarkets = JSON.parse(JSON.stringify(this.originMarkets));

        let type;

        if (this.sortByKey == field) {
            type = this.sortByType == 'desc' ? 'asc' : 'desc';
        } else {
            type = 'desc';
        }

        // 遍历，1. 按成交量降序排列，2. 按最新成交价降序排序
        loginedMarkets.tradeCoins.sort((a, b) => {
            if (type === 'asc') {
                return a[field] - b[field];
            } else {
                return b[field] - a[field];
            }
        })

        this.sortByType = type;
        this.sortByKey = field;
        this.loginedMarkets = loginedMarkets;
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
            runInAction('get loginAfterChangeTradeCoin', () => {
                this.currentTradeCoin = data.currentTradeCoin;
                this.currentTradeCoinRealTime = data.currentTradeCoinRealTime;
            })
        });
    }
    /**
     * 交易历史, 右侧实时行情图
     */
    @action
    getTradeHistory() {
        socket.off('tradeHistory');
        socket.emit('tradeHistory', {
            baseCurrencyId: this.baseCurrencyId,
            tradeCurrencyId: this.currencyId
        });

        socket.on('tradeHistory', (data) => {
            console.log('+++++++++++++');
            console.log('tradeHistory', data);
            runInAction('get tradeHistory data', () => {
                this.tradeHistory = data;
            })
        })
    }

    @computed
    get parsedTradeHistory() {
        let tradeHistory = JSON.parse(JSON.stringify(this.tradeHistory));

        tradeHistory.content.forEach((item, index) => {
            item.time = TimeUtil.formatDate(item.time, 'HH:mm:ss'); // 时间
            item.current = NumberUtil.initNumber(item.current, this.pointPrice); // 价格
            item.amount = NumberUtil.formatNumber(item.amount, this.pointNum); // 数量
        })

        return tradeHistory;
    }

    @action
    getEntrust() {
        socket.off('entrust');
        socket.emit('entrust', {
            baseCurrencyId: this.baseCurrencyId,
            tradeCurrencyId: this.currencyId
        });

        socket.on('entrust', (data) => {
            // data = require('../mock/entrust.json');
            console.log('+++++++++++++');
            console.log('entrust', data);
            runInAction('get entrust', () => {
                this.entrust = data;
            })
        });
    }

    // 格式化委托列表
    @computed
    get parsedEntrustData() {
        let data = JSON.parse(JSON.stringify(this.entrust));
        let buy = data.buy || [];
        let sell = data.sell || [];

        buy.forEach((item, index) => {
            item.depth = NumberUtil.asPercent(item.number * item.current / this.entrustScale, this.pointNum);
            item.current = NumberUtil.initNumber(item.current, this.pointPrice); // 价格
            item.number = NumberUtil.initNumber(item.number, this.pointNum); // 数量
        })

        sell.forEach((item, index) => {
            item.depth = NumberUtil.asPercent(item.number * item.current / this.entrustScale, this.pointNum);
            item.current = NumberUtil.initNumber(item.current, this.pointPrice); // 价格
            item.number = NumberUtil.initNumber(item.number, this.pointNum); // 数量
        })

        data.buy = buy;
        data.sell = sell;

        return data;
    }

    @action
    getUserOrderList() {
        if (!this.authStore.isLogin) {
            return;
        }

        getUserOrderList({
            baseCurrencyId: this.baseCurrencyId,
            tradeCurrencyId: this.currencyId
        }).then((data) => {
            // data = require('../mock/order-list.json');
            runInAction(() => {
                this.openOrderList = this.parseOpenOrderList(data.attachment.tradeFail);
                this.historyOrderList = this.parseHistoryOrderList(data.attachment.tradeSuccess);
                this.isFetchingOrderList = false;
            })
        }).catch(() => {
            runInAction(() => {
                this.isFetchingOrderList = false;
            })
        })
    }

    @action
    parseOpenOrderList(arr) {
        arr.forEach((item, index) => {
            item.orderTime = TimeUtil.formatDate(item.orderTime, 'HH:mm:ss');
        })

        return arr;
    }

    @action
    parseHistoryOrderList(arr) {
        arr.forEach((item, index) => {
            item.orderTime = TimeUtil.formatDate(item.orderTime, 'HH:mm:ss');
        })

        return arr;
    }
    /**
     * 设置Tab索引值
     */
    @action
    setTabIndex(index) {
        this.tabIndex = index;
    }
    /**
     * 行情通知
     */
    @action
    quoteNotify() {
        socket.off('quoteNotify');
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
        socket.off('loginAfter');
        socket.emit('loginAfter', { baseCurrencyId: this.baseCurrencyId })
        socket.on('loginAfter', (data) => {
            console.log('+++++++++++++');
            console.log('loginAfter', data);
            runInAction('get loginAfter', () => {
                let result = data.filter((item)=>{
                    return item.info.currencyNameEn === 'TWD'; // TWD市场
                })[0];

                if (result) {
                    this.parseLoginedMarkets(result);
                    // 拷贝存储数组
                    this.originMarkets = JSON.parse(JSON.stringify(result));
                    this.loginedMarkets = result;
                }
            })
        })
    }
    // 格式化交易币信息
    @action
    parseLoginedMarkets(obj) {
        // 遍历，1. 按成交量降序排列，2. 按最新成交价降序排序
        obj.tradeCoins.map((item, index) => {
            // 24小时涨跌幅
            item.changeRate = Number(item.changeRate);
            item.changeRate = (item.changeRate >= 0 ? '+' : '') + item.changeRate.toFixed(2) + '%';
            // 最新成交价
            item.currentAmount = NumberUtil.initNumber(item.currentAmount, item.pointPrice);
            // 最高价
            item.highPrice = NumberUtil.initNumber(item.highPrice, item.pointPrice);
            // 最低价
            item.lowPrice = NumberUtil.initNumber(item.lowPrice, item.pointPrice);
            // 24小时成交数量
            item.volume = NumberUtil.formatNumber(item.volume, item.pointNum);
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
        socket.on('userAccount', (data) => {
            runInAction('get userAccount', () => {
                console.log('+++++++++++++userAccount', data);
                this.personalAccount = data;
            })
        })
    }

    /**
     * 获取账号信息
     */
    @action
    getPersonalInfo() {
        if (!this.authStore.isLogin) {
            return;
        }
        hasSettingDealPwd().then((data) => {
            runInAction(() => {
                if (data.attachment.isValidatePass === 1) {
                    // 已设置交易密码
                    this.hasSettingDealPwd = true;
                } else {
                    this.hasSettingDealPwd = false;
                }
            })
        })
    }

    /**
     *  获取用户交易密码设置状态
     */
    @action
    getPersonalTradingPwd() {
        if (!this.authStore.isLogin) {
            return;
        }

        getPersonalTradingPwd().then((data) => {
            runInAction(()=>{
                this.tradePasswordStatus = data.attachment.enabled; // 1: 启用 ; 2: 不启用    
            })
        })
    }

    @action
    setTradeBuyPassword(value) {
        this.tradeBuyPassword = value;
    }

    @action
    setTradeSellPassword(value) {
        this.tradeSellPassword = value;
    }

    // 提交买入订单验证
    @action.bound
    verifyInfoBeforeSubmit(type) {
        let result = {
            pass: true,
            message: ''
        };
        let price;
        let num;
        let validPrice;
        let validNum;
        let password;

        if (type == 'buy') {
            price = this.dealBuyPrice;
            num = this.dealBuyNum;
            validPrice = this.validBuyPrice;
            validNum = this.validBuyNum;
            password = this.tradeBuyPassword;
        } else {
            price = this.dealSellPrice;
            num = this.dealSellNum;
            validPrice = this.validSellPrice;
            validNum = this.validSellNum;
            password = this.tradeSellPassword;;
        }

        console.log(price, num, validPrice, validNum, password);

        if (!price) {
            result = {
                pass: false,
                message: UPEX.lang.template('请输入价格')
            }
        } else if (!num) {
            result = {
                pass: false,
                message: UPEX.lang.template('请输入数量')
            }
        } else if (!validPrice) {
            result = {
                pass: false,
                message: UPEX.lang.template('价格输入错误')
            }
        } else if (!validNum) {
            result = {
                pass: false,
                message: UPEX.lang.template('数量输入错误')
            }
        }

        // 必须填写交易密码
        if (this.tradePasswordStatus == 1 && !password) {
            result = {
                pass: false,
                message: UPEX.lang.template('请输入交易密码')
            }
        }

        return result;
    }

    // 创建订单
    @action.bound
    createTradeOrder(type) {
        let data = {};
        let defer = $.Deferred();

        // 防止多次提交
        if (this.isSubmiting) {
            return;
        }

        this.isSubmiting = 1;


        if (type == 'buy') {
            data = {
                buyOrSell: 1,
                currencyId: this.currencyId,
                baseCurrencyId: this.baseCurrencyId,
                fdPassword: '',
                num: this.dealBuyNum,
                price: this.dealBuyPrice,
                source: 1,
                type: 1
            }

            if (this.tradePasswordStatus == 1) {
                data.fdPassword = md5(this.tradeBuyPassword + UPEX.config.salt);
            }
        } else {
            data = {
                buyOrSell: 2,
                baseCurrencyId: this.baseCurrencyId,
                currencyId: this.currencyId,
                fdPassword: '',
                num: this.dealSellNum,
                price: this.dealSellPrice,
                source: 1,
                type: 1
            }

            if (this.tradePasswordStatus == 1) {
                data.fdPassword = md5(this.tradeSellPassword + UPEX.config.salt);
            }
        }

        submitOrder(data)
            .then((data) => {
                this.isSubmiting = 0;
                runInAction('order', () => {
                    if (data.status !== 200) {
                        defer.reject(data)
                        return;
                    }
                    // 重启获取新用户账号信息
                    this.getUserAccount();
                    this.getUserOrderList();

                    if (type == 'buy') {
                        this.setDealBuyPrice('');
                        this.setDealBuyNum('');
                        this.setTradeBuyPassword('');
                    } else {
                        this.setDealSellPrice('');
                        this.setDealSellNum('');
                        this.setTradeSellPassword('');
                    }
                })
            }).catch(() => {
                this.isSubmiting = 0;
                runInAction(() => {
                    defer.reject()
                })
            })

        return defer.promise();
    }

    
    processData(list, type, desc){
        let res = [];
        // Convert to data points
        for (var i = 0; i < list.length; i++) {
            list[i] = {
                value: Number(list[i][0]),
                volume: Number(list[i][1]),
            }
        }

        // Sort list just in case
        list.sort(function(a, b) {
            if (a.value > b.value) {
                return 1;
            } else if (a.value < b.value) {
                return -1;
            } else {
                return 0;
            }
        });

        // Calculate cummulative volume
        if (desc) {
            for (var i = list.length - 1; i >= 0; i--) {
                if (i < (list.length - 1)) {
                    list[i].totalvolume = list[i + 1].totalvolume + list[i].volume;
                } else {
                    list[i].totalvolume = list[i].volume;
                }
                var dp = {};
                dp["value"] = list[i].value;
                dp[type + "volume"] = list[i].volume;
                dp[type + "totalvolume"] = list[i].totalvolume;
                res.unshift(dp);
            }
        } else {
            for (var i = 0; i < list.length; i++) {
                if (i > 0) {
                    list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
                } else {
                    list[i].totalvolume = list[i].volume;
                }
                var dp = {};
                dp["value"] = list[i].value;
                dp[type + "volume"] = list[i].volume;
                dp[type + "totalvolume"] = list[i].totalvolume;
                res.push(dp);
            }
        }

        return res;
    }
}


export default TradeStore;