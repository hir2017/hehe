import '../css/reset.css';
import '../css/common.css';
import '../css/index.css';
import '../css/login-register.css';
import '../css/announcement.css';
import '../css/trade.css';
import '../css/trade-night.css';
import '../css/trade-day.css';
import '../css/user.css';
import '../css/news.css';
import '../css/account.css';
import '../css/order.css';
import '../css/recharge-withdraw.css';

import './lib/object.assign';
import './lib/promise';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Router, Route, hashHistory, browserHistory, useRouterHistory} from 'react-router';
import { observer, Provider } from 'mobx-react';
import { message } from 'antd';
import Url from './lib/url';

message.config({
    top: 100,
    maxCount: 1
});

import './global';
import routes, { TradeCenter } from './routes';

import RootStore from './stores/index';

const rootStore = new RootStore();

@observer
class App extends Component {
    static createElement(Component, props) {
        switch (Component) {
            case TradeCenter:
                let  { pair} = props.params;

                if(!pair) {
                    let coin = UPEX.cache.getCache('currentCoin');

                    if (coin) {
                        pair = [coin.baseCurrencyNameEn, coin.currencyNameEn].join('_');
                    } else {
                       pair = 'TWD_BTC';
                    }

                    props.params.pair = pair;
                }

                return <Component {...props} key={pair}/>
                break;
            default:
                // 确保传入了所有的 props！
                return <Component {...props}/>
        }
    }

    static onUpdate() {
		rootStore.commonStore.updatePathName(this.state.location.pathname);
        window.scrollTo(0,0);
	}

    componentDidMount(){
        // 授权失效，清除状态
        $.channel.on('authorizeinvalid', ()=>{
            rootStore.authStore.update({
                uid: '',
                token: ''
            });
        });
    }

    render() {
        return (
        	<div
                key={rootStore.commonStore.language + rootStore.authStore.uid }
                className={`app-page ${rootStore.commonStore.language}`}
                data-path={rootStore.commonStore.currentPathName}
            >
                <Provider {...rootStore}>
            	   <Router history={browserHistory} routes={routes} onUpdate={App.onUpdate} createElement={App.createElement}></Router>
                </Provider>
            </div>
        );
    }
}

render(<App/>, document.getElementById('wrap'));
