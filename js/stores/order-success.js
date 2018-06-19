/**
 * 我的订单－委托中订单
 */
import { observable, autorun, computed, action, runInAction } from 'mobx';
import { getUserSuccessOrderList } from '../api/http';
import TimeUtil from '../lib/util/date';
import NumberUtil from '../lib/util/number';

// 默认10：全部，0：未成交，1：部分成交，2：全部成交，3：委托失败，4：已撤单，11：部分完成或未完成，12：新全部历史记录
const statusList = [2]; // 委托历史处理的状态订单列表
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

    parseData(arr) {
        arr.forEach((item, index) => {
            item = this.parseItem(item);
        })

        return arr;
    }

    parseItem(item) {
        let pointPrice = this.commonStore.getPointPrice(item.currencyNameEn);
        let pointNum =  this.commonStore.getPointNum(item.currencyNameEn);
        
        item.orderTime = TimeUtil.formatDate(item.orderTime, 'yyyy-MM-dd HH:mm:ss');
        // 委托价格
        item.price = NumberUtil.formatNumber(item.price, pointPrice);
        item.tradeAmount = NumberUtil.formatNumber(item.tradeAmount, pointPrice);
        item.tradePrice = NumberUtil.formatNumber(item.tradePrice, pointPrice);
        // 委托数量
        item.tradeNum = NumberUtil.formatNumber(item.tradeNum, pointNum);
        item.num = NumberUtil.formatNumber(item.num, pointNum);

        return item;
    }

    @action
    updateItem(data) {
        let flag = false; // 是否存在

        // 过滤其他状态的数据
        $.each(this.orderList, (i, item) => {
            if (item.orderNo == data.orderNo) {

                if (statusList.indexOf(data.status) > -1) {
                    this.orderList[i] = this.parseItem(data);    
                } else {
                    this.orderList.splice(i, 1);
                }
                
                flag = true;
                return false;
            }
        })

        // 列表中没有，则新增
        if (!flag) {
            
            if (statusList.indexOf(data.status) > -1) {
                this.orderList.unshift(this.parseItem(data));
            }
        }
    }
}

export default OrderStore;