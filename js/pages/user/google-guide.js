/**
 * @fileoverview  google 指南
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Carousel, Icon } from 'antd';
import google1 from '../../../images/google1.png';
import google2 from '../../../images/google2.png';
import google3 from '../../../images/google3.png';

import PageWrapper from '../../common-mods/page-user/page-wrapper';

@observer
class GoogleGuide extends Component {
    constructor() {
        super();
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    previous() {
        this.refs.carousel.prev();
    }

    next() {
        this.refs.carousel.next();
    }

    render() {
        return (
            <PageWrapper title={UPEX.lang.template('google认证指南')}>
                <Carousel ref="carousel">
                    <div className="google-guide-img-box">
                        <img src={google1} />
                        <div>
                            <div className="download">{UPEX.lang.template('下載并安裝Google驗證器')}</div>
                            <div className="download">
                                <a className="download-btn"  target="_blank" href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8">
                                    <Icon type="apple" />ios{UPEX.lang.template('下载')}
                                </a>
                                <a className="download-btn"  target="_blank" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">
                                    <Icon type="android" />
                                    {UPEX.lang.template('安卓下载')}
                                </a>
                            </div>
                        </div>
                        <span onClick={this.next} className="right">
                            <Icon type="right" />
                        </span>
                    </div>
                    <div className="google-guide-img-box">
                        <span onClick={this.previous} className="left">
                            <Icon type="left" />
                        </span>
                        <img src={google2} />
                        <div className="download">{UPEX.lang.template('扫描页面上的二维码，并用纸记录下16位密码，以防丢失恢复使用')}</div>
                        <span onClick={this.next} className="right">
                            <Icon type="right" />
                        </span>
                    </div>
                    <div className="google-guide-img-box">
                        <span onClick={this.previous} className="left">
                            <Icon type="left" />
                        </span>
                        <img src={google3} />
                        <div className="download">{UPEX.lang.template('输入google验证器上的六位数字获取并输入短信验证码')}</div>
                    </div>
                </Carousel>
            </PageWrapper>
        );
    }
}

export default GoogleGuide;
