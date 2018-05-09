import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'antd';

@observer
class Features extends Component {
	render(){
		return (
			<div className="features-wrapper">
				<ul className="clearfix">
					<li>
						<Icon type="clock-circle-o" style={{ fontSize: 32 }} />
						<div className="title">{ UPEX.lang.template('独家银行担保')}</div>
						<div className="desc">{ UPEX.lang.template('银行担保，安全便捷')}</div>
					</li>
					<li>
						<Icon type="clock-circle-o" style={{ fontSize: 32 }} />
						<div className="title">{ UPEX.lang.template('独家银行担保')}</div>
						<div className="desc">{ UPEX.lang.template('银行担保，安全便捷')}</div>
					</li>
					<li>
						<Icon type="clock-circle-o" style={{ fontSize: 32 }} />
						<div className="title">{ UPEX.lang.template('独家银行担保')}</div>
						<div className="desc">{ UPEX.lang.template('银行担保，安全便捷')}</div>
					</li>
					<li>
						<Icon type="clock-circle-o" style={{ fontSize: 32 }} />
						<div className="title">{ UPEX.lang.template('独家银行担保')}</div>
						<div className="desc">{ UPEX.lang.template('银行担保，安全便捷')}</div>
					</li>
				</ul>
				<div className="download-btn">{ UPEX.lang.template('下载客户端')}</div>
			</div>
		);
	}
}

export default Features;