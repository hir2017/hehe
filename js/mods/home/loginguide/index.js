import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';

@observer
class LoginGuide extends Component{
	render() {
		return (
			<div className="loginguide-wrapper">
				<ul>
					<li>{ UPEX.lang.template('开始你的数字货币之旅')}</li>
					<li><Link to="/register">{ UPEX.lang.template('注册')}</Link></li>
					<li>|</li>
					<li>{ UPEX.lang.template('已经注册?')}<Link to="/login">{ UPEX.lang.template('登录')}</Link></li>
				</ul>
			</div>
		);
	}
}

export default LoginGuide;