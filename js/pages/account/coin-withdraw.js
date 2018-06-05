/**
 * 提币
 * TODO 不满足提币条件，引导绑定手机、身份认证等操作
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message, Alert } from 'antd';
import { Link, browserHistory } from 'react-router';
const Option = Select.Option;
import Timer from '../../lib/timer';
import RecordList from '../../mods/account/coin-withdraw-record';
import WithdrawCoin from '../../mods/withdraw/coin';

@inject('accountStore', 'userInfoStore', 'coinWithdrawStore')
@observer
class Withdraw extends Component{
	componentDidMount() {
		let { accountStore, userInfoStore, coinWithdrawStore } = this.props;

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
            
            coinWithdrawStore.updateCurrentCoin({
            	currencyId: defaultCoin.currencyId,
            	currencyNameEn: defaultCoin.currencyNameEn
            });
            coinWithdrawStore.getTakeCoinInfo(defaultCoin.currencyId);
        });

        // 获取用户信息
        userInfoStore.getUserInfo();
        coinWithdrawStore.getImgCaptcha();
	}

	componentWillUnmount() {
		this.timer && this.timer.destroy();
	}

	handleChange=(value)=>{
		this.props.coinWithdrawStore.updateCurrentCoin({
			currencyId: value.key,
			currencyNameEn: value.label
		});
	}

	handleSubmit=(e)=>{
		const { takeCoin, verifyBeforeSubmit } = this.props.coinWithdrawStore;

		if (verifyBeforeSubmit().pass) {
			this.props.coinWithdrawStore.takeCoin()
				.then((data)=>{

				});
		} else {

		}
	}
	// TODO 选择充币地址
	handleChangeAddress=(value)=>{

	}

	// 输入框选择
	onChangeInput=(e)=>{
		let target = $(e.currentTarget);
		let key = target.attr('data-key');
		let value = target.val().trim();
		let store = this.props.coinWithdrawStore;
		
		switch(key){
			case 'address':
				store.setAddress(value);
				break;
			case 'note':
				store.setNote(value);
				break;
			case 'amount':
				store.setAmount(value);
				break;
			case 'vercode':
				store.setVercode(value);
				break;
			case 'tradepwd':
				store.setTradePassword(value);
				break;
			case 'emailcode':
				store.setEmailCode(value);
				break;
			case 'googlecode':
				store.setGoogleCode(value);
				break;
			case 'phonecode':
				store.setPhoneCode(value);
				break;

		}
	}
	/**
	 * 填写邮箱验证码
	 */
	sendEmailCode=(e)=>{
		let store = this.props.coinWithdrawStore;
		let { sendEmailCode } = this.props.coinWithdrawStore;
		
		if (!store.vercode) {
			store.changeImgCodeTo(false);
           	return;
        }
		// 邮件验证码
        sendEmailCode().then((data) => {
            switch (data.status) {
                case 200:
                    // 发送成功
                    let timer = this.timer = new Timer({
                        remainTime: 60,
                        isDoubleBit: true,
                        selector: {
                            second: '[data-second]'
                        }
                    });

                    this.timer.on('end', () => {
                        store.changeSendingCodeTo(false);
                    });

                    store.changeSendingCodeTo(true);
                    store.changeImgCodeTo(true);
                    store.changeEmailCodeTo(true);

                    break;
                case 412:
                    // 图片验证码错误
                    message.error(data.message);
                    store.changeImgCodeTo(false);
                    store.getImgCaptcha();
                    break;
                case 414: // 邮箱已经绑定
                default:
                    // 其他错误
                    message.error(data.message);
                    store.getImgCaptcha();
            }
        });
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
		let $options = [];
		let $addressOptions = [];
		let $content;

		$options = accountStore.coinList.map((item, index)=>{
			return (
				<Option value={item.currencyId} key={item.currencyId}>{item.currencyNameEn}</Option>
			)
		})

		$addressOptions = store.addressList.map((cur, index) => {
            return <Option key={index} value={`${cur.address}`}>{cur.address}</Option>
        }) 

        if (userInfoStore.isFetchingInfo == false) {
    		// KYC1未认证通过
			if (userInfoStore.userInfo.isAuthPrimary !== 2) {
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您进行身份认证，否则无法进行充值、提现、提币操作')}</h4>
						<button onClick={this.clickAuthUserIDCard}>{UPEX.lang.template('身份认证')}</button>
					</div>
				);
			} else if (!userInfoStore.userInfo.isValidatePass){
				$content = (
					<div className="userauth-guide">
						<h4>{UPEX.lang.template('请您先设置交易密码，否则无法进行提币操作')}</h4>
						<button onClick={this.clickSetTradePwd}>{UPEX.lang.template('设置交易密码')}</button>
					</div>
				);
			} else {
				$content = (
					<div>
						<div className="withdraw-form">
							<div className="withdraw-form-item">
								<Alert message={UPEX.lang.template('當前安全等级{level}可提額度(TWD)：{num1}/笔, {num2}/日',{ level: 'A', num1: 1200, num2: 3000})} type="warning" showIcon />
							</div>
							<div className="withdraw-form-item">
								<label className="withdraw-label">{UPEX.lang.template('选择币种')}</label>
								<div className="withdraw-info">
									<Select labelInValue value={{ key: store.currentCoin.currencyId}} onChange={this.handleChange}>
								    	{ $options }				    	
								    </Select>
								</div>
							</div>
							<div className="withdraw-form-item">
								<label className="withdraw-label">{UPEX.lang.template('提币地址')}</label>
								<div className="withdraw-info">
									<div className="address-box">
										<div className="select-box">
											<Select notFoundContent={UPEX.lang.template('无')}
				                                    defaultValue={ UPEX.lang.template('请在下方输入本次提币地址') }
				                                    onChange={this.handleChangeAddress.bind(this)}
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
			                                    onChange={this.onChangeInput}
			                                />
		                                </div>                            	
		                            	<div className={`input-box mt10 ${store.validAddress ? '' : 'wrong'}`}>
			                                <input 
			                                    type="text" 
			                                    placeholder={UPEX.lang.template('提币地址')}
			                                    value={store.address}
			                                    data-key="address"
			                                    onChange={this.onChangeInput}
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
			                                onChange={this.onChangeInput}
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
			                                onChange={ this.onChangeInput}
			                            />
			                            <div className="codeimg">
			                                <img src={ store.captchaStore.captcha } onClick={ store.getImgCaptcha } alt=""/>
			                            </div>
			                        </div>
			                    </div>
							</div>
							<div className="withdraw-form-item">
								<label className="withdraw-label">{UPEX.lang.template('邮箱验证')}</label>
								<div className="withdraw-info">
									<div className="email-box">
										<div className={`input-box ${store.validEmailCode ? '' : 'wrong'}`}>
			                                <input 
			                                    type="text"
			                                    data-key="emailcode"
			                                    placeholder={UPEX.lang.template('填写邮箱验证码')}
				                                onChange={this.onChangeInput}
			                                />
			                            </div>
		                                <button onClick={ this.sendEmailCode } className={ store.sendingcode ? 'disabled' : ''} >
		                                    <div className={ store.sendingcode ? 'code-sending': 'code-sending hidden'}>{ UPEX.lang.template('重发')}（<span data-second="second" ref="second"></span>s）</div>
		                                    <div className={ store.sendingcode ? 'code-txt hidden' : 'code-txt'}>{  UPEX.lang.template('获取验证码') }</div>
		                                </button>
		                            </div>
								</div>
							</div>
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
											<div className="input-box">
				                                <input 
				                                    type="number"
				                                    data-key="phonecode"
				                                    placeholder={UPEX.lang.template('填写短信验证码')}
					                                onChange={this.onChangeInput}
				                                />
				                            </div>
										): (
											<div className="input-box">
				                                <input 
				                                    type="number"
				                                    data-key="googlecode"
				                                    placeholder={UPEX.lang.template('填写谷歌验证码')}
					                                onChange={this.onChangeInput}
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
			                                onChange={this.onChangeInput}
		                                />
		                            </div>
								</div>
							</div>
							<div className="withdraw-form-item">
								<div className="withdraw-info">
									<button className="submit-btn" onClick={this.handleSubmit}>{UPEX.lang.template('确认提币')}</button>
								</div>
							</div>	
							<div className="withdraw-form-item">
								<div className="withdraw-info">
									<div className="warmtip">
										<h4>{UPEX.lang.template('温馨提示')}</h4>
										<ul>
											<li dangerouslySetInnerHTML={{__html: UPEX.lang.template('最小提币数量为{count}', { count: `${store.amountLowLimit || 0 }${accountStore.currentCoin.currencyNameEn || ''}`})}}></li>
											<li dangerouslySetInnerHTML={{__html: UPEX.lang.template('提现完成后，你可以进入历史记录页面跟踪进度')}}></li>
										</ul>
									</div>
								</div>
							</div>	
						</div>
						<div className="withdraw-record">
							<h3>{UPEX.lang.template('提币记录')}</h3>
							<RecordList/>
						</div>
					</div>
				);
			}

        } else {
        	$content = (<div className="mini-loading"></div>);
        }

        return (
    		<div className="account-withdraw">
    			<h2 className="title">{UPEX.lang.template('提币')}</h2>
    			<div className="content">{ $content }</div>
    		</div>
    	)
	}
}

export default Withdraw;