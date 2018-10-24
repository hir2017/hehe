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
import PageWrapper from '@/components/wrapper/full-page';

@inject('accountStore', 'fundChangeRecordStore')
@observer
class RecordPage extends Component {
    constructor(props) {
        super(props);
        this.pageInfo = {
            title: UPEX.lang.template('资金变动记录'),
            className: 'content-no-pad'
        };
    }

    componentDidMount() {
        let store = this.props.accountStore;

        store.getUserCoinAccount();
    }

    render() {
        let store = this.props.fundChangeRecordStore;
        let after = (
            <Select
                defaultValue="all"
                onChange={val => {
                    store.setDataType(val);
                }}
            >
                <Option value="all">{UPEX.lang.template('全部')}</Option>
                <Option value="recharge">{UPEX.lang.template('充值')}</Option>
                <Option value="withdraw">{UPEX.lang.template('提现')}</Option>
            </Select>
        );
        return (
            <div className="assets-change">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <a href="/home">{UPEX.config.sitename}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{UPEX.lang.template('资产管理')}</Breadcrumb.Item>
                </Breadcrumb>
                <PageWrapper {...this.pageInfo} headerAfter={after}>
                    <RecordList />
                </PageWrapper>
            </div>
        );
    }
}

export default RecordPage;
