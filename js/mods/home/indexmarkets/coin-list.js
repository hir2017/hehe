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

	sortHandle=(field, e)=>{
        this.props.homeStore.marketListStore.sortByCondition(field);
	}

	selectCoin=(item, e)=>{ 
        if ($(e.target).hasClass('anticon')) {
            return;
        }

        if ($(e.target).hasClass('symbol')) {
            browserHistory.push(`/trade/${item.baseCurrencyNameEn}_${item.currencyNameEn}`);
        } else {
            this.props.homeStore.marketListStore.setSelectedCoin(item);    
        }
	}

	sortIcon(show) {
        if (!show) {
            return null;
        }

        if (this.props.homeStore.marketListStore.sortByType == 'asc') {
            return <Icon type="arrow-up" style={{fontSize: 12}}/>;
        } else {
            return <Icon type="arrow-down" style={{fontSize: 12}}/>;
        }
    }

    filterHandle=(e)=>{
        let value = e.target.value.trim();

        this.props.homeStore.marketListStore.filterByName(value);
    }

    toggleCollect=(e)=>{
        this.props.homeStore.marketListStore.filterCollectCoins(e.target.checked);
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

        return <Icon onClick={e => this.collecthandle(e, data)} style={{color: '#999', fontSize: '14'}} type={res ? 'star' : 'star-o'} />;
    }

	render(){
		let homeStore = this.props.homeStore;
        let marketListStore = this.props.homeStore.marketListStore;
		
		return (
			<div className="coin-list">
				<div className="coin-list-title">
					<Checkbox onChange={this.toggleCollect} checked={marketListStore.onlyCollectedCoins}>
                    	{UPEX.lang.template('只看收藏')}
                  	</Checkbox>
                    <Search
                            onChange={this.filterHandle}
                            value={marketListStore.searchValue}
                            placeholder={UPEX.lang.template('搜索数字币')}
                        />
				</div>
				<div className="coin-list-content">
					<div className="">
						<div className="table-header">
							<ul>
                                <li>
                                    <span className="cell name">{UPEX.lang.template('币种')}</span>
                                    <span className="cell amount" onClick={this.sortHandle.bind(this,'currentAmount')}>
                                        {UPEX.lang.template('最新价')}
                                        {this.sortIcon(marketListStore.sortByKey === 'currentAmount')}
                                    </span>
                                    <span className="cell rate" onClick={this.sortHandle.bind(this, 'changeRate')}>
                                        {UPEX.lang.template('24h涨跌')}
                                        {this.sortIcon(marketListStore.sortByKey=== 'changeRate')}
                                    </span>
                                    <span className="cell volume" onClick={this.sortHandle.bind(this, 'volume')}>
                                        {UPEX.lang.template('24h成交量')}
                                        {this.sortIcon(marketListStore.sortByKey === 'volume')}
                                    </span>
                                    <span className="cell action">{UPEX.lang.template('收藏')}</span>
                                </li>
	                        </ul>
                        </div>
                        <div className="table-body">
                            { 
                                marketListStore.noCoin ? (
                                    <div className="mini-tip">{ UPEX.lang.template('暂无数据')}</div>
                                ) : (
                                    <ul>
                                            {
                                                marketListStore.tradeCoins.map((item, index) => {
                                                	let path, ratecolor;
                                                	
                                                	if (item.baseCurrencyNameEn && item.currencyNameEn) {
                                                		path = `/trade/${item.baseCurrencyNameEn}_${item.currencyNameEn}`;	
                                                	} 

                                                    if (item.changeRate >= 0 ) {
                                                        ratecolor = 'greenrate';
                                                    } else {
                                                        ratecolor = 'redrate';
                                                    }
                                                    
                                                    return (
                                                        <li className="clearfix" key={item.id} onClick={this.selectCoin.bind(this, item)}>
                                                            <span className="cell name"><span className="symbol">{item.currencyNameEn || '--'}</span></span>
                                                            <span className="cell amount">{item.currentAmountText}</span>
                                                            <span className={`cell rate ${ratecolor}`}>{item.changeRateText}</span>
                                                            <span className="cell volume">{item.volumeText}</span>
                                                            <span className="cell action">{this.collectIcon(item)}</span>
                                                        </li>
                                                    );
                                                })
                                            }
                                    </ul>
                                )
                            }
                        </div>
					</div>
				</div>
			</div>
		)
	}
}

export default MarketCoinList;