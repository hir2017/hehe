import Url from './lib/url';

let config = {};

config.version = "infinitex";
config.sitename = 'INFINITEX';
config.languages = ['zh-CN', 'en-US']; // 网站支持的语言列表
config.initLanguage = 'en-US'; // 默认语言
config.logourl = require('../images/aus/infinitex-logo.png');
config.logoprourl = require('../images/aus/infinitex-logo.png');
/*
facebook：https://www.facebook.com/InfiniteX-Exchange-250034108956916/?modal=admin_todo_tour
youtube： https://www.youtube.com/channel/UCC304QtP-XWL3BY8Bf-CnuA
linkedin  https://www.linkedin.com/company/infinitex/
twitter:       https://www.twitter.com/infinitex20
telegram:   https://t.me/infinite_exchange
*/
config.csurls = {
    telegram: 'https://t.me/infinite_exchange',
    facebook: 'https://www.facebook.com/InfiniteX-Exchange-250034108956916/?modal=admin_todo_tour',
    twitter: 'https://www.twitter.com/infinitex20',
    linkedin: 'https://www.linkedin.com/company/infinitex/',
    youtube: 'https://www.youtube.com/channel/UCC304QtP-XWL3BY8Bf-CnuA',
    whatapp: 'https://t.me/infinite_exchange',
    line: '',
};
// pdf文档链接
config.docUrls = {
    InfinitexDigitalCurrencyTransferAgreements: '/static/docs/aus/Infinitex digital currency transfer agreements.pdf',
    riskDisclosure: '/static/docs/aus/Risk Disclosure & Disclaimer.pdf',
    privacyPolicy: '/static/docs/aus/PRIMEX Privacy Policy.pdf',
    kycPolicy: '/static/docs/aus/AML & KYC POLICY.pdf',
}

config.baseCurrencyEn = 'AUD';
config.baseCurrencySymbol = 'AUD';

const protocol = 'https:';
const socket_protocol = 'wss:';

const website = ['stage.infinitex.com.au', 'pre.infinitex.com.au', 'www.infinitex.com.au'];
const origin_java = (function() {
    let hostname = location.hostname;
    let env = Url.query('env');
    let origin;

    if (website.indexOf(hostname) > -1) {
        origin = hostname;
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
        origin = hostname;
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

config.host = protocol + '//' + origin_java + '/polarisex';
config.websocketHost = socket_protocol + '//' + origin_ws + '/';
config.uploadImgHost = config.host + '/upload/uploadQN';
config.imgHost = protocol + '//' + origin_java + '/img';

window.$config = config;
