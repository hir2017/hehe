import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Pagination, Popconfirm, message } from 'antd';
import { cancelOrder } from '@/api/http';
import TimeUtil from '@/lib/util/date';
import toAction from './page-action';
import Filter from './head-filter';

@inject('commonStore', 'openStore', 'authStore')
@observer
class List extends Component {
    static defaultProps = {
        pagination: true // 是否分页， true分页，false不分页
    };

    constructor(props) {
        super(props);

        this.action = toAction(this.props.openStore, this.props.authStore);
        this.currentOrderNo = '';
        this.params = {
            beginTime: '',
            endTime: '',
            status: '0',
            buyOrSell: '',
            currencyId: '',
            baseCurrencyId: '',
            priceType: 0,
        };

        this.state= {
            cancelTotal: 0,
            completeNum: 0,
            percent: 0,
        }
    }

    componentDidMount() {
        this.action.getData({
            ...this.params,
            size: !this.props.pagination ? 20 : 10
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

    onChangePagination(page) {
        this.action.handleFilter('page', {
            page,
            ...this.params
        });
    }
    /**
     * 点击撤单，判断是否需要的填写资金密码
     */
    handleCancel = item => {
        this.action.cancelOrder(item.currencyId, item.orderNo);
    };

    onCancelAll() {
        // TODO 遍历当前页, 是否显示结果，错了怎么办
        const { orderList } = this.props.openStore;
        this.setState({
            cancelTotal: orderList.length,
            successNum: 0,
            percent: 0,
        });
        Promise.all(
            orderList.map(item =>
                cancelOrder({
                    fdPassword: '',
                    orderNo: item.orderNo,
                    source: 1
                })
            )
        ).then((...results) => {
            message.success(UPEX.lang.template('当前列表撤销成功'));
            this.onQuery({});
        });
    }
    render() {
        let store = this.props.openStore;
        let $content;

        if (!this.props.authStore.isLogin) {
            $content = <div className="mini-tip">{UPEX.lang.template('登录后可查看当前委托订单')}</div>;
        } else if (!store.isFetching && store.orderList.length == 0) {
            $content = <div className="mini-tip list-is-empty">{UPEX.lang.template('暂无当前委托订单')}</div>;
        } else {
            $content = (
                <ul className="list">
                    {store.orderList.map((item, index) => {
                        let status;
                        switch (item.status) {
                            case 0:
                                status = UPEX.lang.template('未成交');
                                break;
                            case 1:
                                status = UPEX.lang.template('部分成交');
                                break;
                        }

                        return (
                            <li key={index}>
                                <dl>
                                    <dd className="time">{item.orderTime}</dd>
                                    <dd className="name">
                                        {item.currencyNameEn} / {item.baseCurrencyNameEn}
                                    </dd>
                                    <dd className="buyorsell">
                                        {item.buyOrSell == 1 ? (
                                            <label className="greenrate">{UPEX.lang.template('买入')}</label>
                                        ) : (
                                            <label className="redrate">{UPEX.lang.template('卖出')}</label>
                                        )}
                                    </dd>
                                    <dd className="num">{`${item.tradeNum} / ${item.num}`}</dd>
                                    <dd className="price">{item.price}</dd>
                                    <dd className="rate">{item.tradeRate}</dd>
                                    <dd className="amount">{item.tradeAmount}</dd>
                                    <dd className="action">
                                        <span className="pr10">
                                            <button type="button" onClick={this.handleCancel.bind(this, item)}>
                                                {UPEX.lang.template('撤单')}
                                            </button>
                                        </span>
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
                <Filter onClick={this.onQuery.bind(this)} action="open" />
                <div className="order-table open-list-table">
                    <div className="table-hd">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="time">{UPEX.lang.template('时间')}</th>
                                    <th className="name">{UPEX.lang.template('币种')} / {UPEX.lang.template('市场')}</th>
                                    <th className="buyorsell">{UPEX.lang.template('买卖')}</th>
                                    <th className="num">{UPEX.lang.template('数量(成交/委托)')}</th>
                                    <th className="price">{UPEX.lang.template('委托价')}</th>
                                    <th className="rate">{UPEX.lang.template('成交率')}</th>
                                    <th className="amount">{UPEX.lang.template('成交金额')}</th>
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
                        {store.total > 0 && this.props.pagination ? (
                            <Popconfirm
                                placement="topRight"
                                overlayClassName="exc-top-popover"
                                title={UPEX.lang.template('是否撤销当前列表订单?')}
                                onConfirm={this.onCancelAll.bind(this)}
                                okText={UPEX.lang.template('确定')}
                                cancelText={UPEX.lang.template('取消')}
                            >
                                <div className="cancel-all">{UPEX.lang.template('撤销当前列表订单')}</div>
                            </Popconfirm>
                        ) : null}
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
