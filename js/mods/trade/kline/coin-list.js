/**
 * @fileoverview 币种信息
 * @author 陈立英
 * @date 2018-05-010
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Icon, Checkbox } from 'antd';

import CoinCollectBtn from './coin-collect-btn';

@inject('tradeStore')
@observer
class CoinList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showCollected: false
        }
    }

    handleSearch = e => {
        let el = $(e.currentTarget);
        let val = el.val();

        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.tradeStore.filterByName(val);
        }, 100);
    };

    handleCurrency = (item, e) => {
        browserHistory.push('/trade/' + item.baseCurrencyNameEn + '_' + item.currencyNameEn);
    };

    sortByCondition(condition) {
        this.props.tradeStore.sortByCondition(condition);
    }

    handleCollectCoin(data, selected) {
        this.props.tradeStore.toggleCollectCoins(data, selected)
    }

    // handleToggleCollectAll(e) {
    //     this.props.tradeStore.toggleCollectCoins(e.target.checked)
    // }

    handleToggleCollectDisplay(e) {
        this.setState({
            showCollected: e.target.checked
        })
    }

    render() {
        let store = this.props.tradeStore;
        let collectCoins = store.collectCoins
        return (
            <div className="coin-list">
                <div className="coin-list-hd clearfix">
                    <div className="search">
                        <Icon type="search" />
                        <input type="text" onChange={this.handleSearch} placeholder={UPEX.lang.template('搜索数字币')} />
                    </div>
                    <div className="tab">
                        <Checkbox defaultChecked={this.state.showCollected} onChange={this.handleToggleCollectDisplay.bind(this)}>{UPEX.lang.template('收藏')}</Checkbox>
                    </div>
                </div>
                <div className="coin-list-bd">
                    <dl className="list-hd">
                        <dt className="clearfix">
                            <div className="cell star">{UPEX.lang.template('收藏')}</div>
                            <div className="cell name">{UPEX.lang.template('币种')}</div>
                            <div className="cell price" onClick={this.sortByCondition.bind(this, 'currentAmount')}>
                                {UPEX.lang.template('价格')}
                                {store.sortByKey == 'currentAmount' ? <Icon type={store.sortByType == 'asc' ? 'arrow-up' : 'arrow-down'} /> : null}
                            </div>
                            <div className="cell rate" onClick={this.sortByCondition.bind(this, 'changeRate')}>
                                {UPEX.lang.template('涨跌')}
                                {store.sortByKey == 'changeRate' ? <Icon type={store.sortByType == 'asc' ? 'arrow-up' : 'arrow-down'} /> : null}
                            </div>
                            <div className="cell volume" onClick={this.sortByCondition.bind(this, 'volume')}>
                                {UPEX.lang.template('24H成交量')}
                                {store.sortByKey == 'volume' ? <Icon type={store.sortByType == 'asc' ? 'arrow-up' : 'arrow-down'} /> : null}
                            </div>
                        </dt>
                    </dl>
                    <dl className={`list ${this.state.showCollected ? 'collected' : ''}`}>
                        {store.loginedMarkets &&
                            store.loginedMarkets.tradeCoins.map((item, index) => {
                                let selected = collectCoins.indexOf([item.baseCurrencyId, item.currencyId].join('--')) !== -1
                                return (
                                    <dd key={item.id} className={`${selected} clearfix`}>
                                        <div className="cell star">
                                            <CoinCollectBtn data={item} selected={selected} clickCb={this.handleCollectCoin.bind(this)} />
                                        </div>
                                        <div className="cell name" onClick={this.handleCurrency.bind(this, item)}>
                                            {item.currencyNameEn}
                                        </div>
                                        <div className="cell price" onClick={this.handleCurrency.bind(this, item)}>
                                            {item.currentAmount}
                                        </div>
                                        <div
                                            className={item.changeRate.indexOf('+') >= 0 ? 'cell rate greenrate' : 'cell rate redrate'}
                                            onClick={this.handleCurrency.bind(this, item)}
                                        >
                                            {item.changeRate}
                                        </div>
                                        <div className="cell volume" onClick={this.handleCurrency.bind(this, item)}>
                                            {item.volume}
                                        </div>
                                    </dd>
                                );
                            })}
                    </dl>
                </div>
            </div>
        );
    }
}

export default CoinList;
