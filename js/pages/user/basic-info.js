/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Info from '../../mods/basic-info/info';
import List from '../../mods/basic-info/logined-list';

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
            <div className="ace-page-content">
                <div className="content-title">{UPEX.lang.template('基本信息')}</div>
                <Info />
                <List />
            </div>
        );
    }
}

export default Information;
