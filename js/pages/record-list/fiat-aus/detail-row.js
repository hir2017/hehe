import React, { Component } from 'react';

class SubRow extends Component {
    constructor(props) {
        super(props);

        this.columns = {
            rechargeCol: [
                {
                    label: UPEX.lang.template('创建时间'),
                    field: 'createTimeStamp',
                    render(row) {
                        return TimeUtil.formatDate(row.createTimeStamp);
                    }
                },
                { label: UPEX.lang.template('付款账号'), field: 'cardNo' },
                { label: UPEX.lang.template('实际付款'), field: 'tradeAmount' },
                { label: UPEX.lang.template('手续费'), field: 'fee' }
            ],
            withdrawCol: [
                { label: UPEX.lang.template('开户名'), field: 'accountName' },
                { label: UPEX.lang.template('银行清算号(BSB)'), field: 'bsb' },
                { label: UPEX.lang.template('收款账号(Account Number)'), field: 'accountNumber' },
                // { label: UPEX.lang.template('创建时间'), field: 'thdTime' },
                { label: UPEX.lang.template('到账金额'), field: 'receiveAmount' },
                { label: UPEX.lang.template('手续费'), field: 'fee' }
            ]
        };
    }
    render() {
        const { rechargeCol, withdrawCol } = this.columns;
        const { type, data } = this.props;
        let cols = type === 'recharge' ? rechargeCol : withdrawCol;

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
