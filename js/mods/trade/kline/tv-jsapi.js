/**
 * @fileoverview K线图Javascript API
 * @author 陈立英
 * @date 2018-05-22
 */
import { socket } from '../../../api/socket';
import { getTradingViewKline } from '../../../api/http';
import TimeUtil from '../../../lib/util/date';

const defaultConfiguration = {
    symbols_types: [],
    supported_resolutions: [1, 5, 15, 30, 60, 240, "1D", "5D", "1W", "1M"],
    supports_marks: !1,
    supports_timescale_marks: !1,
    supports_time: !0,
    exchanges: [],
    supports_search: false,
    supports_group_request: true,
};

class UDFCompatibleDatafeed {
    /**
     * 初始化对象数据
     */
    constructor(cfg) {
        cfg = cfg || {};
        this.configurationData = defaultConfiguration;
        this.serverTime = null;
        this.symbol = cfg.symbol || '';
        this.currencyNameEn = cfg.currencyNameEn;
        this.baseCurrencyNameEn = cfg.baseCurrencyNameEn;
        this.pointPrice = cfg.pointPrice;
        this.timezone = cfg.timezone;
        this.resolution = '';
        this.cacheResult = {};
    }
    /**
     * 此方法旨在提供填充配置数据的对象。这些数据会影响图表的行为表现
     */
    onReady(callback) {
        var that = this;
        callback(that.configurationData);
    }
    /**
     * 通过商品名称解析商品信息
     * @param {*String 商品名称或ticker} symbolName 
     * @param {*Function(SymbolInfo)} onSymbolResolvedCallback 
     * @param {*Function(reason)} onResolveErrorCallback 
     */
    resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        var self = this;


        setTimeout(() => {
            try {
                // 从接口获取商品名称或者代码.
                onSymbolResolvedCallback({
                    "name": symbolName,
                    "ticker": [this.baseCurrencyNameEn, this.currencyNameEn].join('_').toLocaleLowerCase(),
                    "timezone": "Asia/Shanghai",
                    "minmov": 1,
                    "session": "24x7",
                    "description": "",
                    "pricescale": this.pointPrice,
                    "has_intraday": true,
                    "has_daily": !0,
                    "has_weekly_and_monthly": !0
                });
            } catch (e) {
                console.log(e.message);
            }
        }, 0)

    }

    /**
     * 
     * @param {*Object 商品信息对象} symbolInfo 
     * @param {*String 分辨率} resolution 
     * @param {*Number 时间戳、最左边请求的K线时间} from 
     * @param {*Number 时间戳、最右边请求的K线时间} to 
     * @param {*Function(数组bars,meta={ noData = false })} onHistoryCallback  图表库希望通过onHistoryCallback仅一次调用
     * @param {*Function(reason：错误原因)} onErrorCallback 
     * @param {*Boolean 以标识是否第一次调用此商品/分辨率的历史记录} firstDataRequest 
     */
    getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onHistoryCallback, onErrorCallback, firstDataRequest) {
        console.log('------getBars-------', symbolInfo, resolution);

        if (rangeStartDate > 0 && (rangeStartDate + "").length > 10) {
            throw "Got a JS time instead of Unix one.";
        }

        if (firstDataRequest) {
            rangeEndDate = parseInt(+new Date / 1000, 10);
        }

        var startDate = rangeStartDate * 1000;
        var endDate = rangeEndDate * 1000;

        let _resolution = this.getIntervalByPeriod(resolution);

        var requestParams = {
            symbol: symbolInfo.ticker || '',
            resolution: _resolution,
            from: startDate,
            to: endDate,
        }

        // if (this.cacheResult[_resolution]) {
        //     return;
        // }

        // if (_resolution !== this.resolution) {
        if (firstDataRequest) {
            this.getHistoryData(requestParams)
                .then((result) => {
                    onHistoryCallback(result.bars, result.meta);
                })
        }

        // this.resolution = _resolution;

        // setTimeout(() => {
        //     this.getIntervalHistoryData(requestParams.symbol, requestParams.resolution);
        // }, 1 * 1000)
        // }
    }

    getIntervalByPeriod(resolution) {
        switch (resolution) {
            case '1D':
            case '5D':
            case '7D':
            case '1W':
            case '1M':
                return '1D'; // 天
            default:
                return '1'; // 1秒
                break;
        }
    }

    getIntervalHistoryData(symbol, resolution) {

        let fetch = () => {
            getTradingViewKline(symbol, resolution, 1).then((res) => {
                let data = res.attachment;

                if (data.s !== 'ok' && data.s !== 'no_data') {
                    return;
                }

                var bars = [];
                var meta = {
                    noData: false,
                };

                if (data.s === 'no_data' || data.c.length == 0) {
                    meta.noData = true;
                    meta.nextTime = data.nextTime; // 只有在请求的时间段内没有数据时，才应该被设置
                } else {
                    var volumePresent = data.v !== undefined;
                    var ohlPresent = data.o !== undefined;

                    for (var i = 0; i < data.t.length; ++i) {
                        var barValue = {
                            time: data.t[i],
                            close: Number(data.c[i]),
                            open: Number(data.c[i]),
                            high: Number(data.c[i]),
                            low: Number(data.c[i]),
                        };

                        if (ohlPresent) {
                            barValue.open = Number(data.o[i]);
                            barValue.high = Number(data.h[i]);
                            barValue.low = Number(data.l[i]);
                        }

                        if (volumePresent) {
                            barValue.volume = Number(data.v[i]);
                        }

                        barValue.timeTxt = TimeUtil.formatDate(new Date(data.t[i]), 'yyyy-MM-dd HH:mm:ss');

                        if (barCache.length > 0) {
                            if (barValue.time < barCache[0].time) {
                                barCache = [barValue].concat(barCache);
                            } else if (barValue.time > barCache[barCache.length - 1].time) {
                                barCache[barCache.length] = barValue;
                            } else if (barValue.time == barCache[barCache.length - 1].time) {
                                barCache[barCache.length - 1] = barValue;
                            }
                        } else {
                            barCache[barCache.length] = barValue;
                        }

                        bars.push(barValue);
                    }
                }

                this.cacheResult[params.resolution] = {
                    bars: barCache,
                    meta: meta
                };

                defer.resolve({
                    bars: bars,
                    meta: meta,
                });
            })
        }

        fetch();

        this.timer = setTimeout(() => {
            this.getIntervalHistoryData(symbol, resolution);
        }, 60 * 1000)
    }
    /**
     * 
     */
    getHistoryData(params) {
        let defer = $.Deferred();


        socket.off('tradingView');
        socket.emit('tradingView', params);
        socket.on('tradingView', (data) => {

            // if (!this.cacheResult[params.resolution]) {
            //     this.cacheResult[params.resolution] = {
            //         bars: [],
            //         meta: ''
            //     };
            // }

            // let barCache = this.cacheResult[params.resolution].bars;

            if (data.s !== 'ok' && data.s !== 'no_data') {
                defer.reject(data.errmsg);
                return;
            }

            var bars = [];
            var meta = {
                noData: false,
            };

            if (data.s === 'no_data' || data.c.length == 0) {
                meta.noData = true;
                meta.nextTime = data.nextTime; // 只有在请求的时间段内没有数据时，才应该被设置
            } else {
                var volumePresent = data.v !== undefined;
                var ohlPresent = data.o !== undefined;

                for (var i = 0; i < data.t.length; ++i) {
                    var barValue = {
                        time: data.t[i],
                        close: Number(data.c[i]),
                        open: Number(data.c[i]),
                        high: Number(data.c[i]),
                        low: Number(data.c[i]),
                    };
                    // console.log(TimeUtil.formatDate(barValue.time, 'yyyy-MM-dd HH:mm:ss'), barValue);
                    if (ohlPresent) {
                        barValue.open = Number(data.o[i]);
                        barValue.high = Number(data.h[i]);
                        barValue.low = Number(data.l[i]);
                    }

                    if (volumePresent) {
                        barValue.volume = Number(data.v[i]);
                    }

                    barValue.timeTxt = TimeUtil.formatDate(new Date(data.t[i]), 'yyyy-MM-dd HH:mm:ss');

                    // if (barCache.length > 0) {
                    //     if (barValue.time < barCache[0].time) {
                    //         barCache = [barValue].concat(barCache);
                    //     } else if (barValue.time > barCache[barCache.length - 1].time) {
                    //         barCache[barCache.length] = barValue;
                    //     } else if (barValue.time == barCache[barCache.length - 1].time) {
                    //         barCache[barCache.length - 1] = barValue;
                    //     }
                    // } else {
                    //     barCache[barCache.length] = barValue;
                    // }

                    bars.push(barValue);
                }
            }

            this.cacheResult[params.resolution] = {
                bars: bars,
                meta: meta
            };

            defer.resolve({
                bars: bars,
                meta: meta,
            });

        })

        return defer.promise();

    }
    /**
     * 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据
     * @param {*Object 商品信息对象} symbolInfo 
     * @param {*String 分辨率} resolution 
     * @param {*Function(bar) bar: object{time, close, open, high, low, volume}} onRealtimeCallback 
     * @param {*Object} subscriberUID 
     * @param {*Function()将在bars数据发生变化时执行} onResetCacheNeededCallback 
     */
    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
        console.log('------subscribeBars-------');
    }
    /**
     * 取消订阅K线数据
     * @param {*Object} subscriberUID 
     */
    unsubscribeBars(subscriberUID) {
        console.log('------unsubscribeBars-------');
        socket.off('tradingView');
        this.timer && clearTimeout(this.timer);
    }
    /**
     * 当图表需要知道服务器时间时则调用此函数
     * @param {*Function(unixTime)} callback 
     */
    getServerTime(callback) {
        console.log('------getServerTime-------');
        if (!this.configurationData.supports_time) {
            return;
        }
        // 获取服务器时间
        socket.emit('serverTime')
        socket.on('serverTime', function(data) {
            let serverTime = parseInt(data / 1000, 10);
            console.log('=====', serverTime);
            callback(serverTime);
        })
    }
}

export default UDFCompatibleDatafeed;