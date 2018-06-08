/**
 * 添加提币地址
 */
import React, { Component } from 'react';
import { observer, inject ,} from 'mobx-react';

import AddWithdrawAddress from '../../mods/recharge-withdraw/address';

@inject('accountStore', 'addressStore')
@observer
class WithdrawAddress extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		let { accountStore, addressStore } = this.props;
		const coinNameEn = this.props.params.code;
		
        accountStore.getUserCoinAccount(()=>{
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

	render() {
		let { accountStore } = this.props;
		let $content;

		if (accountStore.isFetching) {
			$content = <div className="mini-loading"></div>;
		} else {
			$content = <AddWithdrawAddress coinList={accountStore.coinList}/>;
		}	

		return (
			<div className="rw-wrapper">
				<h2 className="title">{UPEX.lang.template('添加提币地址')}</h2>
				<div className="content">
					{ $content }
				</div>
			</div>
		);
	}
}

export default WithdrawAddress;