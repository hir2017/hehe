/**
 * @fileoverview K线图Javascript API 。展示最新2000条 ＋ 新的实时更新
 * @author 陈立英
 * @date 2018-05-22
 */
import { socket } from '../../../api/socket';
import { getTradingViewKline , getTradeKline } from '../../../api/http';
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
        this.historyData = {};
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
                    minmove2: 0,
                    "session": "24x7",
                    "description": symbolName,
                    "pricescale": 100,
                    fractional: false,
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

        console.log(`Requesting bars between ${new Date(rangeStartDate * 1000).toISOString()} and ${new Date(rangeEndDate * 1000).toISOString()}`)

        if (rangeStartDate > 0 && (rangeStartDate + "").length > 10) {
            throw "Got a JS time instead of Unix one.";
        }

        if (firstDataRequest) {
            rangeEndDate = parseInt(+new Date / 1000, 10);
        }

        var startDate = rangeStartDate * 1000;
        var endDate = rangeEndDate * 1000;
        var symbol = symbolInfo.ticker || '';

        let _resolution = this.getIntervalByPeriod(resolution);

        
        getTradeKline({
            symbol: symbolInfo.ticker || '',
            interval: _resolution,
            limit: 1440,
            startTime: startDate, 
            endTime: endDate
        }).then((res)=>{
            
            let data =  res.attachment;
            
            var bars = [];
            var meta = {
                noData: false,
            };

            if (res.status !== 200 || data.length == 0) {
                meta.noData = true;
            } else {
                for (var i = 0; i < data.length; ++i) {
                    let item = data[i];

                    var barValue = {
                        time: item.currentTime || +new Date(item.createTime.replace(/-/g, '/')),
                        close: Number(item.closePrice),
                        open: Number(item.openPrice),
                        high: Number(item.highPrice),
                        low: Number(item.lowPrice),
                        volume: Number(item.volume)
                    };

                    barValue.timeTxt = TimeUtil.formatDate(item.currentTime, 'yyyy-MM-dd HH:mm:ss');
                    bars[bars.length] = barValue
                }
            }

            this.historyData[_resolution] = {
                bars: bars,
                meta: meta,
                last: bars[bars.length-1],
                first: bars[0]
            }

            onHistoryCallback(bars, meta);
        })
    }

    getIntervalByPeriod(resolution) {
        switch (resolution + '') {
            case '0':
            case '1': // 1分钟
            case '5': // 5分钟
            case '10': // 10分钟
            case '30': // 30分钟
            case '60': // 60分钟
                return resolution;
                break;
            case '1D':
            case '5D':
            case '7D':
            case '1W':
            case '1M':
                return '70'; // 天
            default:
                return '1'; // 1秒
                break;
        }
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
        console.log('------subscribeBars-------', symbolInfo, resolution);

        var symbol = symbolInfo.ticker || '';

        let _resolution = this.getIntervalByPeriod(resolution);
        
        let fetch = () => {
            getTradeKline({
                symbol: symbol,
                interval: _resolution,
                limit: 1
            }).then((res) => {
                let data = res.attachment;

                let result =  this.historyData[resolution] || {};
                var bars = [];
                var meta = {
                    noData: false,
                };

                if (res.status !== 200 || data.length == 0) {
                    result.noData = true;
                } else {
                    let item = data[0];

                    var barValue = {
                        time: item.currentTime || +new Date(item.createTime.replace(/-/g, '/')),
                        close: Number(item.closePrice),
                        open: Number(item.openPrice),
                        high: Number(item.highPrice),
                        low: Number(item.lowPrice),
                        volume: Number(item.volume)
                    };

                    barValue.timeTxt = TimeUtil.formatDate(item.createTime, 'yyyy-MM-dd HH:mm:ss');
                    console.log(barValue.timeTxt);
                    onRealtimeCallback(barValue);
                }
            })
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                fetch();
            }, 3 * 1000)
        }

        this.timer && clearTimeout(this.timer);
        fetch();
    }
    /**
     * 取消订阅K线数据
     * @param {*Object} subscriberUID 
     */
    unsubscribeBars(subscriberUID) {
        console.log('------unsubscribeBars-------');
        this.destroy();
    }

    destroy(){
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