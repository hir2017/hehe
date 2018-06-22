/**
 * 深度图：
 * 对买方来说，只要卖单价小于等于买入价，则交易就可以成交。对卖方来说，只要买单价大于等于卖出价，也是可以立即成交的。
 * 最有可能成交的就是卖单最低价、买单最高价
 */

import React, {Component} from 'react';


class DepthChart extends Component{
	static defaultProps = {
		asks: [],
		bids: []
	}

	render() {
		return (
			<div></div>
		);
	}
}

export default DepthChart;
