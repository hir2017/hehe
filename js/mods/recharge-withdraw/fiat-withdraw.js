/**
 * 法币充值
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import { Select } from 'antd';
const Option = Select.Option;
import toAction from './fiat-withdraw-action';

import CardSelect from './bind-card-select';

@inject('fiatWithdrawStore', 'userInfoStore')
@observer
class FiatRechargeView extends Component{
	constructor(props) {
		super(props);

		this.action = toAction(this.props.fiatWithdrawStore, this.props.userInfoStore);
	}

	componentDidMount() {
		this.action.getInfo();
	}

	componentWillUnmount(){
		this.action.destroy();
	}

	handleNextStep=(e)=>{
		this.action.nextStep();
	}

	handleOrder=(e)=>{
		this.action.handleSubmit();
	}

	handleBack=(e)=>{
		history.back();
	}

	render() {
		let store = this.props.fiatWithdrawStore;
		let action = this.action;
		let $formContent;

        if (store.step == 'apply') {
            let currCardInfo = store.selectBindCardInfo
        	$formContent = (
        		<div className="rw-form">
        			<div className="extra-title">{UPEX.lang.template('提现信息确认')}</div>
					<div className="rw-form-item">
						<label className="rw-form-label">{UPEX.lang.template('充值银行卡')}</label>
						<div className="rw-form-info">
							<div className="bank-card">
								<div className="bank-card-box">
									<div className="card-name">{currCardInfo.openBank}</div>
									<div className="user-name">{currCardInfo.cardName}</div>
									<div className="card-no">{`**** **** **** ${currCardInfo.cardNo}`} </div>
								</div>
							</div>

						</div>
					</div>
					<div className="rw-form-item recharge-form-balance">
						<label className="rw-form-label">{UPEX.lang.template('提现金额')}</label>
						<div className="rw-form-info">
							<i className="unit">NT$</i>
							<em className="balance">{store.balance}</em>
						</div>
					</div>
					<div className="rw-form-item">
						<label className="rw-form-label">{UPEX.lang.template('图片验证码')}</label>
						<div className="rw-form-info">
							<div className="yz-box">
								<div className={`input-box ${store.validImgCode ? '' : 'wrong'}`}>
		                            <input
		                                type="text"
		                                placeholder={ UPEX.lang.template('图片验证') }
		                                data-key="vercode"
		                                value={store.vercode}
		                                onChange={ action.onChangeInput}
		                            />
		                            <div className="codeimg">
		                                <img src={ store.captchaStore.captcha } onClick={ action.getImgCaptcha } alt=""/>
		                            </div>
		                        </div>
	                        </div>
	                    </div>
					</div>
					<div className="rw-form-item">
						<label className="rw-form-label">{UPEX.lang.template('验证方式')}</label>
						<div className="rw-form-info">
							<ul className="tab-nav">
								{
									store.supportAuthTypes.map((item, index)=>{
										let text;

										if (item == 'phone') {
											text = UPEX.lang.template('手机验证');
										} else if (item == 'google'){
											text = UPEX.lang.template('谷歌验证');
										}

										return (
											<li
												key={item}
												onClick={()=>action.changeAuthTypeTo(item)}
												className={store.authType == item ?  'tab-item selected' : 'tab-item'}
											>
												{text}
											</li>
										)
									})
								}
							</ul>
						</div>
					</div>
					<div className="rw-form-item">
						<label className="rw-form-label"></label>
						<div className="rw-form-info">
							{
								store.authType == 'phone' ? (
									<div className="input-button-box">
										<div className="input-box">
			                                <input
			                                    type="text"
			                                    data-key="phonecode"
			                                    value={store.phoneCode}
			                                    placeholder={UPEX.lang.template('填写短信验证码')}
				                                onChange={action.onChangeInput}
			                                />
			                            </div>
			                            <button onClick={ action.sendEmailPhoneCode } className={ store.sendingcode ? 'disabled' : ''} >
			                                <div className={ store.sendingcode ? 'code-sending': 'code-sending hidden'}>{ UPEX.lang.template('重发')}（<span data-second="second" ref="second"></span>s）</div>
			                                <div className={ store.sendingcode ? 'code-txt hidden' : 'code-txt'}>{  UPEX.lang.template('获取验证码') }</div>
			                            </button>
		                            </div>
								): (
									<div className="input-box">
		                                <input
		                                    type="number"
		                                    data-key="googlecode"
		                                    value={store.googleCode}
		                                    placeholder={UPEX.lang.template('填写谷歌验证码')}
			                                onChange={action.onChangeInput}
		                                />
		                            </div>
								)
							}
						</div>
					</div>
					<div className="rw-form-item">
						<label className="rw-form-label">{UPEX.lang.template('交易密码')}</label>
						<div className="rw-form-info">
							<div className={`input-box ${store.validTradePwd ? '' : 'wrong'}`}>
	                            <input
	                                type="password"
	                                data-key="tradepwd"
	                                value={store.tradepwd}
	                                placeholder={UPEX.lang.template('填写交易密码')}
	                                onChange={action.onChangeInput}
	                            />
	                        </div>
						</div>
					</div>

					<div className="rw-form-item">
						<label className="rw-form-label"></label>
						<div className="rw-form-info">
							{ UPEX.lang.template('实际到账金额:{num}', { num: store.withdrawValue})}
						</div>
					</div>
					<div className="rw-form-item">
						<label className="rw-form-label"></label>
						<div className="rw-form-info">
							<button className="submit-btn" onClick={this.handleOrder}>
								{UPEX.lang.template('确认提现')}
							</button>
							<button className="problem-btn" onClick={this.handleBack}>
								{UPEX.lang.template('返回修改')}
							</button>
						</div>
					</div>
				</div>
        	)
        } else {
            const SelectData = {
                setVal: (val, field) => {
                    store.setVal(val, field);
                },
                cards: store.bankCardsList,
                count: store.accountAmount,
                labels: { card: UPEX.lang.template('选择提现的银行卡'), balance: UPEX.lang.template('提现金额') }
            }
        	$formContent = (
        		<div className="rw-form">
                    <CardSelect  {...SelectData} />
					<div className="rw-form-item">
						<label className="rw-form-label"></label>
						<div className="rw-form-info">
							<button className="submit-btn" onClick={this.handleNextStep}>
								{UPEX.lang.template('下一步')}
							</button>
						</div>
					</div>
				</div>
        	)
        }

		return (
			<div>
				{ $formContent }
			</div>
		);
	}
}

export default FiatRechargeView;
