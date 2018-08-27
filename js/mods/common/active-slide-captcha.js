import React from 'react';
import YidunCaptcha from '../yidun-captcha';

// completeCallBack:成功的回调, Others:其他的自定义属性
/*
Others使用的方式
比如你想在成功后自己添加class，可以在completeCallBack对父级state做改变，然后再others里面传给子级
*/
export default class View extends React.Component {
    constructor() {
        super();
        this.yidunCaptcha = new YidunCaptcha({
            element: '#floatCaptcha',
            type: 'modify-pwd',
            mode: 'float',
            width: '100%',
            lang: UPEX.lang.language == 'en-US' ? 'en': UPEX.lang.language
        });
    }

    componentDidMount() {
        this.yidunCaptcha.init(this.props.completeCallBack);
        this.props.afterInit(this);
    }


    render() {
        return <div {...this.props.Others} id="floatCaptcha"></div>;
    }
}
