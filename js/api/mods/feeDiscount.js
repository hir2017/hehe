/**
 * @fileoverview: 手续费打折
 */
import request from '../request';

/**
 * 查询手续费折扣套餐
 */
export function getList() {
    return request.post('/feeDiscount/getList');
}

/**
 * 查询用户手续费折扣
 */
export function getPackage() {
    return request.post('/feeDiscount/getByUser');
}

/**
 * 开通用户手续费折扣
 */
export function setPackage(data) {
    return request.post('/feeDiscount/set', data);
}
