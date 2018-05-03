import React, { Component } from 'react';
import { Route , IndexRedirect} from 'react-router';

import Home from './pages/home';
import TradeCenter from './pages/trade-center';
import NotFound from './pages/404';
import Login from './pages/login';
import Register from './pages/register';


const routes = (
    <Route path="/">
        <IndexRedirect to='home'/>
        <Route path="home" component={Home}/>
        <Route path="trade" component={TradeCenter}/>
        <Route path="login" component={Login}/>
        <Route path="register" component={Register}/>
        <Route path="*" component={NotFound}/>
    </Route>
)

export default routes;