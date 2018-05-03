import axios from "axios";
import qs from "qs";
import { hashHistory, browserHistory } from 'react-router';

axios.interceptors.request.use(function (config) {
    const token = UPEX.cache.getCache('token');
    const uid = UPEX.cache.getCache('uid');
    let local = UPEX.cache.getCache('lang');

    local = local == undefined || local == '' ? 'zh-TW' : local;

    if(!token && !uid) {
        let data = qs.parse(config.data)
        config.data = qs.stringify({
            ...data,
            local:local
        })
        return config
    }

    if (config.method === 'post') {
        let data = qs.parse(config.data)

        config.data = qs.stringify({
            ...data,
            token: token,
            uid: uid,
            local:local
        })
    } else if (config.method === 'get' || config.method === 'delete') {
        config.params = {
            ...config.params,
            token: token,
            uid: uid,
            local:local
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})

let preTime = +new Date();

axios.interceptors.response.use(function (res) {
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
// 发送验证码。邮箱验证和手机验证码都用该API。TODO check
export function sendEmailForRegister(data) {
    return axios.post(`${UPEX.config.host}/user/sendEmailForRegister`, qs.stringify({
        email: data.account,
        imgcode: data.imgcode,
        codeid: data.codeid
    })).then(res => res.data);
}

export function userRegister(data){
	return axios.post(`${UPEX.config.host}/user/register`, qs.stringify({
        email: data.account,
        pwd: data.pwd,
        vercode: data.vercode,
        inviteId: data.inviteId,
        imgcode: data.imgcode,
        codeid: data.codeid
    })).then(res => res.data);
}