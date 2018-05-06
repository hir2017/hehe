/**
 * @fileoverview 首页货币行情模块
 * @author 陈立英
 * @date 2018-05-04
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@observer
class HotMarkets extends Component{
	render() {
		return (
			<div className="index-markets"></div>
		);
	}
}

export default HotMarkets;