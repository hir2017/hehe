import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import { Switch, Button, Row, Col } from 'antd';
import { ausGetQuotaManagementInfo } from '@/api/http';
import NumberUtils from '@/lib/util/number';
import bindPhone from '@/../images/bind-phone.png';
import unbindPhone from '@/../images/unbind-phone.png';
import bindEmail from '@/../images/bind-email.png';
import unbindEmail from '@/../images/unbind-email.png';
import gradeA from '@/../images/grade-a.png';
import gradeB from '@/../images/grade-b.png';
import gradeC from '@/../images/grade-c.png';
import authOk from '@/../images/aus-auth-success.png';
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
        };
    }

    componentWillMount() {
        this.props.userInfoStore.getUserInfo();
        Promise.all([
            ausGetQuotaManagementInfo({
                actionId: 2,
                currencyId: 1
            }),
            ausGetQuotaManagementInfo({
                actionId: 4,
                currencyId: 2
            })
        ])
            .then(([res1, res2]) => {
                const {authLevel = 1} = this.props.userInfoStore.userInfo;
                let result = {};
                if (res1.status === 200) {
                    result.cashLimit = res1.attachment[0][`kyc${authLevel}DayLimit`];
                }
                if (res2.status === 200) {
                    result.coinLimit = res2.attachment[0][`kyc${authLevel}DayLimit`];
                }
                this.setState(result);
            })
            .catch(err => {
                console.error('AusGetQuotaManagementInfo', err);
            });
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
        const { state } = this;
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
                            {UPEX.lang.template('最后登录时间')}：{userInfo.userLoginRecord && userInfo.userLoginRecord.time}
                        </div>
                        <Row className="bind-status">
                            <Col span={12} className={userInfo.isValidatePhone ? 'auth' : ''}>
                                <img  src={userInfo.isValidatePhone ? bindPhone : unbindPhone} />
                                <p>{userInfo.isValidatePhone ? UPEX.lang.template('手机已绑定') : UPEX.lang.template('手机未绑定')}</p>
                            </Col>
                            <Col span={12} className={userInfo.isValidateEmail ? 'auth' : ''}>
                                <img src={userInfo.isValidateEmail ? bindEmail : unbindEmail} />
                                <p>{userInfo.isValidateEmail ? UPEX.lang.template('邮箱已绑定') : UPEX.lang.template('邮箱未绑定')}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} className="right">
                        <div className="grade-label">{UPEX.lang.template('身份认证')}</div>
                        <div className="grade-info">
                            <div className="state">
                                {gradeCfg.grade === 'Z' ? (
                                    <p className="no-auth">{UPEX.lang.template('您还未进行身份认证')}</p>
                                ) : (
                                    <div className="state-inner">
                                        <img className="aus" src={authOk} />
                                        <p className="text">{UPEX.lang.template('身份已认证')}</p>
                                        <p className="money">
                                            {UPEX.lang.template('当前日提现限额')}：
                                            <span>
                                             {NumberUtils.separate(state.cashLimit)}   {UPEX.config.baseCurrencySymbol}
                                            </span>


                                        </p>
                                        <p className="money">
                                            {UPEX.lang.template('当前日提币限额')}：
                                            <span>
                                             {NumberUtils.separate(state.coinLimit)}   {UPEX.config.baseCurrencySymbol}
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>
                            {gradeCfg.grade === 'Z' ? (
                                <div
                                    className="upgrade"
                                    onClick={e => {
                                        browserHistory.push('/user/authentication');
                                    }}
                                >
                                    <Link>
                                        {UPEX.lang.template('提升安全等级')}
                                        <img src={upgradeBtn} />
                                    </Link>
                                </div>
                            ) : null}

                            {/* <div className="upgrade">{ugradeLink ? <Link to={ugradeLink}>{UPEX.lang.template('提升安全等级')}<img src={upgradeBtn} /></Link> : null}</div> */}
                        </div>
                    </Col>
                </Row>
            </AceSection>
        );
    }
}

export default Info;
