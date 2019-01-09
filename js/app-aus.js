import '../css/reset.css';
import '../css/common.less';
import '../css/exc-style/index.less';
import '../css/home.less';
import '../css/login-register.less';
import '../css/trade.less';
import '../css/user.less';
import '../css/news.css';
import '../css/account.less';
import '../css/order.less';
import '../css/recharge-withdraw.less';
import '../css/aus/exchange-base.less';
import '../css/aus/style-aus.less';
import '../css/antd-reset.less';

import './lib/object.assign';
import './lib/promise';

import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Router, Route, hashHistory, browserHistory, useRouterHistory} from 'react-router';
import { observer, Provider } from 'mobx-react';
import { message } from 'antd';
// import Url from './lib/url';

// import LangPack from './lang/appaus/pack.js';
// window.LangPack = LangPack;

import './config-aus';
import './global';
// 谷歌埋点
import Gtag from './lib/ga-analytics';

import routes from './routes-aus';
import RootStore from './stores/index';

const rootStore = new RootStore();

@observer
class App extends Component {
    static createElement(Component, props) {

        if (props.location.pathname.indexOf('webtrade') > -1) {
            let  { pair} = props.params;

            if(!pair) {
                let coin = UPEX.cache.getCache('currentCoin');

                if (coin) {
                    pair = [coin.baseCurrencyNameEn, coin.currencyNameEn].join('_');
                } else {
                   pair = [UPEX.config.baseCurrencyEn, 'BTC'].join('_');
                }

                props.params.pair = pair;
            }

            return <Component {...props} key={pair}/>
        } else {
            // 确保传入了所有的 props！
            return <Component {...props}/>
        }
    }

    static onUpdate() {
        const {pathname} = this.state.location;
        // 谷歌统计 openXXXPage
        Gtag.openPage(pathname);

		rootStore.commonStore.updatePathName(this.state.location.pathname);
        window.scrollTo(0,0);
	}

    componentDidMount(){
        // 授权失效，清除状态
        $.channel.on('authorizeinvalid', ()=>{
            rootStore.authStore.clear();
        });
    }

    render() {
        return (
        	<div
                key={rootStore.commonStore.language + rootStore.authStore.uid }
                className={`app-page ${rootStore.commonStore.language} ${UPEX.config.version}`}
                data-path={rootStore.commonStore.currentPathName}
            >
                <Provider {...rootStore}>
            	   <Router history={browserHistory} routes={routes} onUpdate={App.onUpdate} createElement={App.createElement}></Router>
                </Provider>
            </div>
        );
    }
}

message.config({
    top: 100
});

render(<App/>, document.getElementById('wrap'));
