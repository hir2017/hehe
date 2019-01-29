import request from '../request';
export function submit(data) {
    return request.post('/otc/submitOtcInfo', data)
}
