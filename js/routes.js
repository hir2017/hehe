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