import axios from "axios";
import qs from "qs";
import { hashHistory, browserHistory } from 'react-router';

axios.interceptors.request.use(function(config) {
    const token = UPEX.cache.getCache('token');
    const uid = UPEX.cache.getCache('uid');
    let local = UPEX.cache.getCache('lang');

    local = local == undefined || local == '' ? 'zh-TW' : local;

    if (!token && !uid) {
        let data = qs.parse(config.data)
        config.data = qs.stringify({
            ...data,
            local: local
        })
        return config
    }

    if (config.method === 'post') {
        let data = qs.parse(config.data)

        config.data = qs.stringify({
            ...data,
            token: token,
            uid: uid,
            local: local
        })
    } else if (config.method === 'get' || config.method === 'delete') {
        config.params = {
            ...config.params,
            token: token,
            uid: uid,
            local: local
        }
    }
    return config;
}, function(error) {
    return Promise.reject(error);
})

let preTime = +new Date();

axios.interceptors.response.use(function(res) {
    let status = res.data.status

    if (status == 9999) {
        let nowTime = +new Date();

        UPEX.cache.removeCache('token');
        UPEX.cache.removeCache('uid');

        if (nowTime - preTime > 600000) {
            preTime = nowTime;

            message.error(UPEX.lang.template('登录超时，请重新登录'))
        }

        browserHistory.push('/login');

    }
    return res
})


// 获取图片验证码
export function fetchPicCaptcha() {
    return axios.post(`${UPEX.config.host}/security/getCode`).then(res => res.data);
}

// 查询手机是否被占用
export function queryPhone(phone) {
    return axios.post(`${UPEX.config.host}/user/queryPhone`, qs.stringify({
        phone: phone
    })).then(res => res.data);
}

// 发送验证码，新用户注册。邮箱验证和手机验证码都用该API。TODO check
export function sendEmailForRegister(data) {
    return axios.post(`${UPEX.config.host}/user/sendEmailForRegister`, qs.stringify({
        email: data.account,
        imgcode: data.imgcode,
        codeid: data.codeid
    })).then(res => res.data);
}

// 发送验证码，找回密码。邮箱验证和手机验证码都用该API。TODO check
export function sendMail(data) {
    return axios.post(`${UPEX.config.host}/user/sendMail`, qs.stringify({
        email: data.account,
        imgcode: data.imgcode,
        codeid: data.codeid
    })).then(res => res.data);
}

// 注册账号
export function userRegister(data) {
    return axios.post(`${UPEX.config.host}/user/register`, qs.stringify({
        email: data.account,
        pwd: data.pwd,
        vercode: data.vercode,
        inviteId: data.inviteId,
        imgcode: data.imgcode,
        codeid: data.codeid
    })).then(res => res.data);
}

// 用户登录
export function userLogin(data) {
    return axios.post(`${UPEX.config.host}/user/loginGAFirst`, qs.stringify({
        email: data.email,
        pwd: data.pwd,
        vercode: data.imgcode,
        source: 1,
        codeid: data.codeid
    })).then(res => res.data);
}

// 重置密码
export function resetPwd(data) {
    return axios.post(`${UPEX.config.host}/user/resetPwd`, qs.stringify({
        email: data.account,
        newPwd: data.pwd,
        vercode: data.vercode,
        imgcode: data.imgcode,
        codeid: data.codeid
    })).then(res => res.data);
}

// 获取最新公告列表
export function getAnnounceList(pageSize) {
    return axios.post(`${UPEX.config.host}/announce/list`, qs.stringify({
        num: pageSize
    })).then(res => res.data);
}

// 获取公告详情
export function getAnnounceDetail(id) {
    return axios.post(`${UPEX.config.host}/announce/getInfo`, qs.stringify({
        announceId: id
    })).then(res => res.data);
}

/**
 *  基本币种列表
 */
export function getBaseCoin() {
    return axios.post(`${UPEX.config.host}/coin/coins`).then(res => res.data);
}
/**
 * 交易中心委托
 */
export function getUserOrderList(data) {
    return axios.post(`${UPEX.config.host}/user/showOrderList`, qs.stringify({
        currencyId: data.tradeCurrencyId,
        baseCurrencyId: data.baseCurrencyId
    })).then(res => res.data);
}
/**
 * 添加收藏
 */
export async function addOptional (data) {
    const res = await axios.post(`${UPEX.config.host}/optional/optional`, qs.stringify({
        tradeCurrencyId: data.currencyId,
        baseCurrencyId: data.baseCurrencyId
    }))
    return res.data
}
/**
 * 取消收藏
 */

 export async function cancleOptional (data) {
    const res = await axios.post(`${UPEX.config.host}/optional/cancleOptional`, qs.stringify({
        tradeCurrencyId: data.currencyId,
        baseCurrencyId: data.baseCurrencyId
    }))
    return res.data
 }
 /**
  * 收藏列表
  */

  export async function listOptional () {
    const res = await axios.post(`${UPEX.config.host}/optional/listOptional`)
    return res.data
  }