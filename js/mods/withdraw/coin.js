import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select , message } from 'antd';
const Option = Select.Option;
import toAction from './coin-action';

class WithdrawCoin extends Component {
	static defaultProps = {
		coinList: []
	}

	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				
			</div>
		)
	}


}

export default WithdrawCoin;