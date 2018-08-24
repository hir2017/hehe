/**
 * @fileoverview 交易中心
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'antd';

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
        let { currencyStore } = this.props;

        currencyStore.getAllCurrencyRelations();

        $('#wrap').addClass('page-fullscreen');
    }

    render() {
        let { tradeStore, currencyStore } = this.props;
        
        // 用于切换交易币时内容切换
        if (currencyStore.currencyDataReady) {
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

@inject('tradeStore', 'commonStore')
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
        let { currencyStore } = this.props;

        let pair = this.props.params.pair;

        if (!pair) {
            return;
        }

        let tradePair = currencyStore.getCurrencyByPair(pair);
        let { baseCurrencyId, tradeCurrencyId } = tradePair;

        if (!baseCurrencyId  || !tradeCurrencyId) {
            return;
        }
        
        // 当前币信息获取以及监听币种变更的消息通知
        this.action.getCurrentCoin(baseCurrencyId, tradeCurrencyId);    
        this.action.listenQuoteNotify();
        this.action.sendSubscribe(baseCurrencyId, tradeCurrencyId);


        this.action.getEntrust(baseCurrencyId, tradeCurrencyId);
        this.action.getTradeHistory(baseCurrencyId, tradeCurrencyId);

        this.setState({
            data: tradePair
        });

        // if (pair) {
        //     let pairArr = pair.split('_');
        //     let a = pairArr[0].toUpperCase();
        //     let b = pairArr[1].toUpperCase();
        //     let baseCurrencyId = commonStore.getTradeCoinByName(a).currencyId;
        //     let currencyId = commonStore.getTradeCoinByName(b).currencyId;

        //     if (!baseCurrencyId || !currencyId) {
        //         return;
        //     }
        //     // 缓存上次浏览器的交易币对
        //     UPEX.cache.setCache('currentCoin', {
        //         baseCurrencyNameEn: a,
        //         currencyNameEn: b
        //     })

        //     tradeStore.updateCurrency({
        //         baseCurrencyNameEn: a,
        //         currencyNameEn: b,
        //         baseCurrencyId,
        //         currencyId
        //     });

        
        //     tradeStore.getUserAccount();
        //     tradeStore.getPersonalTradingPwd();
        //     tradeStore.getPersonalInfo();
        //     tradeStore.bindOrderSocket();
        
    }

    componentWillUnmount() {
        this.action.destroy();
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
                            // data ? <OrderForm data={data}/> : null 
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TradeCenter;
