/**
 * 全局模块
 */
import Cache from './lib/cache';
import Events from './lib/events';
import Url from './lib/url';
import lang from './lang';

let win = window;
let ua = navigator.userAgent;
let IS_INIT = false; // 是否已经初始化

// 支持的网站语言
const slangs = {
    // 网站语言是按照list的顺序展示的
    list: ['zh-CN', 'zh_TW', 'en-US'],
    cfg: {
        "zh-CN": {
            option: '简体中文',
            text: '简体中文'
        },
        "zh_TW": {
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
    // 用于处理默认网站语言码 => zh_TW
    const tws = ['zh-SG', 'zh-MO', 'zh_TW'];
    // 用于处理默认网站语言码 => ar-EG
    const ars = ['ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-OM', 'ar-QA', 'ar-SA', 'ar-SY', 'ar-TN', 'ar-YE'];

    const systemLanguage = SYSTEM_LANGUAGE;

    let lang = cache.getCache('lang');

    if (!lang) {
        if (slangs.list.indexOf(systemLanguage) > -1) {
            lang = systemLanguage;
        } else if (tws.indexOf(systemLanguage) > -1) {
            lang = 'zh_TW';
        } else if (ars.indexOf(systemLanguage) > -1) {
            lang = 'ar-EG';
        } else {
            lang = 'en-US';
        }
    }   

    return lang;
})();

const symbols = {
    'TWD': 'NT$',
    'CNY': '￥'
}

const origin = (function(){
    let origin;

    let hostname = location.hostname;

    if (hostname == '54.169.140.238') {
        origin = hostname;
    }

    // // 根据环境获取不同的域名活着IP
    switch(Url.query('env')) {
        case 'dev':
            // 开发环境
            origin = '13.251.85.35';
            break;
        case 'stage':
            // 测试环境
            origin = '54.169.140.238';
            break;
    }

    

    return origin;
})();



const host = 'http://' +  origin +'/polarisex';
const uploadHost = host + '/upload/upload';
const uploadImgHost =  host + '/user/uploadImageSingle';
const websocketHost = 'ws://' + origin + '/';
const imgHost = 'http://' + origin + '/img';

const config = {
    channel: '',
    defaultLanguage: SITE_LANGUAGE, // 网站语言 
    systemLanguage: SYSTEM_LANGUAGE, // 浏览器系统语言
    isEdge: /Edge/i.test(ua), // 12+
    isIE: /(MSIE|Trident|Edge)/.test(ua),
    isFireFox: /(Firefox)/.test(ua),
    isSafari: /^((?!chrome|android).)*safari/i.test(ua),
    isChrome: /Chrome/.test(ua),
    // 邮箱正则表达式
    emailReg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    // 密码正则表达式
    pwdReg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d\S]{6,16}$/,
    // 手机号正则表达式
    phoneReg: /^1[3|4|5|7|8]\d{9}$/,
    salt: 'dig?F*ckDang5PaSsWOrd&%(polarisex0160630).',
    // 交易密码加盐
    dealSalt: 'dig?F*ckDa2g5PaSsWOrd&%(POLARISEX0160630).',
    // websocket域名
    websocketHost,
    uploadHost,
    uploadImgHost,
    host,
    symbols,
    imgHost
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