import { observable, autorun, computed, action, runInAction } from 'mobx';
import { getUserOpenOrderList, getUserHistoryOrderList , getUserSuccessOrderList, getPersonalTradingPwd, cancelOrder} from '../api/http';
import TimeUtil from '../lib/util/date';
import md5 from '../lib/md5';

class Order {
    @observable orderlist = []; // 订单列表
    @observable tradePasswordStatus = 2; // 交易.  1：需要交易密码；2：不需要交易密码
    @observable tradePassword = '';
    @observable showTradePwdPopup = false;


    @observable isFetchingOpenList = false;
    @observable openOrderList = [];
    @observable currentOpenPage = 1;
    @observable openParams = {};


    @observable isFetchingHistoryList = false;
    @observable historyOrderList = [];
    @observable currentHistoryPage = 1;
    @observable historyParams = {
        beginTime: '',
        endTime: '',
        start: 1,
        size: 10,
        status: 12,
        buyOrSell: 0,
        currencyId: 0,
        baseCurrencyId: 0,
        priceType: 0
    };

    @observable isFetchingSuccessList = false;
    @observable successOrderList = [];
    @observable currentSuccessPage = 1;
    @observable successParams = {
        beginTime: '',
        endTime: '',
        start: 1,
        size: 10,
        status: 0,
        buyOrSell: 0,
        currencyId: 0,
        baseCurrencyId: 0,
        priceType: 0
    };

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.authStore = stores.authStore;
    }

    @action
    getHistoryOrderList(params) {
        this.historyParams = Object.assign(this.historyParams, params);

        if (this.isFetchingHistoryList) {
            return;
        }

        this.isFetchingHistoryList = true;

        getUserHistoryOrderList(this.historyParams).then((data) => {
            runInAction('get user order list success', () => {
                if (data.status === 200) {
                    this.historyOrderList = this.parseHistoryOrderList(data.attachment.list);
                    this.totalHistoryPage = data.attachment.total;
                }
                this.isFetchingHistoryList = false;
            })
        })
    }
    
    @action
    getOpenOrderList(params) {
        this.openParams = Object.assign(this.openParams, params)

        if (this.isFetchingOpenList) {
            return;
        }

        this.isFetchingOpenList = true;

        getUserOpenOrderList(this.openParams).then((data) => {
                runInAction(() => {
                    if (data.status == 200) {
                        this.openOrderList = this.parseOpenOrderList(data.attachment.tradeFail);
                        this.totalOpenPage = data.attachment.totalPage;
                        this.isFetchingOpenList = false;
                    }
                })
        }).catch(() => {
            runInAction(() => {
                this.isFetchingOpenList = false;
            })
        })
    }

    @action
    getSuccessOrderList(params) {
        this.successParams = Object.assign(this.successParams, params);

        if (this.isFetchingSuccessList) {
            return;
        }

         console.log(this.successParams);
        
        this.isFetchingSuccessList = true;

        getUserSuccessOrderList().then((data) => {
            runInAction(() => {
                this.successOrderList = this.parseSuccessOrderList(data.attachment.tradeSuccess);
                this.totalSuccessPage = data.attachment.totalPage;
                this.isFetchingSuccessList = false;
            })
        }).catch(() => {
            runInAction(() => {
                this.isFetchingSuccessList = false;
            })
        })
    }

    @action
    parseOpenOrderList(arr) {
        arr.forEach((item, index) => {
            let pointPrice = this.commonStore.getPointPrice('currencyNameEn', item.currencyNameEn);
            let pointNum =  this.commonStore.getPointNum('currencyNameEn', item.currencyNameEn);
            // 时间
            item.orderTime = TimeUtil.formatDate(item.orderTime, 'yyyy-MM-dd HH:mm:ss');
            // 委托价格
            // item.price = NumberUtil.initNumber(item.price, pointPrice);
            // 委托数量
            // item.num = NumberUtil.initNumber(item.num, pointNum);
        })

        return arr;
    }

    @action
    parseSuccessOrderList(arr) {
        arr.forEach((item, index) => {
            let pointPrice = this.commonStore.getPointPrice('currencyNameEn', item.currencyNameEn);
            let pointNum =  this.commonStore.getPointNum('currencyNameEn', item.currencyNameEn);
            
            item.orderTime = TimeUtil.formatDate(item.orderTime, 'yyyy-MM-dd HH:mm:ss');
            // 委托价格
            item.price = NumberUtil.initNumber(item.price, pointPrice);
            item.tradeAmount = NumberUtil.initNumber(item.tradeAmount, pointPrice);
            item.tradePrice = NumberUtil.initNumber(item.tradePrice, pointPrice);
            // 委托数量
            item.tradeNum = NumberUtil.initNumber(item.tradeNum, pointNum);
            item.num = NumberUtil.initNumber(item.num, pointNum);
        })

        return arr;
    }

    @action
    parseHistoryOrderList(arr) {
        arr.forEach((item, index) => {
            item.orderTime = TimeUtil.formatDate(item.orderTime, 'yyyy-MM-dd HH:mm:ss');
        })

        return arr;
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
                if (data.status ==  200) {
                    this.tradePasswordStatus = data.attachment.enabled; // 1: 启用 ; 2: 不启用        
                }
            })
        })
    }

    @action
    setTradePassword(password) {
        this.tradePassword = password;
    }

    @computed
    get md5TradePassword(){
        return md5(this.tradePassword + UPEX.config.salt);
    }

    // 提交撤单验证
    @computed
    verifyCancelOrder() {
        let result = {
            pass: true,
            message: ''
        };

        // 必须填写交易密码
        if (this.tradePasswordStatus == 1 && !this.tradePassword) {
            result = {
                pass: false,
                message: UPEX .lang.template('请输入交易密码')
            }

        }

        return result;
    }

    @action
    cancelOrder(orderNo) {
        return cancelOrder({
            source: 1,
            fdPassword: this.tradePasswordStatus == 1 ? this.md5TradePassword : '',
            orderNo: orderNo

        }).then((data)=>{
           
        });
    }
}

export default Order;