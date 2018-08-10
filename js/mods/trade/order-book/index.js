/**
 * 买卖盘口模块
 * @author 陈立英
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'antd';
import BuyOrderView from './buy';
import SellOrderView from './sell';

@inject('tradeStore')
@observer
class OrderBook extends Component { 
	
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
			<div className="order-book" data-type={store.type}>
				<div className="list-box-hd">
					{UPEX.lang.template('挂单簿')}
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
                    <div className="table-bd" key={store.type}>
                    	{
                            store.type !== 'buy' ? (
                                <div className="trade-buy-box">
                                    <SellOrderView ref="sellorder"/>
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
                                    <BuyOrderView ref="buyorder"/>
                                </div>
                            ) : null
                        }
                    </div>
				</div>
			</div>
		)
	}
}

export default OrderBook;