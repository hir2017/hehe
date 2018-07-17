import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, DatePicker, Pagination } from 'antd';
const Option = Select.Option;
const { RangePicker } = DatePicker;
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

        this.state = {
            displayIndex: -1
        }
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

    onChangeDate(dates, dateStrs) {
        this.action.handleFilter('dateArr', dateStrs);
    }

    onChangeTime=(value)=>{
        console.log(value);
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
        if (item.orderNo == this.state.displayIndex) {
            this.setState({
                displayIndex: -1
            });
        } else {
            this.setState({
                displayIndex: item.orderNo
            });

            this.props.historyStore.getDetail(index, item);
        }
    }

    transVal(val, field) {
        // 0. 未成交 1. 部分成交 2. 全部成交 3. 委托失败 4. 全部撤单 5. 部分成交后撤单
        // 委托历史只包含： 2、4、5
        const maps = {
            2: UPEX.lang.template('全部成交'),
            4: UPEX.lang.template('全部撤单'),
            5: UPEX.lang.template('部分成交后撤单')
        };
        return maps[val] || '--';
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
                        let $detail;

                        if (item.detailReady) {
                            if (item.details.length > 0 ) {
                                $detail = [];
                                $detail = item.details.map((subItem, subIndex) => {
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
                                                {parseFloat(subItem.rate) * 100}%
                                            </td>
                                        </tr>
                                    );
                                })
                                if(item.status === 5) {
                                    $detail[$detail.length] = (
                                        <tr className="data" key={$detail.length}>
                                            <td>
                                                <span className="label"> {UPEX.lang.template('撤单时间')}：</span>
                                                {item._detailInfo ? item._detailInfo.cancelTime : '--'}
                                            </td>
                                            <td>
                                                <span className="label"> {UPEX.lang.template('撤单数量')}：</span>
                                                {item._cancel.num}
                                            </td>
                                            <td>
                                                <span className="label"> {UPEX.lang.template('撤单比例')}：</span>
                                                {parseFloat(item._cancel.rate) * 100}%
                                            </td>
                                        </tr>
                                    )
                                }

                            } else {
                                if(item.status === 4) {
                                    $detail = (
                                        <tr>
                                            <td colSpan={3} className="none">{UPEX.lang.template('撤单时间')}：{item._detailInfo ? item._detailInfo.cancelTime : '--'}</td>
                                        </tr>
                                    )
                                } else {
                                    $detail = (
                                        <tr>
                                            <td colSpan={3} className="none">{UPEX.lang.template('暂无数据')}</td>
                                        </tr>
                                    )
                                }

                            }
                        } else {
                            $detail = (
                                <tr>
                                    <td colSpan={3} className="none"><div className="mini-loading"></div></td>
                                </tr>
                            )
                        }
                        return (
                            <li key={index} className={item.orderNo === this.state.displayIndex ? 'collapse-content-active' : ''}>
                                <dl>
                                    <dd className="time">{item.orderTime}</dd>
                                    <dd className="name">{item.currencyNameEn}</dd>
                                    <dd className="buyorsell">
                                        {
                                            item.buyOrSell == 1 ? (
                                                <label className="greenrate">{UPEX.lang.template('买入')}</label>
                                            ) : (
                                                <label className="redrate">{UPEX.lang.template('卖出')}</label>
                                            )
                                        }
                                    </dd>
                                    <dd className="tradeprice">{item.averagePrice}</dd>
                                    <dd className="price">{item.price}</dd>
                                    <dd className="num">{item.num}</dd>
                                    <dd className="status">{this.transVal(item.status)}</dd>
                                    <dd className="action pr10">
                                        <button type="button" onClick={this.triggerShowDetail.bind(this, index, item)}>{UPEX.lang.template('详情')}</button>
                                    </dd>
                                </dl>
                                <div className="detail-content">
                                    <table>
                                        <tbody>
                                            {$detail}
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
                    <div className="filter-box">
                        <ul>
                            <li>
                                <RangePicker  size="large" onChange={this.onChangeDate.bind(this)} placeholder={[UPEX.lang.template('选择日期'), UPEX.lang.template('选择日期')]} allowClear={false}/>

                            </li>
                            <li>
                                <label>{UPEX.lang.template('币种')}</label>
                                <Select size="large" defaultValue="0" onChange={this.onChangeCurrency}>
                                    <Option value="0">{UPEX.lang.template('全部')}</Option>
                                    {
                                        this.props.commonStore.productList.map(item => {
                                            if (item.currencyNameEn !== UPEX.config.baseCurrencyEn) {
                                                return (
                                                    <Option value={item.currencyId} key={item.currencyId}>
                                                        {item.currencyNameEn}
                                                    </Option>
                                                );
                                            }
                                        })
                                    }
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
                            <li>
                                <label>{UPEX.lang.template('状态')}</label>
                                <Select size="large" defaultValue="12" onChange={this.onChangeStatus}>
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
                                    <th className="buyorsell">{UPEX.lang.template('买卖')}</th>
                                    <th className="tradeprice">{UPEX.lang.template('成交均价')}</th>
                                    <th className="price">{UPEX.lang.template('委托价格')}</th>
                                    <th className="num">{UPEX.lang.template('委托数量')}</th>
                                    <th className="status">{UPEX.lang.template('状态')}</th>
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
                            <Pagination current={store.current} total={store.total} pageSize={store.pageSize} onChange={this.onChangePagination.bind(this)} />
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
