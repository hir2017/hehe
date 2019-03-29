import Url from './lib/url';

let config = {};

config.version = "infinitex";
config.sitename = 'PROEX';
config.languages = ['zh-CN', 'zh-TW', 'en-US']; // 网站支持的语言列表
config.initLanguage = 'en-US'; // 默认语言
// config.logourl = require('../images/aus-tokyo/logo.png');
// config.logoprourl = require('../images/aus-tokyo/logo.png');
config.logourl = require('../images/aus/infinite-logo.png');
config.logoprourl = require('../images/aus/infinite-logo.png');
/*
Telegram:      https://t.me/InfiniteExchangeCommunity
Twitter:          https://twitter.com/Infinit_xchange
Facebook:     https://facebook.com/Infinitex.Exchange
Youtube:        https://youtube.com/channel/UCGckOll6_IT-KVFOMZj7HxQ?view_as=subscriber
Linkedin:        https://linkedin.com/company/infinite-exchange
*/
config.csurls = {
    telegram: 'https://proex.io',
    facebook: 'https://proex.io',
    twitter: 'https://proex.io',
    linkedin: 'https://proex.io',
    youtube: 'https://proex.io',
    whatapp: 'https://proex.io',
    line: '',
};
// pdf文档链接
config.docUrls = {
    InfinitexDigitalCurrencyTransferAgreements: '/static/docs/aus/Infinitex Crypto Currency Deposit & Withdrawal Agreements.pdf',
    userAgreement: '/static/docs/aus/User Agreement.pdf',
    riskDisclosure: '/static/docs/aus/Risk Disclosure & Disclaimer.pdf',
    privacyPolicy: '/static/docs/aus/Privacy Policy.pdf',
    kycPolicy: '/static/docs/aus/KYC & AML & CTF POLICY.pdf',
}

config.baseCurrencyEn = 'AUD';
// 这个是哪来的
config.baseCurrencySymbol = 'AUD';
// 交易中心价格加法币价格提示需求 添加
config.baseCurrencySymbol2 = 'A$';
config.feeDiscountCurrencyEn = 'GTO';
config.feeDiscountCurrencyId = 54;

const protocol = 'https:';
const socket_protocol = 'wss:';

const website = ['www.proex.io'];
const origin_java = (function() {
    let hostname = location.hostname;
    let env = Url.query('env');
    let origin;

    if (website.indexOf(hostname) > -1) {
        origin = ['infinitex.co', 'www.infinitex.co'].indexOf(hostname) !== -1 ? 'www.proex.io' : hostname;
    } else {
        origin = website[0];
    }
    switch (env) {
        case 'stage':
            // 测试环境
            origin = website[0];
            break;
        case 'pro':
            origin = website[1];
            break;
        default:
            origin = origin || hostname;
    }

    return origin;
})();

const origin_ws = (function() {
    let hostname = location.hostname;
    let env = Url.query('env');
    let origin;

    if (website.indexOf(hostname) > -1) {
        // origin = hostname;
        origin = ['infinitex.co', 'www.infinitex.co'].indexOf(hostname) !== -1 ? 'www.proex.io' : hostname;
    } else {
        origin = website[0];
    }

    switch (env) {
        case 'stage':
            // 测试环境
            origin = website[0];
            break;
        case 'pro':
            origin = website[1].replace('pre', 'process');
            break;
        default:
            origin = origin || hostname;
    }

    return origin;
})();

config.origin = protocol + '//' + origin_java;
config.host = protocol + '//' + origin_java + '/polarisex';
config.websocketHost = socket_protocol + '//' + origin_ws + '/';
config.uploadImgHost = config.host + '/upload/uploadImg';
config.imgHost = protocol + '//' + origin_java + '/img';

// ga 统计
config.gtagId = 'UA-127408882-1';

window.$config = config;
