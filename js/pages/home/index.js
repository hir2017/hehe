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
import AnnounceList from '../../mods/home/announcelist';
import BtcNews from '../../mods/home/btcnews';
import HotMarkets from '../../mods/home/hotmarkets';
import IndexMarkets from '../../mods/home/indexmarkets';

const list = [require('../../../images/banner1.png'),require('../../../images/banner1.png'), require('../../../images/banner1.png')];

@inject('authStore', 'announceStore', 'homeStore')
@observer
class Home extends Component {
    constructor(props){
        super(props);
        this.filterCoin = this.filterCoin.bind(this)
    }

    componentDidMount() {
        // 最新公告数据获取
        this.props.announceStore.fetch(5);
        this.props.homeStore.getAllCoins();
    }

    filterCoin (name) {
        this.props.homeStore.filterCoin(name)
    }

    render() {
        let { authStore, announceStore, homeStore } = this.props;

        return (
            <div className="home-wrapper">
            	{ !authStore.isLogin ? <LoginGuide/> : null }
                <Banner list={list}/>
                <HotMarkets/>
                <IndexMarkets filterCoin={this.filterCoin} coins={homeStore.allCoins}/>
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
