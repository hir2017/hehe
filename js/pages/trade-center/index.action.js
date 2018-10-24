import { getPersonalTradingPwd } from '../../api/http';
import { socket } from '../../api/socket';
import NumberUtil from '../../lib/util/number';

let mod__count = 0;

export default (store, currencyStore) => {
    return {
        /**
         * ------------------- 订阅订单信息 {{ -------------------
         */
        sendSubscribe() {
            let { baseCurrencyId, tradeCurrencyId } = store.tradePair;
            socket.off('subscribe');
            socket.emit('subscribe', {
                baseCurrencyId,
                tradeCurrencyId
            });
            socket.on('subscribe', data => {
                // success console.log('subscribe', data)
            })
        },

        bindOrderSocket(uid, token) {
            this.bindRegister(uid, token);
            this.bindUserOpenList();
            this.bindUserSuccessList();
        },
        /**
         * 注册
         */
        bindRegister(uid, token) {
            let count = 0;

            let register = () => {
                socket.emit('register', {
                    uid,
                    token
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
            let update = (item) => {
                item = item || {};
                // 屏蔽市价，市价不在委托中订单出现
                if (item.type === 2) {
                    return;
                }
                store.openStore.updateItem(item);

                store.updatePersonalAccount({
                    baseCoinBalance: item.baseCurrencyNum,
                    tradeCoinBalance: item.currencyNum
                })
            }

            socket.on('userOrder', (data) => {
                //console.log('---userOrder--------', data);

                if ($.isArray(data)) {
                    for (var i = 0, length = data.length; i < length; i++) {
                        update(data[i]);
                    }
                } else {
                    update(data);
                }
            })
        },

        /**
         *  成交订单事件，每一次状态变更都会收到通知
         */
        bindUserSuccessList() {
            let update = (item) => {
                item = item || {};
                store.successStore.updateItem(item);
                store.openStore.updateItem(item); // 删除委托中的该订单

                store.updatePersonalAccount({
                    baseCoinBalance: item.baseCurrencyNum,
                    tradeCoinBalance: item.currencyNum
                })
            }

            socket.on('userTrade', (data) => {
                //console.log('------userTrade--------', data);
                if ($.isArray(data)) {
                    for (var i = 0, length = data.length; i < length; i++) {
                        update(data[i]);
                    }
                } else {
                    update(data);
                }
            })
        },

        getPersonalTradingPwd() {
            getPersonalTradingPwd().then(data => {
                if (data.status == 200) {
                    store.updateTradePasswordStatus(data.attachment.enabled); // 1: 启用 ; 2: 不启用
                }
            });
        },
        /**
         * 查询个人币种余额
         */
        getUserAccount(uid, token) {
            let { baseCurrencyId, tradeCurrencyId } = store.tradePair;
            function start () {
                socket.emit('userAccount', {
                    uid,
                    token,
                    tradeCurrencyId,
                    baseCurrencyId
                });
            }
            socket.off('userAccount');
            // 第一次调用，延时，防止链接刚创建没数据
            if(mod__count === 0) {
                mod__count = 1;
                setTimeout(() => {
                    socket.emit('userAccount', {
                        uid,
                        token,
                        tradeCurrencyId,
                        baseCurrencyId
                    });
                }, 200);

            } else {
                socket.emit('userAccount', {
                    uid,
                    token,
                    tradeCurrencyId,
                    baseCurrencyId
                });
            }

            socket.on('userAccount', data => {
                data.baseCoinBalance = data.baseCoinBalance || 0;
                data.tradeCoinBalance = data.tradeCoinBalance || 0;

                store.updatePersonalAccount(data);
            });
        },
        /**
         * ------------------- 当前货币信息处理 {{ -------------------
         */
        getCurrentCoin() {
            let { baseCurrencyId, tradeCurrencyId } = store.tradePair;

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

                    store.setDealBuyPrice(ret.currentAmountInt);
                    store.setDealSellPrice(ret.currentAmountInt);
                }
            })
        },

        parseCoinItem(item) {
            item.changeRateText = NumberUtil.asPercent(item.changeRate);
            // 最新成交价
            item.currentAmountText = NumberUtil.formatNumber(item.currentAmount, item.pointPrice);
            item.currentAmountInt = NumberUtil.initNumber(item.currentAmount, item.pointPrice);
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

                if (store.tradeType == 'market') {
                    store.setDealBuyPrice(ret.currentAmountInt);
                    store.setDealSellPrice(ret.currentAmountInt);
                }
            })
        },
        /**
         * ------------------- 当前货币信息处理 }} -------------------
         */
        /**
         * ------------------- 盘口处理 {{ -------------------
         */
        // fetchEntrustFirst: true,
        /**
         * 获取盘口【买入，卖出】
         */
        getEntrust() {
            let { baseCurrencyId, tradeCurrencyId } = store.tradePair;

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
                // let bestBuyPrice =  this.parseBestBuyPrice(data.sell, pointPrice);
                // let bestSellPrice =  this.parseBestSellPrice(data.buy, pointPrice);

                // store.setBestBuyPrice(bestBuyPrice);
                // store.setBestSellPrice(bestSellPrice);

                // if (this.fetchEntrustFirst) {
                //     // 若限价
                //     if (store.tradeType == 'limit') {
                //         store.setDealBuyPrice(bestBuyPrice);
                //         store.setDealSellPrice(bestSellPrice);
                //     }
                // }

                // this.fetchEntrustFirst = false;

            });
        },
        // 最佳买入价格, 取得是卖出盘第一个订单，越低越好
        parseBestBuyPrice(data, pointPrice) {
            let price = data && data[0] ? data[0].price : 0;

            price = price ? price : store.currentTradeCoin.currentAmount;

            return NumberUtil.initNumber(price || 0, pointPrice);
        },

        // 最佳卖出价格，取得是买入盘第一个订单，越高越好
        parseBestSellPrice(data, pointPrice) {
            let price = data && data[0] ? data[0].price : 0;

            price = price ? price : store.currentTradeCoin.currentAmount;

            return NumberUtil.initNumber(price || 0, pointPrice);
        },

        parseEntrust(data, pointNum, pointPrice) {
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
        getTradeHistory() {
            let { baseCurrencyId, tradeCurrencyId } = store.tradePair;

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
            socket.off('userAccount');
        }
    }
}
