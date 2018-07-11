/**
 * 深度图, 自主研发一个深度图，基于canvas
 * 对买方来说，只要卖单价小于等于买入价，则交易就可以成交。对卖方来说，只要买单价大于等于卖出价，也是可以立即成交的。
 * 最有可能成交的就是买单最高价、卖单最低价
 * @author 陈立英
 * 备注：
 * 1、横坐标为买入、卖出价格刻度
 * 2、纵坐标为订单交易量总数。
 * 3、计算价格区间的交易总量：买单＝》低于等于当前价格的累计总量；卖单＝》高于等于当前价格的累计总量
 */

import React, {Component} from 'react';
import Chart from './chart';



class DepthChart extends Component{
	static defaultProps = {
		asks: [], // 卖方深度
		bids: []  // 买方深度
	}

	// 深度图数据处理方法
	handleDeepDataSort() {

	}


	render() {
		return (
			<div></div>
		);
	}
}

export default DepthChart;