import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch, Modal, Input, message, Row, Col } from 'antd';
import { Link } from 'react-router';

@inject('userInfoStore', 'authStore')
@observer
export default class BindingBank extends Component {
    componentWillMount() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        this.props.userInfoStore.getUserInfo();
    }

    passwordSwitch = checked => {
        const userInfo = this.props.userInfoStore.userInfo || {};
        let msg = 'none';
        msg = (userInfo.isValidatePhone === 0 && UPEX.lang.template('请先绑定手机')) || (userInfo.isValidatePass === 0 && UPEX.lang.template('请先设置交易码'));
        if (msg === 'none' || msg !== false) {
            message.error(msg);
            return;
        }

        this.setState({
            visible: true,
            checked: checked
        });
    };

    state = {
        checked: false,
        visible: false,
        pwd: '',
        vCode: ''
    };

    pwdChange = e => {
        this.setState({
            pwd: e.target.value
        });
    };

    vCodeChange = e => {
        this.setState({
            vCode: e.target.value
        });
    };

    handleOk = () => {
        if (!this.state.pwd) {
            message.error(UPEX.lang.template('交易密码不能为空'));
            return;
        }
        const pwd = md5(this.state.pwd + UPEX.config.dealSalt + this.props.authStore.uid);
        this.props.userInfoStore.fdPwdSwitch(pwd, this.state.checked ? 1 : 2).then(data => {
            let nextState = {
                visible: false,
                pwd: ''
            };
            this.setState(nextState);
        });
    };

    cancelHandle = () => {
        this.setState({
            visible: false,
            pwd: ''
        });
    };

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const userInfo = this.props.userInfoStore.userInfo || {};
        const isEnableFdPassword = userInfo.isEnableFdPassword !== 2 ? true : false;
        return (
            <div className="common-setting-box">
                <Row className="pwd no-bottom top-radius-6">
                    <Col className="title" span={8}>
                        <p>{UPEX.lang.template('登录密码')}</p>
                        <p>{UPEX.lang.template('用于用户的登录验证')}</p>
                    </Col>
                    <Col className="level" span={8} />
                    <Col className="operator" span={8}>
                        <Button>
                            <Link to="/user/resetpwd">{UPEX.lang.template('修改')}</Link>
                        </Button>
                    </Col>
                </Row>
                <Row className="pwd bottom-radius-6">
                    <Col className="title" span={8}>
                        <p>{UPEX.lang.template('交易密码')}</p>
                        <p>{UPEX.lang.template('用於交易、綁定解綁銀行卡充幣提現等資金 操作，需要嚴格保密')}</p>
                        <div className="forget-pwd">
                            {userInfo.isValidatePass ? <Link  className="ace-link" to="/user/forgetTradingPassword">{UPEX.lang.template('忘记交易密码？')}</Link> : null}
                        </div>
                    </Col>
                    <Col className="level" span={8} />
                    <Col className="operator" span={8}>
                        <span className="switch">
                            {UPEX.lang.template('啟用委託認證')}
                            {userInfo.isValidatePhone ? <Switch onChange={this.passwordSwitch} checked={isEnableFdPassword} /> : null}
                        </span>
                        <Button>
                            {userInfo.phone ? (
                                !userInfo.isValidatePass ? (
                                    <Link to="/user/settingTraddingPassword">{UPEX.lang.template('添加')}</Link>
                                ) : (
                                    <Link to="/user/modifyTraddingPassword">{UPEX.lang.template('修改')}</Link>
                                )
                            ) : (
                                <Link to="/user/settingPhone">{UPEX.lang.template('绑定手机')}</Link>
                            )}
                        </Button>
                    </Col>
                </Row>
                <div className="message">{UPEX.lang.template('※為了您的資金安全，忘記交易密碼并修改成功后，24小時內不可以提現提幣。')}</div>
                <Modal
                    title={UPEX.lang.template('请输入交易密码')}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={loading}
                    onCancel={this.cancelHandle}
                >
                    <div>
                        <div className="item">
                            <Input
                                onChange={this.pwdChange}
                                value={this.state.pwd}
                                type="password"
                                size="large"
                                placeholder={UPEX.lang.template('请输入交易密码')}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
