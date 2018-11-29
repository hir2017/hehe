import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Input, Icon, Checkbox } from 'antd';
const Search = Input.Search;

@inject('tradeStore')
@observer
class MarketCoinList extends Component {
    constructor(props) {
        super(props);
    }

    sortHandle = (field, e) => {
        this.props.tradeStore.marketListStore.sortByCondition(field);
    };

    handleCurrency = (item, e) => {

        if ($(e.target).parents('.action').length > 0) {
            return;
        }

        const store = this.props.tradeStore;
        const TradeCoin = store.currentTradeCoin;
        // 更新币对不是当前币对， 否则清空数据
        if(item.baseCurrencyNameEn !== TradeCoin.baseCurrencyNameEn || item.currencyNameEn !== TradeCoin.currencyNameEn) {
            // 清空市场交易记录
            store.updateTradeHistory({ content: [] });
            // 更新K线图币对信息-NameEn, 其余为默认
            store.updateCurrentTradeCoin({
                currencyNameEn: item.currencyNameEn,
                baseCurrencyNameEn: item.baseCurrencyNameEn,
                currentTradeCoin: '--',
                currentAmountText: '--',
                highPriceText: '--',
                lowPriceText: '--',
                volumeText: '--',
            });
            // this.props.tradeStore.updateCurrentTradeCoinNameEn({
            //     currencyNameEn: item.currencyNameEn,
            //     baseCurrencyNameEn: item.baseCurrencyNameEn
            // });
        }


        browserHistory.push(`/webtrade/${item.baseCurrencyNameEn}_${item.currencyNameEn}`);
    };

    sortIcon(show) {
        if (!show) {
            return null;
        }

        if (this.props.tradeStore.marketListStore.sortByType == 'asc') {
            return <Icon type="arrow-up" style={{ fontSize: 12 }} />;
        } else {
            return <Icon type="arrow-down" style={{ fontSize: 12 }} />;
        }
    }

    collecthandle = (e, data) => {
        this.props.tradeStore.marketListStore.toggleCollectCoin(data);
    };

    collectIcon(data) {
        const collectCoinsList = this.props.tradeStore.marketListStore.collectCoinsList;

        const res = collectCoinsList.some(item => {
            if (item.tradeCurrencyId === data.currencyId && item.baseCurrencyId === data.baseCurrencyId) {
                return true;
            }
        });

        if (res) {
            data.selected = true;
        } else {
            data.selected = false;
        }

        if (res) {
            return <i onClick={e => this.collecthandle(e, data)} className="exc-star selected" />;
        } else {
            return <i onClick={e => this.collecthandle(e, data)} className="exc-star-o" />;
        }
    }

    render() {
        let store = this.props.tradeStore;
        let marketListStore = this.props.tradeStore.marketListStore;

        return (
            <div className="coin-list">
                <div className="coin-list-content">
                    <div className="">
                        <div className="table-header">
                            <ul>
                                <li key="header">
                                    <div className="cell name">{UPEX.lang.template('币种')}</div>
                                    <div className="cell amount">
                                        <span onClick={this.sortHandle.bind(this, 'currentAmount')}>
                                            {UPEX.lang.template('最新价')} {this.sortIcon(marketListStore.sortByKey === 'currentAmount')}
                                        </span>
                                    </div>
                                    <div className="cell rate">
                                        <span onClick={this.sortHandle.bind(this, 'changeRate')}>
                                            {UPEX.lang.template('24h涨跌')}
                                            {this.sortIcon(marketListStore.sortByKey === 'changeRate')}
                                        </span>
                                    </div>
                                    <div className="cell volume">
                                        <span onClick={this.sortHandle.bind(this, 'volume')}>
                                            {UPEX.lang.template('24h成交量')}
                                            {this.sortIcon(marketListStore.sortByKey === 'volume')}
                                        </span>
                                    </div>
                                    <div className="cell action">{UPEX.lang.template('收藏')}</div>
                                </li>
                            </ul>
                        </div>
                        <div className="table-body">
                            <ul>
                                {marketListStore.selectedCurrencies.map((item, index) => {
                                    let path, ratecolor, trendIcon, trendColor;

                                    if (item.baseCurrencyNameEn && item.currencyNameEn) {
                                        path = `/webtrade/${item.baseCurrencyNameEn}_${item.currencyNameEn}`;
                                    }

                                    if (item.changeRate >= 0) {
                                        ratecolor = 'greenrate';
                                    } else {
                                        ratecolor = 'redrate';
                                    }

                                    if (item.currentAmount >= item.previousPrice) {
                                        trendColor = 'greenrate';
                                        trendIcon = <Icon type="arrow-up" style={{ fontSize: 12 }} />;
                                    } else {
                                        trendColor = 'redrate';
                                        trendIcon = <Icon type="arrow-down" style={{ fontSize: 12 }} />;
                                    }

                                    return (
                                        <li
                                            className={`clearfix${item.currencyNameEn === marketListStore.selectedCurrency.currencyNameEn ? ' selected' : ''}`}
                                            key={item.key}
                                            onClick={this.handleCurrency.bind(this, item)}
                                        >
                                            <span className="cell name">
                                                <span className="symbol">
                                                    {item.currencyNameEn || '--'}&nbsp;/&nbsp;{item.baseCurrencyNameEn}
                                                </span>
                                            </span>
                                            <span className={`cell amount`}>{item.currentAmountText}</span>
                                            <span className={`cell rate ${ratecolor}`}>{item.changeRateText}</span>
                                            <span className="cell volume">{item.volumeText}</span>
                                            <span className="cell action">{this.collectIcon(item)}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MarketCoinList;
