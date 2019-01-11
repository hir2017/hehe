/**
 * @fileoverview: 个人中心-用户积分主页
 * @author: ShangJin
 * @date: 2019/1/8
 */
import '@/../css/user-point/index.less';
import React, {Component} from "react";
import UserInfo from '../user';
import UserPointInfo from './user';
import {getUserPointInfo, getLevelFee, getPointConsumeList} from '../../api/http';
import {Pagination} from 'antd';

class PageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
    }

    componentDidMount() {
        this.fetchUserPoint();
    }

    fetchUserPoint() {
        getUserPointInfo().then((res) => {
            if (res.status == 200) {
                this.setState({
                    userInfo: res.attachment
                })
            }

        })

    }

    render() {
        let {userInfo} = this.state;

        return (
            <UserInfo pathname="userpoint">
                <div className="user-point home">
                    <div className="user-info block">
                        <div className="title">{UPEX.lang.template('我的Ace Point')}</div>
                        <div className="content">
                            <UserPointInfo data={userInfo}/>
                        </div>
                    </div>

                    <div className="discount-wrap clearfix">
                        <div className="discount off block">
                            <p>挂单手续费:{userInfo.makerFee}</p>
                            <p>吃单手续费:{userInfo.takerFee}</p>
                        </div>
                        <div className="discount more block">

                        </div>

                    </div>

                    <Fee/>
                    <Detail/>
                </div>
            </UserInfo>
        );

    }

}

class Fee extends Component {
    constructor() {
        super();
        this.state = {
            feeList: []

        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        getLevelFee().then(res => {
            if (res.status == 200) {
                this.setState({
                    feeList: res.attachment
                })
            }

        })
    }


    render() {
        const {feeList} = this.state;
        return (
            <div className="fee-wrap block">
                <div className="title">{UPEX.lang.template('手续费折扣')}</div>
                <div className="content">
                    <p className="fee-desc">{UPEX.lang.template('手续费折扣描述')}</p>
                    <table>
                        <tbody>
                        <tr>
                            <th>用户等级</th>
                            <th>30天获得AcePoint</th>
                            <th>掛單手續費折扣</th>
                            <th>吃單手續費折扣</th>
                        </tr>
                        {
                            feeList.length > 0 && feeList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.level}</td>
                                    <td>{item.lowLimitPoint}-{item.highLimitPoint}</td>
                                    <td>{item.sellFee}</td>
                                    <td>{item.buyFee}</td>
                                </tr>
                            ))

                        }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}

class Detail extends Component {
    constructor() {
        super();
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
        getPointConsumeList({
            start: page,
            size: this.state.pageSize
        }).then(res => {
            let {attachment, total, status} = res;
            if (status == 200) {
                this.setState({
                    list: attachment,
                    totalCount: total,
                    isFetching: 0
                })
            }

        }).catch(() => {
            this.setState({
                isFetching: 0
            })
        })

    }


    onChangePagination(page) {
        this.fetchData(page);
    }

    render() {
        let {list, isFetching, totalCount, currentPage, pageSize} = this.state;
        let $content, $footer;

        if (isFetching == 0 && list.length == 0) {
            $content = <div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无收支明细记录')}</div>
        } else {
            $content = (
                <ul className="list">
                    {
                        list.map((item, index) => {
                            return (
                                <li>
                                    <div className="time">{item.createTime}</div>
                                    <div className="change">{item.change}</div>
                                    <div className="remark">{item.remark}</div>
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
            <div className="point-detail">
                <h2>Ace Point 收支记录</h2>
                <div className="table-hd">
                    <div className="time">时间</div>
                    <div className="change">AP 变动</div>
                    <div className="remark">备注</div>
                </div>
                <ul className="table-bd">
                    {$content}
                </ul>
                <div className="table-ft">
                    {$footer}
                </div>
                {isFetching == 1 ? <div className="mini-loading"></div> : null}
            </div>
        );
    }
}

export default PageView