import { observable, autorun, computed, action, runInAction } from 'mobx';
import { getOrderListByCustomer, getUserOrderList , getPersonalTradingPwd} from '../api/http';
import TimeUtil from '../lib/util/date';

class Order {
    @observable tabIndex = 0; // 0 当前委托；1：历史委托；3：已成交
    @observable orderlist = []; // 订单列表
    @observable tradePasswordStatus = 2; // 交易.  1：需要交易密码；2：不需要交易密码
    @observable tradePassword = '';
    @observable showTradePwdPopup = false;


    @observable isFetchingOpenList = true;
    @observable openOrderList = [];
    @observable currentOpenPage = 1;
    @observable openParams = {};


    @observable isFetchingHistoryList = true;
    @observable historyOrderList = [];
    @observable currentHistoryPage = 1;
    @observable historyParams = {
        beginTime: '',
        endTime: '',
        start: 1,
        size: 10,
        status: 10,
        buyOrSell: 0,
        currencyId: 0,
        baseCurrencyId: 0,
        priceType: 0
    };

    @observable isFetchingSuccessList = true;
    @observable successOrderList = [];
    @observable currentSuccessPage = 1;
    @observable successParams = {
        beginTime: '2018-05-23',
        endTime: '',
        start: 1,
        size: 10,
        status: 10,
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
    setTabIndex(index) {
        this.tabIndex = index;
    }

    @action
    getHistoryOrderList(params) {
        this.historyParams = Object.assign(this.historyParams, params);

        getOrderListByCustomer(this.historyParams).then((data) => {
            runInAction('get user order list success', () => {
                if (data.status === 200) {
                    this.historyOrderList = this.parseHistoryOrderList(data.attachment.list);

                }
                this.isFetchingHistoryList = false;
            })
        })
    }

    @computed
    get totalHistoryPage(){
        return 1;
    }
    
    @action
    getOpenOrderList(params) {
        this.openParams = Object.assign(this.openParams, params)

        getUserOrderList(this.openParams).then((data) => {
            runInAction(() => {
                this.openOrderList = this.parseOpenOrderList(data.attachment.tradeFail);
                this.isFetchingOpenList = false;
            })
        }).catch(() => {
            runInAction(() => {
                this.isFetchingOpenList = false;
            })
        })
    }

    @computed
    get totalOpenPage(){
        return this.openOrderList.length;
    }


    @action
    getSuccessOrderList(params) {
        this.successParams = Object.assign(this.successParams, params);

        getUserOrderList(this.successParams).then((data) => {
            runInAction(() => {
                this.successOrderList = this.parseSuccessOrderList(data.attachment.tradeSuccess);
                this.isFetchingSuccessList = false;
            })
        }).catch(() => {
            runInAction(() => {
                this.isFetchingSuccessList = false;
            })
        })
    }

    @computed
    get totalSuccessPage(){
        return 1;
    }

    @action
    parseOpenOrderList(arr) {
        arr.forEach((item, index) => {
            let pointPrice = this.commonStore.getPointPrice('currencyNameEn', item.currencyNameEn);
            let pointNum =  this.commonStore.getPointNum('currencyNameEn', item.currencyNameEn);
            // 时间
            item.orderTime = TimeUtil.formatDate(item.orderTime, 'yyyy-MM-dd HH:mm:ss');
            // 委托价格
            item.price = NumberUtil.initNumber(item.price, pointPrice);
            // 委托数量
            item.num = NumberUtil.initNumber(item.num, pointNum);
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
                this.tradePasswordStatus = data.attachment.enabled; // 1: 启用 ; 2: 不启用    
            })
        })
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

    }
}

export default Order;