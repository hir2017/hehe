/**
 * 法币充值
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import PageWrapper from '@/mods/common/wrapper/full-page';
import FiatWithdrawView from '@/mods/recharge-withdraw/fiat-withdraw';
import AuthWrapper from '@/mods/authhoc/recharge-withdraw';

@inject('userInfoStore')
@observer
class Recharge extends Component{
	constructor(props){
        super(props);
        this.pageInfo = {
            title :UPEX.lang.template('账户提现'),
            className: 'fiat-withdraw header-shadow rw-wrapper w-fait-wrapper'
        }
	}

	componentDidMount() {
		// 请求用户信息
		this.props.userInfoStore.getUserInfo();
	}

	clickSetTradePwd=(e)=>{
		browserHistory.push('/user/set-trade-pwd');
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
						<button type="button" onClick={this.clickAuthUserIDCard}>{UPEX.lang.template('身份认证')}</button>
					</div>
				);
			} else if (userInfoStore.userInfo.authLevel == 1){
				// 未绑定银行信息
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您先绑定银行卡信息，否则无法进行充值、提现操作')}</h4>
						<button type="button" onClick={this.clickSetBankInfo}>{UPEX.lang.template('绑定银行卡信息')}</button>
					</div>
				);
			} else if (!userInfoStore.userInfo.isValidatePass){
				// 未设置资金密码
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您先设置资金密码，否则无法进行提币、提现操作')}</h4>
						<button type="button" onClick={this.clickSetTradePwd}>{UPEX.lang.template('设置资金密码')}</button>
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
            <AuthWrapper pageInfo={this.pageInfo} name="withdraw">
                <PageWrapper {...this.pageInfo}>
                    {$content}
                </PageWrapper>
            </AuthWrapper>

		)
	}
}

export default Recharge;
