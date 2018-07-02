/**
 * @fileoverview 交易中心
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'antd';
import Url from '../../lib/url';
import TVChartContainer from '../../mods/trade/kline/tv-chart';
import BuyOrder from '../../mods/trade/order/buy-order';
import SellOrder from '../../mods/trade/order/sell-order';
import HistoryOrder from '../../mods/trade/order/history-order';
import MyOrder from '../../mods/trade/myorder/index';
import TradeForm from '../../mods/trade/form/index';

@inject('commonStore', 'tradeStore')
@observer
class TradeCenter extends Component {
    componentWillMount() {
        let { commonStore } = this.props;

        commonStore.getAllCoinPoint();
    }
    
    render() { 
        let { commonStore, tradeStore } = this.props;
        
        // 用于切换交易币时内容切换
        if (commonStore.productDataReady) {
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
        let { tradeStore, commonStore } = this.props;

        // 更新交易币对
        let pair = this.props.params.pair;

        if (pair) {
            let pairArr = pair.split('_');
            let a = pairArr[0].toUpperCase();
            let b = pairArr[1].toUpperCase();
            let baseCurrencyId = commonStore.getTradeCoinByName(a).currencyId;
            let currencyId = commonStore.getTradeCoinByName(b).currencyId;
            
            if (!baseCurrencyId || !currencyId) {
                return;
            }
            // 缓存上次浏览器的交易币对
            UPEX.cache.setCache('currentCoin', {
                baseCurrencyNameEn: a,
                currencyNameEn: b
            }) 

            tradeStore.updateCurrency({
                baseCurrencyNameEn: a,
                currencyNameEn: b,
                baseCurrencyId, 
                currencyId
            });    

            tradeStore.getData();
            tradeStore.getEntrust();
            tradeStore.getTradeHistory();
            tradeStore.getUserAccount();
            tradeStore.getPersonalTradingPwd();
            tradeStore.getPersonalInfo();
        }
    }

    componentWillUnmount(){
        this.props.tradeStore.destorySocket();
    }

    onChangeEntrustType=(type)=>{
        this.props.tradeStore.setType(type);    
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
                    <div className="trade-main-chart grid-box" id="tradeMainKline" style={{ height: store.mainChartHeight}}>
                        <TVChartContainer/>
                    </div>
                    <div className="trade-main-order grid-box" id="tradeMainOrder" style={{ height: store.mainOrderHeight}}>
                        {
                            <MyOrder/>
                        }
                    </div>
                </div>
            	<div className="trade-extra">
        			<div className="trade-extra-list clearfix">
                        <div className="list-box-l grid-box" data-type={store.type}>
                            <div className="list-box-hd">
                                <ul className="tab">
                                    {
                                       ['all', 'sell', 'buy'].map((item, index)=>{
                                            let cls = store.type == item ? `${item} selected`: item;

                                            return (
                                                <li className={cls} key={item} onClick={this.onChangeEntrustType.bind(this, item)}></li>
                                            )
                                       })
                                    }
                                </ul>
                            </div>
                            <div className="list-box-bd">
                                <div className="table-hd">
                                    <div className="price">{ UPEX.lang.template('价格')}</div>
                                    <div className="number">{ UPEX.lang.template('数量')}</div>
                                    <div className="total">{ UPEX.lang.template('金额')}</div>
                                </div>
                                <div className="table-bd">
                                    {
                                        store.type !== 'buy' ? (
                                            <div className="trade-buy-box">
                                                <SellOrder/>
                                            </div>
                                        ) : null
                                    }
                                    <div className={`trade-current-amount ${trendColor}`}>
                                        <div className="count">
                                            <em>{store.currentTradeCoin.currentAmountText}</em>
                                            {trendIcon}
                                        </div>
                                    </div>
                                    {
                                        store.type !==  'sell' ? (
                                            <div className="trade-sell-box">
                                                <BuyOrder/>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="list-box-r grid-box" >
                            <HistoryOrder/>
                        </div>
        			</div>
        			
        			<div className="trade-extra-handle grid-box">
        				<TradeForm/>
        			</div>
            	</div>
            </div> 
        );
    }
}

export default TradeCenter;
