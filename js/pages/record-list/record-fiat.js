/**
 * @fileoverview 充值&提现记录
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
const Option = Select.Option;

import RecordList from '../../mods/record-list/record-fund';

@inject('accountStore', 'fundChangeRecordStore')
@observer
class RecordPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let store = this.props.accountStore;

        store.getUserCoinAccount();
    }

    render() {
        let store = this.props.fundChangeRecordStore
        return (
            <div className="account-fiatrecord">
                <div className="account-fiatrecord-hd">
                    <h2>{UPEX.lang.template('资金变动记录')}</h2>
                    <div className="account-fiatrecord-select">
                        <Select
                            defaultValue="all"
                            onChange={val => {
                                store.setDataType(val)
                            }}
                        >
                            <Option value="all">
                                {UPEX.lang.template('全部记录')}
                            </Option>
                            <Option value="recharge">
                                {UPEX.lang.template('充值记录')}
                            </Option>
                            <Option value="withdraw">
                                {UPEX.lang.template('提现记录')}
                            </Option>
                        </Select>
                    </div>
                </div>
                <div className="account-fiatrecord-bd">
                    <RecordList />
                </div>
            </div>
        );
    }
}

export default RecordPage;
