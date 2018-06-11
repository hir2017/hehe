/**
 * 法币充值
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
const Option = Select.Option;
import { Link, browserHistory } from 'react-router';
import FiatRechargeView from '../../mods/recharge-withdraw/fiat-recharge';

@inject('commonStore', 'userInfoStore')
@observer
class Recharge extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount() {
		// 请求用户信息
		this.props.userInfoStore.getUserInfo();
	}

	render() {
		let $content;
		let { userInfoStore } = this.props;
		
		if (userInfoStore.isFetchingInfo == false) {
    		// KYC1未认证通过
			if (userInfoStore.userInfo.isAuthPrimary !== 2) {
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您进行身份认证，否则无法进行充值、提现、充币、提币操作')}</h4>
						<button onClick={this.clickAuthUserIDCard}>{UPEX.lang.template('身份认证')}</button>
					</div>
				);
			} else {
				$content = <FiatRechargeView/>;
			}
		} else {
			$content = (
				<div className="mini-loading"></div>
			);
		}

		return (
			<div className="rw-wrapper r-fait-wrapper">
				<h2 className="title">{UPEX.lang.template('账户充值')}</h2>
				<div className="content">
					{ $content }
				</div>
			</div>
		)
	}
}

export default Recharge;