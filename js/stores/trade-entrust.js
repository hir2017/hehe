/**
 * 交易中心 － 买卖盘
 */
import { observable, computed, autorun, action } from 'mobx';
import { socket } from '../api/socket';

class EntrustStore {
    @observable entrust = {};
    @observable type = 'all';
    originEntrust = {};

    constructor() {
        var handler = autorun(() => {
            if (this.type == 'all') {
                if (this.originEntrust.sell.length > 10) {

                }
            }
        });
    }

    @action
    getEntrust(baseCurrencyId, currencyId) {
        socket.emit('entrust', {
            baseCurrencyId: baseCurrencyId,
            tradeCurrencyId: currencyId
        });
        socket.on('entrust', (data) => {
            data = require('../mock/entrust.json');
            console.log('+++++++++++++');
            console.log('entrust', data);
            this.originEntrust = JSON.parse(JSON.stringify(data));
            this.entrust = data;
        });
    }



   
}

function parseData(data) {

    return data;
}

export default EntrustStore;