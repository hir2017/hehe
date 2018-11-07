import React, { Component } from 'react';
import { getRefuseReason } from '@/api/http';

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
        this.state = {
            reason: ''
        };
    }

    componentWillReceiveProps({isShow, data}) {
        if(isShow && data.status === 6 && data._type === 'withdraw') {
            getRefuseReason(data.refuseStrategyId).then(res => {
                if(res.status === 200) {
                    const {reason} = res.attachment;
                    this.setState({
                        reason
                    })
                }
            })
        }
    }

    render() {
        const { state } = this;
        const { rechargeCol, withdrawCol } = this.columns;
        const { type, data } = this.props;
        let cols = type === 'recharge' ? rechargeCol : withdrawCol;
        if (data.status === 6 && data._type === 'withdraw') {
            cols = cols.concat([
                {
                    label: UPEX.lang.template('原因'),
                    render(row) {
                        return state.reason;
                    }
                }
            ]);
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
