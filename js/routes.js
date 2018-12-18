import React, {Component} from 'react';
import {Route, IndexRedirect, IndexRoute} from 'react-router';

import Layout from './pages/layout';

import News from './pages/others/news';
import NewsList from './mods/news/list';
import NewsDetail from './mods/news/detail';

import NotFound from './pages/others/404';

import Login from './pages/login-register/login';
import Register from './pages/login-register/register';
import ResetPwd from './pages/login-register/resetpwd';
import InviteRegister from './pages/activity/invite/invite-register';

// 授权登陆容器HOC
import Auth from './mods/authhoc/index';

// 我的资产
// 充值＋充币＋提现＋提币
// import FiatRecharge from './pages/recharge-withdraw/fiat-recharge/index-CCNET';
import FiatRecharge from './pages/recharge-withdraw/fiat-recharge';
import FiatRechargeResult from './pages/recharge-withdraw/fiat-recharge/spgateway-result';
import CoinRecharge from './pages/recharge-withdraw/coin-recharge';
import FiatWithdraw from './pages/recharge-withdraw/fiat-withdraw';
import CoinWithdraw from './pages/recharge-withdraw/coin-withdraw';
import CoinAddress from './pages/recharge-withdraw/address';
import RecordAssetsChange from './pages/record-list/assets-change';

// 订单相关
// 交易订单
import OrderHoc from './pages/record-list/record-trade-hoc';
import OpenRecordList from './pages/record-list/order/open';
import HistoryRecordList from './pages/record-list/order/history';
import SuccessRecordList from './pages/record-list/order/success';
// 充值＋充币＋提现＋提币
import CoinRecord from './pages/record-list/coin';
import FiatRecord from './pages/record-list/fiat';

// 个人中心
import UserInfo from './pages/user';
import BasicInfo from './pages/user/basic-info/index';
import IdCardAuth from './pages/user/idcard-auth';
import BankInfo from './pages/user/bank-info';
import PasswordSetting from './pages/user/password-setting'
import ModifyPwd from './mods/password-setting/modify-login-pwd'
import SetTradePwd from './pages/user/trade-pwd-setting'
import ModifyTradePwd from './pages/user/trade-pwd-modify'
import forgetTradePwd from './pages/user/trade-pwd-forget'
import BindingPhone from './pages/user/binding-phone'
import ModifyPhone from './mods/binding-phone/modify-phone'
import SettingPhone from './mods/binding-phone/binding-phone'
import BindingEmail from './pages/user/binding-email'
import SettingEmail from './mods/binding-email/binding-email'
import GoogleAuth from './pages/user/google-auth'
import UnbindingGoogle from './mods/binding-google/unbind'
import GoogleGuide from './pages/user/google-guide'
import EmailSuccess from './mods/binding-email/success'
import PhoneSuccess from './mods/binding-phone/success'
// IEO
import IEO from './pages/ieo/main'
import IEODetail from './pages/ieo/detail'

const Home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./pages/home').default);
    }, 'home');
};

const TradeCenter = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./pages/trade-center').default);
    }, 'webtrade');
};

const Assets = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./pages/account/index').default);
    }, 'assets');
};

const Invite = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./pages/activity/invite/index').default);
    }, 'invite');
};


const onEnterHandle = (nextState, replace) => {
    // const {location} = nextState;
    // let ua = navigator.userAgent;
    // let isMobile = /(iPhone|iPad|iPod|iOS)/i.test(ua) || /[aA]ndroid/i.test(ua);
    // const pathMap = {
    //     '/login':'/h5ace/#/login',
    //     '/register':'/h5ace/#/register',
    //     '/user/authentication':'/h5ace/#/kyc-auth',
    // }
    // if (isMobile && pathMap[location.pathname]){
    //     window.location.href = pathMap[location.pathname]
    //     // replace(pathMap[location.pathname]);
    // }

}


const routes = (
    <Route>
        <Route path="/" component={Layout}>
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
                    <Route path="recharge-spgateway-result" component={FiatRechargeResult}/>
                    <Route path="withdraw" component={FiatWithdraw}/>
                </Route>
                <Route path="coin">
                    <Route path="recharge(/:code)" component={CoinRecharge}/>
                    <Route path="withdraw(/:code)" component={CoinWithdraw}/>
                    <Route path="address(/:code)" component={CoinAddress}/>
                </Route>
                <Route path="record" component={OrderHoc}>
                    <IndexRoute component={OpenRecordList}/>
                    <Route path="open" component={OpenRecordList}/>
                    <Route path="history" component={HistoryRecordList}/>
                    <Route path="success" component={SuccessRecordList}/>
                </Route>
                <Route path="asset-change">
                    <IndexRedirect to='deposit'/>
                    <Route path=":type" component={RecordAssetsChange}/>
                </Route>
            </Route>

            <Route path="user" component={UserInfo}>
                <IndexRoute component={BasicInfo}/>
                <Route path="authentication" onEnter={onEnterHandle} component={IdCardAuth}/>
                <Route path="bankInfo" component={BankInfo}/>
                <Route path="setpwd" component={PasswordSetting}/>
                <Route path="resetpwd" component={ModifyPwd}/>
                <Route path="modify-trade-pwd" component={ModifyTradePwd}/>
                <Route path="set-trade-pwd" component={SetTradePwd}/>
                <Route path="forget-trade-pwd" component={forgetTradePwd}/>
                <Route path="binding-phone" component={BindingPhone}/>
                <Route path="modify-phone" component={ModifyPhone}/>
                <Route path="setting-phone" component={SettingPhone}/>
                <Route path="binding-email" component={BindingEmail}/>
                <Route path="setting-email" component={SettingEmail}/>
                <Route path="google" component={GoogleAuth}/>
                <Route path="unbinding-google" component={UnbindingGoogle}/>
                <Route path="google-guide" component={GoogleGuide}/>
                <Route path="emailSuccess" component={EmailSuccess}/>
                <Route path="phoneSuccess" component={PhoneSuccess}/>
            </Route>
            <Route path="news" component={News}>
                <IndexRoute component={NewsList}/>
                <Route path="detail/:id" component={NewsDetail}/>
            </Route>
            <Route path="activity">
                <Route path="invite-register" component={InviteRegister}/>
                <Route component={Auth}>
                    <IndexRoute getComponent={Invite}/>
                    <Route path="invite(-:type)" getComponent={Invite}/>
                </Route>
            </Route>
            <Route path="ieo">
                <IndexRoute component={IEO}/>
                <Route path="detail/:id" component={IEODetail}/>
            </Route>
            <Route path="login" onEnter={onEnterHandle} component={Login}/>
            <Route path="register" onEnter={onEnterHandle} component={Register}/>
            <Route path="resetpwd" component={ResetPwd}/>
        </Route>
        <Route path="*" component={NotFound}/>
    </Route>
)

export default routes;
