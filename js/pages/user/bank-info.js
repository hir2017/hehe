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
import PageWrapper from '../../common-mods/page-user/page-wrapper';
import AceSection from '../../common-mods/page-user/section';

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
        if (userInfo.authLevel < 1) {
            // 未通过KYC1
            needTitle = true;
            $content = (
                <div className="no-auth-message bank-message">
                    <p>{UPEX.lang.template('请先身份认证')}</p>
                    <Link className="ace-btn" to="/user/authentication">{UPEX.lang.template('身份认证')}</Link>
                </div>
            );
        } else if (!userInfo.isValidatePass) {
            // 未设置交易密码
            needTitle = true;
            $content = (
                <div className="no-auth-message bank-message">
                    <p>{UPEX.lang.template('请先设置交易密码')}</p>
                    <Link to="/user/settingTraddingPassword">{UPEX.lang.template('设置交易密码')}</Link>
                </div>
            );
        } else {
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
            <PageWrapper innerClass="bank-info" noPadding>
                {$content}
            </PageWrapper>
        );
    }
}

export default BankInfo;
