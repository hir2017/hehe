/**
 * @fileoverview 交易中心
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Header from '../../mods/header';
import Footer from '../../mods/footer';


@inject('commonStore')
@observer
class TradeCenter extends Component {
    
    render() {
    	let commonStore = this.props.commonStore;
    	
        return (
            <div className="trade-wrapper" style={{ minHeight: commonStore.windowDimensions.height}}>
            	<Header root="3434"/>
                <div className="trade-main">
                    
                </div>
                <Footer/>
            </div> 
        );
    }
}

export default TradeCenter;
