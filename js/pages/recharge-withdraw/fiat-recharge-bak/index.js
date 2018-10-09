/**
 * 法币充值
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Alert } from 'antd';
import PageWrapper from '@/mods/common/wrapper/full-page';
import {getUserActionLimit} from '@/api/http';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
// import BankCard from '@/mods/recharge-withdraw/fiat/bank-card';
import Spgateway from '@/mods/recharge-withdraw/fiat/spgateway';

@inject('userInfoStore', 'fiatRechargeStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'a',
            dayLimit: 0
        };
    }

    componentDidMount() {
        // TODO: dayLimit
        this.props.fiatRechargeStore.getRechargeDayLimit();
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
        if (store.currStep === 'start') {
            $alert = (
                <Alert
                    className="ace-form-tips"
                    type="info"
                    showIcon
                    message={UPEX.lang.template('单日充值限额 {num1}', { num1: store.rechargeDayLimit }) + UPEX.config.baseCurrencyEn}
                    type="warning"
                />
            );
            $switch = (
                <FormView>
                    <FormItem>
                        <div className="exc-fiat-recharge-switch">
                            <span
                                className={`switch-item ${state.type === 'a' ? 'selected' : ''}`}
                                onClick={e => {
                                    this.setState({ type: 'a' });
                                }}
                            >
                                {UPEX.lang.template('使用智付通支付')}
                            </span>
                            <span
                                className={`switch-item ${state.type === 'b' ? 'selected' : ''}`}
                                onClick={e => {
                                    this.setState({ type: 'b' });
                                }}
                            >
                                {UPEX.lang.template('使用银行转账')}
                            </span>
                        </div>
                    </FormItem>
                </FormView>
            );
        }
        // $content = state.type === 'a' ? <Spgateway {...Props} /> : <BankCard {...Props} />;
        $content = <Spgateway {...Props} />;
        return (
            <PageWrapper title={UPEX.lang.template('账户充值')} className="fiat-recharge header-shadow">
                {$alert}
                {$switch}
                {$content}
            </PageWrapper>
        );
    }
}

export default View;
