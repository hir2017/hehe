/**
 * @fileoverview  我的资产页面
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import List from '../../mods/account/assets-list';
import Info from '../../mods/account/account-info';


@inject('commonStore')
@observer
class AccountPage extends Component {
    componentWillMount() {
        let { commonStore } = this.props;

        commonStore.getAllCoinPoint();
    }
    
    render() { 
        let { commonStore } = this.props;
        
        // 用于切换交易币时内容切换
        if (commonStore.productDataReady) {
            return <Account {...this.props}/>    
        } else {
            return (
                <div className="home-wrapper">
                    <div className="mini-loading"></div>
                </div>   
            )
        }
    }
}


@inject('accountStore')
@observer
class Account extends Component {
    componentDidMount(){
        let store = this.props.accountStore;

        store.getUserCoinAccount();
    }
    
    render() {
        return (
        	<div className="account-wrapper">
        		<div className="account-hd">
        			<Info/>
        		</div>
        		<div className="account-bd">
                    <List/>
                </div>
        	</div>
        )
    }
}

export default AccountPage;