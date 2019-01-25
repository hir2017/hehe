import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { ausGetQuotaManagementInfo } from '@/api/http';
import { Modal, Button, Icon } from 'antd';
import {idCardList} from './action/info';
import AceForm from '@/components/form/form';

@inject('userInfoStore')
@observer
export default class FourthStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cashLimit: 0,
            coinLimit: 0
        };
    }

    componentWillMount() {
        Promise.all(
            [ausGetQuotaManagementInfo({
                actionId: 2,
                currencyId: 1
            }),
            ausGetQuotaManagementInfo({
                actionId: 4,
                currencyId: 2
            })]
        )
            .then(([res1, res2]) => {
                let result = {};
                const {authLevel = 1} = this.props.userInfoStore.userInfo;
                if (res1.status === 200) {
                    result.cashLimit = res1.attachment[0][`kyc${authLevel}DayLimit`];
                }
                if (res2.status === 200) {
                    result.coinLimit = res2.attachment[0][`kyc${authLevel}DayLimit`];
                }
                this.setState(result);
            })
            .catch(err => {
                console.error('AusGetQuotaManagementInfo', err);
            });
    }

    render() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        const { state } = this;
        let IdtypeName = idCardList(userInfo.idType);
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
                                {IdtypeName.length === 0 ? null : IdtypeName[0].label}/{userInfo.idNumber}
                            </td>
                        </tr>
                        <tr>
                            <td>{UPEX.lang.template('手机号码')}：</td>
                            <td>{userInfo.phone}</td>
                        </tr>
                        <tr>
                            <td>{UPEX.lang.template('当前日提现限额')}：</td>
                            <td>
                                <span className="money">
                                    {state.cashLimit} {UPEX.config.baseCurrencySymbol}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>{UPEX.lang.template('当前日提币限额')}：</td>
                            <td>
                                <span className="money">
                                    {state.coinLimit} {UPEX.config.baseCurrencySymbol}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="submit">
                    <Button
                        className="ace-btn-large"
                        onClick={e => {
                            browserHistory.push('/webtrade');
                        }}
                    >
                        {UPEX.lang.template('去行情中心')}
                    </Button>
                </div>
                <div className="custom-tips tip" dangerouslySetInnerHTML={{ __html: UPEX.lang.template('完成身份认证注意内容') }} />
            </AceForm>
        );
    }
}
