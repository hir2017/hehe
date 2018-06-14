/**
 * http://recharts.org/
 */

import './index.less';
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import CustomTooltip from './tooltip';
import Empty from './empty';

@inject('tradeStore')
@observer
class DepthChart extends Component{
	render() {
		let store = this.props.tradeStore;

		const getBidDepths = orders => orders.map(order => order.bidstotalvolume);
		const getAskDepths = orders => orders.map(order => order.askstotalvolume);
		const maxDepth = Math.max(...getAskDepths(store.depthAsks), ...getBidDepths(store.depthBids));

		const isEmpty = store.depthBids.length === 0 && store.depthAsks.length === 0;

		// if (isEmpty) {
			return <Empty/>
		// }

		return (
			<div className="depth-chart">		
				<ResponsiveContainer width="50%" height="100%">
					<AreaChart data={store.depthBids}>
						<Area
							dataKey="bidstotalvolume"
							type="step"
							stroke="#00d02c"
							fillOpacity={0.2}
							fill="#00d02c"
							isAnimationActive={false}
						/>
				        <XAxis 
				        	dataKey="value"
				        	axisLine={{
								stroke: '#7f8fa4',
								strokeWidth: 1,
							}}
							tickLine={{
								stroke: '#7f8fa4',
							}}
							tick={{
								fontSize: '12px',
								fill: '#7f8fa4',
							}}
				        />
				        <YAxis
				        	scale="linear"
				        	domain={[0, maxDepth * 1.1 ]}
				        	axisLine={{
								stroke: '#7f8fa4',
								strokeWidth: 1,
							}}
							tickLine={{
								stroke: '#7f8fa4',
							}}
							tick={{
								fontSize: '12px',
								fill: '#7f8fa4',
							}}
				        />
				       	<Tooltip 
							content={<CustomTooltip/>}
							isAnimationActive={false}
							animationDuration={0}
						/>
				    </AreaChart>
				</ResponsiveContainer>
				<ResponsiveContainer width="50%" height="100%">
					<AreaChart data={store.depthAsks}>
						<Area
							dataKey="askstotalvolume"
							type="step"
							stroke="#ff3380"
							fillOpacity={0.2}
							fill="#ff3380"
							isAnimationActive={false}
						/>
						<XAxis
							dataKey="value"
							axisLine={{
								stroke: '#7f8fa4',
								strokeWidth: 1,
							}}
							tickLine={{
								stroke: '#7f8fa4',
							}}
							tick={{
								fontSize: '12px',
								fill: '#7f8fa4',
							}}
						/>
						<YAxis
							padding={{top: 20}}
							allowDecimals={false}
							orientation="right"
							scale="linear"
							domain={[0, maxDepth * 1.1 ]}
							axisLine={{
								stroke: '#7f8fa4',
								strokeWidth: 1,
							}}
							tickLine={{
								stroke: '#7f8fa4',
							}}
							tick={{
								fontSize: '12px',
								fill: '#7f8fa4',
							}}
						/>
						<Tooltip 
							content={<CustomTooltip/>}
							isAnimationActive={false}
							animationDuration={0}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		);
	}
}


export default DepthChart;