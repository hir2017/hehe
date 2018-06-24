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
            <div className="detail-content">
                {
                    cols.map((col, colIndex) => {
                        return (
                            <div key={colIndex} className="text">
                                <span className="label">{col.label}：</span>
                                {data[col.field]}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default SubRow;
