import React, {Component} from 'react';

class Empty extends Component {
	render() {
	    return (
	        <div className="depth-chart-empty">
				<p>{UPEX.lang.template('暂无数据')}</p>
	        </div>
	    )
	}
}

export default Empty;