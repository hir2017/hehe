import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Pagination } from 'antd';
import TimeUtil from '@/lib/util/date';
import toAction from './page-action';
import Filter from './head-filter';

@inject('commonStore', 'successStore', 'authStore')
@observer
class List extends Component {
    static defaultProps = {
        pagination: true // 是否分页， true分页，false不分页
    };

    constructor(props) {
        super(props);

        this.action = toAction(this.props.successStore, this.props.authStore);
        this.params = {
            beginTime: '',
            endTime: '',
            status: '0',
            buyOrSell: '0',
            currencyId: '0',
            baseCurrencyId: '0',
            priceType: 0,
        };
    }

    componentDidMount() {
        this.action.getData({
            ...this.params,
            size: !this.props.pagination ? 20 : 10
        });
    }

    componentWillUnmount() {
        this.action.handleFilter('dateArr', ['', '']);
    }

    onChangePagination(page) {
        this.action.handleFilter('page', {
            page,
            ...this.params
        });
    }

    onQuery(data) {
        for (const key in this.params) {
            this.params[key] = data[key] === '' ? this.params[key] : data[key];
        }
        this.action.getData({
            ...this.params,
            size: !this.props.pagination ? 20 : 10
        });
    }

    render() {
        let store = this.props.successStore;
        let $content;

        if (!this.props.authStore.isLogin) {
            $content = <div className="mini-tip">{UPEX.lang.template('登录后可查看已完成订单')}</div>;
        } else if (!store.isFetching && store.orderList.length == 0) {
            $content = <div className="mini-tip list-is-empty">{UPEX.lang.template('暂无数据')}</div>;
        } else {
            $content = (
                <ul className="list">
                    {store.orderList.map((item, index) => {
                        return (
                            <li key={index}>
                                <dl>
                                    <dd className="time">{item.orderTime}</dd>
                                    <dd className="name">{item.currencyNameEn} / {item.baseCurrencyNameEn}</dd>
                                    <dd className="buyorsell">
                                        {item.buyOrSell == 1 ? (
                                            <label className="greenrate">{UPEX.lang.template('买入')}</label>
                                        ) : (
                                            <label className="redrate">{UPEX.lang.template('卖出')}</label>
                                        )}
                                    </dd>
                                    <dd className="tradeprice">{item.tradePrice}</dd>
                                    <dd className="num">{item.tradeNum}</dd>
                                    <dd className="fee">{item.fee} {item.buyOrSell == 1 ? item.currencyNameEn : item.baseCurrencyNameEn}</dd>
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
                <Filter onClick={this.onQuery.bind(this)} action="success"/>
                <div className="order-table success-list-table">
                    <div className="table-hd">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="time">{UPEX.lang.template('时间')}</th>
                                    <th className="name">{UPEX.lang.template('币种/市场')}</th>
                                    <th className="buyorsell">{UPEX.lang.template('买卖')}</th>
                                    <th className="tradeprice">{UPEX.lang.template('成交价')}</th>
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
