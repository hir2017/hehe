import '@/../css/activity/landingpage-aus-eth-airdrop.less';

/**
 * @fileoverview ETH空投活动
 * @author 李海洋
 * @date 2018-12-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'antd';
import { Link } from 'react-router';

@observer
class PageView extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);

        let config = {
            symbolname: UPEX.lang.template('landpage_eth_data_symbolname')
        };

        this.state = {
            symbolname: config.symbolname,
            symbol: config.symbol,
            count: config.count,
            winnerList: []
        };
        let originArr = ['https://stage-h5.infinitex.com.au', 'https://h5.infinitex.com.au'];
        this.winnerOrgin = UPEX.config.host.indexOf('stage.infinitex.com') !== -1 ? originArr[0] : originArr[1];
        this.winnerUrl = this.winnerOrgin + '/h5ex/aus-static-data/landpage-eth-winners/index.html';
        this.winnerWin = null;
    }

    componentDidMount() {
        window.addEventListener('message', this.listenMessage, false);
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.listenMessage);
    }

    listenMessage = event => {
        var origin = event.origin || event.originalEvent.origin;
        if (origin === this.winnerOrgin) {
            let _list = [];
            try {
                _list = JSON.parse(event.data);
            } catch (error) {
                console.error('winner message error', error);
            }
            this.setState({
                winnerList: _list
            });
        }
    };

    render() {
        let { symbolname, winnerList } = this.state;

        return (
            <div className="landpage-eth-airdrop">
                <div className="banner-module">
                    <div className="content-wrap">
                        <h2>
                            <p> {UPEX.lang.template('landpage_eth ETHEREUM AIRDROP')} </p>
                        </h2>
                        <div
                            className="text"
                            dangerouslySetInnerHTML={{
                                __html: UPEX.lang.template('<p> Daily Draws </p>Up to <b>60 {symbol}</b> to be Given Away', { symbol: symbolname })
                            }}
                        />
                        <h3>{UPEX.lang.template('Terms & Conditions apply')}</h3>
                        <div className="button">
                            <Link to="/register">{UPEX.lang.template('GET NOW')}</Link>
                        </div>
                        <div className="content-image" />
                    </div>
                </div>
                <div className="steps-module">
                    <div className="content-wrap">
                        <h2>{UPEX.lang.template('HOW TO GET YOUR FREE {symbol}', { symbol: symbolname })}</h2>
                        <Row>
                            <Col span={8} className="step">
                                <h3>
                                    <span>{UPEX.lang.template('Sign up for a new account')}</span>
                                </h3>
                                <p>
                                    <a href="/register" target="_blank">
                                        https://www.infinitex.com.au/register
                                    </a>
                                </p>
                            </Col>
                            <Col span={8} className="step">
                                <h3>
                                    <span>{UPEX.lang.template('Get ID verification in your account')}</span>
                                </h3>
                            </Col>
                            <Col span={8} className="step">
                                <h3>
                                    <span>{UPEX.lang.template('Deposit a minimum value of 50 AUD or more in your account.')}</span>
                                </h3>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="intro-module">
                    <div className="content-wrap">
                        <h2>{UPEX.lang.template('{symbol} AIRDROP-LUCKY DRAW', { symbol: symbolname })}</h2>
                        <section>
                            <header>{UPEX.lang.template('Rules:')}</header>
                            <article>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: UPEX.lang.template('- 20 lucky users who complete the three steps will be chosen at random every day')
                                    }}
                                />
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: UPEX.lang.template(
                                            '- After the draws have been conducted, our winners will have their rewards deposited into their account every Friday.'
                                        )
                                    }}
                                />
                            </article>
                            <header>{UPEX.lang.template('Key Dates:')}</header>
                            <article className="key">
                                <p dangerouslySetInnerHTML={{ __html: UPEX.lang.template('- Draw dates (0.1 ETH) : 20/12/2018 – 8/01/2019') }} />
                                <ul>
                                    <li
                                        dangerouslySetInnerHTML={{
                                            __html: UPEX.lang.template(
                                                '· Every day starting from the 20th Dec 2018, 20 users will have the opportunity to get 0.1 ETH. Draws will be conducted over the event period of 30 days.'
                                            )
                                        }}
                                    />
                                    <li dangerouslySetInnerHTML={{ __html: UPEX.lang.template('· 599 lucky users will get 0.1 ETH.') }} />
                                </ul>
                                <p dangerouslySetInnerHTML={{ __html: UPEX.lang.template('- Final Draw Date ( 10 ETH) :  8/01/2019') }} />
                                <ul>
                                    <li
                                        dangerouslySetInnerHTML={{
                                            __html: UPEX.lang.template('Only one user will have the opportunity to get  10 ETH in the final day.')
                                        }}
                                    />
                                </ul>
                            </article>
                            <Link to="/register">{UPEX.lang.template('GET NOW')}</Link>
                        </section>
                        <div className="content-image" />
                    </div>
                </div>
                <div className="winner-module">
                    <div className="module-inner">
                        <iframe src={this.winnerUrl} frameBorder="0" />
                        <div className="content-wrap">
                            <h2>{UPEX.lang.template('Lucky Draw Winners')}</h2>
                            <section className="list">
                                <ul>
                                    {winnerList.map((item, i) => {
                                        return (
                                            <li className="item" key={i}>
                                                {UPEX.lang.template('{name} got a lucky draw of {count} {symbol}', {
                                                    name: item.name,
                                                    count: item.count,
                                                    symbol: symbolname
                                                })}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageView;
