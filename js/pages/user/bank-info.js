/**
 * @fileoverview  银行卡信息
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import BindingBank from '../../mods/bank-info/index';
import BankList from '../../mods/bank-info/list';
import { Button, message } from 'antd';

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

        if (userInfo.authLevel < 1) {
            // 未通过KYC1
            $content = (
                <div className="bank-message">
                    <p>{UPEX.lang.template('请先身份认证')}</p>
                    <Link to="/user/authentication">{UPEX.lang.template('身份认证')}</Link>
                </div>
            );
        } else if (!userInfo.isValidatePass) {
            // 未设置交易密码
            $content = (
                <div className="bank-message">
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

        return (
            <div className="page-content-inner">
                <div className="content-title">{UPEX.lang.template('银行卡信息')}</div>
                <section className="content-body">{$content}</section>
            </div>
        );
    }
}

export default BankInfo;
