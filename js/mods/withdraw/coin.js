import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select , message , Alert } from 'antd';
const Option = Select.Option;
import { Link, browserHistory } from 'react-router';
import toAction from './coin.action';
import RecordList from '../account/coin-withdraw-record';

@inject('coinWithdrawStore', 'accountStore', 'userInfoStore')
@observer
class WithdrawCoin extends Component {
	static defaultProps = {
		userInfo: {}
	}
	constructor(props){
		super(props);

		let { coinWithdrawStore , accountStore } = this.props;

		this.action = toAction(coinWithdrawStore, accountStore);
	}

	componentDidMount(){
		let { accountStore } = this.props;

        accountStore.getUserCoinAccount(()=>{
        	const coinNameEn = this.props.params.code;
        	let defaultCoin;

        	if (coinNameEn) {
        		defaultCoin = accountStore.originAccountData.coinList.filter(function(item) {
	                return item.currencyNameEn === coinNameEn.toUpperCase();
	            })[0];
        	}

            if (!defaultCoin) {
                defaultCoin = accountStore.originAccountData.coinList[0];
            }
            
            this.action.initWithdrawCoin({
            	currencyId: defaultCoin.currencyId,
            	currencyNameEn: defaultCoin.currencyNameEn
            });
        });

        this.action.getImgCaptcha();
	}

	componentWillUnmount(){
		this.action.destroy();
	}

	clickSetTradePwd=(e)=>{
		browserHistory.push('/user/settingTraddingPassword');
	}

	clickAuthUserIDCard=(e)=>{
		browserHistory.push('/user/authentication');
	}

	render() {
		let { accountStore , userInfoStore } = this.props;
		let store = this.props.coinWithdrawStore;
		let action = this.action;
		let $options = [];
		let $addressOptions = [];
		
		$options = accountStore.coinList.map((item, index)=>{
			return (
				<Option value={item.currencyId} key={item.currencyId}>{item.currencyNameEn}</Option>
			)
		})

		$addressOptions = store.addressList.map((cur, index) => {
            return <Option key={index} value={`${cur.address}`}>{cur.address}</Option>
        }) 

		return (
			<div>
				<div className="withdraw-form">
					<div className="withdraw-form-item">
						<Alert message={UPEX.lang.template('當前安全等级{level}可提額度(TWD)：{num2}/日',{ level: 323, num2: 3000})} type="warning" showIcon />
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('选择币种')}</label>
						<div className="withdraw-info">
							<Select labelInValue value={{ key: store.currentCoin.currencyNameEn}} onChange={action.selectWithdrawCoin}>
						    	{ $options }				    	
						    </Select>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('提币地址')}</label>
						<div className="withdraw-info">
							<div className="address-box">
								<div className="select-box">
									<Select 
										defaultValue={UPEX.lang.template('请在下方输入本次提币地址')}
										notFoundContent={UPEX.lang.template('无')}
	                                    onChange={action.selectChangeAddress}
									>
		                            	{$addressOptions}
		                            </Select>
	                            </div>	
	                            <button>
	                            	<Link to={`/account/coin/withdrawaddress/${store.currentCoin.currencyNameEn}`}>{UPEX.lang.template('添加地址')}</Link>
	                            </button>
	                        </div>
	                        <div className="address-custom mt10">
	                        	<div className={`input-box ${store.validNote ? '' : 'wrong'}`}>
	                                <input 
	                                    type="text" 
	                                    placeholder={UPEX.lang.template('地址备注')}
	                                    value={store.note}
	                                    data-key="note"
	                                    onChange={action.onChangeInput}
	                                />
	                            </div>                            	
	                        	<div className={`input-box mt10 ${store.validAddress ? '' : 'wrong'}`}>
	                                <input 
	                                    type="text" 
	                                    placeholder={UPEX.lang.template('提币地址')}
	                                    value={store.address}
	                                    data-key="address"
	                                    onChange={action.onChangeInput}
	                                />
	                            </div>
	                        </div>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('提币数量')}</label>
						<div className="withdraw-info">
							<div className={`input-box ${store.validAmount ? '' : 'wrong'}`}>
	                            <input 
	                                type="number"
	                                placeholder={UPEX.lang.template('最小提币数量为{count}', { count: `${store.amountLowLimit}${store.currentCoin.currencyNameEn}`})} 
	                                value={store.amount}
	                                data-key="amount"
	                                onChange={action.onChangeInput}
	                            />
	                        </div>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('图片验证码')}</label>
						<div className="withdraw-info">
							<div className={`input-box yz-box ${store.validImgCode ? '' : 'wrong'}`}>
	                            <input 
	                                type="text" 
	                                placeholder={ UPEX.lang.template('图片验证') }
	                                data-key="vercode"
	                                onChange={ action.onChangeInput}
	                            />
	                            <div className="codeimg">
	                                <img src={ store.captchaStore.captcha } onClick={ action.getImgCaptcha } alt=""/>
	                            </div>
	                        </div>
	                    </div>
					</div>
					{
						userInfoStore.userInfo.isValidateEmail ?  (
							<div className="withdraw-form-item">
								<label className="withdraw-label">{UPEX.lang.template('邮箱验证')}</label>
								<div className="withdraw-info">
									<div className="vercode-box">
										<div className={`input-box ${store.validEmailCode ? '' : 'wrong'}`}>
			                                <input 
			                                    type="text"
			                                    data-key="emailcode"
			                                    placeholder={UPEX.lang.template('填写邮箱验证码')}
				                                onChange={action.onChangeInput}
			                                />
			                            </div>
			                            <button onClick={ action.sendEmailCode } className={ store.sendingcode ? 'disabled' : ''} >
			                                <div className={ store.sendingcode ? 'code-sending': 'code-sending hidden'}>{ UPEX.lang.template('重发')}（<span data-second="second" ref="second"></span>s）</div>
			                                <div className={ store.sendingcode ? 'code-txt hidden' : 'code-txt'}>{  UPEX.lang.template('获取验证码') }</div>
			                            </button>
			                        </div>
								</div>
							</div>
						) : null

					}
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('认证方式')}</label>
						<div className="withdraw-info">
							<ul className="auth-type">
								<li 
									onClick={()=>store.changeAuthTypeTo('phone')} 
									className={store.authType == 'phone' ?  'auth-item selected' : 'auth-item'}
								>
									{UPEX.lang.template('手机认证')}
								</li>
								<li 
									onClick={()=>store.changeAuthTypeTo('google')}
									className={store.authType == 'google' ?  'auth-item selected' : 'auth-item'}
								>
									{UPEX.lang.template('Google认证')}
								</li>
							</ul>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label"></label>
						<div className="withdraw-info">
							{ 
								store.authType == 'phone' ? (
									<div className="vercode-box">
										<div className="input-box">
			                                <input 
			                                    type="text"
			                                    data-key="phonecode"
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
		                                    placeholder={UPEX.lang.template('填写谷歌验证码')}
			                                onChange={action.onChangeInput}
		                                />
		                            </div>
								)
							}
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('交易密码')}</label>
						<div className="withdraw-info">
							<div className={`input-box ${store.validTradePwd ? '' : 'wrong'}`}>
	                            <input 
	                                type="password" 
	                                data-key="tradepwd"
	                                placeholder={UPEX.lang.template('填写交易密码')}
	                                onChange={action.onChangeInput}
	                            />
	                        </div>
						</div>
					</div>
					<div className="withdraw-form-item">
						<div className="withdraw-info">
							<button className="submit-btn" onClick={action.handleSubmit}>{UPEX.lang.template('确认提币')}</button>
						</div>
					</div>	
					<div className="withdraw-form-item">
						<div className="withdraw-info">
							<div className="warmtip">
								<h4>{UPEX.lang.template('温馨提示')}</h4>
								<ul>
									<li dangerouslySetInnerHTML={{__html: UPEX.lang.template('最小提币数量为{count}', { count: `${store.amountLowLimit || 0 }${store.currentCoin.currencyNameEn || ''}`})}}></li>
									<li dangerouslySetInnerHTML={{__html: UPEX.lang.template('提现完成后，你可以进入历史记录页面跟踪进度')}}></li>
								</ul>
							</div>
						</div>
					</div>	
				</div>
				<div className="withdraw-record">
					<h3>{UPEX.lang.template('提币记录')}</h3>
					<RecordList currencyId={store.currentCoin.currencyId}/>
				</div>
			</div>
		)
	}


}

export default WithdrawCoin;