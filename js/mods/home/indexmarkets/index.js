/**
 * @fileoverview 首页货币行情模块
 * @author 陈立英
 * @date 2018-05-04
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import CoinList from './coinList';
import CoinInfo from './CoinInfo';

class HotMarkets extends Component{
	render() {
		const { coins, filterCoin } = this.props
		return (
			<div className="index-markets">
			  <div className="index-markets-left">
				  <CoinInfo coins={coins}/>
				</div>
				<div className="index-markets-right">
				  <CoinList filterCoin={filterCoin} coins={coins}/>
				</div>
			</div>
		);
	}
}

export default HotMarkets;