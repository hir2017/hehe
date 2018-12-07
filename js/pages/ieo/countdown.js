/**
 * @fileoverview 倒计时
 * @Date: 2018/11/29
 */

import React, {Component} from 'react';
import Timer from '@/lib/timer';

class CountDown extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.createCountDown();
    }

    createCountDown() {
        let remainTime = this.props.remainTime;

        if (remainTime > 0) {
            this.countdown = new Timer({
                remainTime: remainTime,
                selector: {
                    day: '#J-Countdown .day',
                    hour: '#J-Countdown .hour',
                    minute: '#J-Countdown .minute',
                    second: '#J-Countdown .second'
                }
            });

            //倒计时结束进行的操作
            this.countdown.on('end', () => {

            });
        }
    }

    render() {
        return (
            <div className="countdown" id="J-Countdown">
                <div className="main">
                    <div className="day-wrap">
                        <em className="day">00</em>
                        <div>{UPEX.lang.template('天')}</div>
                    </div>
                    <div className="hour-wrap">
                        <em className="hour">00</em>
                        <div>{UPEX.lang.template('小时')}</div>
                    </div>
                    <div className="minute-wrap">
                        <em className="minute">00</em>
                        <div>{UPEX.lang.template('分')}</div>
                    </div>
                    <div className="second-wrap">
                        <em className="second">00</em>
                        <div>{UPEX.lang.template('秒')}</div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CountDown;