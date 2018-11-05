import Url from './lib/url';

let config = {};

config.version = "ace";
config.sitename = 'ACE';
config.languages = ['zh-TW', 'en-US']; // 网站支持的语言列表
config.initLanguage = 'zh-TW'; // 默认语言
config.logourl = require('../images/ace_web_logo.png');
config.logoprourl = require('../images/logo-pro.png');
config.csurls = {
    telegram: 'https://t.me/ACEexchange',
    facebook: 'https://www.facebook.com/ace.exchange.tw/',
    twitter: 'https://twitter.com/ACE_exchange',
    linkedin: '',
    youtube: 'https://www.youtube.com/channel/UCaYhE6pnHgqZn2XvCraiHuQ?disable_polymer=true',
    whatapp: '',
    medium:'https://medium.com/ace-exchange',
    line: '',
};
// pdf文档链接
config.docUrls = {
    InfinitexDigitalCurrencyTransferAgreements: 'https://helpcenter.ace.io/hc/zh-tw/articles/360018785411-%E5%AE%A2%E6%88%B6%E5%85%A5%E5%B8%B3%E8%81%B2%E6%98%8E%E6%9B%B8',
    riskDisclosure: '/static/docs/ace/風險揭露及免責聲明.pdf',
    privacyPolicy: '/static/docs/ace/隱私權政策.pdf',
    kycPolicy: '/static/docs/ace/使用者條款.pdf',
    userAgreement: '/static/docs/ace/使用者條款.pdf',
    applyCurrency: '/static/docs/ace/ACE上幣申請.pdf',
}




config.baseCurrencyEn = 'TWD';
config.baseCurrencySymbol = 'NT$';

const protocol = 'https:';
const socket_protocol = 'wss:';

const website = ['dev.ace.io', 'stage.ace.io', 'pre.ace.io', 'www.ace.io']; // 网站域名 0:dev, 1: stage; 2:线上
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
        case 'dev':
            // 开发环境
            origin = website[0];
            break;
        case 'stage':
            // 测试环境
            origin = website[1];
            break;
        case 'pro':
            origin = website[2];
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
        case 'dev':
            // 开发环境
            origin = website[0];
            break;
        case 'stage':
            // 测试环境
            origin = website[1];
            break;
        case 'pro':
            origin = website[2].replace('pre', 'process');
            break;
        default:
            origin = origin || hostname;
    }

    if(['pre.ace.io', 'www.ace.io'].indexOf(origin) !== -1) {
        origin = origin.replace('pre', 'process');
        origin = origin.replace('www', 'process');
    }

    return origin;
})();

config.origin = protocol + '//' + origin_java;
config.host = protocol + '//' + origin_java + '/polarisex';
config.websocketHost = socket_protocol + '//' + origin_ws + '/';
config.uploadImgHost = config.host + '/upload/uploadImg';
config.imgHost = protocol + '//' + origin_java + '/img';

// ga 统计
config.gtagId = 'UA-128599443-1';

window.$config = config;
