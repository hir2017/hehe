/**
 * @fileoverview 币圈资讯
 * @author 陈立英
 * @date 2018-05-05
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'; 

@observer
class BtcNotice extends Component{
	render(){
		return (
			<div className="btcnews-wrapper">
				<h3 className="title">{ UPEX.lang.template('币圈资讯')}</h3>
				<div className="content">
					<div className="pic" style={{ backgroundImage: `url(https://www.chaoex.com/dist/images/26758a19.png)`}}></div>
					<div className="list">
						<ul>
							<li>
								<a href="#" target="_blank">【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。</a>
							</li>
							<li>
								<a href="#" target="_blank">【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。</a>
							</li>
							<li>
								<a href="#" target="_blank">【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。</a>
							</li>
							<li>
								<a href="#" target="_blank">【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。</a>
							</li>
							<li>
								<a href="#" target="_blank">【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。</a>
							</li>
						</ul>
					</div>	
				</div>
			</div>
		);
	}
}

export default BtcNotice;