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
