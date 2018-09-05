/**
 * 图片验证码
 * @author 陈立英
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Icon } from 'antd';

@inject('captchaStore')
@observer
class ImgVerifyCode extends Component {
	constructor(props) {
        super(props);
    }

    componentDidMount() {
    	this.getImgCaptcha();
    }

    getImgCaptcha=(e)=>{
    	this.props.captchaStore.fetch();
    }

    render() {
    	let store = this.props.captchaStore;
    	let $loading = <Icon type="loading" style={{ fontSize: 16, color: '#cc9900' }}/>;
    	let $captcha = <img src={ store.captcha } onClick={this.getImgCaptcha} alt="captcha"/>

    	return (
    		<div className="ex-captcha">{ store.isFetching ?  $loading : $captcha  }</div>
    	)
    }
}

export default ImgVerifyCode;