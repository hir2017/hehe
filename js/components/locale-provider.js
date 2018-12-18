import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import en_US from 'antd/lib/locale-provider/en_US';
import zh_TW from 'antd/lib/locale-provider/zh_TW';

class ExcLocaleProvider extends Component {
    constructor() {
        super();
        let _lang = UPEX.lang.language;
        let _locale = en_US;
        if (_lang === 'zh-CN') {
            _locale = zh_CN;
        }
        if (_lang === 'zh-TW') {
            _locale = zh_TW;
        }
        this.locale = _locale;
    }

    render() {
        return <LocaleProvider locale={this.locale}>{this.props.children}</LocaleProvider>;
    }
}

export default ExcLocaleProvider;
