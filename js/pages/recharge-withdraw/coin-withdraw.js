/**
 * 提币
 * TODO 不满足提币条件，引导绑定手机、身份认证等操作
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import WithdrawCoinView from '@/mods/recharge-withdraw/coin-withdraw';
import RecordList from '@/mods/record-list/coin-withdraw-record';

@inject('userInfoStore', 'coinWithdrawStore')
@observer
class Withdraw extends Component{
	componentDidMount() {
		let { userInfoStore } = this.props;

        // 获取用户信息
        userInfoStore.getUserInfo();
	}

	clickSetTradePwd=(e)=>{
		browserHistory.push('/user/set-trade-pwd');
	}

	clickAuthUserIDCard=(e)=>{
		browserHistory.push('/user/authentication');
	}

	render() {
		let store = this.props.coinWithdrawStore;
		let { userInfoStore } = this.props;
		let $content;

        if (userInfoStore.isFetchingInfo == false) {

			if (userInfoStore.userInfo.authLevel == 0) {
				// KYC1未认证通过
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您进行身份认证，否则无法进行充值、提现、充币、提币操作')}</h4>
						<button type="button" onClick={this.clickAuthUserIDCard}>{UPEX.lang.template('身份认证')}</button>
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
				$content = <WithdrawCoinView {...this.props}/>
			}
        } else {
        	$content = (<div className="mini-loading"></div>);
        }

        return (
    		<div className="rw-wrapper w-coin-wrapper">
    			<div className="module-box">
    				<h2 className="title">{UPEX.lang.template('提币')}</h2>
    				<div className="content">{ $content }</div>
    			</div>

    			<div className="module-box">
    				<h2 className="title">{UPEX.lang.template('提币记录')}</h2>
    				<div className="content">
    					<div className="order-main-box">
    						<RecordList currencyId={store.currentCoin.currencyId} key={store.currentCoin.currencyId}/>
    						{ store.isFetching ? <div className="mini-loading"></div> : null }
    					</div>
    				</div>
    			</div>
    		</div>
    	)
	}
}

export default Withdraw;
