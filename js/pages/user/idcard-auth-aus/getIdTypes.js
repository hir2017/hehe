export default function getIdTypes(type) {
    let types = [
        {value:'3', label: UPEX.lang.template('护照')},
        {value:'2', label: UPEX.lang.template('驾照')},
        // {value:'1', label: UPEX.lang.template('年龄证明')},
    ]
    if(type) {
        return types.filter(item => item.value == type)
    } else {
        return types
    }

}
