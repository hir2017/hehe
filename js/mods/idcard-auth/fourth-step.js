import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Button } from 'antd';

import AceForm from '../../components/form/form';

@inject('userInfoStore')
@observer
export default class FourthStep extends Component {
    componentWillMount() {
        this.props.userInfoStore.bankCardInfo();
    }


    submitKycC = () => {
        this.props.userInfoStore.kycC().then(data => {
            if (data) {
                this.props.userInfoStore.getUserInfo();
            }
        });
    };

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const userInfo = this.props.userInfoStore.userInfo || {};
        let bankCardList = this.props.userInfoStore.bankCardList || [];
        let $bottom = null;
        if (bankCardList.length === 0) {
            // 未绑定银行卡
            $bottom = (
                <Button
                    className="ace-btn-large"
                    onClick={e => {
                        browserHistory.push('/user/bankInfo');
                    }}
                >
                    {UPEX.lang.template('绑定银行卡')}
                </Button>
            );
        } else if (userInfo.authLevel === 2) {
            switch (userInfo.isAuthVideo) {
                case 1:
                    $bottom = <p>{UPEX.lang.template('您已成功提交提额申请，审核会在3个工作日内完成，如果有必要我们会与您取得联系，请保持电话畅通。')}</p>;
                    break;
                case 2:
                    $bottom = (
                        <Button
                            className="ace-btn-large"
                            onClick={e => {
                                browserHistory.push('/webtrade');
                            }}
                        >
                            {UPEX.lang.template('去行情中心')}
                        </Button>
                    );
                    break;
                default:
                    $bottom = (
                        <div className="up-limit">
                            <Button loading={loading} className="ace-btn-large" onClick={this.submitKycC}>
                                {UPEX.lang.template('申請更高限額')}
                            </Button>
                            {userInfo.isAuthVideo === -1 ? <p className="error">{userInfo.authFailReason}</p> : null}
                        </div>
                    );
                    break;
            }
        }  else if(userInfo.authLevel === 3) {
            $bottom = (
                <Button
                    className="ace-btn-large"
                    onClick={e => {
                        browserHistory.push('/webtrade');
                    }}
                >
                    {UPEX.lang.template('去行情中心')}
                </Button>
            );
        }
        return (
            <AceForm className="auth-step-4">
                <h3 className="title">{UPEX.lang.template('您已完成安全认证！')}</h3>
                <table className="info">
                    <tbody>
                        <tr>
                            <td>{UPEX.lang.template('姓名')}：</td>
                            <td>{userInfo.uname}</td>
                        </tr>
                        <tr>
                            <td>{UPEX.lang.template('证件类型/证件号码')}：</td>
                            <td>
                                {UPEX.lang.template('台湾身份证')}/{userInfo.idNumber}
                            </td>
                        </tr>
                        <tr>
                            <td>{UPEX.lang.template('手机号码')}：</td>
                            <td>{userInfo.phone}</td>
                        </tr>
                        <tr>
                            <td>{UPEX.lang.template('当前日限额')}：</td>
                            <td>
                                <span className="money">{UPEX.config.baseCurrencySymbol} {userInfo.dayLimit}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="submit">{$bottom}</div>
                <div className="custom-tips tip" dangerouslySetInnerHTML={{__html: UPEX.lang.template('完成身份认证注意内容')}}></div>
            </AceForm>
        );
    }
}
