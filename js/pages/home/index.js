/**
 * @fileoverview 首页
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Banner from '../../mods/home/banner';
import LoginGuide from '../../mods/home/loginguide';
import Features from '../../mods/home/features';
import AnnouncementList from '../../mods/home/announcementlist';
import BtcNews from '../../mods/home/btcnews';
import HotMarkets from '../../mods/home/hotmarkets';
import IndexMarkets from '../../mods/home/indexmarkets';

const list = [
    require('../../../images/banner1.png'),
    require('../../../images/banner1.png'), 
    require('../../../images/banner1.png')
];

@inject('authStore', 'announcementStore', 'homeStore')
@observer
class Home extends Component {
    constructor(props){
    	super(props);
    }

    componentDidMount() {
        // 最新公告数据获取
        this.props.announcementStore.fetch(6);
        this.props.homeStore.getAllCoins();
    }

    render() {
    	let { authStore } = this.props;

        return (
            <div className="home-wrapper">
            	{ !authStore.isLogin ? <LoginGuide/> : null }
                <Banner list={list}/>
                <AnnouncementList/>
                <HotMarkets/>
                <IndexMarkets/>
                <Features/>
            </div>
        );
    }
}

export default Home;
