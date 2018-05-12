/**
 * @fileoverview 币种信息
 * @author 陈立英
 * @date 2018-05-010
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'antd';

@inject('tradeStore')
@observer 
class CoinList extends Component {
	handleSearch=(e)=>{

        let el = $(e.currentTarget);
        let val = el.val();
        
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
        	this.props.tradeStore.filterByName(val);
        }, 100);

	}

	sortByCurrentAmount=(e)=>{
		this.props.tradeStore.sortByCurrentAmount();
	}
	
	sortByChangeRate=(e)=>{
		this.props.tradeStore.sortByChangeRate();
	}

	sortByVolume=(e)=>{
		this.props.tradeStore.sortByVolume();
	}
	
	render(){
		let store = this.props.tradeStore;
		
		return (
			<div className="coin-list">
				<div className="coin-list-hd clearfix">
					<div className="search">
						<Icon type="search" />
						<input type="text" onChange={this.handleSearch}placeholder={UPEX.lang.template('搜索数字币')}/>
					</div>
					<div className="tab">
						<label>{ UPEX.lang.template('自选')}</label>
					</div>
				</div>
				<div className="coin-list-bd">
					<ul className="list-hd">
						<li className="clearfix">
							<div className="cell name">{UPEX.lang.template('币种')}<Icon type="arrow-up" /></div>
							<div className="cell price" onClick={this.sortByCurrentAmount}>{UPEX.lang.template('价格')}</div>
							<div className="cell rate" onClick={this.sortByChangeRate}>{UPEX.lang.template('涨跌')}</div>
							<div className="cell volume" onClick={this.sortByVolume}>{UPEX.lang.template('24H成交量')}</div>
						</li>
					</ul>
					<ul className="list">
						{ 
							store.loginedMarkets && store.loginedMarkets[0].tradeCoins.map ((item, index)=>{
								return (
									<li key={item.id} className="clearfix">
										<div className="cell name">{item.currencyNameEn}</div>
										<div className="cell price">{item.currentAmount}</div>
										<div className="cell rate" data-status={item.changeRate.indexOf('+') > -1 ? 1 : 0}>{item.changeRate}</div>
										<div className="cell volume">{item.volume}</div>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default CoinList;