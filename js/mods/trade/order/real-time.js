/**
 * 实时交易数据
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@observer
class TradeRealTime extends Component {
	render() {
		return (
			<div className="trade-realtime"></div>
		);
	}
}

export default TradeRealTime;