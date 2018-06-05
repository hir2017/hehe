import React, { Component } from "react";
import { Link } from "react-router";

const getNavList = () => {
    return [
        [
            {
                name: UPEX.lang.template("关于我们"),
                route: "about"
            },
            {
                name: UPEX.lang.template("关于ACE"),
                route: ""
            },
            {
                name: UPEX.lang.template("团队介绍"),
                route: ""
            },
            {
                name: UPEX.lang.template("投资者关系"),
                route: ""
            },
            {
                name: UPEX.lang.template("联系我们"),
                route: "contact"
            }
        ],
        [
            {
                name: UPEX.lang.template("服务支持"),
                route: ""
            },
            {
                name: UPEX.lang.template("问题反馈"),
                route: "feedback"
            },
            {
                name: UPEX.lang.template("帮助中心"),
                route: "help"
            },
            {
                name: UPEX.lang.template("费率说明"),
                route: ""
            }
        ],
        [
            {
                name: UPEX.lang.template("用户协议"),
                route: ""
            },
            {
                name: UPEX.lang.template("隐私保护"),
                route: ""
            },
            {
                name: UPEX.lang.template("服务条款"),
                route: ""
            },
            {
                name: UPEX.lang.template("免费声明"),
                route: ""
            }
        ],

        [
            {
                name: UPEX.lang.template("上币申请"),
                route: ""
            }
        ],
        [
            {
                name: UPEX.lang.template("客户端下载"),
                route: "download"
            }
        ]
    ];
};

class NavsView extends Component {
    render() {
        const navs = getNavList()
        return (
            <ul className="nav-list">
                {navs.map((items, i) => {
                    return (
                        <li key={i}>
                            {items.map((item, j) => (
                                <Link
                                    className="nav-item"
                                    key={j}
                                    to={`/${item.route}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default NavsView;
