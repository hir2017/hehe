/**
 * @fileoverview 热门币种信息
 * @author 陈立英
 * @date 2018-04-26
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@observer
class HotMarkets extends Component{
	render() {
		return (
			<div className="hot-markets"></div>
		);
	}
}

export default HotMarkets;