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


@inject('authStore', 'marketListStore')
@observer
class HomeContent extends Component {
    constructor(props){
        super(props);
        // this.filterCoin = this.filterCoin.bind(this)
        // this.sortCoin = this.sortCoin.bind(this)
    }

    componentDidMount() {
        this.props.marketListStore.getData();        
        // this.props.homeStore.getAllCoins();
        // this.props.homeStore.getCollectCoinsList();
    }

    // filterCoin (name) {
    //     this.props.homeStore.filterCoin(name)
    // }

    // sortCoin (field, type) {
    //     this.props.homeStore.sortCoins(field, type)
    // }

    render() {
        let store = this.props.marketListStore;

        return (
            <div className="home-wrapper">
            	{ !this.props.authStore.isLogin ? <LoginGuide/> : null }
                <Banner/>
                <NoticeList/>
                { store.hotCoins.length > 0 ? <HotMarkets/> : null }
                { store.tradeCoins.length > 0  ? <IndexMarkets/>: null }
                <Features/>
            </div>
        );
    }
}

export default Home;
