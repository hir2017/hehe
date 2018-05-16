/**
 * @fileoverview 交易中心
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import TradeCoinInfo from '../../mods/trade/chart/coin-info';
import ChartInfo from '../../mods/trade/chart/chart-info';
import BuyOrder from '../../mods/trade/order/buy-order';
import SellOrder from '../../mods/trade/order/sell-order';
import HistoryOrder from '../../mods/trade/order/history-order';
import MyOrder from '../../mods/trade/myorder/index';
import TradeForm from '../../mods/trade/form/index';

@inject('tradeStore')
@observer
class TradeCenter extends Component {
    render() { 
        // 用于切换交易币时内容切换
        return <TradeContent key={this.props.tradeStore.currencyId}/>
    }
}

@inject('tradeStore')
@observer
class TradeContent extends Component {
    static defaultProps = {
        entrustTab: ['all', 'buy', 'sell']
    }

    componentWillMount() {
        let { tradeStore } = this.props;

        let timer;
        let fetchTradeCoinData=()=>{
            tradeStore.getTradeCoinData();
            clearTimeout(timer);

            timer = setTimeout(()=>{
                fetchTradeCoinData();
            }, 3 * 1000)
        }
        
        fetchTradeCoinData(); // 3秒钟查询一次
        tradeStore.getLoginedMarket();
        tradeStore.getEntrust();
        tradeStore.getTradeHistory();
        tradeStore.getUserAccount();
        tradeStore.getPersonalTradingPwd();
        tradeStore.getUserOrderList();
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
                                        <div className="price">{ UPEX.lang.template('价格')}({ store.currentTradeCoin.baseCurrencyNameEn})</div>
                                        <div className="number">{ UPEX.lang.template('数量')}({ store.currentTradeCoin.currencyNameEn})</div>
                                        <div className="total">{ UPEX.lang.template('金额')}({ store.currentTradeCoin.baseCurrencyNameEn})</div>
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
            			
            			<div className="trade-extra-handle">
            				<TradeForm/>
            			</div>
            		</div>
            	</div>
            	<div className="trade-main">
            		<div className="trade-main-chart" id="tradeMainKline" style={{ height: store.iframeHeight }}>
                        <div className="chart-box">
                            <TradeCoinInfo/>
                            <ChartInfo/>
                        </div>
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
