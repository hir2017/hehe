import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, DatePicker, Pagination } from 'antd';

const { RangePicker } = DatePicker;

const Option = Select.Option;
import toAction from './record-action';

@inject('commonStore', 'successStore', 'authStore')
@observer
class List extends Component {
    static defaultProps = {
        pagination: true // 是否分页， true分页，false不分页
    };

    constructor(props) {
        super(props);

        this.action = toAction(this.props.successStore, this.props.authStore);
    }

    componentDidMount() {
        if (!this.props.pagination) {
            this.action.getData({
                size: 100
            });
        } else {
            this.action.getData({
                size: 10
            });
        }
    }

    componentWillUnmount() {
        this.action.handleFilter('dateArr', ['', '']);
    }

    onChangePagination(page) {
        this.action.handleFilter('page', {
            page
        });
    }

    onChangeDate(dates, dateStrs) {
        const [beginTime, endTime] = dateStrs;
        this.action.handleFilter('dateArr', dateStrs);
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

    render() {
        let store = this.props.successStore;
        let $content;

        if (!this.props.authStore.isLogin) {
            $content = <div className="mini-tip">{UPEX.lang.template('登录后可查看已完成订单')}</div>;
        } else if (!store.isFetching && store.orderList.length == 0) {
            $content = <div className="mini-tip">{UPEX.lang.template('暂无数据')}</div>;
        } else {
            $content = (
                <ul className="list">
                    {store.orderList.map((item, index) => {
                        return (
                            <li key={index}>
                                <dl>
                                    <dd className="time">{item.orderTime}</dd>
                                    <dd className="name">{item.currencyNameEn}</dd>
                                    <dd className="buyorsell">
                                        {item.buyOrSell == 1 ? (
                                            <label className="greenrate">{UPEX.lang.template('买入')}</label>
                                        ) : (
                                            <label className="redrate">{UPEX.lang.template('卖出')}</label>
                                        )}
                                    </dd>
                                    <dd className="tradeprice">{item.tradePrice}</dd>
                                    <dd className="num">{item.tradeNum}</dd>
                                    <dd className="fee">{item.fee}</dd>
                                    <dd className="amount">
                                        <span className="pr10">{item.tradeAmount}</span>
                                    </dd>
                                </dl>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <div className="order-main-box">
                <div className="order-header">
                    <div className="filter-box">
                        <ul>
                            <li>
                                {store.params.beginTime ? null : (
                                    <div className="ie11-hack">
                                        <span className="placeholder">{UPEX.lang.template('选择日期')}</span>
                                        <span className="placeholder">{UPEX.lang.template('选择日期')}</span>
                                    </div>
                                )}
                                <RangePicker
                                    size="large"
                                    onChange={this.onChangeDate.bind(this)}
                                    placeholder={['', '']}
                                    allowClear={false}
                                />
                            </li>
                            <li>
                                <label>{UPEX.lang.template('币种')}</label>
                                <Select size="large" defaultValue="0" onChange={this.onChangeCurrency}>
                                    <Option value="0">{UPEX.lang.template('全部')}</Option>
                                    {this.props.commonStore.productList.map(item => {
                                        if (item.currencyNameEn !== UPEX.config.baseCurrencyEn) {
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
                                <Select size="large" defaultValue="0" onChange={this.onChangeBuyOrSell}>
                                    <Option value="0">{UPEX.lang.template('全部')}</Option>
                                    <Option value="1">{UPEX.lang.template('买')}</Option>
                                    <Option value="2">{UPEX.lang.template('卖')}</Option>
                                </Select>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="order-table success-list-table">
                    <div className="table-hd">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="time">{UPEX.lang.template('时间')}</th>
                                    <th className="name">{UPEX.lang.template('币种')}</th>
                                    <th className="buyorsell">{UPEX.lang.template('买卖')}</th>
                                    <th className="tradeprice">{UPEX.lang.template('成交均价')}</th>
                                    <th className="num">{UPEX.lang.template('成交数量')}</th>
                                    <th className="fee">{UPEX.lang.template('手续费')}</th>
                                    <th className="amount pr10">{UPEX.lang.template('成交金额')}</th>
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
