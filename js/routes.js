import React, { Component } from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import Layout from './pages/layout';

import News from './pages/others/news';
import NewsList from './mods/news/list';
import NewsDetail from './mods/news/detail';
import Agreements from './pages/others/agreements';
import Help from './pages/others/help';
import AboutUs from './pages/others/about';
import Careers from './pages/others/careers';
import NotFound from './pages/others/404';
import Feedback from './pages/others/feedback';
import Download from './pages/others/download';
import ContactUs from './pages/others/contact';
import Cooperation from './pages/others/cooperation';

import Login from './pages/login-register/login';
import Register from './pages/login-register/register';
import ResetPwd from './pages/login-register/resetpwd';

// import Home from './pages/home';
// 授权登陆容器HOC
import Auth from './mods/authhoc/index';

// 我的资产
// import Assets from './pages/account/index';
// 充值＋充币＋提现＋提币
import FiatRecharge from './pages/recharge-withdraw/fiat-recharge';
import CoinRecharge from './pages/recharge-withdraw/coin-recharge';
import FiatWithdraw from './pages/recharge-withdraw/fiat-withdraw';
import CoinWithdraw from './pages/recharge-withdraw/coin-withdraw';
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
import BasicInfo from './pages/user/basic-info';
import IdCardAuth from './pages/user/idcard-auth';
import BankInfo from './pages/user/bank-info';
import PasswordSetting from './pages/user/password-setting'
import ModifyPassword from './mods/password-setting/modify-login-password'
import ModifyTraddingPassword from './mods/password-setting/modifyTradingPassword.v1.1'
import SettingTraddingPassword from './mods/password-setting/settingTradingPassword'
import BindingPhone from './pages/user/binding-phone'
import ModifyPhone from './mods/binding-phone/modify-phone'
import SettingPhone from './mods/binding-phone/binding-phone'
import BindingEmail from './pages/user/bindingEmail'
import SettingEmail from './mods/bindingEmail/bindingEmail'
import GoogleAuth from './pages/user/google-auth'
import RmbindingGoogle from './mods/binding-google/unbind'
import GoogleGuide from './pages/user/google-guide'
import Question from './pages/user/problemFeedback'
import QuestionList from './pages/user/feedbackList'
import QuestionDetails from './pages/user/feedbackDetails'
import EmailSuccess from './mods/bindingEmail/success'
import PhoneSuccess from './mods/binding-phone/success'
import ForgetTradingPassword from './mods/password-setting/forgetTradingPassword'


const Home = (location, cb)=>{
    require.ensure([], require=>{
        cb(null, require('./pages/home').default);
    }, 'home');
};

const TradeCenter = (location, cb)=>{
    require.ensure([], require=>{
        cb(null, require('./pages/trade-center').default);
    }, 'tradecenter');
};

const Assets = (location, cb)=>{
    require.ensure([], require=>{
        cb(null, require('./pages/account/index').default);
    }, 'assets');
}; 


const routes = (
    <Route>
        <Route path="/" component={ Layout }>
        	<IndexRedirect to='home'/>
        	<Route path="home" getComponent={Home}/>
        	<Route path="index" getComponent={Home}/>
	        <Route path="webtrade(/:pair)" getComponent={TradeCenter}/>

	        <Route path="account" component={Auth}>
	        	<IndexRoute getComponent={Assets}/>
	        	<Route path="assets" getComponent={Assets}/>
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
			 	<IndexRoute component={BasicInfo}/>
				<Route path="authentication" component={IdCardAuth} />
				<Route path="bankInfo" component={BankInfo} />
				<Route path="setpwd" component={PasswordSetting} />
				<Route path="resetpwd" component={ModifyPassword} />
				<Route path="modifyTraddingPassword" component={ModifyTraddingPassword} />
				<Route path="settingTraddingPassword" component={SettingTraddingPassword} />
				<Route path="forgetTradingPassword" component={ForgetTradingPassword} />
				<Route path="binding-phone" component={BindingPhone} />
				<Route path="modify-phone" component={ModifyPhone} />
				<Route path="settingPhone" component={SettingPhone} />
				<Route path="bindingEmail" component={BindingEmail} />
				<Route path="settingEmail" component={SettingEmail} />
				<Route path="google" component={GoogleAuth} />
				<Route path="rmbindingGoogle" component={RmbindingGoogle} />
				<Route path="google-guide" component={GoogleGuide} />
				<Route path="question" component={Question} />
				<Route path="questionList" component={QuestionList} />
				<Route path="feedbackDetails/:id" component={QuestionDetails} />
				<Route path="emailSuccess" component={EmailSuccess} />
				<Route path="phoneSuccess" component={PhoneSuccess} />
			</Route>
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />
			<Route path="resetpwd" component={ResetPwd} />
			<Route path="help" component={Help} />
			<Route path="about" component={AboutUs} />
			<Route path="news" component={News}>
                <IndexRoute component={NewsList}/>
                <Route path="detail/:id" component={NewsDetail} />
            </Route>
            <Route path="agreements/:name" component={Agreements} />
			<Route path="contact" component={ContactUs} />
			<Route path="feedback" component={Feedback} />
			<Route path="cooperation" component={Cooperation} />
			<Route path="careers" component={Careers} />
			<Route path="download" component={Download} />

		</Route>
		<Route path="*" component={NotFound} />
	</Route>
)

export default routes;
