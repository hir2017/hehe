/**
 * 行情列表
 */
import { observable, computed, autorun, action } from 'mobx';
import { addOptional, cancleOptional, listOptional } from '../api/http'
import NumberUtil from '../lib/util/number';
import { socket } from '../api/socket';

class MarketListStore {
	constructor(stores) {
        this.commonStore = stores.commonStore;
    }

    @action
    getAllCoins() {
        this.isFetchingList = true;
        
        socket.off('list');
        socket.emit('list');
        socket.on('list', (data)=> {
            runInAction('recommend coins', ()=>{
                let result = data.filter((item)=>{
                    return item.info.currencyNameEn === 'TWD'; // 只显示基础币=TWD
                })[0];

                if (result) {
                    
                    result = this.parseCoinList(result);
                    
                    this.coin = result.tradeCoins[0];
                    this.allCoins = result.tradeCoins;
                    this.cacheCoins = JSON.parse(JSON.stringify(result.tradeCoins));
                    this.hotCoins = this.recommendCoins(result.tradeCoins);
                } else {
                    this.noCoin = true;
                }

                this.isFetchingList = false;
            })
        })
    }

    @action
    parseCoinItem(item) {
        item.changeRateText = NumberUtil.asPercent(item.changeRate);
        // 最新成交价
        item.currentAmount = NumberUtil.formatNumber(item.currentAmount, this.commonStore.pointPrice);
        // 最高价
        item.highPrice = NumberUtil.formatNumber(item.highPrice, this.commonStore.pointPrice);
        // 最低价
        item.lowPrice = NumberUtil.formatNumber(item.lowPrice, this.commonStore.pointPrice);
        // 开盘价
        item.openPrice = NumberUtil.formatNumber(item.openPrice, this.commonStore.pointPrice);
        // 收盘价
        item.closePrice = NumberUtil.formatNumber(item.closePrice, this.commonStore.pointPrice);
        // 24小时成交数量
        item.volume = NumberUtil.formatNumber(item.volume, item.pointNum);
        // 成交额
        item.amount = NumberUtil.formatNumber(item.volume, this.commonStore.pointPrice);
        
        return item;
    }


    // 格式化交易币信息
    @action
    parseCoinList(obj) {
        // 遍历，1. 按成交量降序排列，2. 按最新成交价降序排序
        obj.tradeCoins.map((item, index) => {
            item = this.parseCoinItem(item);
        });

        return obj;
    }

    @action
    updateCoin(item) {
    	
    }

}

export default MarketListStore;