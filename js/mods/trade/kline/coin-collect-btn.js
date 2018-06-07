import React, { Component } from 'react';
import {Icon} from 'antd'

export default class CoinCollectBtn extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {val, set, clickCb} = this.props
        let selected = set.indexOf([val.baseCurrencyId, val.currencyId].join('--')) !== -1
        return (
            <Icon type={selected ? 'star' : 'star-o'} onClick={(e) => {
                clickCb(val, selected)
            }} />
        )
    }
}
