/**
 * @fileoverview 首页
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Banner from '../../mods/banner';
import LoginGuide from '../../mods/loginguide';
import Features from '../../mods/features';
import AnnounceList from '../../mods/announcelist';
import BtcNews from '../../mods/btcnews';
import HotMarkets from '../../mods/hotmarkets';
import IndexMarkets from '../../mods/indexmarkets';

const list = [require('../../../images/banner1.png'),require('../../../images/banner1.png'), require('../../../images/banner1.png')];

@inject('authStore', 'announceStore')
@observer
class Home extends Component {
    constructor(props){
    	super(props);
    }

    componentDidMount() {
        // 最新公告数据获取
        this.props.announceStore.fetch(5);
    }

    render() {
    	let { authStore, announceStore } = this.props;

        return (
            <div className="home-wrapper">
            	{ !authStore.isLogin ? <LoginGuide/> : null }
                <Banner list={list}/>
                <HotMarkets/>
                <IndexMarkets/>
                <div className="module-box clearfix">
                	<div className="module-item">
                		<BtcNews />
                	</div>
                	<div className="module-item">
                		<AnnounceList list={announceStore.list}/>
                	</div>
                </div>
                <Features/>
            </div>
        );
    }
}

export default Home;
