/**
 * @fileoverview IEO 详情页
 */
import React, {Component} from 'react';
import {message} from 'antd';
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
            loading: true,
            ieoInfo: {},
            showErrorPage: false
        };
    }

    formatData(data) {
        data._beginTime = TimeUtil.formatDate(data.beginTime);
        data._endTime = TimeUtil.formatDate(data.endTime);
        data._beginTimeStamp = data.beginTime / 1000;
        data._endTimeStamp = data.endTime / 1000;
        data._systemTimeStamp = data.systemTime / 1000;
        // IEO进度 取整
        let _percent = data.raisedAmount / data.hardTop;
        _percent = Math.floor(_percent * 100);
        data._percent = _percent;
        return data;
    }

    // 获取数据信息
    getData() {
        return getSingleIEOInfo({
            ieoId: this.ieoId
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    ieoInfo: this.formatData(res.attachment)
                })
            }
            //IEO信息为空
            if (res.status == 21006) {
                this.setState({
                    showErrorPage: true
                })
            }
        }).catch(err => {
            console.error('getSingleIEOInfo', err);
        }).then(res => {
            this.setState({
                loading: false
            })
        })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const {ieoInfo, loading, showErrorPage} = this.state;
        if (loading) {
            return <div className="ieo-wrapper detail"/>
        }

        if (showErrorPage) {
            return <div className="ieo-wrapper detail">{UPEX.lang.template('无此IEO项目')}</div>
        }

        return (
            <div className="ieo-wrapper detail">
                <CoinInfo data={ieoInfo} ieoId={this.ieoId}/>
                <TokenInfo data={ieoInfo} ieoId={this.ieoId}/>
            </div>
        );
    }
}

export default Page;
