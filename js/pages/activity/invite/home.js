/**
 * @fileoverview 邀请返佣活动
 * @author 陈立英
 * @date 2018-10-01
 */
import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {getCommissionRate} from '@/api/http';

import UserInfo from '../../user';
import InviteRank from './rank';
import InviteUser from './user';
import UserInviteBouns from './bonus';
import UserInviteOrders from './orders';


@observer
class PageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level1Rate: 0,
            level2Rate: 0
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        getCommissionRate().then(res => {
            if (res.status == 200) {
                this.setState({
                    level1Rate: res.attachment[0].val,
                    level2Rate: res.attachment[1].val
                });
            }
        }).catch(res => {
            console.log('getCommissionRate err');
        })
    }

    render() {
        const {level1Rate, level2Rate} = this.state;

        return (
            <UserInfo pathname="invite-home">
                <div className="invite-wrap">
                    <div className="invite-banner"/>
                    <InviteRank/>
                    <InviteUser/>
                    <div className="invite-order clearfix">
                        <div className="order-left">
                            <UserInviteBouns/>
                        </div>
                        <div className="order-right">
                            <UserInviteOrders/>
                        </div>
                    </div>
                    <div className="invite-rule">
                        <div className="rule-hd">{UPEX.lang.template('活动规则')}</div>
                        <div className="rule-bd">
                            {
                                UPEX.config.version === 'ace' ?(
                                    <ul>
                                        <li>{UPEX.lang.template('一级返佣')}</li>
                                        <li dangerouslySetInnerHTML={{__html: UPEX.lang.template('每邀请一个用户进行注册，则该用户交易产生的手续费的{value}作为佣金返还到您的账户。', { value: '50%'},1) }}></li>
                                        <li>{UPEX.lang.template('二级返佣')}</li>
                                        <li dangerouslySetInnerHTML={{__html: UPEX.lang.template('如果您邀请的用户再次邀请用户A，则用户A的产生的交易手续费的{value}也作为佣金返还到您的账户。', { value: '10%'}, 1)}}></li>
                                    </ul>
                                ):(
                                    <ul>
                                        <li>{UPEX.lang.template('一级返佣')}</li>
                                        <li dangerouslySetInnerHTML={{__html: UPEX.lang.template('每邀请一个用户进行注册，则该用户交易产生的手续费的{value}作为佣金返还到您的账户。', { value: '50%'},1) }}></li>
                                    </ul>
                                )
                            }
                        </div>
                        <div className="rule-ft">
                            <h4>{UPEX.lang.template('温馨提示')}</h4>
                            <ul>
                                <li>{UPEX.lang.template('被邀请人必须使用你的专属邀请码、邀请链接或二维码进行注册。')}</li>
                                <li>{UPEX.lang.template('在您邀请的用户发生交易并产生交易手续费时，将为您进行返佣。')}</li>
                                <li>{UPEX.lang.template('您的返佣将会为您实时记录，并在每周的特定时间为您结算。')}</li>
                                <li>{UPEX.lang.template('ACE保留随时对返佣活动规则进行调整的权利，但是对你邀请的好友数量没有限制。')}</li>
                                <li>{UPEX.lang.template('ACE会严查重复的或者虚假账户，一经发现，将不会支付返佣。')}</li>
                                <li>{UPEX.lang.template('您获得的佣金中，法币的佣金将不计入返佣金额，只为您计算并结算数字货币的佣金。')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </UserInfo>
        );
    }
}

export default PageView;
