/**
 * http://recharts.org/
 */

import './index.less';
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import CustomTooltip from './tooltip';

class DepthChart extends Component{
	static defaultProps = {
		"asks":[["0.07881501",3.33471407],["0.07884405",0.00253781],["0.07885862",2.69808833],["0.07887000",17.3004],["0.07890138",12.835],["0.07890139",4],["0.07891694",0.00253678],["0.07892120",6.43999005],["0.07893979",6.35946285],["0.07894100",0.28699999],["0.07894833",2.99888835],["0.07896692",0.00253632],["0.07897499",0.029258],["0.07898071",0.37468781],["0.07898072",0.00253499],["0.07898917",36.02348691],["0.07898918",59.4979827],["0.07898932",5],["0.07900000",58.43576794],["0.07900544",0.0025362],["0.07900765",19.1446],["0.07900980",0.0025325],["0.07901760",4.2141],["0.07906800",0.22899999],["0.07907702",12.073],["0.07908039",16.8082349],["0.07910000",0.08],["0.07911858",0.0087583],["0.07912264",0.37915823],["0.07913200",0.22899999],["0.07913350",0.013],["0.07913383",0.37933125],["0.07914640",3.17436132],["0.07915598",0.002645],["0.07919600",0.22899999],["0.07925360",0.00142211],["0.07928438",16.5065],["0.07930053",0.00190497],["0.07933254",0.00650756],["0.07939345",0.00304175],["0.07939352",0.012],["0.07940752",0.10738212],["0.07942862",70.5424889],["0.07942863",191.446],["0.07944403",0.01018991],["0.07947398",0.08822542],["0.07951500",0.25899999],["0.07955614",0.00856839],["0.07957341",0.17084821],["0.07958705",0.17343085]],
		"bids":[["0.07881500",3.99622048],["0.07880000",7.26978452],["0.07874934",2.916],["0.07874933",2.14457517],["0.07874920",0.03540825],["0.07871813",7.43356254],["0.07871786",36.88],["0.07871612",0.07811163],["0.07870000",0.08],["0.07862449",4.4374],["0.07860000",0.17695408],["0.07859941",0.17321542],["0.07855786",0.00272639],["0.07854670",0.00348589],["0.07854324",3.16227532],["0.07853570",6.35747508],["0.07850113",0.50954678],["0.07850000",0.13207465],["0.07846977",5],["0.07846192",53.08057651],["0.07846191",19.1446],["0.07846190",0.0171589],["0.07846189",0.04],["0.07844372",17.3219],["0.07843011",5.5],["0.07841786",0.07464473],["0.07840468",0.00421893],["0.07838784",5],["0.07838440",0.459],["0.07837375",0.00894273],["0.07837258",0.01180936],["0.07836586",0.033421],["0.07834580",0.22824237],["0.07833876",5.9],["0.07833222",0.00199152],["0.07832004",0.01276812],["0.07831999",0.00773544],["0.07831989",0.06340815],["0.07831774",0.04769014],["0.07831268",0.25064866],["0.07831189",0.00128972],["0.07830020",0.012],["0.07830000",1.40721839],["0.07829880",0.0157],["0.07829804",3],["0.07829736",0.15246467],["0.07829473",7.29542594],["0.07827867",0.23952886],["0.07827380",0.00145152],["0.07827348",0.0573009]]
	}
	/**
	 * Function to process (sort and calculate cummulative volume)
	 */
	processData(list, type, desc){
		let res = [];
	    // Convert to data points
	    for (var i = 0; i < list.length; i++) {
	        list[i] = {
	            value: Number(list[i][0]),
	            volume: Number(list[i][1]),
	        }
	    }

	    // Sort list just in case
	    list.sort(function(a, b) {
	        if (a.value > b.value) {
	            return 1;
	        } else if (a.value < b.value) {
	            return -1;
	        } else {
	            return 0;
	        }
	    });

	    // Calculate cummulative volume
	    if (desc) {
	        for (var i = list.length - 1; i >= 0; i--) {
	            if (i < (list.length - 1)) {
	                list[i].totalvolume = list[i + 1].totalvolume + list[i].volume;
	            } else {
	                list[i].totalvolume = list[i].volume;
	            }
	            var dp = {};
	            dp["value"] = list[i].value;
	            dp[type + "volume"] = list[i].volume;
	            dp[type + "totalvolume"] = list[i].totalvolume;
	            res.unshift(dp);
	        }
	    } else {
	        for (var i = 0; i < list.length; i++) {
	            if (i > 0) {
	                list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
	            } else {
	                list[i].totalvolume = list[i].volume;
	            }
	            var dp = {};
	            dp["value"] = list[i].value;
	            dp[type + "volume"] = list[i].volume;
	            dp[type + "totalvolume"] = list[i].totalvolume;
	            res.push(dp);
	        }
	    }

	    return res;
	}

	render(){
		let {
			bids = [],
			asks = [],
		} = this.props;

		bids = this.processData(bids, "bids", true);
		asks = this.processData(asks, "asks", false);

		const getBidDepths = orders => orders.map(order => order.bidstotalvolume);
		const getAskDepths = orders => orders.map(order => order.askstotalvolume);
		const maxDepth = Math.max(...getAskDepths(asks), ...getBidDepths(bids));

		const isEmpty = bids.length === 0 && asks.length === 0;

		return (
			<div className="depth-chart">		
				<ResponsiveContainer width="50%" minHeight={400}>
					<AreaChart data={bids}>
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
				<ResponsiveContainer width="50%" minHeight={400}>
					<AreaChart data={asks}>
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