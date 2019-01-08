import axios from "axios";
import qs from "qs";
import { message } from 'antd';
import NumberUtils from '@/lib/util/number';

function checkPhoneNum(str) {
    // 校验是否全数字，有可能输入的是邮箱
    if(!NumberUtils.isInteger(str)) {
        return str;
    }
    let result = str;
    //  0886开头，台湾手机号
    if(str.indexOf('0886') === 0) {
        // 14位， 手机号10位，且手机号第一位是0
        if(str.length === 14 && str[4] === '0') {
            result = '0886' + str.substr(5);
        }
    }
    return result;
}

// 不需要携带用户uid和token信息
const urlWhiteList = ['/quote/klineHistory'];

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

    let _path =  config.url.replace(config.baseURL, '');

    if (config.method === 'post') {
        let data = qs.parse(config.data)

        if (urlWhiteList.indexOf(_path) > -1) {
            config.data = qs.stringify({
                ...data,
                local,
                tm: +new Date()
            })
        } else {
            config.data = qs.stringify({
                ...data,
                token,
                uid,
                local,
                tm: +new Date()
            })
        }
    } else if (config.method === 'get' || config.method === 'delete') {

        if (urlWhiteList.indexOf(_path) > -1) {
            config.params = {
                ...config.params,
                local,
                tm: +new Date()
            }
        } else {
            config.params = {
                ...config.params,
                token,
                uid,
                local,
                tm: +new Date()
            }
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
    let tempData = res.data || {
        id: 'SYSTEM_ERROR',
        status: -1,
        message: 'response is empty'
    }
    // 对响应数据做点什么
    let status = tempData.status

    if (status == 9999) {
        nowTime = +new Date();

        $.channel.emit('authorizeinvalid');

        if (nowTime - preTime > 600000) {
            preTime = nowTime;
            message.destroy();
            message.error(UPEX.lang.template('登录超时，请重新登录'))
        }
    }

    return tempData;

}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 获取图片验证码
export function fetchIMGCaptcha() {
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
    let _account = checkPhoneNum(data.account);
    return axios.post('/user/sendEmailForRegister', qs.stringify({
        email: _account,
        NECaptchaValidate: data.validate,
        captchaId: data.captchaId,
        imgcode: 0,
        codeid: 0
    }))
}

// 发送验证码，找回密码。邮箱验证和手机验证码都用该API。TODO check
export function sendMail(data) {
    data.account = checkPhoneNum(data.account);
    return axios.post('/user/sendMail', qs.stringify({
        email: data.account,
        NECaptchaValidate: data.validate,
        captchaId: data.captchaId,
        imgcode: 0,
        codeid: 0
    }))
}

// 注册账号
export function userRegister(data) {
    let _account = checkPhoneNum(data.account);
    return axios.post('/user/register', qs.stringify({
        email: _account,
        pwd: data.pwd,
        vercode: data.vercode,
        inviteId: data.inviteId,
        imgcode: 0,
        codeid: 0
    }))
}

// 用户登录 - 不需要验证第一步
export function userLogin(data) {
    let _email = checkPhoneNum(data.email);
    return axios.post('/user/loginGAFirst', qs.stringify({
        emailOrPhone: _email,
        pwd: data.pwd,
        NECaptchaValidate: data.validate,
        captchaId: data.captchaId,
        source: 1
    }))
}

/**
 * 用户登录 － 需要验证第二步
 */
export function userLogin2(data) {
    data.emailOrPhone = checkPhoneNum(data.emailOrPhone);
    return axios.post('/user/loginGASecond', qs.stringify({
        ...data,
        source: 1
    }))
}
/**
 * 邮箱登录 －  发送短信验证码
 */
export function sendLoginCodeSend(data) {
    // console.log(data.authType, data.emailOrPhone)
    if (data.authType === 1) {
        data.emailOrPhone = checkPhoneNum(data.emailOrPhone)
    }
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
    data.account = checkPhoneNum(data.account);
    return axios.post('/user/resetPwd', qs.stringify({
        email: data.account,
        newPwd: data.pwd,
        vercode: data.vercode,
        imgcode: 0,
        codeid: 0
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
 *  获取基础币对应交易币列表
 */
export function getTradeCoinsOfBaseCoin() {
    return axios.get('/coin/tradeCoinsOfBaseCoin')
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

/*
    获取CCNET 充值信息
*/
export function getCCNET2Info() {
    return axios.get('/pay/getVirtualAccount')
}

export function getUserBindCards() {
    return axios.post('/card/getBindBankCardInfo')
}

export function orderFiatRecharge(data) {
    return axios.post('/pay/getFrontPageJsonData', {
        ...data,
        currencyId: 1
    })
}

/*
    获取充值提现费率
    actionId	币种行为Id	number	1：充值，2：提现
    currencyId	币种Id	number
*/
export function getCurrencyFee(data) {
    return axios.get('/twdCommon/currencyFee', {
        params: data
    })
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
 * @param {amount, currencyId, cardId（此用户当前绑定银行卡id）, tradePwd, gAuth/phoneCode}
 */
export function orderFiatWithdraw(data) {
    data.currencyId = 1;
    return axios.post('/withdraw/createWithdrawCashBill', qs.stringify(data))
}
/**
 * 台湾-获取当前充值单上账记录
 * @param {orderNo}
 */
export function getAusAccountEntryRecords(data) {
    return axios.get('/ausRecharge/getAccountEntryRecords', {
        params: data
    })
}
/**
 * 台湾-获取当前充值单上账记录
 * @param {orderNo}
 */
export function getAccountEntryRecords(data) {
    return axios.get('/recharge/getAccountEntryRecords', {
        params: data
    })

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
    const {address} = data;
    delete data.address;
    return axios.post(`/coin/takeCoin?address=${address}`, qs.stringify({
        actionId: 4,
        ...data
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
 * 发送验证码 设置、忘记交易密码
 */

export function setTradePwdSendCode(data, imgCode, imgCodeId) {
    let params = imgCode ? {
        type: data,
        imgcode: imgCode,
        codeid: imgCodeId
    } : {
        vercode: 1,
        codeid: 1,
        imgcode: 1,
        ...data
    }
    return axios.post('/user/setTradePwdSendCode', params)
}

/**
 * 发送验证码 绑定、解绑谷歌验证码 设置、忘记交易密码
 */

export function sendCodeInGAOrTadePwd(type, imgCode, imgCodeId) {
    return axios.post('/user/phoneAuthSendCode', {
        type: 1,
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

export function modifyFdPwd(newFdPassWord, oldFdPassWord, validate, captchaId) {
    return axios.post('/user/modifyFdPwd', {
        newFdPassWord: newFdPassWord,
        oldFdPassWord: oldFdPassWord,
        NECaptchaValidate: validate,
        captchaId: captchaId,
    })
}

/**
 * 修改登录密码
 */

export function resetPwdInUserCenter(newPwd, vercode, imgCode, imgCodeId, oldPwd, type, validate, captchaId) {
    return axios.post('/user/resetPwdInUserCenter', {
        newPwd: newPwd,
        oldPwd: oldPwd, // 如果首次设置可以不传.传个空串
        vercode: vercode,
        // imgcode: imgCode,
        // codeid: imgCodeId,
        type: type,
        NECaptchaValidate: validate,
        captchaId: captchaId
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
        codeid: imgCodeId,
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
 *  获取当前等级提现额度
 */

export function getUserWithdrawLimmit(data) {
    return axios.post('/getWithdrawFunds', data)
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
 *  修改绑定手机
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

export function bindPhoneOrEmailSendCode(params) {
    params.phoneOrEmail = checkPhoneNum(params.phoneOrEmail);
    return axios.post('/user/bindPhoneOrEmailSendCode', params)
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

export function bindPhoneOrEmailAction(params) {
    if(params.type === 2) {
        params.phoneOrEmail = checkPhoneNum(params.phoneOrEmail);
    }
    return axios.post('/user/bindPhoneOrEmailAction', params)
}


/**
 *  修改手机绑定发送验证码
 *  type=1:发新手机短信；type=2:发旧手机短信
 *  type=1:新手机发送验证码, 需要验证图片滑块
 */

export function modifyPhoneSendMsg(params) {
    params.phone = checkPhoneNum(params.phone);
    return axios.post('/user/modifyPhoneSendCode', params);
}


/**
 *  修改绑定手机
 *  type=1:验证google和新手机验证码，type=2:验证旧手机，新手机验证码
 */
export function modifyPhoneAction(params) {
    params.newPhone = checkPhoneNum(params.newPhone);
    return axios.post('/user/modifyPhoneAction', params)
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

export function bindVerifyCardInfo(data) {
    return axios.post('/card/bindVerifyCardInfo', data)
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
        vercode: '11',
        codeid: '11'
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
/**
 * 查询币对显示位数
 */
export function getCurrencyPoints(baseCurrencyId, tradeCurrencyId) {
    return axios.post('/coin/currencyRelationPoints', {
        baseCurrencyId,
        tradeCurrencyId
    })
}

/**
 *  获取用户KYC等级限额信息
 */
export function twdGetQuotaManagementInfo(data) {
    return axios.post('/twdCommon/getQuotaManagementInfo', data)
}

/**
 *  =================澳洲版API=================
 */

/**
 *  澳洲版获取用户KYC等级限额信息
 */
export function ausGetQuotaManagementInfo(data) {
    return axios.post('/ausCommon/getQuotaManagementInfo', data)
}
/**
 * 澳洲版bpay充值获取referenceID
 */
export function getBPAYreferenceNo() {
    return axios.post('/ausCommon/getBpayRefId')
}
/**
 * 澳洲版充值/提现查询记录
 * @param {type， pageNumber， pageSize}
 * type: recharge: 1, withdraw: 2
 */
export function ausGetFundChangeList(data) {
    let url = data.type === 1 ? '/ausRecharge/getRechargeBillInfo' : 'ausWithdraw/getWithdrawBillInfo';
    return axios.post(url, qs.stringify({
        ...data
    }))
}
/**
 * 澳洲版获取用户资金可用余额
 * @param {currencyId} data
 */
export function ausGetUserAvailableAmount(data) {
    return axios.post('/ausRechargeWithdraw/getUserAvailableAmount', qs.stringify({
        currencyId: 1
    }))
}
/**
 * 澳洲版获取用户提现手续费
 * @param {currencyId, amount（提现金额）, actionId（行为id，2代表提现）: 2} data
 */
export function ausGetWithdrawCashFee(data) {
    data.currencyId = 1;
    data.actionId = 2;
    return axios.post('/ausWithdraw/getWithdrawCashFee', qs.stringify(data))
}

/**
 * 澳洲版创建提现订单
 * @param { amount, currencyId, accountNumber, accountName, bsb, swiftCode, address, tradePwd, gAuth/phoneCode }
 */
export function ausOrderFiatWithdraw(data) {
    return axios.post('/ausWithdraw/createWithdrawCashBill', data)
}

/**
 * 澳洲版获取poli地址
 * @param {amount}
 */
export function ausGetPoliUrl(data) {
    return axios.post('/ausRecharge/getFrontPageJsonData', data)
}
/*
    澳洲版获取充值提现费率
    actionId 币种行为Id number 1：充值，2：提现
    currencyId 币种Id number
*/
export function ausGetCurrencyFee(data) {
    return axios.get('/ausCommon/currencyFee', {
        params: data
    })
}

/**
 *  更新驳回原因读取状态
 *  @status: 默认0 已读，1：未读
 */
export function updateAuthFailReasonStatus(data) {
    return axios.post('/user/updateAuthFailReasonStatus', data)
}

/**
 *  用户身份认证信息查询
 */
export function getUserAuthInfo(info) {
    return axios.post('/user/userAuthInfo', {})
}

/**
 * ------------- 邀请活动-----------------
 */
/**
 * 根据邀请码获取邀请者昵称等信息
 */
export function getInviterInfoByCode(code){
    return axios.post('/user/getUserNameByCode', qs.stringify({
        invitedCode: code
    }))
}

/**
 * 获取邀请top3排榜榜信息
 */
export function getInviteTopList(){
    return axios.post('/user/getTopThreeCommissionInfo');
}

/**
 * 获取用户信息
 */
export function getInviteUserInfo(){
    return axios.post('/user/getMyCmsnAndFrndCountInfo');
}

/**
 * 我的返佣资产列表
 */
export function getInviteAssets(data){
    return  axios.post('/user/getUserCommissionSumInfoList', qs.stringify({
        ...data
    }));
}
/**
 * 返佣记录
 */
export function getInviteCommissionList(data){
    return axios.post('/user/getUserCommissionWaterListByUuid',qs.stringify({
        ...data
    }));

}
/**
 * 邀请明细
 */
export function getInvitationList(data){
    return axios.post('/user/getInvitedList',qs.stringify({
        ...data
    }));
}

/**
 * 获取返佣比例
 */
export function getCommissionRate(){
    return axios.post('/user/getUserCommissionRate');
}



/**
 * 拒绝理由查询
 */
export function getRefuseReason(id){
    return axios.post('/refuseStrategy/failReason',{
        id
    });
}

/**
 * 获取分发记录
 */
export function getAssetChangeReward(data) {
    // return axios.post('/coin/selectCustomerAccountWaterList', data);
    return axios.post('/coin/selectActivitiesCustomerAccountWaterList', data);
}


/**
 * 所在地区查询
 * @language	语种 1:中简 2:中繁 3:英文
 * @locationId	地区id
 */
export function getRealLocation(data) {
    return axios.post('/param/realLocations', data);
}
