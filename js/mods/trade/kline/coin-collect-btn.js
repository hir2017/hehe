import React, { Component } from 'react';
import {Icon} from 'antd'

export default class CoinCollectBtn extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {data, selected, clickCb} = this.props

        return (
            <Icon type={selected ? 'star' : 'star-o'} onClick={(e) => {
                clickCb(data, selected)
            }} />
        )
    }
}
