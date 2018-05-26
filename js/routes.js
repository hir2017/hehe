import React, { Component } from 'react';
import { Route , IndexRedirect, IndexRoute} from 'react-router';

import Layout from './pages/layout';

import News from './pages/news';
import Help from './pages/help';
import AboutUs from './pages/about';
import Careers from './pages/careers';
import NotFound from './pages/404';
import Feedback from './pages/feedback';
import Download from './pages/download';
import ContactUs from './pages/contact';
import Cooperation from './pages/cooperation';
import AnnouncementPreview  from './pages/announcement/preview';


import Login from './pages/login-register/login';
import Register from './pages/login-register/register';
import ResetPwd from './pages/login-register/resetpwd';

import Home from './pages/home';
import TradeCenter from './pages/trade-center';
import Assets from './pages/assets';
import UserInfo from './pages/user';
import EssentialInformation from './pages/user/essentialInformation'
import IdentityAuthentication from './pages/user/identityAuthentication'
import BankInfo from './pages/user/bankInfo'
import PasswordSetting from './pages/user/passwordSetting'
import ModifyPassword from './mods/passwordSetting/modifyPassword'
import ModifyTraddingPassword from './mods/passwordSetting/modifyTradingPassword'
import SettingTraddingPassword from './mods/passwordSetting/settingTradingPassword'
import BindingPhone from './pages/user/bindingPhone'
import ModifyPhone from './mods/bindingPhone/modifyPhone'
import SettingPhone from './mods/bindingPhone/bindingPhone'
import BindingEmail from './pages/user/bindingEmail'
import ModifyEmail from './mods/bindingEmail/modifyEmail'
import SettingEmail from './mods/bindingEmail/bindingEmail'
import GoogleAuth from './pages/user/googleAuthenticator'
import RebindingGoogle from './mods/bindingGoogle/reBinding'
import GoogleGuide from './pages/user/googleGuide'
import Question from './pages/user/problemFeedback'

const routes = (
    <Route>
        <Route path="/" component={ Layout }>
        	<IndexRedirect to='home'/>
        	<Route path="home" component={Home}/>
        	<Route path="index" component={Home}/>
	        <Route path="trade(/:code)" component={TradeCenter}/>
	        <Route path="assets" component={Assets}/>
	        <Route path="user" component={UserInfo}>
					  <IndexRoute component={EssentialInformation}/>
						<Route path="authentication" component={IdentityAuthentication} />
						<Route path="bankInfo" component={BankInfo} />
						<Route path="passwordSetting" component={PasswordSetting} />
						<Route path="modifyPassword" component={ModifyPassword} />
						<Route path="modifyTraddingPassword" component={ModifyTraddingPassword} />
						<Route path="settingTraddingPassword" component={SettingTraddingPassword} />
						<Route path="bindingPhone" component={BindingPhone} />
						<Route path="modifyPhone" component={ModifyPhone} />
						<Route path="settingPhone" component={SettingPhone} />
						<Route path="bindingEmail" component={BindingEmail} />
						<Route path="modifyEmail" component={ModifyEmail} />
						<Route path="settingEmail" component={SettingEmail} />
						<Route path="google" component={GoogleAuth} />
						<Route path="rebindingGoogle" component={RebindingGoogle} />
						<Route path="googleGuide" component={GoogleGuide} />
						<Route path="question" component={Question} />
					</Route>
	        <Route path="login" component={Login}/>
	        <Route path="register" component={Register}/>
	        <Route path="resetpwd" component={ResetPwd}/>
	        <Route path="announcement/:announcementId" component={AnnouncementPreview} />
	        <Route path="help" component={Help}/>
	        <Route path="about" component={AboutUs}/>
	        <Route path="news" component={News}/>
	        <Route path="contact" component={ContactUs}/>
	        <Route path="feedback" component={Feedback}/>
	        <Route path="cooperation" component={Cooperation}/>
	        <Route path="careers" component={Careers}/>
	        <Route path="download" component={Download}/>

        </Route>
        <Route path="*" component={NotFound}/>
    </Route>
)

export default routes;