/**
 * 提现
 */
import '../../../css/withdrawal.css';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@observer
class Withdrawal extends Component{
	render() {
		return (
			<div className="withdrawal-wrapper">
				<h2>{UPEX.lang.template('账户提现')}</h2>
			</div>
		)
	}
}

export default Withdrawal;