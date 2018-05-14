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
import MyOrder from '../../mods/trade/myorder/index';
import TradeForm from '../../mods/trade/form/index';

@inject('tradeStore', 'authStore')
@observer
class TradeCenter extends Component {
    static defaultProps = {
        entrustTab: ['all', 'buy', 'sell']
    }

    componentWillMount() {
        let { tradeStore, authStore} = this.props;

        tradeStore.getTradeCoinData();
        tradeStore.getTradeHistory();
        tradeStore.getLoginedMarket();
        tradeStore.getEntrust();
        
        if (authStore.isLogin) {
            tradeStore.getUserOrderList();
        }
    }

    onChangeEntrustType=(type)=>{
        this.props.tradeStore.entrustStore.setType(type);
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
                                        {
                                           ['all', 'buy', 'sell'].map((item, index)=>{
                                                let cls = store.entrustStore.type == item ? `${item} selected`: item;

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
                                            store.entrustStore.type !==  'sell' ? (
                                                <div className="trade-buy-box">
                                                    <BuyOrder/>
                                                </div>
                                            ) : null
                                        }
                                        <div className="trade-current-amount">{store.currentAmount}</div>
                                        {
                                            store.entrustStore.type !==  'buy' ? (
                                                <div className="trade-sell-box">
                                                    <SellOrder/>
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="list-box-r">
                                <RealTime/>
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
