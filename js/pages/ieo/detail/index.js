/**
 * @fileoverview IEO 详情页
 */
import React, { Component } from 'react';

import CoinInfo from './coin-info';
import TokenInfo from './token-info';
import Allocation from './allocation';

import * as Mock from './mock';

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coin: {}
        };
    }

    // 获取数据信息
    getData() {
        this.setState({
            coin: Mock.coinInfo
        })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const {coin} = this.state;
        return (
            <div className="ieo-wrapper detail">
                <CoinInfo data={coin}/>
                <TokenInfo data={coin}/>
                <Allocation data={coin}/>
            </div>
        );
    }
}

export default Page;
