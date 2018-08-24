import { getAllCurrencyRelations } from '../../api/http';
import { socket } from '../../api/socket';

export default (store, currencyStore) => {
    return {
        /**
         * ------------------- 订阅订单信息 {{ -------------------
         */
        sendSubscribe(baseCurrencyId, tradeCurrencyId) {
            socket.off('subscribe');
            socket.emit('subscribe', {
                baseCurrencyId,
                tradeCurrencyId
            });
            socket.on('subscribe', data => {
                // success console.log('subscribe', data)
            })
        },
        /**
         * ------------------- 当前货币信息处理 {{ -------------------
         */
        getCurrentCoin(baseCurrencyId, tradeCurrencyId) {
            socket.off('quoteOne');
            socket.emit('quoteOne', {
                baseCurrencyId,
                tradeCurrencyId
            });

            socket.on('quoteOne', (data) => {

                let ret;

                if (data.length > 0 && data[0].tradeCoins.length > 0) {
                    ret = this.parseCoinItem(data[0].tradeCoins[0]);
                    store.updateCurrentTradeCoin(ret);
                }
            })
        },

        parseCoinItem(item) {
            item.changeRateText = NumberUtil.asPercent(item.changeRate);
            // 最新成交价
            item.currentAmountText = NumberUtil.formatNumber(item.currentAmount, item.pointPrice);
            // 最高价
            item.highPriceText = NumberUtil.formatNumber(item.highPrice, item.pointPrice);
            // 最低价
            item.lowPriceText = NumberUtil.formatNumber(item.lowPrice, item.pointPrice);
            // 开盘价
            item.openPriceText = NumberUtil.formatNumber(item.openPrice, item.pointPrice);
            // 收盘价
            item.closePriceText = NumberUtil.formatNumber(item.closePrice, item.pointPrice);
            // 24小时成交数量
            item.volumeText = NumberUtil.formatNumber(item.volume, item.pointNum);
            // 成交额
            item.amountText = NumberUtil.formatNumber(item.amount, item.pointPrice);

            return item;
        },

        /**
         * 行情通知
         */
        listenQuoteNotify() {
            socket.off('quoteNotify');
            socket.emit('quoteNotify');
            socket.on('quoteNotify', (data) => {
                let ret = this.parseCoinItem(data);
                store.updateCurrentTradeCoin(ret);
            })
        },
        /**
         * ------------------- 当前货币信息处理 }} -------------------
         */
        /**
         * ------------------- 盘口处理 {{ -------------------
         */
        /**
         * 获取盘口【买入，卖出】
         */
        getEntrust(baseCurrencyId, tradeCurrencyId) {
            socket.off('entrust');
            socket.emit('entrust', {
                baseCurrencyId,
                tradeCurrencyId
            });

            socket.on('entrust', data => {
                if (baseCurrencyId != data.baseCurrencyId || tradeCurrencyId != data.tradeCurrencyId) {
                    console.log('no match id');
                    return;
                }

                let key = [data.baseCurrencyId, data.tradeCurrencyId].join('_');
                let cfg = currencyStore.getCurrencyById(key);
                let { pointNum, pointPrice } = cfg;

                data = this.parseEntrust(data, pointNum, pointPrice);
                store.updateEntrust(data);

                let asks = this.processData(data.sell, 'asks', false, pointNum, pointPrice);
                let bids = this.processData(data.buy, 'bids', true, pointNum, pointPrice);
                
                store.updateAsks(asks);
                store.updateBids(bids);
            });
        },

        parseEntrust(data, pointNum, pointPrice ) {
            let buy = data.buy || [];
            let sell = data.sell || [];
            let entrustScale = data.entrustScale;

            // 买入
            buy.forEach((item, index) => {
                let cache = item.number * item.current / entrustScale;

                cache = cache * 100; // 单位：百分比

                let depth = parseInt(cache.toFixed(pointNum));

                item.index = index + 1;
                item.depth = Math.max(depth > 100 ? 100 : depth, 1);

                item.current = NumberUtil.initNumber(item.current, pointPrice); // 价格
                item.newcurrent = NumberUtil.formatNumber(item.current, pointPrice); // 价格

                item.number = NumberUtil.initNumber(item.number, pointNum); // 数量
                item.newnumber = NumberUtil.formatNumber(item.number, pointNum); // 数量

                item.newtotal = NumberUtil.formatNumber(item.current * item.number, pointPrice); // 总金额
            });

            // 卖出
            sell.forEach((item, index) => {
                let cache = item.number * item.current / entrustScale;

                cache = cache * 100; // 单位：百分比

                let depth = parseInt(cache.toFixed(pointNum));

                item.index = index + 1;
                item.depth = Math.max(depth > 100 ? 100 : depth, 1);

                item.current = NumberUtil.initNumber(item.current, pointPrice); // 价格
                item.newcurrent = NumberUtil.formatNumber(item.current, pointPrice); // 价格

                item.number = NumberUtil.initNumber(item.number, pointNum); // 数量
                item.newnumber = NumberUtil.formatNumber(item.number, pointNum); // 数量

                item.newtotal = NumberUtil.formatNumber(item.current * item.number, pointPrice); // 总金额

            });

            // 降序排序
            sell = sell.reverse();

            data.buy = buy;
            data.sell = sell;

            return data;
        },

        processData(list, type, desc, pointNum, pointPrice) {
            let res = [];

            // Convert to data points
            for (var i = 0; i < list.length; i++) {

                list[i] = {
                    price: Number(list[i].current), // 价格
                    volume: Number(list[i].number) // 成交数量
                };
            }

            // Sort list just in case
            list.sort(function(a, b) {
                if (a.price > b.price) {
                    return 1;
                } else if (a.price < b.price) {
                    return -1;
                } else {
                    return 0;
                }
            });

            // Calculate cummulative volume
            if (desc) {
                for (var i = list.length - 1; i >= 0; i--) {
                    if (i < list.length - 1) {
                        list[i].totalvolume = list[i + 1].totalvolume + list[i].volume;
                    } else {
                        list[i].totalvolume = list[i].volume;
                    }
                    var dp = {};
                    dp['price'] = NumberUtil.initNumber(list[i].price, pointPrice);
                    dp['volume'] = list[i].volume;
                    dp['totalvolume'] = NumberUtil.initNumber(list[i].totalvolume, pointNum);

                    res.splice(0, 0, dp);
                }
            } else {
                for (var i = 0; i < list.length; i++) {
                    if (i > 0) {
                        list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
                    } else {
                        list[i].totalvolume = list[i].volume;
                    }
                    var dp = {};
                    dp['price'] = NumberUtil.initNumber(list[i].price, pointPrice);
                    dp['volume'] = list[i].volume;
                    dp['totalvolume'] = NumberUtil.initNumber(list[i].totalvolume, pointNum);
                    res[res.length] = dp;
                }
            }

            return res;
        },
        /**
         * ------------------- 盘口处理 }} -------------------
         */
        /**
         * ------------------- 实时交易处理 {{ -------------------
         */
        /**
         * 交易历史, 最右侧实时行情图
         */
        getTradeHistory(baseCurrencyId, tradeCurrencyId) {
            socket.off('tradeHistory');
            socket.emit('tradeHistory', {
                baseCurrencyId,
                tradeCurrencyId
            });

            socket.on('tradeHistory', data => {
                if (baseCurrencyId != data.baseCurrencyId || tradeCurrencyId != data.tradeCurrencyId) {
                    console.log('no match id');
                    return;
                }

                let parsedData = this.parseTradeHistory(data);
                // 添加到数组头部
                // mobx对于数组的处理，会将它转换成observableArray，它不是一个数组类型，需要进行数组转换（如slice）
                let oldHistoryList = store.tradeHistory.content.slice();

                parsedData.content = parsedData.content.concat(oldHistoryList);

                store.updateTradeHistory(parsedData);
            });
        },

        parseTradeHistory(data) {
            let key = [data.baseCurrencyId, data.tradeCurrencyId].join('_');
            let cfg = currencyStore.getCurrencyById(key);
            let { pointNum, pointPrice } = cfg;

            data.content.forEach((item, index) => {
                this.parseTradeHistoryItem(item, pointNum, pointPrice);
            });

            return data;
        },

        parseTradeHistoryItem(item, pointNum, pointPrice) {
            item.timeText = TimeUtil.formatDate(item.time, 'HH:mm:ss'); // 时间
            item.timeTextAll = TimeUtil.formatDate(item.time); // 时间
            item.current = NumberUtil.initNumber(item.current, pointPrice); // 价格
            item.currentText = NumberUtil.formatNumber(item.current, pointPrice); // 价格
            item.amount = NumberUtil.initNumber(item.amount, pointNum); // 数量
            item.amountText = NumberUtil.formatNumber(item.amount, pointNum); // 数量

            return item;
        },
        /**
         * ------------------- 实时交易处理 }} -------------------
         */
        /**
         * 销毁
         */
        destroy() {
            socket.off('entrust');
            socket.off('subscribe');
            socket.off('tradeHistory');
            socket.off('quoteOne');
        }
    }
}