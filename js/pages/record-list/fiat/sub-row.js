import React, { Component } from 'react';
import TimeUtil from '@/lib/util/date';

class SubRow extends Component {
    constructor(props) {
        super(props);
        this.rechargeCol = [
            {
                label: UPEX.lang.template('创建时间'),
                field: 'createTimeStamp',
                render(row) {
                    return TimeUtil.formatDate(row.createTimeStamp);
                }
            },
            { label: UPEX.lang.template('付款账号'), field: '_cardNo' },
            { label: UPEX.lang.template('实际付款'), field: 'tradeAmount' },
            { label: UPEX.lang.template('手续费'), field: 'fee' }
        ];
        this.withdrawCol = [
            {
                label: UPEX.lang.template('创建时间'),
                field: 'createTimeStamp',
                render(row) {
                    return TimeUtil.formatDate(row.createTimeStamp);
                }
            },
            { label: UPEX.lang.template('提现账号'), field: '_cardNo' },
            { label: UPEX.lang.template('到账金额'), field: 'tradeAmount' },
            { label: UPEX.lang.template('手续费'), field: 'fee' }
        ];
    }
    render() {
        let { rechargeCol, withdrawCol } = this;
        const { type, data } = this.props;
        let cols = type === 'recharge' ? rechargeCol : withdrawCol;
        if (type === 'recharge') {
            if (data.flag === 1) {
                cols = cols.concat([
                    { label: UPEX.lang.template('汇款账号'), field: 'payVirtualAccount' },
                    { label: UPEX.lang.template('收款银行'), field: '_bankInfo' }
                ]);
            }
            if (!data.expire) {
                cols = cols.concat([{ label: UPEX.lang.template('支付截止日期'), field: 'expireTime' }]);
            }
        }
        return (
            <div className="detail-content">
                {cols.map((col, colIndex) => {
                    return (
                        <div key={colIndex} className="text">
                            <span className="label">{col.label}：</span>
                            {col.render ? col.render(data) : data[col.field]}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SubRow;
