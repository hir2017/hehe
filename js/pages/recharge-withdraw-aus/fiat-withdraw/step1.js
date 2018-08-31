import React from 'react';
import { Button, message, Input } from 'antd';
import { ausGetUserAvailableAmount, getUserActionLimit, getTakeCoinInfo } from '@/api/http';
import NumberUtils from '@/lib/util/number';
import AmountInfo from '@/mods/common/form/amount-info-row';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';

export default class View extends React.Component {
    constructor(props) {
        super(props);
        const { init } = props;
        this.state = {
            balance: 12,
            BSB: init.BSB || '',
            account: init.account || '',
            amount: init.amount || '',
            name: init.name || '',
            withdrawVal: 0,
            amountLowLimit: 0,
        };
        this.timmer = null;
        this.fee = 0;
        this.rate = 0;
        this.inputData = {
            name: {
                label: UPEX.lang.template('开户人'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'name')
                }
            },
            BSB: {
                label: UPEX.lang.template('银行卡清算号(BSB)'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'BSB')
                }
            },
            account: {
                label: UPEX.lang.template('收款账号(Receiving Account)'),
                inputProps: {
                    onChange: this.setVal.bind(this, 'account')
                }
            },
            amount: {
                label: UPEX.lang.template('提现金额'),
                inputProps: {
                    onChange: e => {
                        const { balance } = this.state;
                        let { value = '' } = e.target;
                        // 保留两位小数
                        if (value !== '') {
                            if (!NumberUtils.isFloatWithTwoDecimal(value)) {
                                return;
                            }
                        }
                        // 去除首位的0
                        let withdrawVal = 0;
                        let temp = ['0.', '0', '0.0'].indexOf(value) !== -1 ? value : value.replace(/^(0+)/gi, '');
                        if(temp.indexOf('.') === 0) {
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
                        withdrawVal = NumberUtils.toFixed(_data.amount * this.rate, 2);
                        _data.withdrawVal = isNaN(withdrawVal) ? '0' : withdrawVal;
                        this.setState(_data);

                    }
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
        getTakeCoinInfo(1).then(res => {
            if(res.status === 200) {
                const {detail} = res.attachment;
                this.fee = detail.fee;
                this.rate = 1 - detail.fee;

            } else {
                console.error('getTakeCoinInfo status not 200', res)
            }
        }).catch(err => {
            console.error('getTakeCoinInfo', err)
        })
        getUserActionLimit(2, 1).then(res => {
            if(res.status === 200) {
                this.setState({
                    amountLowLimit: res.attachment.limits[0].lowLimit
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
        if(state.amount < state.amountLowLimit) {
            message.error(UPEX.lang.template('提现金额小于单笔最小提现限额'));
            return false;
        }
        return true;
    }

    submit() {
        // TODO: 校验 是否小于月提现余额，输入的金额是否小于日提现余额
        const { state } = this;
        if (!this.validate(state)) {
            return;
        }
        this.props.next(2, {
            name: state.name,
            BSB: state.BSB,
            account: state.account,
            amount: state.amount
        });
    }

    // isGoogleAuth
    render() {
        const { props, state, inputData } = this;
        let $beforNode = <div className="input-right-tag">{UPEX.config.baseCurrencyEn}</div>;
        let $afterNode = (
            <AmountInfo
                left={
                    <p className="balance">
                        {UPEX.lang.template('当前余额')} <br /> {state.balance} {UPEX.config.baseCurrencyEn}
                    </p>
                }
                right={
                    <p className="balance">
                        {UPEX.lang.template('入账金额')} <br /> <em>{state.withdrawVal}</em> {UPEX.config.baseCurrencyEn}
                    </p>
                }
            />
        );
        return (
            <FormView>
                <FormItem {...inputData.name} value={state.name} />
                <FormItem {...inputData.BSB} value={state.BSB} />
                <FormItem {...inputData.account} value={state.account} />
                <FormItem label={inputData.amount.label} className="amount" before={$beforNode} after={$afterNode}>
                    {state.amount ? null : (
                        <span className="ie11-placeholder-hack">
                            {UPEX.lang.template('最小提现金额为{count}', {
                                count: `${state.amountLowLimit}${UPEX.config.baseCurrencyEn}`
                            })}
                        </span>
                    )}
                    <Input  className="exc-input" {...inputData.amount.inputProps} value={state.amount}/>
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
