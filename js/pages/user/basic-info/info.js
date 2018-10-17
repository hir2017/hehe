import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import { Row, Col } from 'antd';
import TimeUtil from '@/lib/util/date';
import Numberutils from  '@/lib/util/number';
import { twdGetQuotaManagementInfo } from '@/api/http';
import bindPhone from '@/../images/bind-phone.png';
import unbindPhone from '@/../images/unbind-phone.png';
import bindEmail from '@/../images/bind-email.png';
import unbindEmail from '@/../images/unbind-email.png';
import gradeA from '@/../images/grade-a.png';
import gradeB from '@/../images/grade-b.png';
import gradeC from '@/../images/grade-c.png';
import upgradeBtn from '@/../images/up-grade-btn.png';

import AceSection from '@/components/page-user/section';

@inject('userInfoStore')
@observer
class Info extends Component {
    constructor() {
        super();
        this.gradeImg = this.gradeImg.bind(this);
        this.state = {
            cashLimit: 0,
            coinLimit: 0
        }
    }

    getLimit() {
        Promise.all([
            twdGetQuotaManagementInfo({
                actionId: 2,
                currencyId: 1
            }),
            twdGetQuotaManagementInfo({
                actionId: 4,
                currencyId: 2
            })
        ])
            .then(([res1, res2]) => {
                if (this.unmount == 1) {
                    return;
                }
                const { authLevel = 1 } = this.props.userInfoStore.userInfo || {};
                let result = {};
                if (res1.status === 200) {
                    result.cashLimit =  Numberutils.separate(res1.attachment[0][`kyc${authLevel}DayLimit`]);
                }
                if (res2.status === 200) {
                    result.coinLimit = Numberutils.separate(res2.attachment[0][`kyc${authLevel}DayLimit`]);
                }
                this.setState(result);
            })
            .catch(err => {
                console.error('twdGetQuotaManagementInfo', err);
            });
    }

    componentDidMount() {
        this.props.userInfoStore.getUserInfo().then(res => {
            if(res.status === 200) {
                this.getLimit();
            }
        })

    }

    doSkip(type, abled) {
        if(abled) {
            return;
        }
        browserHistory.push(type === 'phone' ? '/user/setting-phone' : '/user/setting-email');
    }

    gradeImg() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        let result = {};
        let level = userInfo.authLevel;
        if (level == 1) {
            result = { img: gradeA, grade: 'A' };
        }

        if (level == 2) {
            result = { img: gradeB, grade: 'B' };
        }

        if (level == 3) {
            result = { img: gradeC, grade: 'C' };
        }

        if (level == 0) {
            result = { grade: 'Z' };
        }

        return result;
    }

    render() {
        const {state} = this;
        const userInfo = this.props.userInfoStore.userInfo || {};
        let gradeCfg = this.gradeImg();
        let ugradeLinkMap = {
            Z: '/user/authentication',
            A: '/user/bankInfo',
            B: '/user/authentication'
        };
        let ugradeLink = ugradeLinkMap[gradeCfg.grade];

        return (
            <AceSection title={UPEX.lang.template('基本信息')} className="info">
                <Row>
                    <Col span={12} className="left">
                        <div className="phone">{userInfo.phone || userInfo.email}</div>
                        <div className="login-time">
                            {UPEX.lang.template('最后登录时间')}：
                            {userInfo.userLoginRecord && TimeUtil.formatDate(userInfo.userLoginRecord.timeStamp)}
                        </div>
                        <Row className="bind-status">
                            <Col span={12} className={userInfo.isValidatePhone ? 'auth' : ''} onClick={this.doSkip.bind(this, 'phone', userInfo.isValidatePhone)}>
                                <img src={userInfo.isValidatePhone ? bindPhone : unbindPhone} />
                                <p>{userInfo.isValidatePhone ? UPEX.lang.template('手机已绑定') : UPEX.lang.template('手机未绑定')}</p>
                            </Col>
                            <Col span={12} className={userInfo.isValidateEmail ? 'auth' : ''}>
                                <img src={userInfo.isValidateEmail ? bindEmail : unbindEmail} onClick={this.doSkip.bind(this, 'mail', userInfo.isValidateEmail)}/>
                                <p>{userInfo.isValidateEmail ? UPEX.lang.template('邮箱已绑定') : UPEX.lang.template('邮箱未绑定')}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} className="right">
                        <div className="grade-label">{UPEX.lang.template('当前认证等级')}</div>
                        <div className="grade-info">
                            <div className="state">
                                {gradeCfg.grade === 'Z' ? (
                                    <p className="no-auth">{UPEX.lang.template('您还未进行安全级别认证')}</p>
                                ) : (
                                    <div className="state-inner">
                                        <img src={gradeCfg.img} />
                                        <p className="text">{UPEX.lang.template('安全级别')}</p>
                                        <p className="money">
                                            {UPEX.lang.template('提现额度')}：{UPEX.config.baseCurrencySymbol} {state.cashLimit}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="upgrade">{ugradeLink ? <Link to={ugradeLink}>{UPEX.lang.template('提升安全等级')}<img src={upgradeBtn} /></Link> : null}</div>
                        </div>
                    </Col>
                </Row>
            </AceSection>
        );
    }
}

export default Info;
