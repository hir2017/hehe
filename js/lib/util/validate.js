// 数字验证
export function isNumber(str) {
    try {
        return /^[0-9]*$/.test(str)
    } catch (error) {
        console.error('validate isNumber', error)
    }

}
// 手机验证
// 现阶段只检测是否是数字, 后续拓展
export function isPhone(str) {
    try {
        return /^[0-9]*$/.test(str)
    } catch (error) {
        console.error('validate isPhone', error)
    }
}
