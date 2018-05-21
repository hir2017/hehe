import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Select } from 'antd';
const Option = Select.Option;

@inject('assetsStore')
@observer
class InfoView extends Component {
	render(){
		return (
			<div className="assets-hd-box">
				<div className="assets-title">
					<h2>{ UPEX.lang.template('我的资产') }</h2>
					<div className="assets-count">
						<label>{ UPEX.lang.template('总资产折合')}</label>
						<Select defaultValue="TWD" onChange={this.handleChange}>
					    	<Option value="TWD">TWD</Option>
					    	<Option value="CNY">CNY</Option>
					    	<Option value="HKD">HKD</Option>
					    	<Option value="USD">USD</Option>
					    </Select>
					    <label>≈</label>
					    <em>NT$ 3,404,911 </em>
					</div>
				</div>
				<div className="assets-content clearfix">
                    <div className="assets-amount">
                        <div className="amount">
                            <label>{ UPEX.lang.template('可用余额')} </label>
                            <em>NT$ 3958.18</em>
                            <i></i>
                        </div>
                        <div className="actions">
                            <button className="btn">{ UPEX.lang.template('充值') }</button>
                            <button className="btn">{ UPEX.lang.template('提现') }</button>
                        </div>
                    </div>
                    <div className="assets-record">
                        <button className="btn">{ UPEX.lang.template('数位资产记录') }</button>
                        <button className="btn">{ UPEX.lang.template('法币资金记录') }</button>
                    </div>
				</div>
			</div>
		)
	}
}

export default InfoView;