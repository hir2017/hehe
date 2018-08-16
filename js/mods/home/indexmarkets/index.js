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
	render() {
		let store = this.props.homeStore.marketListStore;
	    let pair = store.selectedCoin.baseCurrencyNameEn + '_' + store.selectedCoin.currencyNameEn;

		return (
  			<div className="index-markets">
     			<div className="market-nav"></div>
                <div className="market-panel">
                    <CoinList/>
                </div>
  			</div>
		)
	}
}

export default IndexMarkets;