/**
 * @fileoverview  银行卡信息
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';

import BindingBank from '../../mods/bank-info/index';
import BankList from '../../mods/bank-info/list';
import PageWrapper from '../../components/page-user/page-wrapper';
import AceSection from '../../components/page-user/section';

@inject('userInfoStore')
@observer
class BankInfo extends Component {
    constructor() {
        super();
        this.passwordChange = this.passwordChange.bind(this);
    }

    componentWillMount() {
        this.props.userInfoStore.getUserInfo();
    }

    state = {
        pwd: ''
    };

    passwordChange(e) {
        this.setState({
            pwd: e.target.value
        });
    }

    render() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        let $content;
        let needTitle = false;
        let bodyClass = 'height-full-sp';
        if (userInfo.authLevel < 1) {
            // 未通过KYC1
            needTitle = true;
            $content = (
                <div className="no-auth-message bank-message">
                    <p>{UPEX.lang.template('请先身份认证')}</p>
                    <Link className="exchange-btn" to="/user/authentication">{UPEX.lang.template('身份认证')}</Link>
                </div>
            );
        } else if (!userInfo.isValidatePass) {
            // 未设置资金密码
            needTitle = true;
            $content = (
                <div className="no-auth-message bank-message">
                    <p>{UPEX.lang.template('请先设置资金密码')}</p>
                    <Link className="exchange-btn"  to="/user/set-trade-pwd">{UPEX.lang.template('设置资金密码')}</Link>
                </div>
            );
        } else {
            bodyClass = '';
            $content = (
                <div>
                    <BindingBank />
                    <BankList />
                </div>
            );
        }
        if(needTitle) {
            $content = (
                <AceSection title={UPEX.lang.template('银行卡信息')}>
                    {$content}
                </AceSection>
            )
        }

        return (
            <PageWrapper innerClass="bank-info" bodyClass={bodyClass} noPadding>
                {$content}
            </PageWrapper>
        );
    }
}

export default BankInfo;
