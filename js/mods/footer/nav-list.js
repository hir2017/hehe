import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import { message } from 'antd';

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
           /* {
                name: UPEX.lang.template('投资者关系'),
                path: UPEX.lang.template('投资者关系网页链接')
            }*/,
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
                path: UPEX.lang.template('问题反馈网页链接')
                // route: 'feedback'
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
                name: UPEX.lang.template('隐私条款'),
                path: UPEX.config.docUrls.privacyPolicy
            },
            {
                name: UPEX.lang.template('免责声明'),
                path: UPEX.config.docUrls.riskDisclosure
            },
            {
                name: UPEX.lang.template('反洗钱及认证条款'),
                path: UPEX.config.docUrls.kycPolicy
            }
        ],

        [
            {
                name: UPEX.lang.template('上币申请'),
                path: UPEX.config.docUrls.applyCurrency
            }
        ],
       /* [
            {
                name: UPEX.lang.template('客户端下载'),
                path: UPEX.lang.template('客户端下载网页链接')
            }
        ]*/
    ];
};

@inject('userInfoStore', 'authStore')
class NavsView extends Component {
    constructor() {
        super();
        let navs = getNavList();
        if (UPEX.config.version === 'infinitex') {
            // 去掉关于网站、团队介绍
            navs[0].splice(2, 2);
            // 去掉帮助中心
            // navs[1].splice(1, 1);
            // 去掉上币申请和客户端下载
            navs.splice(3, 2);
        }
        this.navs = navs;
    }

    handleFeedback() {
        if (this.props.authStore.checkLoginState()) {
            browserHistory.push('/user/question');
        } else {
            message.info(UPEX.lang.template('问题反馈前请先登录'));
        }
    }

    render() {
        return (
            <ul className="nav-list">
                {this.navs.map((items, i) => {
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
                                // 外链，如果是第一个则不支持跳转
                                if (item.path) {
                                    if(UPEX.config.version =='ace'){
                                        return (<a className="nav-item"  key={j} target="_blank" href={item.path}>
                                            {item.name}
                                        </a>)
                                    }
                                    else {
                                        return j === 0 ? (
                                            <a className="nav-item"  key={j}>
                                                {item.name}
                                            </a>
                                        ) : (
                                            <a className="nav-item" key={j} target="_blank" href={item.path}>
                                                {item.name}
                                            </a>
                                        );
                                    }

                                }
                                // 本地跳转
                                return (
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
