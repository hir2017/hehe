/**
 * @fileoverview 币种信息
 * @author 陈立英
 * @date 2018-05-010
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Icon, Checkbox, Input} from 'antd';
const Search = Input.Search;

@inject('tradeStore')
@observer
class CoinList extends Component {

    constructor(props) {
        super(props)
    }

    componentWillUnmount(){
        this.props.tradeStore.marketListStore.reset();
    }

    handleSearch = e => {
        let el = $(e.currentTarget);
        let val = el.val();

        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.tradeStore.marketListStore.filterByName(val);
        }, 100);
    };

    handleCurrency = (item, e) => {
        browserHistory.push('/webtrade/' + item.baseCurrencyNameEn + '_' + item.currencyNameEn);
    };

    sortByCondition(condition) {
        this.props.tradeStore.marketListStore.sortByCondition(condition);
    }

    handleCollectCoin(data, selected) {
        this.props.tradeStore.marketListStore.toggleCollectCoins(data, selected)
    }

    handleToggleCollectDisplay(e) {
        this.props.tradeStore.marketListStore.filterCollectCoins(e.target.checked);
    }

    collecthandle=(e, data)=>{
        this.props.tradeStore.marketListStore.toggleCollectCoin(data);
    }

    collectIcon(data) {
        const collectCoinsList = this.props.tradeStore.marketListStore.collectCoinsList;

        const res = collectCoinsList.some(item => {
            if (item.tradeCurrencyId === data.currencyId && item.baseCurrencyId === data.baseCurrencyId){
                return true;
            }
        });

        if (res) {
            data.selected = true;
        } else {
            data.selected = false;
        }

        return <Icon onClick={e => this.collecthandle(e, data)} style={{fontSize: 12}} type={res ? 'star' : 'star-o'} />;
    }

    sortIcon(show) {
        if (!show) {
            return null;
        }

        if (this.props.tradeStore.marketListStore.sortByType == 'asc') {
            return <Icon type='arrow-up' />
        } else {
            return <Icon type='arrow-down'/>
        }
    }



    render() {
        let store = this.props.tradeStore.marketListStore;

        return (
            <div className="coin-list">
                <div className="coin-list-hd clearfix">
                    <div className="search">
                         <Search
                            onChange={this.handleSearch}
                            value={store.searchValue}
                            placeholder={UPEX.lang.template('搜索数字币')}
                        />
                    </div>
                    <div className="tab">
                        <Checkbox checked={store.onlyCollectedCoins} onChange={this.handleToggleCollectDisplay.bind(this)}>{UPEX.lang.template('收藏')}</Checkbox>
                    </div>
                </div>
                <div className="coin-list-bd">
                    <dl className="list-hd">
                        <dt className="clearfix">
                            <div className="cell star">{UPEX.lang.template('收藏')}</div>
                            <div className="cell name">{UPEX.lang.template('币种')}</div>
                            <div className="cell price" onClick={this.sortByCondition.bind(this, 'currentAmount')}>
                                {UPEX.lang.template('价格')}
                                {this.sortIcon(store.sortByKey == 'currentAmount')}
                            </div>
                            <div className="cell rate" onClick={this.sortByCondition.bind(this, 'changeRate')}>
                                {UPEX.lang.template('涨跌')}
                                {this.sortIcon(store.sortByKey == 'changeRate')}
                            </div>
                            <div className="cell volume" onClick={this.sortByCondition.bind(this, 'volume')}>
                                {UPEX.lang.template('24h成交量')}
                                {this.sortIcon(store.sortByKey == 'volume')}
                            </div>
                        </dt>
                    </dl>
                    <dl className="list">
                        {
                            store.tradeCoins.map((item, index) => {
                                let trendIcon;
                                let trendColor;

                                if (item.currentAmount >= item.previousPrice) {
                                    trendColor = 'greenrate';
                                    trendIcon = <Icon type="arrow-up" style={{fontSize: 12}}/>;
                                } else {
                                    trendColor = 'redrate';
                                    trendIcon = <Icon type="arrow-down" style={{fontSize: 12}}/>;
                                }

                                return (
                                    <dd key={index} className={`clearfix`}>
                                        <div className="cell star">
                                            {this.collectIcon(item)}
                                        </div>
                                        <div className="cell name" onClick={this.handleCurrency.bind(this, item)}>
                                            {item.currencyNameEn || '--'}
                                        </div>
                                        <div className={`cell price`} onClick={this.handleCurrency.bind(this, item)}>
                                            {item.currentAmountText}
                                        </div>
                                        <div
                                            className={item.changeRate >= 0 ? 'cell rate greenrate' : 'cell rate redrate'}
                                            onClick={this.handleCurrency.bind(this, item)}
                                        >
                                            {item.changeRateText}
                                        </div>
                                        <div className="cell volume" onClick={this.handleCurrency.bind(this, item)}>
                                            {item.volumeText}
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
