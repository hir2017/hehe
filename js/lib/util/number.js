const NumberUtil = {
    /**
     * 补0
     * @param  {Number} num    [要处理的数字]
     * @param  {Number} digits [要处理的位数]
     * @example
     *      prefixedNum(1,1); // 01
     *      prefixedNum(1,2); // 001
     */
    prefixed: function(num, digits) {
        var zeroStr = [];
        num = (typeof(num) == 'undefined' ? '' : num);
        for (var i = 0; i < digits; ++i) {
            zeroStr.push(0);
        }

        return zeroStr.join('').substr(0, digits - num.toString().length) + num;
    },
    /**
     * 分隔数字
     * @param  {String|Number} str       [要处理的数字]
     * @param  {String} separator [分隔符号]
     * @example
     *      getSeparatedNum('900020'); // 900,020
     */
    separate: function(str, separator) {
        str = (typeof(str) == 'undefined' ? '' : str) + '';
        separator = separator || ',';

        return str.replace(/(\d+)(\.\d+)?/g, function(num, a, b) {
            return (a.length > 3 ? (a.indexOf(separator) < 0 || a.indexOf(separator) > 3 ? a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : a) : a) + (b || '');
        });
    },
    /**
     * 将一维数组转为二维数组
     * @param { array } data 数组
     * @param { number } rowNum 数组的长度
     */
    splitData(data, rowNum) {
        let result = [];
        let rowArr = [];
        let len = data.length;
        let rest = len % rowNum; // 余数 

        if (rest !== 0) {
            len = data.length - rest;
        }

        for (let i = 0; i < len; i++) {
            rowArr.push(data[i])

            if ((i + 1) % rowNum === 0) {
                result.push(rowArr)
                rowArr = []
            }
        }

        if (data.length > len) {
            result.push(data.slice(len))
        }

        return result
    },

    formatPrice(value, num) {
        let ret = 0;

        if (typeof value !== 'undefined') {
            ret = value.toFixed(num);
        }

        return ret;
    }
};

export default NumberUtil;