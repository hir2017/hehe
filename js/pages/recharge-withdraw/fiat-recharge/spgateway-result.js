/**
 * 法币充值
 */
import React, { Component } from 'react';
import { Button } from 'antd';
import { browserHistory } from 'react-router';
import PageWrapper from '@/mods/common/wrapper/full-page';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import TableView from '@/mods/common/form/table';
import {aceComputeFee} from '@/mods/recharge-withdraw/util';
import { getCurrencyFee } from '@/api/http';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fee: 0
        };
    }

    componentDidMount() {
        const {query = {}} = this.props.location;

        getCurrencyFee({
            actionId: 1,
            currencyId: 1
        }).then(res => {
            let feeInfo =  res.attachment || {};
            this.setState({
                fee: aceComputeFee(query.Amt || 0, feeInfo),
            })
        })
        this.setState({
            ...query,
        });
    }

    onSubmit() {
        browserHistory.push('/account/asset-change/deposit');
    }

    render() {
        const { state } = this;
        let tableData = [];
        let pageStatus = state.Status || '';
        pageStatus = pageStatus.toLowerCase();
        let descText = UPEX.lang.template('支付失败');
        if (state.Status === 'SUCCESS') {
            descText = UPEX.lang.template('恭喜您，支付成功');
            tableData = [
                {
                    label: UPEX.lang.template('支付時間'),
                    text: state.PayTime // 2018-9-29 10:05:32
                },
                {
                    label: UPEX.lang.template('訂單金額'),
                    text: `${state.Amt} ${UPEX.config.baseCurrencyEn}` // 1000 TWD
                },
                {
                    label: UPEX.lang.template('手續費'),
                    text: `${state.fee} ${UPEX.config.baseCurrencyEn}` // 13 TWD
                },
                {
                    label: UPEX.lang.template('支付方式'),
                    text: state.PaymentType
                },
                {
                    label: UPEX.lang.template('轉出銀行'),
                    text: state.PayerBankName || state.PayerBank
                },
                {
                    label: UPEX.lang.template('转出银行卡'),
                    text: state.PayerAccount5Code ? `*******${state.PayerAccount5Code}` : ''
                }
            ];
        } else {
            tableData = [
                {
                    label: UPEX.lang.template('失败原因'),
                    text: state.Message
                }
            ];
        }
        return (
            <PageWrapper title={UPEX.lang.template('账户充值')} className="fiat-recharge header-shadow">
                <FormView className={`recharge-result ${pageStatus}`}>
                    <FormItem className="desc-text">
                        {descText}
                    </FormItem>
                    <FormItem>
                        <TableView data={tableData} />
                    </FormItem>
                    <FormItem>
                        <Button className="exc-btn-submit" onClick={this.onSubmit.bind(this)}>
                            {UPEX.lang.template('已完成支付, 去查看')}
                        </Button>
                    </FormItem>
                </FormView>
            </PageWrapper>
        );
    }
}

export default View;
