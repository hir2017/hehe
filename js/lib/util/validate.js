// 数字验证
export function isNumber(str) {
    try {
        return /^[0-9]*$/.test(str);
    } catch (error) {
        console.error('validate isNumber', error);
        return false;
    }
}
// 手机验证
// 现阶段只检测是否是数字, 后续拓展
export function isPhone(str) {
    try {
        return /^[0-9]*$/.test(str);
    } catch (error) {
        console.error('validate isPhone', error);
        return false;
    }
}

// 检测是否是数字或字母
export function isNumberOrCode(str) {
    try {
        return /^[A-Za-z0-9]+$/.test(str);
    } catch (error) {
        console.error('validate isNumberOrCode', error);
        return false;
    }
}

// 检测是否是数字或大写字母
export function isNumberOrUpCaseCode(str) {
    try {
        return /^[A-Z0-9]+$/.test(str);
    } catch (error) {
        console.error('validate isNumberOrCode', error);
        return false;
    }
}

/**
 * 检测长度
 * @param {*} str : String 输入字符串
 * @param {*} param : Number|Object[min, max] 判断参数
 */
export function checkLength(str, param) {
    try {
        let _str = str.replace(/[\u4e00-\u9fa5]/g, 'aa');
        if(typeof param === "number") {
            return _str.length > param;
        }
        if(typeof param === "object") {
            return _str.length > param.min && _str.length > param.max;
        }
        return false;
    } catch (error) {
        console.error('validate checkLength', error);
        return false;
    }
}
