import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, DatePicker, Pagination } from 'antd';
const Option = Select.Option;
import toAction from './record-action';

@inject('commonStore', 'historyStore', 'authStore')
@observer
class List extends Component {
    static defaultProps = {
        pagination: true
    };

    constructor(props) {
        super(props);

        this.action = toAction(this.props.historyStore, this.props.authStore);
    }

    componentDidMount() {
        this.action.getData();
    }

    handleChange = (val, field, targetFiled) => {
        const data = {};
        data[targetFiled || field] = val;
        this.action.handleFilter(field, data);
    };

    onChangePagination(page) {
        this.action.handleFilter('page', {
            page
        });
    }
    // 开始时间
    onChangeStartTime(value, dateString) {
        this.action.handleFilter('beginTime', {
            beginTime: dateString
        });
    }
    // 结束时间
    onChangeEndTime(value, dateString) {
        this.action.handleFilter('endTime', {
            endTime: dateString
        });
    }

    onChangeCurrency = value => {
        this.action.handleFilter('currencyId', {
            currencyId: value
        });
    };

    onChangeBuyOrSell = value => {
        this.action.handleFilter('buyOrSell', {
            buyOrSell: value
        });
    };

    onChangeStatus = value => {
        this.action.handleFilter('status', {
            status: value
        });
    };

    triggerShowDetail(index, item) {
        if (!item.display) {
            this.props.historyStore.getDetail(index, item);
        }
        item.display = !item.display;
    }

    transVal(val, field) {
        // 0. 未成交 1. 部分成交 2. 全部成交 3. 委托失败 4. 全部撤单 5. 部分成交后撤单
        // 委托历史只包含： 2、4、5
        const maps = {
            2: UPEX.lang.template('全部成交'),
            4: UPEX.lang.template('全部撤单'),
            5: UPEX.lang.template('部分成交后撤单')
        };
        return maps[val] || null;
    }

    render() {
        let store = this.props.historyStore;
        let $content;

        if (!this.props.authStore.isLogin) {
            $content = <div className="mini-tip">{UPEX.lang.template('登录后可查看委托历史订单')}</div>;
        } else if (!store.isFetching && store.orderList.length == 0) {
            $content = <div className="mini-tip">{UPEX.lang.template('暂无委托历史订单')}</div>;
        } else {
            $content = (
                <ul className="list">
                    {store.orderList.map((item, index) => {
                        let status = '--';

                        return (
                            <li key={index}>
                                <dl>
                                    <dd className="time">{item.orderTime}</dd>
                                    <dd className="name">{item.currencyNameEn}</dd>
                                    <dd className="inorout">
                                        {item.buyOrSell == 1 ? (
                                            <label className="buy">{UPEX.lang.template('买入')}</label>
                                        ) : (
                                            <label className="sell">{UPEX.lang.template('卖出')}</label>
                                        )}
                                    </dd>
                                    <dd className="num">{`${item.tradeNum}/${item.num}`}</dd>
                                    <dd className="price">{item.price}</dd>
                                    <dd className="tradeprice">{item.averagePrice}</dd>
                                    <dd className="status">{this.transVal(item.status)}</dd>
                                    <dd className="action">
                                        <button onClick={this.triggerShowDetail.bind(this, index, item)}> 详情 </button>
                                    </dd>
                                </dl>
                                <div className={`detail-content ${item.display ? 'show' : ''}`}>
                                    <table>
                                        <tbody>
                                            {item.details.length !== 0 ? (
                                                item.details.map((subItem, subIndex) => {
                                                    return (
                                                        <tr className="data" key={subIndex}>
                                                            <td>
                                                                <span className="label"> {UPEX.lang.template('成交数量')}：</span>
                                                                {subItem.num}
                                                            </td>
                                                            <td>
                                                                <span className="label"> {UPEX.lang.template('成交价格')}：</span>
                                                                {subItem.price}
                                                            </td>
                                                            <td>
                                                                <span className="label"> {UPEX.lang.template('成交率')}：</span>
                                                                {subItem.rate}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan={3} className="none">{UPEX.lang.template('暂无成交信息')}</td>
                                                </tr>
                                            )}
                                            {item.details.length !== 0 ? (
                                                <tr>
                                                    <td colSpan={3} className="cancel">
                                                        <span>{UPEX.lang.template('撤单时间')}：{item._cancel.time || '--'}</span>
                                                        <span>{UPEX.lang.template('撤单数量')}：{item._cancel.num}</span>
                                                        <span>{UPEX.lang.template('撤单比例')}：{item._cancel.rate}</span>
                                                    </td>
                                                </tr>
                                            ) : null}
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <div className="order-main-box">
                <div className="order-header">
                    <h2>{UPEX.lang.template('委托历史')}</h2>
                    <div className="filter-box">
                        <ul>
                            <li>
                                <label>{UPEX.lang.template('时间')}</label>
                                <DatePicker onChange={this.onChangeStartTime.bind(this)} placeholder={UPEX.lang.template('选择日期')} allowClear={false} />
                                <i>-</i>
                                <DatePicker onChange={this.onChangeEndTime.bind(this)} placeholder={UPEX.lang.template('选择日期')} allowClear={false} />
                            </li>
                            <li>
                                <label>{UPEX.lang.template('币种')}</label>
                                <Select defaultValue="0" onChange={this.onChangeCurrency}>
                                    <Option value="0">{UPEX.lang.template('全部')}</Option>
                                    {this.props.commonStore.productList.map(item => {
                                        if (item.currencyNameEn !== 'TWD') {
                                            return (
                                                <Option value={item.currencyId} key={item.currencyId}>
                                                    {item.currencyNameEn}
                                                </Option>
                                            );
                                        }
                                    })}
                                </Select>
                            </li>
                            <li>
                                <label>{UPEX.lang.template('类型')}</label>
                                <Select defaultValue="0" onChange={this.onChangeBuyOrSell}>
                                    <Option value="0">{UPEX.lang.template('全部')}</Option>
                                    <Option value="1">{UPEX.lang.template('买')}</Option>
                                    <Option value="2">{UPEX.lang.template('卖')}</Option>
                                </Select>
                            </li>
                            <li>
                                <label>{UPEX.lang.template('状态')}</label>
                                <Select defaultValue="12" onChange={this.onChangeStatus}>
                                    <Option value="12">{UPEX.lang.template('全部')}</Option>
                                    <Option value="2">{UPEX.lang.template('全部成交')}</Option>
                                    <Option value="4">{UPEX.lang.template('全部撤单')}</Option>
                                    <Option value="5">{UPEX.lang.template('部分成交')}</Option>
                                </Select>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="order-table history-list-table">
                    <div className="table-hd">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="time">{UPEX.lang.template('时间')}</th>
                                    <th className="name">{UPEX.lang.template('币种')}</th>
                                    <th className="inorout">{UPEX.lang.template('买卖')}</th>
                                    <th className="num">{UPEX.lang.template('成交数量/委托数量')}</th>
                                    <th className="price">{UPEX.lang.template('委托价格')}</th>
                                    <th className="tradeprice">{UPEX.lang.template('成交均价')}</th>
                                    <th className="status">{UPEX.lang.template('状态')}</th>
                                    <th className="action">{UPEX.lang.template('操作')}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="table-bd">
                        {$content}
                        {store.isFetching ? <div className="mini-loading" /> : null}
                    </div>
                    <div className="table-ft">
                        {store.total > 0 && this.props.pagination ? (
                            <Pagination current={store.current} total={store.total} pageSize={store.pageSize} onChange={this.onChangePagination.bind(this)} />
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
