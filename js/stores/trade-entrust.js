/**
 * 交易中心 － 买卖盘
 */
import { observable, computed, autorun, action } from 'mobx';
import { socket } from '../api/socket';

class EntrustStore {
    @observable entrust = {};
    @observable type = 'all';

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
            this.entrust = parseData(data);
        });
    }

    @action
    setType(type) {
        this.type = type;
    }
}

function parseData(data){
    

    return data;
}

export default EntrustStore;