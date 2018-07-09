import axios from "axios";
import qs from "qs";
import { hashHistory, browserHistory } from 'react-router';
import { message } from 'antd';

// 设置baseURL
axios.defaults.baseURL = UPEX.config.host;

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    const token = UPEX.cache.getCache('token');
    const uid = UPEX.cache.getCache('uid');
    let local = UPEX.cache.getCache('lang');

    local = local == undefined || local == '' ? 'zh-TW' : local;

    local = local.replace('-', '_'); // 所有后台API接口的语言码格式：zh_CN、zh_TW、en_US

    if (!token && !uid) {
        let data = qs.parse(config.data)

        config.data = qs.stringify({
            ...data,
            local,
            tm: +new Date()
        })
        return config
    }

    if (config.method === 'post') {
        let data = qs.parse(config.data)

        config.data = qs.stringify({
            ...data,
            token,
            uid,
            local,
            tm: +new Date()
        })
    } else if (config.method === 'get' || config.method === 'delete') {
        config.params = {
            ...config.params,
            token,
            uid,
            local,
            tm: +new Date()
        }
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

let preTime = +new Date(), nowTime;

// 添加响应拦截器
axios.interceptors.response.use(function(res) {
    // 对响应数据做点什么
    let status = res.data.status

    if (status == 9999) {
        nowTime = +new Date();

        $.channel.emit('authorizeinvalid');

        if (nowTime - preTime > 600000) {
            preTime = nowTime;
            message.error(UPEX.lang.template('登录超时，请重新登录'))
        }
    }

    return res.data;

}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 获取图片验证码
export function fetchPicCaptcha() {
    return axios.post('/security/getCode');
}

// 查询手机是否被占用
export function queryPhone(phone) {
    return axios.post('/user/queryPhone', qs.stringify({
        phone: phone
    }))
}

// 发送验证码，新用户注册。邮箱验证和手机验证码都用该API。TODO check
export function sendEmailForRegister(data) {
    return axios.post('/user/sendEmailForRegister', qs.stringify({
        email: data.account,
        imgcode: data.imgcode,
        codeid: data.codeid
    }))
}

// 发送验证码，找回密码。邮箱验证和手机验证码都用该API。TODO check
export function sendMail(data) {
    return axios.post('/user/sendMail', qs.stringify({
        email: data.account,
        imgcode: data.imgcode,
        codeid: data.codeid
    }))
}

// 注册账号
export function userRegister(data) {
    return axios.post('/user/register', qs.stringify({
        email: data.account,
        pwd: data.pwd,
        vercode: data.vercode,
        inviteId: data.inviteId,
        imgcode: data.imgcode,
        codeid: data.codeid
    }))
}

// 用户登录 - 不需要验证第一步
export function userLogin(data) {
    return axios.post('/user/loginGAFirst', qs.stringify({
        // email: data.email, // 兼容旧的代码环境，上线后去掉
        emailOrPhone: data.email,
        pwd: data.pwd,
        vercode: data.imgcode,
        source: 1,
        codeid: data.codeid
    }))
}

/**
 * 用户登录 － 需要验证第二步
 */
export function userLogin2(data) {
    return axios.post('/user/loginGASecond', qs.stringify({
        authType: data.authType,
        clientPassword: data.clientPassword,
        emailOrPhone: data.emailOrPhone,
        source: 1
    }))
}
/**
 * 邮箱登录 －  发送短信验证码
 */
export function sendLoginCodeSend(data) {
    return axios.post('/user/loginCodeSend', qs.stringify({
        authType: data.authType || 1, // 1.手机 2.邮箱
        emailOrPhone: data.emailOrPhone,
        source: 1
    }))
}
/**
 * 用户登录 － 退出
 */
export function userLogout() {
    return axios.post('/user/logout')
}

// 重置密码
export function resetPwd(data) {
    return axios.post('/user/resetPwd', qs.stringify({
        email: data.account,
        newPwd: data.pwd,
        vercode: data.vercode,
        imgcode: data.imgcode,
        codeid: data.codeid
    }))
}
/*
 *
 */
export function getAnnounceList(data) {
    return axios.post('/announce/pageList', qs.stringify(data))
}

// 获取公告详情
export function getAnnounceDetail(data) {
    return axios.post('/announce/getInfo', qs.stringify(data))
}


// 获取banner列表
export function getBannerList() {
    let local = UPEX.cache.getCache('lang');

    local = local == undefined || local == '' ? 'zh-TW' : local;

    local = local.replace('-', '_');

    return axios.post('/banner/banner', qs.stringify({
        type: 1
    }))
}
/**
 *  基本币种列表
 */
export function getBaseCoin() {
    return axios.post('/coin/coins')
}
/**
 * 交易中心委托
 */
export function getUserOrderList(data) {
    data = data || {};

    return axios.post('/user/showOrderList', qs.stringify({
        ...data
    }))
}
/**
 * 生成委托单 -> 限价买/卖
 */
export function submitOrder(data) {
    return axios.post('/order/order', qs.stringify({
        ...data
    }))
}


// 获取用户资金密码设置状态
export function getPersonalTradingPwd() {
    return axios.post('/user/selectFdPwdEnabled')
}
/**
 * 账号信息
 */
export function hasSettingDealPwd() {
    return axios.post('/user/personalInfo')
}

/**
 * 资产列表
 */
export function getCoinAccount(type = 1) {
    return axios.post('/coin/customerCoinAccount', qs.stringify({
        type
    }))
}
/**
 * 我的余额
 */
export function getCNYBalance() {
    return axios.post('/property')
}
/**
 * 查询当前币种地址及二维码
 * @return {

    msgCode: 充币识别码
 }
 */
export function selectUserAddress(currentyId) {
    return axios.post('/coin/selectUserAddress', qs.stringify({
        walletType: 1,
        currentyId
    }))
}

/*----------------------------- 充值相关接口：{{------------------------------------*/

export function getUserBankInfo() {
    return axios.post('/rechargeWithdraw/getUserCardInfoAndAmountAndFee')
}

export function getUserBindCards() {
    return axios.post('/card/getBindBankCardInfo')
}

export function orderFiatRecharge(data) {
    data.currencyId = 1;

    return axios.post('/pay/getFrontPageJsonData', qs.stringify(data))
}

/**
 * 获取用户资金可用余额
 * @param {currencyId} data
 */
export function getUserAvailableAmount(data) {
    return axios.post('/rechargeWithdraw/getUserAvailableAmount', qs.stringify({
        currencyId: 1
    }))
}

/**
 * 获取用户提现手续费
 * @param {currencyId, amount（提现金额）, actionId（行为id，2代表提现）: 2} data
 */
export function getWithdrawCashFee(data) {
    data.currencyId = 1;
    data.actionId = 2;
    return axios.post('/withdraw/getWithdrawCashFee', qs.stringify(data))
}

/**
 * 创建提现订单
 * @param {amount, currencyId, cardId（此用户当前绑定银行卡id）, tradePwd, gAuth/phoneCode,
 */
export function orderFiatWithdraw(data) {
    data.currencyId = 1;
    return axios.post('/withdraw/createWithdrawCashBill', qs.stringify(data))
}

/*----------------------------- 充值相关接口：}}------------------------------------*/

/*----------------------------- 提币相关接口：{{------------------------------------*/
/**
 * 提币记录
 */
export function getCoinWithdrawList(data) {
    return axios.post('/coin/selectTakeList', qs.stringify({
        ...data
    }))
}
/**
 * 提币前查询信息接口
 */
export function getTakeCoinInfo(currencyId) {
    return axios.post('/coin/selectTakeCoin', qs.stringify({
        currencyId
    }))
}
/**
 * 删除提币地址接口
 */
export function deleteCoinAddress(data) {
    return axios.post('/coin/updateCoinAddress', qs.stringify({
        currencyId: data.currencyId,
        walletAddressId: data.walletAddressId
    }))
}
/**
 * 添加提币地址接口
 */
export function addWithdrawAddress(data) {
    return axios.post('/coin/insertTakeAddress', qs.stringify({
        currencyId: data.currencyId, // 提币地址
        fdPwd: data.fdPwd, // 资金密码
        note: data.note, // 令牌
        address: data.address, // 地址
    }))
}
/**
 * 提币发送邮箱短信验证码: 10分钟有效期，可以错误5次。
 */
export function takeCoinSendPhoneCode(data) {
    return axios.post('/coin/emailTakeCoin', qs.stringify({
        vercode: data.vercode,
        type: data.type, // 1:邮件（默认）2:手机
        codeid: data.codeid
    }))
}
/**
 * 提币接口
 */
export function takeCoin(data) {
    return axios.post(`/coin/takeCoin?address=${data.address}`, qs.stringify({
        actionId: 4,
        msgCode: '',
        currencyId: data.currencyId,
        fdPwd: data.fdPwd,
        note: data.note,
        // address: data.address,
        // emailCode: data.emailCode,
        phoneCode: data.phoneCode,
        vercode: data.vercode,
        codeid: data.codeid,
        amount: data.amount,
        gAuth: data.gAuth,
    }))
}
/*-----------------------------}} 提币相关接口：------------------------------------*/
/**
 * 提币记录
 * selectListByUuid
 * {

    beginTime
    endTime
    currencyId
    size
    start
    status
    token
    uid
 }
 */
export function getCoinRechargeList(data) {
    return axios.post('/coin/selectListByUuid', qs.stringify({
        ...data
    }))
}
/**
 * 币种列表
 */
export function getAllCoinPoint() {
    return axios.post('/coin/coinPoint')
}
/**
 * 充值/提现查询记录
 * {
    type
    pageNumber
    pageSize
 }
 */
export function getFundChangeList(data) {
    return axios.post('/rechargeWithdraw/getRechargeWithdrawBillInfo', qs.stringify({
        ...data
    }))
}
/**
 * 提现记录
 * selectListByUuid
 * {

    beginTime
    endTime
    currencyId
    size
    start
    status
    token
    uid
 }
 */
export function getFundWithdrawList(data) {
    return axios.post('/fund/withdraw', qs.stringify({
        ...data
    }))
}
/**
 * 我的订单 —— 委托历史记录
 */
export function getOrderListByCustomer(data) {
    return axios.post('/user/trOrderListByCustomer', qs.stringify({
        ...data
    }))
}
/**
 * 我的订单 —— 委托中订单
 */
export function getUserOpenOrderList(data) {
    return axios.post('/user/getOrderList', qs.stringify({
        ...data
    }))
}
/**
 * 我的订单 —— 历史订单
 */
export function getUserHistoryOrderList(data) {
    return axios.post('/user/trOrderListByCustomer', qs.stringify({
        ...data
    }))
}
/**
 * 我的订单 —— 历史订单详情
 */
export function getUserHistoryOrderDetail(data) {
    return axios.post('/user/trOrderDetailByCustomer', qs.stringify({
        ...data
    }))
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
export function getUserSuccessOrderList(data) {
    return axios.post('/user/getTradeList', qs.stringify({
        ...data
    }))
}
/**
 * 撤销订单
 */
export function cancelOrder(data) {
    return axios.post('/order/cancel', qs.stringify({
        ...data
    }))
}
/**
 * 添加收藏
 */
export function addOptional(data) {
    return axios.post('/optional/optional', qs.stringify({
        tradeCurrencyId: data.currencyId,
        baseCurrencyId: data.baseCurrencyId
    }))
}
/**
 * 取消收藏
 */

export function cancleOptional(data) {
    return axios.post('/optional/cancleOptional', qs.stringify({
        tradeCurrencyId: data.currencyId,
        baseCurrencyId: data.baseCurrencyId
    }))
}
/**
 * 收藏列表
 */

export function listOptional() {
    return axios.post('/optional/listOptional')
}

/**
 * 交易深度
 */

export function getTradeDeep(pair, limit) {
    return axios.get('/quote/tradeDeepin', {
        params: {
            symbol: pair,
            coins: 2,
            limit: limit // 最多200条
        }
    })
}
/**
 * K线数据
 * @param pair交易币对。TWD_LTC
 * @param peroid: 周期
 * @param limit：条数
 */
export function getTradeKline(data) {
    if (data.startTime && data.endTime) {
        return axios.get('/quote/klineHistory', {
            params: {
                symbol: data.symbol,
                type: data.interval,
                limit: data.limit,
                startTime: data.startTime,
                endTime: data.endTime
            }
        })
    } else {
        return axios.get('/quote/klineHistory', {
            params: {
                symbol: data.symbol,
                type: data.interval,
                limit: data.limit
            }
        })
    }
}

/**
 * 用户信息
 */

export function personalInfo() {
    return axios.post('/user/personalInfo')
}

/**
 * 登录记录
 */

export function loginRecord() {
    return axios.post('/user/loginRecord', {
        type: 2,
        start: 0,
        size: 10
    })
}

/**
 * 用户认证
 */

export function identityAuthentication() {
    return axios.post('/user/submitUserInfo', {
        type: 2,
        start: 0,
        size: 10
    })
}

/**
 * 发送验证码 修改密码用
 */

export function sendCodeInUserCenter(type, imgCode, imgCodeId) {
    return axios.post('/user/sendMailInUserCenter', {
        type: type,
        imgcode: imgCode,
        codeid: imgCodeId
    })
}

/**
 * 设置修改资金密码
 */

export function bindFdPwd(newFdPassWord, vercode, imgCode, imgCodeId, oldFdPassWord = '') {
    return axios.post('/user/bindFdPwd', {
        newFdPassWord: newFdPassWord,
        oldFdPassWord: oldFdPassWord, // 如果首次设置可以不传.传个空串
        vercode: vercode,
        imgcode: imgCode,
        codeid: imgCodeId
    })
}

/**
 * 修改资金密码
 */

export function modifyFdPwd(newFdPassWord, oldFdPassWord) {
    return axios.post('/user/modifyFdPwd', {
        newFdPassWord: newFdPassWord,
        oldFdPassWord: oldFdPassWord,
    })
}

/**
 * 修改登录密码
 */

export function resetPwdInUserCenter(newPwd, vercode, imgCode, imgCodeId, oldPwd, type) {
    return axios.post('/user/resetPwdInUserCenter', {
        newPwd: newPwd,
        oldPwd: oldPwd, // 如果首次设置可以不传.传个空串
        vercode: vercode,
        imgcode: imgCode,
        codeid: imgCodeId,
        type: type
    })
}

/**
 * 绑定(更换) 手机号或者邮箱发送验证码
 */

export function bindPhoneSendMsg(imgCode, imgCodeId, type, phone = '') {
    return axios.post('/user/bindPhoneSendMsg', {
        type: type,
        phone: phone,
        imgcode: imgCode,
        codeid: imgCodeId
    })
}

/**
 *  此接口只能在启用ga前调用返回数据 否则不返回。
 */

export function getSecretKey() {
    return axios.post('/security/getSecretKey')
}

/**
 *  问题反馈
 */

export function addAsk(detail, urlkey) {
    return axios.post('/user/ask', {
        detail: detail,
        name: name,
        phone: '',
        urlkey: urlkey,
        type: ''
    })
}

/**
 *  问题反馈列表
 */

export function getQuestions(pageNumber) {
    return axios.post('/user/questions', {
        size: 10,
        // status: 1,
        start: pageNumber
    })
}

/**
 *  身份认证
 */

export function submitUserInfo(info) {
    return axios.post('/user/submitUserInfo', {
        ...info
    })
}

/**
 *  GA 绑定
 */

export function bindGoogleAuth(clientPassword, verCode) {
    return axios.post('/security/bindGoogleAuth', {
        clientPassword,
        verCode
    })
}

/**
 *  GA 解绑
 */

export function closeGoogleAuth(clientPassword, verCode) {
    return axios.post('/security/closeGoogleAuth', {
        clientPassword,
        verCode
    })
}

/**
 *  身份 认证信息
 */

export function selectAuthLevel() {
    return axios.post('/user/selectAuthLevel')
}

/**
 *  修改绑定修改邮箱
 */

export function bindPhone(newDevice, oldDevice, oldVercode, vercode, codeid, imgcode) {
    return axios.post('/user/modifyPhoneOrEmail', {
        newPhone,
        oldPhone,
        oldVercode,
        vercode
    })
}
/**
 *  绑定手机或邮箱发送验证码
 *  type=1、手机注册用户;type=2、邮箱注册用户;
 */

export function bindPhoneOrEmailSendCode(codeid, imgcode, phoneOrEmail, type) {
    return axios.post('/user/bindPhoneOrEmailSendCode', {
        codeid,
        imgcode,
        phoneOrEmail,
        type
    })
}

/**
 *  查询当前账户谷歌认证
 *  0未开启 1是开启 2是关闭
 */

export function isUsedGoogleAuth() {
    return axios.post('/security/isUsedGoogleAuth')
}

/**
 *  绑定手机或邮箱
 *  type=1、手机注册用户;type=2、邮箱注册用户;
 */

export function bindPhoneOrEmailAction(EmailCode, phoneCode, phoneOrEmail, type) {
    return axios.post('/user/bindPhoneOrEmailAction', {
        EmailCode,
        phoneCode,
        phoneOrEmail,
        type
    })
}

/**
 *  修改手机绑定发送验证码
 *  type=1:google+新手机，发新手机短信；type=2:旧手机+新手机，发2条手机短信
 */

export function modifyPhoneSendMsg(phone, codeid, imgcode, type) {
    return axios.post('/user/modifyPhoneSendCode', {
        phone,
        codeid,
        imgcode,
        type
    })
}

/**
 *  修改绑定手机
 *  type=1:验证google和新手机验证码，type=2:验证旧手机，新手机验证码
 */

export function modifyPhoneAction(newCode, newPhone, oldCode, type) {
    return axios.post('/user/modifyPhoneAction', {
        newCode,
        newPhone,
        oldCode,
        type
    })
}

/**
 *  手机二级认证开关
 *
 */

export function phoneAuthSwitch(smsCode, status) {
    return axios.post('/user/phoneAuthSwitch', { smsCode, status })
}

/**
 *  二级密码开启关闭
 *
 */

export function updateFdPwdEnabled(fdPwd, enabled) {
    return axios.post('/user/updateFdPwdEnabled', { fdPwd, enabled })
}

/**
 *  银行卡绑定
 *
 */

export function bindVerifyCardInfo(
    cardNo,
    userName,
    openBank,
    branchNo,
    branchName,
    tradePwd,
    imgUrl) {
    return axios.post('/card/bindVerifyCardInfo', {
        cardNo,
        userName,
        openBank,
        branchNo,
        branchName,
        tradePwd,
        imgUrl
    })
}

/**
 *  二级密码开启关闭
 *
 */

export function getBindBankCardInfo() {
    return axios.post('/card/getBindBankCardInfo')
}

/**
 * 忘记资金密码
 * type 1谷歌 2短信 3邮箱
 */

export function forgetFdPwd(newPwd, vercode, imgCode, imgCodeId, type) {
    return axios.post('/user/forgetFdPwd', {
        newFdPassWord: newPwd,
        verCode: vercode,
        imgcode: imgCode,
        codeid: imgCodeId,
        type: type
    })
}

/**
 *  问题详情
 *
 */

export function questionDetail(qid) {
    return axios.post('/user/questionDetail', {
        qid
    })
}

/**
 *  手机二级认证开关发送验证码
 *  type=1，修改手机验证开关；
 */

export function phoneAuthSendCode(type) {
    return axios.post('/user/phoneAuthSendCode', {
        type
    })
}

/**
 *  C级认证申请接口
 *
 */

export function submitKycC() {
    return axios.post('/user/submitKycC')
}

/**
 *  解绑银行卡
 *
 */

export function updateBindBankCardStatus(id, tradePwd, gAuth, phoneCode, status = 4) {
    return axios.post('/card/updateBindBankCardStatus', {
        id,
        tradePwd,
        gAuth,
        phoneCode,
        status
    })
}

/**
 *  解绑银行卡
 *
 */

export function deleteBindBankCardRecord(id) {
    return axios.post('/card/deleteBindBankCardRecord', {
        id
    })
}

/**
 *  提现，解绑银行卡发短信
 *
 */

export function sendMessageWithdraw(vercode, codeid) {
    return axios.post('/withdraw/sendMessageWithdraw', {
        vercode,
        codeid
    })
}
/**
 * 获取提币、充币、提现、充值的风控限额
 * 1: 充值；2：提现；3：充币；4：提币；5：买入；6：卖出；7:转账
 */
export function getUserActionLimit(actionId, currencyId) {
    return axios.post('/userRisk/coinRisk', {
        actionId,
        currencyId
    })
}