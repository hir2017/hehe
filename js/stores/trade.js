import { observable, computed, action, runInAction } from 'mobx';
import MarketListStore from './market';
import NP from 'number-precision';
import NumberUtil from '../lib/util/number';
import TimeUtil from '../lib/util/date';
import Url from '../lib/url';
import md5 from '../lib/md5';


export default class TradeStore {
    // 页面主题。浅色：light；深色：dark
    @observable theme = UPEX.cache.getCache('theme') || 'dark';
    @observable dataReady = false;

    @observable tradePair = {
        baseCurrencyId: '',
        tradeCurrencyId: '',
    }
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

    // 用户账户余额信息
    @observable personalAccount = {
        baseCoinBalance: 0,
        tradeCoinBalance: 0,
        baseCoinBalanceText: 0,
        tradeCoinBalanceText: 0
    }
    @observable tradePasswordStatus = 2; // 交易.  1：需要资金密码；2：不需要资金密码
    @observable tradeType = 'limit';
    // @observable bestSellPrice = ''; // 最佳卖出价格
    // @observable bestBuyPrice = ''; // 最佳买入价格

    @observable dealBuyPrice = ''; // 交易买入价格
    @observable dealSellPrice = ''; // 交易卖出价格
    @observable dealBuyNum = ''; // 买入数量
    @observable dealSellNum = ''; // 卖出数量
    @observable buySliderValue = 0;
    @observable sellSliderValue = 0;
    @observable validBuyPrice = true;
    @observable validSellPrice = true;
    @observable tradePriceErr = '';
    @observable tradeNumberErr = '';
    @observable tradeBuyPassword = '';
    @observable tradeSellPassword = '';
    @observable submiting = 0;

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.currencyStore = stores.currencyStore;
        this.authStore = stores.authStore;
        this.openStore = stores.openStore;
        this.successStore = stores.successStore;
        this.marketListStore = new MarketListStore(stores);

        this.minContentHeight = 320;
        this.minChartHeight = 320; // K线图最小高度270
        this.headerHeight = 60;
        this.space = 10;
    }

    @action reset() {
        this.dealBuyPrice = this.currentTradeCoin.currentAmountInt || ''; // 交易买入价格
        this.dealSellPrice = this.currentTradeCoin.currentAmountInt || ''; // 交易卖出价格
        this.dealBuyNum = ''; // 买入数量
        this.dealSellNum = ''; // 卖出数量
        this.buySliderValue = 0;
        this.sellSliderValue = 0;
        this.validBuyPrice = true;
        this.validSellPrice = true;
        this.tradePriceErr = '';
        this.tradeNumberErr = '';
        this.tradeBuyPassword = '';
        this.tradeSellPassword = '';
        this.submiting = 0; 
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

    @action isExpandOrderTable(status) {
        this.expandOrderTable = status;
    }

    @action updateCurrentTradeCoin(data) {
        this.currentTradeCoin = data;
    }

    @action updateAsks(data) {
        this.asks = data;
    }

    @action updateBids(data) {
        this.bids = data;
    }

    @action updatePersonalAccount(data) {        
        let obj = Object.assign(this.personalAccount, data);
        let key = [obj.baseCurrencyId, data.tradeCurrencyId].join('_');
        let cfg = this.currencyStore.getCurrencyById(key);
        let { pointNum, pointPrice } = cfg;

        this.personalAccount.baseCoinBalanceText = NumberUtil.initNumber(data.baseCoinBalance, pointPrice);
        this.personalAccount.tradeCoinBalanceText = NumberUtil.initNumber(data.tradeCoinBalance, pointNum);
    }

    @action updateTradePasswordStatus(value) {
        this.tradePasswordStatus = value;
    }

    @action updateTradeType(index) {
        this.reset();
        this.tradeType = index;
    }

    @action updateTradePair(data) {
        this.tradePair = data;
    }

    @action checkTradeNumber(number, type) {
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

    @action checkTradePrice(amount, type) {
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

    @action setDealSellNum(value) {
        let balance = this.personalAccount.tradeCoinBalance
        let precent;

        if (balance === 0) {
            precent = 0;
        } else {
            if (value > balance) {
                // 输入框值溢出处理
                value = NumberUtil.toFixed(balance, this.pointNum);
                precent = 100;
            } else {
                precent = (value / balance) * 100;
            }

            if (precent > 100) {
                precent = 100;
            } else if (precent < 0) {
                precent = 0;
            }
        }

        this.sellSliderValue = precent;
        this.dealSellNum = value;
    }

    /**
     * 修改买入量
     */
    @action setDealBuyNum(value) {
        let baseBalance = this.personalAccount.baseCoinBalance;

        let precent;

        if (this.dealBuyPrice) {

            if (baseBalance === 0) {
                precent = 0;
            } else {
                if (this.dealBuyPrice * value > baseBalance) {
                    // 输入框值溢出处理
                    value = NumberUtil.toFixed(baseBalance / this.dealBuyPrice, this.pointNum);
                    precent = 100;
                } else {
                    precent = (this.dealBuyPrice * value / baseBalance) * 100;
                }

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

    /**
     * 修改买入价格
     */
    @action setDealBuyPrice(price) {
        if (this.tradeType == 'market') {
            return;
        }
        if (this.dealBuyNum) {
            let balance = this.personalAccount.baseCoinBalance;

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
    @action setDealSellPrice(price) {
        if (this.tradeType == 'market') {
            return;
        }
        this.dealSellPrice = price;
    }

    // @action setBestBuyPrice(value){
    //     this.bestBuyPrice = value;
    // }

    // @action setBestSellPrice(value){
    //     this.bestSellPrice = value;
    // }
    /**
     * 操作滑动进度，TWD* 百分比
     */
    @action setBuySliderValue(value) {
        let balance = this.personalAccount.baseCoinBalance;
        let num;

        if (this.dealBuyPrice) {
            num = balance * value * 0.01 / this.dealBuyPrice;
            this.dealBuyNum = NumberUtil.initNumber(num, this.pointNum);
        }

        this.buySliderValue = value;
    }

    @action setSellSliderValue(value) {
        let balance = this.personalAccount.tradeCoinBalance;
        let num = balance * value * 0.01;
        let dealNum = num.toString();

        if (dealNum.indexOf('e') !== -1) {
            dealNum = NumberUtil.scientificToNumber(num);
        }
        dealNum = NumberUtil.toFixed(dealNum, this.pointNum);

        this.dealSellNum = dealNum;

        this.sellSliderValue = value;
    }

    @action updateSubmiting(value) {
        this.submiting = value;
    }

    @action setTradeSellPassword(value) {
        this.tradeSellPassword = value;
    }

    @action setTradeBuyPassword(value) {
        this.tradeBuyPassword = value;
    }

    @computed get buySliderPercent() {
        return this.buySliderValue + '%';
    }

    @computed get sellSliderPercent() {
        return this.sellSliderValue + '%';
    }
    /**
     * 买入手续费
     */
    @computed get dealBuyFee() {
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
    @computed get dealSellFee() {
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
    @computed get pointPrice() {
        return this.currentTradeCoin.pointPrice;
    }

    // 交易币数量保留的位数
    @computed get pointNum() {
        return this.currentTradeCoin.pointNum;
    }
    /**
     * 买入总金额, 单位：基础币
     */
    @computed get dealBuyTotalAmount() {
        let ret = NumberUtil.initNumber(this.dealBuyNum * this.dealBuyPrice, this.pointPrice);

        return ret;
    }

    /**
     * 卖出总金额，单位：交易币
     */
    @computed get dealSellTotalAmount() {
        let ret = NumberUtil.initNumber(this.dealSellNum * this.dealSellPrice, this.pointPrice);

        return ret;
    }

    // 提交买入订单验证
    @action.bound verifyInfoBeforeSubmit(type) {
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
            password = this.tradeBuyPassword;
        } else {
            price = this.dealSellPrice;
            num = this.dealSellNum;
            validPrice = this.validSellPrice;
            password = this.tradeSellPassword;
        }

        if (this.tradeType == 'market') {
            if (!num) {
                result = {
                    pass: false,
                    message: UPEX.lang.template('请填写数量')
                };
            } else {
                // 必须填写资金密码
                if (this.tradePasswordStatus == 1 && !password) {
                    result = {
                        pass: false,
                        action: 'pwdpop',
                        message: UPEX.lang.template('请输入资金密码')
                    };
                }
            }
        } else {
            if (!price) {
                result = {
                    pass: false,
                    message: UPEX.lang.template('请填写价格')
                };
            } else if (!num) {
                result = {
                    pass: false,
                    message: UPEX.lang.template('请填写数量')
                };
            } else if (!validPrice) {
                result = {
                    pass: false,
                    message: UPEX.lang.template('请填写正确的价格')
                };
            } else {
                // 必须填写资金密码
                if (this.tradePasswordStatus == 1 && !password) {
                    result = {
                        pass: false,
                        action: 'pwdpop',
                        message: UPEX.lang.template('请输入资金密码')
                    };
                }
            }
        }

        return result;
    }
}