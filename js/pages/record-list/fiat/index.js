/**
 * @fileoverview 充值&提现记录
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Breadcrumb } from 'antd';
const Option = Select.Option;
import RecordList from './list';

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
        let store = this.props.fundChangeRecordStore;

        return (
            <div className="order-wrapper">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item><a href="/home">{UPEX.config.sitename}</a></Breadcrumb.Item>
                    <Breadcrumb.Item>{UPEX.lang.template('资产管理')}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="order-body-inner coin-list">
                    <div className="order-header">
                        <h2>{ UPEX.lang.template('资金变动记录')}</h2>
                        <div className="type-select">
                            <Select defaultValue="all" onChange={val => {store.setDataType(val)}}>
                               <Option value="all">
                                    {UPEX.lang.template('全部')}
                                </Option>
                                <Option value="recharge">
                                    {UPEX.lang.template('充值')}
                                </Option>
                                <Option value="withdraw">
                                    {UPEX.lang.template('提现')}
                                </Option>
                            </Select>
                        </div>
                    </div>
                    <div className="order-main">
                        <div className="order-main-box"><RecordList /></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecordPage;
