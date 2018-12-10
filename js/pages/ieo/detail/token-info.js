/**
 * @fileoverview IEO token信息 分配
 */
import React, { Component } from 'react';
import { Row, Col } from 'antd';

class View extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <Row className="token-info" gutter={20}>
                <Col span={12} className="detail">
                    <div className="col-inner">detail </div>
                </Col>
                <Col span={12} className="allocation">
                    <div className="col-inner">allocation </div>
                </Col>
            </Row>
        );
    }
}

export default View;
