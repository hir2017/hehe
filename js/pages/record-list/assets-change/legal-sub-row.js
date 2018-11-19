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
        this.state = {
            reason: ''
        };
    }

    componentDidMount() {
        const {data} = this.props;
        if(data.status === 6 && data.type === 2) {
            this.props.UtilStore.getRefuseReason(data.refuseStrategyId).then(reason => {
                this.setState({
                    reason
                })
            })
        }
    }

    render() {
        let { depositCol, withdrawCol } = this;
        const {state} = this;
        const { type, data } = this.props;
        let cols = type === 'deposit' ? depositCol : withdrawCol;
        if (type === 'deposit' && data.status === 3) {
            if (data.flag === 1) {
                cols = cols.concat([
                    { label: UPEX.lang.template('汇款账号'), field: 'payVirtualAccount' },
                    { label: UPEX.lang.template('收款银行'), field: '_bankInfo' }
                ]);
            }
            if (!data.expire && data.openBank === 'atm') {
                cols = cols.concat([{ label: UPEX.lang.template('支付截止日期'), field: 'expireTime' }]);
            }
        }
        if (data.status === 6 && data.type === 2) {
            // cols = cols.concat([{ label: UPEX.lang.template('原因'), field: 'refuseReason' }]);
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
