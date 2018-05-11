/**
 * 买盘
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@observer
class BuyOrder extends Component {
	render() {
		return (
			<div className="trade-buyorder"></div>
		);
	}
}

export default BuyOrder;