/**
 * 充提币详情
 */
import React, { Component } from 'react';
import TimeUtil from '@/lib/util/date';
import { inject } from 'mobx-react';

@inject('UtilStore')
class SubRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: ''
        };
    }

    componentDidMount() {
        const {data} = this.props;
        console.log('componentDidMount', data)
        if(data.confirms === 'Reject' && data.type === 2) {
            this.props.UtilStore.getRefuseReason(data.refuseStrategyId).then(reason => {
                this.setState({
                    reason
                })
            })
        }
    }

    content() {
        const {data} = this.props;
        if(data.type === 1) {
            return UPEX.lang.template('Txid:{value}', { value: item.txId || '--'});
        } else {
            let result = null;
            if(data.confirms === 'Success') {
                result = UPEX.lang.template('Txid:{value}', { value: item.walletWaterSn || '--'});
            }
            if(data.confirms === 'Reject') {
                result =  UPEX.lang.template('审核拒绝，原因是:{reason}', {reason: this.state.reason || '' });
            }
            return result;
        }
    }

    render() {

        return (
            <div className="detail-content">
                {this.content()}
            </div>
        );
    }
}

export default SubRow;
