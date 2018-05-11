/**
 * @fileoverview 币种信息
 * @author 陈立英
 * @date 2018-05-010
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@inject('tradeStore')
@observer
class CurrentChartInfo extends Component {    
    render() {
    	let store = this.props.tradeStore;
        
        return (
            <div className="trade-current-iframe">
                <iframe src="https://plugin.bimao.com/chaoex/#12lian_btccode-light" frameBorder="0" width="100%" height="88%"></iframe>
            </div>
        );
    }
}

export default CurrentChartInfo;