/**
 * @fileoverview 客户端下载聚合页
 * @author 陈立英
 * @date 2018-05-03
 */
import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import qrcode from '../../lib/qrcode';
import {Carousel} from 'antd';

@observer
class Download extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.insertQrcode();
    }

    insertQrcode() {
        let url = UPEX.lang.template('app下载中转页链接');
        let el = $('.qrcode');
        el.qrcode({
            text: url,
            width: 130,
            height: 130,
            render: "canvas"
        })
    }

    render() {
        let list = [0, 0, 0, 0, 0];

        return (
            <div className="download-wrapper">
                <div className="content clearfix">
                    <div className="left-content">
                        <div className="desc">
                            <span>{UPEX.lang.template('正规且可信')}</span>
                            <span>{UPEX.lang.template('7X24小时委托交易')}</span>
                            <span>{UPEX.lang.template('专业风控团队支撑')}</span>
                            <span>{UPEX.lang.template('丰富的货币交易')}</span>
                        </div>
                        <div className="txt">{UPEX.lang.template('随时随地,快速交易')}</div>
                        <ul className="down-btn">
                            <li className="btn ios">iOS
                                <div className="code-wrap">
                                    <div className="qrcode"></div>
                                    <p>{UPEX.lang.template('扫码下载')}</p>
                                </div>
                            </li>
                            <li className="btn android">Android
                                <div className="code-wrap">
                                    <div className="qrcode"></div>
                                    <p>{UPEX.lang.template('扫码下载')}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="right-content">
                        <div className="phone-wrap">
                            <Carousel autoplay={true} dots={true} effect="fade">
                                {
                                    list.map((item, index) => {
                                        return (
                                            <div className={"slider-item item" + index} key={index}>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                            <div className="phone"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Download;
