import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'antd';

@observer
class Features extends Component {
	render() {
		return (
			<div className="features-wrapper">
				<div className="features-box">
					<ul className="clearfix">
						<li>
							<i className="icon-bank"></i>
							<div className="title">{ UPEX.lang.template('独家银行担保交易')}</div>
							<div className="desc">{ UPEX.lang.template('银行担保，安全快捷')}</div>
						</li>
						<li>
							<i className="icon-clock"></i>
							<div className="title">{ UPEX.lang.template('7X24消失委托交易')}</div>
							<div className="desc">{ UPEX.lang.template('随心、省心、放大收益')}</div>
						</li>
						<li>
							<i className="icon-team"></i>
							<div className="title">{ UPEX.lang.template('专业风控团队支撑')}</div>
							<div className="desc">{ UPEX.lang.template('资金安全无忧')}</div>
						</li>
						<li>
							<i className="icon-coin"></i>
							<div className="title">{ UPEX.lang.template('丰富的货币交易')}</div>
							<div className="desc">{ UPEX.lang.template('持续上新，全币种买卖')}</div>
						</li>
					</ul>
					<div className="download-btn  hidden">{ UPEX.lang.template('下载客户端')}</div>
				</div>
			</div>
		);
	}
}

export default Features;