/**
 * 法币充值
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Alert, Radio, Icon, message } from 'antd';
import PageWrapper from '@/mods/common/wrapper/full-page';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import { ausGetQuotaManagementInfo, getBPAYreferenceNo } from '@/api/http';
import NumberUtils from '@/lib/util/number';
import Bpay from './bpay';
import Poli from './poli';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject('commonStore', 'userInfoStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'a',
            Biller: 'Infinitex Co., Ltd',
            BillerCode: '288795',
            referenceNo: '',
            singleLimit: '2,000',
            dayLimit: 0
        };
    }

    componentWillMount() {
        this.props.userInfoStore.getUserInfo().then(res => {
            // if (res.status === 200) {
            //     this.setState({
            //         referenceNo: res.attachment.uid
            //     });
            // }
        });
        getBPAYreferenceNo().then(res => {
            if(res.status === 200) {
                this.setState({
                    referenceNo: res.attachment
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

    render() {
        //
        const { state } = this;
        const bpayProps = state;

        return (
            <PageWrapper title={UPEX.lang.template('账户充值')} className="fiat-recharge-aus header-shadow">
                <Alert
                    className="ace-form-tips"
                    type="info"
                    showIcon
                    message={UPEX.lang.template('单日充值限额 {num1}', { num1: state.dayLimit }) + UPEX.config.baseCurrencyEn}
                    type="warning"
                />
                <FormView>
                    <FormItem>
                        <RadioGroup
                            onChange={e => {
                                this.setState({
                                    type: e.target.value
                                });
                            }}
                            defaultValue="a"
                        >
                            <RadioButton value="a">
                                <Icon type="credit-card" />
                                {UPEX.lang.template('使用BPAY支付')}
                            </RadioButton>
                            <RadioButton value="b">
                                <Icon type="credit-card" />
                                {UPEX.lang.template('使用Poli支付')}
                            </RadioButton>
                        </RadioGroup>
                    </FormItem>
                    {state.type === 'a' ? (
                        <Bpay {...bpayProps}/>
                    ) : (
                        <Poli {...bpayProps}/>
                    )}
                </FormView>
            </PageWrapper>
        );
    }
}

export default View;
