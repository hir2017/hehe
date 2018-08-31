import { getAllCurrencyRelations, submitOrder } from '../../../api/http';
import { socket } from '../../../api/socket';
import md5 from '../../../lib/md5';
import { message } from 'antd';

export default (store, authStore) => {
    return {
        updateInput(key, value) {
            switch (key) {
                case 'buyprice':
                    store.setDealBuyPrice(value);
                    break;
                case 'buynum':
                    store.setDealBuyNum(value);
                    break;
                case 'sellprice':
                    store.setDealSellPrice(value);
                    break;
                case 'sellnum':
                    store.setDealSellNum(value);
                    break;
                case 'sellpwd':
                    store.setTradeSellPassword(value);
                    break;
                case 'buypwd':
                    store.setTradeBuyPassword(value);
                    break;
            }
        },
        createTradeOrder(type) {
            let data = {};
            // 防止多次提交
            if (store.submiting) {
                return;
            }

            store.updateSubmiting(1);

            if (type == 'buy') {
                data = {
                    buyOrSell: 1,
                    currencyId: store.tradePair.tradeCurrencyId,
                    baseCurrencyId: store.tradePair.baseCurrencyId,
                    fdPassword: '',
                    num: store.dealBuyNum,
                    price: store.dealBuyPrice,
                    source: 1,
                    type: 1
                };

                if (store.tradePasswordStatus == 1) {
                    data.fdPassword = md5(store.tradeBuyPassword + UPEX.config.dealSalt + store.authStore.uid);
                }
            } else {
                data = {
                    buyOrSell: 2,
                    baseCurrencyId: store.tradePair.baseCurrencyId,
                    currencyId: store.tradePair.tradeCurrencyId,
                    fdPassword: '',
                    num: store.dealSellNum,
                    price: store.dealSellPrice,
                    source: 1,
                    type: 1
                };

                if (store.tradePasswordStatus == 1) {
                    data.fdPassword = md5(store.tradeSellPassword + UPEX.config.dealSalt + store.authStore.uid);
                }
            }

            if (this.tradeType == 'sj') {
                data.type = 2;
                data.price = 0;
            }

            submitOrder(data)
                .then(data => {
                    store.updateSubmiting(0);

                    switch (data.status) {
                        case 200:
                        
                            if (type == 'buy') {
                                store.setDealBuyPrice('');
                                store.setDealBuyNum('');
                                store.setTradeBuyPassword('');
                            } else {
                                store.setDealSellPrice('');
                                store.setDealSellNum('');
                                store.setTradeSellPassword('');
                            }

                            $.channel.emit('updateUserAccount');

                            message.success(UPEX.lang.template('下单成功'));

                            break;
                        case 2013: //"交易密码输入错误"
                            if (type == 'buy') {
                                store.setTradeBuyPassword('');
                            } else {
                                store.setTradeSellPassword('');
                            }
                            message.error(data.message);
                            break;
                        default:
                            message.error(data.message);
                    }
                })
                .catch(() => {
                    store.updateSubmiting(0);
                });
        }
    }
}