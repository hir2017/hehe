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
                <Button>
                    <Link to="/user/bankInfo">{UPEX.lang.template('绑定银行卡')}</Link>
                </Button>
            );
        } else if (userInfo.authLevel === 2) {
            switch (userInfo.isAuthVideo) {
                case 1:
                    $bottom = <p>{UPEX.lang.template('您已成功提交提额申请，审核会在3个工作日内完成，如果有必要我们会与您取得联系，请保持电话畅通。')}</p>;
                    break;
                case 2:
                    $bottom = (
                        <Button>
                            <Link to="/user/bankInfo">{UPEX.lang.template('去交易中心')}</Link>
                        </Button>
                    );
                    break;
                default:
                    $bottom = (
                        <div className="up-limit">
                            <Button loading={loading} onClick={this.submitKycC}>
                                {UPEX.lang.template('申請更高限額')}
                            </Button>
                            {userInfo.isAuthVideo === -1 ? <p className="error">{userInfo.authFailReason}</p> : null}
                        </div>
                    );
                    break;
            }
        }
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
                <div className="submit">{$bottom}</div>
                <div className="custom-tips tip">
                    <header className="tip-header">{UPEX.lang.template('注意')}：</header>
                    <ul className="texts">
                        <li>·&nbsp;{UPEX.lang.template('如填写有误需要修改，请联系客服support@ace.one 进行修改')}</li>
                        <li>·&nbsp;{UPEX.lang.template('日提現額度是=每日提現到銀行賬戶的額度+每日提幣的即時新台幣價值總額')}</li>
                    </ul>
                </div>
            </AceForm>
        );
    }
}
