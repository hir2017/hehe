/**
 * @fileoverview: 手续费打折
 */
import request from '../request';

/**
 * 查询手续费折扣套餐
 */
export function getList() {
    return Promise.resolve({
        attachment: {
            feeDiscount: [
                {
                    id: 1,
                    discount: '90',
                    goodsName: '',
                    price: 120,
                    sort: '',
                },
                {
                    id: 2,
                    discount: '80',
                    goodsName: '',
                    price: 1200,
                    sort: '',
                },
                {
                    id: 3,
                    discount: '70',
                    goodsName: '',
                    price: 6000,
                    sort: '',
                },
                {
                    id: 4,
                    discount: '60',
                    goodsName: '',
                    price: 12000,
                    sort: '',
                },
                {
                    id: 5,
                    discount: '50',
                    goodsName: '',
                    price: 18000,
                    sort: '',
                }
            ]
        },
        message: null,
        status: 200
    });
    return request.post('/feeDiscount/getList');
}

/**
 * 查询用户手续费折扣
 */
export function getPackage() {
    return Promise.resolve({
        // attachment: {
        //     feeDiscount: {
        //         createTime: '',
        //         discount: '',
        //         endTime: '',
        //         goodsName: '',
        //         startTime: '',
        //         uid: ''
        //     }
        // },
        attachment: null,
        message: null,
        status: 200
    });
    return request.post('/feeDiscount/getByUser');
}

/**
 * 开通用户手续费折扣
 */
export function setPackage(data) {
    console.log(data)
    return Promise.resolve({
        message: null,
        status: 200
    });
    return request.post(' /feeDiscount/set', data);
}
