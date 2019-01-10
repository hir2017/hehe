/**
 * 法币充值
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Alert } from 'antd';
import PageWrapper from '@/mods/common/wrapper/full-page';
import { twdGetQuotaManagementInfo, ausGetQuotaManagementInfo } from '@/api/http';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
// import BankCard from '@/mods/recharge-withdraw/fiat-recharge/bank-card';
import Numberutils from  '@/lib/util/number';
import Spgateway from '@/mods/recharge-withdraw/fiat-recharge/spgateway';
import NumberUtils from '@/lib/util/number';
import AuthWrapper from '@/mods/authhoc/recharge-withdraw';

@inject('userInfoStore', 'fiatRechargeStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'a',
            limitLoading: true,
            limitInfo: {}
        };
        this.pageInfo = {
            title :UPEX.lang.template('账户充值'),
            className: 'fiat-recharge header-shadow'
        }
    }

    componentDidMount() {
        this.props.fiatRechargeStore.getRechargeDayLimit();
        let request = UPEX.config.version === 'ace' ?  twdGetQuotaManagementInfo : ausGetQuotaManagementInfo;
        request({
            actionId: 1,
            currencyId: 1
        }).then(res => {
            if(res.status === 200) {
                let data = res.attachment[0] || {};
                this.setState({
                    limitInfo: data,
                    limitLoading: false
                })
            }
        }).catch(err => {
            console.error('getUserActionLimit', err);
            this.setState({
                limitInfo: {},
                limitLoading: false
            })
        })
    }

    componentWillUnmount() {
        this.props.fiatRechargeStore.setCurrStep('start');
    }

    render() {
        const store = this.props.fiatRechargeStore;
        const { state } = this;
        const Props = {
            parentCtx: this
        };
        let $alert = null;
        let $switch = null;
        const {limitInfo} = state;
        // 等待个人信息请求
        const { authLevel } = this.props.userInfoStore.userInfo;
        let dayLimit = 0;
        let monthLimit = 0;
        if(authLevel && !state.limitLoading) {
            dayLimit = Numberutils.separate(limitInfo[`kyc${authLevel}DayLimit`]);
            monthLimit = Numberutils.separate(limitInfo[`kyc${authLevel}MonthLimit`]);
        }

        if (store.currStep === 'start') {
            $alert = (
                <Alert
                    className="ace-form-tips"
                    type="info"
                    showIcon
                    message={
                        UPEX.lang.template('单日充值限额 {num1}, 单月充值限额 {num2}', { num1: ` ${dayLimit} ${UPEX.config.baseCurrencyEn}`, num2: ` ${monthLimit} ${UPEX.config.baseCurrencyEn}` })
                    }
                    type="warning"
                />
            );
            // $switch = (
            //     <FormView>
            //         <FormItem>
            //             <div className="exc-fiat-recharge-switch">
            //                 <span
            //                     className={`switch-item ${state.type === 'a' ? 'selected' : ''}`}
            //                     onClick={e => {
            //                         this.setState({ type: 'a' });
            //                     }}
            //                 >
            //                     {UPEX.lang.template('使用智付通支付')}
            //                 </span>
            //                 <span
            //                     className={`switch-item ${state.type === 'b' ? 'selected' : ''}`}
            //                     onClick={e => {
            //                         this.setState({ type: 'b' });
            //                     }}
            //                 >
            //                     {UPEX.lang.template('使用银行转账')}
            //                 </span>
            //             </div>
            //         </FormItem>
            //     </FormView>
            // );
        }
        // $content = state.type === 'a' ? <Spgateway {...Props} /> : <BankCard {...Props} />;
        $content = <Spgateway {...Props} />;
        return (
            <AuthWrapper pageInfo={this.pageInfo} name="recharge">
                <PageWrapper {...this.pageInfo}>
                    {$alert}
                    {$switch}
                    {$content}
                </PageWrapper>
            </AuthWrapper>
        );
    }
}

export default View;
