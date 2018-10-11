/**
 * 邀请返佣 － 订单记录
 */
import React, {Component} from "react";
import {getInviteCommissionList, getInvitationList} from '../../../api/http';
import { Pagination } from 'antd';

class OrderView extends Component {
    constructor(props) {
        super(props);

        this.tabs = [
            {
                index: 0,
                path: 'brokerage',
                title: UPEX.lang.template('返佣记录')
            },
            {
                index: 1,
                path: 'invitee',
                title: UPEX.lang.template('邀请明细')
            }
        ];

        this.state = {
            selectedIndex: 0,
        }
    }

    handleClickTab = (index, e) => {
        this.setState({
            selectedIndex: index
        });
    }

    render() {
        let {selectedIndex} = this.state;

        return (
            <div className="invite-record">
                <div className="record-menu">
                    <ul>
                        {
                            this.tabs.map((item, index) => {
                                let cls = item.index == selectedIndex ? 'selected' : '';

                                return (
                                    <li className={cls} key={index} onClick={this.handleClickTab.bind(this, index)}>
                                        <h3>{item.title}</h3>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="record-main">
                    <div className={`record-panel ${selectedIndex == 0 ? 'selected' : 'hidden'}`}>
                        <BrokerageListView/>
                    </div>
                    <div className={`record-panel ${selectedIndex == 1 ? 'selected' : 'hidden'}`}>
                        <InviteeListView/>
                    </div>
                </div>
                <p className="tips">注：列表中只展示最近三个月的数据</p>
            </div>
        );
    }
}

class BrokerageListView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFetching: 1,
            list: [],
            totalCount: 0,
            currentPage: 1,
            pageSize: 8
        }
    }

    componentDidMount() {
        this.fetchData(1);
    }

    fetchData(page) {
        this.setState({
            isFetching: 1
        });
        getInviteCommissionList({
            size: this.state.pageSize,
            page: page
        }).then((data) => {
            if (data.status == 200) {
                let {list, count, page} = data.attachment;
                this.setState({
                    list: list,
                    totalCount: count,
                    currentPage: page,
                    isFetching: 0
                });
            }
        })
    }

    onChangePagination(page) {
        this.fetchData(page);
    }

    render() {
        let { list, isFetching , totalCount, currentPage, pageSize } = this.state;
        let $content, $footer;
        if (isFetching == 0 && list.length == 0) {
            $content = <div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无返佣记录，快去邀请好友')}</div>
        } else {
            $content = (
                <ul className="list">
                    {
                        list.map((item, index) => (
                            <li key={index}>
                                <div className="time">{item.createTime}</div>
                                <div className="name">{item.currencyNameEn}</div>
                                <div className="number">{item.number}</div>
                                <div className="user">{item.user}</div>
                                <div
                                    className="status">{item.status == 1 ? UPEX.lang.template('已结算') : UPEX.lang.template('未结算')}</div>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        if (list.length > 0 && totalCount > 0) {
            $footer = <Pagination current={currentPage} total={totalCount} pageSize={pageSize} simple defaultCurrent={1} onChange={this.onChangePagination.bind(this)} />;
        }
        return (
            <div className="record-rebate">
                <div className="rebate-bd">
                    <div className="table-hd">
                        <div className="time">{UPEX.lang.template('时间')}</div>
                        <div className="name">{UPEX.lang.template('币种')}</div>
                        <div className="number">{UPEX.lang.template('数量')}</div>
                        <div className="user">{UPEX.lang.template('用户（邀请用户）')}</div>
                        <div className="status">{UPEX.lang.template('结算状态')}</div>
                    </div>
                    <div className="table-bd">
                        {$content}
                    </div>
                    <div className="table-ft">
                        { $footer }
                    </div>
                    { isFetching == 1 ? <div className="mini-loading"></div> : null }
                </div>
            </div>
        )
    }
}

class InviteeListView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFetching: 1,
            list: [],
            totalCount: 0,
            currentPage: 1,
            pageSize: 8
        }
    }

    componentDidMount() {
        this.fetchData(1);
    }

    fetchData(page) {
        this.setState({
            isFetching: 1
        });
        getInvitationList({
            size: this.state.pageSize,
            page: page
        }).then((data) => {
            if (data.status == 200) {
                let {list, count, page} = data.attachment;
                this.setState({
                    list: list,
                    totalCount: count,
                    currentPage: page,
                    isFetching: 0
                });
            }
        })
    }

    onChangePagination(page) {
        this.fetchData(page);
    }


    render() {
        let { list, isFetching , totalCount, currentPage, pageSize } = this.state;
        let $content, $footer;
        if (isFetching == 0 && list.length == 0) {
            $content = <div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无邀请明细，快去邀请好友')}</div>
        } else {
            $content = (
                <ul className="list">
                    {
                        list.map((item, index) => (
                            <li key={index}>
                                <div className="time">{item.registerTime}</div>
                                <div className="user">{item.user}</div>
                                <div className="level">{item.invitedLevel}</div>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        if (list.length > 0 && totalCount > 0) {
            $footer = <Pagination current={currentPage} total={totalCount} pageSize={pageSize} simple defaultCurrent={1} onChange={this.onChangePagination.bind(this)} />;
        }
        return (
            <div className="record-detail">
                <div className="rebate-bd">
                    <div className="table-hd">
                        <div className="time">{UPEX.lang.template('时间')}</div>
                        <div className="user">{UPEX.lang.template('用户（邀请用户）')}</div>
                        <div className="level">{UPEX.lang.template('邀请等级')}</div>
                    </div>
                    <div className="table-bd">
                        {$content}
                    </div>
                    <div className="table-ft">
                        { $footer }
                    </div>
                    { isFetching == 1 ? <div className="mini-loading"></div> : null }
                </div>
            </div>
        )
    }
}

export default OrderView;
