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

	deleteItem(){
		
	}

	@action
	parseData(arr) {
		arr.forEach((item, index) => {
            let pointPrice = this.commonStore.getPointPrice('currencyNameEn', item.currencyNameEn);
            let pointNum =  this.commonStore.getPointNum('currencyNameEn', item.currencyNameEn);
            // 时间
            item.orderTime = TimeUtil.formatDate(item.orderTime, 'yyyy-MM-dd HH:mm:ss');
            // 委托价格
            item.price = NumberUtil.initNumber(item.price, pointPrice);
            // 成交金额
            item.tradeAmount = NumberUtil.initNumber(item.tradeAmount, pointPrice);
            // 成交价格
            item.tradePrice = NumberUtil.initNumber(item.tradePrice, pointPrice);
            // 委托数量
            item.num = NumberUtil.initNumber(item.num, pointNum);
            // 成交数量
            item.tradeNum = NumberUtil.initNumber(item.tradeNum, pointNum);
            // 成交率
            item.tradeRate = NumberUtil.initNumber(item.tradeRate * 100, 2) + '%';
        })

        return arr;
	}
}

export default OrderStore;