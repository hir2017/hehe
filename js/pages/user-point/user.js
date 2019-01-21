/**
 * @fileoverview: 用户积分基础信息
 * @author: ShangJin
 * @date: 2019/1/8
 */

import React, {Component} from "react";
import {inject, observer} from 'mobx-react';
import NumberUtil from '@/lib/util/number';

@inject('userInfoStore')
@observer
export default class UserView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const {userInfoStore, data} = this.props;
        let username = '--';


        if (userInfoStore.userInfo) {
            username = userInfoStore.userInfo.phone || userInfoStore.userInfo.email || '--';
        }


        return (
            <div className="point-info clearfix">
                <div className="left-info">
                    <div className="level-box">
                        <p className="unit">LV</p>
                        <p className="level">{data.level}</p>
                    </div>
                    <div className="info-panel">
                        <p className="username">{username}</p>
                        <div className="other">
                            <span>{UPEX.lang.template('30日获得')}</span>
                            <span className="total">{NumberUtil.formatNumber(data.totalPoint, 0) || 0}</span>
                            <span>AP</span>
                            {data.levelModifyType == 0 ?
                                <span className="diff-point"
                                    dangerouslySetInnerHTML={{__html: UPEX.lang.template('距离下个级别还剩{num}AP', {num: NumberUtil.formatNumber(data.diffPoint) || 0}, 1)}}></span> : null}

                        </div>
                    </div>
                </div>
                <div className="right-info">
                    <p className="txt">{UPEX.lang.template('Ace Point余额')}</p>
                    <p>
                        <span className="value">{NumberUtil.formatNumber(data.availablePoint) || 0}</span>
                        <span>AP</span>
                    </p>
                </div>
            </div>
        );
    }
}