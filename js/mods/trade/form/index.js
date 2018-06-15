import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory, Link} from 'react-router';
import { Slider, Tooltip , message } from 'antd';

@inject('tradeStore', 'authStore')
@observer
class TradeForm extends Component{
	goRecharge=(type, e)=>{
		if (type == 'fiat') {
			browserHistory.push('/account/balance/recharge');
		} else {
			browserHistory.push('/account/coin/recharge');
		}
	}


	onChangeBuySlider=(num)=>{
		this.props.tradeStore.setBuySliderValue(num);
	}

	onChangeSellSlider=(num)=>{
		this.props.tradeStore.setSellSliderValue(num);
	}

	onChange=(key, e)=>{
		let value = e.currentTarget.value.trim();
		
		switch(key) {
			case 'buyprice':
				this.props.tradeStore.setDealBuyPrice(value);
				break;
			case 'buynum':
				this.props.tradeStore.setDealBuyNum(value);
				break;
			case 'sellprice':
				this.props.tradeStore.setDealSellPrice(value);
				break;
			case 'sellnum':
				this.props.tradeStore.setDealSellNum(value);
				break;
			case 'sellpwd':
				this.props.tradeStore.setTradeSellPassword(value);
				break;
			case 'buypwd':
				this.props.tradeStore.setTradeBuyPassword(value);
				break;
		}
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
	
	submitOrder=(type) =>{
		let { verifyInfoBeforeSubmit , createTradeOrder } = this.props.tradeStore;
		let result = verifyInfoBeforeSubmit(type);
		
		if (result.pass) {
			createTradeOrder(type).done(()=>{
	        	// 下单成功
	        }).fail((data)=>{
	        	message.error(data.message);
	        })
		} else {
			message.error(result['message']);
		}
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
									<em>{ store.baseCoinBalance.text }</em>
									<label>{ store.baseCurrencyNameEn}</label>
									<div className="recharge" onClick={this.goRecharge.bind(this,'fiat')}>{UPEX.lang.template('充值')}</div>
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
									<em>{ store.tradeCoinBalance.text }</em>
									<label>{ store.currencyNameEn }</label>
									<div className="recharge" onClick={this.goRecharge.bind(this, 'coin')}>{UPEX.lang.template('充币')}</div>
								</div>
							) : null 
						}
					</div>
				</div>
				<div className="trade-form-bd">
					<div className="trade-form-l">
						<div>
							<ul>
								<li>
									<label>{UPEX.lang.template('最佳买价')}</label>
									<em>{ store.bestBuyPrice } ({store.baseCurrencyNameEn}) </em>
								</li>
								<li>
									<label>{UPEX.lang.template('买入价')}</label>
									
									<div className="input-box">
										<Tooltip placement="top" visible={store.tradePriceErr == '' ? false : true} title={store.tradePriceErr}>
										<input
											type="text"
											value={store.dealBuyPrice}
											onChange={this.onChange.bind(this, 'buyprice')}
											onBlur={this.checkTradePrice.bind(this, 'buy')} 
										/>
										</Tooltip>
										<i>{ store.baseCurrencyNameEn }</i>
									</div>
								</li>
								<li>
									<label>{UPEX.lang.template('买入量')}</label>
									<div className="input-box">
										<input
											type="text"
											value={store.dealBuyNum}
											onChange={this.onChange.bind(this, 'buynum')}
											onBlur={this.checkTradeNumber.bind(this, 'buy')} 
										/>
										<i>{store.currencyNameEn}</i>
									</div>
								</li>
								<li>
									<div className="slider-box">
										<Slider 
										 	tipFormatter={null}
										 	marks={sliderMarks}
										 	tipFormatter={(value)=>`${value}%`}
				                            onChange={this.onChangeBuySlider} 
				                            value={store.buySliderValue}
				                            disabled={authStore.isLogin ? false : true}
				                        />
			                        </div>
								</li>
								{
									 store.tradePasswordStatus == 1 ? (
									 	<li>
											<label>{UPEX.lang.template('交易密码')}</label>
											<div className="input-box">
												<input
													type="password"
													min="0"
													value={store.tradeBuyPassword}
													onChange={this.onChange.bind(this, 'buypwd')}
												/>
											</div>
										</li>
									 ) : null
								}
								<li className="hidden">
									<label>{UPEX.lang.template('手续费')}</label>
									<em>{ store.dealBuyFee }({store.currencyNameEn})</em>
								</li>
								<li>
									<label>{UPEX.lang.template('金额')}</label>
									<em>{ store.dealBuyTotalAmount }({store.baseCurrencyNameEn})</em>
								</li>
								<li>
									<button className="btn buy" disabled={ authStore.isLogin ? false : true} onClick={this.submitOrder.bind(this, 'buy')}>{UPEX.lang.template('买入')}</button>
								</li>
							</ul>
						</div>
					</div>
					<div className="trade-form-r">
						<div>
							<ul>
								<li>
									<label>{UPEX.lang.template('最佳卖价')}</label>
									<em>{ store.bestSellPrice } ({store.baseCurrencyNameEn}) </em>
								</li>
								<li>
									<label>{UPEX.lang.template('卖出价')}</label>
									<div className="input-box">
										<input
											type="text"
											value={store.dealSellPrice}
											onChange={this.onChange.bind(this, 'sellprice')}
											onBlur={this.checkTradePrice.bind(this, 'sell')} 
										/>
										<i>{ store.baseCurrencyNameEn }</i>
									</div>
								</li>
								<li>
									<label>{UPEX.lang.template('卖出量')}</label>
									<div className="input-box">
										<input
											type="text"
											value={store.dealSellNum}
											onChange={this.onChange.bind(this, 'sellnum')}
											onBlur={this.checkTradeNumber.bind(this, 'sell')} 
										/>
										<i>{store.currencyNameEn}</i>
									</div>
								</li>
								<li>
									<div className="slider-box">
										<Slider 
										 	defaultValue={0} 
										 	tipFormatter={null}
										 	marks={sliderMarks}
										 	tipFormatter={(value)=>`${value}%`}
				                            onChange={this.onChangeSellSlider} 
				                            value={store.sellSliderValue}
				                            disabled={authStore.isLogin ? false : true}
				                        />
			                        </div>
								</li>	
								{
									 store.tradePasswordStatus == 1 ? (
									 	<li>
											<label>{UPEX.lang.template('交易密码')}</label>
											<div className="input-box">
												<input
													type="password"
													min="0"
													value={store.tradeSellPassword}
													onChange={this.onChange.bind(this, 'sellpwd')}
												/>
											</div>
										</li>
									 ) : null
								}
								<li className="hidden">
									<label>{UPEX.lang.template('手续费')}</label>
									<em>{ store.dealSellFee }({store.currencyNameEn})</em>
								</li>
								<li>
									<label>{UPEX.lang.template('金额')}</label>
									<em>{ store.dealSellTotalAmount}({store.baseCurrencyNameEn})</em>
								</li>
								<li>
									<button className="btn sell" disabled={ authStore.isLogin ? false : true} onClick={this.submitOrder.bind(this, 'sell')}>{UPEX.lang.template('卖出')}</button>
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