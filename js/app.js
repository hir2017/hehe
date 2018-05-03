import '../css/reset.css';
import '../css/common.css';
import '../css/index.css';
import '../css/login-register.css';

import './lib/object.assign';
import './lib/promise';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Router, Route, hashHistory, browserHistory, useRouterHistory} from 'react-router';
import { observer, Provider } from 'mobx-react';
import { message } from 'antd';

import './base/global';
import routes from './routes';

import stores, { commonStore } from './stores/index';

@observer 
class App extends Component {
	static onUpdate() {
		commonStore.updatePathName(this.state.location.pathname);
	}
    render() {
        return (
        	<div className={`app-page ${commonStore.language}`}  key={commonStore.language} data-theme={commonStore.theme} >
                <Provider {...stores}>
            	   <Router history={browserHistory} routes={routes} onUpdate={App.onUpdate}></Router>
                </Provider>
            </div>
        );
    }
}

render(<App/>, document.getElementById('wrap'));
