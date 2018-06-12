/**
 * 充币
 * TODO msgCode=0的情况
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import RechrgeCoinView from '../../mods/recharge-withdraw/coin-recharge';

@inject('userInfoStore')
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
    			<h2 className="title">{UPEX.lang.template('充币')}</h2>
    			<div className="content">{ $content }</div>
    		</div>
    	)
	}
}

export default Recharge;