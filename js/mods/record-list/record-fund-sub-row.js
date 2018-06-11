import React, { Component } from 'react';

class SubRow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let rechargeCol = [
            { label: UPEX.lang.template('创建时间'), field: 'createTime' },
            { label: UPEX.lang.template('付款账号'), field: 'cardNo' },
            { label: UPEX.lang.template('实际付款'), field: 'tradeAmount' },
            { label: UPEX.lang.template('手续费'), field: 'fee' }
        ];
        let withdrawCol = [
            { label: UPEX.lang.template('创建时间'), field: 'createTime' },
            { label: UPEX.lang.template('提现账号'), field: 'cardNo' },
            { label: UPEX.lang.template('到账金额'), field: 'tradeAmount' },
            { label: UPEX.lang.template('手续费'), field: 'fee' }
        ];
        const {type, data} = this.props
        let cols = type === 'recharge' ? rechargeCol : withdrawCol
        return (
            <dl className={`extra-info ${data.subRowClosed ? '' : 'show'}`}>
                <dd>
                    {cols.map((col, colIndex) => {
                        return (
                            <span key={colIndex} className="text">
                                <span className="label">{col.label}：</span>
                                {data[col.field]}
                            </span>
                        );
                    })}
                </dd>
            </dl>
        );
    }
}

export default SubRow;
