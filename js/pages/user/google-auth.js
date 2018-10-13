import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import { Link } from 'react-router';
import BindingGoogle from '@/mods/binding-google/index';
import Success from '@/mods/binding-google/success';

import PageWrapper from '@/components/page-user/page-wrapper';

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
        let $content = null;
        if (userInfo.phone) {
            // 绑定或未绑定
            $content = !gaBindSuccess ? <BindingGoogle /> : <Success />;
        } else {
            // 绑定手机
            $content = (
                <div className="no-auth-message  google-no-binding-phone">
                    {UPEX.lang.template('添加Google绑定前，请先绑定手机号')}
                    <div>
                        <Button className="ace-main">
                            <Link to="/user/setting-phone">{UPEX.lang.template('去绑定手机')}</Link>
                        </Button>
                    </div>
                </div>
            );
        }
        return (
            <PageWrapper title={UPEX.lang.template('Google验证器')}>
                {$content}
            </PageWrapper>
        );
    }
}

export default GoogleAuthenticator;
