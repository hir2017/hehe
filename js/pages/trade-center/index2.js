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
import MyOrder from '../../mods/trade/myorder/index';
import OrderBook from '../../mods/trade/order-book';
import OrderForm from '../../mods/trade/order-form';

@inject('commonStore', 'currencyStore','tradeStore')
@observer
class TradeCenter extends Component {
    componentWillMount() {
        let { commonStore, currencyStore } = this.props;

        commonStore.getAllCoinPoint();
        currencyStore.getCurrencyPoints();
    }

    render() {
        let { commonStore, tradeStore, currencyStore } = this.props;
        
        // 用于切换交易币时内容切换
        if (commonStore.productDataReady && currencyStore.currencyDataReady) {
            return <TradeContent {...this.props}/>
        } else {
            return (
                <div className="trade-wrapper" style={{ height: tradeStore.contentHeight}} >
                    <div className="mini-loading"></div>
                </div>
            )
        }
    }
}

@inject('tradeStore', 'commonStore')
@observer
class TradeContent extends Component {
    static defaultProps = {
        entrustTab: ['all', 'buy', 'sell']
    }

    componentWillMount() {
        // let { tradeStore, commonStore } = this.props;

        // // 更新交易币对
        // let pair = this.props.params.pair;

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

        //     tradeStore.getData();
        //     tradeStore.sendSubscribe();
        //     tradeStore.getEntrust();
        //     tradeStore.getTradeHistory();
        //     tradeStore.getUserAccount();
        //     tradeStore.getPersonalTradingPwd();
        //     tradeStore.getPersonalInfo();
        //     tradeStore.bindOrderSocket();
        }
    }

    componentWillUnmount(){
        this.props.tradeStore.destorySocket();
    }


    render() {
    	let store = this.props.tradeStore;

        let trendIcon, trendColor = '';

        if (store.currentTradeCoin && store.currentTradeCoin.currentAmount) {

            if (store.currentTradeCoin.currentAmount > store.currentTradeCoin.previousPrice) {
                trendColor = 'greenrate';
                trendIcon = <Icon type="arrow-up" style={{fontSize: 12}}/>;
            } else if(store.currentTradeCoin.currentAmount < store.currentTradeCoin.previousPrice){
                trendColor = 'redrate';
                trendIcon = <Icon type="arrow-down" style={{fontSize: 12}}/>;
            }
        }

        return (
            <div className="trade-wrapper" style={{ height: store.contentHeight + 10}}>
                <div className="trade-main">
                    <div className={`trade-main-chart grid-box ${store.expandOrderTable ? 'hidden' : ''}`} style={{ height: store.mainChartHeight}}>
                        {
                            store.pointPrice > -1 ? <ChartContainer/> : null
                        }
                    </div>
                    <div className="trade-main-order grid-box" id="tradeMainOrder" style={{ height: store.mainOrderHeight}}>
                        {
                            <MyOrder/>
                        }
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
        				<OrderForm/>
        			</div>
            	</div>
            </div>
        );
    }
}

export default TradeCenter;
