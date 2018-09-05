import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Info from './info';
import InfoAus from './info-aus';
import List from './logined-list';

import PageWrapper from '@/components/page-user/page-wrapper';

@inject('userInfoStore')
@observer
class Information extends Component {
    componentDidMount() {
        // 初始化个人中心数据
        const userInfo = this.props.userInfoStore.userInfo || {};
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        Object.keys(userInfo).length || this.props.userInfoStore.getUserInfo();
        gaBindSuccess || this.props.userInfoStore.isGoogleAuth();
    }

    render() {
        return (
            <PageWrapper innerClass="base-info" noPadding>
                { UPEX.config.version === 'ace' ?<Info /> : <InfoAus/>}
                <List />
            </PageWrapper>
        );
    }
}

export default Information;
