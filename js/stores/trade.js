/**
 * 交易中心
 * TODO 第二个版本，优化自适应方案
 */
import { observable, computed, autorun, action, runInAction } from 'mobx';
import { socket } from '../api/socket';
import {
    addOptional,
    cancleOptional,
    listOptional,
    getUserOrderList,
    submitOrder,
    getPersonalTradingPwd,
    hasSettingDealPwd
} from '../api/http';

import NP from 'number-precision';
import NumberUtil from '../lib/util/number';
import TimeUtil from '../lib/util/date';
import Url from '../lib/url';
import md5 from '../lib/md5';
import MarketListStore from './market-list';

class TradeStore {
    // 页面主题。浅色：light；深色：dark
    @observable theme = UPEX.cache.getCache('theme') || 'light';
    // 委托中的订单&已完成的订单
    @observable tabIndex = 0;
    @observable openOrderList = []; // 委托中订单 == 当前委托
    @observable historyOrderList = []; // 历史订单 == 已完成订单

    // @observable currentTradeCoin = {};
    @observable type = 'all'; // 买盘buy、卖盘sell
    @observable tradeHistory = { content: [] };
    @observable personalAccount = {
        baseCoinBalance: 0,
        tradeCoinBalance: 0
    };
    @observable entrust = {
        sell: [],
        buy: []
    };
    @observable baseCurrencyId = 0;
    @observable baseCurrencyNameEn = '';
    @observable currencyId = 0;
    @observable currencyNameEn = '';
    @observable dealBuyPrice = ''; // 交易买入价格
    @observable dealSellPrice = ''; // 交易卖出价格
    @observable dealBuyNum = ''; // 买入数量
    @observable dealSellNum = ''; // 卖出数量
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
    
    first = true;

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.authStore = stores.authStore;
        this.marketListStore = new MarketListStore(stores);
        
        this.headerHeight = 60;
        this.space = 10;
        this.handleHeight = 310; // 操作区域高度 
        this.minChartHeight = 320; // K线图最小高度270
        this.minContentHeight = 320;

        this.handlerEntrust = autorun(() => {});
    }

    @computed
    get currentTradeCoin() {
        let coins = this.marketListStore.cacheCoins.filter((item) => {
            return item.baseCurrencyId == this.baseCurrencyId && item.currencyId == this.currencyId
        })

        return coins[0] || {};
    }

    @computed
    get contentHeight() {
        return Math.max(this.commonStore.windowDimensions.height - this.headerHeight - this.space * 3, this.minContentHeight);
    }

    @computed
    get mainChartHeight() {
        return Math.max(this.contentHeight * 0.7, this.minChartHeight);
    }

    @computed
    get mainOrderHeight() {
        return Math.max(this.contentHeight * 0.3, 0);
    }


    @computed
    get depthAsks() {
        let entrust = JSON.parse(JSON.stringify(this.parsedEntrustData));
        let asks = entrust.sell;

        return this.processData(asks, 'asks', false);
    }

    @computed
    get depthBids() {
        let entrust = JSON.parse(JSON.stringify(this.parsedEntrustData));
        let bids = entrust.buy;

        return this.processData(bids, 'bids', true);
    }
    // 最佳买入价格
    @action
    getBestBuyPrice() {
        let price = this.entrust.sell && this.entrust.sell[0] ? this.entrust.sell[0].current : 0; //行情中最新买入价格

        price = price ? price : this.currentTradeCoin.currentAmount;

        return NumberUtil.initNumber(price || 0, this.commonStore.pointPrice);
    }

    // 最佳卖出价格
    @action
    getBestSellPrice() {
        let price = this.entrust.buy && this.entrust.buy[0] ? this.entrust.buy[0].current : 0;

        price = price ? price : this.currentTradeCoin.currentAmount;

        return NumberUtil.initNumber(price || 0, this.commonStore.pointPrice);
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
        let ret = '';
        let authLevel = this.personalAccount.authLevel;
        let { feeKyc1, feeKyc2, feeKyc3, feeType } = this.currentTradeCoin.kycBuy || {};

        switch (authLevel) {
            case 1:
                if (typeof feeKyc1 !== 'undefined') {
                    if (feeType === 1) {
                        ret = feeKyc1;
                    } else {
                        ret = NP.times(feeKyc1, 100) + '%';
                    }
                }
                break;
            case 2:
                if (typeof feeKyc2 !== 'undefined') {
                    if (feeType === 1) {
                        ret = feeKyc2;
                    } else {
                        ret = NP.times(feeKyc2, 100) + '%';
                    }
                }

                break;
            case 3:
                if (typeof feeKyc3 !== 'undefined') {
                    if (feeType === 1) {
                        ret = feeKyc3;
                    } else {
                        ret = NP.times(feeKyc3, 100) + '%';
                    }
                }
                break;
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
                if (typeof feeKyc1 !== 'undefined') {
                    if (feeType === 1) {
                        ret = feeKyc1;
                    } else {
                        ret = NP.times(feeKyc1, 100) + '%';
                    }
                }
                break;
            case 2:
                if (typeof feeKyc2 !== 'undefined') {
                    if (feeType === 1) {
                        ret = feeKyc2;
                    } else {
                        ret = NP.times(feeKyc2, 100) + '%';
                    }
                }

                break;
            case 3:
                if (typeof feeKyc3 !== 'undefined') {
                    if (feeType === 1) {
                        ret = feeKyc3;
                    } else {
                        ret = NP.times(feeKyc3, 100) + '%';
                    }
                }
                break;
        }

        return ret;
    }
    // 交易币价格保留的位数
    @computed
    get pointPrice() {
        return this.currentTradeCoin.pointPrice;
    }

    // 交易币数量保留的位数
    @computed
    get pointNum() {
        return this.currentTradeCoin.pointNum;
    }

    @computed
    get entrustScale() {
        return this.entrust.entrustScale;
    }

    // 基础币
    @computed
    get baseCoinBalance() {
        return {
            value: this.personalAccount.baseCoinBalance,
            text: NumberUtil.initNumber(this.personalAccount.baseCoinBalance, this.commonStore.pointPrice)
        };
    }

    // 交易币
    @computed
    get tradeCoinBalance() {
        return {
            value: this.personalAccount.tradeCoinBalance,
            text: NumberUtil.initNumber(this.personalAccount.tradeCoinBalance, this.pointPrice)
        }
    }

    /**
     * 买入总金额
     */
    @computed
    get dealBuyTotalAmount() {
        let ret = NumberUtil.initNumber(this.dealBuyNum * this.dealBuyPrice, this.commonStore.pointPrice);

        return ret;
    }

    /**
     * 卖出总金额
     */
    @computed
    get dealSellTotalAmount() {
        let ret = NumberUtil.initNumber(this.dealSellNum * this.dealSellPrice, this.commonStore.pointPrice);

        return ret;
    }

    @computed
    get newEntrustData() {
        let entrust = JSON.parse(JSON.stringify(this.parsedEntrustData));

        switch (this.type) {
            case 'all':
                entrust.sell = entrust.sell; // 默认显示10条
                entrust.buy = entrust.buy; // 默认显示10条
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
    updateCurrency(data) {
        this.baseCurrencyId = data.baseCurrencyId;
        this.currencyId = data.currencyId;
        this.baseCurrencyNameEn = data.baseCurrencyNameEn;
        this.currencyNameEn = data.currencyNameEn;
    }

    @action
    changeThemeTo = value => {
        this.theme = value;
        UPEX.cache.setCache('theme', value);
    };
    /**
     * 修改买入价格
     */
    @action
    setDealBuyPrice(price) {

        if (this.dealBuyNum) {
            let balance = this.baseCoinBalance.value;

            if (balance === 0) {
                precent = 0;
            } else {
                precent = (price * this.dealBuyNum / balance) * 100;

                if (precent > 100) {
                    precent = 100;
                } else if (precent < 0) {
                    precent = 0;
                }
            }

            this.buySliderValue = precent;
        }

        this.dealBuyPrice = price;
    }

    /**
     * 修改卖出价格
     */
    @action
    setDealSellPrice(price) {
        this.dealSellPrice = price;
    }

    /**
     * 操作滑动进度，TWD* 百分比
     */
    @action
    setBuySliderValue(value) {
        let balance = this.baseCoinBalance.value;
        let num;

        if (this.dealBuyPrice) {
            num = balance * value / this.dealBuyPrice;
            this.dealBuyNum = NumberUtil.initNumber(num, this.pointPrice);
        }
        
        this.buySliderValue = value;
    }

    @action
    setSellSliderValue(value) {
        let balance = this.tradeCoinBalance.value;
        let num = balance * value * 0.01;

        this.dealSellNum = NumberUtil.initNumber(num, this.pointPrice);
        this.sellSliderValue = value;
    }
    /**
     * 修改买入量
     */
    @action
    setDealBuyNum(value) {
        let baseBalance = this.baseCoinBalance.value;

        let precent;

        if (this.dealBuyPrice) {

            if (baseBalance === 0) {
                precent = 0;
            } else {
                precent = (this.dealBuyPrice * value / baseBalance) * 100;

                if (precent > 100) {
                    precent = 100;
                } else if (precent < 0) {
                    precent = 0;
                }
            }

            this.buySliderValue = precent;
        }

        this.dealBuyNum = value;
    }

    @action
    setDealSellNum(value) {
        let balance = this.tradeCoinBalance.value;
        let precent;

        if (balance === 0) {
            precent = 0;
        } else {
            precent = (value / balance) * 100;

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
            this.tradePriceErr = UPEX.lang.template('输入必须是{min}~{max}', { min: entrustPriceMin, max: entrustPriceMax });
            this.tradePriceErr = '';
            pass = false;
        } else {
            this.tradePriceErr = '';
            pass = true;
        }

        if (type == 'buy') {
            this.dealBuyPrice = amount;
        } else {
            this.dealSellPrice = amount;
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
            this.dealBuyNum = number;
        } else {
            this.dealSellNum = number;
        }

        return pass;
    }

    @action
    getData() {
        this.marketListStore.getData();
    }
    /**
     * 交易历史, 最右侧实时行情图
     */
    @action
    getTradeHistory() {
        socket.off('tradeHistory');
        socket.emit('tradeHistory', {
            baseCurrencyId: this.baseCurrencyId,
            tradeCurrencyId: this.currencyId
        });

        socket.on('tradeHistory', data => {
            runInAction('get tradeHistory data', () => {
                if (typeof data.content.length !== 'undefined') {
                    this.tradeHistory = this.parseTradeHistory(data);
                } else {
                    let item = this.parseTradeHistoryItem(data.content);

                    this.tradeHistory.content.unshift(item);
                }
            });
        });
    }

    parseTradeHistory(data) {
        data.content.forEach((item, index) => {
            this.parseTradeHistoryItem(item);
        });

        // 时间最近－》历史
        data.content.sort(function(a, b) {
            return b.time - a.time;
        });

        return data;
    }

    parseTradeHistoryItem(item) {
        item.timeText = TimeUtil.formatDate(item.time, 'HH:mm:ss'); // 时间
        item.timeTextAll = TimeUtil.formatDate(item.time); // 时间
        item.current = NumberUtil.formatNumber(item.current, this.commonStore.pointPrice); // 价格
        item.amount = NumberUtil.formatNumber(item.amount, this.pointNum); // 数量

        return item;
    }

    @action
    getEntrust() {
        socket.off('entrust');
        socket.emit('entrust', {
            baseCurrencyId: this.baseCurrencyId,
            tradeCurrencyId: this.currencyId
        });

        socket.on('entrust', data => {
            runInAction('get entrust', () => {
                this.entrust = data;

                if (this.first) {
                    // 默认买入价格是最佳价格
                    this.first = false; 

                    this.dealBuyPrice = this.getBestBuyPrice();
                    this.dealSellPrice = this.getBestSellPrice();
                }
            });
        });
    }

    // 格式化委托列表
    @computed
    get parsedEntrustData() {
        let data = JSON.parse(JSON.stringify(this.entrust));
        let buy = data.buy || [];
        let sell = data.sell || [];
        // 买入
        buy.forEach((item, index) => {
            let cache = item.number * item.current / this.entrustScale;

            cache = cache / 100; // 单位：百分比

            let depth = parseInt(cache.toFixed(this.pointNum));

            item.index = index + 1;
            item.depth = Math.max(depth > 100 ? 100 : depth, 1);
            item.newcurrent = NumberUtil.formatNumber(item.current, this.commonStore.pointPrice); // 价格
            item.newnumber = NumberUtil.formatNumber(item.number, this.pointNum); // 数量
            item.newtotal = NumberUtil.formatNumber(item.current * item.number, this.commonStore.pointNum); // 总金额
        });

        // 卖出
        sell.forEach((item, index) => {
            let cache = item.number * item.current / this.entrustScale;

            cache = cache / 100; // 单位：百分比

            let depth = parseInt(cache.toFixed(this.pointNum));

            item.index = index + 1;
            item.depth = Math.max(depth > 100 ? 100 : depth, 1);
            item.newcurrent = NumberUtil.formatNumber(item.current, this.commonStore.pointPrice); // 价格
            item.newnumber = NumberUtil.formatNumber(item.number, this.pointNum); // 数量
            item.newtotal = NumberUtil.formatNumber(item.current * item.number, this.commonStore.pointNum); // 总金额
        });

        // 降序排序
        sell = sell.reverse();

        data.buy = buy;
        data.sell = sell;

        return data;
    }
    /**
     * 设置Tab索引值
     */
    @action
    setTabIndex(index) {
        this.tabIndex = index;
    }

    /**
     * 查询个人币种余额
     */
    @action
    getUserAccount() {
        if (!this.authStore.isLogin) {
            return;
        }

        socket.off('userAccount');
        socket.emit('userAccount', {
            token: this.authStore.token,
            uid: this.authStore.uid,
            tradeCurrencyId: this.currencyId,
            baseCurrencyId: this.baseCurrencyId
        });

        socket.on('userAccount', data => {
            runInAction('get userAccount', () => {
                data.baseCoinBalance = data.baseCoinBalance || 0;
                data.tradeCoinBalance = data.tradeCoinBalance || 0;
                this.personalAccount = data;
            });
        });
    }

    /**
     * 获取账号信息
     */
    @action
    getPersonalInfo() {
        if (!this.authStore.isLogin) {
            return;
        }

        hasSettingDealPwd().then(data => {
            runInAction(() => {
                if (data.status == 200) {
                    if (data.attachment.isValidatePass === 1) {
                        // 已设置交易密码
                        this.hasSettingDealPwd = true;
                    } else {
                        this.hasSettingDealPwd = false;
                    }
                }
            });
        });
    }

    /**
     *  获取用户交易密码设置状态
     */
    @action
    getPersonalTradingPwd() {
        if (!this.authStore.isLogin) {
            return;
        }

        getPersonalTradingPwd().then(data => {
            runInAction(() => {
                if (data.status == 200) {
                    this.tradePasswordStatus = data.attachment.enabled; // 1: 启用 ; 2: 不启用
                }
            });
        });
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
            password = this.tradeSellPassword;
        }

        console.log(price, num, validPrice, validNum, password);

        if (!price) {
            result = {
                pass: false,
                message: UPEX.lang.template('请输入价格')
            };
        } else if (!num) {
            result = {
                pass: false,
                message: UPEX.lang.template('请输入数量')
            };
        } else if (!validPrice) {
            result = {
                pass: false,
                message: UPEX.lang.template('价格输入错误')
            };
        } else if (!validNum) {
            result = {
                pass: false,
                message: UPEX.lang.template('数量输入错误')
            };
        } else {
            // 必须填写交易密码
            if (this.tradePasswordStatus == 1 && !password) {
                result = {
                    pass: false,
                    action: 'pwdpop',
                    message: UPEX.lang.template('请输入交易密码')
                };
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
            };

            if (this.tradePasswordStatus == 1) {
                data.fdPassword = md5(this.tradeBuyPassword + UPEX.config.dealSalt + this.authStore.uid);
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
            };

            if (this.tradePasswordStatus == 1) {
                data.fdPassword = md5(this.tradeSellPassword + UPEX.config.dealSalt + this.authStore.uid);
            }
        }

        submitOrder(data)
            .then(data => {
                this.isSubmiting = 0;
                runInAction('order', () => {
                    switch (data.status) {
                        case 200:
                            this.getUserAccount();

                            if (type == 'buy') {
                                this.setDealBuyPrice('');
                                this.setDealBuyNum('');
                                this.setTradeBuyPassword('');
                            } else {
                                this.setDealSellPrice('');
                                this.setDealSellNum('');
                                this.setTradeSellPassword('');
                            }
                            break;
                        case 2013: //"交易密码输入错误"
                            if (type == 'buy') {
                                this.setTradeBuyPassword('');
                            } else {
                                this.setTradeSellPassword('');
                            }
                            defer.reject(data);
                            break;
                        default:
                            defer.reject(data);
                    }
                });
            })
            .catch(() => {
                this.isSubmiting = 0;
                runInAction(() => {
                    defer.reject();
                });
            });

        return defer.promise();
    }

    processData(list, type, desc) {
        let res = [];

        // Convert to data points
        for (var i = 0; i < list.length; i++) {
            console.log(list[i]);
            list[i] = {
                value: Number(list[i].current), // 价格
                volume: Number(list[i].number) // 成交数量
            };
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
                if (i < list.length - 1) {
                    list[i].totalvolume = list[i + 1].totalvolume + list[i].volume;
                } else {
                    list[i].totalvolume = list[i].volume;
                }
                var dp = {};
                dp['value'] = list[i].value;
                dp[type + 'volume'] = list[i].volume;
                dp[type + 'totalvolume'] = list[i].totalvolume;
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
                dp['value'] = list[i].value;
                dp[type + 'volume'] = list[i].volume;
                dp[type + 'totalvolume'] = list[i].totalvolume;
                res.push(dp);
            }
        }

        return res;
    }

    @action
    destorySocket() {
        socket.off('tradeHistory');
        socket.off('entrust');
        socket.off('quoteNotify');
        socket.off('loginAfter');
        socket.off('userAccount');
        this.first = true;
        this.marketListStore.destorys();
    }
}

export default TradeStore;