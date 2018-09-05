/**
 * 全局模块
 */
import Cache from './lib/cache';
import Events from './lib/events';
import lang from './lang';

let win = window;
let ua = navigator.userAgent;

// 用于处理默认网站语言码 => zh-TW
const tws = ['zh-SG', 'zh-MO', 'zh-TW'];
// 用于处理默认网站语言码 => ar-EG
const ars = ['ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-OM', 'ar-QA', 'ar-SA', 'ar-SY', 'ar-TN', 'ar-YE'];

let config = {
    sitename: 'exchange',
    languages: ['en-US'],
    baseCurrencyEn: '',
    baseCurrencySymbol: '',
    salt: 'dig?F*ckDang5PaSsWOrd&%(polarisex0160630).',
    dealSalt: 'dig?F*ckDa2g5PaSsWOrd&%(POLARISEX0160630).',
}

if (typeof $config !== 'undefined') {
    config = Object.assign(config, $config);
}
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

const cache = new Cache({
    prefix: config.version
});
/**
 * 网站初始化默认语言
 */
config.defaultLanguage = (function() {

    const systemLanguage = SYSTEM_LANGUAGE;

    let lang = cache.getCache('lang');

    if (!lang) {
        // if (config.languages.indexOf(systemLanguage) > -1) {
        //     lang = systemLanguage;
        // } else {
        //      lang = config.initLanguage;
        // }
        lang = config.initLanguage;
    }

    return lang;
})();
/**
 * 全局 UPEX 命名空间
 */
win.UPEX = Object.assign({
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
    // 国内手机号
    phoneReg: /^1[3|4|5|7|8]\d{9}$/,
    // 数字
    numberReg: /^\d+$/,
    // 汉字
    replaceHZReg: /^[\u4E00-\u9FA5]+$/ig,
    // 字母
    replaceZMReg: /^[A-Za-z]+$/,
    // 非数字
    replaceNaNReg: /[^0-9]/ig,
    languagesMap: {
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
    },
    // 多语言包对象
    lang,
    config,
    cache
}, Events);