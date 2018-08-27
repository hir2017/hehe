import React from 'react';
import Form from './header-form';
import { observer, inject } from 'mobx-react';
import { Pagination } from 'antd';
import List from '@/components/list';
import { getUserHistoryOrderList, getUserHistoryOrderDetail } from '@/api/http';
import NumberUtil from '@/lib/util/number';

const Detail = ({ row, data }) => {
    let $tbody = null;
    if (row.status === 5) {
        // 全部撤单
        $tbody = (
            <tbody>
                <tr>
                    <td>
                        <span className="label"> {UPEX.lang.template('撤单时间')}：</span>
                        {data.cancelTime}
                    </td>
                    <td>
                        <span className="label"> {UPEX.lang.template('撤单数量')}：</span>
                        {data.num}
                    </td>
                    <td>
                        <span className="label"> {UPEX.lang.template('撤单比例')}：</span>
                        {(parseFloat(num) * 100).toFixed(2)}%
                    </td>
                </tr>
            </tbody>
        );
    }
    return <table>{$tbody}</table>;
};

@inject('historyStore')
@observer
class View extends React.Component {
    constructor(props) {
        super(props);
        // TODO: loading
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
                title: UPEX.lang.template('成交均价'),
                className: 'tradeprice',
                dataIndex: 'averagePrice'
            },
            { title: UPEX.lang.template('委托价格'), className: 'price', dataIndex: 'price' },
            { title: UPEX.lang.template('委托数量'), className: 'num', dataIndex: 'num' },
            { title: UPEX.lang.template('成交数量'), className: 'trade-num', dataIndex: 'tradeNum' },
            { title: UPEX.lang.template('成交率'), className: 'rate', dataIndex: 'tradeRate' },
            {
                title: UPEX.lang.template('状态'),
                className: 'status',
                render: row => {
                    const maps = {
                        2: UPEX.lang.template('全部成交'),
                        4: UPEX.lang.template('全部撤单'),
                        5: UPEX.lang.template('部分成交后撤单')
                    };
                    return maps[row.status];
                }
            },
            {
                title: UPEX.lang.template('操作'),
                className: 'action',
                render: (row, col, index) => {
                    return <p onClick={this.toggleDetail.bind(this, row, col, index)}>{UPEX.lang.template('详情')}</p>;
                }
            }
        ];
        this.subRow = (data, rowData) => <Detail row={rowData} data={data} />;
        this.state = {
            data: [],
            total: 0,
            current: 1,
            pageSize: 10,
            detail: [],
            subIndex: 0,
            subShow: false,
            subLoading: false
        };
        this.params = {
            beginTime: '',
            endTime: '',
            status: '12',
            buyOrSell: '0',
            currencyId: '0',
            baseCurrencyId: '0',
            priceType: 0
        };
        this.parseItem = this.props.historyStore.getParseRowFn();
    }

    toggleDetail(row, col, rowIndex) {
        const { state } = this;
        // 1：成交，2：撤单 3: 部分成交撤单
        let typeMap = {
            '2': 1,
            '4': 2,
            '5': 3
        };
        this.setState({
            subIndex: rowIndex,
            subShow: true,
            subLoading: true
        });
        getUserHistoryOrderDetail({
            buyOrSell: row.buyOrSell,
            orderNo: row.orderNo,
            type: typeMap[row.status]
        }).then(res => {
            if (res.status == 200) {
                let { details = [] } = res.attachment;
                // null不严格等于undefined
                details = details === null ? [] : details;
                this.setState({
                    detail: details,
                    subLoading: false
                });
                return;
                if (item.status === 5) {
                    let temp = details.reduce(
                        (total, curr) => {
                            return {
                                num: NumberUtil.add(total.num, curr.num),
                                rate: NumberUtil.add(total.rate, curr.rate)
                            };
                        },
                        {
                            num: 0,
                            rate: 0
                        }
                    );
                    cancelInfo = {
                        num: item.num - temp.num,
                        rate: 1 - temp.rate
                    };
                }
            }
        });
    }

    onQuery(data) {
        for (const key in this.params) {
            this.params[key] = data[key] === '' ? this.params[key] : data[key];
        }
        this.getData();
    }

    componentDidMount() {
        this.getData();
    }

    onChangePagination(page) {
        this.setState({
            current: page
        });
        this.getData();
    }

    getData() {
        getUserHistoryOrderList({
            ...this.params,
            start: this.state.current,
            size: 10
        }).then(res => {
            let _state = {
                data: [],
                total: 0
            };
            if (res.status === 200) {
                let listData = res.attachment.list.map(this.parseItem);
                _state = {
                    data: listData,
                    total: res.attachment.total
                };
            } else {
                // TODO errorMsg
            }
            this.setState(_state);
        });
    }

    render() {
        const { state, lists } = this;
        const { subIndex, subShow, subLoading } = state;
        const detailData = {
            subData: state.detail,
            subIndex,
            subShow,
            subLoading
        };
        let $pagination =
            state.total > 0 ? (
                <Pagination current={state.current} total={state.total} pageSize={state.pageSize} onChange={this.onChangePagination.bind(this)} />
            ) : null;
        return (
            <div className="record-box">
                <Form onClick={this.onQuery.bind(this)} action="history" />
                <List dataSource={state.data} {...detailData} columns={lists} expandedRowRender={this.subRow} pagination={$pagination} />
            </div>
        );
    }
}

export default View;
