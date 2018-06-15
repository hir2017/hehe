/**
 * 我的订单－委托中订单
 */
import { observable, autorun, computed, action, runInAction } from 'mobx';
import { getUserOpenOrderList } from '../api/http';
import TimeUtil from '../lib/util/date';
import NumberUtil from '../lib/util/number';

class OrderStore {
    @observable orderList = [];
    @observable current = 1; // 当前页数
    @observable total = 0; // 总页数
    @observable isFetching = false;

    pageSize = 10;

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.params = {
            start: this.current,
            size: this.pageSize
        }
    }

    @action
    getData(params = {}) {
        // 防止重复提交
        if (this.isFetching) {
            return;
        }

        this.isFetching = true;

        this.params = Object.assign(this.params, params);

        // 更新当前页数
        if (params.start && params.start !== this.current) {
            this.current = params.start;
        }

        getUserOpenOrderList(this.params).then((data) => {
            runInAction(() => {
                if (data.status == 200) {
                    this.orderList = this.parseData(data.attachment.list);
                    this.total = data.attachment.total;
                }
                this.isFetching = false;
            })
        }).catch(() => {
            runInAction(() => {
                this.isFetching = false;
            })
        })
    }

    @action
    deleteItem(orderNo) {
        $.each(this.orderList, (i, item) => {
            if (item.orderNo == orderNo) {
                this.orderList.splice(i, 1);
                return false;
            }
        })

        this.total = this.total - 1;
    }

    @action
    updateItem(data) {
        $.each(this.orderList, (i, item) => {
            if (item.orderNo == data.orderNo) {
                this.orderList[i] = this.parseItem(data);
                return false;
            }
        })
    }


    parseData(arr) {
        arr.forEach((item, index) => {
            item = this.parseItem(item);
        })

        return arr;
    }

    parseItem(item) {
        let pointPrice = this.commonStore.getPointPrice(item.currencyNameEn);
        let pointNum = this.commonStore.getPointNum(item.currencyNameEn);
        // 时间
        item.orderTime = TimeUtil.formatDate(item.orderTime, 'yyyy-MM-dd HH:mm:ss');
        // 委托价格
        item.price = NumberUtil.formatNumber(item.price, pointPrice);
        // 成交金额
        item.tradeAmount = NumberUtil.formatNumber(item.tradeAmount, pointPrice);
        // 成交价格
        item.tradePrice = NumberUtil.formatNumber(item.tradePrice, pointPrice);
        // 委托数量
        item.num = NumberUtil.formatNumber(item.num, pointNum);
        // 成交数量
        item.tradeNum = NumberUtil.formatNumber(item.tradeNum, pointNum);
        // 成交率
        item.tradeRate = NumberUtil.formatNumber(item.tradeRate * 100, 2) + '%';

        return item;
    }
}

export default OrderStore;