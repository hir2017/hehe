/**
 * 法币充值
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Alert } from 'antd';
import PageWrapper from '@/mods/common/wrapper/full-page';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import { ausGetQuotaManagementInfo, getBPAYreferenceNo } from '@/api/http';
import NumberUtils from '@/lib/util/number';
import Bpay from './bpay';
import Poli from './poli';
import AuthWrapper from '@/mods/authhoc/recharge-withdraw';

@inject('userInfoStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'a',
            Biller: '',
            BillerCode: '',
            referenceNo: '',
            singleLimit: '2,000',
            actionStatus: 0, // 充值行为限制  0:未获取 1:允许  2:禁止
            dayLimit: 0
        };
        this.pageInfo = {
            title: UPEX.lang.template('账户充值'),
            className: 'fiat-recharge-aus header-shadow'
        };
    }

    getPageInfo() {
        getBPAYreferenceNo().then(res => {
            if (res.status === 200) {
                this.setState({
                    referenceNo: res.attachment,
                    Biller: 'Infinite Exchange Pty Ltd',
                    BillerCode: '288795',
                });
            }
        });
        ausGetQuotaManagementInfo({
            actionId: 1,
            currencyId: 1
        })
            .then(res => {
                const { authLevel = 1 } = this.props.userInfoStore.userInfo;
                let result = {};
                if (res.status === 200) {
                    result.dayLimit = NumberUtils.separate(res.attachment[0][`kyc${authLevel}DayLimit`]);
                }
                this.setState(result);
            })
            .catch(err => {
                console.error('AusGetQuotaManagementInfo', err);
            });
    }

    componentDidMount() {
        const store = this.props.userInfoStore;
        store.getActionLimit().then(res => {
            if(res.status !== 200) {
                return ;
            }
            const {actionRoles} = store;
            // 检测充值限制
            if(parseInt(actionRoles.recharge) !== 1) {
                this.setState({
                    actionStatus: 2
                });
            } else {
                this.setState({
                    actionStatus: 1
                });
                this.getPageInfo();
            }

        }).catch(err => {
            console.error('componentDidMount recharge aus', err)
        })

    }

    render() {
        //
        const { state } = this;
        const bpayProps = state;

        return (
            <AuthWrapper pageInfo={this.pageInfo} name="recharge">
                <PageWrapper {...this.pageInfo}>
                    <Alert
                        className="ace-form-tips"
                        showIcon
                        message={UPEX.lang.template('单日充值限额 {num1}', { num1: state.dayLimit }) + UPEX.config.baseCurrencyEn}
                        type="warning"
                    />
                    <FormView>
                        <FormItem>
                            <div className="exc-fiat-recharge-switch">
                                <span
                                    className={`switch-item ${state.type === 'a' ? 'selected' : ''}`}
                                    onClick={e => {
                                        this.setState({ type: 'a' });
                                    }}
                                >
                                    {UPEX.lang.template('使用BPAY支付')}
                                </span>
                                <span
                                    className={`switch-item ${state.type === 'b' ? 'selected' : ''}`}
                                    onClick={e => {
                                        this.setState({ type: 'b' });
                                    }}
                                >
                                    {UPEX.lang.template('使用POLi支付')}
                                </span>
                            </div>
                        </FormItem>
                        {state.type === 'a' ? <Bpay {...bpayProps} /> : <Poli {...bpayProps} />}
                    </FormView>
                </PageWrapper>
            </AuthWrapper>
        );
    }
}

export default View;
