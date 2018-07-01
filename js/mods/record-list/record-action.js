import { message } from 'antd';
import { getPersonalTradingPwd, cancelOrder } from '../../api/http';
import { socket } from '../../api/socket';
import { browserHistory } from 'react-router';
import PopupTradePwd from './tradepwd';
export default (store, authStore) => {
    return {
        isFirst: true,

        getData(data) {
            if (!authStore.isLogin) {
                return;
            }

            store.getData(data);

            if (this.isFirst) {
                this.bindEvent();
                this.isFirst = false;
            }
        },

        bindEvent() {
            this.bindRegister();
            this.bindUserOpenList();
            this.bindUserSuccessList();
        },
        /**
         * 注册
         */
        bindRegister() {
            let count = 0;

            let register = function() {
                socket.emit('register', {
                    uid: authStore.uid,
                    token: authStore.token
                });

                socket.on('register', (data) => {

                    if (!data || data !== 'succ') {
                        count++;

                        if (count < 3) {
                            register();
                        }
                    }
                })
            }

            register();
        },

        /**
         * 委托订单事件，每一次状态变更都会收到通知
         */
        bindUserOpenList() {
            socket.off('userOrder');
            socket.on('userOrder', (data) => {
                console.log('-----------', data);
                store.updateItem(data);
            })
        },
        /**
         *  成交订单事件，每一次状态变更都会收到通知
         */
        bindUserSuccessList() {
            socket.off('userTrade');
            socket.on('userTrade', (data) => {
                console.log('--------------', data);
                store.updateItem(data);
            })
        },

        handleFilter(condition, data) {
            let params;
            switch (condition) {
                case 'page': // 页码
                    params = {
                        start: data.page
                    };
                    break;
                case 'dateArr':
                    params = {
                        start: 1,
                        beginTime: data[0] || null,
                        endTime: data[1] || null
                    }
                    break;
                case 'beginTime':
                    params = {
                        start: 1,
                        beginTime: data.beginTime === null ? null : data.beginTime
                    }
                    break;
                case 'endTime':
                    params = {
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
            this.submitCancelOrder(currencyId, orderNo);
        },

        submitCancelOrder(currencyId, orderNo, fdPassword) {
            cancelOrder({
                currencyId,
                fdPassword: '',
                orderNo,
                source: 1
            }).then((data) => {
                if (data.status == 200) {
                    message.success(UPEX.lang.template('撤销成功'));
                    store.deleteItem(orderNo);
                } else {
                    message.error(data.message);
                }
            }).catch(function(error) {
                console.log(error)
            })
        }
    }
}
