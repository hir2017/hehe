import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';
import { Select } from 'antd';
const Option = Select.Option;

export default class CardSelect extends Component {

    render() {
        const {type, labels, setVal, cards = [], count = 0} = this.props
        return (
            <div>
                <div className="rw-form-item">
                    <label className="rw-form-label">{labels.card}</label>
                    <div className="rw-form-info">
                        <Select
                            notFoundContent={UPEX.lang.template('无')}
                            defaultValue={UPEX.lang.template('请选择一张绑定的银行账号')}
                            onChange={val => {
                                setVal(val, 'selectedCard');
                            }}
                        >
                            {
                                cards.map((cur, index) => {
                                    return <Option key={index} value={cur.id}>{`${cur.openBank}(**** **** **** ${cur.cardNo})`}</Option>
                                })
                            }
                        </Select>
                        <Link to="/user/bankInfo">{UPEX.lang.template('绑定新银行卡')}</Link>
                    </div>
                </div>
                <div className="rw-form-item">
                    <label className="rw-form-label">{labels.balance}</label>
                    <div className="rw-form-info">
                        <div className="input-box">
                            <input
                                type="number"
                                onChange={e => {
                                    const { value = '' } = e.target;
                                    setVal(value.trim(), 'balance');
                                }}
                            />
                            <i className="unit hidden">NT$</i>
                        </div>
                        {
                            type == 'withdraw' ? <div className="balance">{UPEX.lang.template('当前余额: NT${count}', { count })}</div> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
