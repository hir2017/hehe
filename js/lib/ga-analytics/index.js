// 数据统计
// 国外 google统计
/*
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-128599443-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-128599443-1');
</script>

*/

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
})(window, document, 'script', `https://www.googletagmanager.com/gtag/js?id=${UPEX.config.gtagId}`, 'gtag');

window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', UPEX.config.gtagId);

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

        if (typeof gtag != 'undefined') {
            this._add(obj, 1); // 统计所有

            if (prefix) {
                // 统计不同渠道
                obj.eventName = prefix + ' ' + obj.eventName;
                this._add(obj);
            }
        } else {
            this.cacheList.push(obj);
        }
    },

    _add(obj, isAll) {
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
        gtag('send', sendObj);
    },

    // 允许TD做更多的参数收集
    addVerbone(obj) {
        if (typeof gtag != 'undefined') {
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

            gtag('send', sendObj);
        } else {
            this.cacheRichList.push(obj);
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
    },
    openPage(pathname) {
        let str = pathname;
        try {
            str = pathname.replace(/\/\w{1}/g, function(str, i) {
                return str[1].toUpperCase();
            });
            str = str.replace(/\-\w{1}/g, function(str, i) {
                return str[1].toUpperCase();
            });
            // 首字母降级
            str = str.replace(/\w{1}/i, function(str, i) {
                return str.toLocaleLowerCase();
            });
        } catch (error) {
            console.error('ga openPage', error);
        }
        gtag &&
            gtag('event', 'openPage', {
                event_category: str,
                event_label: ''
            });
    },
    click(category) {
        gtag &&
            gtag('event', 'click', {
                event_category: category,
                event_label: ''
            });
    }
};

$.channel.on('analyticsSeedLoaded', () => {
    DA.addPreviousCache();
    DA.clearCacheList();
    DA.addPreviousRichCache();
    DA.clearCacheRichList();
});

export default DA;
