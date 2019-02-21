/**
 * @fileoverview: footer条款链接-澳洲
 * @author: ShangJin
 * @date: 2019/1/23
 */
import React, {Component} from 'react';
import {inject} from 'mobx-react';
import {Link, browserHistory} from 'react-router';
import {message} from 'antd';

const getNavList = () => {
    return [
        [
            {
                name: UPEX.lang.template('关于我们'),
            },
            {
                name: UPEX.lang.template('关于网站'),
                path: UPEX.lang.template('关于网站网页链接')
            },
            {
                name: UPEX.lang.template('联系我们'),
                path: UPEX.lang.template('联系我们网页链接')
            }
        ],
        [
            {
                name: UPEX.lang.template('服务支持'),
            },
            {
                name: UPEX.lang.template('问题反馈'),
                path: UPEX.lang.template('问题反馈网页链接')
            },
            {
                name: UPEX.lang.template('帮助中心'),
                path: UPEX.lang.template('帮助中心网站链接')
            },
            {
                name: UPEX.lang.template('费率说明'),
                path: UPEX.lang.template('费率说明网页链接')
            },
            {
                name: UPEX.lang.template('投诉机制'),
                path: UPEX.lang.template('投诉机制网页链接')
            }
        ],
        [
            {
                name: UPEX.lang.template('客户声明'),
            },
            {
                name: UPEX.lang.template('隐私条款'),
                path: UPEX.lang.template('隐私条款网页链接')
            },
            {
                name: UPEX.lang.template('免责声明'),
                path: UPEX.lang.template('免费声明网页链接')
            },
            {
                name: UPEX.lang.template('用户协议'),
                path: UPEX.lang.template('用户协议网页链接'),
            },
            {
                name: UPEX.lang.template('AML&CTF Program'),
                path: UPEX.lang.template('AML&CTF Program网页链接')
            }
        ],
        [
            {
                name: UPEX.lang.template('下载客户端'),
                route: 'download-app'
            }
        ]
    ];
};

@inject('userInfoStore', 'authStore')
class NavsView extends Component {
    constructor() {
        super();
        let navs = getNavList();
        this.navs = navs;
    }

    render() {
        return (
            <ul className="nav-list">
                {this.navs.map((items, i) => {
                    return (
                        <li key={i}>
                            {items.map((item, j) => {
                                if(item.path){
                                    // 外链跳转，如果是每组第一个则不支持跳转，除了跳转客户端
                                    if (i == 3) {
                                        return (
                                            <a className="nav-item" key={j} target="_blank" href={item.path}>
                                                {item.name}
                                            </a>
                                        );
                                    } else {
                                        return j === 0 ? (
                                            <a className="nav-item" key={j}>
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
