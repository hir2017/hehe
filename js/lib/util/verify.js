/**
 * 验证
 */
const VerifyRules = {
    required: function(value, info) {
        if (value === '') return [false, info ? info : UPEX.lang.template('此项目为必填项')];
        return [true];
    },

    name: function(value, info) {
        if (value === '') return [true];
        if (/^[\/\u4E00-\u9FA5A-Za-z]+$/.test(value)) {
            return [true];
        }
        return [false, info ? info : UPEX.lang.template('姓名只能由中文或英文字母组成，请检查是否存在其它字符。')];
    },

    length: function(value, arg, info) {
        if (value === '') return [true];
        if (value.length === 0) return [true];
        if (arg[0] && value.length < arg[0]) return [false, info ? info : UPEX.lang.template('长度至少需要{length}', { length: arg[0]})];
        if (arg[1] && value.length > arg[1]) return [false, info ? info : UPEX.lang.template('长度最多不能超过{length}', { length: arg[1]})];
        return [true];
    },

    email: function(value, info) {
        if (value === '') return [true];
        if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
            return [true];
        }
        return [false, info ? info : UPEX.lang.template('请填写正确的邮箱地址')];
    },

    english: function(value, info) {
        if (value === '') return [true];
        if (/^[A-Za-z]+$/.test(value)) {
            return [true];
        }
        return [false, info ? info : UPEX.lang.template('只能输入英文字母')];
    },

    mobile: function(value, info) {
        if (value === '') return [true];
        if (/^[0-9\-]*$/.test(value)) {
            return [true];
        }
        return [false, info ? info : UPEX.lang.template('请填写正确的手机号')];
    },

    range: function(value, range, info) {
        if (value === '') return [true];
        var min = range[0],
            max = range[1];
        var errInfo = info ? info : UPEX.lang.template('只能在{min}至{max}之间');

        if (min && value < min || max && value > max) {
            let data = {
                min: min, 
                max: max
            }
            errInfo = errInfo.replace(/\{([\s\S]+?)\}/ig, function($0, $1) {
                return data[$1];
            });
            return [false, errInfo];
        }

        return [true];
    },

    number: function(value, info) {
        if (value === '') return [true];
        
        if (/^\d+$/.test(value)) return [true];
        
        return [false, info ? info : UPEX.lang.template('只能输入数字')];
    },

    loginpassword: function(value, info) {
        if (value === '') return [true];
        
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d\S]{8,16}$/.test(value)) return [true];
        
        return [false, info ? info : UPEX.lang.template('密码至少由大写字母+小写字母+数字，8-16位组成')];
    },

    equalPassword: function(pwd, twicePwd, info){
        if (twicePwd == '') return [true];
        
        if (twicePwd && twicePwd !== pwd) {
            return [false, info ? info : UPEX.lang.template('两次密码输入不一致')]
        } 
        
        return [true];
    },

    date: function(value, info) {
        if (value === '') return [true];
        if (/^(\d{4})(-|\/)(\d{2})\2(\d{2})$/.test(value)) return [true];
        return [false, info ? info : UPEX.lang.template('请填写正确的日期格式：YYYY-MM-DD。')];
    }
};


export default VerifyRules;