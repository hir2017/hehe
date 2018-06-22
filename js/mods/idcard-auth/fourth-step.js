/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';
import { Button } from 'antd';

import AceForm from '../../common-mods/form/form';

@inject('userInfoStore')
@observer
export default class FourthStep extends Component {
    componentWillMount() {
        this.props.userInfoStore.bankCardInfo();
    }

    submitKycC = () => {
        this.props.userInfoStore.kycC();
    };

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const userInfo = this.props.userInfoStore.userInfo || {};
        const bankCardList = this.props.userInfoStore.bankCardList || [];
        return (
            <AceForm className="auth-step-4">
                <h3 className="title">{UPEX.lang.template('您已完成安全認證！')}</h3>
                <table className="info">
                    <tbody>
                        <tr>
                            <td>{UPEX.lang.template('姓名')}：</td>
                            <td>{userInfo.uname}</td>
                        </tr>
                        <tr>
                            <td>{UPEX.lang.template('证件类型/证件号码')}：</td>
                            <td>
                                {UPEX.lang.template('台灣身份證')}/{userInfo.idNumber}
                            </td>
                        </tr>
                        <tr>
                            <td>{UPEX.lang.template('手機號碼')}：</td>
                            <td>{userInfo.phone}</td>
                        </tr>
                        <tr>
                            <td>{UPEX.lang.template('當前日限額')}：</td>
                            <td>
                                <span className="money">NT$ {userInfo.dayLimit}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="tip">
                    <p>{UPEX.lang.template('如填写有误需要修改，请联系客服support@ace.one 进行修改')}</p>
                    <p>{UPEX.lang.template('日提現額度是=每日提現到銀行賬戶的額度+每日提幣的即時新台幣價值總額')}</p>
                    <p />
                </div>
                <div className="submit">
                    {bankCardList.length === 0 ? (
                        <Button>
                            <Link to="/user/bankInfo">{UPEX.lang.template('绑定银行卡')}</Link>
                        </Button>
                    ) : userInfo.isAuthVideo === 0 ? (
                        <Button loading={loading} onClick={this.submitKycC}>
                            {UPEX.lang.template('申請更高限額')}
                        </Button>
                    ) : userInfo.isAuthVideo === 2 ? (
                        <Button>
                            <Link to="/user/bankInfo">{UPEX.lang.template('去交易中心')}</Link>
                        </Button>
                    ) : (
                        <Button>{UPEX.lang.template('申請更高限額')}</Button>
                    )}
                </div>
            </AceForm>
        );
    }
}
