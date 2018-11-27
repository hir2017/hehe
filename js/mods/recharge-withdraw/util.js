export const aceComputeFee = (val, feeInfo) => {
    let fee = 0;
    // 计算手续费 feeType = 1, 为固定手续费；不为1 取fee字段计算，最大为feeHighLimit， 向上取整
    if(feeInfo.feeType === 1) {
        fee = feeInfo.fee;
    } else {
        fee = val * feeInfo.fee;
        let isLimit = typeof feeInfo.feeHighLimit === 'number';
        // 如果feeHighLimit 为空，空格或其他字符时 视为上限不生效
        if(isLimit) {
            fee = fee >= feeInfo.feeHighLimit ? feeInfo.feeHighLimit : Math.ceil(fee);
        } else {
            // console.warn('手续费最大值失效, 请运营注意');
            fee = Math.ceil(fee);
        }
    }
    return fee;
}
export const ausComputeFee = (val, feeInfo) => {
    let fee = 0;
    // 计算手续费 feeType = 1, 为固定手续费；不为1 取fee字段计算，最大为feeHighLimit， 保留小数后两位(不分大小一律进位)，入 1.126=>1.13, 1.121=>1.13
    function fee_ceil(val) {
        return Math.ceil(val * 100)/100;
    }
    if(feeInfo.feeType === 1) {
        fee = feeInfo.fee;
    } else {
        fee = val * feeInfo.fee;
        let isLimit = typeof feeInfo.feeHighLimit === 'number';
        // 如果feeHighLimit 为空，空格或其他字符时 视为上限不生效
        if(isLimit) {
            fee = fee >= feeInfo.feeHighLimit ? feeInfo.feeHighLimit : fee_ceil(fee);
        } else {
            // console.warn('手续费最大值失效, 请运营注意');
            fee = fee_ceil(fee);
        }
    }
    return fee;
}
