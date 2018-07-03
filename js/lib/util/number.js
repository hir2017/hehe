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
    /**
     * @param { String|Number } number [要处理的数字]
     * @param { Number } num 保留小数点后几位
     */
    formatNumber(number, num) {
        if (typeof number == 'undefined') {
            return '--';
        }
        let length = parseInt(num, 10);

        number = this.asDecimal(number, length); // 保留小时后N位，四舍五入

        number = this.separate(number); // ,分隔符号数字

        return number;
    },

    initNumber(number, num) {
        if (typeof number == 'undefined') {
            return '--';
        }

        let length = parseInt(num, 10);

        number = this.asDecimal(number, length);

        return number;
    },

    parseStringToInt() {

    },
    /**
     * 截取N位小数（非四舍五入）
     * @param num {Number} 数字
     * @param digit {Number} 位数
     * @return {String} 截取后的数字
     */
    toFixed: function(num, digit)
    {
        var str = "" + num, idx = str.indexOf(".") + digit + 1;
        if (idx > digit && idx < str.length)  // 超过N位小数
        {
            num = str.substring(0, idx);  // 截取N位小数
        }
        return parseFloat(num).toFixed(digit);
    }, 
    /**
     * 保留小数位
     * roundtag:舍入参数，默认"round" 四舍五入； "ceil" 向上取, "floor"向下取,
     */
    asDecimal(number, decimals = 2, roundtag = 'round') {
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        roundtag = roundtag || "round";
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            dec = '.',
            s = '';
        var toFixedFix = (n, prec) => {
            var k = Math.pow(10, prec);
            return '' + parseFloat(Math[roundtag](parseFloat(this.mul(n, k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
        };
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    },
    /**
     * 百分数
     */
    asPercent(value, decimals = 2) {
        let unit;

        value = Number(value);

        unit = value >= 0 ? '+' : '';

        return unit + value.toFixed(decimals) + '%'
    },

    /**
     * 浮点数乘法运算（消除bug）
     * @name mul
     * @memberOf tool
     */
    mul(num1, num2) {
        var reg = /\./i;
        if (!reg.test(num1) && !reg.test(num2)) {
            return num1 * num2;
        }
        var len = 0,
            str1 = num1.toString(),
            str2 = num2.toString();
        if (str1.indexOf('.') >= 0) {
            len += str1.split('.')[1].length;
        }
        if (str2.indexOf('.') >= 0) {
            len += str2.split('.')[1].length;
        }
        return Number(str1.replace('.', '')) * Number(str2.replace('.', '')) / Math.pow(10, len);　　
    },

    scientificToNumber(num) {
        console.log(num);
        var str = num.toString();
        var reg = /^(\d+)(e)([\-]?\d+)$/;
        var arr, len,
            zero = '';

        /* 6e7或6e+7 都会自动转换数值 */
        if (!reg.test(str)) {
            return num;
        } else {
            /* 6e-7 需要手动转换 */
            arr = reg.exec(str);
            len = Math.abs(arr[3]) - 1;
            for (var i = 0; i < len; i++) {
                zero += '0';
            }

            return '0.' + zero + arr[1];
        }
    },
    // 小数相加
    add(num1, num2) {
        const _Len = (arr) => {
            return arr[1] ? arr[1].length : 0;
        }
        const _toStr = (num) => {
            return num.toString().split('.');
        }
        const _add = (...params) => {
            if(params.length === 3) {
                let _lens = params[2];
                return parseInt(params[0]) * Math.pow(10, _lens[0])  + parseInt(params[1])  * Math.pow(10, _lens[1]);
            }
            return parseInt(params[0]) + parseInt(params[1]);
        }
        let [arr1, arr2] = [_toStr(num1), _toStr(num2)];
        let [len1, len2] = [_Len(arr1), _Len(arr2)];
        const len = Math.max(len1, len2);
        let result = [_add(arr1[0], arr2[0]), _add(arr1[1] || 0, arr2[1] || 0, [len - len1, len - len2])];
        return parseInt(result[0]) + parseInt(result[1])/Math.pow(10, len);
    }

};

window.NumberUtil = NumberUtil;

export default NumberUtil;
