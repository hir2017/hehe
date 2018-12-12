import React from 'react';
import {Button} from 'antd';

// 充值提现 head、body一样
export const deposit = function () {
    return {
        head: [
            {label: UPEX.lang.template('订单号'), className: 'order-no'},
            {label: UPEX.lang.template('日期'), className: 'time'},
            {label: UPEX.lang.template('名称'), className: 'name'},
            {label: UPEX.lang.template('收/支'), className: 'balance'},
            {label: UPEX.lang.template('状态'), className: 'status'},
            {label: UPEX.lang.template('支付方式'), className: 'pay-method'},
            {label: UPEX.lang.template('操作'), className: 'action pr10'}
        ],
        body: [
            {dataIndex: 'orderNo', className: 'order-no'},
            {dataIndex: '_tradeTime', className: 'time'},
            {dataIndex: '_actionName', className: 'name'},
            {dataIndex: '_amount', className: 'balance'},
            {dataIndex: '_status', className: 'status'},
            {dataIndex: '_payMethod', className: 'pay-method'},
            {
                render: (row, col, index) => {
                    // 澳洲充值无详情
                    if (UPEX.config.version !== 'ace' && row._actionType === 'deposit') {
                        return '--'
                    }
                    return (
                        <Button
                            disabled={row._disabled}
                            onClick={() => {
                                this.toggleSubRow(row, index);
                            }}
                        >
                            {UPEX.lang.template('详情')}
                        </Button>
                    );
                },
                className: 'action'
            }
        ]
    };
};
// 充币
export const coin_deposit = function () {
    return {
        head: [
            {label: UPEX.lang.template('状态'), className: 'status'},
            {label: UPEX.lang.template('币种'), className: 'name'},
            {label: UPEX.lang.template('数量'), className: 'num'},
            {label: UPEX.lang.template('类型'), className: 'type'},
            {label: UPEX.lang.template('时间'), className: 'time'},
            {label: UPEX.lang.template('信息'), className: 'address'},
            {label: UPEX.lang.template('操作'), className: 'action'},
        ],
        body: [
            {dataIndex: '_status', className: 'status'},
            {dataIndex: 'currencyNameEn', className: 'name'},
            {dataIndex: 'coinNum', className: 'num'},
            {dataIndex: '_type', className: 'type'},
            {dataIndex: '_createTime', className: 'time'},
            {dataIndex: '_walletSn', className: 'address'},
            {
                render: (row, col, index) => {
                    return (
                        <Button
                            disabled={row._disabled}
                            onClick={() => {
                                this.toggleSubRow(row, index);
                            }}
                        >
                            {UPEX.lang.template('详情')}
                        </Button>
                    );
                },
                className: 'action'
            }
        ]
    };
};
// 提币
export const coin_withdraw = function () {
    return {
        head: [
            {label: UPEX.lang.template('状态'), className: 'status'},
            {label: UPEX.lang.template('币种'), className: 'name'},
            {label: UPEX.lang.template('数量'), className: 'num'},
            {label: UPEX.lang.template('类型'), className: 'type'},
            {label: UPEX.lang.template('时间'), className: 'time'},
            {label: UPEX.lang.template('手续费'), className: 'fee'},
            {label: UPEX.lang.template('信息'), className: 'address'},
            {label: UPEX.lang.template('操作'), className: 'action'},
        ],
        body: [
            {dataIndex: '_status', className: 'status'},
            {dataIndex: 'currencyNameEn', className: 'name'},
            {dataIndex: 'initAmount', className: 'num'},
            {dataIndex: '_type', className: 'type'},
            {dataIndex: '_createTime', className: 'time'},
            {dataIndex: 'fee', className: 'fee'},
            {dataIndex: '_address', className: 'address'},
            {
                render: (row, col, index) => {
                    return (
                        <Button
                            disabled={row._disabled}
                            onClick={() => {
                                this.toggleSubRow(row, index);
                            }}
                        >
                            {UPEX.lang.template('详情')}
                        </Button>
                    );
                },
                className: 'action'
            }
        ]
    };
};
// 分发
export const reward = function () {
    return {
        head: [
            {label: UPEX.lang.template('时间'), className: 'time'},
            {label: UPEX.lang.template('类型'), className: 'type'},
            {label: UPEX.lang.template('币种'), className: 'name'},
            {label: UPEX.lang.template('数量'), className: 'num'},
            // {label: UPEX.lang.template('备注'), className: 'note'},
        ],
        body: [
            {dataIndex: '_createTime', className: 'time'},
            {dataIndex: '_changeType', className: 'type'},
            {dataIndex: 'currencyNameEn', className: 'name'},
            {dataIndex: 'coinNum', className: 'num'},
            // { dataIndex: '_note', className: 'note'},
        ]
    };
};

//IEO购买记录
export const ieo = function () {
    return {
        head: [
            {label: UPEX.lang.template('购买时间'), className: 'time'},
            {label: UPEX.lang.template('购买方式'), className: 'way'},
            {label: UPEX.lang.template('购买IEO币种'), className: 'name'},
            {label: UPEX.lang.template('购买数量'), className: 'num'},
            {label: UPEX.lang.template('购买单价'), className: 'price'},
            {label: UPEX.lang.template('购买金额'), className: 'total'},
            {label: UPEX.lang.template('状态'), className: 'status'}
        ],
        body: [
            {dataIndex: '_createTime', className: 'time'},
            {dataIndex: 'payCurrencyNameEn', className: 'way'},
            {dataIndex: 'ieoCurrencyNameEn', className: 'name'},
            {dataIndex: 'ieoCount', className: 'num'},
            {dataIndex: 'rate', className: 'price'},
            {dataIndex: 'payCount', className: 'total'},
            {dataIndex: '_status', className: 'status'},
        ]
    };
};



