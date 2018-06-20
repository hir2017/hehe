import React, {Component} from 'react';

class CustomTooltip extends Component {
	static defaltProps = {
		type: '',
    	payload: '',
    	label: ''
	}

	render() {
		const { active } = this.props;
	    
	    if (active) {
	     	const { payload, label } = this.props;
		     
		    return (
		        <div className="custom-tooltip">
		        	<ul>
		        		<li>
		        			<label>{UPEX.lang.template('委托价')}:</label>
		        			<em>{label}</em>
		        		</li>
		        		<li>
		        			<label>{UPEX.lang.template('累计')}:</label>
		        			<em>{payload && payload[0] ? payload[0].value : ''}</em>
		        		</li>
		        	</ul>
		        </div>
		   	);
		}

	    return null;
	}
}

export default CustomTooltip;