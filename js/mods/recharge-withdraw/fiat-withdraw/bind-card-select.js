import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';
import { Select, Tooltip } from 'antd';
import FormItem from '@/mods/common/form/item';
const Option = Select.Option;
import {aceComputeFee} from '@/mods/recharge-withdraw/util';

export default class CardSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            show: false,
            fee: 0
        };
    }

    render() {
        const { state, props } = this;
        const { type, labels, setVal, cards = [], count = 0, disableFn } = this.props;
        const numProp = {
            label: labels.balance,
            inputProps: {
                onChange: e => {
                    const { value = '' } = e.target;
                    // 判断正整数
                    if (value !== '') {
                        if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
                            return;
                        }
                    }
                    // 去除首位的0
                    let temp = value.replace(/\b(0+)/gi, '');
                    let _data = {
                        number: temp
                    };
                    // 提现超出余额后修正
                    if (parseInt(temp, 10) > parseFloat(count, 10)) {
                        _data.number = count;
                        temp = count;
                        _data.show = true;
                    } else {
                        _data.show = false;
                    }
                    let localFee = aceComputeFee(temp, this.props.feeInfo);
                    _data.fee = localFee;
                    this.setState(_data);
                    setVal(temp, 'balance');
                },
                value: this.state.number,
            }
        };
        let $before =
            state.number === '' ? <span className="placeholder-hack">{UPEX.lang.template('最小提现金额为 {num}', { num: props.lowLimit })}</span> : null;
        let $after = (
            <div className="fee-tip">
                {UPEX.lang.template('当前余额: {count}', { count: `${count} ${UPEX.config.baseCurrencyEn}` })}
                <span className="fee" dangerouslySetInnerHTML={{__html: UPEX.lang.template('手续费 {count} {unit}/笔', { count: state.fee, unit: UPEX.config.baseCurrencyEn })}} />
            </div>
            );
        return (
            <div>
                <FormItem label={labels.card}>
                    <Select
                        notFoundContent={UPEX.lang.template('无')}
                        placeholder={UPEX.lang.template('请选择一张绑定的银行账号')}
                        onChange={val => {
                            setVal(val, 'selectedCard');
                        }}
                    >
                        {cards.map((cur, index) => {
                            return <Option key={index} value={cur.id}>{`${cur.openBank}(${cur.cardNo})`}</Option>;
                        })}
                    </Select>
                    <Link className="add-card" to="/user/bankInfo">
                        {UPEX.lang.template('绑定新银行卡')}
                    </Link>
                </FormItem>
                <FormItem {...numProp} after={$after} before={$before} />
            </div>
        );
    }
}
