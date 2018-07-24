/**
 * 我的订单－委托中订单
 */
import { observable, action, runInAction } from 'mobx';
import { getUserHistoryOrderList, getUserHistoryOrderDetail } from '../api/http';
import TimeUtil from '../lib/util/date';
import NumberUtil from '../lib/util/number';

// 默认10：全部，0：未成交，1：部分成交，2：全部成交，3：委托失败，4：已撤单，11：部分完成或未完成，12：新全部历史记录
const statusList = [2, 4, 5]; // 委托历史处理的状态订单列表

class OrderStore {
    @observable orderList = [];
    @observable current = 1; // 当前页数
    @observable total = 0; // 总页数
    @observable isFetching = false;

    pageSize = 10;

    constructor(stores) {
        this.currencyStore = stores.currencyStore;
        this.commonStore = stores.commonStore;
        this.params = {
            start: this.current,
            size: this.pageSize,
            beginTime: '',
            endTime: '',
            status: 12,
            buyOrSell: 0,
            currencyId: 0,
            baseCurrencyId: 0,
            priceType: 0
        };
    }

    // 订单
    statisticsMap = {
        // 全部成交
        2: {
            num: 0,
            rate: 0
        },
        // 全部撤单
        4: {
            num: '',
            rate: '100%'
        }
    };

    @action
    getDetail(index, item) {
        // 2: UPEX.lang.template('全部成交'), 4: UPEX.lang.template('全部撤单'),   5: UPEX.lang.template('部分成交后撤单')
        // 1：成交，2：撤单 3: 部分成交撤单
        let typeMap = {
            '2': 1,
            '4': 2,
            '5': 3
        };
        getUserHistoryOrderDetail({
            buyOrSell: item.buyOrSell,
            orderNo: item.orderNo,
            // type: item.status,
            /*
            TODO:
            type现在只能单独取成交信息或者撤销信息 无法综合
            */
            type: typeMap[item.status]
        })
            .then(data => {
                runInAction(() => {
                    if (data.status == 200) {
                        let { details = [] } = data.attachment;
                        // null不严格等于undefined
                        details = details === null ? [] : details;
                        this.orderList[index].details = details;
                        this.orderList[index]._detailInfo = data.attachment;
                        this.orderList[index].detailReady = true;
                        this.orderList[index]._cancel = {};
                        let cancelInfo = this.statisticsMap[item.status] || {};

                        if (item.status === 5) {
                            let temp = details.reduce(
                                (total, curr) => {
                                    return {
                                        num: NumberUtil.add(total.num, curr.num),
                                        rate: NumberUtil.add(total.rate, curr.rate)
                                    };
                                },
                                {
                                    num: 0,
                                    rate: 0
                                }
                            );
                            cancelInfo = {
                                num: item.num - temp.num,
                                rate: 1 - temp.rate
                            };
                        }

                        this.orderList[index]._cancel = cancelInfo;
                    }
                });
            })
            .catch(e => {
                runInAction(() => {
                    console.error(e);
                });
            });
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

        getUserHistoryOrderList(this.params)
            .then(data => {
                runInAction(() => {
                    if (data.status == 200) {
                        this.orderList = this.parseData(data.attachment.list);
                        this.total = data.attachment.total;
                        this.isFetching = false;
                    }
                });
            })
            .catch(() => {
                runInAction(() => {
                    this.isFetching = false;
                });
            });
    }

    parseData(arr) {
        arr.forEach((item, index) => {
            item = this.parseItem(item);
        });

        return arr;
    }

    parseItem(item) {
        
        let currencyObj = this.currencyStore.getCurrencyById(`${item.baseCurrencyId}-${item.currencyId}`);
        let pointNum = currencyObj.pointNum;
        let pointPrice = currencyObj.pointPrice;

        // 时间
        item.orderTime = item.orderTime.split('.0')[0];
        // 委托价格
        item.price = NumberUtil.formatNumber(item.price, pointPrice);
        // 平均成交价
        item.averagePrice = NumberUtil.formatNumber(item.averagePrice || 0, pointPrice);
        // 成交价格
        item.dealAmount = NumberUtil.formatNumber(item.dealAmount, pointPrice);
        // 委托数量
        item.num = NumberUtil.formatNumber(item.num, pointNum);
        // 剩余数量
        item.remainNum = NumberUtil.formatNumber(item.remainNum, pointNum);
        // 成交数量
        item.tradeNum = NumberUtil.formatNumber(item.tradeNum, pointNum);
        // 成交率
        item.tradeRate = item.tradeRate || 0;
        item.tradeRate = NumberUtil.formatNumber(item.tradeRate * 100, 2) + '%';

        item.details = [];
        item.detailReady = false;
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
        });

        // 列表中没有，则新增
        if (!flag) {
            if (statusList.indexOf(data.status) > -1) {
                this.orderList.splice(0,0, this.parseItem(data));
            }
        }
    }
}

export default OrderStore;
