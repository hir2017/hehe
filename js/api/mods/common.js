/**
 * @fileoverview: 通用信息接口
 */
import request from '../request';

/**
 * 获取服务器时间
 */
export function getSeverTime() {
    return request.post('/security/serverTIme');
}
