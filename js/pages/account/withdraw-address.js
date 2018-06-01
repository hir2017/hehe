/**
 * 添加提币地址
 */
import React, { Component } from 'react';
import { observer, inject ,} from 'mobx-react';
import { Select , message } from 'antd';
const Option = Select.Option;

@inject('accountStore', 'addressStore')
@observer
class WithdrawAddress extends Component {
	constructor(props){
		super(props);

		this.state = {
		}
	}

	componentDidMount() {
		let { accountStore, addressStore } = this.props;

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

            addressStore.setCurrencyId(defaultCoin.currencyId);	
        });
	}

	handleChange=(value)=>{
		this.props.addressStore.setCurrencyId(value);
	}

	onChangeAddress=(e) =>{
	    let value = e.currentTarget.value.trim();

	    this.props.addressStore.setAddress(value);
	}

	onChangeNote=(e) =>{
	    let value = e.currentTarget.value.trim();

	    this.props.addressStore.setNote(value);
	}

	onChangePwd=(e) =>{
	    let value = e.currentTarget.value.trim();

	    this.props.addressStore.setPwd(value);
	}

	handleSubmit=(e)=>{
		this.props.addressStore.addCoinAddress().then((data)=>{
			if (data.status === 200) {
				message.success(UPEX.lang.template('提币地址添加成功'));
				// 返回上一个页面
				history.back();
            } else if (data.status === 468) {
                message.error(UPEX.lang.template('交易密码输入错误'));
            } else {
                message.error(data.message)
            }
		})
	}

	render() {
		let { accountStore, addressStore } = this.props;
		let options = [];

		$options = accountStore.coinList.map((item, index)=>{
			return (
				<Option value={item.currencyId} key={item.currencyId}>{item.currencyNameEn}</Option>
			)
		})

		return (
			<div className="account-withdraw">
				<h2>{UPEX.lang.template('添加提币地址')}</h2>
				<div className="withdraw-form">
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('选择币种')}</label>
						<div className="withdraw-info">
							<Select value={ addressStore.currencyId } onChange={this.handleChange}>
						    	{ $options }				    	
						    </Select>
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('提币地址')}</label>
						<div className="withdraw-info">
							<div className="input-box">
                                <input 
                                    type="text"
                                    onChange={this.onChangeAddress}
                                    onBlur={()=>addressStore.checkAddress()}
                                />
                            </div>
                            { !addressStore.validAddress ? <div className="warn">* { UPEX.lang.template('提币地址填写错误')}</div> : null }
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('地址描述')}</label>
						<div className="withdraw-info">
							<div className="input-box">
                                <input 
                                    type="text" 
                                    onChange={this.onChangeNote}
                                    onBlur={()=>addressStore.checkNote()}
                                />
                            </div>
                            { !addressStore.validNote ? <div className="warn">* { UPEX.lang.template('地址描述填写错误')}</div> : null }
						</div>
					</div>
					<div className="withdraw-form-item">
						<label className="withdraw-label">{UPEX.lang.template('交易密码')}</label>
						<div className="withdraw-info">
							<div className="input-box">
                                <input 
                                    type="password" 
                                    onChange={this.onChangePwd}
                                    onBlur={()=>addressStore.checkPwd()}
                                />
                            </div>
                            { !addressStore.validPwd ? <div className="warn">* { UPEX.lang.template('交易密码填写错误')}</div> : null }
						</div>
					</div>
					<div className="withdraw-form-item">
						<div className="withdraw-info">
							<button className="submit-btn" onClick={this.handleSubmit}>{UPEX.lang.template('保存')}</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WithdrawAddress;