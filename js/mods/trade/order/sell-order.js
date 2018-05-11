/**
 * 卖盘
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@observer
class SellOrder extends Component {
	render() {
		return (
			<div className="trade-sellorder"></div>
		);
	}
}

export default SellOrder;