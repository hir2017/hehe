import Url from './lib/url';

let config = {};

config.version="infinitex";
config.sitename = 'infinitex';
config.languages = ['zh-CN','en-US']; // 网站支持的语言列表
config.initLanguage = 'en-US'; // 默认语言
config.logourl = require('../images/aus/infinitex-logo.png');
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