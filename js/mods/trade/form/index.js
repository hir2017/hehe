import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory, Link} from 'react-router';
import { Slider, Tooltip } from 'antd';

@inject('tradeStore', 'authStore')
@observer
class TradeForm extends Component{
	goRecharge=(e)=>{
		browserHistory.push('/recharge');
	}

	onChangeBuySlider=(num)=>{
		this.props.tradeStore.setBuySliderValue(num);
	}

	onChangeSellSlider=(num)=>{
		this.props.tradeStore.setSellSliderValue(num);
	}

	onChangeBuyPrice=(e)=>{
		let value = e.currentTarget.value.trim();

		this.props.tradeStore.setDealBuyPrice(value);
	}

	onChangeBuyNum=(e)=>{
		let value = e.currentTarget.value.trim();

		this.props.tradeStore.setDealBuyNum(value);
	}

	onChangeSellPrice=(e)=>{
		let value = e.currentTarget.value.trim();

		this.props.tradeStore.setDealSellPrice(value);
	}

	onChangeSellNum=(e)=>{
		let value = e.currentTarget.value.trim();

		this.props.tradeStore.setDealSellNum(value);
	}	
	// 失去焦点的时候验证填入的价格
	checkTradePrice=(type, e)=>{
		let value = e.currentTarget.value.trim();

		this.props.tradeStore.checkTradePrice(value, type);
	}	
	// 失去焦点的时候验证填入的数量
	checkTradeNumber=(type, e)=>{
		let value = e.currentTarget.value.trim();

		this.props.tradeStore.checkTradeNumber(value, type);
	}	

	render() {
		let store = this.props.tradeStore;
		let authStore = this.props.authStore;

		let sliderMarks = {
			0: '0%',
			25: '25%',
			50: '50%',
			75: '75%',
			100: '100%'
		}
		return (
			<div className="trade-form">
				<div className="trade-form-hd">
					<div className="trade-form-l">
						{
							authStore.isLogin ? (
								<div>
									<label>{UPEX.lang.template('可用')}</label>
									<em>{ store.personalAccount.baseCoinBalance }</em>
									<label>{ store.currentTradeCoin.baseCurrencyNameEn}</label>
									<div className="recharge" onClick={this.goRecharge}>{UPEX.lang.template('充值')}</div>
								</div>
							) : (
								<div>
									<Link to='/login'>{ UPEX.lang.template('登录')}</Link>
									<label>{ UPEX.lang.template('或')}</label>
									<Link to='/register'>{ UPEX.lang.template('注册')}</Link>
									<label>{ UPEX.lang.template('开始交易')}</label>
								</div>
							)
						}
					</div>
					<div className="trade-form-r">
						{
							authStore.isLogin ? (
								<div>
									<label>{UPEX.lang.template('可用')}</label>
									<em>{ store.personalAccount.tradeCoinBalance }</em>
									<label>{ store.currentTradeCoin.currencyNameEn }</label>
									<div className="recharge" onClick={this.goRecharge}>{UPEX.lang.template('充币')}</div>
								</div>
							) : (
								<div>
									<Link to='/login'>{ UPEX.lang.template('登录')}</Link>
									<label>{ UPEX.lang.template('或')}</label>
									<Link to='/register'>{ UPEX.lang.template('注册')}</Link>
									<label>{ UPEX.lang.template('开始交易')}</label>
								</div>
							)
						}
					</div>
				</div>
				<div className="trade-form-bd">
					<div className="trade-form-l">
						<div>
							<ul>
								<li>
									<label>{UPEX.lang.template('最佳买价')}</label>
									<em>{ store.bestBuyPrice }({store.currentTradeCoin.baseCurrencyNameEn})</em>
								</li>
								<li>
									<label>{UPEX.lang.template('买入价')}</label>
									
									<div className="input-box">
										<Tooltip placement="top" visible={store.tradePriceErr == '' ? false : true} title={store.tradePriceErr}>
										<input
											type="number"
											min="0"
											value={store.dealBuyPrice}
											onChange={this.onChangeBuyPrice}
											onBlur={this.checkTradePrice.bind(this, 'buy')} 
										/>
										</Tooltip>
										<i>{ store.currentTradeCoin.baseCurrencyNameEn }</i>
									</div>
								</li>
								<li>
									<label>{UPEX.lang.template('买入量')}</label>
									<div className="input-box">
										<input
											type="number"
											min="0"
											value={store.dealBuyNum}
											onChange={this.onChangeBuyNum}
											onBlur={this.checkTradeNumber.bind(this, 'buy')} 
										/>
										<i>{store.currentTradeCoin.currencyNameEn}</i>
									</div>
								</li>
								<li>
									<div className="slider-box">
										<Slider 
										 	tipFormatter={null}
										 	marks={sliderMarks}
										 	step={null}
				                            onChange={this.onChangeBuySlider} 
				                            value={store.buySliderValue}
				                            disabled={authStore.isLogin ? false : true}
				                        />
			                        </div>
								</li>
								<li className="hidden">
									<label>{UPEX.lang.template('手续费')}</label>
									<em>{ store.dealBuyFee }({store.currentTradeCoin.currencyNameEn})</em>
								</li>
								<li>
									<label>{UPEX.lang.template('金额')}</label>
									<em>{ store.dealBuyTotalAmount }({store.currentTradeCoin.currencyNameEn})</em>
								</li>
								<li>
									<button className="btn buy" disabled={ authStore.isLogin ? false : true}>{UPEX.lang.template('买入')}</button>
								</li>
							</ul>
						</div>
					</div>
					<div className="trade-form-r">
						<div>
							<ul>
								<li>
									<label>{UPEX.lang.template('最佳卖价')}</label>
									<em>{ store.bestSellPrice }({store.currentTradeCoin.baseCurrencyNameEn})</em>
								</li>
								<li>
									<label>{UPEX.lang.template('卖出价')}</label>
									<div className="input-box">
										<input
											type="number"
											min="0"
											value={store.dealSellPrice}
											onChange={this.onChangeSellPrice}
											onBlur={this.checkTradePrice.bind(this, 'sell')} 
										/>
										<i>{ store.currentTradeCoin.baseCurrencyNameEn }</i>
									</div>
								</li>
								<li>
									<label>{UPEX.lang.template('卖出量')}</label>
									<div className="input-box">
										<input
											type="number"
											min="0"
											value={store.dealSellNum}
											onChange={this.onChangeSellNum}
											onBlur={this.checkTradeNumber.bind(this, 'sell')} 
										/>
										<i>{store.currentTradeCoin.currencyNameEn}</i>
									</div>
								</li>
								<li>
									<div className="slider-box">
										<Slider 
										 	defaultValue={0} 
										 	tipFormatter={null}
										 	marks={sliderMarks}
										 	step={null}
				                            onChange={this.onChangeSellSlider} 
				                            value={store.sellSliderValue}
				                            disabled={authStore.isLogin ? false : true}
				                        />
			                        </div>
								</li>
								<li className="hidden">
									<label>{UPEX.lang.template('手续费')}</label>
									<em>{ store.dealSellFee }({store.currentTradeCoin.currencyNameEn})</em>
								</li>
								<li>
									<label>{UPEX.lang.template('金额')}</label>
									<em>{ store.dealSellTotalAmount}({store.currentTradeCoin.currencyNameEn})</em>
								</li>
								<li>
									<button className="btn sell" disabled={ authStore.isLogin ? false : true}>{UPEX.lang.template('卖出')}</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TradeForm;