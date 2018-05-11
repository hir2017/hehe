/**
 * @fileoverview 币种信息
 * @author 陈立英
 * @date 2018-05-010
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@observer 
class CoinList extends Component {
	render(){
		return (
			<div className="coin-list"></div>
		);
	}
}

export default CoinList;