/**
 * @fileoverview 页头
 * @author 陈立英
 * @date 2018-04-26
 * 订单明细：
 * 当前委托
 * 委托历史
 * 已成交订单
 * 我的资产
 * 充值&提现
 * 充值记录
 * 提现记录
 * 个人信息
 * 安全设置
 * FAQ
 * 推出
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {observer, inject} from 'mobx-react';
import {Popover, message, Icon} from 'antd';
import LanguageSwitchView from './language';
import ThemeSwitchView from './theme';
import {browserHistory} from 'react-router';
import Gtag from '@/lib/ga-analytics';

@inject('authStore', 'commonStore', 'userInfoStore', 'tradeStore')
@observer
class HeaderView extends Component {
    componentDidMount() {
        if (this.props.authStore.isLogin) {
            this.props.userInfoStore.getUserInfo();
        }
    }

    logout = (e) => {
        this.props.authStore.logout().then((data) => {
            if (data.status == 200) {
                browserHistory.push('/home');
            }
        });
    }

    gaTagTigger(path) {
        // 谷歌埋点
        Gtag.click(`header${path}`);
    }

    render() {
        let {authStore, userInfoStore, commonStore, tradeStore} = this.props;
        let username = '--';

        const usermenu = (
            <dl className="menu-list header-menu">
                <dd className="logined-header">
                    <Link className="logined-header-link" to="/user">{UPEX.lang.template('个人中心')}</Link>
                </dd>
                <dd className="logined-header">
                    <Link className="logined-header-link" to="/account">{UPEX.lang.template('资产管理')}</Link>
                </dd>
                <dd className="logined-header">
                    <Link className="logined-header-link" to="/account/record">{UPEX.lang.template('订单中心')}</Link>
                </dd>
                <dd className="logined-header" onClick={this.logout}>
                    {UPEX.lang.template('退出登录')}
                </dd>
            </dl>
        );

        if (userInfoStore.userInfo) {
            username = userInfoStore.userInfo.phone || userInfoStore.userInfo.email || '--';
        }


        return (
            <div className="app-header" id="J_AppHeader">
                <div className="header-box clearfix">
                    <h1 className="logo">
                        <Link to="/">
                            <img src={commonStore.isTradeCenter ? UPEX.config.logoprourl : UPEX.config.logourl}/>
                        </Link>
                    </h1>
                    <div className="header-box-l">
                        <ul>
                            <li className="trade">
                                <Link to="/webtrade">{UPEX.lang.template('行情中心')}</Link>
                            </li>
                            <li className="news">
                                <Link to="/news">{UPEX.lang.template('公告中心')}</Link>
                            </li>
                            {
                                UPEX.config.version == 'ace' ? (
                                    <li className="ieo">
                                        <Link to="/ieo">{UPEX.lang.template('Launcher')}</Link>
                                    </li>) : null
                            }
                        </ul>
                    </div>
                    <div className="header-box-r">
                        <ThemeSwitchView/>
                        {
                            authStore.isLogin ? (
                                <ul>
                                    <li ref="userinfo">
                                        <Popover content={usermenu} placement="bottomRight"
                                                 getPopupContainer={() => this.refs.userinfo}
                                                 overlayClassName={tradeStore.theme == 'dark' ? "widget-tooltip dark" : "widget-tooltip"}>
                                            <Link to="/user">
                                                <span
                                                    className="usertxt">{UPEX.lang.template('欢迎您，{name}', {name: username})}</span>
                                                <Icon type="down" style={{fontSize: 12, color: '#ebeff5'}}/>
                                            </Link>
                                        </Popover>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="login-register">
                                    <li className="login">
                                        <Link onClick={e => {
                                            this.gaTagTigger('Login')
                                        }} to={{
                                            pathname: '/login',
                                            state: {step: 'login'}
                                        }}>{UPEX.lang.template('登录')}</Link>
                                    </li>
                                    <li className="split">|</li>
                                    <li className="register">
                                        <Link onClick={e => {
                                            this.gaTagTigger('Register')
                                        }} to="/register">{UPEX.lang.template('注册')}</Link>
                                    </li>
                                </ul>
                            )
                        }
                        <ul className="help-language">
                            <li className="split">|</li>
                            <li className="help">
                                <a target="_blank"
                                   href={UPEX.lang.template("帮助中心网站链接")}>{UPEX.lang.template('帮助中心')}</a>
                            </li>
                            <li className="split">|</li>
                            <li ref="lang" className="language">
                                <LanguageSwitchView root={() => this.refs.lang}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderView;

