/**
 * @fileoverview 首页货币行情模块
 * @author 陈立英
 * @date 2018-05-04
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router'
import CoinList from './coin-list';
import CoinChart from './chart';

@inject('homeStore')
@observer
class IndexMarkets extends Component{
	handleTab=(info)=>{
		let store = this.props.homeStore.marketListStore;
		
		store.setSelectedMarket(info);
	}

	render() {
		let store = this.props.homeStore.marketListStore;
		let pair = store.selectedCoin.baseCurrencyNameEn + '_' + store.selectedCoin.currencyNameEn;

		return (
  			<div className="index-markets">
     			<div className="market-nav">
     				<ul>
     					{
     						store.marketList.map((item, index)=>{
     							let info = item.info;
     							let clsName = info.currencyNameEn == store.selectedMarket.currencyNameEn ? 'selected' : '';
 
     							return (<li className={clsName} data-id={info.currencyId} key={info.currencyId} onClick={this.handleTab.bind(this, info)}>{info.currencyNameEn}</li>);
     						})
     					}
     					<li key="sc">收藏</li>
     				</ul>
     			</div>
                <div className="market-panel">
                	<div className="market-panel-hd">
                		<div className="market-coin">
			        		<div className="coin-hd">
			        			<h4 className="name">
				                    <span>{store.selectedCoin.currencyNameEn}</span>
				                    <em>{store.selectedCoin.currentAmountText}</em>
			                    </h4>
			                    <span className={store.selectedCoin.changeRate >= 0 ? 'rate greenrate' : 'rate redrate'}>
			                    	{ store.selectedCoin.changeRateText }
			                    </span>
			        		</div>
			    			<ul className="coin-bd">
			    				<li>
			    					<label>{ UPEX.lang.template('成交量') }</label>
			    					<em>{ store.selectedCoin.volumeText}</em>
			    				</li>
			    				<li>
			    					<label>{ UPEX.lang.template('24h最低价') }</label>
			    					<em>{ store.selectedCoin.lowPriceText}</em>
			    				</li>
			    				<li>
			    					<label>{ UPEX.lang.template('成交额') }</label>
			    					<em>{ store.selectedCoin.amountText}</em>
			    				</li>
			    				<li>
			    					<label>{ UPEX.lang.template('24h最高价') }</label>
			    					<em>{ store.selectedCoin.highPriceText}</em>
			    				</li>
			    			</ul>
                		</div>
                		<div className="realtime-kline">
		  					<CoinChart key={pair} pair={pair} pointPrice={store.selectedCoin.pointPrice}/>
		  				</div>
                	</div>
                	<div className="market-panel-bd">
                		<CoinList/>
                	</div>
                </div>
  			</div>
		)
	}
}

export default IndexMarkets;