/**
 * @fileoverview 首页货币行情模块
 * @author 陈立英
 * @date 2018-05-04
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import CoinList from './coinList';
import CoinInfo from './CoinInfo';

@observer
class HotMarkets extends Component{
	render() {
		return (
			<div className="index-markets">
			  <div className="index-markets-left">
				  <CoinInfo />
				</div>
				<div className="index-markets-right">
				  <CoinList />
				</div>
			</div>
		);
	}
}

export default HotMarkets;