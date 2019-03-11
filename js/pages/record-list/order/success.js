import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Pagination } from 'antd';
import TimeUtil from '@/lib/util/date';
import toAction from './page-action';
import Filter from './head-filter';
import LocaleProvider from '@/components/locale-provider';

@inject('commonStore', 'successStore', 'authStore')
@observer
class List extends Component {
    static defaultProps = {
        from: '',
        pageSize: 20
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
        this.isAus = UPEX.config.version === 'infinitex';
    }

    componentDidMount() {
        this.action.getData({
            ...this.params,
            size: this.props.from == 'tradecenter' ? this.props.pageSize : 10
        });
    }

    componentWillUnmount() {
        this.action.handleFilter('dateArr', ['', ''], true);
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
            size: this.props.from == 'tradecenter' ? this.props.pageSize : 10,
            start: 1
        });
    }

    handleMore=(e)=>{
        browserHistory.push('/account/record/success');
    }

    render() {
        let store = this.props.successStore;
        let $content, $footer;

        if (!this.props.authStore.isLogin) {
            $content = <div className="mini-tip exc-list-empty">{UPEX.lang.template('登录后可查看已完成订单')}</div>;
        } else if (!store.isFetching && store.orderList.length == 0) {
            $content = <div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无数据')}</div>;
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
                                    {
                                        this.isAus ? (
                                            <dd className="fee-save">
                                                {item.feeSave} {item.buyOrSell == 1 ? item.currencyNameEn : item.baseCurrencyNameEn}
                                            </dd>
                                        ) : null
                                    }
                                    <dd className="amount">
                                        <span className="pr10">{item.tradeAmount}</span>
                                    </dd>
                                </dl>
                            </li>
                        );
                    })}
                    {this.props.from == 'tradecenter' && store.total >= this.props.pageSize ? <li className="more-tip"><button onClick={this.handleMore} dangerouslySetInnerHTML={{__html: UPEX.lang.template('更多订单前往{page}查看', { page: UPEX.lang.template('订单中心')}, 1)}}/></li> : null }
                </ul>
            );
        }

        if (this.props.from !== 'tradecenter' && store.total > 0) {
            $footer = <LocaleProvider><Pagination current={store.current} total={store.total} pageSize={store.pageSize} onChange={this.onChangePagination.bind(this)} /></LocaleProvider>;
        }
        return (
            <div className="order-main-box">
                <Filter onClick={this.onQuery.bind(this)} action="success"/>
                <div className={`order-table success-list-table ${this.isAus ? 'fee-discount' : ''} `}>
                    <div className="table-hd">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="time">{UPEX.lang.template('时间')}</th>
                                    <th className="name">{UPEX.lang.template('币种')} / {UPEX.lang.template('市场')}</th>
                                    <th className="buyorsell">{UPEX.lang.template('买卖')}</th>
                                    <th className="tradeprice">{UPEX.lang.template('成交价格')}</th>
                                    <th className="num">{UPEX.lang.template('成交数量')}</th>
                                    <th className="fee">{UPEX.lang.template('手续费')}</th>
                                    {
                                        this.isAus ? (
                                            <th className="fee-save">{UPEX.lang.template('抵扣手续费')}</th>
                                        ) : null
                                    }
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
                        {$footer}
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
