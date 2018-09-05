import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Input, Icon, Checkbox } from 'antd';
const Search = Input.Search;

@inject('homeStore')
@observer
class MarketCoinList extends Component {
	constructor(props){
		super(props);
	}

    componentWillUnmount() {
        
    }

	sortHandle=(field, e)=>{
        this.props.homeStore.marketListStore.sortByCondition(field);
	}

	selectCoin=(item, e)=>{ 
        if ($(e.target).parents('.action').length > 0) {
            return;
        }

        if ($(e.target).hasClass('symbol') || $(e.target).parents('.symbol').length > 0) {
            browserHistory.push(`/webtrade/${item.baseCurrencyNameEn}_${item.currencyNameEn}`);
        } else {
            this.props.homeStore.marketListStore.updateCurrency(item);    
        }
	}

	sortIcon(show) {
        if (!show) {
            return <i className="exc-arrow-double"/>;
        }

        if (this.props.homeStore.marketListStore.sortByType == 'asc') {
            return <i className="exc-arrow-up"/>
        } else {
            return <i className="exc-arrow-down"/>
        }
    }

    collecthandle=(e, data)=>{
        this.props.homeStore.marketListStore.toggleCollectCoin(data);
    }

    collectIcon(data) {
        const collectCoinsList = this.props.homeStore.marketListStore.collectCoinsList;
        
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

        if(res) {
            return <i onClick={e => this.collecthandle(e, data)} className="exc-star selected" />;
        } else {
            return <i onClick={e => this.collecthandle(e, data)} className="exc-star-o" />;
        }
        
    }

	render(){
        let marketListStore = this.props.homeStore.marketListStore;
		
		return (
			<div className="coin-list">
				<div className="coin-list-content">
					<div className="">
						<div className="table-header">
							<ul>
                                <li key="header">
                                    <div className="cell name">{UPEX.lang.template('币种')}</div>
                                    <div className="cell amount">
                                        <span onClick={this.sortHandle.bind(this,'currentAmount')}>{UPEX.lang.template('最新价')}{this.sortIcon(marketListStore.sortByKey === 'currentAmount')}</span>
                                    </div>
                                    <div className="cell rate">
                                        <span onClick={this.sortHandle.bind(this, 'changeRate')}>{UPEX.lang.template('24h涨跌')}{this.sortIcon(marketListStore.sortByKey=== 'changeRate')}</span>
                                    </div>
                                    <div className="cell volume">
                                        <span onClick={this.sortHandle.bind(this, 'volume')}>{UPEX.lang.template('24h成交量')}{this.sortIcon(marketListStore.sortByKey === 'volume')}</span>
                                    </div>
                                    <div className="cell action">{UPEX.lang.template('收藏')}</div>
                                </li>
	                        </ul>
                        </div>
                        <div className="table-body">
                            <ul>
                                {
                                    marketListStore.selectedCurrencies.map((item, index) => {
                                    	let path, ratecolor, trendIcon, trendColor;
                                    	
                                    	if (item.baseCurrencyNameEn && item.currencyNameEn) {
                                    		path = `/webtrade/${item.baseCurrencyNameEn}_${item.currencyNameEn}`;	
                                    	} 

                                        if (item.changeRate >= 0 ) {
                                            ratecolor = 'greenrate';
                                        } else {
                                            ratecolor = 'redrate';
                                        }

                                        if (item.currentAmount >= item.previousPrice) {
                                            trendColor = 'greenrate';
                                            trendIcon = <i className="exc-arrow-up"/>;
                                        } else {
                                            trendColor = 'redrate';
                                            trendIcon = <i className="exc-arrow-down"/>;
                                        }

                                        return (
                                            <li className={`clearfix${item.currencyNameEn === marketListStore.selectedCurrency.currencyNameEn ? ' selected': ''}`} key={item.key} onClick={this.selectCoin.bind(this, item)}>
                                                <span className="cell name">
                                                    <img src={`${item.icoUrl}`} alt="" />
                                                    <span className="symbol">{item.currencyNameEn || '--'}<i>&nbsp;/&nbsp;{item.baseCurrencyNameEn}</i></span>
                                                </span>
                                                <span className={`cell amount`}>
                                                    {item.currentAmountText}
                                                </span>
                                                <span className={`cell rate ${ratecolor}`}>{item.changeRateText}</span>
                                                <span className="cell volume">{item.volumeText}</span>
                                                <span className="cell action">{this.collectIcon(item)}</span>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
					</div>
				</div>
			</div>
		)
	}
}

export default MarketCoinList;