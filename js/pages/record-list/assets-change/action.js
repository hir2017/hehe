import react from 'react';
import TimeUtil from '@/lib/util/date';

import { getFundChangeList, ausGetFundChangeList, getCoinRechargeList, getCoinWithdrawList, getAssetChangeReward } from '@/api/http';

// 请求、请求参数 逻辑判断
const getParams = (type, page) => {
    let request = null,
        params = {};
    switch (true) {
        // 充提现接口、参数 处理
        case ['deposit', 'withdraw'].indexOf(type) !== -1:
            request = UPEX.config.version === 'ace' ? getFundChangeList : ausGetFundChangeList;
            params = {
                pageNumber: page,
                pageSize: 10,
                type: type === 'deposit' ? 1 : 2
            };
            break;
        // 充提币接口、参数 处理
        case ['coin-deposit', 'coin-withdraw'].indexOf(type) !== -1:
            request = 'coin-deposit' === type ? getCoinRechargeList : getCoinWithdrawList;
            params = {
                start: page,
                size: 10,
                beginTime: '',
                endTime: '',
                status: 0,
                currencyId: 0,
                currentyId: 0
            };
            break;
        // 充提币接口、参数 处理
        case type === 'reward':
            request = getAssetChangeReward;
            params = {
                start: page,
                size: 10,
                beginTime: '',
                endTime: '',
                status: 0,
                currencyId: 0,
                currentyId: 0
            };
            break;
    }
    return {
        request,
        params
    };
};

// 充提现、充提币返回数据格式整理
const FormatSourceData = (type, res) => {
    let result = {};
    let _source = res.attachment || {};
    switch (type) {
        case 'coin-deposit':
            result = {
                listData: _source.points || [],
                total: typeof _source.total === 'undefined' ? 0 : _source.total
            };
            break;
        case 'coin-withdraw':
            result = {
                listData: _source.list || [],
                total: typeof _source.total === 'undefined' ? 0 : _source.total
            };
            break;
        case 'reward':
            result = {
                listData: _source.points || [],
                total: typeof _source.total === 'undefined' ? 0 : _source.total
            };
            break;
        default:
            result = {
                listData: _source.list,
                current: _source.pageNumber,
                total: typeof _source.pageCount === 'undefined' ? 0 : _source.pageCount
            };
            break;
    }
    result.listData = formatItem(result.listData, type);
    return result;
};

// 发起请求 获取数据
export const getList = function(type, page = 1) {
    let { request, params } = getParams(type, page);
    if (request === null) {
        console.error('record: getList type is lose');
        return;
    }
    return request(params).then(res => {
        let result = {
            listData: [],
            current: 1,
            total: 0
        };
        if (res.status === 200) {
            result = FormatSourceData(type, res);
        }
        return result;
    });
};

// 数据格式化函数
const formatFn = {
    // 法定货币
    legal(valMap, item) {
        // 状态
        item._status = valMap.status[item.status] || '--';
        // 行为
        item._actionName = item.type === 1 ? UPEX.lang.template('充值') : UPEX.lang.template('提现');
        // 卡号
        item._cardNo = item.cardNo || (item.payerAccount5Code ? `*******${item.payerAccount5Code || ''}` : '');
        // 支付方式
        item._payMethod = item.type === 1 ? `${valMap.payMethods[item.openBank] || '--'}` : UPEX.lang.template('银行卡提现');
        // 付款银行
        item._bankInfo = item.type === 1 ? `${valMap.banks[item.payBankCode] || ''}(${item.payBankCode || ''})` : '';
        // 金额
        item._amount = `${item.type === 1 ? '+' : '-'}${item.amount}`;
        // 交易时间
        item._tradeTime = item.tradeTimeStamp ? TimeUtil.formatDate(item.tradeTimeStamp) : '--';
        // 充值详情禁止
        if (item.type === 1) {
            item._disabled = item.status === 9;
        }
        return item;
    },
    // 加密货币
    coin_deposit(valMap, item) {
        item._disabled = true;
        switch (item.confirms) {
            case 'success':
                item._status = (
                    <span className="all-success has-ico">
                        <Icon type="check-circle-o" />
                        {UPEX.lang.template('已完成')}
                    </span>
                );
                item._disabled = false;
                break;
            default:
                // 数字：网络确认数
                item._status = `(${item.confirms}/${item.finalConfirms})`;
        }
        item._type = valMap.type[item.rechargeType] || '';
        item._walletSn = item.walletSn ? `${UPEX.lang.template('地址')} : ${item.walletSn}` : '';
        item._createTime = item.createTimeStamp ? TimeUtil.formatDate(item.createTimeStamp) : '--';
        return item;
    },
    coin_withdraw(valMap, item) {
        item._disabled = true;
        switch (item.confirms) {
            case 'Success':
                item._status = (
                    <span className="all-success has-ico">
                        <Icon type="check-circle-o" />
                        {UPEX.lang.template('已完成')}
                    </span>
                );
                item._disabled = false;
                item._info = UPEX.lang.template('Txid:{value}', { value: item.walletWaterSn || '--' });
                break;
            case 'Reject':
                item._status = UPEX.lang.template('审核拒绝');
                item._disabled = false;
                break;
            case 'Verify':
                item._status = UPEX.lang.template('审核中');
                break;
            case 'Fail':
                item._status = UPEX.lang.template('提币失败');
                break;
            default:
                // 数字：网络确认数
                item._status = `${item.confirms}/${item.finalConfirms}`;
        }
        item._type = UPEX.lang.template('提币'); // valMap.type[item.withdrawType] || '';
        item._address = `${UPEX.lang.template('地址')} : ${item.address}`;
        item._createTime = item.createTimeStamp ? TimeUtil.formatDate(item.createTimeStamp) : '--';

        return item;
    },
        // 分发记录
        reward(valMap, item) {
            item._changeType = valMap.type[item.changeType] || '';
            item._createTime = item.createTimeStamp ? TimeUtil.formatDate(item.createTimeStamp) : '--';
            return item;
        },
};
// 列表数据格式整理
const formatItem = (arr, type) => {
    let isLegal = ['deposit', 'withdraw'].indexOf(type) !== -1;
    let _filter = null;
    switch (type) {
        case 'coin-deposit':
            _filter = formatFn.coin_deposit;
            break;
        case 'coin-withdraw':
            _filter = formatFn.coin_withdraw;
            break;
        case 'reward':
            _filter = formatFn.reward;
            break;
        default:
            _filter = formatFn.legal;
            break;
    }
    let valMap = isLegal ? getlegalMap(type) : getCoinMap(type);
    _filter = _filter.bind(this, valMap);
    let result = arr.map(_filter);
    return result;
};

// 充提现状态值转义
const getlegalMap = type => {
    // 状态值
    let ausStatusMap = {
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
            '9': UPEX.lang.template('审核中')
        },
        deposit: {
            '1': UPEX.lang.template('已完成'),
            '3': UPEX.lang.template('充值失败'),
            '4': UPEX.lang.template('充值取消')
        }
    };
    // 状态值
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
            '9': UPEX.lang.template('审核中')
        },
        deposit: {
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
            '14': UPEX.lang.template('退款资料已补充')
        }
    };
    // 支付方式
    let payMethods = {
        atm: UPEX.lang.template('ATM转账'),
        webatm: UPEX.lang.template('webATM')
    };
    let ausPay = {
        deposit: {
            '1': 'BPAY',
            '2': 'POLI'
        }
    };
    // 银行
    let banks = {
        '808': UPEX.lang.template('玉山银行'),
        '004': UPEX.lang.template('臺灣銀行'),
        '008': UPEX.lang.template('華南銀行')
    };
    // 当前使用的状态值映射
    let _map = UPEX.config.version === 'ace' ? statusMap : ausStatusMap;

    return (valMap = {
        status: _map[type],
        payMethods,
        banks,
        ausPay
    });
};

// 充提币状态值转义
const getCoinMap = type => {
    let depositeTypeMap = {
        '1': UPEX.lang.template('自动充币'),
        '3': UPEX.lang.template('虚拟充币')
    };
    let rewardTypeMap = {
        '15': UPEX.lang.template('邀请返佣金'),
        '20': UPEX.lang.template('币空投活动')
    }
    return {
        type: type === 'reward' ? rewardTypeMap: depositeTypeMap
    };
};

/**
 * TODO:
 * 加分页 加禁用 加详情
 */
