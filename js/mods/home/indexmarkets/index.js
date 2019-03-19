/**
 * @fileoverview 首页货币行情模块
 * @author 陈立英
 * @date 2018-05-04
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Icon, Badge } from 'antd';
import { Link , browserHistory} from 'react-router'
import CoinList from './coin-list';
import CoinChart from './chart';

const Search = Input.Search;

@inject('homeStore')
@observer
class IndexMarkets extends Component{
	constructor(props){
		super(props);

		this.state = {
			positionFixed: false
		}
	}

	componentDidMount() {
		let target = $(this.refs.tofixed);

		this.visibilityHeight = target.offset().top;

		$(window).on('scroll', this.handleScroll);
	}

	componentWillUnmount(){
		$(window).off('scroll', this.handleScroll);
	}

	handleScroll=(e)=>{
		return;
		// 币种多的时候，实现该效果，币种内容fixed
		let scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

		this.setState({
	      	positionFixed: scrollTop > this.visibilityHeight
	    });
	}

	handleTab=(code)=>{
		let store = this.props.homeStore.marketListStore;

		store.updateMarketCode(code);
		store.initMarket();
	}

	filterHandler=(e)=>{
		let store = this.props.homeStore.marketListStore;
        let value = e.target.value.trim();

        // value = value.toUpperCase();
        store.updateSearchValue(value);
    }

    handleClick=(pair)=>{
    	browserHistory.push(`/webtrade/${pair}`);
    }

	render() {
		let store = this.props.homeStore.marketListStore;
		let pair;
		let $coinMain;

		if (store.selectedCurrency.baseCurrencyNameEn) {
			pair = store.selectedCurrency.baseCurrencyNameEn + '_' + store.selectedCurrency.currencyNameEn;

			$coinMain = (
				<div className="wrapper">
            		<div className="market-coin">
		        		<div className="coin-hd">
		        			<h4 className="info" onClick={this.handleClick.bind(this, pair)}>
		        				<img className="icon" src={store.selectedCurrency.icoUrl || ''} alt="" />
			                    <span className="name">{store.selectedCurrency.currencyNameEn}<i>/{store.selectedCurrency.baseCurrencyNameEn}</i></span>
			                    <em>{store.selectedCurrency.currentAmountText}</em>
		                    </h4>
		                    <span className={store.selectedCurrency.changeRate >= 0 ? 'rate greenrate' : 'rate redrate'}>
		                    	{ store.selectedCurrency.changeRateText }
		                    </span>
		        		</div>
		    			<ul className="coin-bd clearfix">
		    				<li>
		    					<label>{ UPEX.lang.template('成交量') }</label>
		    					<em>{ store.selectedCurrency.volumeText}</em>
		    				</li>
		    				<li>
		    					<label>{ UPEX.lang.template('24h最低价') }</label>
		    					<em>{ store.selectedCurrency.lowPriceText}</em>
		    				</li>
		    				<li>
		    					<label>{ UPEX.lang.template('成交额') }</label>
		    					<em>{ store.selectedCurrency.amountText}</em>
		    				</li>
		    				<li>
		    					<label>{ UPEX.lang.template('24h最高价') }</label>
		    					<em>{ store.selectedCurrency.highPriceText}</em>
		    				</li>
		    			</ul>
            		</div>
            		<div className="realtime-kline">
            			<CoinChart key={pair} pair={pair} pointPrice={store.selectedCurrency.pointPrice}/>
	  				</div>
            	</div>
			);
		}

		return (
  			<div className="index-markets">
     			<div className="market-nav">
     				<ul>
     					{
     						store.marketNav.map((item, index)=>{
     							let clsName = item == store.selectedMarketCode ? 'selected' : '';
 								if(UPEX.config.version === 'infinitex' && item === 'GTO') {
                                    return (
                                        <li className={clsName} key={item} onClick={this.handleTab.bind(this, item)}>
     									    <Badge offset={[0, 3]} dot>{UPEX.lang.template('{name}市场',{ name: item})}</Badge>
     								    </li>
                                    )
                                 }
     							return (
     								<li className={clsName} key={item} onClick={this.handleTab.bind(this, item)}>
     									{UPEX.lang.template('{name}市场',{ name: item})}
     								</li>
     							);
     						})
     					}
     					<li className={`marked${store.selectedMarketCode == 'Marked' ? ' selected' : ''}`} onClick={this.handleTab.bind(this, 'Marked')}>
     						{
     							store.selectedMarketCode == 'Marked' ?
     							<i  className='exc-star selected' /> :
     							<i  className='exc-star' />
     						}
     					</li>
     				</ul>
     				<div className="search">
	 				  	<Search
	                        onChange={this.filterHandler}
	                        value={store.searchValue}
	                        placeholder={UPEX.lang.template('搜索数字币')}
	                    />
                    </div>
     			</div>
                <div className="market-panel">
                	<div className={`market-panel-hd${this.state.positionFixed ? ' market-panel-fixed' : ''}${store.selectedCurrency.key ? '' : ' empty'}` } ref="tofixed">
                		{ $coinMain }
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
