import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { inject } from 'mobx-react';
import {Link} from 'react-router';

import PageWrapper from '../../components/page-user/page-wrapper';

@inject('commonStore')
export default class Agreements extends Component {

    constructor(props) {
        super(props);

        this.navData = [
            {
                title: UPEX.lang.template('免责声明'),
                subItems: [
                    {
                        active: 'privacy',
                        route: '/agreements/privacy',
                        text: UPEX.lang.template('隐私权政策')
                    },
                    {
                        active: 'user',
                        route: '/agreements/user',
                        text: UPEX.lang.template('使用者条款')
                    },
                    {
                        active: 'risk',
                        route: '/agreements/risk',
                        text: UPEX.lang.template('风险揭露及免责声明')
                    },
                ]
            }
        ];
    }

    componentDidMount() {
    }

    componentWillReceiveProps(props) {
        let curr = props.router.location.pathname;
        for (const temp of this.navData[0].subItems) {
            if(curr === temp.route) {
                this.setState({
                    title: temp.text,
                })
            }
        }
    }

    activeMenu(url) {
        if (new RegExp(`${url}$`).test(this.props.router.location.pathname)) {
            return 'active-item';
        } else {
            return '';
        }
    }

    render() {
        const {language} = this.props.commonStore;
        const {name} = this.props.params;
        let currNav = this.navData[0].subItems.filter(item => name === item.active);
        currNav = currNav[0] || {};
        return (
            <div className="user-wrapper agreements">
                <Breadcrumb className="user-breadcrumb" separator=">">
                    <Breadcrumb.Item>{UPEX.lang.template('ACE')}</Breadcrumb.Item>
                    <Breadcrumb.Item>{UPEX.lang.template('用户协议')}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="user-body-inner clearfix">
                    <div className="aside-left">
                        <div className="menu">
                            {this.navData.map((item, i) => {
                                return (
                                    <dl className="menu-submenu" key={i}>
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
                    <div className="user-main exchange-page-content">
                    <PageWrapper title={currNav.text}>
                        
                    </PageWrapper>
                    </div>
                </div>
            </div>
        );
    }
}


