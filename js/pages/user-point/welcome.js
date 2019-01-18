/**
 * @fileoverview: 用户积分-落地页
 * @author: ShangJin
 * @date: 2019/1/8
 */

import '@/../css/user-point/index.less';
import React, {Component} from "react";
import {observer, inject} from 'mobx-react';
import {getUserPointInfo} from "@/api/http";
import {browserHistory} from "react-router";

@inject('authStore')
@observer
class PageView extends Component {
    constructor(props) {
        super(props);
    }

    handleLogin = (e) => {
        browserHistory.push('/login');
    };

    handlePoint = (e) => {
        browserHistory.push('/user-point/home');
    };

    render() {

        let {authStore} = this.props;
        let $btn;

        if (!authStore.isLogin) {
            $btn = <button type="button" className="login-btn"
                           onClick={this.handleLogin}>{UPEX.lang.template('登录')}</button>

        } else {
            $btn = <button type="button" className="login-btn"
                           onClick={this.handlePoint}>{UPEX.lang.template('查看我的ACE Point')}</button>

        }

        return (
            <div className="user-point welcome">
                <div className="content">
                    <div className="desc-wrap">
                        <div className="desc right">
                            <div className="title">{UPEX.lang.template('什么是ACE Point')}</div>
                            <div className="txt"
                                 dangerouslySetInnerHTML={{__html: UPEX.lang.template('什么是ACE Point内容')}}></div>
                        </div>
                        <div className="desc left">
                            <div className="title">{UPEX.lang.template('有了ACE Point之后')}</div>
                            <div className="txt"
                                 dangerouslySetInnerHTML={{__html: UPEX.lang.template('有了ACE Point之后内容')}}></div>
                        </div>
                    </div>
                    <div className="detail-wrap">
                        <div className="title">{UPEX.lang.template('如何获得ACE Point')}</div>
                        <div className="detail-txt">{UPEX.lang.template('如何获得ACE Point内容')}</div>
                        <ul>
                            <li className="way">{UPEX.lang.template('进行有手续费的交易活动')}</li>
                            <li className="way">{UPEX.lang.template('每日登入 ACE')}</li>
                            <li className="way">{UPEX.lang.template('完成新手任务')}</li>
                            <li className="way">{UPEX.lang.template('邀请朋友注册ACE')}</li>
                        </ul>
                        <ul>
                            <li className="way">{UPEX.lang.template('问题回报')}</li>
                            <li className="way">{UPEX.lang.template('参加交易所活动')}</li>
                            <li className="way">{UPEX.lang.template('数位资产购买')}</li>
                            <li className="way">{UPEX.lang.template('其他神秘挑战')}</li>
                        </ul>

                    </div>
                </div>
                <div className="footer">
                    <p className="greet">{UPEX.lang.template('底部欢迎语1')}</p>
                    <p>{UPEX.lang.template('底部欢迎语2')}</p>
                    {$btn}
                </div>
            </div>
        );

    }

}

export default PageView