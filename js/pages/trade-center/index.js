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
import RealTime from '../../mods/trade/order/real-time';

@inject('tradeStore')
@observer
class TradeCenter extends Component {
    componentWillMount() {
        let store = this.props.tradeStore;

        store.getTradeCoinData();
        store.getTradeHistory();
        store.getLoginedMarket();
        store.getEntrust();
    }

    render() {
    	let store = this.props.tradeStore;
        
        return (
            <div className="trade-wrapper" style={{ height: store.contentHeight}} data-theme={store.theme}>
            	<div className="trade-extra">
            		<div className="trade-extra-content">
            			<div className="trade-extra-list clearfix" style={{ height: store.extraOrderHeight}}>
                            <div className="list-box-l">
                                <div className="list-box-hd">
                                    <ul className="tab">
                                        <li className="all"></li>
                                        <li className="buy"></li>
                                        <li className="sell"></li>
                                    </ul>
                                </div>
                                <div className="list-box-bd">
                                    <div className="table-hd">
                                        <div className="price">{ UPEX.lang.template('价格')}</div>
                                        <div className="number">{ UPEX.lang.template('数量')}</div>
                                        <div className="total-price">{ UPEX.lang.template('金额')}</div>
                                    </div>
                                    <div className="table-bd">
                                        <BuyOrder/>
                                        <div className="trade-current-amount">{store.currentAmount}</div>
                                        <SellOrder/>
                                    </div>
                                </div>
                            </div>
                            <div className="list-box-r">
                                <RealTime/>
                            </div>
                            
            			</div>
            			
            			<div className="trade-extra-handle">
            				<div className="handle-box">
            					
            				</div>
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
            			<div className="order-box"></div>
            		</div>
            	</div>
            </div> 
        );
    }
}

export default TradeCenter;
