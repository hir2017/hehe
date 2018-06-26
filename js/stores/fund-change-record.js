/**
 * 法币充值/提现记录
 */
import { observable, computed, autorun, action, runInAction } from 'mobx';
import { getFundChangeList } from '../api/http';
import TimeUtil from '../lib/util/date';
import NumberUtil from '../lib/util/number';

// Mock
import MockData from '../mock/fund-change-record'

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
        '0': UPEX.lang.template('待审核'),
        '1': UPEX.lang.template('成功'),
        '2': UPEX.lang.template('失败'),
        '3': UPEX.lang.template('支付中'),
        '4': UPEX.lang.template('交易异常'),
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
            item._status = statusMap[item.status] || UPEX.lang.template('未知');
            item._actionName = `${UPEX.lang.template('银行卡')}${item.type === 1 ? UPEX.lang.template('充值') : UPEX.lang.template('提现')}`;
            item._payMethod = item.type === 1 ? item.openBank : UPEX.lang.template('法币账户');
        });

        return arr;
    }
}

export default FundChangeRecordStore;
