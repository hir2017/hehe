/**
 * @fileoverview 倒计时
 * @Date: 2018/11/29
 */

import React, {Component} from 'react';
import Timer from '@/lib/timer';

/**
 * @param {order: any(倒计时元素index), startTime: timeStamp, skin: string(主题) linght|dark, endTime: timeStamp, serverTime: timeStamp, flag: number(倒计时类型) 0(开始时间)|1(结束时间), showtxt: string(是否显示时间单位)} props
 * @mark 时间戳单位为s
 * @require startTime, skin, endTime, serverTime, flag, showtxt
 */
class CountDown extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.createCountDown();
    }

    //获取倒计时剩余时间。状态flag为0时表示未开始；flag为1表示进行中；flag为其他时，不进行倒计时
    getRemainTime() {
        let {startTime, endTime, serverTime, flag} = this.props;
        let remainTime;

        if (flag == 0) {
            remainTime = startTime - serverTime;
        } else if (flag == 1) {
            remainTime = endTime - serverTime;
        } else {
            remainTime = 0;
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
                location.reload();
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
                        <div className={`txt ${showtxt}`}>{UPEX.lang.template('时')}</div>
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
