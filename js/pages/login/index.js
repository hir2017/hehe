/**
 * @fileoverview 登录页面
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Tabs  } from 'antd';
import Header from '../../mods/header';
import Footer from '../../mods/footer';

@inject('commonStore', 'authStore')
@observer
class Login extends Component {
    constructor(props){
    	super(props);
    }

    handleLogin=()=>{
    	
    }
    render() {
        return (
            <div className="login-wrapper tobottom-footer" style={{ minHeight: this.props.commonStore.windowDimensions.height}}>
            	<Header/>
                <div className="login-main">
                    
                </div>
                <Footer/>
            </div> 
        );
    }
}

export default Login;