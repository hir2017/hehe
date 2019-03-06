export function transLabel_discount(num) {
    const version = UPEX.config.version;
    const lang = UPEX.lang.language;
    let en_num = 100 - num;
    let ch_num = num/10;
    let _num = lang === 'en-US' ? en_num : ch_num;
    // 台湾繁体也是用off
    if(version === 'ace') {
        _num = en_num;
    }
    return UPEX.lang.template('{num}折', { num: _num });
    // if(version === 'ace') {
    //     return lang === 'en-US' ? UPEX.lang.template('{num}折', { num: num }) : UPEX.lang.template('{num}%off', { num: 100 - num });
    // }
    // if(version === 'infinitex') {
    //     return lang === 'en-US' ? UPEX.lang.template('{num}%off', { num: 100 - num }) : UPEX.lang.template('{num}折', { num: num/10 });
    // }
}
