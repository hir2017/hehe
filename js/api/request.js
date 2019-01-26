import axios from "axios";
import qs from "qs";
import {message} from 'antd';

// 不需要携带用户uid和token信息
const urlWhiteList = ['/quote/klineHistory'];


var instance = axios.create({
    // 设置baseURL
    baseURL: UPEX.config.host,
    timeout: 60 * 1000,
  });




// 添加请求拦截器
instance.interceptors.request.use(function (config) {
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

    let _path = config.url.replace(config.baseURL, '');

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
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

let preTime = +new Date(), nowTime;

// 添加响应拦截器
instance.interceptors.response.use(function (res) {
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

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;
