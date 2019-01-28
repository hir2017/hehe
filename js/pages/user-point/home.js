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
import TimeUtil from '@/lib/util/date';
import NumberUtil from '@/lib/util/number';

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
        let makerFee = userInfo.makerFee && NumberUtil.formatNumber(userInfo.makerFee * 100, 2);
        let takerFee = userInfo.takerFee && NumberUtil.formatNumber(userInfo.takerFee * 100, 2);
        //let addCls = (userInfo.makerFee == 0) && (userInfo.takerFee == 0) ? 'full' : ' ';
        let addCls = 'full';

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
                        {/*{*/}
                            {/*(userInfo.makerFee == 0) && (userInfo.takerFee == 0) ? null : (*/}
                                {/*<ul className="discount off block">*/}
                                    {/*<li className="txt">{UPEX.lang.template('当前等级享')}</li>*/}
                                    {/*<li className="info">*/}
                                        {/*<p className="fee">*/}
                                            {/*<label>{UPEX.lang.template('挂单手续费')}</label>*/}
                                            {/*{*/}
                                                {/*userInfo.makerFee >= 1 ? UPEX.lang.template('免费') : `${makerFee || '--'}% off`*/}
                                            {/*}*/}
                                        {/*</p>*/}
                                        {/*<p className="fee">*/}
                                            {/*<label>{UPEX.lang.template('吃单手续费')}</label>*/}
                                            {/*{*/}
                                                {/*userInfo.takerFee >= 1 ? UPEX.lang.template('免费') : `${takerFee || '--'}% off`*/}
                                            {/*}*/}
                                        {/*</p>*/}
                                    {/*</li>*/}
                                {/*</ul>*/}
                            {/*)*/}
                        {/*}*/}

                        <ul className={`discount more block ${addCls}`}>
                            {UPEX.lang.template('更多等级特权在开发中...')}
                        </ul>

                    </div>

                    {/*<Fee/>*/}
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
                //不管后端返回的数据有几条，只展示前十条等级对应的手续费信息
                this.setState({
                    feeList: this.formatData(res.attachment.slice(0, 10))
                })
            }

        })
    }

    formatData(data) {
        data.map((item, index) => {
            item._bottomPoint = NumberUtil.formatNumber(item.bottomPoint, 0);
            item._topPoint = NumberUtil.formatNumber(item.topPoint, 0);
            item._makerFee = item.makerFee >= 1 ? UPEX.lang.template('免费') : NumberUtil.formatNumber(item.makerFee * 100, 2) + '%';
            item._takerFee = item.takerFee >= 1 ? UPEX.lang.template('免费') : NumberUtil.formatNumber(item.takerFee * 100, 2) + '%';
        });
        return data;
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
                            <th>{UPEX.lang.template('用户等级')}</th>
                            <th>{UPEX.lang.template('30天获得AcePoint')}</th>
                            <th>{UPEX.lang.template('挂单手续费折扣(off)')}</th>
                            <th>{UPEX.lang.template('吃单手续费折扣(off)')}</th>
                        </tr>
                        {
                            feeList.length > 0 && feeList.map((item, index) => (
                                <tr key={index}>
                                    <td className="level">Lv.{item.level}</td>
                                    {
                                        index == feeList.length - 1 ? (<td>>={item._bottomPoint}</td>) :
                                            <td>{item._bottomPoint}-{item._topPoint}</td>
                                    }
                                    <td>{item._makerFee}</td>
                                    <td>{item._takerFee}</td>
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
        };
        this.remarkMap = {
            0: UPEX.lang.template('成长值增加结算')
        }
    }

    componentDidMount() {
        this.fetchData(1);
    }

    fetchData(page) {
        getPointConsumeList({
            page: page,
            size: this.state.pageSize
        }).then(res => {
            let {attachment, status} = res;
            if (status == 200) {
                this.setState({
                    list: this.formatData(attachment.list),
                    totalCount: attachment.count,
                    currentPage: page,
                    isFetching: 0
                })
            } else {
                this.setState({
                    isFetching: 0
                })
            }

        }).catch(() => {
            this.setState({
                isFetching: 0
            })
        })

    }

    formatData(data) {
        data.map((item, index) => {
            item._createTime = TimeUtil.formatDate(item.createTime * 1000);
            item.affix = item.flag == 1 ? '+' : '-';
            item.remark = this.remarkMap[item.type];
        });
        return data;
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
                                <li key={index}>
                                    <div className="time">{item._createTime}</div>
                                    <div className="change">{item.affix}{item.points}</div>
                                    <div className="remark">{item.remark}</div>
                                </li>
                            );
                        })
                    }
                </ul>
            );
        }

        if (list.length > 0 && totalCount > 0) {
            $footer = <Pagination current={currentPage} total={totalCount} pageSize={pageSize}
                                  onChange={this.onChangePagination.bind(this)}/>;
        }

        return (
            <div className="point-detail block">
                <div className="title">{UPEX.lang.template('Ace Point 收支记录')}</div>
                <div className="content">
                    <div className="table-hd">
                        <li>
                            <div className="time">{UPEX.lang.template('时间')}</div>
                            <div className="change">{UPEX.lang.template('AP 变动')}</div>
                            <div className="remark">{UPEX.lang.template('备注')}</div>
                        </li>
                    </div>
                    <ul className="table-bd">
                        {$content}
                    </ul>
                    <div className="table-ft">
                        {$footer}
                    </div>
                    {isFetching == 1 ? <div className="mini-loading"></div> : null}
                </div>
            </div>
        );
    }
}

export default PageView