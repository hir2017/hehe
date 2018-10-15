/**
 * 支付通
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Select, Radio, Icon } from 'antd';
import Action from '../action';
const Option = Select.Option;
const RadioGroup = Radio.Group;
import NumberUtils from '@/lib/util/number';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import Step2 from './step2';

@inject('fiatRechargeStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '1',
            amount: 0,
            bank: '1',
            fee: 0,
            amountLowLimit: 2, // 500
            disabled: false
        };
        this.bankList = [
            { val: '1', label: UPEX.lang.template('玉山银行'), key: 'Esun' },
            { val: '2', label: UPEX.lang.template('臺灣銀行'), key: 'BOT' },
            { val: '3', label: UPEX.lang.template('台新银行'), key: 'Taishin' },
            { val: '4', label: UPEX.lang.template('華南銀行'), key: 'HNCB' }
        ];
        this.typeList = [
            { val: '1', label: UPEX.lang.template('网络银行转账'), key: 'webatm' },
            { val: '2', label: UPEX.lang.template('ATM转账'), key: 'atm' }
        ];
        this.inputData = {
            type: {
                label: UPEX.lang.template('选择支付方式'),
                inputProps: {
                    onChange: e => {
                        this.setVal('type', e);
                    }
                }
            },
            bank: {
                label: UPEX.lang.template('充值金额'),
                inputProps: {
                    onChange: e => {
                        this.setVal('bank', e);
                    }
                }
            },
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
        // form表单数据
        this.formData = {};
        this.action = Action(this.props.fiatRechargeStore);
    }

    componentDidMount() {
        // 调接口获取最小充值金额
    }

    setVal(name, e) {
        let val = typeof e === 'object' ? e.target.value.trim() : e;
        let data = {};
        if(name === 'amount' && val !== '') {
            if(!NumberUtils.isInteger(val)) {
                return ;
            }
            val = parseInt(val);
            // 计算手续费 1% 最大13 向上取整
            let fee = val * 0.01;
            data.fee = fee >= 13 ? 13 : Math.ceil(fee);
        }
        data[name] = val;
        this.setState(data);
    }

    onSubmit() {
        const { state, typeList, bankList } = this;
        if (!this.action.validate(state, this.props.fiatRechargeStore)) {
            return;
        };
        this.setState({
            disabled: true
        })
        this.action
            .getOrderInfo({
                typeKey: typeList[state.type - 1].key,
                bankKey: bankList[state.bank - 1].key,
                amount: state.amount
            })
            .then(res => {
                if(res.status === 200) {
                    this.formData = res.attachment;
                    this.props.fiatRechargeStore.setCurrStep('spgateway-step2');
                    this.setState({
                        step: 2
                    });
                }
                this.setState({
                    disabled: false
                })
            });

    }

    render() {
        const { state, inputData, typeList, bankList } = this;
        // 进入第二步
        if (state.step === 2) {
            let data = {
                amount: state.amount,
                fee: state.fee,
                arrival: state.amount - state.fee,
                type: state.type,
                bankName: bankList[state.bank - 1].label,
                typeName: typeList[state.type - 1].label
            };
            return <Step2 data={data} formData={this.formData} parentCtx={this} />;
        }
        // 第一步，填写信息
        let $fee = <div className="fee-tip" dangerouslySetInnerHTML={{__html: UPEX.lang.template('手续费 {count} {unit}/笔', { count: state.fee, unit: UPEX.config.baseCurrencyEn })}}></div>;
        // 转账方式红色提示
        let warnContent =
            state.type === '1'
                ? UPEX.lang.template('智付通网络转账提示:WebATM為需要晶片讀卡機...')
                : UPEX.lang.template('智付通ATM转账提示:ATM轉賬可以使用...');
        return (
            <FormView>
                <FormItem className="type" label={inputData.type.label}>
                    <RadioGroup onChange={inputData.type.inputProps.onChange} value={state.type}>
                        {typeList.map((item, i) => (
                            <Radio key={i} value={item.val}>
                                {item.label}
                            </Radio>
                        ))}
                    </RadioGroup>
                    <div className="warn-tip">
                        <Icon type="exclamation-circle" theme="outlined" />
                        {warnContent}
                    </div>
                </FormItem>
                <FormItem label={inputData.bank.label}>
                    <Select value={state.bank} onChange={inputData.bank.inputProps.onChange}>
                        {bankList.map((item, i) => (
                            <Option key={i} value={item.val}>
                                {item.label}
                            </Option>
                        ))}
                    </Select>
                </FormItem>
                <FormItem value={state.amount} {...inputData.amount} after={$fee} />
                <FormItem>
                    <Button className="exc-btn-submit" disabled={state.disabled} onClick={this.onSubmit.bind(this)}>
                        {UPEX.lang.template('下一步')}
                    </Button>
                </FormItem>
                <FormItem>
                    <div className="bottom-tips" dangerouslySetInnerHTML={{ __html: UPEX.lang.template('使用智付通支付操作温馨提示,如果您选择了AT...') }} />
                </FormItem>
            </FormView>
        );
    }
}

export default View;
