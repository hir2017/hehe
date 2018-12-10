/**
 * @fileoverview IEO 数字币信息
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Modal, Row, Col } from 'antd';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import { StatusIcon } from '../view';
import CountDown from '../countdown';

@inject('userInfoStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectState: '',
            visible: false
        };
        this.btnTxtMap = {
            // 未登录
            login: UPEX.lang.template('加入 IEO'),
            // 未订阅 (未开始)
            'not-subscribed': UPEX.lang.template('加入 IEO'),
            // 已订阅 (未开始)
            subscribed: UPEX.lang.template('即将开始'),
            // 购买 (已开始)
            start: UPEX.lang.template('现在购买'),
            // 结束
            done: UPEX.lang.template('已结束')
        };
        this.inputProps = {
            // 购买方式
            type: {
                label: UPEX.lang.template('购买方式')
            }
        };
    }

    componentDidMount() {
        this.checkProjectState();
        // this.getData().then(res => {
        //     this.checkProjectState();
        // });
    }

    // getData() {
    //
    //     return new Promise(function(reslove, reject) {
    //         reslove({ status: 200 });
    //     });
    // }

    checkProjectState() {
        // 判断用户是否登录，该IEO是否开始
        this.setState({
            projectState: 'not-subscribed'
        });
    }

    // 操作按钮
    handleClick = () => {
        this.setState({
            visible: true
        });
        // 登录判断
        // IEO是否已开始判断, 购买|订阅
        // IEO未开始，是否已订阅判断 订阅|未订阅
    };

    handleModalVisite(action) {
        this.setState({
            visible: false
        });
    }


    render() {
        const { state, btnTxtMap, formatTime } = this;
        const { data } = this.props;
        let CountDownProp = {
            startTime: data._beginTimeStamp,
            skin: 'dark',
            endTime: data._endTimeStamp,
            serverTime: data._systemTimeStamp,
            flag: 0,
        };
        return (
            <div className="coin-info clearfix">
                <div className="left-box">
                    <img src={data.logoUrl} alt="" />
                    <StatusIcon status={1} />
                    <CountDown {...CountDownProp} />
                </div>

                <div className="right-box">
                    <Row>
                        <Col className="symbol" span={24}>
                            {data.tokenName}
                        </Col>
                        <Col className="date" span={12}>
                            <label>{UPEX.lang.template('IEO时间')}:</label>
                            {data._beginTime} - {data._endTime}
                        </Col>
                        <Col className="count" span={12}>
                            <label>{UPEX.lang.template('已经募集')}:</label>
                            {data.raisedAmount}
                        </Col>
                        <Col className="price" span={12}>
                            <label>{UPEX.lang.template('IEO价格')}:</label>1 {data.tokenName} ≈ {data.price} {UPEX.config.baseCurrencyEn}
                        </Col>
                        <Col className="progress" span={12}>
                            <label>{UPEX.lang.template('IEO进度')}:</label>
                            {data._percent}
                        </Col>
                        <Col className="description" span={24}>
                            <label>{UPEX.lang.template('项目介绍')}:</label>
                            {data.tokenDesc}
                        </Col>
                        <Col span={24} className="buy">
                            <Button onClick={this.handleClick}>{btnTxtMap[state.projectState] || ''}</Button>
                        </Col>
                    </Row>
                </div>

                <Modal
                    title={UPEX.lang.template('购买')}
                    visible={state.visible}
                    onOk={this.handleModalVisite.bind(this, 'submit')}
                    onCancel={this.handleModalVisite.bind(this, 'cancel')}
                >
                    <FormView>
                        <FormItem />
                    </FormView>
                </Modal>
            </div>
        );
    }
}

export default View;
