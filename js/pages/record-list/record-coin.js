/**
 * @fileoverview 数字记录：充币＋提现记录
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Breadcrumb } from 'antd';
const Option = Select.Option;

import RechargeRecordList from '../../mods/record-list/coin-recharge-record';
import WidthdrawRecordList from '../../mods/record-list/coin-withdraw-record';

@inject('accountStore')
@observer
class RecordPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            type: 'recharge'
        }
    }
    componentDidMount(){
        let store = this.props.accountStore;

        store.getUserCoinAccount();
    }

    handleChange=(value)=>{
        this.setState({
            type: value
        });
    }

    render() {
        let $list;

        switch(this.state.type) {
            case 'recharge':
                $list = <RechargeRecordList/>;
                break;
            case 'withdraw':
                $list = <WidthdrawRecordList/>;
                break;
        }

        return (
        	<div className="order-wrapper">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>ACE</Breadcrumb.Item>
                    <Breadcrumb.Item>{UPEX.lang.template('资产管理')}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="order-body-inner coin-list">
                    <div className="order-header">
                    	<h2>{ UPEX.lang.template('充提币记录')}</h2>
                        <div className="type-select">
    						<Select value={this.state.type} onChange={this.handleChange}>
    					    	<Option value="recharge">{ UPEX.lang.template('充币记录')}</Option>
    					    	<Option value="withdraw">{ UPEX.lang.template('提币记录')}</Option>
    					    </Select>
                        </div>
                    </div>
                    <div className="order-main">
                        <div className="order-main-box">{ $list }</div>
                    </div>
                </div>
        	</div>
        )
    }
}

export default RecordPage;
