/**
 * @fileoverview: 请求API-IEO部分
 * @author: ShangJin
 * @date: 2019/1/29
 */
import request from '../request';

/**
 * 获取所有IEO项目列表
 */
export function getIEOList() {
    return request.post('/ieo/ieoInfo/list').then(res=>{
        res.attachment.map((item,index)=>{
            if(item.ieoId == 76){
                item.raisedAmount = 2500000;
            }
        });
        return res;
    });
}

/**
 * 根据项目ID获取单个IEO项目详细信息
 */
export function getSingleIEOInfo(data) {
    return request.post('/ieo/ieoInfo/getById', data).then(res=>{
        if(res.attachment.ieoId == 76){
            res.attachment.raisedAmount = 2500000;
        }
        return res;
    });
}

/**
 * 根据项目ID获取单个IEO项目购买信息接口
 */
export function getSingleIEOPurchaseInfo(data) {
    return request.post('/ieo/ieoTransferRecord/advanceBuy', data);
}

/**
 * IEO 购买
 */
export function buyIEOToken(data) {
    return request.post('/ieo/ieoTransferRecord/transfer', data);
}

/**
 * IEO 获取订阅情况
 */
export function getIEOIsSubscribe(data) {
    return request.post('/ieo/ieoUserSubscribe/hasUserSubscribe', data);
}

/**
 * IEO 订阅动作
 */
export function IEOToDoSubscribe(data) {
    return request.post('/ieo/ieoUserSubscribe/subscribe', data);
}

/**
 * 获取IEO资产列表
 */
export function getIEOAssetsList() {
    return request.post('/ieo/ieoTransferRecord/userAssetsList');
}

/**
 * IEO购买记录
 */
export function getIEORecordList(data) {
    return request.post('/ieo/ieoTransferRecord/transferRecordList', data);
}