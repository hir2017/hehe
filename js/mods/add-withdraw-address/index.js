import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select , message } from 'antd';
const Option = Select.Option;
import toAction from './action';


@inject('addressStore')
@observer
class AddWithdrawAddress extends Component {
	static defaultProps = {
		coinList: []
	}

	constructor(props){
		super(props);
		this.action = toAction(this.props.addressStore);
	}

	render() {
		let { coinList, addressStore } = this.props;
		let $options = [];

		$options = coinList.map((item, index)=>{
			return (
				<Option value={item.currencyId} key={item.currencyId}>{item.currencyNameEn}</Option>
			)
		})

		return (
			<div className="withdraw-form">
				<div className="withdraw-form-item">
					<label className="withdraw-label">{UPEX.lang.template('币种选择')}</label>
					<div className="withdraw-info">
						<Select value={ addressStore.currencyId } onChange={this.action.onChangeCurrencyId}>
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
                                onChange={this.action.onChangeAddress}
                                onBlur={this.action.onBlurToVerify.bind(this, 'address')}
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
                                onChange={this.action.onChangeNote}
                                onBlur={this.action.onBlurToVerify.bind(this, 'note')}
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
                                onChange={this.action.onChangePwd}
                                onBlur={this.action.onBlurToVerify.bind(this, 'pwd')}
                            />
                        </div>
                        { !addressStore.validPwd ? <div className="warn">* { UPEX.lang.template('交易密码填写错误')}</div> : null }
					</div>
				</div>
				<div className="withdraw-form-item">
					<div className="withdraw-info">
						{
							addressStore.$submiting 
							? 
							<button className="submit-btn disabled">{UPEX.lang.template('提交中')}</button> 
							: 
							<button className="submit-btn" onClick={this.action.handleSubmit}>{UPEX.lang.template('保存')}</button>
						
						}
					</div>
				</div>
			</div>
		)
	}
}

export default AddWithdrawAddress;