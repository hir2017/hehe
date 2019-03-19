/**
 * @fileoverview: 请求API-澳洲大宗OTC部分
 */
import request from '../request';
export function submit(data) {
    return request.post('/otc/submitOtcInfo', data)
}
