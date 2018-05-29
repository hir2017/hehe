/**
 * @fileoverview 
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import List from '../../mods/account/assets-list';
import Info from '../../mods/account/account-info';

@inject('accountStore')
@observer
class AccountPage extends Component {
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