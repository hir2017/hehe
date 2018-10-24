import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Pagination, Button } from 'antd';
import TimeUtil from '@/lib/util/date';
import List from '@/components/list';

@inject('fundChangeRecordStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subIndex: -1,
            listProps: {
                head: [
                    { label: UPEX.lang.template('订单号'), className: 'swift-no' },
                    { label: UPEX.lang.template('日期'), className: 'time' },
                    { label: UPEX.lang.template('名称'), className: 'name' },
                    { label: UPEX.lang.template('收/支'), className: 'balance' },
                    { label: UPEX.lang.template('状态'), className: 'status' },
                    { label: UPEX.lang.template('支付方式'), className: 'pay-method' },
                    { label: UPEX.lang.template('操作'), className: 'action pr10' }
                ],
                body: [
                    { dataIndex: 'orderNo', className: 'swift-no' },
                    { dataIndex: 'tradeTimeStamp', className: 'time' },
                    { dataIndex: '_actionName', className: 'name' },
                    { dataIndex: 'amount', className: 'balance' },
                    { dataIndex: '_status', className: 'status' },
                    { dataIndex: 'tradeType', className: 'pay-method' },
                    {
                        render: (row, col, index) => {
                            return (
                                <Button
                                    onClick={() => {
                                        this.toggleSubRow(row, index);
                                    }}
                                >
                                    {UPEX.lang.template('详情')}
                                </Button>
                            );
                        },
                        className: 'action pr10'
                    }
                ],
                expandedRowRender(subData, rowData, index) {
                    // 充值
                    if(rowData.type === 1) {
                        return (
                            <div>
                                <p><label>{UPEX.lang.template('创建时间')}:</label> {TimeUtil.formatDate(rowData.createTimeStamp)}</p>
                                <p><label>{UPEX.lang.template('付款账号')}:</label> {rowData._cardNo}</p>
                                <p><label>{UPEX.lang.template('实际付款')}:</label> {rowData.tradeAmoun }</p>
                                <p><label>{UPEX.lang.template('手续费')}:</label> {rowData.fee}</p>
                            </div>
                        )
                    }
                    // 提现
                    if(rowData.type === 2) {
                        return (
                            <div>
                                <p><label>{UPEX.lang.template('创建时间')}:</label> {TimeUtil.formatDate(rowData.createTimeStamp)}</p>
                                <p><label>{UPEX.lang.template('提现账号')}:</label> {rowData._cardNo}</p>
                                <p><label>{UPEX.lang.template('到账金额')}:</label> {rowData.tradeAmoun }</p>
                                <p><label>{UPEX.lang.template('手续费')}:</label> {rowData.fee}</p>
                            </div>
                        )
                    }
                    return '--'
                }
            }
        };
    }

    componentDidMount() {
        this.props.fundChangeRecordStore.setDataType('all');
    }

    onChangePagination(page) {
        this.props.fundChangeRecordStore.getData({
            pageNumber: page
        });
    }

    toggleSubRow = (row, index) => {
        console.log('toggleSubRow', row, index);
        if (index == this.state.subIndex) {
            this.setState({
                subIndex: -1
            });
        } else {
            this.setState({
                subIndex: index
            });
        }
    };

    render() {
        let store = this.props.fundChangeRecordStore;
        let $content;
        const { state } = this;

        return (
            <List {...state.listProps} subIndex={state.subIndex} data={store.orderList}>
                <Pagination current={store.current} total={store.total} pageSize={store.pageSize} onChange={this.onChangePagination.bind(this)} />
            </List>
        );
    }
}

export default View;
