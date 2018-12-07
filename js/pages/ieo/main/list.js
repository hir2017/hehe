/**
 * @fileoverview IEO 数字币列表
 */
import React, {Component} from 'react';
import {StatusIcon} from "../view";
import CountDown from '../countdown';
import {getIEOList} from '@/api/http';

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

    fetchData() {
        this.setState({
            isFetching: 1
        });

        getIEOList().then(res => {
            if (res.status == 200) {
                this.setState({
                    list: res.attachment.list,
                    isFetching: 0
                })
            }
        }).catch(() => {
            console.log('getIEOList err');
            this.setState({
                isFetching: 0
            })
        })
    }

    getStatusIcon(status) {
        let obj = {};
        switch (status) {
            case 0:
                obj.text = UPEX.lang.template('即将开始');
                obj.className = 'start';
                break;
            case 1:
                obj.text = UPEX.lang.template('进行中');
                obj.className = 'on';
                break;
            case 2:
                obj.text = UPEX.lang.template('已达成');
                obj.className = 'end';
                break;
        }
        return obj;
    };

    render() {
        let $content = null;
        let {isFetching, list} = this.state;
        console.log(isFetching);

        if (list.length > 0) {
            $content = (
                <ul className="token-list">
                    {
                        list.map((item, i) => (
                            <li key={i}>
                                <a className="token-item clearfix" href="">
                                    <div className="token-pic" style={{backgroundImage: `url(${item.logoUrl})`}}>
                                    </div>
                                    <StatusIcon status={item.status}/>
                                    <div className="token-content">
                                        <div className="content-top">
                                            <span className="name">{item.tokenName}</span>
                                            <span
                                                dangerouslySetInnerHTML={{__html: UPEX.lang.template('发行数量:{count}', {count: item.totalCirculation}, 1)}}></span>
                                            <span className="time"
                                                  dangerouslySetInnerHTML={{__html: UPEX.lang.template('抢购结束时间:{time}', {time: item.endTime}, 1)}}></span>
                                        </div>
                                        <div className="content-bottom">
                                            <div className="token-desc">
                                                {item.tokenDesc}
                                            </div>
                                            <div className="progress">
                                                {
                                                    item.status == 1 ? <CountDown remainTime="100000"/> :
                                                        <div>已募集。。。</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            )

        }
        else if (isFetching === 0 && list.length === 0) {
            $content = (<div>{UPEX.lang.template('暂无IEO项目')}</div>);
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


