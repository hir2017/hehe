/**
 * @fileoverview: 请求API-用户积分体系部分
 * @author: ShangJin
 * @date: 2019/1/29
 */
import request from '../request';

/**
 * 获取用户积分信息
 */
export function getUserPointInfo(){
    return request.post('user/getUserPointInfo');
}

/**
 * 获取用户积分等级列表
 */
export function getLevelFee(){
    return request.post('user/getPointLevelList');
}

/**
 * 用户积分收支明细
 */
export function getPointConsumeList(data){
    return request.post('user/getPointRecordListForPage', data);
}