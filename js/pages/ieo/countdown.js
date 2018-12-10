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

    //获取倒计时剩余时间。状态flag为0时表示未开始，flag为1表示进行中
    getRemainTime() {
        let {startTime, endTime, serverTime, flag} = this.props;
        let remainTime;

        if (flag == 0) {
            remainTime = startTime - serverTime;
        } else if (flag == 1) {
            remainTime = endTime - serverTime;
        }

        return remainTime;
    }

    createCountDown() {
        let remainTime = this.getRemainTime();
        //页面上需要显示多个倒计时需传入的参数
        let order = this.props.order || '';
        let countdownCls = `.countdown${order}`;

        if (remainTime > 0) {
            this.countdown = new Timer({
                remainTime: remainTime,
                selector: {
                    day: countdownCls + " .day",
                    hour: countdownCls + " .hour",
                    minute: countdownCls + " .minute",
                    second: countdownCls + " .second"
                }
            });

            //倒计时结束进行的操作
            this.countdown.on('end', () => {

            });
        }
    }

    render() {
        let {skin, order} = this.props;
        let showtxt = this.props.showtxt === true ? '' : 'hide';

        return (
            <div className={`countdown countdown${order} ${skin}`}>
                <div className="main">
                    <div className="day-wrap">
                        <em className="day">00</em>
                        <div className={`txt ${showtxt}`}>{UPEX.lang.template('天')}</div>
                    </div>
                    <div className="hour-wrap">
                        <em className="hour">00</em>
                        <div className={`txt ${showtxt}`}>{UPEX.lang.template('小时')}</div>
                    </div>
                    <div className="minute-wrap">
                        <em className="minute">00</em>
                        <div className={`txt ${showtxt}`}>{UPEX.lang.template('分')}</div>
                    </div>
                    <div className="second-wrap">
                        <em className="second">00</em>
                        <div className={`txt ${showtxt}`}>{UPEX.lang.template('秒')}</div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CountDown;