/**
 * @fileoverview IEO token信息 分配
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PageWrapper from '@/mods/common/wrapper/full-page';
import NumberUtil from '@/lib/util/number';

class View extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const { data } = this.props;
        let $homepageUrl = data.homepageUrl ? <a href={data.homepageUrl} target="_blank">{data.homepageUrl}</a> : null;
        let $whitePaperUrl = data.whitePaperUrl ? <a href={data.whitePaperUrl} target="_blank">{data.whitePaperUrl}</a> : null;
        let $titleAfter = (
            <span className="total-circulation">
                {UPEX.lang.template('总发行数量')}: {NumberUtil.separate(data.totalCirculation)}
            </span>
        );
        let $tokenDistributionUrl = data.tokenDistributionUrl ? <img src={data.tokenDistributionUrl} /> : null;

        return (
            <Row className="token-info" gutter={20}>
                <Col span={12}>
                    <PageWrapper title={UPEX.lang.template('Token 详情')} className="header-shadow detail">
                        <p className="item">
                            <span className="label home">{UPEX.lang.template('主页')}</span>
                            {$homepageUrl}
                        </p>
                        <p className="item">
                            <span className="label">{UPEX.lang.template('白皮书')}</span>
                            {$whitePaperUrl}
                        </p>
                        <Row gutter={20}>
                            <Col span={12}>
                                <div className="inner">
                                    <span className="label">{UPEX.lang.template('购买方式')}</span>
                                    <em>{data.buyWay}</em>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="inner">
                                    <span className="label">{UPEX.lang.template('软顶')}</span>
                                    <em>{NumberUtil.separate(data.softTop)}</em> {data.tokenName}
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="inner">
                                    <span className="label">{UPEX.lang.template('最低购买')}</span>
                                    <em>{data.minBuyCount}</em> {data.tokenName}
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="inner">
                                    <span className="label">{UPEX.lang.template('硬顶')}</span>
                                    <em>{NumberUtil.separate(data.hardTop)}</em> {data.tokenName}
                                </div>
                            </Col>
                        </Row>
                    </PageWrapper>
                </Col>
                <Col span={12}>
                    <PageWrapper titleAfter={$titleAfter} title={UPEX.lang.template('Token 分配')} className="header-shadow allocation">
                        {$tokenDistributionUrl}
                    </PageWrapper>
                </Col>
            </Row>
        );
    }
}

export default View;
