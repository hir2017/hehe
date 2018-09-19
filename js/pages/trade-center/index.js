/**
 * @fileoverview 交易中心
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon, message } from 'antd';

import ChartContainer from '../../mods/trade/chart/index';
import TradeHistory from '../../mods/trade/trade-history';
import OrderBook from '../../mods/trade/order-book';
import OrderForm from '../../mods/trade/order-form';
import MyOrder from '../../mods/trade/myorder/index';
import toAction from './index.action';

@inject('commonStore', 'currencyStore','tradeStore')
@observer
class TradeCenter extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        let { currencyStore , commonStore } = this.props;

        commonStore.getAllCoinPoint();
        currencyStore.getAllCurrencyRelations();

        $('html').addClass('exc-html-trade');
    }

    componentWillUnmount() {
        $('html').removeClass('exc-html-trade');
    }

    render() {
        let { tradeStore, currencyStore, commonStore } = this.props;

        // 用于切换交易币时内容切换
        if (currencyStore.currencyDataReady && commonStore.productDataReady) {
            return <TradeContent {...this.props}/>;
        } else {
            return (
                <div className="trade-wrapper" style={{ height: tradeStore.contentHeight}}>
                    <div className="mini-loading"></div>
                </div>
            )
        }
    }
}

@inject('tradeStore', 'commonStore', 'authStore')
@observer
class TradeContent extends Component {
    constructor(props){
        super(props);

        this.action = toAction(this.props.tradeStore, this.props.currencyStore);


        this.state = {
            data: null
        }
    }

    componentWillMount() {
        let { tradeStore, currencyStore , authStore } = this.props;

        let pair = this.props.params.pair;

        if (!pair) {
            return;
        }

        let tradePair = currencyStore.getCurrencyByPair(pair);
        let { baseCurrencyId, tradeCurrencyId } = tradePair;

        if (!baseCurrencyId  || !tradeCurrencyId) {
            UPEX.cache.removeCache('currentCoin');
            return;
        }

        // 当前币信息获取以及监听币种变更的消息通知
        tradeStore.updateTradePair({
            baseCurrencyId,
            tradeCurrencyId
        });
        this.action.getCurrentCoin();
        this.action.listenQuoteNotify();
        this.action.sendSubscribe();

        // 获取买卖盘口数据
        this.action.getEntrust();
        // 获取实时交易历史数据
        this.action.getTradeHistory();

        // 若用户已登录，还需获取用户相关信息
        if (authStore.isLogin) {
            let uid = authStore.uid;
            let token = authStore.token;

            this.action.getUserAccount(uid, token);
            this.action.bindOrderSocket(uid, token);
            this.action.getPersonalTradingPwd();
        }

        this.setState({
            data: tradePair
        });

        // 缓存上次浏览器的交易币对
        UPEX.cache.setCache('currentCoin', {
            baseCurrencyNameEn: tradePair.baseCurrencyNameEn,
            currencyNameEn: tradePair.tradeCurrencyNameEn
        })

        //     tradeStore.getPersonalInfo();
        // 隐藏zendesk
        zE(function() {
            zE.hide();
        });
    }

    componentDidMount(){
        let { authStore } = this.props;
        let uid = authStore.uid;
        let token = authStore.token;

        $.channel.on('updateUserAccount', ()=>{
            this.action.getUserAccount(uid, token);
        })
    }

    componentWillUnmount() {
        this.action.destroy();
        // 显示zendesk
        zE(function() {
            zE.show();
        });
    }

    render() {
    	let store = this.props.tradeStore;
        let { data } = this.state;

        return (
            <div className="trade-wrapper" style={{ height: store.contentHeight}}>
                <div className="trade-main">
                    <div className={`trade-main-chart grid-box ${store.expandOrderTable ? 'hidden' : ''}`} style={{ height: store.mainChartHeight}}>
                        { data ? <ChartContainer key={`${data.baseCurrencyId}${data.currencyId}`} data={data}/> : null }
                    </div>
                    <div className="trade-main-order grid-box" style={{ height: store.mainOrderHeight}}>
                        <MyOrder/>
                    </div>
                </div>
                <div className="trade-extra">
                    <div className="trade-extra-list clearfix">
                        <div className="list-box-l grid-box">
                            <OrderBook/>
                        </div>
                        <div className="list-box-r grid-box" >
                            <TradeHistory/>
                        </div>
                    </div>

                    <div className="trade-extra-handle grid-box">
                        {
                            data ? <OrderForm data={data}/> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TradeCenter;
