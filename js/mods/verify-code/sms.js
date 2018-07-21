/**
 * 发送短信验证码
 * @author 陈立英
 * 逻辑：第一次默认自动发送
 */
import React, { Component } from 'react';
import Timer from '../../lib/timer';

class SMSVerifyCode extends Component {
	static defaultProps = {
		autoSend: false // 是否默认自动发送
        onFetch: ()=>{ } //发送请求
	}

	constructor(props) {
        super(props);

        this.state = {
            isFetching: false
        }
    }

    componentDidMount() {
        this.props.onFetch();
    }

	render() {
        let { isFetching } = this.state;

        if (isFetching) {
            return (
                <div className="ex-smscode">
                    <button type="button" className="disabled">
                        <div className='code-txt'}>{UPEX.lang.template('发送中')}</div>
                    </button>
                </div>
            )
        } else {
            <div className="ex-smscode">
                <button type="button" onClick={this.sendVercode} className={store.sendingcode ? 'disabled' : ''}>
                    <div className={store.sendingcode ? 'code-sending' : 'code-sending hidden'}>
                        {UPEX.lang.template('重发')}（<span data-second="second" ref="second" />s）
                    </div>
                    <div className={store.sendingcode ? 'code-txt hidden' : 'code-txt'}>{UPEX.lang.template('发送验证码')}</div>
                </button>
            </div>
        }
	}
}

export default SMSVerifyCode;