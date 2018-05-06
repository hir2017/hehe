/**
 * @fileoverview 页头
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import LanguageSwitchView from './language';
import ThemeSwitchView from './theme';


@inject('authStore')
@observer
class HeaderView extends Component {
	render() {
		let { authStore } = this.props;
		
		return (
			<div className="app-header">
				<div className="header-box clearfix">
					<h1 className="logo">
						<Link to="/">
							<img src="http://h.cdn.pengpengla.com/up/uplive-pc/2.7.10/assets/5df741ca8873ae5900ebe53c77d50eed.png"/>
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
									<li>
										<Link to="/order">{ UPEX.lang.template('订单明细')}</Link>
									</li>
									<li>
										<Link to="/asset">{ UPEX.lang.template('我的资产')}</Link>
									</li>
								</ul>
							) : ( 
								<ul>
									<li className="help">
										<Link to="/help">{ UPEX.lang.template('帮助中心')}</Link>
									</li>
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
							<li>
								<ThemeSwitchView/>
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

