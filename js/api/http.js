import axios from "axios";
import qs from "qs";
import { hashHistory, browserHistory } from 'react-router';
import { message } from 'antd';
import base64 from '../lib/base64';

axios.interceptors.request.use(function(config) {
    const token = UPEX.cache.getCache('token');
    const uid = UPEX.cache.getCache('uid');
    let local = UPEX.cache.getCache('lang');

    local = local == undefined || local == '' ? 'zh-TW' : local;

    local =  local.replace('-', '_');

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
    // base64解密
    // res.data =  JSON.parse(base64.decode(res.data));

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

// 用户登录 - 不需要验证第一步
export function userLogin(data) {
    return axios.post(`${UPEX.config.host}/user/loginGAFirst`, qs.stringify({
        // email: data.email, // 兼容旧的代码环境，上线后去掉
        emailOrPhone: data.email,
        pwd: data.pwd,
        vercode: data.imgcode,
        source: 1,
        codeid: data.codeid
    })).then(res => res.data);
}

/**
 * 用户登录 － 需要验证第二步
 */
export function userLogin2(data) {
    return axios.post(`${UPEX.config.host}/user/loginGASecond`, qs.stringify({
        authType: data.authType,
        clientPassword: data.clientPassword,
        emailOrPhone: data.emailOrPhone,
        source: 1
    })).then(res => res.data);
}
/**
 * 邮箱登录 －  发送短信验证码
 */
export function sendLoginCodeSend(data) {
    return axios.post(`${UPEX.config.host}/user/loginCodeSend`, qs.stringify({
        authType: data.authType || 1, // 1.手机 2.邮箱
        emailOrPhone: data.emailOrPhone,
        source: 1
    })).then(res => res.data);
}
/**
 * 用户登录 － 退出
 */
export function userLogout() {
    return axios.post(`${UPEX.config.host}/user/logout`).then(res => res.data);
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


// 获取banner列表
export function getBannerList() {
    let local = UPEX.cache.getCache('lang');

    local = local == undefined || local == '' ? 'zh-TW' : local;

    local =  local.replace('-', '_');
    
    return axios.post(`${UPEX.config.host}/banner/banner`, qs.stringify({
        type: 1,
        language: local,
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
export function hasSettingDealPwd() {
    return axios.post(`${UPEX.config.host}/user/personalInfo`).then(res => res.data);
}

/**
 * 资产列表
 */
export function getCoinAccount(type = 1) {
    return axios.post(`${UPEX.config.host}/coin/customerCoinAccount`, qs.stringify({
        type
    })).then(res => res.data);
}
/**
 * 我的余额
 */
export function getCNYBalance() {
    return axios.post(`${UPEX.config.host}/property`).then(res => res.data);
}
/**
 * 查询当前币种地址及二维码
 * @return {

    msgCode: 充币识别码
 }
 */
export function selectUserAddress(currentyId) {
    return axios.post(`${UPEX.config.host}/coin/selectUserAddress`, qs.stringify({
        walletType: 1,
        currentyId
    })).then(res => res.data);
}

/*----------------------------- 充值相关接口：{{------------------------------------*/

export function getUserBankInfo() {
    return axios.post(`${UPEX.config.host}/rechargeWithdraw/getUserCardInfoAndAmountAndFee`).then(res => res.data);
}

export function getUserBindCards() {
    return axios.post(`${UPEX.config.host}/card/getBindBankCardInfo`).then(res => res.data);
}

export function orderFiatRecharge(data) {
    data.currencyId = 1;

    return axios.post(`${UPEX.config.host}/pay/getFrontPageJsonData`, qs.stringify(data)).then(res => res.data);
}

/**
 * 获取用户资金可用余额
 * @param {currencyId} data
 */
export function getUserAvailableAmount(data) {
    return axios.post(`${UPEX.config.host}/rechargeWithdraw/getUserAvailableAmount`, qs.stringify({
        currencyId: 1
    })).then(res => res.data);
}

/**
 * 获取用户提现手续费
 * @param {currencyId, amount（提现金额）, actionId（行为id，2代表提现）: 2} data
 */
export function getWithdrawCashFee(data) {
    data.currencyId = 1;
    data.actionId = 2;
    return axios.post(`${UPEX.config.host}/withdraw/getWithdrawCashFee`, qs.stringify(data)).then(res => res.data);
}

/**
 * 创建提现订单
 * @param {amount, currencyId, cardId（此用户当前绑定银行卡id）, tradePwd, gAuth/phoneCode,
 */
export function orderFiatWithdraw(data) {
    data.currencyId = 1;
    return axios.post(`${UPEX.config.host}/withdraw/createWithdrawCashBill`, qs.stringify(data)).then(res => res.data);
}

/*----------------------------- 充值相关接口：}}------------------------------------*/

/*----------------------------- 提币相关接口：{{------------------------------------*/
/**
 * 提币记录
 */
export function getCoinWithdrawList(data) {
    return axios.post(`${UPEX.config.host}/coin/selectTakeList`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 提币前查询信息接口
 */
export function getTakeCoinInfo(currencyId) {
    return axios.post(`${UPEX.config.host}/coin/selectTakeCoin`, qs.stringify({
        currencyId
    })).then(res => res.data);
}
/**
 * 删除提币地址接口
 */
export function deleteCoinAddress(data) {
    return axios.post(`${UPEX.config.host}/coin/updateCoinAddress`, qs.stringify({
        currencyId: data.currencyId,
        walletAddressId: data.walletAddressId
    })).then(res => res.data);
}
/**
 * 添加提币地址接口
 */
export function addWithdrawAddress(data) {
    return axios.post(`${UPEX.config.host}/coin/insertTakeAddress`, qs.stringify({
        currencyId: data.currencyId, // 提币地址
        fdPwd: data.fdPwd, // 交易密码
        note: data.note, // 令牌
        address: data.address, // 地址
    })).then(res => res.data);
}
/**
 * 提币发送邮箱短信验证码: 10分钟有效期，可以错误5次。
 */
export function takeCoinSendPhoneCode(data) {
    return axios.post(`${UPEX.config.host}/coin/emailTakeCoin`, qs.stringify({
        vercode: data.vercode,
        type: data.type, // 1:邮件（默认）2:手机
        codeid: data.codeid
    })).then(res => res.data);
}
/**
 * 提币接口
 */
export function takeCoin(data) {
    return axios.post(`${UPEX.config.host}/coin/takeCoin?address=${data.address}`, qs.stringify({
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
    })).then(res => res.data);
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
    return axios.post(`${UPEX.config.host}/coin/selectListByUuid`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 币种列表
 */
export function getAllCoinPoint() {
    return axios.post(`${UPEX.config.host}/coin/coinPoint`).then(res => res.data);
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
    return axios.post(`${UPEX.config.host}/rechargeWithdraw/getRechargeWithdrawBillInfo`, qs.stringify({
        ...data
    })).then(res => res.data);
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
    return axios.post(`${UPEX.config.host}/fund/withdraw`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 我的订单 —— 委托历史记录
 */
export function getOrderListByCustomer(data) {
    return axios.post(`${UPEX.config.host}/user/trOrderListByCustomer`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 我的订单 —— 委托中订单
 */
export function getUserOpenOrderList(data) {
    return axios.post(`${UPEX.config.host}/user/getOrderList`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 我的订单 —— 历史订单
 */
export function getUserHistoryOrderList(data) {
    return axios.post(`${UPEX.config.host}/user/trOrderListByCustomer`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 我的订单 —— 历史订单详情
 */
export function getUserHistoryOrderDetail(data) {
    return axios.post(`${UPEX.config.host}/user/trOrderDetailByCustomer`, qs.stringify({
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
export function getUserSuccessOrderList(data) {
    return axios.post(`${UPEX.config.host}/user/getTradeList`, qs.stringify({
        ...data
    })).then(res => res.data);
}
/**
 * 撤销订单
 */
export function cancelOrder(data) {
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
 * 交易深度
 */

export function getTradeDeep(pair, limit) {
    return axios.get(`${UPEX.config.host}/quote/tradeDeepin`, {
        symbol: pair,
        coins: 2,
        limit: limit // 最多200条
    }).then(res => res.data);
}
/**
 * K线数据
 * @param pair交易币对。TWD_LTC
 * @param peroid: 周期
 * @param limit：条数
 */
export function getTradeKline(data) {
    if (data.startTime && data.endTime) {
        return axios.get(`${UPEX.config.host}/quote/klineHistory?symbol=${data.symbol}&type=${data.interval}&limit=${data.limit}&startTime=${data.startTime}&endTime=${data.endTime}`).then(res => res.data);
    } else {
        return axios.get(`${UPEX.config.host}/quote/klineHistory?symbol=${data.symbol}&type=${data.interval}&limit=${data.limit}`).then(res => res.data);
    }
}

export function getTradingViewKline(pair, peroid = 1, limit) {
    return axios.get(`${UPEX.config.host}/quote/tradingView?symbol=${pair}&type=${peroid}&limit=${limit}`).then(res => res.data);
}

/**
 * 用户信息
 */

export function personalInfo() {
    return axios.post(`${UPEX.config.host}/user/personalInfo`).then(res => res.data);
}

/**
 * 登录记录
 */

export function loginRecord() {
    return axios.post(`${UPEX.config.host}/user/loginRecord`, {
        type: 2,
        start: 0,
        size: 10
    }).then(res => res.data);
}

/**
 * 用户认证
 */

export function identityAuthentication() {
    return axios.post(`${UPEX.config.host}/user/submitUserInfo`, {
        type: 2,
        start: 0,
        size: 10
    }).then(res => res.data);
}

/**
 * 发送验证码 修改密码用
 */

export function sendCodeInUserCenter(type, imgCode, imgCodeId) {
    return axios.post(`${UPEX.config.host}/user/sendMailInUserCenter`, {
        type: type,
        imgcode: imgCode,
        codeid: imgCodeId
    }).then(res => res.data);
}

/**
 * 设置修改交易密码
 */

export function bindFdPwd(newFdPassWord, vercode, imgCode, imgCodeId, oldFdPassWord = '') {
    return axios.post(`${UPEX.config.host}/user/bindFdPwd`, {
        newFdPassWord: newFdPassWord,
        oldFdPassWord: oldFdPassWord, // 如果首次设置可以不传.传个空串
        vercode: vercode,
        imgcode: imgCode,
        codeid: imgCodeId
    }).then(res => res.data);
}

/**
 * 修改交易密码
 */

export function modifyFdPwd(newFdPassWord, oldFdPassWord) {
    return axios.post(`${UPEX.config.host}/user/modifyFdPwd`, {
        newFdPassWord: newFdPassWord,
        oldFdPassWord: oldFdPassWord,
    }).then(res => res.data);
}

/**
 * 修改登录密码
 */

export function resetPwdInUserCenter(newPwd, vercode, imgCode, imgCodeId, oldPwd, type) {
    return axios.post(`${UPEX.config.host}/user/resetPwdInUserCenter`, {
        newPwd: newPwd,
        oldPwd: oldPwd, // 如果首次设置可以不传.传个空串
        vercode: vercode,
        imgcode: imgCode,
        codeid: imgCodeId,
        type: type
    }).then(res => res.data);
}

/**
 * 绑定(更换) 手机号或者邮箱发送验证码
 */

export function bindPhoneSendMsg(imgCode, imgCodeId, type, phone = '') {
    return axios.post(`${UPEX.config.host}/user/bindPhoneSendMsg`, {
        type: type,
        phone: phone,
        imgcode: imgCode,
        codeid: imgCodeId
    }).then(res => res.data);
}

/**
 *  此接口只能在启用ga前调用返回数据 否则不返回。
 */

export function getSecretKey() {
    return axios.post(`${UPEX.config.host}/security/getSecretKey`).then(res => res.data);
}

/**
 *  问题反馈
 */

export function addAsk(detail, urlkey) {
    return axios.post(`${UPEX.config.host}/user/ask`, {
        detail: detail,
        name: name,
        phone: '',
        urlkey: urlkey,
        type: ''
    }).then(res => res.data);
}

/**
 *  问题反馈列表
 */

export function getQuestions(pageNumber) {
    return axios.post(`${UPEX.config.host}/user/questions`, {
        size: 10,
        // status: 1,
        start: pageNumber
    }).then(res => res.data);
}

/**
 *  身份认证
 */

export function submitUserInfo(info) {
    return axios.post(`${UPEX.config.host}/user/submitUserInfo`, {
        ...info
    }).then(res => res.data);
}

/**
 *  GA 绑定
 */

export function bindGoogleAuth(clientPassword, verCode) {
    return axios.post(`${UPEX.config.host}/security/bindGoogleAuth`, {
        clientPassword,
        verCode
    }).then(res => res.data);
}

/**
 *  GA 解绑
 */

export function closeGoogleAuth(clientPassword, verCode) {
    return axios.post(`${UPEX.config.host}/security/closeGoogleAuth`, {
        clientPassword,
        verCode
    }).then(res => res.data);
}

/**
 *  身份 认证信息
 */

export function selectAuthLevel() {
    return axios.post(`${UPEX.config.host}/user/selectAuthLevel`).then(res => res.data);
}

/**
 *  修改绑定修改邮箱
 */

export function bindPhone(newDevice, oldDevice, oldVercode, vercode, codeid, imgcode) {
    return axios.post(`${UPEX.config.host}/user/modifyPhoneOrEmail`, {
        newPhone,
        oldPhone,
        oldVercode,
        vercode
    }).then(res => res.data);
}


/**
 * 去除手机号的0086
 */
function rmAreaCode(phone, areaCode = '0086') {
    if (phone.indexOf(areaCode) === 0) {
        return phone.replace(areaCode, '')
    }
    return phone
}

/**
 *  绑定手机或邮箱发送验证码
 *  type=1、手机注册用户;type=2、邮箱注册用户;
 */

export function bindPhoneOrEmailSendCode(codeid, imgcode, phoneOrEmail, type) {
    return axios.post(`${UPEX.config.host}/user/bindPhoneOrEmailSendCode`, {
        codeid,
        imgcode,
        phoneOrEmail,
        type
    }).then(res => res.data);
}

/**
 *  查询当前账户谷歌认证
 *  0未开启 1是开启 2是关闭
 */

export function isUsedGoogleAuth() {
    return axios.post(`${UPEX.config.host}/security/isUsedGoogleAuth`).then(res => res.data);
}

/**
 *  绑定手机或邮箱
 *  type=1、手机注册用户;type=2、邮箱注册用户;
 */

export function bindPhoneOrEmailAction(EmailCode, phoneCode, phoneOrEmail, type) {
    return axios.post(`${UPEX.config.host}/user/bindPhoneOrEmailAction`, {
        EmailCode,
        phoneCode,
        phoneOrEmail,
        type
    }).then(res => res.data);
}

/**
 *  修改手机绑定发送验证码
 *  type=1:google+新手机，发新手机短信；type=2:旧手机+新手机，发2条手机短信
 */

export function modifyPhoneSendMsg(phone, codeid, imgcode, type) {
    return axios.post(`${UPEX.config.host}/user/modifyPhoneSendCode`, {
        phone,
        codeid,
        imgcode,
        type
    }).then(res => res.data);
}

/**
 *  修改绑定手机
 *  type=1:验证google和新手机验证码，type=2:验证旧手机，新手机验证码
 */

export function modifyPhoneAction(newCode, newPhone, oldCode, type) {
    return axios.post(`${UPEX.config.host}/user/modifyPhoneAction`, {
        newCode,
        newPhone,
        oldCode,
        type
    }).then(res => res.data);
}

/**
 *  手机二级认证开关
 *
 */

export function phoneAuthSwitch(smsCode, status) {
    return axios.post(`${UPEX.config.host}/user/phoneAuthSwitch`, { smsCode, status }).then(res => res.data);
}

/**
 *  二级密码开启关闭
 *
 */

export function updateFdPwdEnabled(fdPwd, enabled) {
    return axios.post(`${UPEX.config.host}/user/updateFdPwdEnabled`, { fdPwd, enabled }).then(res => res.data);
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
    return axios.post(`${UPEX.config.host}/card/bindVerifyCardInfo`, {
        cardNo,
        userName,
        openBank,
        branchNo,
        branchName,
        tradePwd,
        imgUrl
    }).then(res => res.data);
}

/**
 *  二级密码开启关闭
 *
 */

export function getBindBankCardInfo() {
    return axios.post(`${UPEX.config.host}/card/getBindBankCardInfo`).then(res => res.data);
}

/**
 * 忘记交易密码
 * type 1谷歌 2短信 3邮箱
 */

export function forgetFdPwd(newPwd, vercode, imgCode, imgCodeId, type) {
    return axios.post(`${UPEX.config.host}/user/forgetFdPwd`, {
        newFdPassWord: newPwd,
        verCode: vercode,
        imgcode: imgCode,
        codeid: imgCodeId,
        type: type
    }).then(res => res.data);
}

/**
 *  问题详情
 *
 */

export function questionDetail(qid) {
    return axios.post(`${UPEX.config.host}/user/questionDetail`, {
        qid
    }).then(res => res.data);
}

/**
 *  手机二级认证开关发送验证码
 *  type=1，修改手机验证开关；
 */

export function phoneAuthSendCode(type) {
    return axios.post(`${UPEX.config.host}/user/phoneAuthSendCode`, {
        type
    }).then(res => res.data);
}

/**
 *  C级认证申请接口
 *
 */

export function submitKycC() {
    return axios.post(`${UPEX.config.host}/user/submitKycC`).then(res => res.data);
}

/**
 *  解绑银行卡
 *
 */

export function updateBindBankCardStatus(id, tradePwd, gAuth, phoneCode, status = 4) {
    return axios.post(`${UPEX.config.host}/card/updateBindBankCardStatus`, {
        id,
        tradePwd,
        gAuth,
        phoneCode,
        status
    }).then(res => res.data);
}

/**
 *  解绑银行卡
 *
 */

export function deleteBindBankCardRecord(id) {
    return axios.post(`${UPEX.config.host}/card/deleteBindBankCardRecord`, {
        id
    }).then(res => res.data);
}

/**
 *  提现，解绑银行卡发短信
 *
 */

export function sendMessageWithdraw(vercode, codeid) {
    return axios.post(`${UPEX.config.host}/withdraw/sendMessageWithdraw`, {
        vercode,
        codeid
    }).then(res => res.data);
}