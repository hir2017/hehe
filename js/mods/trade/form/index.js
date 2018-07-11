import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory, Link} from 'react-router';
import { Slider, Tooltip , message } from 'antd';
import PopupTradePwd from './tradepwd';
import InputNumber from '../../input-number';

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
		// 买入量百分比，需要填写价格之后才可以调整
		if (!this.props.tradeStore.dealBuyPrice) {
			return;
		}

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
	        	message.success(UPEX.lang.template('下单成功'));
	        }).fail((data)=>{
	        	message.error(data.message);
	        })
		} else {
			if (result.action == 'pwdpop') {
				this.refs.pwdpop.show((value)=>{
					if (type == 'buy') {
						this.props.tradeStore.setTradeBuyPassword(value);
					} else if (type == 'sell') {
						this.props.tradeStore.setTradeSellPassword(value);
					}

					createTradeOrder(type).done(()=>{
			        	// 下单成功
			        	message.success(UPEX.lang.template('下单成功'));
			        }).fail((data)=>{
			        	message.error(data.message);
			        })
				});
			} else {
				message.error(result['message']);	
			}
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
								<div className="hd-box">
									<span>{UPEX.lang.template('可用')}</span>
									<em>{ store.baseCoinBalance.text }</em>
									<label>{ store.baseCurrencyNameEn}</label>
									<div className="recharge" onClick={this.goRecharge.bind(this,'fiat')}>{UPEX.lang.template('充值')}</div>
								</div>
							) : (
								<div className="hd-box">
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
								<div className="hd-box">
									<span>{UPEX.lang.template('可用')}</span>
									<em>{ store.tradeCoinBalance.text }</em>
									<label>{ store.currencyNameEn }</label>
									<div className="recharge" onClick={this.goRecharge.bind(this, 'coin')}>{UPEX.lang.template('充币')}</div>
								</div>
							) : (
								<div className="hd-box">
									<Link to='/login'>{ UPEX.lang.template('登录')}</Link>
									<label>{ UPEX.lang.template('或')}</label>
									<Link to='/register'>{ UPEX.lang.template('注册')}</Link>
									<label>{ UPEX.lang.template('开始交易')}</label>
								</div>
							) 
						}
					</div>
				</div>
				<div className="trade-form-bd clearfix">
					<div className="trade-form-l">
						<div>
							<ul>
								<li className="hidden">
									<label>{UPEX.lang.template('最佳买价')}</label>
									<em>{ store.bestBuyPrice } ({store.baseCurrencyNameEn}) </em>
								</li>
								<li className="item-price">
									<label>{UPEX.lang.template('买入价')}</label>
									<div className="input-box">
										<Tooltip placement="top" visible={store.tradePriceErr == '' ? false : true} title={store.tradePriceErr}>
										<InputNumber
											type="text"
											value={store.dealBuyPrice }
											precision={store.commonStore.pointPrice}
											onChange={this.onChange.bind(this, 'buyprice')}
											onBlur={this.checkTradePrice.bind(this, 'buy')} 
										/>
										</Tooltip>
										<i>{ store.baseCurrencyNameEn }</i>
									</div>
								</li>
								<li className="item-num">
									<label>{UPEX.lang.template('买入量')}</label>
									<div className="input-box">
										<InputNumber
											type="text"
											value={store.dealBuyNum}
											precision={store.pointNum}
											onChange={this.onChange.bind(this, 'buynum')}
											onBlur={this.checkTradeNumber.bind(this, 'buy')} 
										/>
										<i>{store.currencyNameEn}</i>
									</div>
								</li>
								<li className="item-slider">
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
								<li className="hidden">
									<label>{UPEX.lang.template('手续费')}</label>
									<em>{ store.dealBuyFee }({store.currencyNameEn})</em>
								</li>
								<li className="item-total">
									<span>{UPEX.lang.template('金额')}</span>
									<em>{store.dealBuyTotalAmount}</em>
									<span>{store.baseCurrencyNameEn}</span>
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
								<li className="hidden">
									<label>{UPEX.lang.template('最佳卖价')}</label>
									<em>{ store.bestSellPrice } ({store.baseCurrencyNameEn}) </em>
								</li>
								<li className="item-price">
									<label>{UPEX.lang.template('卖出价')}</label>
									<div className="input-box">
										<InputNumber
											type="text"
											value={store.dealSellPrice}
											precision={store.commonStore.pointPrice}
											onChange={this.onChange.bind(this, 'sellprice')}
											onBlur={this.checkTradePrice.bind(this, 'sell')} 
										/>
										<i>{ store.baseCurrencyNameEn }</i>
									</div>
								</li>
								<li className="item-num">
									<label>{UPEX.lang.template('卖出量')}</label>
									<div className="input-box">
										<InputNumber
											type="text"
											value={store.dealSellNum}
											precision={store.pointNum}
											onChange={this.onChange.bind(this, 'sellnum')}
											onBlur={this.checkTradeNumber.bind(this, 'sell')} 
										/>
										<i>{store.currencyNameEn}</i>
									</div>
								</li>
								<li className="item-slider">
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
								<li className="hidden">
									<label>{UPEX.lang.template('手续费')}</label>
									<em>{ store.dealSellFee }({store.currencyNameEn})</em>
								</li>
								<li className="item-total">
									<span>{UPEX.lang.template('金额')}</span>
									<em>{ store.dealSellTotalAmount}</em>
									<span>{store.baseCurrencyNameEn}</span>
								</li>
								<li>
									<button className="btn sell" disabled={ authStore.isLogin ? false : true} onClick={this.submitOrder.bind(this, 'sell')}>{UPEX.lang.template('卖出')}</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<PopupTradePwd ref="pwdpop" prefix={`antd-modal-${store.theme}`}/>
			</div>
		)
	}
}

export default TradeForm;