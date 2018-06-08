/**
 * @fileoverview 交易中心
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Url from '../../lib/url';
import TVChartContainer from '../../mods/trade/kline/tv-chart';
import BuyOrder from '../../mods/trade/order/buy-order';
import SellOrder from '../../mods/trade/order/sell-order';
import HistoryOrder from '../../mods/trade/order/history-order';
import MyOrder from '../../mods/trade/myorder/index';
import TradeForm from '../../mods/trade/form/index';

@inject('commonStore')
@observer
class TradeCenter extends Component {
    componentWillMount() {
        let { commonStore } = this.props;

        commonStore.getAllCoinPoint();
    }
    
    render() { 
        let { commonStore } = this.props;
        
        // 用于切换交易币时内容切换
        if (commonStore.productDataReady) {
            return <TradeContent {...this.props}/>    
        } else {
            return (
                <div className="trade-wrapper">
                    <div className="mini-loading"></div>;
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

            // 3秒钟查询一次
            let timer;
            let fetchTradeCoinData=()=>{
                tradeStore.getTradeCoinData();
                clearTimeout(timer);

                timer = setTimeout(()=>{
                    fetchTradeCoinData();
                }, 3 * 1000)
            }
            fetchTradeCoinData(); 

            tradeStore.getLoginedMarket();
            tradeStore.getEntrust();
            tradeStore.getTradeHistory();
            tradeStore.getUserAccount();
            tradeStore.getPersonalTradingPwd();
            tradeStore.getPersonalInfo();
            tradeStore.getUserOrderList();
        }
    }

    onChangeEntrustType=(type)=>{
        this.props.tradeStore.setType(type);    
    }

    render() {
    	let store = this.props.tradeStore;
        
        return (
            <div className="trade-wrapper" style={{ height: store.contentHeight + 30}} data-theme={store.theme}>
            	<div className="trade-extra">
            		<div className="trade-extra-content">
            			<div className="trade-extra-list clearfix" style={{ height: store.extraOrderHeight}}>
                            <div className="list-box-l">
                                <div className="list-box-hd">
                                    <ul className="tab">
                                        {
                                           ['all', 'buy', 'sell'].map((item, index)=>{
                                                let cls = store.type == item ? `${item} selected`: item;

                                                return (
                                                    <li className={cls} key={item} onClick={this.onChangeEntrustType.bind(this, item)}></li>
                                                )
                                           })
                                        }
                                    </ul>
                                </div>
                                <div className="list-box-bd" style={{ height: store.extraOrderHeight - 42}}>
                                    <div className="table-hd">
                                        <div className="price">{ UPEX.lang.template('价格')}</div>
                                        <div className="number">{ UPEX.lang.template('数量')}</div>
                                        <div className="total">{ UPEX.lang.template('金额')}</div>
                                    </div>
                                    <div className="table-bd" style={{ height: store.extraOrderHeight - 72}}>
                                        {
                                            store.type !== 'buy' ? (
                                                <div className="trade-buy-box">
                                                    <SellOrder/>
                                                </div>
                                            ) : null
                                        }
                                        <div className={ store.currentCoinChangeRate.indexOf('+') >= 0 ? 'trade-current-amount greenrate': 'trade-current-amount redrate'}>{store.currentAmount}</div>
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
                            <div className="list-box-r">
                                <HistoryOrder/>
                            </div>
                            
            			</div>
            			
            			<div className="trade-extra-handle" style={{ height: store.handleHeight }}>
            				<TradeForm/>
            			</div>
            		</div>
            	</div>
            	<div className="trade-main">
            		<div className="trade-main-chart" id="tradeMainKline" style={{ height: store.iframeHeight }}>
                         <TVChartContainer/>
            		</div>
            		<div className="trade-main-order" id="tradeMainOrder" style={{ height: store.mainOrderHeight}}>
            			<MyOrder/>
            		</div>
            	</div>
            </div> 
        );
    }
}

export default TradeCenter;
