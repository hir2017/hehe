/**
 * @fileoverview IEO 数字币列表
 */
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {StatusIcon} from "../view";
import CountDown from '../countdown';
import {getIEOList} from '@/api/http';
import TimeUtil from '@/lib/util/date';
import NumberUtil from '@/lib/util/number';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: 1,
            list: []
        }

    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        this.setState({
            isFetching: 1
        });

        getIEOList().then(res => {
            if (res.status == 200) {
                this.setState({
                    list: res.attachment,
                    isFetching: 0
                })
            }
        }).catch((err) => {
            console.log('getIEOList' + err);
            this.setState({
                isFetching: 0
            })
        })
    }

    toDetail = (item) => {
        browserHistory.push(`/ieo/detail/${item.ieoId}`);
    }

    //字符串隐藏处理
    hideStr = function (string) {
        let newStr = '';

        // if (UPEX.lang.language == 'en-US') {
        //     newStr = string.length > 180 ? string.substring(0, 180) + '...' : string;
        // } else {
        //     newStr = string.length > 80 ? string.substring(0, 80) + '...' : string;
        // }
        newStr = string.length > 80 ? string.substring(0, 80) + '...' : string;
        return newStr;
    };


    render() {
        let $content = null;
        let {isFetching, list} = this.state;

        if (list.length > 0) {

            $content = (
                <ul className="token-list">
                    {
                        list.map((item, i) => (
                            <li key={i} className="token-item clearfix" onClick={this.toDetail.bind(this, item)}>
                                <div className="token-pic" style={{backgroundImage: `url(${item.logoUrl})`}}>
                                </div>
                                <StatusIcon status={item.status}/>
                                <div className="token-content">
                                    <div className="content-top">
                                        <span className="name">{item.tokenName}</span>
                                        <span
                                            dangerouslySetInnerHTML={{__html: UPEX.lang.template('发行数量:{count}', {count: item.totalCirculation}, 1)}}></span>
                                        <span className="time"
                                              dangerouslySetInnerHTML={{__html: UPEX.lang.template('抢购结束时间:{time}', {time: TimeUtil.formatDate(item.endTime)}, 1)}}></span>
                                    </div>
                                    <div className="content-bottom">
                                        <div className="token-desc">
                                            <div className="inner">
                                                {this.hideStr(item.tokenDesc)}
                                            </div>
                                        </div>
                                        <div className="progress">
                                            {
                                                [0, 1].indexOf(item.status) >= 0 ?
                                                    <CountDown order={i + 1}
                                                               startTime={item.beginTime / 1000}
                                                               endTime={item.endTime / 1000}
                                                               serverTime={+new Date() / 1000}
                                                               flag={item.status}
                                                               skin={item.status == 0 ? 'light' : 'dark'}
                                                               showtxt={true}/> :
                                                    (<div className="amount">
                                                        <span className="txt">{UPEX.lang.template('已募集')}</span>
                                                        <span
                                                            className="num">{NumberUtil.separate(item.raisedAmount)}</span>
                                                        <span className="token">{item.tokenName}</span>
                                                    </div>)


                                            }
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            )

        }
        else if (isFetching === 0 && list.length === 0) {
            $content = (<div className="no-data">{UPEX.lang.template('暂无IEO项目')}</div>);
        }

        return (
            <div className="token-list-wrapper">
                {$content}
                {isFetching == 1 ? <div className="mini-loading"></div> : null}
            </div>
        );
    }
}

export default View;


