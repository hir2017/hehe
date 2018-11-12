import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch, Modal, Input, message, Row, Col } from 'antd';
import { Link, browserHistory } from 'react-router';

import {Loading} from '@/mods/authhoc/user';

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
        msg =
            (userInfo.isValidatePhone === 0 && UPEX.lang.template('请先绑定手机')) || (userInfo.isValidatePass === 0 && UPEX.lang.template('请先设置资金密码'));
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
            message.error(UPEX.lang.template('请输入资金密码'));
            return;
        }
        const pwd = md5(this.state.pwd + UPEX.config.dealSalt + this.props.authStore.uid);
        this.props.userInfoStore.fdPwdSwitch(pwd, this.state.checked ? 1 : 2).then(res => {
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
        const store = this.props.userInfoStore;
        const {submit_loading: loading, userInfo = {}} = store;
        const isEnableFdPassword = userInfo.isEnableFdPassword !== 2 ? true : false;
        let tradePwdData = {
            noPhone: {
                path: '/user/setting-phone',
                label: UPEX.lang.template('绑定手机'),
                class: 'exc-secondary'
            },
            noPass: {
                path: '/user/set-trade-pwd',
                label: UPEX.lang.template('添加'),
                class: 'exc-secondary'
            },
            modify: {
                path: '/user/modify-trade-pwd',
                label: UPEX.lang.template('修改'),
                class: 'exc-btn-white'
            }
        };
        let currTradePwd;
        switch (true) {
            case userInfo.isValidatePhone !== 1:
                currTradePwd = tradePwdData.noPhone;
                break;
            case !userInfo.isValidatePass:
                currTradePwd = tradePwdData.noPass;
                break;
            default:
                currTradePwd = tradePwdData.modify;
                break;
        }

        return (
            <Loading init={store.getUserInfo}>
                <div className="common-setting-box">
                    <Row className="pwd no-bottom top-radius-6">
                        <Col className="title col-exc" span={8}>
                            <p dangerouslySetInnerHTML={{ __html: UPEX.lang.template('登录密码（密码至少由大写字母＋小写字母＋数字，8-16位组成）') }} />
                            <p>{UPEX.lang.template('用于用户的登录验证')}</p>
                        </Col>
                        {/*   <Col className="level col-exc" span={8} />*/}
                        <Col className="operator col-exc" span={8}>
                            <Button
                                onClick={e => {
                                    browserHistory.push('/user/resetpwd');
                                }}
                                className="exc-btn-white"
                            >
                                {UPEX.lang.template('修改')}
                            </Button>
                        </Col>
                    </Row>
                    <Row className="pwd bottom-radius-6">
                        <Col className="title col-exc" span={12}>
                            <p>{UPEX.lang.template('资金密码')}</p>
                            <p>{UPEX.lang.template('用于交易、绑定解绑银行卡充币提现等资金操作，需要严格保密')}</p>
                        </Col>
                        <Col className="operator col-exc" span={12}>
                            {userInfo.isValidatePhone ? (
                                <span className="switch">
                                    {UPEX.lang.template('启用委托认证')}
                                    <Switch onChange={this.passwordSwitch} checked={isEnableFdPassword} />
                                </span>
                            ) : null}
                            <Button
                                onClick={e => {
                                    browserHistory.push(currTradePwd.path);
                                }}
                                className={currTradePwd.class}
                            >
                                {currTradePwd.label}
                            </Button>
                            {userInfo.isValidatePass ? (
                                <Link className="exc-link forget-pwd" to="/user/forget-trade-pwd">
                                    {UPEX.lang.template('忘记密码?')}
                                </Link>
                            ) : null}
                        </Col>
                    </Row>
                    <div className="message">{UPEX.lang.template('为了您的资金安全，忘记资金密码并修改成功后，24小时内不可以提现充币')}</div>
                    <Modal
                        title={UPEX.lang.template('请输入资金密码')}
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
                                    placeholder={UPEX.lang.template('请输入资金密码')}
                                />
                            </div>
                        </div>
                    </Modal>
                </div>
            </Loading>
        );
    }
}
