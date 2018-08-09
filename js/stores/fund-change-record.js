/**
 * 法币充值/提现记录
 */
import { observable, action, runInAction } from 'mobx';
import { getFundChangeList } from '../api/http';


class FundChangeRecordStore {
    @observable orderList = [];
    @observable dataType = 'all';
    @observable current = 1; // 当前页数
    @observable total = 0; // 总页数
    @observable isFetching = false;

    pageSize = 10;

    typeMap = {
        all: '',
        recharge: 1,
        withdraw: 2
    };
    statusMap = {
        withdraw: {
            '0': UPEX.lang.template('审核中'),
            '1': UPEX.lang.template('已放款'),
            '2': UPEX.lang.template('审核中'),
            '3': UPEX.lang.template('审核中'),
            '4': UPEX.lang.template('审核中'),
            '5': UPEX.lang.template('审核中'),
            '6': UPEX.lang.template('审核拒绝'),
            '7': UPEX.lang.template('审核中'),
            '8': UPEX.lang.template('放款失败'),
        },
        recharge: {
            '0': UPEX.lang.template('用户已付款'),
            '1': UPEX.lang.template('已完成'),
            '2': UPEX.lang.template('用户已付款'),
            '3': UPEX.lang.template('待付款'),
            '5': UPEX.lang.template('用户已付款'),
            '6': UPEX.lang.template('用户已付款'),
            '9': UPEX.lang.template('超时取消'),
        }
    }

    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.params = {
            pageNumber: this.current,
            pageSize: this.pageSize,
            type: ''
        };
    }

    @action
    setDataType(type) {
        this.dataType = type;
        this.params.type = this.typeMap[type];
        this.getData({
            pageNumber: 1
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
        if (params.pageNumber && params.pageNumber !== this.current) {
            this.current = params.pageNumber;
        }
        // list: [], pageNumber: 1, pageSize: 10
        getFundChangeList(this.params)
            .then(data => {
                runInAction(() => {
                    if (data.status == 200) {
                        // Mock
                        // data = MockData(this.params)
                        this.orderList = this.parseData(data.attachment.list);
                        this.total = data.attachment.pageCount;

                    }
                    this.isFetching = false;
                });
            })
            .catch((err) => {
                runInAction(() => {
                    this.isFetching = false;
                });
            });
    }


    parseData(arr) {
        const statusMap = this.statusMap
        arr.forEach((item, index) => {
            // item.createTime = TimeUtil.formatDate(item.createTime, 'yyyy-MM-dd HH:mm:ss');
            item._type = item.type === 1 ? 'recharge' : 'withdraw';
            const tempMap = statusMap[item._type];
            item._status = tempMap[item.status] || UPEX.lang.template('未知');
            item._actionName = `${UPEX.lang.template('银行卡')}${item.type === 1 ? UPEX.lang.template('充值') : UPEX.lang.template('提现')}`;
            item._payMethod = item.type === 1 ? item.openBank : UPEX.lang.template('法币账户');
            if(item.status === 6 && item.type !== 1) {
                item._status += ',' + UPEX.lang.template('原因：{reason}', {reason: item.refuseReason});

            }
        });

        return arr;
    }
}

export default FundChangeRecordStore;
