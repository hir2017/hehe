/**
 * @fileoverview IEO 详情页
 */
import React, {Component} from 'react';
import {message} from 'antd';
import {getSingleIEOInfo} from '@/api/http';
import CoinInfo from './coin-info';
import TokenInfo from './token-info';
import TimeUtil from '@/lib/util/date';

const contentHeight = document.body.clientHeight - 50;

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

    componentDidMount() {
        this.getData();
    }

    formatData(data) {
        data._beginTime = TimeUtil.formatDate(data.beginTime);
        data._endTime = TimeUtil.formatDate(data.endTime);
        data._beginTimeStamp = data.beginTime / 1000;
        data._endTimeStamp = data.endTime / 1000;
        data._systemTimeStamp = data.systemTime / 1000;
        // IEO进度 取整
        let _percent = data.raisedAmount / data.softTop;
        _percent = Math.floor(_percent * 100);
        data._percent = _percent;
        //支持购买的币种字符串加空格处理
        data._buyWay = data.buyWay.replace(/,/i, ', ');
        return data;
    }

    // 获取数据信息
    getData = () => {
        getSingleIEOInfo({
            ieoId: this.ieoId
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    ieoInfo: this.formatData(res.attachment)
                })
            }
            //IEO信息为空或已下线
            if (res.status == 21006 || res.status == 21011) {
                this.setState({
                    showErrorPage: true
                })
            }

        }).catch(err => {
            this.setState({
                showErrorPage: true
            })
            console.error('getSingleIEOInfo', err);
        }).then(res => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const {ieoInfo, loading, showErrorPage} = this.state;
        if (loading) {
            return <div className="ieo-wrapper detail"/>
        }

        if (showErrorPage) {
            return <div className="ieo-wrapper detail" style={{height: `${contentHeight}px`}}>
                <div className="error">
                    {UPEX.lang.template('无此IEO项目')}
                    <a href="/ieo" className="go-other">{UPEX.lang.template('看看其他IEO项目')}</a>
                </div>
            </div>
        }

        return (
            <div className="ieo-wrapper detail">
                <CoinInfo data={ieoInfo} ieoId={this.ieoId} refresh={this.getData}/>
                <TokenInfo data={ieoInfo} ieoId={this.ieoId} refresh={this.getData}/>
            </div>
        );
    }
}

export default Page;
