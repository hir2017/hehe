/**
 * @fileoverview 充币&提现记录
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
const Option = Select.Option;

import RecordList from '../../mods/assets/record-fund';

@inject('assetsStore')
@observer
class RecordPage extends Component {
    componentDidMount(){
        let store = this.props.assetsStore;

        store.getUserCoinAccount();
    }

    handleChange=(value)=>{

    }

    render() {
        return (
        	<div className="assets-fiatrecord">
                <div className="assets-fiatrecord-hd">
                	<h2>{ UPEX.lang.template('资金变动记录')}</h2>
                	<div className="assets-fiatrecord-select">
						<Select defaultValue="all" onChange={this.handleChange}>
					    	<Option value="all">{ UPEX.lang.template('全部记录')}</Option>
					    	<Option value="recharge">{ UPEX.lang.template('充值记录')}</Option>
					    	<Option value="trade">{ UPEX.lang.template('交易记录')}</Option>
					    	<Option value="withdraw">{ UPEX.lang.template('提币记录')}</Option>
					    </Select>
					</div>
                </div>
                <div className="assets-fiatrecord-bd">
                	<RecordList/>
                </div>
        	</div>
        )
    }
}

export default RecordPage;