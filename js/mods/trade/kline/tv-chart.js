import React, {Component} from 'react';

@observer
class TVChartContainer extends Component {
	static defaultProps = {
		symbol: 'AAPL',
		interval: 'D',
		containerId: 'tv_chart_container',
		datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.0',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	}

	componentDidMount() {
		
	}
	
	render() {
		return (
			return (
				<div
					id={ this.props.containerId }
					className="tv-chart"
				/>
			);
		)
	}
}

export default TVChartContainer;