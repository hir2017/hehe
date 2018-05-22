import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
const Option = Select.Option;
import { Link } from 'react-router';

@inject('assetsStore')
@observer
class InfoView extends Component {
	
	handleAllMoney=(e)=>{
		this.props.assetsStore.handleVisibleMoney();
	}

	render() {
		let store = this.props.assetsStore;

		return (
			<div className="assets-hd-box">
				<div className="assets-title">
					<h2>{ UPEX.lang.template('我的资产') }</h2>
					<div className="assets-count hidden">
						<label>{ UPEX.lang.template('总资产折合')}</label>
						<Select defaultValue="TWD" onChange={this.handleChange}>
					    	<Option value="TWD">TWD</Option>
					    	<Option value="CNY">CNY</Option>
					    	<Option value="HKD">HKD</Option>
					    	<Option value="USD">USD</Option>
					    </Select>
					    <label>≈</label>
					    <em>NT$3,404,911</em>
					</div>
				</div>
				<div className="assets-content clearfix">
                    <div className="assets-amount">
                        <div className="amount">
                            <label>{ UPEX.lang.template('可用余额')} </label>
                            <em>{ store.visibleMoney ? store.allMoney : '******'} </em>
                            <i className={store.visibleMoney ? 'open': 'close'} onClick={this.handleAllMoney}></i>
                        </div>
                        <div className="actions">
                            <button className="btn">
                            	<Link to="/recharge">{ UPEX.lang.template('充值') }</Link>
                            </button>
                            <button className="btn">
                            	<Link to="/withdraw">{ UPEX.lang.template('提现') }</Link>
                            </button>
                        </div>
                    </div>
                    <div className="assets-record">
                        <button className="btn">
                        	<Link to="/coinrecord">{ UPEX.lang.template('数位资产记录') }</Link>
                        </button>
                        <button className="btn">
                        	<Link to="/fiatrecord">{ UPEX.lang.template('法币资金记录') }</Link>
                        </button>
                    </div>
				</div>
			</div>
		)
	}
}

export default InfoView;