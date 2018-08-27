import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import {message} from 'antd';

const getNavList = () => {
    return [
        [
            {
                name: UPEX.lang.template('关于我们'),
                path: UPEX.lang.template('关于我们网页链接')
            },
            {
                name: UPEX.lang.template('关于网站'),
                path: UPEX.lang.template('关于网站网页链接')
            },
            {
                name: UPEX.lang.template('团队介绍'),
                path: UPEX.lang.template('团队介绍网页链接')
            },
            {
                name: UPEX.lang.template('投资者关系'),
                path: UPEX.lang.template('投资者关系网页链接')
            },
            {
                name: UPEX.lang.template('联系我们'),
                path: UPEX.lang.template('联系我们网页链接')
            }
        ],
        [
            {
                name: UPEX.lang.template('服务支持'),
                path: UPEX.lang.template('服务支持网页链接')
            },
            {
                name: UPEX.lang.template('问题反馈'),
                route: 'feedback'
            },
            {
                name: UPEX.lang.template('帮助中心'),
                path: UPEX.lang.template('帮助中心网站链接')
            },
            {
                name: UPEX.lang.template('费率说明'),
                path: UPEX.lang.template('费率说明网页链接')
            }
        ],
        [
            {
                name: UPEX.lang.template('用户协议'),
                path: UPEX.lang.template('用户协议网页链接')
            },
            {
                name: UPEX.lang.template('隐私保护'),
                path: UPEX.lang.template('隐私保护网页链接')
            },
            {
                name: UPEX.lang.template('服务条款'),
                path: UPEX.lang.template('服务条款网页链接')
            },
            {
                name: UPEX.lang.template('免费声明'),
                path: UPEX.lang.template('免费声明网页链接')
            }
        ],

        [
            {
                name: UPEX.lang.template('上币申请'),
                path: UPEX.lang.template('上币申请网页链接')
            }
        ],
        [
            {
                name: UPEX.lang.template('客户端下载'),
                path: UPEX.lang.template('客户端下载网页链接')
            }
        ]
    ];
};

@inject('userInfoStore', 'authStore')
class NavsView extends Component {

    handleFeedback() {
        if (this.props.authStore.checkLoginState()) {
            browserHistory.push('/user/question');
        } else {
            message.info(UPEX.lang.template('问题反馈前请先登录'));
        }
    }

    render() {
        const navs = getNavList();
        return (
            <ul className="nav-list">
                {navs.map((items, i) => {
                    return (
                        <li key={i}>
                            {items.map((item, j) => {
                                if (item.route === 'feedback') {
                                    return (
                                        <a className="nav-item" key={j} onClick={this.handleFeedback.bind(this)}>
                                            {item.name}
                                        </a>
                                    );
                                }
                                return item.path ? (
                                    <a className="nav-item" key={j} target="_blank" href={item.path}>
                                        {item.name}
                                    </a>
                                ) : (
                                    <Link className="nav-item" key={j} to={`/${item.route}`}>
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default NavsView;
