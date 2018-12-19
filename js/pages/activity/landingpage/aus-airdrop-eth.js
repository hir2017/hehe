import '@/../css/activity/landingpage-aus-eth-airdrop.less';

/**
 * @fileoverview ETH空投活动
 * @author 李海洋
 * @date 2018-12-19
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Row, Col } from 'antd';
import { Link } from 'react-router';

@observer
class PageView extends Component {
	static defaultProps = {

	}

    constructor(props){
    	super(props);

    	let config = {
    		startTime: UPEX.lang.template('landpage_data_startTime'),
    		endTime: UPEX.lang.template('landpage_data_endTime'),
    		symbol: UPEX.lang.template('landpage_data_symbol'),
            symbolname: UPEX.lang.template('landpage_data_symbolname'),
    		count: UPEX.lang.template('landpage_data_count'),
    		count1: UPEX.lang.template('landpage_data_count1'),
    		count2: UPEX.lang.template('landpage_data_count2'),
    		count3: UPEX.lang.template('landpage_data_count3'),
    	}

    	this.state = {
    		startTime: config.startTime,
    		endTime: config.endTime,
            symbolname: config.symbolname,
    		symbol: config.symbol,
    		count: config.count,
    		count1: config.count1,
    		count2: config.count2,
    		count3: config.count3,
    	}
    }

   	componentDidMount() {
    //    var ua = navigator.userAgent;
    //    let pl = /(iPhone|iPad|iPod|iOS)/i.test(ua) ? "ios": /[aA]ndroid/i.test(ua)  ? "android" : "pc";

    //    if (pl == 'ios' || pl == 'android') {
    //         location.replace('https://h5.infinitex.com.au/h5ex/ausbitcoin/index.html');
    //    }
    }






    render() {
    	let { count, symbol , symbolname, bonus, startTime , endTime, count1, count2, count3} = this.state;

        return (
          	<div className="landpage-eth-airdrop">
                <div className="banner-module">
                	<div className="content-wrap">
                		<h2 dangerouslySetInnerHTML={{__html: UPEX.lang.template('<p> ETHEREUM AIRDROP </p>')}} />
                		<div className="text" dangerouslySetInnerHTML={{__html: UPEX.lang.template('<p> Daily Draws </p>Up to <b>{count} {symbol}</b> to be Given Away', { count, symbol: symbolname}) }}></div>
                		<h3>{UPEX.lang.template('Terms & Conditions apply')}</h3>
                		<div className="button"><Link to="/register">{UPEX.lang.template('GET NOW')}</Link></div>
                		<div className="content-image"></div>
                	</div>
                </div>
                <div className="steps-module">
                	<div className="content-wrap">
                		<h2>{UPEX.lang.template('HOW TO GET YOUR FREE {symbol}', { symbol : symbolname})}</h2>
                        <Row>
                            <Col span={8} className="step">
                                <h3><span>{UPEX.lang.template('Sign up for a new account')}</span></h3>
                                <p dangerouslySetInnerHTML={{ __html : UPEX.lang.template('<a href="/register" target="_blank">https://www.infinitex.com.au/register</a>') }}></p>
                            </Col>
                            <Col span={8} className="step">
                                <h3><span>{UPEX.lang.template('Get ID verification in your account')}</span></h3>
                            </Col>
                            <Col span={8} className="step">
                                <h3><span>{UPEX.lang.template('Deposit a minimum value of 50 AUD or more in your account.')}</span></h3>
                            </Col>
                        </Row>
                	</div>
                </div>
                <div className="intro-module">
                    <div className="content-wrap">
                        <h2>{UPEX.lang.template('{symbol} AIRDROP-LUCKY DRAW', { symbol : symbolname})}</h2>
                        <section>
                            <header>{UPEX.lang.template('Rules:')}</header>
                            <article>
                                <p>
                                    {UPEX.lang.template('- 20 lucky users who complete the three steps will be chosen at random every day')}
                                </p>
                                <p>
                                    {UPEX.lang.template('- After the draws have been conducted, our winners will have their rewards deposited into their account every Friday.')}
                                </p>
                            </article>
                            <header>{UPEX.lang.template('Key Dates:')}</header>
                            <article className="Key">
                                <p>
                                   {UPEX.lang.template('- Draw dates (0.1 ETH) : 20/12/2018 – 8/01/2019')}
                                </p>
                                <ul>
                                    <li>{UPEX.lang.template('· Every day starting from the 20th Dec 2018, 20 users will have the opportunity to get 0.1 ETH. Draws will be conducted over the event period of 30 days.')}</li>
                                    <li>
                                        {UPEX.lang.template('· 599 lucky users will get 0.1 ETH.')}
                                    </li>
                                </ul>
                                <p>
                                   {UPEX.lang.template('- Final Draw Date ( 10 ETH) :  8/01/2019')}
                                </p>
                                <ul>
                                    <li>{UPEX.lang.template('Only one user will have the opportunity to get  10 ETH in the final day.')}</li>
                                </ul>
                            </article>
                            <Link to="/register">{UPEX.lang.template('GET NOW')}</Link>
                        </section>
                        <div className="content-image"></div>
                    </div>
                </div>
                <div className="winner-module">
                    <div className="content-wrap">
                        <h2>{UPEX.lang.template('Lucky Draw Winners')}</h2>
                        <section>

                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageView;
