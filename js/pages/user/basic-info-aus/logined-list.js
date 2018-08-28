import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TimeUtil from '@/lib/util/date';

import AceSection from '@/components/page-user/section';


class LoginListView extends Component {
    render() {
        const {dataSource} = this.props
        return (
            <ul>
                {dataSource.map((item, index) => {
                    return (
                        <li key={index}>
                            <dl>
                                <dd className="time">{TimeUtil.formatDate(item.timeStamp)}</dd>
                                <dd>{item.host}</dd>
                                <dd className="location">{item.location}</dd>
                            </dl>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

@inject('userInfoStore')
@observer
export default class List extends Component {
    componentWillMount() {
        this.props.userInfoStore.getLoginRecord();
    }

    render() {
        const loginRecord = this.props.userInfoStore.loginRecord || [];
        let $content;
        if (loginRecord.length == 0) {
            $content = <div className="mini-tip">{UPEX.lang.template('暂无数据')}</div>;
        } else {
            $content = <LoginListView dataSource={loginRecord}/>;
        }
        return (
            <AceSection title={UPEX.lang.template('最近登录信息')} className="list">
                <div className="account-result-list login-log">
                    <div className="table-hd">
                        <ul>
                            <li>
                                <dl>
                                    <dd className="time">{UPEX.lang.template('时间')}</dd>
                                    <dd>{UPEX.lang.template('IP')}</dd>
                                    <dd className="location">{UPEX.lang.template('所在地')}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div className="table-bd">
                        {$content}
                    </div>
                </div>
            </AceSection>
        );
    }
}
