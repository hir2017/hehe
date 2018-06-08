import { message } from 'antd';
import { getPersonalTradingPwd, cancelOrder } from '../../api/http';
import { browserHistory } from 'react-router';
import PopupTradePwd from './tradepwd';

export default (store, tradepwdStore) => {
    return {
        getData(data) {
            store.getData(data);
        },

        handleFilter(condition, data) {
            let params;

            switch(condition) {
                case 'page': // 页码
                    params = {
                        start: data.page
                    };
                    break;
                case 'beginTime':
                    params ={
                        start: 1,
                        beginTime: data.beginTime === null ? null : data.beginTime
                    }
                    break;
                 case 'endTime':
                    params ={
                        start: 1,
                        endTime: data.endTime === null ? null : data.endTime
                    }
                    break;
                case 'currencyId':
                    params = {
                        start: 1,
                        currencyId: Number(data.currencyId)
                    }
                    break;
                case 'buyOrSell':
                    params = {
                        start: 1,
                        buyOrSell: Number(data.buyOrSell)
                    }
                    break;
                case 'status':
                    params = {
                        start: 1,
                        status: Number(data.status)
                    }
                    break;

            }

            this.getData(params);
        },

        cancelOrder(currencyId, orderNo) {
            if (tradepwdStore.tradePasswordStatus == 1) {
                // 启用交易密码
                PopupTradePwd.create({
                    onSubmit: (pwd) =>{
                        this.submitCancelOrder(currencyId, orderNo, pwd);
                    }
                });
            } else {
                // 不需要交易密码
                this.submitCancelOrder(currencyId, orderNo);
            }
        },

        submitCancelOrder(currencyId, orderNo, fdPassword){
            cancelOrder({
                currencyId,
                fdPassword: fdPassword ? fdPassword : '',
                orderNo,
                source: 1
            }).then((data)=>{
                if (data.status ==  200) {
                    message.success(UPEX.lang.template('撤销成功'));
                } else {
                    message.error(UPEX.lang.template('撤销失败'));
                }
            }).catch(function(error){
                message.error(UPEX.lang.template('撤销失败'));
            })
        }
    }
}