/**
 * 资产列表
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Checkbox, Icon, message, Input } from 'antd';
import { Link, browserHistory } from 'react-router';
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
            $content = <div className="mini-tip">{UPEX.lang.template('暂无数据')}</div>;
        } else {
            $content = <AssetsListView />;
        }

        return (
            <div className="account-list">
                <div className="account-filter-box">
                    <div className="filter-radio">
                        <Checkbox onChange={this.onChangeCheckBox}>{UPEX.lang.template('隐藏资产为０的货币')}</Checkbox>
                    </div>
                    <div className="filter-input">
                        <Search onChange={this.handleSearch} placeholder={UPEX.lang.template('搜索数字币')} />
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
                                    <dd className="freeze">{UPEX.lang.template('委托冻结')}</dd>
                                    <dd className="value">{UPEX.lang.template('价值')}({UPEX.config.baseCurrencyEn})</dd>
                                    <dd className="actions">{UPEX.lang.template('操作')}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div className="table-bd">
                        {$content}
                        {store.isFetching ? <div className="mini-loading" /> : null}
                    </div>
                </div>
            </div>
        );
    }
}

@inject('accountStore', 'userInfoStore')
@observer
class AssetsListView extends Component {
    handleCoinRecharge = (item, e) => {
        browserHistory.push(`/account/coin/recharge/${item.currencyNameEn}`);
    };

    handleCoinWithdraw = (item, e) => {
        browserHistory.push(`/account/coin/withdraw/${item.currencyNameEn}`);
    };

    handleCoinTrade = (item, e) => {
        browserHistory.push(`/webtrade/TWD_${item.currencyNameEn}`);
    };

    ValToFixed(val) {
        // toFixed 四舍五入有bug
        let temp = parseFloat(val);
        if (isNaN(temp) || temp === 0) {
            return '0.00'
        }
        let str = temp.toString();
        let index = str.indexOf('.')
        if(index === -1) {
            return str + '.00';
        }
        // 1.1 1.11 1.1111; 1.0过不了第一步
        let distance = str.length - str.indexOf('.');
        switch (distance) {
            // 1.11
            case 3:
                return str;
                break;
            // 1.1
            case 2:
                return str + '0';
            break;
            default:
                return str.substring(0, str.indexOf('.') + 3);
        }

    }

    render() {
        return (
            <ul>
                {this.props.accountStore.coinList.map((item, index) => {
                    return (
                        <li key={index}>
                            <dl>
                                <dd className="name">
                                    <img src={`${item.icoUrl}`} alt="" />
                                    {item.currencyNameEn}
                                </dd>
                                <dd className="total">{item.amount}</dd>
                                <dd className="balance">{item.cashAmount}</dd>
                                <dd className="freeze">{item.freezeAmount}</dd>
                                <dd className="value">{this.ValToFixed(item.twd_value)}</dd>
                                <dd className="actions">
                                    <button onClick={this.handleCoinRecharge.bind(this, item)}>{UPEX.lang.template('充币')}</button>
                                    <span className="split">|</span>
                                    <button onClick={this.handleCoinWithdraw.bind(this, item)}>{UPEX.lang.template('提币')}</button>
                                    <span className="split">|</span>
                                    <button onClick={this.handleCoinTrade.bind(this, item)}>{UPEX.lang.template('交易')}</button>
                                </dd>
                            </dl>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default List;
