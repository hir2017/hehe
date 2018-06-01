/**
 * @fileoverview 热门币种信息
 * @author 陈立英
 * @date 2018-04-26
 * K线图［24小时收盘价格］
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Item from './item';

@observer
class HotMarkets extends Component{
	static defaultProps = {
		list: []
	}

	render() {
		return (
			<div className="hot-markets">
				<ul>
				{
					this.props.list.map((item, index)=>{
						return (
							<li key={index}>
								<Item data={item}/>
							</li>
						)
					})
				}
				</ul>
			</div>
		);
	}
}

export default HotMarkets;