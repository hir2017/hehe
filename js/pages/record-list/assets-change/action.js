import React from 'react';
import {Icon, Tooltip} from 'antd';
import TimeUtil from '@/lib/util/date';

import {
    getFundChangeList,
    ausGetFundChangeList,
    getCoinRechargeList,
    getCoinWithdrawList,
    getAssetChangeReward,
} from '@/api/http';

import Api from '@/api';

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
        case type === 'token-record':
            request = Api.ieo.getIEORecordList;
            params = {
                start: page,
                size: 10
            }
    }
    return {
        request,
        params
    };
};

// 充提现、充提币返回数据格式整理，不同接口返回的数据结构不一致
const FormatSourceData = (type, res, params) => {
    let result = {};
    let _source = res.attachment || {};
    switch (type) {
        case 'coin-deposit':
            result = {
                listData: _source.points || [],
                current: params.start,
                total: typeof _source.total === 'undefined' ? 0 : _source.total
            };
            break;
        case 'coin-withdraw':
            result = {
                listData: _source.list || [],
                current: params.start,
                total: typeof _source.total === 'undefined' ? 0 : _source.total
            };
            break;
        case 'reward':
            result = {
                listData: _source.points || [],
                current: params.start,
                total: typeof _source.total === 'undefined' ? 0 : _source.total
            };
            break;
        case 'token-record':
            result = {
                listData: _source.list || [],
                current: params.start,
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
export const getList = function (type, page = 1) {
    // 获取对应tab的请求函数，和请求参数
    let {request, params} = getParams(type, page);
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
            // 数据格式化
            result = FormatSourceData(type, res, params);
        }
        return result;
    });
};

// 数据格式化函数
const formatFn = {
    // 法定货币
    legal(valMap, type, item) {
        item._actionType = type;
        // 状态
        item._status = valMap.status[item.status] || '--';
        // 卡号
        item._cardNo = item.cardNo || (item.payerAccount5Code ? `*******${item.payerAccount5Code || ''}` : '');
        // 支付方式
        // 付款银行
        item._bankInfo = item.type === 1 ? `${valMap.banks[item.payBankCode] || ''}(${item.payBankCode || ''})` : '';
        // 行为 金额 交易时间 支付方式 充值详情禁止
        if (UPEX.config.version === 'ace') {
            item._actionName = item.type === 1 ? UPEX.lang.template('充值') : UPEX.lang.template('提现');
            item._amount = `${item.type === 1 ? '+' : '-'}${item.amount}`;
            item._tradeTime = item.tradeTimeStamp ? TimeUtil.formatDate(item.tradeTimeStamp) : '--';
            item._payMethod = item.type === 1 ? `${valMap.payMethods[item.openBank] || '--'}` : UPEX.lang.template('银行卡提现');
            if (item.type === 1) {
                item._disabled = item.status === 9;
            }
        } else {
            item._actionName = type === 'deposit' ? UPEX.lang.template('充值') : UPEX.lang.template('提现');
            item._amount = type === 'deposit' ? `+${item.amount}` : `-${item.withdrawAmount}`;
            let _time = type === 'deposit' ? item.tradeTimeStamp : item.createTimeStamp;
            item._tradeTime = _time ? TimeUtil.formatDate(_time) : '--';
            let payMap = {
                '1': 'BPAY',
                '2': 'POLI',
            }
            item._payMethod = type === 'deposit' ? payMap[item.type] : UPEX.lang.template('银行卡转账');
            if (type === 'deposit') {
                item._disabled = true;
            }
        }

        return item;
    },
    // 加密货币
    coin_deposit(valMap, type, item) {
        item._disabled = true;
        switch (item.confirms) {
            case 'success':
                item._status = (
                    <span className="all-success has-ico">
                        <Icon type="check-circle-o"/>
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
    coin_withdraw(valMap, type, item) {
        item._disabled = true;
        switch (item.confirms) {
            case 'Success':
                item._status = (
                    <span className="all-success has-ico">
                        <Icon type="check-circle-o"/>
                        {UPEX.lang.template('已完成')}
                    </span>
                );
                item._disabled = false;
                item._info = UPEX.lang.template('Txid:{value}', {value: item.walletWaterSn || '--'});
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
    reward(valMap, type, item) {
        item._changeType = valMap.type[item.changeType] || '';
        item._createTime = item.createTimeStamp ? TimeUtil.formatDate(item.createTimeStamp) : '--';
        return item;
    },
    //IEO记录
    token_record(valMap, type, item) {
        item._createTime = item.createTime ? TimeUtil.formatDate(item.createTime) : '--';
        //0-初始 1-交易成功 2-交易失败 3-IEO冻结资金已扣减 4-扣减IEO冻结资金失败 5-已退款  6-退款失败 7-用户资金已转移 8-用户资金转移失败
        // 前端显示：1、3、4、6、8-交易成功  2-交易失败 5-已退款 7-资产已转正
        switch (item.status) {
            case 0:
                item._status = UPEX.lang.template('初始');
                break;
            case 1:
                item._status = UPEX.lang.template('交易成功');
                break;
            case 2:
                item._status = (
                    <div>{UPEX.lang.template('交易失败')}<Tooltip placement="top" title={UPEX.lang.template('IEO募集失败提示')}
                                                              overlayClassName="buy-tooltip">
                        <span className="tip"/>
                    </Tooltip></div>);
                break;
            case 5:
                item._status = UPEX.lang.template('已退款');
                break;
            case 7:
                item._status = UPEX.lang.template('资产已转正');
                break;
            default:
                item._status = UPEX.lang.template('交易成功');
                break;
        }
        item._rate = (<span>{item.rate} {item.payCurrencyNameEn}/{item.ieoCurrencyNameEn}</span>);
        item._payCount = (<span>{item.payCount} {item.payCurrencyNameEn}</span>);

        return item;
    }
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
        case 'token-record':
            _filter = formatFn.token_record;
            break;
        default:
            _filter = formatFn.legal;
            break;
    }
    let valMap = isLegal ? getlegalMap(type) : getCoinMap(type);
    _filter = _filter.bind(this, valMap, type);
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
            '4': UPEX.lang.template('充值取消'),
            '5': UPEX.lang.template('等待上账'),
            '6': UPEX.lang.template('部分上账')
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
            '6': UPEX.lang.template('待退款'),
            '9': UPEX.lang.template('超时取消'),
            '10': UPEX.lang.template('充值失败'),
            '11': UPEX.lang.template('已退款'),
            '12': UPEX.lang.template('退款失败'),
            '13': UPEX.lang.template('待退款'),
            '14': UPEX.lang.template('待退款'),
            '15': UPEX.lang.template('部分上账'),
            '16': UPEX.lang.template('等待上账')
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
    };
    return {
        type: type === 'reward' ? rewardTypeMap : depositeTypeMap
    };
};

/**
 * TODO:
 * 加分页 加禁用 加详情
 */
