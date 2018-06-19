/**
 * 授权
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { message } from 'antd';

@inject('authStore')
@observer
class Auth extends Component {
	constructor(props) {
        super(props);

        this.state = {
            isLogin: false
        };
    }

    componentWillMount() {
        if (this.props.authStore.isLogin) {
        	this.setState({
        		isLogin: true
        	})
        } else {
            message.error(UPEX.lang.template('登录超时，请重新登录'));

            browserHistory.push('/login');

        	this.setState({
        		isLogin: false
        	});
        }
    }

    render() {
    	if (this.state.isLogin) {
    		return this.props.children;
    	} else {
    		return null
    	}
    }
}

export default Auth;
