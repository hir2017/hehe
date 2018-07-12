/**
 * 充币
 * TODO msgCode=0的情况
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message , Alert } from 'antd';
const Option = Select.Option;
import { browserHistory } from 'react-router';
import Clipboard  from 'clipboard';

@inject('accountStore')
@observer
class CoinRecharge extends Component{

	componentDidMount() {
        this.fetchCoinList();
        this.bindCopyEvent();
        this.bindEvent();
	}

	fetchCoinList() {
		let store = this.props.accountStore;

        store.getUserCoinAccount(()=>{
        	const coinNameEn = this.props.params.code;
        	let defaultCoin;

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
	}

	handleChange=(value)=>{
		this.props.accountStore.selectUserAddress(value.key, value.label);
	}
	/**
	 * 复制地址
	 */
	bindCopyEvent(){
		let self = this;

        const clip = this.clip = new Clipboard('#copy-address', {
            text() {
            	let node = $(self.refs.address);

                return node.val();
            }
        });

        clip.on('success', () => {
        	message.success(UPEX.lang.template('复制成功'))
        });

        clip.on('error', () => {
        	message.error(UPEX.lang.template('复制失败'))
        });
	}

	bindEvent(){
		let box = $(this.refs.wrapper);

		box.on('click', '.r-coin-record', (e)=>{
			browserHistory.push('/account/coinrecord');
		})
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
			<div >
				<div className="rw-form">
					<div className="rw-form-item">
						<Alert
					      description={UPEX.lang.template('充币提醒信息内容')}
					      type="warning"
					    />
	    			</div>
					<div className="rw-form-item">
						<label className="rw-form-label">{UPEX.lang.template('选择币种')}</label>
						<div className="rw-form-info">
							<Select
								labelInValue
								value={{ key: store.currentCoin.currencyNameEn}}
								onChange={this.handleChange}
							>
						    	{ $options }
						    </Select>
						</div>
					</div>
					<div className="rw-form-item">
						<label className="rw-form-label">{UPEX.lang.template('充币地址')}</label>
						<div className="rw-form-info">
							<ul>
								<li className="input-button-box">
									<div className="input-box">
										<input 
											ref="address" 
											data-address={store.currentCoin.address} 
											value={store.currentCoin.address} 
											readOnly
										/>
									</div>
									<button id="copy-address" className="rw-sp-vcode-btn">{UPEX.lang.template('复制地址')}</button>
								</li>
								<li>
									{UPEX.lang.template('网络手续费: {fee}', {fee: store.currentCoin.fee || '--'})}
								</li>
								<li className="qrcode-box">
									<label className="qrcode-label">{UPEX.lang.template('{name}充值地址',{ name: store.currentCoin.currencyNameEn})}</label>
									<div className="qrcode-img">
										<img src={`data:image/png;base64,${store.currentCoin.image}`} alt=""/>
									</div>
								</li>
								<li>
									<div className="warmprompt">
										<div className="warmprompt-title">{UPEX.lang.template('温馨提示')}</div>
										<div className="warmprompt-content" 
											dangerouslySetInnerHTML={{__html: UPEX.lang.template('充币温馨提示内容',{  name: store.currentCoin.currencyNameEn || '--', num: store.currentCoin.confirmNum || '--'}, 1)}}
										/>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CoinRecharge;
