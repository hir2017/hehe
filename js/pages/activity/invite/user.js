/**
 * 邀请返佣 － 个人信息
 */
import React, { Component } from "react";
import { getInviteUserInfo } from '../../../api/http';

class UserView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {}
		}
	}

	componentDidMount(){
		this.fetchData();
	}

	fetchData() {
		getInviteUserInfo().then((data)=>{
			if (data.status ==  200) {
				this.setState({
                    user: data.attachment
                });
			}
		})
	}



	render() {
		let { friendCount = 0, invitedCode = '', amount = 0, currencyNameEn = ''} = this.state.user;

		return (
			<div className="invite-user clearfix">
				<ul className="user-left">
					<li className="user-mod">
						<label>{UPEX.lang.template('我的佣金估值')}</label>
						<p>
							<em>{amount}</em>
							<span>{currencyNameEn}</span>
						</p>
					</li>
					<li className="user-mod mt10">
						<label>{UPEX.lang.template('我邀请的好友')}</label>
						<p>
							<em>{friendCount}</em>
							<span>{UPEX.lang.template('人')}</span>
						</p>
					</li>
				</ul>
				<div className="user-right">
					<ul>
						<li className="share-item">
							<label>{UPEX.lang.template('我的邀请码')}</label>
							<p className="info">
								<em>{invitedCode}</em>
							</p>
						</li>
						<li className="share-item">
							<label>{UPEX.lang.template('邀请链接')}</label>
							<p className="info">
								<em>{invitedCode}</em>
							</p>
						</li>
						<li className="share-item">
							<label>{UPEX.lang.template('分享至')}</label>
							<p className="info">
								<em>{invitedCode}</em>
							</p>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default UserView;
