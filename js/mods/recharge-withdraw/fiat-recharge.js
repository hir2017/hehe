/**
 * 法币充值
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import { Select } from 'antd';
const Option = Select.Option;
import toAction from './fiat-recharge-action';

@inject('fiatRechargeStore')
@observer
class FiatRechargeView extends Component{
	constructor(props) {
		super(props);

		this.action = toAction(this.props.fiatRechargeStore);
	}

	componentDidMount() {
		this.action.getInfo();
	}

	handleOrder=(e)=>{
		this.action.handleRecharge();
	}

	onConfirm=(e)=>{

	}

	render() {
		let store = this.props.fiatRechargeStore;
		let $bankoptions = [];
		let $formContent;

		$bankoptions = store.bankCardsList.map((cur, index) => {
            return <Option key={index} value={cur.providerId}>{`${cur.providerName}(**** **** **** ${cur.providerNo})`}</Option>
        })
		
        if (store.step == 'success') {
        	$formContent = (
        		<div className="rw-form">
        			<div className="sub-title">{UPEX.lang.template('充值信息确认')}</div>
					<div className="rw-form-item">
						<label className="rw-form-label">{UPEX.lang.template('充值银行卡')}</label>
						<div className="rw-form-info">
							<div className="bank-card">
								<div className="bank-card-box">
									<div className="card-name">{store.selectedCard.providerName}</div>
									<div className="user-name">{store.selectedCard.showUserName}</div>
									<div className="card-no">{`**** **** **** ${store.selectedCard.providerNo}`} </div>
								</div>
							</div>

						</div>
					</div>
					<div className="rw-form-item recharge-form-balance">
						<label className="rw-form-label">{UPEX.lang.template('充值金额')}</label>
						<div className="rw-form-info">
							<i className="unit">NT$</i>
							<em className="balance">{store.balance}</em>
						</div>
					</div>
					<div className="rw-form-item">
						<label className="rw-form-label"></label>
						<div className="rw-form-info">
							<button className="submit-btn" onClick={this.onConfirm}>{UPEX.lang.template('已完成支付')}</button>
							<button className="problem-btn"><Link>{UPEX.lang.template('支付遇到问题')}</Link></button>
						</div>
					</div>
				</div>
        	)
        } else {
        	$formContent = (
        		<div className="rw-form">
					<div className="rw-form-item">
						<label className="rw-form-label">{UPEX.lang.template('选择充值的银行卡')}</label>
						<div className="rw-form-info">
							<Select 
								notFoundContent={UPEX.lang.template('无')}
                                defaultValue={ UPEX.lang.template('请选择一张绑定的银行账号') }
                                onChange={this.action.handleChangeBank}
							>
	                            { $bankoptions }
	                        </Select>
	                        <Link to="/user/bankInfo">{UPEX.lang.template('绑定新银行卡')}</Link>
						</div>
					</div>
					<div className="rw-form-item">
						<label className="rw-form-label">{UPEX.lang.template('充值金额')}</label>
						<div className="rw-form-info">
							<div className="input-box">
								<input 
									type="number"
									onChange={this.action.onChangeBalance}
								/>
								<i className="unit hidden">NT$</i>
							</div>
							<div className="balance">{ UPEX.lang.template('当前余额: NT${count}', {count : store.accountAmount})}</div>
						</div>
					</div>
					<div className="rw-form-item">
						<label className="rw-form-label"></label>
						<div className="rw-form-info">
							<button className="submit-btn" onClick={this.handleOrder}>{UPEX.lang.template('去网上银行充值')}</button>
						</div>
					</div>
				</div>
        	)
        }

		return (
			<div>
				{ $formContent }
				<div className="recharge-tip">
					<div className="sub-title">{UPEX.lang.template('充值遇到了问题')}</div>
					{
						// <div className="content" dangerouslySetInnerHTML={{__html: UPEX.lang.template('充值遇到了问题内容')}}></div>	
					}
					<div className="content">
						<ul>
							<li>
								1. 我們只支持已綁定的銀行卡充值，如沒有綁定銀行賬戶，請先綁定;
							</li>
							<li>
								2. 不同銀行資金到賬時間不一樣。如果充值后資金未幾時到賬，請聯繫您的銀行；
							</li>
							<li>
								3. 如遇任何充值問題請聯繫我們的客服 support@acex.one
							</li>
						</ul>
					</div>
					
				</div>
			</div>
		);				
	}
}

export default FiatRechargeView;