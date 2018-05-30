/**
 * 充值
 */
import '../../../css/recharge.css'
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@observer
class Recharge extends Component{
	render(){
		return (
			<div className="account-recharge">
				<h2>{UPEX.lang.template('充币')}</h2>
			</div>
		)
	}
}

export default Recharge;