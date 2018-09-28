/**
 * 支付通
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import Step2 from './step2';

@inject('fiatRechargeStore')
@observer
class FiatRechargeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            step: 1
        };
        this.inputData = {
            amount: {
                label: UPEX.lang.template('充值金额'),
                inputProps: {
                    suffix: UPEX.config.baseCurrencyEn,
                    onChange: e => {
                        this.setVal('amount', e);
                    }
                }
            }
        };
    }

    setVal(name, e) {
        let val = typeof e === 'object' ? e.target.value.trim() : e
        let data = {
            [name]: val
        };
        this.setState(data);
    }

    onSubmit() {
        const { state } = this;
        this.props.fiatRechargeStore.setCurrStep('bank-card-step2');
        this.setState({
            step: 2
        });
    }

    render() {
        const { state, inputData } = this;
        // 进入第二步
        if (state.step === 2) {
            let data = {
                amount: state.amount,
            };
            return <Step2 data={data} parentCtx={this}/>;
        }
        return (
            <FormView>
                <FormItem value={state.amount} {...inputData.amount}/>
                <FormItem>
                    <Button className="submit-btn" onClick={this.onSubmit.bind(this)}>
                        {UPEX.lang.template('下一步')}
                    </Button>
                </FormItem>
                <FormItem>
                    <div className="bottom-tips" dangerouslySetInnerHTML={{ __html: UPEX.lang.template('使用银行支付操作温馨提示,请务必使用绑定银...') }} />
                </FormItem>
            </FormView>
        );
    }
}

export default FiatRechargeView;
