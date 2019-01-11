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

@inject('authStore')
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
    }


    render() {
        let {userInfo} = this.state;
        let {authStore} = this.props;
        let $content;

        if (!authStore.isLogin) {
            $content = <div className="no-login">
                您尚未登录，请登录后使用AcePoint
                <button type="button" className="login-btn"
                        onClick={this.handleLogin}>{UPEX.lang.template('登录')}</button>
            </div>
        } else {
            $content = <UserPointInfo data={userInfo}/>
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