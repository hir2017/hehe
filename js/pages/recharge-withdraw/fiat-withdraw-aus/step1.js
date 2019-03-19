import React from 'react';
import {Button, message, Input, Icon} from 'antd';
import {ausGetUserAvailableAmount, getUserActionLimit, getTakeCoinInfo} from '@/api/http';
import NumberUtils from '@/lib/util/number';
import AmountInfo from '@/mods/common/form/amount-info-row';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import {ausComputeFee} from "@/mods/recharge-withdraw/util";
import ComplianceModal from '@/mods/recharge-withdraw/compliance-modal';

export default class View extends React.Component {
    constructor(props) {
        super(props);
        const {init} = props;
        this.state = {
            balance: 12,
            BSB: init.BSB || '',
            account: init.account || '',
            amount: init.amount || '',
            name: init.name || '',
            withdrawVal: 0,
            fee: 0,
            amountLowLimit: 0,
            amountHighLimit: 0,
        };
        this.timmer = null;
        this.fee = 0;
        this.rate = 0;
        let actionDisabled = props.actionStatus === 2;
        this.inputData = {
            name: {
                label: UPEX.lang.template('开户人'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'name'),
                    disabled: actionDisabled
                }
            },
            BSB: {
                label: UPEX.lang.template('银行卡清算号(BSB)'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'BSB'),
                    disabled: actionDisabled
                }
            },
            account: {
                label: UPEX.lang.template('收款账号(Receiving Account)'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'account'),
                    disabled: actionDisabled
                }
            },
            amount: {
                label: UPEX.lang.template('提现金额'),
                inputProps: {
                    onChange: e => {
                        const {balance} = this.state;
                        let {value = ''} = e.target;
                        // 保留两位小数
                        if (value !== '') {
                            if (!NumberUtils.isFloatWithTwoDecimal(value)) {
                                return;
                            }
                        }
                        // 去除首位的0
                        let withdrawVal = 0;
                        let temp = ['0.', '0', '0.0'].indexOf(value) !== -1 ? value : value.replace(/^(0+)/gi, '');
                        if (temp.indexOf('.') === 0) {
                            temp = '0' + temp;
                        }
                        let _data = {
                            amount: temp
                        };
                        // 提现超出余额后修正
                        if (parseInt(temp, 10) > parseFloat(balance, 10)) {
                            _data.amount = parseFloat(balance, 10);
                            temp = parseFloat(balance, 10);
                            _data.show = true;
                        } else {
                            _data.show = false;
                        }

                        _data.fee = ausComputeFee(_data.amount, this.props.feeInfo);

                        if (this.props.feeInfo.feeType === 1) {
                            _data.withdrawVal = (_data.amount < _data.fee ? 0 : (_data.amount - _data.fee).toFixed(2));
                        } else {
                            _data.withdrawVal = ((_data.amount * 100 - _data.fee * 100) / 100).toFixed(2);
                        }

                        _data.withdrawVal = isNaN(_data.withdrawVal) ? 0 : _data.withdrawVal;

                        this.setState(_data);

                    },
                    disabled: actionDisabled
                }
            }
        };
    }

    componentWillMount() {
        // 获取账号信息
        ausGetUserAvailableAmount().then(data => {
            if (data.status == 200) {
                this.setState({
                    balance: parseFloat(NumberUtils.toFixed(data.attachment, 2))
                });
            }
        });
        // 获取法币信息，费率，充值限制
        /* getTakeCoinInfo(1).then(res => {
             if (res.status === 200) {
                 const {detail} = res.attachment;
                 this.fee = detail.fee;
                 this.rate = 1 - detail.fee;

             } else {
                 console.error('getTakeCoinInfo status not 200', res)
             }
         }).catch(err => {
             console.error('getTakeCoinInfo', err)
         })*/
        getUserActionLimit(2, 1).then(res => {
            if (res.status === 200) {
                this.setState({
                    amountLowLimit: res.attachment.limits[0].lowLimit,
                    amountHighLimit: res.attachment.limits[0].highLimit
                })

            } else {
                console.error('getUserActionLimit status not 200', res)
            }
        }).catch(err => {
            console.error('getUserActionLimit', err)
        })
    }

    setVal(name, e) {
        this.setState({
            [name]: typeof e === 'object' ? e.target.value.trim() : e
        });
    }

    validate(state) {

        if (state.name === '') {
            message.error(UPEX.lang.template('请填写开户人'));
            return false;
        }
        if (state.BSB === '') {
            message.error(UPEX.lang.template('请填写银行卡清算号'));
            return false;
        }
        if (state.account === '') {
            message.error(UPEX.lang.template('请填写收款账号'));
            return false;
        }
        // TODO:
        if (state.amount === '' || state.amount == 0) {
            message.error(UPEX.lang.template('请填写提现金额'));
            return false;
        }

        if (state.amount <= this.props.feeInfo.fee){
            message.error(UPEX.lang.template('提现金额不能小于手续费'));
            return false;
        }

            if (state.amount < state.amountLowLimit) {
                message.error(UPEX.lang.template('提现金额小于单笔最小提现限额'));
                return false;
            }
        if (state.amount > state.amountHighLimit) {
            message.error(UPEX.lang.template('提现金额大于单笔最大提现限额'));
            return false;
        }
        return true;
    }

    submit() {
        const {state, props} = this;
        // 检测用户行为
        if (props.actionStatus === 2) {
            message.error(UPEX.lang.template('此功能暂停，请稍后再试'));
            return false;
        }

        if (!this.validate(state)) {
            return;
        }
        this.props.next(2, {
            name: state.name,
            BSB: state.BSB,
            account: state.account,
            amount: state.amount,
            withdrawVal: state.withdrawVal,
            fee: state.fee
        });
    }

    // isGoogleAuth
    render() {
        const {props, state, inputData} = this;
        console.log(props.feeInfo)
        let $beforNode = <span className="exc-unit">{UPEX.config.baseCurrencyEn}</span>;
        let $afterNode = (
            <AmountInfo
                left={
                    <p className="balance">
                        <span
                            className="text">{UPEX.lang.template('当前余额')}</span><em>{state.balance}</em> {UPEX.config.baseCurrencyEn}
                    </p>
                }
                right={
                    <p className="balance">
                        <span
                            className="text">{UPEX.lang.template('入账金额')}</span><em>{state.withdrawVal}</em> {UPEX.config.baseCurrencyEn}
                    </p>
                }
            />
        );
        return (
            <FormView>
                {/* <ComplianceModal></ComplianceModal> */}
                <FormItem {...inputData.name} value={state.name}/>
                <FormItem {...inputData.BSB} value={state.BSB}/>
                <FormItem {...inputData.account} value={state.account}/>
                <FormItem label={inputData.amount.label} className="amount" after={$afterNode}>
                    {state.amount ? null : (
                        <span className="ie11-placeholder-hack">
                            {UPEX.lang.template('最小提现金额为{count}', {
                                count: `${state.amountLowLimit}${UPEX.config.baseCurrencyEn}`
                            })}
                        </span>
                    )}
                    <Input className="exc-input" {...inputData.amount.inputProps} value={state.amount}
                           suffix={$beforNode}/>
                    {
                        props.feeInfo.feeType === 1 ? <div className="warn-tip">
                            <Icon type="exclamation-circle" theme="outlined"/>
                            {UPEX.lang.template('提现手续费为固定值提示{num}', {num: props.feeInfo.fee})}
                        </div> : null
                    }
                </FormItem>
                <FormItem>
                    <Button className="submit-btn" onClick={this.submit.bind(this)}>
                        {UPEX.lang.template('下一步')}
                    </Button>
                </FormItem>
            </FormView>
        );
    }
}
