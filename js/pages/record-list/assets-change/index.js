/**
 * @fileoverview 充值&提现&充币&提币 记录
 * @author lihaiyang
 * @date 2018-11-19
 */
import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Breadcrumb, Pagination} from 'antd';
import {browserHistory} from 'react-router';
import PageWrapper from '@/components/wrapper/full-page';
import * as listConfig from './list-config';
import List from '@/components/list';
import * as action from './action';
import SubRow from './legal-sub-row';
import AusSubRow from './aus-legal-sub-row';
import CoinSubRow from './coin-sub-row';


@inject('accountStore', 'fundChangeRecordStore')
@observer
class RecordPage extends Component {
    constructor(props) {
        super(props);
        const {type} = props.routeParams;
        this.pageInfo = {
            className: 'content-no-pad'
        };

        //澳洲隐藏IEO部分
        if(UPEX.config.version == 'ace'){
            this.tabs = [
                {label: UPEX.lang.template('充值记录'), type: 'deposit'},
                {label: UPEX.lang.template('提现记录'), type: 'withdraw'},
                {label: UPEX.lang.template('充币记录'), type: 'coin-deposit'},
                {label: UPEX.lang.template('提币记录'), type: 'coin-withdraw'},
                {label: UPEX.lang.template('分发记录'), type: 'reward'},
                {label: UPEX.lang.template('IEO购买记录'), type: 'ieo'}
            ];
        }else{
            this.tabs = [
                {label: UPEX.lang.template('充值记录'), type: 'deposit'},
                {label: UPEX.lang.template('提现记录'), type: 'withdraw'},
                {label: UPEX.lang.template('充币记录'), type: 'coin-deposit'},
                {label: UPEX.lang.template('提币记录'), type: 'coin-withdraw'},
                {label: UPEX.lang.template('分发记录'), type: 'reward'},
            ];
        }


        let _targetTab = this.tabs.some(item => item.type === type) ? type : 'deposit';

        this.state = {
            // 当前tab
            type: _targetTab,
            // 输入当前tab，获取对应的列表配置参数
            listProps: this.getListConfig(_targetTab).call(this),
            // 列表数据
            listData: [],
            current: 1,
            total: 0,
            pageSize: 10,
            loading: true,
            subData: {},
            subIndex: -1
        };

    }

    getListConfig(type) {
        let _type = type.replace('-', '_')
        // 充值提现使用一个列表配置参数
        if (_type === 'withdraw') {
            _type = 'deposit';
        }
        return listConfig[_type];
    }

    updateList(type) {
        this.setState({
            loading: true
        })
        action.getList(type).then(res => {
            this.setState({
                ...res,
                loading: false
            });
        });
    }

    componentDidMount() {
        this.updateList(this.state.type);
    }

    switchTab = ({type}) => {
        if (type === this.state.type) {
            return;
        }
        // tab切换，更新列表配置，清空分页信息，清除详情信息
        this.setState({
            type,
            listProps: this.getListConfig(type).call(this),
            listData: [],
            current: 1,
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
            this.setState({
                ...res,
                subIndex: -1
            });
        });
    }
    // 详情展示
    detail = (subData, rowData, i)  => {
        const {type} = this.state;
        let detail = null;
        if(['deposit', 'withdraw'].indexOf(type) !== -1) {
            // 充提现使用同一个详情模板，ace和aus的区分开
            detail = UPEX.config.version === 'ace' ? <SubRow type={type} data={rowData}/> : <AusSubRow type={type} data={rowData}/>;
        } else {
            // 充提币使用同一个详情模板，参数不同
            detail = <CoinSubRow type={type} data={rowData}/>;
        }
        return detail;
    }

    toggleSubRow = (row, index) => {
        let subIndex = this.state.subIndex === index ? -1 : index;
        this.setState({
            subIndex
        })
    }

    render() {
        const { state } = this;
        // tab标签循环获取
        let $TabNode = (
            <div className="swtich-tabs">
                {this.tabs.map((item, i) => (
                    <div className={`tab ${state.type === item.type ? 'active' : ''}`} key={i} onClick={e => {
                        this.switchTab(item)
                    }}>
                        {item.label}
                    </div>
                ))}
            </div>
        )
        return (
            <div className="assets-change">
                <Breadcrumb separator=">" className="exc-breadcrumb">
                    <Breadcrumb.Item>
                        <a href="/home">{UPEX.config.sitename}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/account">{UPEX.lang.template('资产管理')}</a></Breadcrumb.Item>
                </Breadcrumb>
                <PageWrapper {...this.pageInfo} headerAfter={$TabNode}>
                    <List expandedRowRender={this.detail} loading={state.loading} {...state.listProps}
                          className={state.type} subIndex={state.subIndex} data={state.listData}>
                        {state.total === 0 ? null :
                            <Pagination current={state.current} total={state.total} pageSize={state.pageSize}
                                        onChange={this.onChangePagination}/>}
                    </List>
                </PageWrapper>
            </div>
        );
    }
}

export default RecordPage;
