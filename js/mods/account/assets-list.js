/**
 * 资产列表
 */
import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Checkbox, Icon, message, Input, Tooltip} from 'antd';
import {Link, browserHistory} from 'react-router';
import {getIEOAssetsList} from '@/api/http';
import NumberUtil from '@/lib/util/number';

const Search = Input.Search;

@inject('accountStore')
@observer
class List extends Component {
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    handleSearch = e => {
        let value = e.target.value.trim();

        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.accountStore.filterByName(value);
        }, 100);
    };

    onChangeCheckBox = e => {
        let checked = e.target.checked == true;

        this.props.accountStore.filterZeroAmount(checked);
    };


    render() {
        let store = this.props.accountStore;
        let $content;

        if (!store.isFetching && store.coinList.length == 0) {
            $content = <div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无数据')}</div>;
        } else {
            $content = <AssetsListView/>;
        }

        return (
            <div className="account-list">
                <div className="account-filter-box">
                    <div className="filter-radio">
                        <Checkbox onChange={this.onChangeCheckBox}>{UPEX.lang.template('隐藏资产为０的货币')}</Checkbox>
                    </div>
                    <div className="filter-input">
                        <Search onChange={this.handleSearch} placeholder={UPEX.lang.template('搜索数字币')}/>
                    </div>
                </div>
                <div className="account-result-list">
                    <div className="table-hd">
                        <ul>
                            <li>
                                <dl>
                                    <dd className="name">{UPEX.lang.template('币种')}</dd>
                                    <dd className="total">{UPEX.lang.template('总额')}</dd>
                                    <dd className="balance">{UPEX.lang.template('可用余额')}</dd>
                                    <dd className="freeze">{UPEX.config.version === 'ace' ? UPEX.lang.template('委托冻结') : UPEX.lang.template('冻结')}</dd>
                                    <dd className="value">
                                        {UPEX.lang.template('价值')}({UPEX.config.baseCurrencyEn})
                                    </dd>
                                    <dd className="actions">{UPEX.lang.template('操作')}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div className="table-bd">
                        {$content}
                        {
                            UPEX.config.version == 'ace' ? <IEOListView/> : null
                        }
                        {store.isFetching ? <div className="mini-loading"/> : null}
                    </div>
                </div>
            </div>
        );
    }
}

@inject('accountStore', 'userInfoStore', 'commonStore')
@observer
class AssetsListView extends Component {
    handleCoinRecharge = (item, e) => {
        browserHistory.push(`/account/coin/recharge/${item.currencyNameEn}`);
    };

    handleCoinWithdraw = (item, e) => {
        browserHistory.push(`/account/coin/withdraw/${item.currencyNameEn}`);
    };

    handleCoinTrade = (item, e) => {
        browserHistory.push(`/webtrade/${UPEX.config.baseCurrencyEn}_${item.currencyNameEn}`);
    };

    render() {
        // TODO: 放到store里取计算
        const {coinsMap} = this.props.commonStore;
        const {actionRoles} = this.props.userInfoStore;
        return (
            <ul>
                {this.props.accountStore.coinList.map((item, index) => {
                    let coin = coinsMap[item.currencyNameEn] || {};
                    let btnDisable = {
                        recharge: actionRoles['recharge coin'] == 2 || coin.rechargeStatus === 2,
                        withdraw: actionRoles['withdraw coin'] == 2 || coin.withdrawStatus === 2,
                    }
                    return (
                        <li key={index}>
                            <dl>
                                <dd className="name">
                                    <img src={`${item.icoUrl}`} alt=""/>
                                    {item.currencyNameEn}
                                </dd>
                                <dd className="total">{item.amount}</dd>
                                <dd className="balance">{item.cashAmount}</dd>
                                <dd className="freeze">{item.freezeAmount}</dd>
                                <dd className="value">{item.twd_value}</dd>
                                <dd className="actions">
                                    <button type="button"
                                            title={btnDisable.recharge ? UPEX.lang.template('当前币种暂停此操作') : ''}
                                            disabled={btnDisable.recharge}
                                            onClick={this.handleCoinRecharge.bind(this, item)}>
                                        {UPEX.lang.template('充币')}
                                    </button>
                                    <span className="split">|</span>
                                    <button type="button"
                                            title={btnDisable.withdraw ? UPEX.lang.template('当前币种暂停此操作') : ''}
                                            disabled={btnDisable.withdraw}
                                            onClick={this.handleCoinWithdraw.bind(this, item)}>
                                        {UPEX.lang.template('提币')}
                                    </button>
                                    <span className="split">|</span>
                                    <button type="button" onClick={this.handleCoinTrade.bind(this, item)}>
                                        {UPEX.lang.template('交易')}
                                    </button>
                                </dd>
                            </dl>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

//IEO 资产列表
class IEOListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isFetching: 1
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        getIEOAssetsList().then(res => {
            if (res.status == 200) {
                this.setState({
                    list: res.attachment,
                    isFetching: 0
                });
            }
        }).catch(() => {
            console.log('getIEOAssetsList err');
            this.setState = {
                isFetching: 0
            }
        })
    }

    goIEODetail = (id) => {
        browserHistory.push(`/ieo/detail/${id}`);
    }

    render() {
        let {list, isFetching} = this.state;
        let $content = null;

        if (list.length > 0) {
            $content = list.map((item, i) => (
                <li key={i}>
                    <dl>
                        <dd className="name">{item.tokenName}</dd>
                        <dd className="total">{NumberUtil.formatNumber(item.tokenCount)}</dd>
                        <dd className="balance">-</dd>
                        <dd className="freeze">-</dd>
                        <dd className="value">{NumberUtil.formatNumber(item.tokenPrice)}</dd>
                        <dd className="actions">
                            <button type="button" onClick={this.goIEODetail.bind(this, item.ieoId)}>
                                {UPEX.lang.template('购买')}
                            </button>
                            <Tooltip placement="topRight" title={UPEX.lang.template('锁仓期间不可交易，等待公告')} overlayClassName="buy-tooltip">
                                <span className="tip"/>
                            </Tooltip>
                        </dd>
                    </dl>
                </li>
            ))
        }
        else if (isFetching == 0 && list.length == 0) {
            $content = <div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无IEO资产')}</div>
        }

        return (
            <div className="ieo-list">
                <div className="table-hd">
                    <ul>
                        <li>
                            <dl>
                                <dd className="name header"><em>{UPEX.lang.template('Launcher')}</em>{UPEX.lang.template('资产')}</dd>
                                <dd className="total"></dd>
                                <dd className="balance"></dd>
                                <dd className="freeze"></dd>
                                <dd className="value"></dd>
                                <dd className="actions"></dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div className="table-bd">
                    {$content}
                    {isFetching == 1 ? <div className="mini-loading"></div> : null}
                </div>
            </div>
        )
    }

}

export default List;


