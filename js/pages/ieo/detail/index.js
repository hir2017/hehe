/**
 * @fileoverview IEO 详情页
 */
import React, { Component } from 'react';
import {getSingleIEOInfo} from '@/api/http';
import CoinInfo from './coin-info';
import TokenInfo from './token-info';
import TimeUtil from '@/lib/util/date';

class Page extends Component {
    constructor(props) {
        super(props);
        const {params} = props;
        this.ieoId = params.id;
        this.state = {
            ieoInfo: {}
        };
    }

    formatData(data) {
        data._beginTime = TimeUtil.formatDate(data.beginTime);
        data._endTime = TimeUtil.formatDate(data.endTime);
        data._beginTimeStamp = data.beginTime / 1000;
        data._endTimeStamp = data.endTime / 1000;
        data._systemTimeStamp = data.systemTime / 1000;
        data._percent = data.raisedAmount / data.totalCirculation;
        return data;
    }

    // 获取数据信息
    getData() {
        getSingleIEOInfo({
            ieoId: this.ieoId
        }).then(res => {
            if(res.status === 200) {
                this.setState({
                    ieoInfo: this.formatData(res.attachment)
                })
            }
        })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const {ieoInfo} = this.state;
        return (
            <div className="ieo-wrapper detail">
                <CoinInfo data={ieoInfo}/>
                <TokenInfo data={ieoInfo}/>
            </div>
        );
    }
}

export default Page;
