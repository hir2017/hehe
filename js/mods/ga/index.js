// 数据统计
// 国内 talkingdata 国外 google统计

import url from '@/lib/url';

let analyticsType;

// 国内
analyticsType = 'GA';
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    (i[r] =
        i[r] ||
        function() {
            (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    a.async = 1;
    a.onload = () => {
        $.channel.emit('analyticsSeedLoaded');
    };
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

let GACode = UPEX.config.GACodeData;
ga('create', GACode, 'auto');
ga('send', 'pageview');

let DA = {
    // 用于存放JS尚未加载的缓存事件列表
    // js加载完成后，依次发送到对应服务
    cacheList: [],

    cacheRichList: [],

    add(obj) {
        let prefix;

        if (UP.Global.marketChannel) {
            prefix = UP.Global.marketChannel;
        }
        if (url.query('debug')) {
            return;
        }
        if (analyticsType == 'TD') {
            // js已加载完成
            if (typeof TDAPP != 'undefined') {
                this._add(obj, 1); // 统计所有

                if (prefix) {
                    // 统计不同渠道
                    obj.eventName = prefix + obj.eventName;
                    this._add(obj);
                }
            } else {
                this.cacheList.push(obj);
            }
        } else if (analyticsType == 'GA') {
            if (typeof ga != 'undefined') {
                this._add(obj, 1); // 统计所有

                if (prefix) {
                    // 统计不同渠道
                    obj.eventName = prefix + ' ' + obj.eventName;
                    this._add(obj);
                }
            } else {
                this.cacheList.push(obj);
            }
        }
    },

    _add(obj, isAll) {
        if (analyticsType == 'TD') {
            let event;
            if (isAll) {
                event = obj.eventName;
            } else {
                event = obj.label ? obj.eventName + ' ' + obj.label : obj.eventName;
            }

            event = event.replace(/\s/g, '');

            TDAPP.onEvent(event);
        } else if (analyticsType == 'GA') {
            let sendObj = {
                hitType: 'event',
                eventCategory: obj.eventName,
                eventAction: obj.action
            };

            if (obj.label) {
                sendObj.eventLabel = obj.label;
            }

            if (obj.value) {
                sendObj.eventValue = obj.value;
            }
            ga('send', sendObj);
        }
    },

    // 允许TD做更多的参数收集
    addVerbone(obj) {
        if (analyticsType == 'TD') {
            if (typeof TDAPP != 'undefined') {
                TDAPP.onEvent(obj.eventName, obj.label, obj.param);
            } else {
                this.cacheRichList.push(obj);
            }
        } else if (analyticsType == 'GA') {
            if (typeof ga != 'undefined') {
                let sendObj = {
                    hitType: 'event',
                    eventCategory: obj.eventName,
                    eventAction: obj.action || 'show'
                };

                if (obj.label) {
                    sendObj.eventLabel = obj.label;
                }

                if (obj.value) {
                    sendObj.eventValue = obj.value;
                }

                ga('send', sendObj);
            } else {
                this.cacheRichList.push(obj);
            }
        }
    },

    addPreviousCache() {
        this.cacheList.forEach((item, inx) => {
            this._add(item);
        });
    },

    clearCacheList() {
        this.cacheList = [];
    },

    addPreviousRichCache() {
        this.cacheRichList.forEach((item, inx) => {
            this.addVerbone(item);
        });
    },

    clearCacheRichList() {
        this.cacheRichList = [];
    }
};

$.channel.on('analyticsSeedLoaded', () => {
    DA.addPreviousCache();
    DA.clearCacheList();
    DA.addPreviousRichCache();
    DA.clearCacheRichList();
});

export default DA;
