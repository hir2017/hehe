/**
 * 邀请返佣 － 我的返佣资产
 */
import React, {Component} from "react";
import {getInviteAssets} from '../../../api/http';
import {Pagination} from 'antd';

class BonusView extends Component {
    constructor(props) {
        super(props);

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
        getInviteAssets({
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
        let {list, isFetching, totalCount, currentPage, pageSize} = this.state;
        let $content, $footer;

        if (isFetching == 0 && list.length == 0) {
            $content = <div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无记录，快去邀请好友')}</div>
        } else {
            $content = (
                <ul className="list">
                    {
                        list.map((item, index) => {
                            return (
                                <li key={index}>
                                    <div className="name">
                                        <img src={`${item.icoUrl}`} alt=""/>
                                        <span className="symbol">{item.currencyNameEn || '--'}</span>
                                    </div>
                                    <div className="number">{item.amount}</div>
                                </li>
                            );
                        })
                    }
                </ul>
            );
        }

        if (list.length > 0 && totalCount > 0) {
            $footer = <Pagination current={currentPage} total={totalCount} pageSize={pageSize} simple defaultCurrent={1}
                                  onChange={this.onChangePagination.bind(this)}/>;
        }

        return (
            <div className="invite-bonus">
                <div className="bonus-hd">{UPEX.lang.template('我的返佣资产')}</div>
                <div className="bonus-bd">
                    <div className="table-hd">
                        <div className="name">{UPEX.lang.template('币种')}</div>
                        <div className="number">{UPEX.lang.template('数量')}</div>
                    </div>
                    <div className="table-bd">
                        {$content}
                    </div>
                    <div className="table-ft">
                        {$footer}
                    </div>
                    {isFetching == 1 ? <div className="mini-loading"></div> : null}
                </div>
            </div>
        );
    }
}

export default BonusView;
