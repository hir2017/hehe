/**
 * @fileoverview  用户个人信息
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { Link } from 'react-router'
import { observer, inject } from 'mobx-react';

@observer
class UserPage extends Component {
    render() {
        return (
        	<div className="user-wrapper">
        		<div className="user-body-inner clearfix">
	        		<div className="user-menu">
	        			<div className="user-menu-box">
		        			<h2>{ UPEX.lang.template('个人信息')}</h2>
		        			<ul>
										<li>
											<Link to="/user">
												{UPEX.lang.template('基础资料')}
											</Link>
											</li>
										<li>
											<Link to="/user/authentication">
											  {UPEX.lang.template('身份认证')}
											</Link>
										</li>
										<li>
										  <Link to="/user/bankInfo">
												{UPEX.lang.template('银行卡信息')}
											</Link>
										</li>
		        			</ul>
		        			<h2>{ UPEX.lang.template('安全设置')}</h2>
		        			<ul>
										<li>
										  <Link to="/user/passwordSetting">
												{UPEX.lang.template('密码设置')}
											</Link>
										</li>
										<li>
											<Link to="/user/bindingPhone">
												{UPEX.lang.template('手机绑定')}
											</Link>
										</li>
										<li>
											<Link to="/user/bindingEmail">
											  {UPEX.lang.template('电子邮箱绑定')}
											</Link>
										</li>
		        				<li>{UPEX.lang.template('Google验证器')}</li>
		        			</ul>
		        			<h2>{ UPEX.lang.template('其它')}</h2>
		        			<ul>
		        				<li>{UPEX.lang.template('问题反馈')}</li>
		        				<li>{UPEX.lang.template('反馈列表')}</li>
		        			</ul>
	        			</div>
	        		</div>
	        		<div className="user-main">
	        			<div className="user-main-box">
								  {
										this.props.children
									}
								</div>
	        		</div>
	        	</div>
        	</div>
        )
    }
}

export default UserPage;