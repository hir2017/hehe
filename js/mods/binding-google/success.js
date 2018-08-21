import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch, Row, Col } from 'antd';
import { Link, browserHistory } from 'react-router';

@observer
export default class Success extends Component {
    render() {
        return (
            <div className="common-setting-box">
                <Row className="pwd top-radius-6 bottom-radius-6">
                    <Col className="title" span={8}>
                        <p>{UPEX.lang.template('解绑Google验证器')}</p>
                        <p>{UPEX.lang.template('提现、修改密码，及安全设置时接收短信使用')}</p>
                    </Col>
                    <Col  span={8} />
                    <Col className="operator" span={8}>
                        <Button className="exc-btn-white" onClick={e => {browserHistory.push('/user/unbinding-google')}}>
                            {UPEX.lang.template('解绑')}
                        </Button>
                    </Col>
                </Row>
                <div className="message guide">
                    {UPEX.lang.template('使用Google认证请详细阅读')}
                    <Link to="/user/google-guide">{UPEX.lang.template('使用指南')}</Link>
                </div>
            </div>
        );
    }
}
