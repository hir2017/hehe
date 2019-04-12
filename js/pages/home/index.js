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
import { BackTop } from 'antd';

@inject('authStore', 'homeStore')
@observer
class Home extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.homeStore.getData();
    }

    render() {
        let store = this.props.homeStore.marketListStore;

        return  (
            <div className="home-wrapper">
                {/* { !this.props.authStore.isLogin ? <LoginGuide/> : null } */}
                {/* <Banner>
                    <NoticeList/>
                </Banner> */}
                <HotMarkets />
                <IndexMarkets/>
                <Features/>
                <BackTop>
                  <div className="ant-back-top-inner"></div>
                </BackTop>
            </div>
        );
    }
}


export default Home;
