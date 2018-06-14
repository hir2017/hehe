/**
 * 数字输入框
 */
import React, { Component } from 'react';

class InputNumber extends Component {
	constructor(props){
		super(props);

		this.state = {
			max: '',
			min: '',
			value: ''
		}
	}

	componentWillMount(){
		
	}

	componentDidMount(){

	}
	render() {
		return (
			<div className="input-number">
				<input type="text"/>
			</div>
		)
	}
}

export default InputNumber;