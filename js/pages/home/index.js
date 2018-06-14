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
import NoticeList from '../../mods/home/noticelist';
import BtcNews from '../../mods/home/btcnews';
import HotMarkets from '../../mods/home/hotmarkets';
import IndexMarkets from '../../mods/home/indexmarkets';

const bannerList = [
    require('../../../images/banner1.png')
];

@inject('commonStore')
@observer
class Home extends Component {
    componentWillMount() {
        let { commonStore } = this.props;

        commonStore.getAllCoinPoint();
    }
    
    render() { 
        let { commonStore } = this.props;
        
        // 用于切换交易币时内容切换
        if (commonStore.productDataReady) {
            return <HomeContent {...this.props}/>    
        } else {
            return (
                <div className="home-wrapper">
                    <div className="mini-loading"></div>;
                </div>   
            )
        }
    }
}


@inject('authStore', 'announcementStore', 'homeStore')
@observer
class HomeContent extends Component {
    constructor(props){
        super(props);
        this.filterCoin = this.filterCoin.bind(this)
        this.sortCoin = this.sortCoin.bind(this)
    }

    componentDidMount() {
        // 最新公告数据获取
        this.props.announcementStore.fetch(6);
        this.props.homeStore.getAllCoins();
        this.props.homeStore.getCollectCoinsList();
    }

    filterCoin (name) {
        this.props.homeStore.filterCoin(name)
    }

    sortCoin (field, type) {
        this.props.homeStore.sortCoins(field, type)
    }

    render() {
        let { authStore, announcementStore, homeStore } = this.props;
        
        return (
            <div>
            	{ !authStore.isLogin ? <LoginGuide/> : null }
                <Banner list={bannerList}/>
                { announcementStore.formatedList.length > 0 ? <NoticeList list={announcementStore.formatedList}/> : null }
                { homeStore.hotCoins.length > 0 ? <HotMarkets list={homeStore.hotCoins}/> : null }
                <IndexMarkets sortCoin={this.sortCoin} filterCoin={this.filterCoin} coins={homeStore.allCoins}/>
                <Features/>
            </div>
        );
    }
}

export default Home;
