import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch, Row, Col } from 'antd';
import { browserHistory } from 'react-router';

@inject('userInfoStore')
@observer
export default class Email extends Component {
    componentWillMount() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        this.props.userInfoStore.getUserInfo();
    }

    render() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        const checked = userInfo.email ? true : false;
        return (
            <div className="common-setting-box">
                <Row className="pwd top-radius-6 bottom-radius-6">
                    <Col className="title" span={8}>
                        <p>{userInfo.email || UPEX.lang.template('请绑定邮箱')}</p>
                        <p>{UPEX.lang.template('郵箱用於登錄、提幣及部分安全設置使用。我們也會給您提供 登錄提醒服務')}</p>
                    </Col>
                    <Col  span={8} />
                    <Col className="operator" span={8}>
                        {userInfo.email ? null : (
                            <Button className="exc-secondary" onClick={e => {browserHistory.push('/user/setting-email')}}>
                                {UPEX.lang.template('添加')}
                            </Button>
                        )}
                    </Col>
                </Row>
                <div className="message">
                    <p>{UPEX.lang.template('邮箱的私人性质很强，所以请牢记您邮箱的密码，一旦您设定了邮箱，除非极特殊的情況，我們无法为您提供修改绑定服务')}。</p>
                </div>
            </div>
        );
    }
}
