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

@inject('marketListStore')
@observer
class HotMarkets extends Component{
	render() {
		let store = this.props.marketListStore;

		return (
			<div className="index-markets">
				<div className="index-markets-hd">
					<h3 className="title">{UPEX.lang.template('货币行情')}</h3>
				</div>
              	<div>
              		<div className="index-markets-left">
              			<div className="coin-hd">
              				<h4 className="name">
			                    <span>{store.selectedCoin.currencyNameEn}</span>
			                    <em>{store.selectedCoin.currentAmount}</em>
			                </h4>
			                <span className={store.selectedCoin.changeRate > 0 ? 'rate redbg' : 'rate greenbg'}>
			                	{ store.selectedCoin.changeRateText }
			                </span>
              			</div>
              			<ul className="coin-bd">
              				<li>
              					<label>{ UPEX.lang.template('成交量') }</label>
              					<em>{ store.selectedCoin.volume}</em>
              				</li>
              				<li>
              					<label>{ UPEX.lang.template('成交额') }</label>
              					<em>{ store.selectedCoin.amount}</em>
              				</li>
              				<li>
              					<label>{ UPEX.lang.template('24h最低价') }</label>
              					<em>{ store.selectedCoin.lowPrice}</em>
              				</li>
              				<li>
              					<label>{ UPEX.lang.template('24h最高价') }</label>
              					<em>{ store.selectedCoin.highPrice}</em>
              				</li>
              			</ul>
              			<div className="coin-ft">
              				<div className="realtime">
	              				<div className="realtime-hd">
		              				<h4>{UPEX.lang.template('实时行情')}</h4>
		              				<label>
					                    <Link to={`/trade/${store.selectedCoin.baseCurrencyNameEn}_${store.selectedCoin.currencyNameEn}`}>
					                    { UPEX.lang.template('K线') }
					                    </Link>
				                  	</label>
			                  	</div>
	              				<div className="realtime-kline">
	              					<CoinChart hours24TrendList={store.selectedCoin.hours24TrendList}/>
	              				</div>
              				</div>
              			</div>
              		</div>
              		<div className="index-markets-right">
              			<CoinList/>
              		</div>
              	</div>
			</div>
		);
	}
}

export default HotMarkets;