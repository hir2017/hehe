import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import { Row, Col } from 'antd';
import gradeA from '@/../images/grade-a.png';
import gradeB from '@/../images/grade-b.png';
import gradeC from '@/../images/grade-c.png';
import AceSection from '@/components/page-user/section';
import InfoBoxLeft from './info-box-left';

@inject('userInfoStore')
@observer
class Info extends Component {
    constructor() {
        super();
    }

    ugradeLinkMap = {
        Z: '/user/authentication',
        A: '/user/bankInfo',
        B: '/user/authentication'
    };

    noAuthMsgMap = {
        // 审核中
        '1': UPEX.lang.template('身份認證資料審核中...'),
        // 驳回
        '-1': UPEX.lang.template('身份認證審核失敗'),
        default: UPEX.lang.template('您还未进行身份认证')
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


    render() {
        const {  props } = this;
        const { userInfo = {} } = this.props.userInfoStore;
        let gradeCfg = this.gradeImg();

        let ugradeLink = this.ugradeLinkMap[gradeCfg.grade];
        let $gradeInfo = null;
        if (gradeCfg.grade === 'Z') {
            $gradeInfo = <p className="no-auth">{this.noAuthMsgMap[userInfo.isAuthPrimary] || this.noAuthMsgMap.default}</p>;
        } else {
            $gradeInfo = (
                <div className="state-inner">
                    <img src={gradeCfg.img} />
                    <p className="text">{UPEX.lang.template('安全级别')}</p>
                    <p className="money">
                        {UPEX.lang.template('提现额度')}：{UPEX.config.baseCurrencySymbol} {props.cashLimit}
                    </p>
                    <p className="money">
                        {UPEX.lang.template('提币额度')}：{UPEX.config.baseCurrencySymbol} {props.coinLimit}
                    </p>
                </div>
            );
        }
        return (
            <AceSection title={UPEX.lang.template('基本信息')} className="info">
                <Row>
                    <InfoBoxLeft userInfo={userInfo} />
                    <Col span={12} className="right">
                        <div className="grade-label">{UPEX.lang.template('当前认证等级')}</div>
                        <div className="grade-info">
                            <div className="state">{$gradeInfo}</div>
                            <div className="upgrade">{ugradeLink ? <Link to={ugradeLink}>{UPEX.lang.template('提升安全等级')}</Link> : null}</div>
                        </div>
                    </Col>
                </Row>
            </AceSection>
        );
    }
}

export default Info;
