/**
 * 法币充值/提现记录
 */
import { observable, action, runInAction } from 'mobx';
import { getFundChangeList, ausGetFundChangeList } from '../api/http';


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



    getStatusMap(type) {
        let ausStatusMap =  {
            withdraw: {
                '0': UPEX.lang.template('审核中'),
                '1': UPEX.lang.template('已放款'),
                '2': UPEX.lang.template('提现失败'),
                '3': UPEX.lang.template('审核中'),
                '4': UPEX.lang.template('审核中'),
                '5': UPEX.lang.template('审核中'),
                '6': UPEX.lang.template('审核拒绝'),
                '7': UPEX.lang.template('放款中'),
                '8': UPEX.lang.template('放款失败'),
                '9': UPEX.lang.template('审核中'),
            },
            recharge: {
                '1': UPEX.lang.template('已完成'),
                '3': UPEX.lang.template('充值失败'),
                '4': UPEX.lang.template('充值取消'),
            }
        };
        let statusMap = {
            withdraw: {
                '0': UPEX.lang.template('审核中'),
                '1': UPEX.lang.template('已放款'),
                '2': UPEX.lang.template('提现失败'),
                '3': UPEX.lang.template('审核中'),
                '4': UPEX.lang.template('审核中'),
                '5': UPEX.lang.template('审核中'),
                '6': UPEX.lang.template('审核拒绝'),
                '7': UPEX.lang.template('放款中'),
                '8': UPEX.lang.template('放款失败'),
                '9': UPEX.lang.template('审核中'),
            },
            recharge: {
                '0': UPEX.lang.template('已付款,系统入账中'),
                '1': UPEX.lang.template('已完成'),
                '2': UPEX.lang.template('已付款,系统入账中'),
                '3': UPEX.lang.template('待付款'),
                '5': UPEX.lang.template('已付款,系统入账中'),
                '6': UPEX.lang.template('已付款,系统入账中'),
                '9': UPEX.lang.template('超时取消'),
                '10': UPEX.lang.template('充值失败'),
                '11': UPEX.lang.template('已退款'),
                '12': UPEX.lang.template('退款失败'),
                '13': UPEX.lang.template('待退款'),
                '14': UPEX.lang.template('退款资料已补充'),
            }
        }
        return type === 'aus' ? ausStatusMap : statusMap;
    }

    getItemMap () {
        return {
            payMethods: {
                'atm': UPEX.lang.template('ATM转账'),
                'webatm': UPEX.lang.template('webATM'),
            },
            banks: {
                '808': UPEX.lang.template('玉山银行'),
                '004': UPEX.lang.template('臺灣銀行'),
                '008': UPEX.lang.template('華南銀行',)
            }
        }
    }


    ausPayMap = {
        recharge: {
            '1': 'BPAY',
            '2': 'POLI',
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
        const version = UPEX.config.version;
        let request = version === 'ace' ? getFundChangeList : ausGetFundChangeList;

        request(this.params).then(res => {
                runInAction(() => {
                    if (res.status == 200) {
                        let newList = version === 'ace' ? this.parseData(res.attachment.list) : this.ausParseData(res.attachment.list);
                        this.orderList = newList;
                        this.total = res.attachment.pageCount;

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
        const statusMap = this.getStatusMap();
        const {payMethods, banks} = this.getItemMap();

        arr.forEach((item, index) => {
            item._type = item.type === 1 ? 'recharge' : 'withdraw';
            const tempMap = statusMap[item._type];
            item._status = tempMap[item.status] || '--';
            item._actionName = item.type === 1 ? UPEX.lang.template('充值') : UPEX.lang.template('提现');
            item._cardNo = item.cardNo || (item.payerAccount5Code ? `*******${item.payerAccount5Code || ''}` : '');
            // 充值禁止详情
            if(item.type === 1) {
                item._disabled = item.status == 9;
            }
            // 支付方式
            item._payMethod = item.type === 1 ? `${payMethods[item.openBank] || '--'}` : UPEX.lang.template('银行卡提现');
            // 付款银行
            item._bankInfo = item.type === 1 ? `${banks[item.payBankCode] || ''}(${item.payBankCode || ''})` : '';
            // 拒绝原因
            if(item.status === 6 && item._type === 'withdraw') {
                // item._status += ',' + UPEX.lang.template('原因：{reason}', {reason: item.refuseReason});
            }
        });
        return arr;
    }

    /*
     * 澳洲版数据解析
     * 由于接口问题, type现在已经被污染了，只能通过内部dataType判断该条数据类型 'recharge' : 'withdraw'，无法处理全部类型的数据
     *
    */
   ausParseData(arr) {
    const {dataType, ausPayMap: payMap} = this;
    let statusMap = this.getStatusMap('aus');
    arr.forEach((item, index) => {
        item._type = dataType;
        const tempMap = statusMap[item._type];
        item._status = tempMap[item.status] || UPEX.lang.template('未知');
        item._actionName = dataType === 'recharge' ? UPEX.lang.template('充值') : UPEX.lang.template('提现');
        item._payMethod = dataType === 'recharge' ?  payMap.recharge[item.type] : UPEX.lang.template('银行卡转账');
        item._tradeType = dataType === 'recharge' ? item.type : 'withdraw';
        // if(item.status === 6 && item._type === 'withdraw') {
        //     item._status += ',' + UPEX.lang.template('原因：{reason}', {reason: item.refuseReason});
        // }
    });
    return arr;
}
}

export default FundChangeRecordStore;
