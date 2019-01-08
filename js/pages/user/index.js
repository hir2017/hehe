/**
 * @fileoverview  用户个人信息
 * @author 陈立英
 * @date 2018-05-19
 */
import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import {observer, inject} from 'mobx-react';
import {Breadcrumb, message} from 'antd';

@inject('userInfoStore', 'authStore')
@observer
class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: true
        };
        let navData = [
            {
                key: 'baseinfo',
                title: UPEX.lang.template('个人信息'),
                subItems: [
                    {
                        active: 'user',
                        route: '/user',
                        text: UPEX.lang.template('基本信息')
                    },
                    {
                        active: 'authentication',
                        route: '/user/authentication',
                        text: UPEX.lang.template('身份认证')
                    },
                    {
                        active: 'bankInfo',
                        route: '/user/bankInfo',
                        text: UPEX.lang.template('银行卡信息')
                    }
                ]
            },
            {
                key: 'setting',
                title: UPEX.lang.template('安全设置'),
                subItems: [
                    {
                        active: 'setpwd',
                        route: '/user/setpwd',
                        text: UPEX.lang.template('密码设置')
                    },
                    {
                        active: 'binding-phone',
                        route: '/user/binding-phone',
                        text: UPEX.lang.template('手机绑定')
                    },
                    {
                        active: 'binding-email',
                        route: '/user/binding-email',
                        text: UPEX.lang.template('电子邮箱绑定')
                    },
                    {
                        active: 'google',
                        route: '/user/google',
                        text: UPEX.lang.template('Google验证器')
                    }
                ]
            },
            {
                key: 'activity',
                title: UPEX.lang.template('活动'),
                subItems: [
                    {
                        active: 'userpoint',
                        route: '/user-point/home',
                        text: UPEX.lang.template('我的Ace Point')
                    }, {
                        active: 'invite-home',
                        route: '/activity/invite-home',
                        text: UPEX.lang.template('邀请返佣')
                    }
                ]
            }
        ];
        if(UPEX.config.version === 'infinitex') {
            // 移除银行卡
            navData[0].subItems.pop();
            //移除返佣
            // navData.pop();
        }
        this.navData = navData;
    }

    componentWillReceiveProps() {
        if (this.props.authStore.checkLoginState()) {
        	this.setState({
        		isLogin: true
        	})
        } else {
            // message.error(UPEX.lang.template('登录超时，请重新登录'));

            browserHistory.push('/login');

        	this.setState({
        		isLogin: false
        	});
        }
    }

    activeMenu(url) {
        let pathname;

        if (this.props.router && this.props.router.location) {
            pathname = this.props.router.location.pathname;
        } else {
            pathname = this.props.pathname;
        }

        if (new RegExp(`${url}$`).test(pathname)) {
            return 'active-item';
        } else {
            return '';
        }
    }

    render() {
        const store = this.props.userInfoStore;
        const infinitexActivityDisable =  UPEX.config.version === 'infinitex' && [10004,10014,10076,10077,10080,10079,10068,10069,10013,10003,10071,10064].indexOf(store.userInfo.uid) == -1;

        if (!this.state.isLogin) {
            return null;
        }

        return (
            <div className="user-wrapper">
                <Breadcrumb className="user-breadcrumb" separator=">">
                    <Breadcrumb.Item><a href="/home">{UPEX.config.sitename}</a></Breadcrumb.Item>
                    <Breadcrumb.Item>{UPEX.lang.template('个人中心')}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="user-body-inner clearfix">
                    <div className="aside-left">
                        <div className="info">
                            <p className="id">UID:{store.userInfo && store.userInfo.uid ? store.userInfo.uid + '' : ''}</p>
                        </div>
                        <div className="menu">
                            {this.navData.map((item, i) => {
                                // 澳洲屏蔽活动
                                if (item.key == 'activity' && infinitexActivityDisable) {
                                    return  null;
                                }
                                return (
                                    <dl className="menu-submenu" key={i}>
                                        <dt className="menu-submenu-title">{item.title}</dt>
                                        {
                                            item.subItems.map((sub, j) => {
                                                return (
                                                    <dd key={j} className={`menu-submenu-item ${this.activeMenu(sub.active)}`}>
                                                        <Link to={sub.route}>{sub.text}</Link>
                                                    </dd>
                                                );
                                            })
                                        }
                                    </dl>
                                );
                            })}
                        </div>
                    </div>
                    <div className="user-main exc-page-content">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default UserPage;
