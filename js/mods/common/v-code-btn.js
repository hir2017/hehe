import React from 'react';
import { Button } from 'antd';

import YidunCaptcha from '../yidun-captcha';

export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            secs: 60,
            disabled: false,
            loading: false,
            timer: false,
        };
        this.yidunCaptcha = new YidunCaptcha({
            type: 'modify-pwd',
            lang: UPEX.lang.language == 'en-US' ? 'en' : UPEX.lang.language
        });
    }

    componentWillMount() {
        this.yidunCaptcha.init((validate, captchaId) => {
            this.handleSend(validate, captchaId);
        });
    }

    handleClick() {
        if(this.state.disabled) {
           return false;
        }
        const {validateFn} = this.props;
        if(validateFn && !validateFn()) {
            return false;
        };
        if(this.props.noSlide) {
            this.handleSend();
        } else {
            this.yidunCaptcha.show();
        }
    }

    handleResponse(res) {

    }

    handleSend(validate, captchaId) {
        this.setState({
            disabled: true,
            loading: true,
        })
        this.props.sendCode({validate, captchaId}).then(res => {
            let _state = {
                loading: false,
            };
            if(!res) {
                _state.disabled = false;
            }
            if(res && res.status === 200) {
                this.startCount();
            }
            if(res && res.status !== 200) {
                _state.disabled = false;
            }
            this.setState(_state);
        }).catch(err => {
            console.error(err, 'yidunCaptcha vcode-btn');
            this.setState({
                disabled: false,
                loading: false,
            })
        })
    }
    startCount() {
        this.setState({
            timer: true
        })
        this.timer = setInterval(() => {
            const secs = this.state.secs;
            let _state = {
                secs: secs - 1
            }
            if(secs === 1) {
                _state.secs = 60;
                _state.disabled = false;
                _state.timer = false;
                clearInterval(this.timer);
            }
            this.setState(_state)
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { state } = this;
        let $content = null;
        if (!state.disabled) {
            $content = UPEX.lang.template('发送验证码');
        }
        if (state.loading) {
            $content = UPEX.lang.template('发送中');
        }
        if (state.timer) {
            $content = `${UPEX.lang.template('重发')}(${state.secs}s)`;
        }
        return (
            <Button loading={state.loading} disabled={state.disabled} onClick={this.handleClick.bind(this)}>
                {$content}
            </Button>
        );
    }
}
