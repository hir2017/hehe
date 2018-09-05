/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router';

import PageWrapper from '../../components/page-user/page-wrapper';

@inject('userInfoStore')
@observer
export default class extends Component {
    componentWillMount() {
        this.props.userInfoStore.getUserInfo();
    }

    render() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        return (
            <PageWrapper innerClass="bind-success">
                <div className="item">
                    <span className="icon">
                        <Icon type="check" />
                    </span>
                    <span className="icon-text">{UPEX.lang.template('恭喜您')}！</span>
                </div>
                <div className="item">
                    {UPEX.lang.template('您已经成功绑定邮箱')} <span className="email">{userInfo.email}</span>
                </div>
                {userInfo.isAuth < 2 ? (
                    <div>
                        <p>{UPEX.lang.template('还差一步，您就可以开始交易了')}</p>
                        <div className="item">
                            <Button className="exc-main">
                                <Link to="/user/authentication">
                                    {UPEX.lang.template('去身份验证')}
                                    {/* <span className="icon">1</span> */}
                                </Link>
                            </Button>
                        </div>
                    </div>
                ) : null}
            </PageWrapper>
        );
    }
}
