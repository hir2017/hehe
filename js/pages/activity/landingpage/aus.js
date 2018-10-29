import '../../../../css/activity/landingpage.less';
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
    		count: UPEX.lang.template('landpage_data_count'), 
    		count1: UPEX.lang.template('landpage_data_count1'), 
    		count2: UPEX.lang.template('landpage_data_count2'), 
    		count3: UPEX.lang.template('landpage_data_count3'), 
    	}

    	this.state = {
    		startTime: config.startTime,
    		endTime: config.endTime,
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
    	let { count, symbol , bonus, startTime , endTime, count1, count2, count3} = this.state;
        
        return (
          	<div className="landpage">
                <div className="banner-module">
                	<div className="content-wrap">
                		<h2 dangerouslySetInnerHTML={{__html: UPEX.lang.template('您有{count}{symbol}等待领取', { count, symbol}, 1) }}></h2>
                		<h3>{UPEX.lang.template('有效期至 {endTime}', { endTime})}</h3>
                		<div className="button"><Link to="/register">{UPEX.lang.template('立即领取')}</Link></div>
                		<div className="content-image"></div>
                	</div>
                </div>
                <div className="intro-module">
                	<div className="content-wrap">
                		<h2>{UPEX.lang.template('INFINITE Exchange “感恩大回馈”')}</h2>
                		<h3>— {UPEX.lang.template('{count}{symbol}免费送！', { count, symbol})}</h3>
                		<dl>
                			<dd>
                				<label>{UPEX.lang.template('新用户专享')}: </label>
                				<span className="txt">{UPEX.lang.template('免费赠送{count}{symbol}！', { count, symbol})}</span>
                			</dd>
                			<dd>
                				<label>{UPEX.lang.template('活动时间')}: </label>
                				<span className="txt">{` ${startTime} ~ ${endTime} (GMT+11)`}</span>
                			</dd>
                			<dd className="rule">
                				<label>{UPEX.lang.template('活动规则')}: </label>
                				<span className="txt" dangerouslySetInnerHTML={{__html: UPEX.lang.template('活动规则内容', { count1, count2, count3 , symbol })}}></span>
                			</dd>
                			<dd>
                				<div className="minitip">{UPEX.lang.template('>> 获得的{symbol}将会在活动结束后30个工作日内进行发放', {symbol})}</div>
                			</dd>
                			<dd>
                				<div className="minitip">{UPEX.lang.template('>> INFINITE Exchange拥有活动的最终解释权')}</div>
                			</dd>
                			<dd>
                				<div className="minitip">{UPEX.lang.template('>> 只有新用户可参与活动。')}</div>
                			</dd>
                		</dl>
                		<div className="content-image"></div>
                	</div>
                	<div className="intro-tip">{UPEX.lang.template('另外，我们还会进行线下抽奖活动。那时，所有获奖的完成身份认证的幸运用户，每人也将获得{count}{symbol}，并且，抽奖活动将在INFINITE Exchange官方Youtube进行直播。', { count, symbol})}</div>
                </div>
                <div className="steps-module">
                	<div className="content-wrap">
                		<h2>{UPEX.lang.template('只需两步，轻松获得{symbol}', { symbol})}</h2>
                        <div className="step1">
                            <h3><span>{UPEX.lang.template('注册新账户')}</span></h3>
                            <p dangerouslySetInnerHTML={{ __html : UPEX.lang.template('打开https://www.infinitex.com.au/register，进行账号注册。') }}></p>
                        </div>
                        <div className="step2">
                            <h3><span>{UPEX.lang.template('进行身份认证')}</span></h3>
                            <p dangerouslySetInnerHTML={{ __html : UPEX.lang.template('在INFINITE Exchange官网中的个人中心或手机app的个人中心进行身份认证。') }}></p>
                        </div>
                	</div>
                </div>
                <div className="steps-tip"> 
                    <div className="content-wrap">
                        <ul>
                            <li>{UPEX.lang.template('在完成身份认证后，您已完成了领取{symbol}的所有条件。接下来只需耐心等待揭晓结果。活动的结果将会在活动结束日期-感恩节进行揭晓。', { symbol})}</li>
                            <li>{UPEX.lang.template('在结果揭晓后，您可以在INFINITE Exchange官网-个人中心-活动-KYC奖励中查看活动结果，并时刻关注网站动态。活动奖励将会在11.22-12.25发放，届时请前往INFINITE Exchange官网领取奖励，未在规定时间内领取的，奖励将被作废。发放时间以具体发放时间为准。')}</li>
                        </ul>
                        <Link to="/register">{UPEX.lang.template('我要领取{symbol}', {symbol})}</Link>
                    </div>
                </div>
                <div className="download-module" ref="download">
                    <div className="content-wrap">
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
                        <h3>{UPEX.lang.template('澳洲最权威的数字货币交易平台')}</h3>
                        <Features/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageView;