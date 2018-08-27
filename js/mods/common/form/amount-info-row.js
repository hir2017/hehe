import React from 'react';
import { Row, Col } from 'antd';

export default function(props) {
    return (
        <Row className="amount-tips" gutter={10}>
            <Col span={12}>
                {props.left}
            </Col>
            <Col span={12}>
                {props.right}
            </Col>
        </Row>
    );
}
