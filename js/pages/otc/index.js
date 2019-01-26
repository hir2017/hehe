/**
 * @fileoverview OTC 主页
 */
import React, { Component } from 'react';
import Form from './form';
import { Button } from 'antd';
import BgAnimation from '@/lib/constellation/BgAnimation';


function getBgAnimationProps() {
    try {
        return window.innerWidth < 500 ? {max_particles: 50, maxdistance: 20} : {};
    } catch (e) {
        return {max_particles: 50, maxdistance: 20};
    }
}

class View extends Component {
    constructor(props) {
        super(props);
    }

    scrollTo() {}

    render() {
        return (
            <div className="otc main">
                <BgAnimation  {...getBgAnimationProps()} />
                <div className="inner">
                    <div className="apply">
                        <p className="title">{UPEX.lang.template('大宗交易平台')}</p>
                        <p className="sub" dangerouslySetInnerHTML={{__html: UPEX.lang.template('7*24小时不间断提供大宗交易个性化服务')}}></p>
                        <Button onClick={this.scrollTo}>{UPEX.lang.template('与Infinitex交易')}</Button>
                    </div>
                    <div className="feature">
                        <ul className="list">
                            <li className="item">
                                <div className="img"></div>
                                <h4>{UPEX.lang.template('OTC-多法币数字币选择')}</h4>
                                <p>
                                    {UPEX.lang.template(
                                        'OTC-通过Infinitex客户渠道，我们支持一系列数字币和本地法币，包括并不仅限于BTC, ETH, AUD, USD，未来会有更多'
                                    )}
                                </p>
                            </li>
                            <li className="item">
                                <div className="img"></div>
                                <h4>{UPEX.lang.template('OTC-合规性')}</h4>
                                <p>{UPEX.lang.template('OTC-平台作为Austrac，AFCA和ADCA的成员，完全符合KYC/AML标准')}</p>
                            </li>
                            <li className="item">
                                <div className="img"></div>
                                <h4>{UPEX.lang.template('OTC-高流动性')}</h4>
                                <p>{UPEX.lang.template('OTC-除平台内部交易，我们与多家合作方有稳定长期合作，提供充足的资产流动性')}</p>
                            </li>
                            <li className="item">
                                <div className="img"></div>
                                <h4>{UPEX.lang.template('OTC-算法交易')}</h4>
                                <p>
                                    {UPEX.lang.template(
                                        'OTC-基于我们的多种算法交易，包括TWAP, Snipper, Gorillar等算法，大多数交易将以连续稳定的价格在1-2天内成交'
                                    )}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <Form />
                </div>
            </div>
        );
    }
}

export default View;
