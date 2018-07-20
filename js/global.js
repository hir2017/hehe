/**
 * 全局模块
 */
import Cache from './lib/cache';
import Events from './lib/events';
import Url from './lib/url';
import lang from './lang';

let win = window;
let ua = navigator.userAgent;

// 支持的网站语言
const slangs = {
    // 网站语言是按照list的顺序展示的
    list: ['zh-CN', 'zh-TW', 'en-US'],
    cfg: {
        "zh-CN": {
            option: '简体中文',
            text: '简体中文'
        },
        "zh-TW": {
            option: '繁體中文',
            text: '繁體中文',
        },
        "zh-HK": {
            option: '繁體中文(香港)&lrm;',
            text: '繁體中文(香港)'
        },
        "en-US": {
            option: 'English',
            text: 'English'
        },
        "vi-VN": {
            option: 'Tiếng Việt',
            text: 'Tiếng Việt'
        },
        'ja-JP': {
            option: '日本語',
            text: '日本語'
        },
        "ko-KR": {
            option: '한국어',
            text: '한국어'
        },
        'ms-MY': {
            option: "Bahasa Melayu",
            text: "Bahasa Melayu"
        }
    }
}
/**
 * 缓存对象
 */
const cache = new Cache({
    prefix: 'primex'
});

/**
 * 浏览器系统语言
 */
const SYSTEM_LANGUAGE = (function() {
    let systemLanguage = navigator.language || navigator.browserLanguage;

    let _systemLanguage = systemLanguage.toLowerCase();

    // 处理一些不规范的浏览器系统语言
    switch (_systemLanguage) {
        case 'ar':
            systemLanguage = 'ar-EG';
            break;
        case 'vi':
            systemLanguage = 'vi-VN';
            break;
        case 'en':
            systemLanguage = 'en-US';
            break;
        case 'ja':
            systemLanguage = 'ja-JP';
            break;
        case 'zh':
            systemLanguage = 'zh-CN';
            break;
        case 'ko':
            systemLanguage = 'ko-KR';
            break;
        default: // 无default
            break;
    }

    let arr = systemLanguage.split('-');

    if (arr.length > 1) {
        systemLanguage = arr[0] + '-' + arr[1].toUpperCase();
    } else {
        systemLanguage = 'en-US';
    }

    return systemLanguage;
})();
/**
 * 网站默认语言
 */
const SITE_LANGUAGE = (function() {
    // 用于处理默认网站语言码 => zh-TW
    const tws = ['zh-SG', 'zh-MO', 'zh-TW'];
    // 用于处理默认网站语言码 => ar-EG
    const ars = ['ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-OM', 'ar-QA', 'ar-SA', 'ar-SY', 'ar-TN', 'ar-YE'];

    const systemLanguage = SYSTEM_LANGUAGE;

    let lang = cache.getCache('lang');

    if (!lang) {
        if (slangs.list.indexOf(systemLanguage) > -1) {
            lang = systemLanguage;
        } else if (tws.indexOf(systemLanguage) > -1) {
            lang = 'zh-TW';
        } else if (ars.indexOf(systemLanguage) > -1) {
            lang = 'ar-EG';
        } else {
            lang = 'en-US';
        }
    }

    return lang;
})();

const baseCurrencyEn = 'TWD';
const symbols = {
    'TWD': 'NT$',
    'CNY': '￥',
    'USD': '$'
}
const baseCurrencySymbol = symbols[baseCurrencyEn];
const initEnv = Url.query('env');

var PROTOCOL = (function() {
    // if (initEnv == 'pro') {
    //     return 'https:';
    // }
    // if (location.protocol === 'https:') {
    //     return 'https:';
    // } else {
    //     return 'http:';
    // }
    return 'https:';
})();

var SOCKET_PROTOCOL = (function() {
    // if (initEnv == 'pro') {
    //     return 'wss:';
    // }
    // if (location.protocol === 'https:') {
    //     return 'wss:';
    // } else {
    //     return 'ws:';
    // }
    return 'wss:';
})();


const origin = (function() {
    let origin;

    let hostname = location.hostname;

    switch (hostname) {
        case 'stage.ace.io':
        case 'dev.ace.io':
            origin = hostname;
            break;
        case 'pre.ace.io':
            origin = 'pre.ace.io';
            break;
        default:
            origin = 'dev.ace.io';
    }

    switch (initEnv) {
        case 'dev':
            // 开发环境
            origin = 'dev.ace.io';
            break;
        case 'stage':
            // 测试环境
            origin = 'stage.ace.io';
            break;
        case 'pro':
            origin = 'pre.ace.io';
            break;
        default:
            origin = origin || hostname;
    }

    return origin;
})();


const origin_ws = (function() {
    let origin;

    let hostname = location.hostname;

    switch (hostname) {
        case 'stage.ace.io':
        case 'dev.ace.io':
            origin = hostname;
            break;
        case 'pre.ace.io':
            origin = 'process.ace.io';
            break;
        default:
            origin = 'dev.ace.io';
    }

    switch (initEnv) {
        case 'dev':
            // 开发环境
            origin = 'dev.ace.io';
            break;
        case 'stage':
            // 测试环境
            origin = 'stage.ace.io';
            break;
        case 'pro':
            origin = 'process.ace.io';
            break;
        default:
            origin = origin || hostname;
    }

    return origin;
})();

const host = PROTOCOL + '//' + origin + '/polarisex';
const uploadHost = host + '/upload/upload';
const uploadImgHost = host + '/user/uploadImageSingle';
const websocketHost = SOCKET_PROTOCOL + '//' + origin_ws + '/';
const imgHost = PROTOCOL + '//' + origin + '/img';

const pageLink = {
    // 个人中心
    user: '/user',
    userBindCard: '/user/bankInfo',
    userAuth: '/user/authentication',
    userSetTradePwd: '/user/settingTraddingPassword',
    userBindPhone: '/user/setting-phone',
    userBindEmail: '/user/settingEmail',
    userFeedBack: '/user/question',
    userFeedBackList: '/user/questionList',
    // PageFooter 帮助中心 help
    helpAboutAce: '',
    helpOurTeam: '',
    helpInvestorRelations: '',
    helpCenter: '',
    helpFees: '',
    helpContactus: '',
    // PageFooter 用户协议 Agreement
    AgreementPrivacy: '',
    AgreementUserItem: '',
    AgreementRisk: '',
    // 上币申请
    coinApply: '',
    // 客户端下载
    clientDownloads: '',
    // 交易
    trade: 'webtrade',
    // 充值提现
    fundRecharge: '/account/balance/recharge',
    fundWithdraw: '/account/balance/withdraw',
}

const config = {
    baseCurrencyEn,
    baseCurrencySymbol,
    defaultLanguage: SITE_LANGUAGE, // 网站语言
    systemLanguage: SYSTEM_LANGUAGE, // 浏览器系统语言
    isEdge: /Edge/i.test(ua), // 12+
    isIE: /(MSIE|Trident|Edge)/.test(ua),
    isFireFox: /(Firefox)/.test(ua),
    isSafari: /^((?!chrome|android).)*safari/i.test(ua),
    isChrome: /Chrome/.test(ua),
    // 邮箱正则表达式
    emailReg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    // 密码正则表达式，登录密码：8~16位
    pwdReg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d\S]{8,16}$/,
    // 手机号正则表达式
    phoneReg: /^1[3|4|5|7|8]\d{9}$/,
    salt: 'dig?F*ckDang5PaSsWOrd&%(polarisex0160630).',
    // 资金密码加盐
    dealSalt: 'dig?F*ckDa2g5PaSsWOrd&%(POLARISEX0160630).',
    // websocket域名
    websocketHost,
    uploadHost,
    uploadImgHost,
    host,
    symbols,
    imgHost,
}

/**
 * 全局 UPEX 命名空间
 */
win.UPEX = Object.assign({
    cache,
    config,
    lang,
    /**
     * 网站支持的语言列表
     */
    languages: slangs,
    /**
     * 全局配置
     */
    setConfig(cfg) {
        this.config = Object.assign(this.config, cfg);
    }
}, Events);
