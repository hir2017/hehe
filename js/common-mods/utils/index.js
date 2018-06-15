// input 属性，复制
export const createGetProp = function (thisIns) {
    return function(name, type = 'password') {
        const result = {
            className: 'input',
            onChange: function(e) {
                this.setVal(e, name);
            }.bind(thisIns)
        };
        if (type !== 'none') {
            result.type = type;
        }
        return result;
    }
};
