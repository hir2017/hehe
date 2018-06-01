/**
 * 账户充值
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
const Option = Select.Option;


@inject('commonStore')
@observer
class Recharge extends Component{
	componentDidMount() {

	}
	handleChange=(e)=>{

	}

	render(){
		return (
			<div className="account-recharge">
				<h2>{UPEX.lang.template('账户充值')}</h2>
				<div className="recharge-form">
					<div className="recharge-form-item">
						<label className="recharge-label">{UPEX.lang.template('选择充值的银行卡')}</label>
						<div className="recharge-info">
							<Select defaultValue="0" onChange={this.handleChange}>
						    	<Option value="0"></Option>						    	
						    </Select>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Recharge;