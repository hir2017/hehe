import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory, Link} from 'react-router';
import { Slider, Tooltip , message , Modal } from 'antd';
import PopupTradePwd from './tradepwd';
import InputNumber from '../../input-number';

@inject('tradeStore', 'authStore', 'userInfoStore')
@observer
class TradeForm extends Component{
	constructor(props){
		super(props);

		this.tabs = [{
			id: 'xj',
			title: UPEX.lang.template('限价委托')
		}, {
			id: 'sj',
			title: UPEX.lang.template('市价交易')
		}]
	}
	goRecharge=(type, e)=>{
		let userInfoStore = this.props.userInfoStore;

		if (type == 'fiat') {
			// 点击充值，弹窗提示绑定银行卡后可以进行充值
			switch(userInfoStore.userInfo.authLevel) {
				case 0:
					this.showDialogGuideAuth();
					break;
				case 1:
					this.showDialogGuideBindCard();
					break;
				default:
					browserHistory.push('/account/balance/recharge');
			}
		} else {
			browserHistory.push(`/account/coin/recharge/${this.props.tradeStore.currencyNameEn}`);
		}
	}

	showDialogGuideAuth() {
		Modal.confirm({
            prefixCls: "exc-dialog",
            content: UPEX.lang.template('请先进行身份认证'),
            okText: UPEX.lang.template('身份认证'),
            cancelText: UPEX.lang.template('我再想想'),
            iconType: 'exclamation-circle',
            onOk() {
                browserHistory.push('/user/authentication');
            }
        });
	}

	showDialogGuideBindCard() {
		Modal.confirm({
            prefixCls: "exc-dialog",
            content: UPEX.lang.template('绑定银行卡后可以进行充值'),
            okText: UPEX.lang.template('绑定银行卡'),
            cancelText: UPEX.lang.template('我再想想'),
            iconType: 'exclamation-circle',
            onOk() {
                browserHistory.push('/user/bankInfo');
            }
        });
	}

	showDialogGuideTradePWD(){
		Modal.confirm({
            prefixCls: "exc-dialog",
            content: UPEX.lang.template('交易前请先设置资金密码'),
            okText: UPEX.lang.template('资金密码设置'),
            iconType: 'exclamation-circle',
            okCancel: false,
            onOk() {
                browserHistory.push('/user/set-trade-pwd');
            }
        });
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
		let userInfoStore = this.props.userInfoStore;

		if (userInfoStore.userInfo.authLevel == 0) {
			this.showDialogGuideAuth();
			return;
		} else if (userInfoStore.userInfo.isValidatePass == 0) {
			// 未设置交易密码
			this.showDialogGuideTradePWD();
			return;
		}

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

	handleClickTab(index){
		this.props.tradeStore.setTradeType(index);
	}

	render() {
		let store = this.props.tradeStore;
		let authStore = this.props.authStore;
		let btnGuideToLogin;

		let sliderMarks = {
			0: '0%',
			25: '25%',
			50: '50%',
			75: '75%',
			100: '100%'
		}

		btnGuideToLogin = (
			<div className="btn-box guide-btn">
				<Link to='/login'>{ UPEX.lang.template('登录')}</Link>
				<label>{ UPEX.lang.template('或')}</label>
				<Link to='/register'>{ UPEX.lang.template('注册')}</Link>
				<label>{ UPEX.lang.template('开始交易')}</label>
			</div>
		)

		return (
			<div className="trade-form">
				<div className="trade-form-hd">
					<ul>
						{
							this.tabs.map((item, index)=>{
								let cls = store.tradeType == item.id ? 'selected' : '';

								return (
									<li key={item.id} className={cls} onClick={this.handleClickTab.bind(this, item.id)}>{item.title}</li>
								)
							})
						}
					</ul>
				</div>
				<div className="trade-form-bd clearfix">
					<div className={ store.tradeType == 'xj' ? 'trade-form-mod' : 'trade-form-mod hidden'}>
						<div className="trade-form-l">
							<ul className="form-mod-hd">
								<li className="name">{UPEX.lang.template('买入')} {store.currencyNameEn}</li>
								<li className="count">
									<label>{UPEX.lang.template('余额')}</label>
									<em>{ store.baseCoinBalance.text }</em>
									<label>{ store.baseCurrencyNameEn}</label>
								</li>
								<li className="icon" onClick={this.goRecharge.bind(this,'fiat')}></li>
							</ul>
							<ul className="form-mod-bd">
								<li className="hidden">
									<label>{UPEX.lang.template('最佳买价')}</label>
									<em>{ store.bestBuyPrice } ({store.baseCurrencyNameEn}) </em>
								</li>
								<li className="item-input">
									<label>{UPEX.lang.template('价格')}</label>
									<div className="input-box">
										<Tooltip placement="top" visible={store.tradePriceErr == '' ? false : true} title={store.tradePriceErr}>
										<InputNumber
											type="text"
											value={store.dealBuyPrice }
											precision={store.pointPrice}
											onChange={this.onChange.bind(this, 'buyprice')}
											onBlur={this.checkTradePrice.bind(this, 'buy')}
										/>
										</Tooltip>
									</div>
									<i>{ store.baseCurrencyNameEn }</i>
								</li>
								<li className="item-input">
									<label>{UPEX.lang.template('数量')}</label>
									<div className="input-box">
										<InputNumber
											type="text"
											value={store.dealBuyNum}
											precision={store.pointNum}
											onChange={this.onChange.bind(this, 'buynum')}
											onBlur={this.checkTradeNumber.bind(this, 'buy')}
										/>
									</div>
									<i>{store.currencyNameEn}</i>
								</li>
								<li className="item-slider">
									<div className="slider-box">
										<Slider
										 	tipFormatter={null}
										 	marks={sliderMarks}
										 	tipFormatter={(value)=>`${value}%`}
				                            onChange={this.onChangeBuySlider}
				                            value={store.buySliderValue}
				                            
				                        />
			                        </div>
								</li>
								<li className="item-input disabled">
									<label>{UPEX.lang.template('总金额')}</label>
									<div className="input-box">
										<input value={store.dealBuyTotalAmount} disabled/>
									</div>
									<i>{store.baseCurrencyNameEn}</i>
								</li>
								<li className="item-submit">
									{
										authStore.isLogin ? <button type="button" className="btn-box buy" onClick={this.submitOrder.bind(this, 'buy')}>{UPEX.lang.template('买入')}</button> : btnGuideToLogin
									}
								</li>
							</ul>
						</div>
						<div className="trade-form-r">
							<ul className="form-mod-hd">
								<li className="name">{UPEX.lang.template('卖出')} {store.currencyNameEn}</li>
								<li className="count">
									<label>{UPEX.lang.template('余额')}</label>
									<em>{ store.tradeCoinBalance.text }</em>
									<label>{ store.currencyNameEn }</label>
								</li>
								<li className="icon" onClick={this.goRecharge.bind(this, 'coin')}></li>
							</ul>
							<ul className="form-mod-bd">
								<li className="hidden">
									<label>{UPEX.lang.template('最佳卖价')}</label>
									<em>{ store.bestSellPrice } ({store.baseCurrencyNameEn}) </em>
								</li>
								<li className="item-input">
									<label>{UPEX.lang.template('价格')}</label>
									<div className="input-box">
										<InputNumber
											type="text"
											value={store.dealSellPrice}
											precision={store.pointPrice}
											onChange={this.onChange.bind(this, 'sellprice')}
											onBlur={this.checkTradePrice.bind(this, 'sell')}
										/>
									</div>
									<i>{ store.baseCurrencyNameEn }</i>
								</li>
								<li className="item-input">
									<label>{UPEX.lang.template('数量')}</label>
									<div className="input-box">
										<InputNumber
											type="text"
											value={store.dealSellNum}
											precision={store.pointNum}
											onChange={this.onChange.bind(this, 'sellnum')}
											onBlur={this.checkTradeNumber.bind(this, 'sell')}
										/>
									</div>
									<i>{store.currencyNameEn}</i>
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
								<li className="item-input disabled">
									<label>{UPEX.lang.template('总金额')}</label>
									<div className="input-box">
										<input value={store.dealSellTotalAmount}  disabled/>
									</div>
									<i>{store.baseCurrencyNameEn}</i>
								</li>
								<li className="item-submit">
									{
										authStore.isLogin ? <button type="button" className="btn-box sell" onClick={this.submitOrder.bind(this, 'sell')}>{UPEX.lang.template('卖出')}</button> : btnGuideToLogin
									}
								</li>
							</ul>
						</div>
					</div>
					<div className={ store.tradeType == 'sj' ? 'trade-form-mod' : 'trade-form-mod hidden'}>
						<div className="trade-form-l">
							<ul className="form-mod-hd">
								<li className="name">{UPEX.lang.template('买入')} {store.currencyNameEn}</li>
								<li className="count">
									<label>{UPEX.lang.template('余额')}</label>
									<em>{ store.baseCoinBalance.text }</em>
									<label>{ store.baseCurrencyNameEn}</label>
								</li>
								<li className="icon" onClick={this.goRecharge.bind(this,'fiat')}></li>
							</ul>
							<ul className="form-mod-bd">
								<li className="hidden">
									<label>{UPEX.lang.template('最佳买价')}</label>
									<em>{ store.bestBuyPrice } ({store.baseCurrencyNameEn}) </em>
								</li>
								<li className="item-input disabled">
									<label>{UPEX.lang.template('价格')}</label>
									<div className="input-box">
										<InputNumber
											type="text"
											disabled
											value={store.dealBuyPrice }
											precision={store.pointPrice}
											onChange={this.onChange.bind(this, 'buyprice')}
											onBlur={this.checkTradePrice.bind(this, 'buy')}
										/>
									</div>
									<i>{ store.baseCurrencyNameEn }</i>
								</li>
								<li className="item-input">
									<label>{UPEX.lang.template('数量')}</label>
									<div className="input-box">
										<InputNumber
											type="text"
											value={store.dealBuyNum}
											precision={store.pointNum}
											onChange={this.onChange.bind(this, 'buynum')}
											onBlur={this.checkTradeNumber.bind(this, 'buy')}
										/>
									</div>
									<i>{store.currencyNameEn}</i>
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
								<li className="item-input disabled">
									<div className="total">{UPEX.lang.template('总金额')} &asymp; {store.dealBuyTotalAmount}{store.baseCurrencyNameEn}({UPEX.lang.template('仅供参考')})</div>
								</li>
								<li className="item-submit">
									{
										authStore.isLogin ? <button type="button" className="btn-box buy" onClick={this.submitOrder.bind(this, 'buy')}>{UPEX.lang.template('买入')}</button> : btnGuideToLogin
									}
								</li>
							</ul>
						</div>
						<div className="trade-form-r">
							<ul className="form-mod-hd">
								<li className="name">{UPEX.lang.template('卖出')} {store.currencyNameEn}</li>
								<li className="count">
									<label>{UPEX.lang.template('余额')}</label>
									<em>{ store.tradeCoinBalance.text }</em>
									<label>{ store.currencyNameEn }</label>
								</li>
								<li className="icon" onClick={this.goRecharge.bind(this, 'coin')}></li>
							</ul>
							<ul className="form-mod-bd">
								<li className="hidden">
									<label>{UPEX.lang.template('最佳卖价')}</label>
									<em>{ store.bestSellPrice } ({store.baseCurrencyNameEn}) </em>
								</li>
								<li className="item-input disabled">
									<label>{UPEX.lang.template('价格')}</label>
									<div className="input-box">
										<InputNumber
											type="text"
											disabled
											value={store.dealSellPrice}
											precision={store.pointPrice}
											onChange={this.onChange.bind(this, 'sellprice')}
											onBlur={this.checkTradePrice.bind(this, 'sell')}
										/>
									</div>
									<i>{ store.baseCurrencyNameEn }</i>
								</li>
								<li className="item-input">
									<label>{UPEX.lang.template('数量')}</label>
									<div className="input-box">
										<InputNumber
											type="text"
											value={store.dealSellNum}
											precision={store.pointNum}
											onChange={this.onChange.bind(this, 'sellnum')}
											onBlur={this.checkTradeNumber.bind(this, 'sell')}
										/>
									</div>
									<i>{store.currencyNameEn}</i>
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
								<li className="item-input disabled">
									<div className="total">{UPEX.lang.template('总金额')} &asymp; {store.dealSellTotalAmount}{store.baseCurrencyNameEn}({UPEX.lang.template('仅供参考')})</div>
								</li>
								<li className="item-submit">
									{
										authStore.isLogin ? <button type="button" className="btn-box sell" onClick={this.submitOrder.bind(this, 'sell')}>{UPEX.lang.template('卖出')}</button> : btnGuideToLogin
									}
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
