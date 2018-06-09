import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Checkbox, Icon, Pagination } from 'antd';
import SubRow from './record-fund-sub-row';

@inject('fundChangeRecordStore')
@observer
class List extends Component {
    componentDidMount() {
        this.props.fundChangeRecordStore.getData({
            pageNumber: 1
        });
    }

    onChangePagination(page) {
        this.props.fundChangeRecordStore.getData({
            pageNumber: page
        });
    }

    render() {
        let store = this.props.fundChangeRecordStore;
        let $content;
        if (store.isFetching) {
            $content = <div className="mini-tip">{UPEX.lang.template('正在加载')}</div>;
        } else if (store.orderList.length == 0) {
            $content = <div className="mini-tip">{UPEX.lang.template('暂无数据')}</div>;
        } else {
            $content = (
                <ul>
                    {store.orderList.map((item, index) => {
                        return (
                            <li key={index}>
                                <dl className="row">
                                    <dd className="swift-no">{item.tradeNo}</dd>
                                    <dd className="time">{item.tradeTime}</dd>
                                    <dd className="name">{item._actionName}</dd>
                                    <dd className="balance">
                                        {item._type === 'recharge' ? '+' : '-'}
                                        {item.amount}
                                    </dd>
                                    <dd className="status">{item._status}</dd>
                                    <dd className="pay-method">
                                        {item._payMethod}
                                        <Icon
                                            className="toggle"
                                            type={item.subRowClosed ? 'caret-down' : 'caret-up'}
                                            onClick={() => {
                                                store.toggleSubRow(index);
                                            }}
                                        />
                                    </dd>
                                </dl>
                                <SubRow type={item._type} data={item} />
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <div className="account-record-list">
                <div className="table-hd">
                    <table>
                        <tbody>
                            <tr>
                                <th className="swift-no">{UPEX.lang.template('流水号')}</th>
                                <th className="time">{UPEX.lang.template('日期')}</th>
                                <th className="name">{UPEX.lang.template('名称')}</th>
                                <th className="balance">{UPEX.lang.template('收/支')}</th>
                                <th className="status">{UPEX.lang.template('状态')}</th>
                                <th className="pay-method">{UPEX.lang.template('支付方式')}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-bd">
                    {$content}
                    {store.isFetching ? <div className="mini-loading" /> : null}
                </div>
                <div className="table-ft">
                    {store.total > 0 ? <Pagination current={store.current} total={store.total} pageSize={store.pageSize} onChange={this.onChangePagination.bind(this)} /> : null}
                </div>
            </div>
        );
    }
}

export default List;
