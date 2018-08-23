/**
 * 推荐币种列表
 */
import { observable, computed, autorun, action, runInAction } from 'mobx';
import { socket } from '../api/socket';
import NumberUtil from '../lib/util/number';

class ListStore {
    @observable list = [];
    @observable $fetching = 0;


    @computed get hotCoins() {
        return this.cacheCoins.filter((item) => { 
        	if (item.recommend === 1) {
        		item = this.parseCoinItem(item);
        		return true;
        	}
        });
    }

    parseCoinItem(item) {
        item.changeRateText = NumberUtil.asPercent(item.changeRate);
        // 最新成交价
        item.currentAmountText = NumberUtil.formatNumber(item.currentAmount, item.pointPrice);
        // 成交额
        item.amountText = NumberUtil.formatNumber(item.amount, item.pointPrice);

        return item;
    }

    @action
    getData() {
        let timer;
        let fetch = () => {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                fetch();
            }, 10 * 1000); // 10秒钟轮询查询
        }
        
        fetch();
    }

    @action fetch() {
    	this.$fetching = 1;

        socket.off('list');
        socket.emit('list');
        socket.on('list', (data) => {
            runInAction('recommend list', () => {
            	this.$fetching = 0;
            	this.list = data[0].tradeCoins;
            })
        })
    }
}

export default ListStore;