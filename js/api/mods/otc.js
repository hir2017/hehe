import request from '../request';
export function submit(data) {
    return request.post('/announce/pageList', data)
}
