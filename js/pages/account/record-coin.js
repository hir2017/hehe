/**
 * @fileoverview 充币&提现记录
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
const Option = Select.Option;

import RecordList from '../../mods/account/record-coin';

@inject('accountStore')
@observer
class RecordPage extends Component {
    componentDidMount(){
        let store = this.props.accountStore;

        store.getUserCoinAccount();
    }

    handleChange=(value)=>{

    }

    render() {
        return (
        	<div className="account-coinrecord">
                <div className="account-coinrecord-hd">
                	<h2>{ UPEX.lang.template('充提币记录')}</h2>
                	<div className="account-coinrecord-select">
						<Select defaultValue="all" onChange={this.handleChange}>
					    	<Option value="all">{ UPEX.lang.template('全部记录')}</Option>
					    	<Option value="recharge">{ UPEX.lang.template('充值记录')}</Option>
					    	<Option value="trade">{ UPEX.lang.template('交易记录')}</Option>
					    	<Option value="withdraw">{ UPEX.lang.template('提币记录')}</Option>
					    </Select>
					</div>
                </div>
                <div className="account-coinrecord-bd">
                	<RecordList/>
                </div>
        	</div>
        )
    }
}

export default RecordPage;