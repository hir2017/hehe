/**
 * 充提现详情 （旧代码 需要优化）
 */
import React, { Component } from 'react';
import TimeUtil from '@/lib/util/date';
import { inject } from 'mobx-react';

@inject('UtilStore')
class SubRow extends Component {
    constructor(props) {
        super(props);
        this.depositCol = [
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
        ];
        this.withdrawCol = [
            { label: UPEX.lang.template('开户名'), field: 'accountName' },
                { label: UPEX.lang.template('银行清算号(BSB)'), field: 'bsb' },
                { label: UPEX.lang.template('收款账号(Account Number)'), field: 'accountNumber' },
                { label: UPEX.lang.template('到账金额'), field: 'receiveAmount' },
                { label: UPEX.lang.template('手续费'), field: 'fee' }
        ];
        this.state = {
            reason: ''
        };
    }

    componentDidMount() {
        const {data, type} = this.props;
        if(data.status === 6 && type === 'withdraw') {
            this.props.UtilStore.getRefuseReason(data.refuseStrategyId).then(reason => {
                this.setState({
                    reason
                })
            })
        }
    }

    render() {
        const { state, depositCol, withdrawCol } = this;
        const { type, data } = this.props;
        let cols = type === 'deposit' ? depositCol : withdrawCol;
        if (data.status === 6 && type === 'withdraw') {
            cols = cols.concat([
                {
                    label: UPEX.lang.template('原因'),
                    render(row) {
                        return state.reason;
                    }
                }
            ]);
        }
        if (data.status === 6 && data.type === 2) {
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
