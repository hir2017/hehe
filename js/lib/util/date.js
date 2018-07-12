/**
 * 时间处理工具
 */
const TimeUtil = {
    /** 
     * 格式化时间
     * @param time  时间。1. 时间戳：1407897620000；2: 字符串：2014/12/12 12:00:00
     *        new Date(1407897620000)、new Date()、new Date('2014/12/12 12:00:00')
     * @param pattern {String} 格式化模板（默认："yyyy-MM-dd HH:mm:ss"）
     * @param hourType {number} 小时制。12小时、24小时。默认24小时制
     * @return {String} 格式化后的文本 
     **/
    formatDate: function(time, pattern, hourType) {
        var dateObj = new Date(this.build(time));

        hourType = hourType || 24;

        if (!pattern) {
            pattern = "yyyy-MM-dd HH:mm:ss";
        }
        var val, result, hour, minute, second;
        var func = function(matched) {
            return matched.length == 2 && val < 10 ? ("0" + val) : val;
        };

        result = pattern.replace(/y{2,4}/, dateObj.getFullYear()); // the year
        val = dateObj.getMonth() + 1; // the month
        result = result.replace(/M{1,2}/, func);
        val = dateObj.getDate(); // the date
        result = result.replace(/d{1,2}/, func);

        if (hourType == 12) {
            val = hour = dateObj.getHours(); // the hour

            let isAm = 1;

            if (val > 12) {
                result = result.replace(/H{1,2}/, function(matched) {
                    if (matched.length == 2) {
                        if (val > 12) {
                            val = val - 12;
                            if (val < 10) {
                                val = '0' + val;
                            }
                            isAm = 0;
                        } else if (val < 10) {
                            val = '0' + val;
                            isAm = 1;
                        }
                    }
                    return val;
                });
                val = minute = dateObj.getMinutes(); // the minute
                result = result.replace(/m{1,2}/, func);
                val = second = dateObj.getSeconds(); // the second
                result = result.replace(/s{1,2}/, func);
            } else {
                result = result.replace(/H{1,2}/, func);
                val = minute = dateObj.getMinutes(); // the minute
                result = result.replace(/m{1,2}/, func);
                val = second = dateObj.getSeconds(); // the second
                result = result.replace(/s{1,2}/, func);
            }

            if (isAm) {
                if (hour == 0 && minute == 0 && second == 0) {
                    dateObj = new Date(time);
                    result = pattern.replace(/y{2,4}/, dateObj.getFullYear()); // the year
                    val = dateObj.getMonth() + 1; // the month
                    result = result.replace(/M{1,2}/, func);
                    val = dateObj.getDate(); // the date
                    result = result.replace(/d{1,2}/, func);
                    val = hour = 12;
                    result = result.replace(/H{1,2}/, func);
                    val = minute = 0; // the minute
                    result = result.replace(/m{1,2}/, func);
                    val = 0; // the second
                    result = result.replace(/s{1,2}/, func);
                    result += 'am';
                } else {
                    result += 'am';
                }
            } else {
                result += 'pm';
            }
        } else {
            val = hour = dateObj.getHours(); // the hour
            result = result.replace(/H{1,2}/, func);
            val = minute = dateObj.getMinutes(); // the minute
            result = result.replace(/m{1,2}/, func);
            val = second = dateObj.getSeconds(); // the second
            result = result.replace(/s{1,2}/, func);
        }

        return result;
    },

    build: function(time) {
        var builtTime;

        switch (typeof(time)) {
            case 'number':
                builtTime = new Date(parseInt(time));
                break;
            case 'string':
                // ios下，时间格式为2012-12-12会报错，解决方案: 2012-12-12 ==> 2012/12/12
                builtTime = Number(time) ? arguments.callee(parseInt(time)) : new Date(time.replace(/-/g, '/'));
                break;
            default:
                builtTime = time instanceof Date ? time : new Date();
        }

        if (builtTime == 'Invalid Date') {
            throw new Error('[TimeFormater]: Invalid Date!');
        }

        return builtTime;
    },

    /**
     * 根据当前时间，判断时间是今天、明天还是昨天
     * @param  {[type]} time    [description]
     * @param  {[type]} current [description]
     * @return {[type]}
     */
    parseDayStyle: function(time, current) {
        var date = this.formatDate(time, 'yyyy-MM-dd'),
            currentDate = this.formatDate(current, 'yyyy-MM-dd'),
            val = (this.build(date) - this.build(currentDate)) / (1000 * 60 * 60 * 24);

        if (val == 0) {
            return '今天';
        } else if (val == -1) {
            return '昨天';
        } else if (val == 1) {
            return '明天'
        }
    },

    /*
     * 处理时间，接受一个参数，参数从0开始
     * 返回值：当前时间的第n天
     */
    getBeforeDate(n) {
        let num = n || 0,
            d = new Date(),
            year = d.getFullYear(),
            mon = d.getMonth() + 1,
            day = d.getDate(),
            s = null;
        
        if (day <= num) {
            if (mon > 1) {
                mon = mon - 1;
            } else {
                year = year - 1;
                mon = 12;
            }
        }

        d.setDate(d.getDate() - num);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        
        return s;
    }
}

window.TimeUtil = TimeUtil;
export default TimeUtil;