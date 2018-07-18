import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';
import { Select, Tooltip } from 'antd';
const Option = Select.Option;

export default class CardSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            show: false,
        };
    }

    render() {
        const { type, labels, setVal, cards = [], count = 0, disableFn } = this.props;
        const numProp = {
            type: 'text',
            name: 'fia_card_no_auto1',
            value: this.state.number,
            autoComplete: 'off',
            onChange: e => {
                const { value = '' } = e.target;
                // 判断正整数
                if(value !== '') {
                    if(!(/^[0-9]*[1-9][0-9]*$/.test(value))) {
                        return;
                    }
                }
                // 去除首位的0
                let temp = value.replace(/\b(0+)/gi,"");
                let _data = {
                    number: temp
                };
                // 提现超出余额后修正
                if(type === 'withdraw') {
                    if(parseInt(temp, 10) > parseInt(count, 10)) {
                        _data.number = count;
                        _data.show = true;
                    } else {
                        _data.show = false;
                    }
                }
                this.setState(_data);
                setVal(temp, 'balance');
            }
        };
        return (
            <div>
                <div className="rw-form-item">
                    <label className="rw-form-label">{labels.card}</label>
                    <div className="rw-form-info">
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
                        <Link to="/user/bankInfo">{UPEX.lang.template('绑定新银行卡')}</Link>
                    </div>
                </div>
                <div className="rw-form-item">
                    <label className="rw-form-label">{labels.balance}</label>
                    <div className="rw-form-info">
                        <div className="input-box">
                            {type == 'withdraw' ? (
                                <Tooltip placement="right" visible={this.state.show} title={UPEX.lang.template('已达提现最大额度')}>
                                    <input  {...numProp} />
                                </Tooltip>
                            ) : (
                                <input  {...numProp} />
                            )}

                            <i className="unit hidden">{UPEX.config.baseCurrencySymbol}</i>
                        </div>
                        {type == 'withdraw' ? <div className="balance">{UPEX.lang.template('当前余额: {count}', { count: `NT$${count}` })}</div> : null}
                    </div>
                </div>
            </div>
        );
    }
}
