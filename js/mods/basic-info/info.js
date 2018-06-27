import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';
import { Switch, Button, Row, Col } from 'antd';

import bindPhone from '../../../images/bind-phone.png';
import unbindPhone from '../../../images/unbind-phone.png';
import bindEmail from '../../../images/bind-email.png';
import unbindEmail from '../../../images/unbind-email.png';
import gradeA from '../../../images/grade-a.png';
import gradeB from '../../../images/grade-b.png';
import gradeC from '../../../images/grade-c.png';
import upgradeBtn from '../../../images/up-grade-btn.png';

import AceSection from '../../common-mods/page-user/section';

@inject('userInfoStore')
@observer
class Info extends Component {
    constructor() {
        super();
        this.gradeImg = this.gradeImg.bind(this);
    }

    componentWillMount() {
        this.props.userInfoStore.getUserInfo();
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
        const userInfo = this.props.userInfoStore.userInfo || {};
        let gradeCfg = this.gradeImg();
        let ugradeLinkMap = {
            Z: '/user/authentication',
            A: '/user/bankInfo',
            B: '/user/authentication'
        };
        let ugradeLink = ugradeLinkMap[gradeCfg.grade];

        return (
            <AceSection title={UPEX.lang.template('基础信息')} className="info">
                <Row>
                    <Col span={12} className="left">
                        <div className="phone">{userInfo.phone || userInfo.email}</div>
                        <div className="login-time">
                            {UPEX.lang.template('最后登录时间')}：
                            {userInfo.userLoginRecord && userInfo.userLoginRecord.time}
                        </div>
                        <Row className="bind-status">
                            <Col span={12} className={userInfo.isValidatePhone ? 'auth' : ''}>
                                <img src={userInfo.isValidatePhone ? bindPhone : unbindPhone} />
                                <p>{userInfo.isValidatePhone ? UPEX.lang.template('手机已绑定') : UPEX.lang.template('手机未绑定')}</p>
                            </Col>
                            <Col span={12} className={userInfo.isValidateEmail ? 'auth' : ''}>
                                <img src={userInfo.isValidateEmail ? bindEmail : unbindEmail} />
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
                                            {UPEX.lang.template('提现额度')}：NT${userInfo.dayLimit}
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
