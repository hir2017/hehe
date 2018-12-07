/**
 * 买卖盘口模块
 * @author 陈立英
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'antd';
import BuyOrderView from './buy';
import SellOrderView from './sell';
import Gtag from '@/lib/ga-analytics';

@inject('tradeStore')
@observer
class OrderBook extends Component {
    static defaultProps = {
        tabs: ['all', 'sell', 'buy']
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'all'
        };
    }

    onChangeEntrustType = type => {
        // 谷歌埋点
        Gtag.click(
            `webtradeOrderBookIn${type.replace(/\w{1}/i, str => {
                return str.toUpperCase();
            })}`
        );
        this.setState({
            selectedTab: type
        });
    };

    render() {
        let store = this.props.tradeStore;
        let selectedTab = this.state.selectedTab;

        let trendIcon,
            trendColor = '';

        if (store.currentTradeCoin && store.currentTradeCoin.currentAmount) {
            if (store.currentTradeCoin.currentAmount > store.currentTradeCoin.previousPrice) {
                trendColor = 'greenrate';
                trendIcon = <i className="exc-kline-arrow-up" />;
            } else if (store.currentTradeCoin.currentAmount < store.currentTradeCoin.previousPrice) {
                trendColor = 'redrate';
                trendIcon = <i className="exc-kline-arrow-down" />;
            }
        }
        let CurrencySymbol = UPEX.config.version === 'ace' ? UPEX.config.baseCurrencySymbol : UPEX.config.baseCurrencySymbol2;
        return (
            <div className="order-book" data-type={selectedTab}>
                <div className="list-box-hd">
                    {UPEX.lang.template('挂单簿')}
                    <ul className="tab">
                        {this.props.tabs.map((item, index) => {
                            let cls = selectedTab == item ? `${item} selected` : item;

                            return <li className={cls} key={item} onClick={this.onChangeEntrustType.bind(this, item)} />;
                        })}
                    </ul>
                </div>
                <div className="list-box-bd">
                    <div className="table-hd">
                        <div className="price">{UPEX.lang.template('价格')}</div>
                        <div className="number">{UPEX.lang.template('数量')}</div>
                        <div className="total">{UPEX.lang.template('金额')}</div>
                    </div>
                    <div className="table-bd" key={selectedTab}>
                        {selectedTab !== 'buy' ? (
                            <div className="trade-buy-box">
                                <SellOrderView ref="sellorder" />
                            </div>
                        ) : null}
                        <div className={`trade-current-amount ${trendColor}`}>
                            <div className="count">
                                <em>{store.currentTradeCoin.currentAmountText}</em>
                                {trendIcon}
                            </div>
                            {store.currentTradeCoinFiatCount ? (
                                <div className="fiat-count">
                                    {CurrencySymbol}
                                    <span className="value">{store.currentTradeCoinFiatCount}</span>
                                </div>
                            ) : null}
                        </div>
                        {selectedTab !== 'sell' ? (
                            <div className="trade-sell-box">
                                <BuyOrderView ref="buyorder" />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderBook;
