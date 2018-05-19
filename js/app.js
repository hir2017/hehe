import '../css/reset.css';
import '../css/common.css';
import '../css/index.css';
import '../css/login-register.css';
import '../css/announcement.css';
import '../css/trade.css';
import '../css/user.css';

import './lib/object.assign';
import './lib/promise';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Router, Route, hashHistory, browserHistory, useRouterHistory} from 'react-router';
import { observer, Provider } from 'mobx-react';
import { message } from 'antd';

import './global';
import routes from './routes';

import RootStore from './stores/index';

const rootStore = new RootStore();

@observer 
class App extends Component {
    static createElement(Component, props) {
        // 确保传入了所有的 props！
        return <Component {...props}/>
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
                key={rootStore.commonStore.language} 
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
