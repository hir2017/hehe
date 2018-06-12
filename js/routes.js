import React, { Component } from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import Layout from './pages/layout';

import News from './pages/others/news';
import Help from './pages/others/help';
import AboutUs from './pages/others/about';
import Careers from './pages/others/careers';
import NotFound from './pages/others/404';
import Feedback from './pages/others/feedback';
import Download from './pages/others/download';
import ContactUs from './pages/others/contact';
import Cooperation from './pages/others/cooperation';
import AnnouncementPreview from './pages/announcement/preview';

import Login from './pages/login-register/login';
import Register from './pages/login-register/register';
import ResetPwd from './pages/login-register/resetpwd';

import Home from './pages/home';
import TradeCenter from './pages/trade-center';
// 授权登陆容器HOC
import Auth from './mods/authhoc/index';

// 我的资产
import Assets from './pages/account/index';
// 充值＋充币＋提现＋提币
import FiatRecharge from './pages/recharge-withdraw/fiat-recharge';
import CoinRecharge from './pages/recharge-withdraw/coin-recharge';
import FiatWithdraw from  './pages/recharge-withdraw/fiat-withdraw';
import CoinWithdraw from  './pages/recharge-withdraw/coin-withdraw';
import CoinAddress from './pages/recharge-withdraw/address';

// 订单相关
// 交易订单
import OrderHoc from './pages/record-list/record-trade-hoc';
import OpenRecordList from './mods/record-list/record-open';
import HistoryRecordList from './mods/record-list/record-history';
import SuccessRecordList from './mods/record-list/record-success';
// 充值＋充币＋提现＋提币
import CoinRecord from './pages/record-list/record-coin';
import FiatRecord from './pages/record-list/record-fiat';

// 个人中心
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
import RmbindingGoogle from './mods/bindingGoogle/rmBinding'
import GoogleGuide from './pages/user/googleGuide'
import Question from './pages/user/problemFeedback'
import QuestionList from './pages/user/feedbackList'
import QuestionDetails from './pages/user/feedbackDetails'
import EmailSuccess from './mods/bindingEmail/success'
import PhoneSuccess from './mods/bindingPhone/success'
import ForgetTradingPassword from './mods/passwordSetting/forgetTradingPassword'

const routes = (
    <Route>
        <Route path="/" component={ Layout }>
        	<IndexRedirect to='home'/>
        	<Route path="home" component={Home}/>
        	<Route path="index" component={Home}/>
	        <Route path="trade(/:pair)" component={TradeCenter}/>
	        
	        <Route path="account" component={Auth}>
	        	<IndexRoute component={Assets}/>
	        	<Route path="assets" component={Assets}/>
	        	<Route path="coinrecord" component={CoinRecord}/>
	        	<Route path="fiatrecord" component={FiatRecord}/>
	        	<Route path="balance">
	        		<Route path="recharge" component={FiatRecharge}/>
	        		<Route path="withdraw" component={FiatWithdraw}/>
	        	</Route>
	        	<Route path="coin">
	        		<Route path="recharge(/:code)" component={CoinRecharge}/>
	        		<Route path="withdraw(/:code)" component={CoinWithdraw}/>
	        		<Route path="address(/:code)" component={CoinAddress}/>
	        	</Route>
	        	<Route path="record" component={OrderHoc}>
		        	<IndexRoute component={OpenRecordList}/>
		        	<Route path="open" component={OpenRecordList} />
		        	<Route path="history" component={HistoryRecordList} />
		        	<Route path="success" component={SuccessRecordList} />
		        </Route>
	        </Route>
	        
	        <Route path="user" component={UserInfo}>
			 	<IndexRoute component={EssentialInformation}/>
				<Route path="authentication" component={IdentityAuthentication} />
				<Route path="bankInfo" component={BankInfo} />
				<Route path="passwordSetting" component={PasswordSetting} />
				<Route path="modifyPassword" component={ModifyPassword} />
				<Route path="modifyTraddingPassword" component={ModifyTraddingPassword} />
				<Route path="settingTraddingPassword" component={SettingTraddingPassword} />
				<Route path="forgetTradingPassword" component={ForgetTradingPassword} />
				<Route path="bindingPhone" component={BindingPhone} />
				<Route path="modifyPhone" component={ModifyPhone} />
				<Route path="settingPhone" component={SettingPhone} />
				<Route path="bindingEmail" component={BindingEmail} />
				<Route path="settingEmail" component={SettingEmail} />
				<Route path="google" component={GoogleAuth} />
				<Route path="rmbindingGoogle" component={RmbindingGoogle} />
				<Route path="googleGuide" component={GoogleGuide} />
				<Route path="question" component={Question} />
				<Route path="questionList" component={QuestionList} />
				<Route path="feedbackDetails/:id" component={QuestionDetails} />
				<Route path="emailSuccess" component={EmailSuccess} />
				<Route path="phoneSuccess" component={PhoneSuccess} />
			</Route>
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />
			<Route path="resetpwd" component={ResetPwd} />
			<Route path="announcement/:announcementId" component={AnnouncementPreview} />
			<Route path="help" component={Help} />
			<Route path="about" component={AboutUs} />
			<Route path="news" component={News} />
			<Route path="contact" component={ContactUs} />
			<Route path="feedback" component={Feedback} />
			<Route path="cooperation" component={Cooperation} />
			<Route path="careers" component={Careers} />
			<Route path="download" component={Download} />

		</Route>
		<Route path="*" component={NotFound} />
	</Route>
)

export {
	TradeCenter
}
export default routes;