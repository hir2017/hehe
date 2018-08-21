/**
 * @fileoverview  google 认证
 * @author xia xiang feng
 * @date 2018-05-25
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import { Link } from 'react-router';
import BindingGoogle from '../../mods/binding-google';
import Success from '../../mods/binding-google/success';

import PageWrapper from '../../components/page-user/page-wrapper';

@inject('userInfoStore')
@observer
class GoogleAuthenticator extends Component {
    componentWillMount() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        Object.keys(userInfo).length || this.props.userInfoStore.getUserInfo();
        gaBindSuccess || this.props.userInfoStore.isGoogleAuth();
    }

    render() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;

        return (
            <PageWrapper title={UPEX.lang.template('Google验证器')}>
                {userInfo.phone && !gaBindSuccess ? <div className="exchange-top-tips">{UPEX.lang.template('为了您的资金安全，修改Google验证码后，24小时不可以提币')}</div> : null}

                {userInfo.phone ? (
                    !gaBindSuccess ? (
                        <BindingGoogle />
                    ) : (
                        <Success />
                    )
                ) : (
                    <div className="no-auth-message  google-no-binding-phone">
                        {UPEX.lang.template('添加Google绑定前，请先绑定手机号')}
                        <div>
                            <Button className="exchange-main">
                                <Link to="/user/setting-phone">{UPEX.lang.template('去绑定手机')}</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </PageWrapper>
        );
    }
}

export default GoogleAuthenticator;
