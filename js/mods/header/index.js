/**
 * @fileoverview 页头
 * @author 陈立英
 * @date 2018-04-26
 * 订单明细：
 	* 当前委托
 	* 委托历史
 	* 已成交订单
 * 我的资产
	* 充值&提现
	* 充值记录
	* 提现记录
 * 个人信息
	* 安全设置
	* FAQ
	* 推出
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Popover , message } from 'antd';
import LanguageSwitchView from './language';
import { browserHistory } from 'react-router';

@inject('authStore', 'userInfoStore')
@observer
class HeaderView extends Component {
	componentDidMount() {
		this.props.userInfoStore.getUserInfo();
	}	

	logout=(e)=>{
		this.props.authStore.logout().then((data)=>{
			if (data.status == 200) {
				message.success(UPEX.lang.template('退出成功'));
				browserHistory.push('/home');
			}
		});
	}

	render() {
		let { authStore, userInfoStore } = this.props;

		const assetmenu = (
	        <dl className="pop-menu-list">
	          	<dd className="logined-header">
	            	<Link className="logined-header-link" to="/account/assets">{ UPEX.lang.template('充币&提币') }</Link>
	          	</dd>
	          	<dd className="logined-header">
	            	<Link className="logined-header-link" to="/account/coinrecord">{ UPEX.lang.template('充币记录') }</Link>
	          	</dd>
	           	<dd className="logined-header">
	            	<Link className="logined-header-link" to="/account/coinrecord">{ UPEX.lang.template('提币记录')}</Link>
	            </dd>
	        </dl>
	    );

	    const ordermenu = (
	    	<dl className="pop-menu-list">
	          	<dd className="logined-header">
	            	<Link className="logined-header-link" to="/account/record/open">{ UPEX.lang.template('当前委托') }</Link>
	          	</dd>
	          	<dd className="logined-header">
	            	<Link className="logined-header-link" to="/account/record/history">{ UPEX.lang.template('委托历史') }</Link>
	          	</dd>
	           	<dd className="logined-header">
	            	<Link className="logined-header-link" to="/account/record/success">{ UPEX.lang.template('已成交订单')}</Link>
	            </dd>
	        </dl>
	    );

	    const usermenu = (
	    	<dl className="pop-menu-list">
	          	<dd className="logined-header">
	            	<Link className="logined-header-link" to="/user/settings">{ UPEX.lang.template('安全设置') }</Link>
	          	</dd>
	          	<dd className="logined-header">
	            	<Link className="logined-header-link" to="/user/faq">{ UPEX.lang.template('FAQ') }</Link>
	          	</dd>
	           	<dd className="logined-header" onClick={this.logout}>
	            	{ UPEX.lang.template('退出')}
	            </dd>
	        </dl>
	    );

		return (
			<div className="app-header" id="J_AppHeader">
				<div className="header-box clearfix">
					<h1 className="logo">
						<Link to="/">
							<img src="http://g.cdn.pengpengla.com/oauthgame/html5/20180509/5f46a342df497aa7b71af141c20724a1.png"/>
						</Link>
					</h1>
					<div className="header-box-l">
						<ul>
							<li>
								<Link to="/trade">{ UPEX.lang.template('行情中心')}</Link>
							</li>
							<li>
								<Link to="/news">{ UPEX.lang.template('新闻公告')}</Link>
							</li>
							<li>
								<Link to="/download">{ UPEX.lang.template('客户端下载')}</Link>
							</li>
						</ul>
					</div>
					<div className="header-box-r">
						{
							authStore.isLogin ? (
								<ul>
									<li ref="order">
										<Link to="/account/record">{ UPEX.lang.template('订单明细')}</Link>
									</li>
									<li ref="assets">
										<Link to="/account/assets">{ UPEX.lang.template('我的资产')}</Link>
									</li>
									<li ref="userinfo">
										<Popover content={usermenu} placement="bottom" getPopupContainer={()=>this.refs.userinfo}>
											<Link to="/user">
											{ UPEX.lang.template('个人信息')}
											</Link>
										</Popover>
									</li>
								</ul>
							) : ( 
								<ul>
									<li className="login">
										<Link to="/login">{ UPEX.lang.template('登录')}</Link>
									</li>
									<li className="split">|</li>
									<li className="register">
										<Link to="/register">{ UPEX.lang.template('注册') }</Link>
									</li>
								</ul>	
							)
						}
						<ul>
							<li className="help">
								<Link to="/help">{ UPEX.lang.template('帮助中心')}</Link>
							</li>
							<li ref="lang">
								<LanguageSwitchView root={()=>this.refs.lang}/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default HeaderView;

