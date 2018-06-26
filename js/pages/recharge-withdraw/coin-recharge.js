/**
 * 充币
 * TODO msgCode=0的情况
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import RechargeCoinView from '../../mods/recharge-withdraw/coin-recharge';
import RecordList from '../../mods/record-list/coin-recharge-record';

@inject('userInfoStore', 'accountStore')
@observer
class Recharge extends Component{
	
	componentDidMount() {
		let { userInfoStore } = this.props;
        
        // 获取用户信息
        userInfoStore.getUserInfo();
	}

	clickAuthUserIDCard=(e)=>{
		browserHistory.push('/user/authentication');
	}

	render() {
		let store = this.props.accountStore;
		let { userInfoStore } = this.props;
		let $content;

        if (userInfoStore.isFetchingInfo == false) {
    		
			if (userInfoStore.userInfo.authLevel == 0) {
				// KYC1未认证通过
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您进行身份认证，否则无法进行充值、提现、充币、提币操作')}</h4>
						<button onClick={this.clickAuthUserIDCard}>{UPEX.lang.template('身份认证')}</button>
					</div>
				);
			} else {
				$content = <RechargeCoinView {...this.props}/>
			}
        } else {
        	$content = (<div className="mini-loading"></div>);
        }

        return (
    		<div className="rw-wrapper r-coin-wrapper">
    			<div className="module-box">
    				<h2 className="title">{UPEX.lang.template('充币')}</h2>
    				<div className="content">{ $content }</div>
    			</div>
    			<div className="module-box">
    				<h2 className="title">{UPEX.lang.template('充币记录')}</h2>
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

export default Recharge;