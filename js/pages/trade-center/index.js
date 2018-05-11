/**
 * @fileoverview 交易中心
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import TradeCoinInfo from '../../mods/trade/chart/coin-info';
import ChartInfo from '../../mods/trade/chart/chart-info';


@inject('tradeStore')
@observer
class TradeCenter extends Component {
    componentWillMount() {
        let store = this.props.tradeStore;

        store.getTradeCoinData();
        store.getTradeHistory();
    }

    render() {
    	let store = this.props.tradeStore;

        return (
            <div className="trade-wrapper" style={{ height: store.contentHeight}} data-theme={store.theme}>
            	<div className="trade-extra">
            		<div className="trade-extra-content">
            			<div className="trade-extra-list" style={{ height: store.extraOrderHeight}}>
            				
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
