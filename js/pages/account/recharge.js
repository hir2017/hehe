/**
 * 充值
 */
import '../../../css/recharge.css'
import React, { Component } from 'react';
import { Link } from 'react-router'
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
const Option = Select.Option;

@inject('rechargeStore')
@observer
class Recharge extends Component{
	handleChange=(e)=>{

	}

	handleRechargeForm=(e)=>{

	}

	render() {
		let store = this.props.rechargeStore;

		return (
			<div className="recharge-wrapper">
				<h2>{UPEX.lang.template('账户充值')}</h2>
				<div className="recharge-form">
					<div className="recharge-form-item">
						<label className="recharge-label">{UPEX.lang.template('选择充值的银行卡')}</label>
						{
							store.banklist.length > 0 ?  null : 1
						}
						<div className="recharge-info">
							<Select defaultValue="0" onChange={this.handleChange}>
						    	<Option value="0">{ UPEX.lang.template('选择一张绑定的银行卡')}</Option>						    	
						    </Select>
						    <div className="extra">
						    	<Link to="/user">{UPEX.lang.template('绑定新银行卡')}</Link>
						    </div>
						</div>
					</div>
					<div className="recharge-form-item">
						<label className="recharge-label">{UPEX.lang.template('该银行的充值限额')}</label>
						<div className="recharge-info">
							<table>
								<tbody>
									<tr>
										<th>{UPEX.lang.template('等级')}</th>
										<th>{UPEX.lang.template('单笔限额')}</th>
										<th>{UPEX.lang.template('每日限额')}</th>
										<th>{UPEX.lang.template('总限额')}</th>
									</tr>
									<tr>
										<td>{UPEX.lang.template('KYC1')}</td>
										<td>{UPEX.lang.template('KYC1单笔限额')}</td>
										<td>{UPEX.lang.template('KYC1每日限额')}</td>
										<td>{UPEX.lang.template('KYC1总限额')}</td>
									</tr>
									<tr>
										<td>{UPEX.lang.template('KYC2')}</td>
										<td>{UPEX.lang.template('KYC2单笔限额')}</td>
										<td>{UPEX.lang.template('KYC2每日限额')}</td>
										<td>{UPEX.lang.template('KYC2总限额')}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="recharge-form-item">
						<label className="recharge-label">{UPEX.lang.template('充值金额')}</label>
						<div className="recharge-info">
							<div className="input-box">
                                <input 
                                    type="text" 
                                />
                            </div>
                            <div className="extra">{UPEX.lang.template('当前余额:{count}', { count: 1122})}</div>
						</div>
					</div>
					<div className="recharge-form-item">
						<div className="recharge-info">
							<button onClick={this.handleRechargeForm}>{UPEX.lang.template('去网上银行充值')}</button>
						</div>
					</div>
				</div>
				<div className="recharge-tip">
					<h3>{UPEX.lang.template('充值遇到了問題')}</h3>
					<ul>
						<li>{UPEX.lang.template('充值遇到的问题1')}</li>
						<li>{UPEX.lang.template('充值遇到的问题2')}</li>
						<li>{UPEX.lang.template('充值遇到的问题3')}</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Recharge;