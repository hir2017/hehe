/**
 * 交易中心－委托中订单 & 已完成订单
 */
import { observable, computed, autorun, action } from 'mobx';
import { getUserOrderList } from '../api/http';

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
    getUserOrderList(baseCurrencyId,  currencyId) {
        getUserOrderList({
            baseCurrencyId: baseCurrencyId,
            tradeCurrencyId: currencyId
        }).then((data) => {
            // data = require('../mock/order-list.json');
            this.openOrderList = parseOpenOrderList(data.attachment.tradeFail);
            this.historyOrderList = parseHistoryOrderList(data.attachment.tradeSuccess);
            this.isFetching = false;
        }).catch(()=>{
            this.isFetching = false;
        })
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
    filterOtherCurrency(currency, isFilter){

    }
}

function parseOpenOrderList(arr){
    arr.forEach((item, index)=>{
        item.orderTime = item.orderTime.split(' ')[1]; // 省略年月
    })

    return arr;
}

function parseHistoryOrderList(arr){
    arr.forEach((item, index)=>{
        item.orderTime = item.orderTime.split(' ')[1]; // 省略年月
    })

    return arr;
}

export default TradeOrder;