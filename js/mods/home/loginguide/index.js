import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Link , browserHistory } from 'react-router';

@observer
class LoginGuide extends Component{
	handleRegister=(e)=>{
		browserHistory.push('/register');
	}
	
	handleLogin=(e)=>{
		browserHistory.push('/login');
	}

	render() {
		return (
			<div className="loginguide-wrapper">
				<ul>
					<li>
						<label>{ UPEX.lang.template('开始你的数字货币之旅')}</label>
					</li>
					<li>
						<button className="register-btn" onClick={this.handleRegister}>{UPEX.lang.template('注册')}</button>
					</li>
					<li>
						<span>{ UPEX.lang.template('已经注册?')}</span>
						<button className="login-btn" onClick={this.handleLogin}>{ UPEX.lang.template('登录')}</button>
					</li>
				</ul>
			</div>
		);
	}
}

export default LoginGuide;