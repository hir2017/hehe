export function transLabel_discount(num) {
    const version = UPEX.config.version;
    const lang = UPEX.lang.language;
    if(version === 'ace') {
        return lang === 'en-US' ? UPEX.lang.template('{num}折', { num: num }) : UPEX.lang.template('{num}%off', { num: 100 - num });
    }
    if(version === 'infinitex') {
        return lang === 'en-US' ? UPEX.lang.template('{num}%off', { num: 100 - num }) : UPEX.lang.template('{num}%折', { num: num });
    }
}
