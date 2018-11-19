/**
 * @fileoverview 充值&提现&充币&提币 记录
 * @author lihaiyang
 * @date 2018-11-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Breadcrumb, Row, Col, Pagination } from 'antd';
import { browserHistory } from 'react-router';
import PageWrapper from '@/components/wrapper/full-page';
import * as listConfig from './list-config';
import List from '@/components/list';
import * as action from './action';
import SubRow from './legal-sub-row';
import CoinSubRow from './coin-sub-row';

@inject('accountStore', 'fundChangeRecordStore')
@observer
class RecordPage extends Component {
    constructor(props) {
        super(props);
        const { type } = props.routeParams;
        this.pageInfo = {
            className: 'content-no-pad'
        };
        let tabs = [
            { label: UPEX.lang.template('充值'), type: 'deposit' },
            { label: UPEX.lang.template('提现'), type: 'withdraw' },
            { label: UPEX.lang.template('充币'), type: 'coin-deposit' },
            { label: UPEX.lang.template('提币'), type: 'coin-withdraw' },
            { label: UPEX.lang.template('分发'), type: 'reward' },
        ];
        let _targetTab = tabs.some(item => item.type === type) ? type : 'deposit';

        this.state = {
            type: _targetTab,
            listProps: this.getListConfig(type).call(this),
            listData: [],
            current: 0,
            total: 0,
            pageSize: 10,
            loading: false,
            subData: {},
            subIndex: -1
        };

        this.tabNode = (
            <div className="swtich-tabs">
                {tabs.map((item, i) => (
                    <div className="tab" key={i} onClick={this.switchTab.bind(this, item)}>
                        {item.label}
                    </div>
                ))}
            </div>
        );
    }

    getListConfig(type) {
        let _type = type.replace('-', '_')
        if (_type === 'withdraw') {
            _type = 'deposit';
        }
        return listConfig[_type];
        // let _type = type || this.state.type;
        // let result = _type.replace(/\-\w/, function(match){
        //     return match.toLocaleUpperCase().replace('-', '')
        // })
        // return listConfig[this.getListConfig(result)].call(this);
    }

    updateList(type) {
        action.getList(type).then(res => {
            this.setState(res);
        });
    }

    componentDidMount() {
        this.updateList(this.state.type);
    }

    switchTab({ type }) {
        if(type === this.state.type) {
            return;
        }
        this.setState({
            type,
            listProps: this.getListConfig(type).call(this),
            listData: [],
            current: 0,
            total: 0,
            pageSize: 10,
            loading: true,
            subIndex: -1
        });
        browserHistory.push(`/account/asset-change/${type}`);
        this.updateList(type);
    }

    onChangePagination = (page) => {
        action.getList(this.state.type, page).then(res => {
            this.setState(res);
        });
    }

    detail = (subData, rowData, i)  => {
        const {type} = this.state;
        if(['deposit', 'withdraw'].indexOf(type) !== -1) {
            return <SubRow type={type} data={rowData}/>;
        } else {
            return <CoinSubRow type={type} data={rowData}/>;
        }
    }

    toggleSubRow = (row, index) => {
        let subIndex = this.state.subIndex === index ? -1 : index;
        this.setState({
            subIndex
        })
    }

    render() {
        const { state } = this;
        return (
            <div className="assets-change">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <a href="/home">{UPEX.config.sitename}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{UPEX.lang.template('资产管理')}</Breadcrumb.Item>
                </Breadcrumb>
                <PageWrapper {...this.pageInfo} headerAfter={this.tabNode}>
                    <List expandedRowRender={this.detail} {...state.listProps} className={state.type} subIndex={state.subIndex} data={state.listData}>
                        <Pagination current={state.current} total={state.total} pageSize={state.pageSize} onChange={this.onChangePagination} />
                    </List>
                </PageWrapper>
            </div>
        );
    }
}

export default RecordPage;
