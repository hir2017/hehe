/**
 * 交易中心－委托中订单 & 已完成订单
 */
import { observable, computed, autorun, action , runInAction} from 'mobx';
import { getUserOrderList } from '../api/http';
import TimeUtil from '../lib/util/date';

class TradeOrder {
    @observable openOrderList = []; // 委托中订单 == 当前委托
    @observable historyOrderList = []; // 历史订单 == 已完成订单
    @observable isFetching = true; // 正在加载数据
    @observable tabIndex = 0; // 当前tab索引值

    constructor(stores) {

    }
    /**
     * 交易中心委托列表
     */
    @action
    getUserOrderList(baseCurrencyId, currencyId) {
        getUserOrderList({
            baseCurrencyId: baseCurrencyId,
            tradeCurrencyId: currencyId
        }).then((data) => {
            // data = require('../mock/order-list.json');
            runInAction(() => {
                this.openOrderList = this.parseOpenOrderList(data.attachment.tradeFail);
                this.historyOrderList = this.parseHistoryOrderList(data.attachment.tradeSuccess);
                this.isFetching = false;
            })
        }).catch(() => {
            runInAction(() => {
                this.isFetching = false;
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
     * 过滤其他币种
     */
    @action
    filterOtherCurrency(currency, isFilter) {

    }
}


export default TradeOrder;