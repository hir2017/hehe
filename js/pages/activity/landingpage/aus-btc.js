import '../../../../css/activity/landingpage-btc.less';
/**
 * @fileoverview 邀请返佣活动
 * @author 陈立英
 * @date 2018-10-01
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Popover } from 'antd';
import { Link } from 'react-router';
import Features from '../../../mods/home/features';
import qrcode from '../../../lib/qrcode';

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
       var ua = navigator.userAgent;
       let pl = /(iPhone|iPad|iPod|iOS)/i.test(ua) ? "ios": /[aA]ndroid/i.test(ua)  ? "android" : "pc";

       if (pl == 'ios' || pl == 'android') {
            location.replace('https://h5.infinitex.com.au/h5ex/thanksgiving/index.html');
       }
    }

    onClickGoogle=(e)=>{
        let link = UPEX.lang.template('landpage_android_google');

        if (link) {
            window.open(link);
            window.focus();
        }
    }

    onClickAndroid=(e)=>{
        let link = UPEX.lang.template('landpage_android_apk');

        if (link) {
            location.href = link;
        }
    }

    getGoogleQrcode=(visible)=>{
        let google = $(this.refs.google);

        let link = UPEX.lang.template('landpage_android_google');
        
        if (!visible) {
            return;
        }
        // google
        if (google.data('rendered') == 1) {
            return;
        }
        google.qrcode({
            text: link,
            width: 174,
            height: 174,
            render: "canvas"
        });

        google.data('rendered', 1)
    }

    getApkQrcode=(visible)=>{

        let apk = $(this.refs.apk);
        let link = UPEX.lang.template('landpage_android_apk');
        
        if (!visible) {
            return;
        }

        // apk
        if (apk.data('rendered') == 1) {
            return;
        }
        apk.qrcode({
            text: link,
            width: 174,
            height: 174,
            render: "canvas"
        });
        
        apk.data('rendered', 1)
    }

    render() {
    	let { count, symbol , symbolname, bonus, startTime , endTime, count1, count2, count3} = this.state;
        
        return (
          	<div className="landpage-btc">
                <div className="banner-module">
                	<div className="content-wrap">
                		<h2 dangerouslySetInnerHTML={{__html: UPEX.lang.template('RECEIVE <p> FREE {symbol}</p>When You Register', { count, symbol: symbolname}) }}></h2>
                		<h3>{UPEX.lang.template('Terms & Conditions apply')}</h3>
                		<div className="button"><Link to="/register">{UPEX.lang.template('GET NOW')}</Link></div>
                		<div className="content-image"></div>
                	</div>
                </div>
                <div className="steps-module">
                	<div className="content-wrap">
                		<h2>{UPEX.lang.template('With Two Simple Steps, Get Your Free {symbol}', { symbol : symbolname})}</h2>
                        <div className="step1">
                            <h3><span>{UPEX.lang.template('sign up for a new account')}</span></h3>
                            <p dangerouslySetInnerHTML={{ __html : UPEX.lang.template('Open the link:<a href="/register" target="_blank">https://www.infinitex.com.au/register</a>and sign up for a new account.') }}></p>
                        </div>
                        <div className="step2">
                            <h3><span>{UPEX.lang.template('Get ID verification')}</span></h3>
                            <p dangerouslySetInnerHTML={{ __html : UPEX.lang.template('Get ID verification in "ID verification"in My Profile') }}></p>
                        </div>
                	</div>
                </div>
                <div className="intro-module">
                    <div className="content-wrap">
                         <h2>{UPEX.lang.template('INFINITE Exchange')}</h2>
                         <h2>{UPEX.lang.template('“Grand Opening in Australia”')}</h2>
                        <h3>— {UPEX.lang.template('Free {symbol}  Up for Grabs', { count, symbol: symbolname})}</h3>
                        <dl>
                            <dd>
                                <span className="txt">{UPEX.lang.template('After successfully completing your ID verification process, you are now ready to claim your free')}</span>
                            </dd>
                            <dd>
                                <label>{UPEX.lang.template('Validity')}: </label>
                                <span className="txt">{`${startTime} ~ ${endTime}`}</span>
                            </dd>
                            <dd className="rule">
                                <label>{UPEX.lang.template('Terms and Conditions')}: </label>
                                <span className="txt" dangerouslySetInnerHTML={{__html: UPEX.lang.template('First 100 ID verification registrations will get {count1} {symbol} during the activity@@@@First 101～300 ID verification registrations will get {count2} {symbol} during the activity@@@@First 301~ 1000 ID verification  registrations will get {count3} {symbol} during the activity', { count1, count2, count3 , symbol })}}></span>
                            </dd>
                        </dl>
                        <div className="content-image"></div>
                    </div>
                </div>
                <div className="steps-tip"> 
                    <div className="content-wrap">
                        <div dangerouslySetInnerHTML={{__html: UPEX.lang.template('活动规则内容', { count1, count2, count3 , symbol })}}></div>
                        <Link to="/register">{UPEX.lang.template('COLLECT MY BTC NOW')}</Link>
                    </div>
                </div>
                <div className="download-module" ref="download">
                    <div className="content-wrap">
                        <h2>{UPEX.lang.template('TRACK AND TRACK EASILY WITH US')}</h2>
                        <Popover
                            placement="top"
                            getPopupContainer={()=>this.refs.download}
                            overlayClassName="landpage-qrcode"
                            afterVisibleChange={this.getGoogleQrcode}
                            content={<div ref="google"></div>}
                        >
                            <button className="google" onClick={this.onClickGoogle}><span>Google Play</span></button>
                        </Popover>

                        <Popover
                            placement="top"
                            getPopupContainer={()=>this.refs.download}
                            overlayClassName="landpage-qrcode"
                            afterVisibleChange={this.getApkQrcode}
                            content={<div ref="apk"></div>}
                        >
                            <button className="android" onClick={this.onClickAndroid}><span>Android Apk</span></button>
                        </Popover>
                        <div className="content-image"></div>
                    </div>
                </div>
                <div className="features-module">
                    <div className="content-wrap">
                        <h2>INFINITE Exchange</h2>
                        <h3>{UPEX.lang.template('Inspiring Australians to trade cryptocurrency.')}</h3>
                        <Features/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageView;