/**
 * @fileoverview 
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import List from '../../mods/assets/assets-list';
import Info from '../../mods/assets/assets-info';

@inject('assetsStore')
@observer
class AssetsPage extends Component {
    componentDidMount(){
        let store = this.props.assetsStore;

        store.getUserCoinAccount();
    }
    
    render() {
        return (
        	<div className="assets-wrapper">
        		<div className="assets-hd">
        			<Info/>
        		</div>
        		<div className="assets-bd">
                    <List/>
                </div>
        	</div>
        )
    }
}

export default AssetsPage;