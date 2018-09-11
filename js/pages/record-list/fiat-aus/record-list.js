import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Checkbox, Icon, Pagination } from 'antd';
import DetailRow from './detail-row';
import TimeUtil from '@/lib/util/date';

@inject('fundChangeRecordStore')
@observer
class List extends Component {
    constructor(props){
        super(props);

        this.state = {
            displayIndex: -1
        }
        this.defaultType = ''
    }

    componentDidMount() {
        const {defaultType} = this.props;
        this.props.fundChangeRecordStore.setDataType(defaultType);
    }

    onChangePagination(page) {
        this.props.fundChangeRecordStore.getData({
            pageNumber: page
        });
    }

    toggleSubRow=(index)=>{
        if (index == this.state.displayIndex) {
            this.setState({
                displayIndex: -1
            });
        } else {
            this.setState({
                displayIndex: index
            });
        }
    }

    render() {
        let store = this.props.fundChangeRecordStore;
        let $content;
        if (!store.isFetching && store.orderList.length == 0) {
            $content = <div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无资金变动记录')}</div>;
        } else {
            $content = (
                <ul>
                    {store.orderList.map((item, index) => {
                        // let timeStr = item._type === 'recharge' ? 'tradeTimeStamp' : 'createTimeStamp';
                        let timeStr = 'createTimeStamp';
                        return (
                            <li key={index} className={this.state.displayIndex == item.id ? 'collapse-content-active' : ''}>
                                <dl className="row">
                                    {/* <dd className="swift-no">{item[item._type === 'recharge' ? 'thdNo' : 'orderNo']}</dd> */}
                                    <dd className="swift-no">{item.orderNo}</dd>
                                    <dd className="time">{item[timeStr] ? TimeUtil.formatDate(item[timeStr]) : ''}</dd>
                                    <dd className="name">{item._actionName}</dd>
                                    <dd className="balance">
                                        {item._type === 'recharge' ? '+' : '-'}
                                        {item[item._type === 'recharge' ? 'amount' : 'withdrawAmount']}
                                    </dd>
                                    <dd className="status" title={item.status === 1 ? UPEX.lang.template('已放款，到账速度取决于银行进度') : ''}>{item._status || ''}</dd>
                                    <dd className="pay-method">
                                        {item._payMethod}
                                    </dd>
                                    <dd className="action">
                                         {item._type === 'recharge' ? '--' : (<button type="button" onClick={()=>this.toggleSubRow(item.id)}>{UPEX.lang.template('详情')}</button>)}
                                    </dd>
                                </dl>
                                <DetailRow type={item._type} data={item}/>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <div className="order-table fiat-list-table">
                <div className="table-hd">
                    <table>
                        <tbody>
                            <tr>
                                <th className="swift-no">{UPEX.lang.template('订单号')}</th>
                                <th className="time">{UPEX.lang.template('时间')}</th>
                                <th className="name">{UPEX.lang.template('名称')}</th>
                                <th className="balance">{UPEX.lang.template('收/支')}</th>
                                <th className="status">{UPEX.lang.template('状态')}</th>
                                <th className="pay-method">{UPEX.lang.template('支付方式')}</th>
                                <th className="action pr10">{UPEX.lang.template('操作')}</th>
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
