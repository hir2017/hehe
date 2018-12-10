/**
 * 充提现详情 （旧代码 需要优化）
 */
import React, { Component } from 'react';
import TimeUtil from '@/lib/util/date';
import { inject } from 'mobx-react';
import { DepositDetailList } from './common-view';
import { getAusAccountEntryRecords } from '@/api/http';

@inject('UtilStore')
class SubRow extends Component {
    constructor(props) {
        super(props);
        // 充值详情配置
        let depositCol = [
            // {
            //     label: UPEX.lang.template('创建时间'),
            //     field: 'createTimeStamp',
            //     render(row) {
            //         return TimeUtil.formatDate(row.createTimeStamp);
            //     }
            // },
            // { label: UPEX.lang.template('付款账号'), field: 'cardNo' },
            // { label: UPEX.lang.template('实际付款'), field: 'tradeAmount' },
            // { label: UPEX.lang.template('手续费'), field: 'fee' }
        ];
        // 提现详情配置
        let withdrawCol = [
            { label: UPEX.lang.template('开户名'), field: 'accountName' },
            { label: UPEX.lang.template('银行清算号(BSB)'), field: 'bsb' },
            { label: UPEX.lang.template('收款账号(Account Number)'), field: 'accountNumber' },
            { label: UPEX.lang.template('到账金额'), field: 'receiveAmount' },
            { label: UPEX.lang.template('手续费'), field: 'fee' }
        ];

        const { data, type } = props;
        // 获取详情配置
        let cols = type === 'deposit' ? depositCol : withdrawCol;
        // 如果当前为提现详情，且为驳回状态，添加一条驳回原因配置
        if (data.status === 6 && type === 'withdraw') {
            cols = cols.concat([
                {
                    label: UPEX.lang.template('原因'),
                    render: row => {
                        return this.state.reason;
                    }
                }
            ]);
        }

        // 充值是否分批上账 (1)已完成,(6)部分上账, 添加配置：分批上账记录
        this.is_depositBatchOnAccount = type === 'deposit' && [1, 6].indexOf(data.status) !== -1;

        this.state = {
            // 当前详情驳回原因
            reason: '',
            // 当前详情配置
            cols: cols,
            // 充值分批上账列表
            depositList: [],
            // 充值分批上账 未上账金额
            depositWaitAmount: 'none',
        };
    }

    componentDidMount() {
        const { data, type } = this.props;
        // 提现详情 且状态为6(审核拒绝) 调用接口获取驳回原因
        if (data.status === 6 && type === 'withdraw') {
            this.props.UtilStore.getRefuseReason(data.refuseStrategyId).then(reason => {
                this.setState({
                    reason
                });
            });
        }
        // 充值详情  调用接口获取分批上账记录
        if (this.is_depositBatchOnAccount) {
            getAusAccountEntryRecords({
                orderNo: data.orderNo
            }).then(res => {
                if(res.status === 200) {
                    const {entryAmountRecordList = [], waitForEntryAmount} = res.attachment;
                    this.setState({
                        depositList: entryAmountRecordList,
                        depositWaitAmount: waitForEntryAmount
                    })
                }
            })
        }
    }

    render() {
        const { state } = this;
        const { data } = this.props;
        let $list = null;
        // 充值详情 添加配置：分批上账记录
        if (this.is_depositBatchOnAccount) {
            $list = <DepositDetailList data={state.depositList} num={state.depositWaitAmount} />;
        }
        return (
            <div className="detail-content">
                {state.cols.map((col, colIndex) => {
                    return (
                        <div key={colIndex} className="text">
                            <span className="label">{col.label}：</span>
                            {col.render ? col.render(data) : data[col.field]}
                        </div>
                    );
                })}
                {$list}
            </div>
        );
    }
}

export default SubRow;
