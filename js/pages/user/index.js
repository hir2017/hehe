/**
 * @fileoverview  用户个人信息
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';

@inject('userInfoStore')
@observer
class UserPage extends Component {
    activeMenu(url) {
        if (new RegExp(`${url}$`).test(this.props.router.location.pathname)) {
            return 'active-item';
        } else {
            return '';
        }
    }

    navData = [
        {
            title: UPEX.lang.template('个人信息'),
            subItems: [
                {
                    active: 'user',
                    route: '/user',
                    text: UPEX.lang.template('基础资料')
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
            title: UPEX.lang.template('安全设置'),
            subItems: [
                {
                    active: 'passwordSetting',
                    route: '/user/setpwd',
                    text: UPEX.lang.template('密码设置')
                },
                {
                    active: 'binding-phone',
                    route: '/user/binding-phone',
                    text: UPEX.lang.template('手机绑定')
                },
                {
                    active: 'bindingEmail',
                    route: '/user/bindingEmail',
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
            title: UPEX.lang.template('其它'),
            subItems: [
                {
                    active: 'question',
                    route: '/user/question',
                    text: UPEX.lang.template('问题反馈')
                },
                {
                    active: 'questionList',
                    route: '/user/questionList',
                    text: UPEX.lang.template('反馈列表')
                }
            ]
        }
    ];
    render() {
        const store = this.props.userInfoStore;
        return (
            <div className="user-wrapper">
                <div className="user-body-inner clearfix">
                    <div className="aside-left">
                        <div className="info">
                            <p className="name">{store.userInfo ? (store.userInfo.phone || store.userInfo.email) : '--'}</p>
                            <p className="id">UID:{store.userInfo ? store.userInfo.uid + '' : ''}</p>
                        </div>
                        <div className="menu">
                            {this.navData.map((item, i) => {
                                return (
                                    <dl className="menu-submenu" key={i} >
                                        <dt className="menu-submenu-title">{item.title}</dt>
                                        {item.subItems.map((sub, j) => {
                                            return (
                                                <dd key={j} className={`menu-submenu-item ${this.activeMenu(sub.active)}`}>
                                                    <Link to={sub.route}>{sub.text}</Link>
                                                </dd>
                                            );
                                        })}
                                    </dl>
                                );
                            })}
                        </div>

                    </div>
                    <div className="user-main ace-page-content">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default UserPage;
