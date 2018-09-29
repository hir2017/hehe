/**
 * 支付通
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Button, Alert } from 'antd';
import Action from '../action';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import AmountInfo from '@/mods/common/form/amount-info-row';
import TableView from '@/mods/common/form/table';

@inject('fiatRechargeStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNumber: '',
            date: '',
            isVisible: false
        };
        this.action = Action(this.props.fiatRechargeStore);
    }

    componentDidMount() {
        /*
        * TODO:
        * ATM: 获取汇款账号、截止日期
        */
        const { data, formData } = this.props;
        if(data.type === '2') {
            this.setState({
                cardNumber: formData.VACCNo,
                date: formData.ExpireDate
            })
        }
    }

    onSubmit(action) {
        const { data, formData } = this.props;
        if (action === 'cancel') {
            this.props.fiatRechargeStore.setCurrStep('start');
            this.props.parentCtx.setState({
                step: 1
            });
        }
        // webATM
        if (action === 'web-success') {
            this.action.submitOrder({
                MerchantID_: formData.MerchantID_,
                PostData_: formData.PostData_,
                url: formData.url,
            }, false);
            this.setState({
                isVisible: true
            });
        }
        // 实体ATM
        if (action === 'go-record') {
            browserHistory.push('/account/fiatrecord');
        }
    }

    render() {
        const { props, state } = this;
        const { data = {} } = props;
        let tableData = [];
        let $operateBtn = null;
        let $afterNode = (
            <AmountInfo
                left={
                    <p className="balance">
                        {UPEX.lang.template('手续费')} <br /> {data.fee} {UPEX.config.baseCurrencyEn}
                    </p>
                }
                right={
                    <p className="balance">
                        {UPEX.lang.template('到账金额')} <br /> <em>{data.arrival}</em> {UPEX.config.baseCurrencyEn}
                    </p>
                }
            />
        );
        let AlertMsg = '';
        // webATM
        if (data.type === '1') {
            AlertMsg = UPEX.lang.template('請插入晶片讀卡機與銀行卡后，點擊按鈕支付');
            tableData = [
                {
                    label: UPEX.lang.template('充值方式'),
                    text: data.typeName
                },
                {
                    label: UPEX.lang.template('代收银行'),
                    text: data.bankName
                },
                {
                    label: UPEX.lang.template('充值金额'),
                    text: `${data.amount} ${UPEX.config.baseCurrencyEn}`
                }
            ];
            $operateBtn = state.isVisible ? (
                <FormItem>
                    <Button className="submit-btn" onClick={this.onSubmit.bind(this, 'go-record')}>
                        {UPEX.lang.template('已完成支付, 去查看')}
                    </Button>
                </FormItem>
            ) : (
                <FormItem>
                    <Button className="submit-btn" onClick={this.onSubmit.bind(this, 'web-success')}>
                        {UPEX.lang.template('确认并使用ATM读卡机支付')}
                    </Button>
                    <Button className="cancel-btn" onClick={this.onSubmit.bind(this, 'cancel')}>
                        {UPEX.lang.template('取消支付')}
                    </Button>
                </FormItem>
            );
        } else {
            // 实体ATM
            AlertMsg = UPEX.lang.template('請向如下賬號進行匯款完成加值，必須使用綁定的銀行卡支付');
            tableData = [
                {
                    label: UPEX.lang.template('转账金额'),
                    text: `${data.amount} ${UPEX.config.baseCurrencyEn}`
                },
                {
                    label: UPEX.lang.template('代收银行'),
                    text: data.bankName
                },
                {
                    label: UPEX.lang.template('汇款账号'),
                    text: state.cardNumber
                },
                {
                    label: UPEX.lang.template('支付截止日期'),
                    text: state.date
                }
            ];
            $operateBtn = (
                <FormItem>
                    <Button className="submit-btn" onClick={this.onSubmit.bind(this, 'go-record')}>
                        {UPEX.lang.template('已完成支付, 去查看')}
                    </Button>
                </FormItem>
            );
        }

        return (
            <FormView className={`step2 type-${data.type}`}>
                <Alert className="ace-form-tips" type="info" showIcon message={AlertMsg} type="warning" />
                <FormItem label={UPEX.lang.template('充值信息')}>
                    <TableView data={tableData} />
                    {$afterNode}
                </FormItem>

                {$operateBtn}
            </FormView>
        );
    }
}

export default View;
