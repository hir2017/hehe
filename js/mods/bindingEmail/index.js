import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch, Row, Col } from 'antd';
import { Link } from 'react-router';

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
                    <Col className="title" span={12}>
                        <p>{userInfo.email || UPEX.lang.template('请添加邮箱')}</p>
                        <p>{UPEX.lang.template('郵箱用於登錄、提幣及部分安全設置使用。我們也會給您提供 登錄提醒服務')}</p>
                    </Col>
                    <Col className="operator" span={12}>
                        {userInfo.email ? null : (
                            <Button>
                                <Link to="/user/settingEmail"> {UPEX.lang.template('添加')}</Link>
                            </Button>
                        )}
                    </Col>
                </Row>
                <div className="message">
                    <p>{UPEX.lang.template('郵箱的私人性質很強，所以請牢記您郵箱的密碼，一旦您設定了電子郵箱，除非極特殊的情況，我們無法為您提供修改綁定服務')}。</p>
                </div>
            </div>
        );
    }
}
