/**
 * 提币
 * TODO 不满足提币条件，引导绑定手机、身份认证等操作
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message, Alert } from 'antd';

const Option = Select.Option;
import Timer from '../../lib/timer';
import WithdrawCoinView from '../../mods/withdraw/coin';

@inject('userInfoStore')
@observer
class Withdraw extends Component{
	componentDidMount() {
		let { userInfoStore } = this.props;
        
        // 获取用户信息
        userInfoStore.getUserInfo();
	}

	render() {
		let { userInfoStore } = this.props;
		let $content;

        if (userInfoStore.isFetchingInfo == false) {
    		
			if (userInfoStore.userInfo.isAuthPrimary !== 2) {
				// KYC1未认证通过
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您进行身份认证，否则无法进行充值、提现、提币操作')}</h4>
						<button onClick={this.clickAuthUserIDCard}>{UPEX.lang.template('身份认证')}</button>
					</div>
				);
			} else if (!userInfoStore.userInfo.isValidatePass){
				// 未设置交易密码
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您先设置交易密码，否则无法进行提币操作')}</h4>
						<button onClick={this.clickSetTradePwd}>{UPEX.lang.template('设置交易密码')}</button>
					</div>
				);
			} else {
				$content = <WithdrawCoinView {...this.props}/>
			}

        } else {
        	$content = (<div className="mini-loading"></div>);
        }

        return (
    		<div className="account-withdraw">
    			<h2 className="title">{UPEX.lang.template('提币')}</h2>
    			<div className="content">{ $content }</div>
    		</div>
    	)
	}
}

export default Withdraw;