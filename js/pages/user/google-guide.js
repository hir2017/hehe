/**
 * @fileoverview  google 指南
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Carousel, Icon } from 'antd';
import google1 from '../../../images/google1.png';
import google2 from '../../../images/google2.png';
import google3 from '../../../images/google3.png';
import {Link} from 'react-router';

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
            <PageWrapper title={UPEX.lang.template('Google认证指南')}>
                <Carousel ref="carousel">
                    <div className="google-guide-img-box">
                        <img src={google1} />
                        <div>
                            <div className="download">{UPEX.lang.template('下载并安裝Google验证器')}</div>
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
                    <div className="google-guide-img-box last-step">
                        <span onClick={this.previous} className="left">
                            <Icon type="left" />
                        </span>
                        <img src={google3} />
                        <div className="download">
                            {UPEX.lang.template('输入Google验证器上的六位数字获取并输入短信验证码')}
                            <Link to="/user/google" className="link">{UPEX.lang.template('返回Google验证器')}</Link>
                        </div>
                        <span className="right">
                            <Icon type="check" />
                        </span>
                    </div>
                </Carousel>
            </PageWrapper>
        );
    }
}

export default GoogleGuide;
