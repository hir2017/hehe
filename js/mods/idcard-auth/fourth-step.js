import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Modal, Button, Icon } from 'antd';
import NumberUtils from '@/lib/util/number';
import { twdGetQuotaManagementInfo } from '@/api/http';

import AceForm from '@/components/form/form';

@inject('userInfoStore')
@observer
export default class FourthStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            cashLimit: 0
        };
    }

    componentWillMount() {
        this.props.userInfoStore.bankCardInfo();
        twdGetQuotaManagementInfo({
            actionId: 2,
            currencyId: 1
        })
            .then(res1 => {
                const { authLevel = 1 } = this.props.userInfoStore.userInfo || {};
                let result = {};
                if (res1.status === 200) {
                    let val = res1.attachment[0][`kyc${authLevel}DayLimit`];
                    result.cashLimit = NumberUtils.separate(val);
                }
                this.setState(result);
            })
            .catch(err => {
                console.error('AusGetQuotaManagementInfo', err);
            });
    }

    submitKycC = () => {
        this.props.userInfoStore.kycC().then(res => {
            if (res.status == 200) {
                this.props.userInfoStore.getUserInfo();
            }
        });
    };

    render() {
        const {state} = this;
        const loading = this.props.userInfoStore.submit_loading;
        const userInfo = this.props.userInfoStore.userInfo || {};
        let bankCardList = this.props.userInfoStore.bankCardList || [];
        let $bottom = null;
        if (bankCardList.length === 0) {
            // 未绑定银行卡
            $bottom = (
                <Button
                    className="exc-btn-large"
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
                            className="exc-btn-large"
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
                            {userInfo.isAuthVideo === -1 ? <Icon className="auth-fail none" type="exclamation-circle-o" /> : null}
                            <Button loading={loading} className="exc-btn-large" onClick={this.submitKycC}>
                                {UPEX.lang.template('申請更高限額')}
                            </Button>
                            <div
                                className={`fail-reason-dialog-wrapper ${this.state.visible ? 'show' : ''}`}
                                onClick={e => {
                                    this.setState({
                                        visible: false
                                    });
                                }}
                            >
                                <div className="fail-reason-dialog">
                                    <Icon
                                        type="close"
                                        onClick={e => {
                                            this.setState({
                                                visible: false
                                            });
                                        }}
                                    />
                                    <article className="">
                                        <header>{UPEX.lang.template('您之前一次的申请被驳回')}</header>
                                        <p>
                                            <label className="label"> {UPEX.lang.template('驳回原因:')}</label>
                                            {userInfo.authFailReason}
                                        </p>
                                    </article>
                                </div>
                            </div>
                            {userInfo.isAuthVideo === -1 ? (
                                <Icon
                                    className="auth-fail show"
                                    onClick={e => {
                                        this.setState({
                                            visible: true
                                        });
                                    }}
                                    type="exclamation-circle-o"
                                />
                            ) : null}
                        </div>
                    );
                    break;
            }
        } else if (userInfo.authLevel === 3) {
            $bottom = (
                <Button
                    className="exc-btn-large"
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
                                <span className="money">
                                    {UPEX.config.baseCurrencySymbol} {state.cashLimit}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="submit">{$bottom}</div>
                <div className="custom-tips tip" dangerouslySetInnerHTML={{ __html: UPEX.lang.template('完成身份认证注意内容') }} />
            </AceForm>
        );
    }
}
