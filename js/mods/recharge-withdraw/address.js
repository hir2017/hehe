import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select , message } from 'antd';
const Option = Select.Option;
import toAction from './address-action';


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
			<div className="rw-form">
				<div className="rw-form-item">
					<label className="rw-form-label">{UPEX.lang.template('币种选择')}</label>
					<div className="rw-form-info">
						<Select value={ addressStore.currencyId } onChange={this.action.onChangeCurrencyId}>
					    	{ $options }
					    </Select>
					</div>
				</div>
				<div className="rw-form-item">
					<label className="rw-form-label">{UPEX.lang.template('提币地址')}</label>
					<div className="rw-form-info">
						<div className="input-box">
                            <input
                                type="text"
                                onChange={this.action.onChangeAddress}
                                onBlur={this.action.onBlurToVerify.bind(this, 'address')}
                            />
                        </div>
                        { !addressStore.validAddress ? <div className="warn">* { UPEX.lang.template('请填写正确的提币地址')}</div> : null }
					</div>
				</div>
				<div className="rw-form-item">
					<label className="rw-form-label">{UPEX.lang.template('地址描述')}</label>
					<div className="rw-form-info">
						<div className="input-box">
                            <input
                                type="text"
                                onChange={this.action.onChangeNote}
                                onBlur={this.action.onBlurToVerify.bind(this, 'note')}
                            />
                        </div>
                        { !addressStore.validNote ? <div className="warn">* { UPEX.lang.template('请填写正确的地址描述')}</div> : null }
					</div>
				</div>
				<div className="rw-form-item">
					<label className="rw-form-label">{UPEX.lang.template('资金密码')}</label>
					<div className="rw-form-info">
						<div className="input-box">
                            <input
                                type="password"
                                onChange={this.action.onChangePwd}
                                onBlur={this.action.onBlurToVerify.bind(this, 'pwd')}
                            />
                        </div>
                        { !addressStore.validPwd ? <div className="warn">* { UPEX.lang.template('请输入正确的资金密码')}</div> : null }
					</div>
				</div>
				<div className="rw-form-item">
					<div className="rw-form-info">
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
