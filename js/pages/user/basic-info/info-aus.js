import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import { Switch, Button, Row, Col } from 'antd';
import gradeA from '@/../images/grade-a.png';
import gradeB from '@/../images/grade-b.png';
import gradeC from '@/../images/grade-c.png';
import authOk from '@/../images/aus/aus-auth-success.png';
import AceSection from '@/components/page-user/section';
import InfoBoxLeft from './info-box-left';

@inject('userInfoStore')
@observer
class Info extends Component {
    constructor() {
        super();
    }

    noAuthMsgMap = {
        // 审核中
        '1': UPEX.lang.template('身份認證資料審核中...'),
        // 复审中
        '3': UPEX.lang.template('身份認證資料審核中...'),
        // 驳回
        '-1': UPEX.lang.template('身份認證審核失敗'),
        'default': UPEX.lang.template('您还未进行身份认证')
    };


    gradeImg = () => {
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

    handleBindPhone = e => {
        browserHistory.push('/user/binding-phone');
    };

    handleBindEmail = e => {
        browserHistory.push('/user/binding-email');
    };

    getAuthView() {}

    render() {
        const {  props } = this;
        const userInfo = this.props.userInfoStore.userInfo || {};
        let gradeCfg = this.gradeImg();
        let $state = null;
        let $upgradeLink = null;
        if (gradeCfg.grade === 'Z') {
            $state = <p className="no-auth">{this.noAuthMsgMap[userInfo.isAuthPrimary] || this.noAuthMsgMap.default}</p>;

            $upgradeLink = (
                <div
                    className="upgrade"
                    onClick={e => {
                        browserHistory.push('/user/authentication');
                    }}
                >
                    <Link>
                        {UPEX.lang.template('提升安全等级')}
                    </Link>
                </div>
            );
        }
        if (['A', 'B', 'C'].indexOf(gradeCfg.grade) !== -1) {
            $state = (
                <div className="state-inner aus">
                    <img className="aus" src={authOk} />
                    <p className="text">{UPEX.lang.template('身份已认证')}</p>
                    <p className="money">
                        {UPEX.lang.template('当前日提现限额')}：
                        <span className="amount-space">
                            {props.cashLimit} {UPEX.config.baseCurrencySymbol}
                        </span>
                    </p>
                    <p className="money">
                        {UPEX.lang.template('当前日提币限额')}：
                        <span className="amount-space">
                            {props.coinLimit} {UPEX.config.baseCurrencySymbol}
                        </span>
                    </p>
                </div>
            );
        }

        return (
            <AceSection title={UPEX.lang.template('基本信息')} className="info">
                <Row>
                <InfoBoxLeft userInfo={userInfo}></InfoBoxLeft>
                    <Col span={12} className="right">
                        <div className="grade-label">{UPEX.lang.template('身份认证')}</div>
                        <div className="grade-info">
                            <div className="state">{$state}</div>
                            {$upgradeLink}
                        </div>
                    </Col>
                </Row>
            </AceSection>
        );
    }
}

export default Info;
