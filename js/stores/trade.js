/**
 * 交易中心
 * TODO 第二个版本，优化自适应方案
 */
import { observable, computed, autorun, action, runInAction } from 'mobx';
import { socket, tradeCurrencyId, baseCurrencyId } from '../api/socket';
import { getBaseCoin, getUserOrderList, submitOrder, getPersonalTradingPwd, hasSettingDealPwd } from '../api/http';
import NP from 'number-precision';
import NumberUtil from '../lib/util/number';
import TimeUtil from '../lib/util/date';
import md5 from '../lib/md5';

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
    @observable validBuyPrice = true;
    @observable validBuyNum = true;
    @observable validSellPrice = true;
    @observable validSellNum = true;
    @observable tradePriceErr = '';
    @observable tradeNumberErr = '';
    @observable sortByKey = ''; // 按{key}排序
    @observable sortByType = 'desc'; // 排序方式，升序:asc, 降序: desc
    @observable tradeBuyPassword = '';
    @observable tradeSellPassword = '';
    @observable tradePasswordStatus = 2; // 交易.  1：需要交易密码；2：不需要交易密码
    @observable isSubmiting = 0;
    @observable hasSettingDealPwd = false; // 是否设置交易密码

    originMarkets = {};

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.authStore = stores.authStore;
        this.orderStore = stores.tradeOrderStore;
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
    setCurrencyId(id) {
        this.currencyId = id;
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

        loginedMarkets.forEach((obj, index) => {
            // 遍历，1. 按成交量降序排列，2. 按最新成交价降序排序
            obj.tradeCoins.sort((a, b) => {
                if (type === 'asc') {
                    return a[field] - b[field];
                } else {
                    return b[field] - a[field];
                }
            })
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
            runInAction('get loginAfter', () => {
                this.parseLoginedMarkets(data);
                // 拷贝存储数组
                this.originMarkets = JSON.parse(JSON.stringify(data));
                this.loginedMarkets = data;
            })
        })
    }
    // 格式化交易币信息
    @action
    parseLoginedMarkets(loginedMarkets) {
        loginedMarkets.forEach((obj, index) => {
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
            this.tradePasswordStatus = data.attachment.enabled; // 1: 启用 ; 2: 不启用
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


}


export default TradeStore;