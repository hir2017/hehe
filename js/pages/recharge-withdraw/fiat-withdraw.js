/**
 * 法币充值
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import FiatWithdrawView from '../../mods/recharge-withdraw/fiat-withdraw';

@inject('userInfoStore')
@observer
class Recharge extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount() {
		// 请求用户信息
		this.props.userInfoStore.getUserInfo();
	}

	clickSetTradePwd=(e)=>{
		browserHistory.push('/user/settingTraddingPassword');
	}

	clickAuthUserIDCard=(e)=>{
		browserHistory.push('/user/authentication');
	}

	clickSetBankInfo=(e)=>{
		browserHistory.push('/user/bankInfo');
	}


	render() {
		let { userInfoStore } = this.props;
		let $content;
		
		if (userInfoStore.isFetchingInfo == false) {
    		// KYC1未认证通过
			if (userInfoStore.userInfo.authLevel == 0) {
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您进行身份认证，否则无法进行充值、提现、充币、提币操作')}</h4>
						<button onClick={this.clickAuthUserIDCard}>{UPEX.lang.template('身份认证')}</button>
					</div>
				);
			} else if (userInfoStore.userInfo.authLevel == 1){
				// 未绑定银行信息
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您先绑定银行卡信息，否则无法进行提现操作')}</h4>
						<button onClick={this.clickSetBankInfo}>{UPEX.lang.template('绑定银行卡信息')}</button>
					</div>
				);
			} else if (!userInfoStore.userInfo.isValidatePass){
				// 未设置交易密码
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您先设置交易密码，否则无法进行提币、提现操作')}</h4>
						<button onClick={this.clickSetTradePwd}>{UPEX.lang.template('设置交易密码')}</button>
					</div>
				);
			} else {
				$content = <FiatWithdrawView/>;
			}
		} else {
			$content = (
				<div className="mini-loading"></div>
			);
		}

		return (
			<div className="rw-wrapper w-fait-wrapper">
				<h2 className="title">{UPEX.lang.template('账户提现')}</h2>
				<div className="content">
					{ $content }
				</div>
			</div>
		)
	}
}

export default Recharge;