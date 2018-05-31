/**
 * 提币
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

            accountStore.updateCurrentCoin(defaultCoin);
            coinWithdrawStore.getTakeCoinInfo(defaultCoin.currencyId);
        });

        // 获取用户信息
        userInfoStore.getUserInfo();
	}

	handleChange=(e)=>{

	}

	handleSubmit=(e)=>{

	}

	handleChangeAddress=(e)=>{

	}

	render(){
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
							<Select labelInValue value={{ key: accountStore.currentCoin.currencyId}} onChange={this.handleChange}>
						    	{ $options }				    	
						    </Select>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('提币地址')}</label>
						<div className="withdraw-info">
							<div className="address-box">	
								<Select notFoundContent={UPEX.lang.template('无')}
	                                    defaultValue={ UPEX.lang.template('请在下方输入本次提币地址') }
	                                    onChange={this.handleChangeAddress.bind(this)}
								>
	                                {$addressOptions}
	                            </Select>
	                            <button>
	                            	<Link to={`/account/coin/withdrawaddress/${accountStore.currentCoin.currencyNameEn}`}>{UPEX.lang.template('添加地址')}</Link>
	                            </button>
	                        </div>
                            <div className="input-box mt10">
                                <input 
                                    type="text" 
                                    placeholder={UPEX.lang.template('提币地址')}
                                />
                            </div>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('提币数量')}</label>
						<div className="withdraw-info">
							<div className="input-box">
                                <input 
                                    type="text"
                                    placeholder={UPEX.lang.template('最小提币数量为{count}', { count: `${store.amountLowLimit}${accountStore.currentCoin.currencyNameEn}`})} 
                                />
                            </div>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('Google认证')}</label>
						<div className="withdraw-info">
							<div className="input-box">
                                <input 
                                    type="text" 
                                />
                            </div>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('邮箱验证')}</label>
						<div className="withdraw-info">
							<div className="input-box">
                                <input 
                                    type="text" 
                                />
                            </div>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('支付密码')}</label>
						<div className="withdraw-info">
							<div className="input-box">
                                <input 
                                    type="text" 
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
									<li dangerouslySetInnerHTML={{__html: UPEX.lang.template('最小提币数量为{count}', { count: `${store.amountLowLimit}${accountStore.currentCoin.currencyNameEn}`})}}></li>
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