import { observable, autorun, computed, action } from 'mobx';
import { socket , baseCurrencyId } from '../api/socket';

class HomeStore {
    @observable allCoins = [];

    @action 
    getAllCoins() {
    	socket.emit('indexAllCoins', {type: 1})
        socket.on('indexAllCoins', function (data) {
        	console.log('data', data);
            if (data.type === 1) {
                data.attachment.forEach((item) => {
                    item.update = false;
                })

                this.allCoins = data.attachment;
            }            
        })
            
    }

    @action
    getHomeLoginedData(id = baseCurrencyId) {
    	socket.off('loginAfter')
        socket.emit('loginAfter',{ baseCurrencyId: id })
        socket.on('loginAfter', function (data) {
            console.log('+++++++++++++loginAfter', data);
        })
    }
}

export default HomeStore;