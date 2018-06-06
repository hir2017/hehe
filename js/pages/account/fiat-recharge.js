/**
 * 法币充值
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
import { Link, browserHistory } from 'react-router';
const Option = Select.Option;
import toAction from './fiat-recharge-action';


@inject('commonStore', 'userInfoStore', 'fiatRechargeStore')
@observer
class Recharge extends Component{
	constructor(props){
		super(props);

		this.action = toAction(this.props.fiatRechargeStore);
	}

	componentDidMount() {
		// 请求用户信息
		this.props.userInfoStore.getUserInfo();
	}

	handleChangeBank=(e)=>{

	}


	bindBankCard=(e)=>{
		browserHistory.push('/user/bankInfo');
	}	

	handleOrder=(e)=>{
		this.action.order();
	}

	render() {
		let $content;
		let { userInfoStore } = this.props;
		
		if (userInfoStore.isFetchingInfo == false) {
    		// KYC1未认证通过
			if (userInfoStore.userInfo.isAuthPrimary !== 2) {
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您进行身份认证，否则无法进行充值、提现、提币操作')}</h4>
						<button onClick={this.clickAuthUserIDCard}>{UPEX.lang.template('身份认证')}</button>
					</div>
				);
			} else {
				let $bankoptions = [];

				$content = (
					<div>
						<div className="recharge-form">
							<div className="recharge-form-item">
								<label className="recharge-label">{UPEX.lang.template('选择充值的银行卡')}</label>
								<div className="recharge-info">
									<Select notFoundContent={UPEX.lang.template('无')}
		                                    defaultValue={ UPEX.lang.template('请选择一张绑定的银行账号') }
		                                    onChange={this.handleChangeBank.bind(this)}
									>
		                                { $bankoptions }
		                            </Select>
		                            <button onClick={this.bindBankCard}>{UPEX.lang.template('绑定新银行卡')}</button>
								</div>
							</div>
							<div className="recharge-form-item">
								<label className="recharge-label">{UPEX.lang.template('充值金额')}</label>
								<div className="recharge-info">
									<div className="input-box">
										<input type="number"/>
										<i className="unit"></i>
									</div>
									<div className="balance">{ UPEX.lang.template('当前余额: NT${count}', {count : 3000})}</div>
								</div>
							</div>
							<div className="recharge-form-item">
								<div className="recharge-info">
									<button className="submit-btn" onClick={this.handleOrder}>{UPEX.lang.template('去网上银行充值')}</button>
								</div>
							</div>
						</div>
						<div className="tip">
							<h3>{UPEX.lang.template('充值遇到了问题')}</h3>
							<div className="content" dangerouslySetInnerHTML={{__html: UPEX.lang.template('充值遇到了问题内容')}}></div>
						</div>
					</div>
				)
			}
		} else {
			$content = (
				<div className="mini-loading"></div>
			);
		}

		return (
			<div className="account-recharge">
				<h2 className="title">{UPEX.lang.template('账户充值')}</h2>
				<div className="content">
					{ $content }
				</div>
			</div>
		)
	}
}

export default Recharge;