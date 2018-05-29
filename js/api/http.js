import axios from "axios";
import qs from "qs";
import { hashHistory, browserHistory } from 'react-router';
import { message } from 'antd';

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

        $.channel.emit('authorizeinvalid');

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
    data = data || {};

    return axios.post(`${UPEX.config.host}/user/showOrderList`, qs.stringify({
        ...data  
    })).then(res => res.data);
}
/**
 * 生成委托单 -> 限价买/卖
 */
export function submitOrder(data) {
    return axios.post(`${UPEX.config.host}/order/order`, qs.stringify({
        ...data
    })).then(res => res.data);
}


// 获取用户交易密码设置状态
export function getPersonalTradingPwd() {
    return axios.post(`${UPEX.config.host}/user/selectFdPwdEnabled`).then(res => res.data);
}
/**
 * 账号信息
 */
export function hasSettingDealPwd(){
    return axios.post(`${UPEX.config.host}/user/personalInfo`).then(res => res.data);
}

/**
 * 资产列表
 */
export function getCoinAccount(type = 1){
    return axios.post(`${UPEX.config.host}/coin/customerCoinAccount`, qs.stringify({
        type
    })).then(res => res.data);
}

/**
 * 充币提币记录
 */
export function getSelectTakeList(data){
    return axios.post(`${UPEX.config.host}/coin/selectTakeList`, qs.stringify({
        ...data
    })).then(res => res.data);
}


/**
 * 币种列表
 */
export function getAllCoinPoint(){
    return axios.post(`${UPEX.config.host}/coin/coinPoint`).then(res => res.data);
}
/**
 * 我的订单 —— 委托历史记录
 */
export function getOrderListByCustomer(data){
    return axios.post(`${UPEX.config.host}/user/trOrderListByCustomer`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 我的订单 —— 委托中订单
 */
export function getUserOpenOrderList(data){
    return axios.post(`${UPEX.config.host}/user/getOrderList`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 我的订单 —— 历史订单
 */
export function getUserHistoryOrderList(data){
    return axios.post(`${UPEX.config.host}/user/trOrderListByCustomer`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 我的订单 —— 已成交订单
 * @param {Object} data 
 * @example {
    baseCurrencyId: '', // 基础币
    beginTime: '', // 起始时间
    buyOrSell:  '', // 买卖
    currencyId:  '',  // 币种id
    endTime:  '', // 币种ID
    size: 2 // 每页数量
    start: 2, // 页码
    status: 订单状态
 }
 */
export function getUserSuccessOrderList(data){
    return axios.post(`${UPEX.config.host}/user/getTradeList`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 撤销订单
 */
export function cancelOrder(data){
    return axios.post(`${UPEX.config.host}/order/cancel`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 添加收藏
 */
export async function addOptional(data) {
    const res = await axios.post(`${UPEX.config.host}/optional/optional`, qs.stringify({
        tradeCurrencyId: data.currencyId,
        baseCurrencyId: data.baseCurrencyId
    }))
    return res.data
}
/**
 * 取消收藏
 */

export async function cancleOptional(data) {
    const res = await axios.post(`${UPEX.config.host}/optional/cancleOptional`, qs.stringify({
        tradeCurrencyId: data.currencyId,
        baseCurrencyId: data.baseCurrencyId
    }))
    return res.data
}
/**
 * 收藏列表
 */

export async function listOptional() {
    const res = await axios.post(`${UPEX.config.host}/optional/listOptional`)
    return res.data
}
/**
 * 用户信息
 */

export function personalInfo(){
    return axios.post(`${UPEX.config.host}/user/personalInfo`).then(res => res.data);
}

/**
 * 登录记录
 */

 export function loginRecord () {
    return axios.post(`${UPEX.config.host}/user/loginRecord`, {
        type: 2,
        start: 0,
        size: 10
    }).then(res => res.data);
 }

 /**
  * 用户认证
  */

 export function identityAuthentication () {
    return axios.post(`${UPEX.config.host}/user/submitUserInfo`, {
        type: 2,
        start: 0,
        size: 10
    }).then(res => res.data);
 }