import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Slider } from 'antd';

@observer
class TradeForm extends Component{
	render(){
		return (
			<div className="trade-form">
				<div className="trade-form-hd">
					<div className="trade-form-l">
						<label>{UPEX.lang.template('可用')}</label>
						<em>1.000000000000</em>
						<label>TWD</label>
						<div className="recharge">{UPEX.lang.template('充币')}</div>
					</div>
					<div className="trade-form-r">
						<div>
							<label>{UPEX.lang.template('可用')}</label>
							<em>1.000000000000</em>
							<label>BTC</label>
							<div className="recharge">{UPEX.lang.template('充币')}</div>
						</div>
					</div>
				</div>
				<div className="trade-form-bd">
					<div className="trade-form-l">
						<div>
							<ul>
								<li>
									<label>{UPEX.lang.template('最佳买价')}</label>
									<em>290,000.0000(TWD)</em>
								</li>
								<li>
									<label>{UPEX.lang.template('买入价')}</label>
									<div className="input-box">
										<input
											type="number"
											min="0"
											value={222}
										/>
										<i>TWD</i>
									</div>
								</li>
								<li>
									<label>{UPEX.lang.template('买入量')}</label>
									<div className="input-box">
										<input
											type="number"
											min="0"
											value={222}
										/>
										<i>BTC</i>
									</div>
								</li>
								<li>
									<Slider 
									 	defaultValue={0} 
									 	tipFormatter={null}
			                            value={100}
			                        />
								</li>
								<li>
									<div className="input-box">
										<input
											type="number"
											min="0"
											placeholder={UPEX.lang.template('输入交易密码')}
										/>
									</div>
								</li>
								<li>
									<label>{UPEX.lang.template('手续费')}</label>
									<em>290,000.0000(TWD)</em>
								</li>
								<li>
									<label>{UPEX.lang.template('金额')}</label>
									<em>290,000.0000(TWD)</em>
								</li>
								<li>
									<button className="btn buy">{UPEX.lang.template('买入')}</button>
								</li>
							</ul>
						</div>
					</div>
					<div className="trade-form-r">
						<div>
							<ul>
								<li>
									<label>{UPEX.lang.template('最佳卖价')}</label>
									<em>290,000.0000(TWD)</em>
								</li>
								<li>
									<label>{UPEX.lang.template('卖入价')}</label>
									<div className="input-box">
										<input
											type="number"
											min="0"
											value={222}
										/>
										<i>TWD</i>
									</div>
								</li>
								<li>
									<label>{UPEX.lang.template('卖入量')}</label>
									<div className="input-box">
										<input
											type="number"
											min="0"
											value={222}
										/>
										<i>BTC</i>
									</div>
								</li>
								<li>
									<Slider 
									 	defaultValue={0} 
									 	tipFormatter={null}
			                            value={100}
			                        />
								</li>
								<li>
									<div className="input-box">
										<input
											type="number"
											min="0"
											placeholder={UPEX.lang.template('输入交易密码')}
										/>
									</div>
								</li>
								<li>
									<label>{UPEX.lang.template('手续费')}</label>
									<em>290,000.0000(TWD)</em>
								</li>
								<li>
									<label>{UPEX.lang.template('金额')}</label>
									<em>290,000.0000(TWD)</em>
								</li>
								<li>
									<button className="btn sell">{UPEX.lang.template('卖出')}</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default TradeForm;