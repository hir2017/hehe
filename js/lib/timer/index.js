import events from '../events';

let defaultOptions = {
    isEnd: false,
    // 剩余时间,单位s
    remainTime: 0,

    // 使用者需要监听的时间点,单位s
    listenPoint: 0,

    // 是否需要补齐两位,如8s -> 08(s)
    isDoubleBit: true,

    // 倒计时容器
    selector: {
        day: '',
        hour: '',
        minute: '',
        second: ''
    }
};

let Timer = function() {
    this.initialize.apply(this, arguments);
}

Timer.prototype = Object.assign({
    initialize(cfg) {
        this.options = Object.assign({}, defaultOptions, cfg);

        this.toListenPointed = false;

        this.toHook();
        this.startCountDown();
    },

    /**
     * dom钩子
     * @param void
     * @return void
     */
    toHook: function() {
        var self = this,
            selector = self.options.selector;

        self.dayWrap = $(selector.day);
        self.hourWrap = $(selector.hour);
        self.minuteWrap = $(selector.minute);
        self.secondWrap = $(selector.second);

    },
    /**
     * 分割剩余时间，天、时、分、秒
     * @param time {number} 时间,单位s
     * @return result {object}
     *      @key day {string|number} 天
     *      @key hour {string|number} 时
     *      @key minute {string|number} 分
     *      @key second {string|number} 秒
     */
    splitTime(time) {

        var self = this,
            day = Math.floor(time / 86400),
            hour = Math.floor(time % 86400 / 3600),
            minute = Math.floor(time % 86400 % 3600 / 60),
            second = Math.floor(time % 86400 % 3600 % 60);

        return {
            day: day >= 0 ? day : 0,
            hour: hour >= 0 ? hour : 0,
            minute: minute >= 0 ? minute : 0,
            second: second >= 0 ? second : 0
        }

    },

    /**
     * 是否需要某个时间维度
     * @param key {string} 时间维度,day.
     * @return boolean
     */
    isNeed: function(key) {
        return this[key + 'Wrap'].length > 0
    },

    /**
     * 合并剩余时间到秒
     * @param time {object} 时间
     *      @key day {string|number} 天
     *      @key hour {string|number} 时
     *      @key minute {string|number} 分
     *      @key second {string|number} 秒
     * @return result {number} 
     
     */
    combineTime(time) {
        return time.day * 86400 + time.hour * 3600 + time.minute * 60 + time.second;
    },

    /**
     * 格式化时间(补齐两位)
     * @param time {object} 未补齐两位的时间对象
     *      @key day {string|number} 天
     *      @key hour {string|number} 时
     *      @key minute {string|number} 分
     *      @key second {string|number} 秒
     * @return time
     */
    formatTime(time) {
        var self = this;
        for (var i in time) {
            time[i] = self.addBit(time[i]);
        }
        return time;
    },

    /**
     * 渲染剩余时间到dom
     * @param result {object} 时间对象
     *      @key day {string|number} 天
     *      @key hour {string|number} 时
     *      @key minute {string|number} 分
     *      @key second {string|number} 秒
     * @return void
     */
    render(result) {
        var self = this;
        
        self.isNeed('day') && self.dayWrap.html(result.day);
        self.isNeed('hour') && self.hourWrap.html(result.hour);
        self.isNeed('minute') && self.minuteWrap.html(result.minute);
        self.isNeed('second') && self.secondWrap.html(result.second);
    },

    /**
     * 增加位数
     * @param num {number} 数字
     * @return result {string}
     */
    addBit(num) {
        return num < 10 ? '0' + num : num;
    },

    /**
     * 开始倒计时
     * @param void
     * @param {Boolean} flag 内部参数，用来判断是否正在跳动
     * @return void
     */
    startCountDown(flag) {
        var self = this,
            localTimeStamp = new Date().getTime(),
            isDoubleBit = this.options.isDoubleBit,
            localTimeGap,
            now,
            realRemainTime,
            splitTime,
            isToListenPoint,
            renderData,
            isEnd;

        self.countDown && clearTimeout(self.countDown);
        self.countDown = setTimeout(function() {
            localTimeGap = new Date().getTime() - localTimeStamp;
            realRemainTime = self.options.remainTime - localTimeGap / 1000;

            // 设置真正的剩余时间
            self.options.remainTime = realRemainTime;
            // self.set('remainTime', realRemainTime);

            splitTime = self.splitTime(realRemainTime);

            renderData = isDoubleBit ? self.formatTime(splitTime) : splitTime;

            self.render(renderData);

            self.emit('tick', {
                remainTime: realRemainTime,
                serverTime: new Date().getTime() / 1000
            });

            isEnd = self.isEnd(splitTime);
            isToListenPoint = self.isToListenPoint(splitTime);

            self.options.isEnd = isEnd;

            if (isEnd) {
                self.emit('end');
                return;
            }

            if (!self.toListenPointed && isToListenPoint) {
                self.emit('toListenPoint', {
                    point: splitTime
                });
                self.toListenPointed = true;
            }

            // 重新呼叫此方法启动演示器
            self.startCountDown(true);
        }, flag ? 1000 : 0);
    },
    /**
     * 判断当前倒计时是否到监听的时间点
     * @param realTime {object} 参考render参数
     * @return boolean
     */
    isToListenPoint: function(realTime) {
        var self = this,
            listenPoint = self.options.listenPoint,
            realTime = self.combineTime(realTime);

        return realTime <= listenPoint
    },

    /**
     * 判断当前倒计时是否结束
     * @param realTime {object} 参考render参数
     * @return boolean
     */
    isEnd(realTime) {
        return realTime.second <= 0 && realTime.minute == 0 && realTime.hour == 0 && realTime.day == 0
    },

    destroys() {
        clearTimeout(this.countDown);
    },

    destroy() {
        clearTimeout(this.countDown);
    }

}, events)

export default Timer;