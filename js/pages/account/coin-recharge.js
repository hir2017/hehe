/**
 * 充币
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message } from 'antd';
import Clipboard  from 'clipboard';
const Option = Select.Option;
import RecordList from '../../mods/account/coin-recharge-record';

@inject('accountStore')
@observer
class Recharge extends Component{
	
	componentDidMount() {
		let store = this.props.accountStore;

        store.getUserCoinAccount(()=>{
        	const coinNameEn = this.props.params.code;
        	let defaultCoin = {};

        	if (coinNameEn) {
        		defaultCoin = store.originAccountData.coinList.filter(function(item) {
	                return item.currencyNameEn === coinNameEn.toUpperCase();
	            })[0];
        	}

            if (!defaultCoin) {
                defaultCoin = store.originAccountData.coinList[0];
            }

            store.selectUserAddress(defaultCoin.currencyId, defaultCoin.currencyNameEn);
        });
        
        this.bindCopyEvent();
	}

	handleChange=(value)=>{

		this.props.accountStore.selectUserAddress(value.key, value.label);
	}

	bindCopyEvent(){
		let self = this;
		
        const clip = this.clip = new Clipboard('#copy-address', {
            text() {
            	let node = $(self.refs.address);
                
                return node.data('address');
            }
        });

        clip.on('success', () => {
        	message.success(UPEX.lang.template('复制成功'))
        });

        clip.on('error', () => {
        	message.error(UPEX.lang.template('复制失败'))
        });
	}


	render() {
		let store = this.props.accountStore;
		let options = [];

		$options = this.props.accountStore.coinList.map((item, index)=>{
			return (
				<Option value={item.currencyId} key={item.currencyId}>{item.currencyNameEn}</Option>
			)
		})

		return (
			<div className="account-recharge">
				<h2>{UPEX.lang.template('充币')}</h2>
				<div className="recharge-form">
					<div className="recharge-form-item">
						<label className="recharge-label">{UPEX.lang.template('选择币种')}</label>
						<div className="recharge-info">
							<Select labelInValue value={{ key: store.currentCoin.currencyId}} onChange={this.handleChange}>
						    	{ $options }				    	
						    </Select>
						</div>
					</div>
					<div className="recharge-form-item">
						<label className="recharge-label">{UPEX.lang.template('充币地址')}</label>
						<div className="recharge-info">
							<ul>
								<li>
									<div className="address" ref="address" data-address={store.currentCoin.address}>{ store.currentCoin.address}</div>
									<button className="copy" id="copy-address">{UPEX.lang.template('复制地址')}</button>
								</li>
								<li>
									<div className="qrcode">
										<img src={`data:image/png;base64,${store.currentCoin.image}`} alt=""/>
									</div>
									<label className="qrcode-label">{UPEX.lang.template('{name}充值地址',{ name: store.currentCoin.currencyNameEn})}</label>
								</li>
								<li>
									<div className="tip">
										<h3>{UPEX.lang.template('温馨提示')}</h3>
										<ul>
											<li dangerouslySetInnerHTML={{__html: UPEX.lang.template('禁止向非{name}地址充值，除{name}之外的資產，任何充入{name}地址的非{name}資產將不可找回。', { name: store.currentCoin.currencyNameEn}, 1) }}></li>
											<li dangerouslySetInnerHTML={{__html: UPEX.lang.template('使用{name}地址充值需要{num}個以上網絡確認才能到賬。',{name: store.currentCoin.currencyNameEn, num: store.currentCoin.confirmNum}, 1) }}></li>
											<li dangerouslySetInnerHTML={{__html: UPEX.lang.template('充值完成後，妳可以進入歷史記錄頁面跟蹤進度')}}></li>
										</ul>
									</div>
								</li>
							</ul>
						</div>
					</div>
					{ store.isFetching ? <div className="mini-loading"></div> : null }
				</div>
				<div className="recharge-record">
					<h3>{UPEX.lang.template('充币记录')}</h3>
					{ store.currentCoin.currencyId ? <RecordList currencyId={store.currentCoin.currencyId} key={store.currentCoin.currencyId}/> : null }
				</div>
			</div>
		)
	}
}

export default Recharge;