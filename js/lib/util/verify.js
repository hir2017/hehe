/**
 * 验证
 */
const VerifyRules = {
    required: function(value, arg, info) {
        if (value === '') return [false, info ? info : '亲，此项目为必填项。'];
        return [true];
    },
    name: function(value, arg, info) {
        if (value === '') return [true];
        if (/^[\/\u4E00-\u9FA5A-Za-z]+$/.test(value)) {
            return [true];
        }
        return [false, info ? info : '姓名只能由中文或英文字母组成，请检查是否存在其它字符。'];
    },
    length: function(value, arg, info) {
        if (value === '') return [true];
        if (value.length === 0) return [true];
        if (arg[0] && value.length < arg[0]) return [false, info ? info : '亲，长度至少需要' + arg[0] + '。'];
        if (arg[1] && value.length > arg[1]) return [false, info ? info : '亲，长度最多不能超过' + arg[1] + '。'];
        return [true];
    },
    email: function(value, arg, info) {
        if (value === '') return [true];
        if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
            return [true];
        }
        return [false, info ? info : '亲，请输入正确的email格式。'];
    },
    english: function(value, arg, info) {
        if (value === '') return [true];
        if (/^[A-Za-z]+$/.test(value)) {
            return [true];
        }
        return [false, info ? info : '亲，这里只能输入英文字母。'];
    },
    mobile: function(value, arg, info) {
        if (value === '') return [true];
        if (/^[0-9\-]*$/.test(value)) {
            return [true];
        }
        return [false, info ? info : '手机号码必须为数字。'];
    },
    range: function(value, range, info) {
        if (value === '') return [true];
        var min = range[0],
            max = range[1];
        var errInfo = info ? info : '亲，只能在{min}至{max}之间。';

        if (min && value < min || max && value > max) {
            return [false, S.substitute(errInfo, { min: min, max: max })];
        }
        return [true];
    },
    number: function(value, arg, info) {
        if (value === '') return [true];
        if (/^\d+$/.test(value)) return [true];
        return [false, info ? info : '亲，只能输入数字。'];
    },
    date: function(value, arg, info) {
        if (value === '') return [true];
        if (/^(\d{4})(-|\/)(\d{2})\2(\d{2})$/.test(value)) return [true];
        return [false, info ? info : '请填写正确的日期格式：YYYY-MM-DD。'];
    },
    pattern: function(value, arg, info) {
        if (value === '') return [true];
        if (new RegExp(arg[0]).test(value)) return [true];
        return [false, info ? info : '亲，输入格式有误。'];
    }
};

export default VerifyRules;