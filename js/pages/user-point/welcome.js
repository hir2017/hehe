/**
 * @fileoverview: 用户积分-落地页
 * @author: ShangJin
 * @date: 2019/1/8
 */

import '@/../css/user-point/index.less';
import React, {Component} from "react";
import UserPointInfo from './user';
import {observer, inject} from 'mobx-react';
import {getUserPointInfo} from "@/api/http";
import {browserHistory} from "react-router";

@inject('authStore', 'userInfoStore')
@observer
class PageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        if (!this.props.authStore.isLogin) {
            return;
        }
        getUserPointInfo().then((res) => {
            if (res.status == 200) {
                this.setState({
                    userInfo: res.attachment
                })
            }

        })
    }

    handleLogin = (e) => {
        browserHistory.push('/login');
    };

    handleKYC = (e) => {
        browserHistory.push('/user/authentication');
    };


    render() {
        let {userInfo} = this.state;
        let {authStore, userInfoStore} = this.props;
        let $content;

        if (!authStore.isLogin) {
            $content = <div className="no-login">
                {UPEX.lang.template('您尚未登录，请登录后使用AcePoint')}
                <button type="button" className="login-btn"
                        onClick={this.handleLogin}>{UPEX.lang.template('登录')}</button>
            </div>
        } else {
            if (userInfoStore.userInfo.authLevel == 0) {
                $content = [
                    <UserPointInfo data={userInfo} key="userinfo"/>,
                    <div className="no-kyc" key="kycinfo">
                        {UPEX.lang.template('您的积分需要通过身份认证后方可使用，点击跳转')}
                        <button type="button" className="kyc-btn"
                                onClick={this.handleKYC}>{UPEX.lang.template('身份认证')}</button>
                    </div>];
            } else {
                $content = <UserPointInfo data={userInfo}/>
            }

        }

        return (
            <div className="user-point welcome">
                {$content}
                BANNER
            </div>
        );

    }

}

export default PageView