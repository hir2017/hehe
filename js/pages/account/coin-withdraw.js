/**
 * 提币
 * TODO 不满足提币条件，引导绑定手机、身份认证等操作
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message, Alert } from 'antd';
import { Link } from 'react-router';
const Option = Select.Option;
import RecordList from '../../mods/account/coin-withdraw-record';

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

		}
	}

	render() {
		let { accountStore } = this.props;
		let store = this.props.coinWithdrawStore;
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
			<div className="account-withdraw">
				<h2>{UPEX.lang.template('提币')}</h2>
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
                                    type="text"
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
							<div className="input-box yz-box">
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
						<label className="withdraw-label">{UPEX.lang.template('Google认证')}</label>
						<div className="withdraw-info">
							<div className="input-box">
                                <input 
                                    type="number"
                                    data-key="google"
	                                onChange={this.onChangeInput}
                                />
                            </div>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('邮箱验证')}</label>
						<div className="withdraw-info">
							<div className={`input-box ${store.validEmailCode ? '' : 'wrong'}`}>
                                <input 
                                    type="text"
                                    data-key="emailcode"
	                                onChange={this.onChangeInput}
                                />
                            </div>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('支付密码')}</label>
						<div className="withdraw-info">
							<div className={`input-box ${store.validTradePwd ? '' : 'wrong'}`}>
                                <input 
                                    type="password" 
                                    data-key="tradepwd"
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
		)
	}
}

export default Withdraw;