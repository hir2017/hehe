import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Input, Icon, Checkbox } from 'antd';
const Search = Input.Search;

@inject('tradeStore')
@observer
class MarketCoinList extends Component {
	constructor(props){
		super(props);
	}

    componentWillUnmount() {
        
    }

	sortHandle=(field, e)=>{
        this.props.tradeStore.marketListStore.sortByCondition(field);
	}

	selectCoin=(item, e)=>{ 
        if ($(e.target).hasClass('anticon')) {
            return;
        }

        if ($(e.target).hasClass('symbol')) {
            browserHistory.push(`/webtrade/${item.baseCurrencyNameEn}_${item.currencyNameEn}`);
        } else {
            this.props.tradeStore.marketListStore.updateCurrency(item);    
        }
	}

	sortIcon(show) {
        if (!show) {
            return null;
        }

        if (this.props.tradeStore.marketListStore.sortByType == 'asc') {
            return <Icon type="arrow-up" style={{fontSize: 12}}/>;
        } else {
            return <Icon type="arrow-down" style={{fontSize: 12}}/>;
        }
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

        if(res) {
            return <Icon onClick={e => this.collecthandle(e, data)} style={{color: '#e6bc1d', fontSize: '14'}} type={'star'} />;
        } else {
            return <Icon onClick={e => this.collecthandle(e, data)} style={{color: '#999', fontSize: '14'}} type={'star-o'} />;
        }
        
    }

	render(){
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
                                        <span onClick={this.sortHandle.bind(this,'currentAmount')}>{UPEX.lang.template('最新价')} {this.sortIcon(marketListStore.sortByKey === 'currentAmount')}</span>
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
                                            trendIcon = <Icon type="arrow-up" style={{fontSize: 12}}/>;
                                        } else {
                                            trendColor = 'redrate';
                                            trendIcon = <Icon type="arrow-down" style={{fontSize: 12}}/>;
                                        }

                                        return (
                                            <li className={`clearfix${item.currencyNameEn === marketListStore.selectedCurrency.currencyNameEn ? ' selected': ''}`} key={item.currencyId} onClick={this.selectCoin.bind(this, item)}>
                                                <span className="cell name">
                                                    <img src={`${item.icoUrl}`} alt="" />
                                                    <span className="symbol">{item.currencyNameEn || '--'}</span>
                                                    <i> / {item.baseCurrencyNameEn}</i>
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