import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Input, Icon, Checkbox } from 'antd';

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
            return <Icon type='arrow-up' /> 
        } else {
            return <Icon type='arrow-down'/> 
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

        return <Icon onClick={e => this.collecthandle(e, data)} type={res ? 'star' : 'star-o'} />;
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
                  	<Input
                    	onChange={this.filterHandle}
                    	placeholder={UPEX.lang.template('搜索数字币')}
                        value={marketListStore.searchValue}
                    	prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)'}} />}
                  	/>
				</div>
				<div className="coin-list-content">
					<div className="">
						<div className="table-header">
							<table>
	                            <thead>
	                                <tr>
	                                    <th className="name">{UPEX.lang.template('币种')}</th>
	                                    <th className="amount" onClick={this.sortHandle.bind(this,'currentAmount')}>
	                                        {UPEX.lang.template('最新价')}
	                                        {this.sortIcon(marketListStore.sortByKey === 'currentAmount')}
	                                    </th>
	                                    <th className="rate" onClick={this.sortHandle.bind(this, 'changeRate')}>
	                                        {UPEX.lang.template('24h涨跌')}
	                                        {this.sortIcon(marketListStore.sortByKey=== 'changeRate')}
	                                    </th>
	                                    <th className="volume" onClick={this.sortHandle.bind(this, 'volume')}>
	                                        {UPEX.lang.template('24h成交量')}
	                                        {this.sortIcon(marketListStore.sortByKey === 'volume')}
	                                    </th>
	                                    <th className="action">{UPEX.lang.template('收藏')}</th>
	                                </tr>
	                            </thead>
	                        </table>
                        </div>
                        <div className="table-body">
                            { 
                                marketListStore.noCoin ? (
                                    <div className="mini-tip">{ UPEX.lang.template('暂无数据')}</div>
                                ) : (
                                    <table>
                                        <tbody className="ant-table-tbody">
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
                                                        <tr key={item.id} onClick={this.selectCoin.bind(this, item)}>
                                                            <td className="name"><span className="symbol">{item.currencyNameEn || '--'}</span></td>
                                                            <td className="amount">{item.currentAmountText}</td>
                                                            <td className={`rate ${ratecolor}`}>{item.changeRateText}</td>
                                                            <td className="volume">{item.volumeText}</td>
                                                            <td className="action">{this.collectIcon(item)}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
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