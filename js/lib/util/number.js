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
    },
    uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    },

    formatNumber(number, num) {
        if (number === '敬请期待') return '敬请期待'
        if (!number) return '0.00'
        let index = parseInt(num);
        if (/\./.test(`${number}`)) {
            let arr = `${number}`.split('.'),
                result = toThousands(arr[0])
            if (arr[1].length >= index) {
                return `${result}.` + `${arr[1]}`.slice(0, index)
            }

            let prics = arr[1]
            for (let i = 0; i < index - arr[1].length; i++) {
                prics += '0'
            }
            return number = `${result}.${prics}`
        }
        let result = toThousands(number)
        number = `${result}.`
        for (let j = 0; j < index; j++) {
            number += '0'
        }
        return number.replace(/(\.*$)/g, "")
    },

    initNumber(number, num) {
        if (number === '敬请期待') return '敬请期待'
        if (!number) return '0.00'
        
        let index = parseInt(num);

        if (/\./.test(`${number}`)) {
            let arr = `${number}`.split('.')
            if (arr[1].length >= index) {
                return `${arr[0]}.` + `${arr[1]}`.slice(0, index)
            }

            let prics = arr[1]
            for (let i = 0; i < index - arr[1].length; i++) {
                prics += '0'
            }
            return number = `${arr[0]}.${prics}`
        }

        number = `${number}.`

        for (let j = 0; j < index; j++) {
            number += '0'
        }
        return number.replace(/(\.*$)/g, "")
    }
};

export default NumberUtil;