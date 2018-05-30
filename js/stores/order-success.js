/**
 * 我的订单－委托中订单
 */
import { observable, autorun, computed, action, runInAction } from 'mobx';
import { getUserSuccessOrderList } from '../api/http';
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
        	size: this.pageSize,
            beginTime: '',
            endTime: '',
            status: 0,
            buyOrSell: 0,
            currencyId: 0,
            baseCurrencyId: 0,
            priceType: 0
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

        getUserSuccessOrderList(this.params).then((data) => {
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
	parseData(arr) {
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
}

export default OrderStore;