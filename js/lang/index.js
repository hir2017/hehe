/**
 * 前端多语言解决方案
 */
let _lang = {
    language: 'en-US',

    template: function(tplStr, data, insertEM) {
        let lang = this.language;
        let langType = lang.replace('-', '').toLowerCase();
        let langPack = LangPack[langType] || LangPack['enus'];

        insertEM = (typeof insertEM == 'undefined') ? false : true;

        let tpl = langPack[tplStr] || tplStr;

        if (!tpl) {
            return '';
        } 
        
        tpl = tpl + '';

        // for 活动规则。段落分隔符号：@@@@
        if (tpl.indexOf('@@@@') >= 0) {
            let strArr = [];

            strArr.push('<ul>');
            tpl.split('@@@@').forEach(function(item, index) {
                item && strArr.push('<li>' + item + '</li>');
            });
            strArr.push('</ul>');
            tpl = strArr.join('');
        }

        tpl = tpl.replace(/\{([\s\S]+?)\}/ig, function($0, $1) {
            if (insertEM) {
                return '<em class="' + $1 + '">' + data[$1] + '</em>';
            } else {
                return data[$1];
            }
        });

        return tpl;
    }
};

export default  _lang;