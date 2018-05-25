/**
 * @fileoverview 币种信息
 * @author 陈立英
 * @date 2018-05-010
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Icon, Checkbox } from 'antd';

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

	handleCurrency=(item, e)=>{
		this.props.tradeStore.setCurrencyId(item.currencyId);
	}

	sortByCondition(condition){
		this.props.tradeStore.sortByCondition(condition);
	}
	
	render(){
		let store = this.props.tradeStore;
		
		return (
			<div className="coin-list">
				<div className="coin-list-hd clearfix">
					<div className="search">
						<Icon type="search" />
						<input type="text" onChange={this.handleSearch} placeholder={UPEX.lang.template('搜索数字币')}/>
					</div>
					<div className="tab">
						<Checkbox>{UPEX.lang.template('收藏')}</Checkbox>
					</div>
				</div>
				<div className="coin-list-bd">
					<dl className="list-hd">
						<dt className="clearfix">
							<div className="cell star">{ UPEX.lang.template('收藏')}</div>
							<div className="cell name">
								{ UPEX.lang.template('币种') }
							</div>
							<div className="cell price" onClick={this.sortByCondition.bind(this, 'currentAmount')}>
								{ UPEX.lang.template('价格') }
								{ store.sortByKey == 'currentAmount' ? <Icon type={ store.sortByType == 'asc' ? 'arrow-up' : 'arrow-down'} />: null }
							</div>
							<div className="cell rate" onClick={this.sortByCondition.bind(this, 'changeRate')}>
								{ UPEX.lang.template('涨跌') }
								{ store.sortByKey == 'changeRate' ? <Icon type={ store.sortByType == 'asc' ? 'arrow-up' : 'arrow-down'} />: null }
							</div>
							<div className="cell volume" onClick={this.sortByCondition.bind(this, 'volume')} >
								{ UPEX.lang.template('24H成交量') }
								{ store.sortByKey == 'volume' ? <Icon type={ store.sortByType == 'asc' ? 'arrow-up' : 'arrow-down'} />: null }
							</div>
						</dt>
					</dl>
					<dl className="list">
						{ 
							store.loginedMarkets && store.loginedMarkets[0].tradeCoins.map ((item, index)=>{
								return (
									<dd key={item.id} className="clearfix">
										<div className="cell star"><Icon type="star-o" /></div>
										<div className="cell name" onClick={this.handleCurrency.bind(this, item)}>{item.currencyNameEn}</div>
										<div className="cell price" onClick={this.handleCurrency.bind(this, item)}>{item.currentAmount}</div>
										<div className={ item.changeRate.indexOf('+') >= 0 ? 'cell rate greenrate' : 'cell rate redrate'} onClick={this.handleCurrency.bind(this, item)}>{item.changeRate}</div>
										<div className="cell volume" onClick={this.handleCurrency.bind(this, item)}>{item.volume}</div>
									</dd>
								)
							})
						}
					</dl>
				</div>
			</div>
		);
	}
}

export default CoinList;