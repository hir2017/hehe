import React from 'react';
import { observer, inject } from 'mobx-react';
import Form from './header-form';
import List from '@/components/list';
import { getUserOpenOrderList } from '@/api/http';
import NumberUtil from '@/lib/util/number';

@inject('openStore')
@observer
class View extends React.Component {
    constructor(props) {
        super(props);

        this.lists = [
            { title: UPEX.lang.template('时间'), className: 'time', dataIndex: 'orderTime' },
            {
                title: `${UPEX.lang.template('币种')} / ${UPEX.lang.template('市场')}`,
                className: 'name',
                render: row => {
                    return `${row.currencyNameEn} / ${row.baseCurrencyNameEn}`;
                }
            },
            {
                title: UPEX.lang.template('买卖'),
                className: 'buyorsell',
                render: row => {
                    return row.buyOrSell == 1 ? (
                        <label className="greenrate">{UPEX.lang.template('买入')}</label>
                    ) : (
                        <label className="redrate">{UPEX.lang.template('卖出')}</label>
                    );
                }
            },
            {
                title: UPEX.lang.template('数量(成交/委托)'),
                className: 'num',
                render: row => {
                    return `${row.tradeNum}/${row.num}`;
                }
            },
            { title: UPEX.lang.template('委托价'), className: 'price', dataIndex: 'price' },
            { title: UPEX.lang.template('成交率'), className: 'rate', dataIndex: 'tradeRate' },
            { title: UPEX.lang.template('成交金额'), className: 'amount', dataIndex: 'tradeAmount' },
            { title: UPEX.lang.template('操作'), className: 'action', render: row => {
                return UPEX.lang.template('撤单');
            } }
        ];

        this.state = {
            data: [],
            total: 0,
            current: 1
        };

        this.params = {
            beginTime: '',
            endTime: '',
            status: '0',
            buyOrSell: '0',
            currencyId: '0',
            baseCurrencyId: '0',
            priceType: 0,
            pageSize: 10
        };
    }

    parseItem(item) {
        const {openStore} = this.props;
        let currencyObj = openStore.currencyStore.getCurrencyById(`${item.baseCurrencyId}-${item.currencyId}`);
        let pointNum = currencyObj.pointNum;
        let pointPrice = currencyObj.pointPrice;

        // 时间
        item.orderTime = item.orderTime;
        // 委托价格
        item.price = NumberUtil.formatNumber(item.price, pointPrice);
        // 成交金额
        item.tradeAmount = NumberUtil.formatNumber(item.tradeAmount || 0, pointPrice);
        // 成交价格
        item.tradePrice = NumberUtil.formatNumber(item.tradePrice, pointPrice);
        // 委托数量
        item.num = NumberUtil.formatNumber(item.num, pointNum);
        // 成交数量
        item.tradeNum = NumberUtil.formatNumber(item.tradeNum, pointNum);
        // 成交率
        item.tradeRate = item.tradeRate || 0;
        item.tradeRate = NumberUtil.formatNumber(item.tradeRate * 100, 2) + '%';

        return item;
    }

    componentDidMount() {
        this.getData();
    }

    onChangePagination() {}

    getData() {
        getUserOpenOrderList({
            ...this.params,
            start: this.state.current
        }).then(res => {
            let _state = {
                data: [],
                total: 0
            };
            if (res.status === 200) {
                _state = {
                    data: res.attachment.list.map(this.parseItem.bind(this)),
                    total: res.total
                };
            } else {
                // TODO errorMsg
            }
            this.setState(_state);
        });
    }

    onQuery(data) {
        for (const key in this.params) {
            this.params[key] = data[key] === '' ? this.params[key] : data[key];
        }
        this.getData();
    }

    render() {
        const { state, lists } = this;
        return (
            <div className="record-box">
                <Form onClick={this.onQuery.bind(this)} action="open" />
                <List dataSource={state.data} columns={lists} />
                {state.total > 0 ? (
                    <Pagination current={state.current} total={state.total} pageSize={state.pageSize} onChange={this.onChangePagination.bind(this)} />
                ) : null}
            </div>
        );
    }
}

export default View;
