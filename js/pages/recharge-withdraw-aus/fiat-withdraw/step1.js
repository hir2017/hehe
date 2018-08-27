import React from 'react';
import { Button, message } from 'antd';
import { ausGetUserAvailableAmount } from '@/api/http';
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
            amount: init.amount || 0,
            name: init.name || ''
        };

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
                            let _value = parseFloat(value);
                            if (!NumberUtils.isFloatWithTwoDecimal(_value)) {
                                return;
                            }
                        }
                        // 去除首位的0
                        let temp = value.replace(/\b(0+)/gi, '');
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
                // 提现只能提现整数金额。
                this.setState({
                    balance: parseInt(data.attachment, 10)
                });
            }
        });
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
        // // TODO:
        // if(state.amount > this.props.perLimit) {
        //     message.error(UPEX.lang.template('提现金额大于单笔提现限额'));
        //     return false;
        // }
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
                        {UPEX.lang.template('入账金额')} <br /> <em>{state.amount}</em> {UPEX.config.baseCurrencyEn}
                    </p>
                }
            />
        );
        return (
            <FormView>
                <FormItem {...inputData.name} value={state.name} />
                <FormItem {...inputData.BSB} value={state.BSB} />
                <FormItem {...inputData.account} value={state.account} />
                <FormItem {...inputData.amount} value={state.amount} before={$beforNode} after={$afterNode} />
                <FormItem>
                    <Button className="submit-btn" onClick={this.submit.bind(this)}>
                        {UPEX.lang.template('下一步')}
                    </Button>
                </FormItem>
            </FormView>
        );
    }
}
