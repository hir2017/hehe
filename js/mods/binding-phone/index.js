/**
 * @fileoverview  绑定手机
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch, Modal, Input, message, Row, Col } from 'antd';
import { Link } from 'react-router';
import Vcodebutton from '../common/authcode-btn';

@inject('userInfoStore')
@observer
export default class Phone extends Component {
    componentWillMount() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        this.props.userInfoStore.getUserInfo();
    }

    phoneSwitch = checked => {
        const userInfo = this.props.userInfoStore.userInfo || {};
        if (!userInfo.phone) {
            message.error('请先绑定手机');
            return null;
        }
        this.setState({
            visible: true,
            vCode: '',
            checked: checked
        });
    };

    state = {
        visible: false,
        checked: false,
        vCode: ''
    };

    vCodeChange = e => {
        this.setState({
            vCode: e.target.value
        });
    };

    handleOk = () => {
        const { vCode, checked } = this.state;
        if (!vCode) {
            message.error(UPEX.lang.template('短信验证码不能为空'));
            return;
        }
        this.props.userInfoStore.phoneSwitch(vCode, checked ? 1 : 0).then(data => {
            let nextState = {
                visible: false
            };
            this.setState(nextState);
            if (data) {
                this.props.userInfoStore.getUserInfo();
            }
        });
    };

    cancelHandle = () => {
        this.setState({
            visible: false,
            vCode: ''
        });
    };

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const userInfo = this.props.userInfoStore.userInfo || {};
        const checked = userInfo.isPhoneAuth ? true : false;
        return (
            <div className="common-setting-box">
                <Row className="pwd top-radius-6 bottom-radius-6">
                    <Col className="title" span={8}>
                        <p>{userInfo.phone || UPEX.lang.template('请添加手机')}</p>
                        <p>{UPEX.lang.template('提現、修改密碼，及安全設置時接收短信使用')}</p>
                    </Col>
                    <Col  span={8} />
                    <Col className="operator" span={8}>
                        {
                            <div className="switch">
                                {UPEX.lang.template('启用登录手机认证')}
                                <Switch onChange={this.phoneSwitch} loading={loading} checked={checked} />
                            </div>
                        }
                        <Button>
                            {userInfo.phone ? (
                                <Link to="/user/modifyPhone">{UPEX.lang.template('修改')}</Link>
                            ) : (
                                <Link to="/user/settingPhone">{UPEX.lang.template('添加')}</Link>
                            )}
                        </Button>
                    </Col>
                </Row>
                <div className="message">
                    <p>※{UPEX.lang.template('為了您的安全或者降低手機遺失的風險，請在綁定手機號后立即綁定Google驗證器')}。</p>
                    <p>※{UPEX.lang.template('為了您的資金安全，修改手機綁定后，24小時內不可以提現提幣')}</p>
                </div>

                <Modal
                    title={UPEX.lang.template('请输入短信验证码')}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={loading}
                    onCancel={this.cancelHandle}
                >
                    <div>
                        <div className="item">
                            <Input
                                value={this.state.vCode}
                                onChange={this.vCodeChange}
                                addonAfter={<Vcodebutton phoneAuth={true} type="1" style={{ lineHeight: 'normal', height: 'auto' }} />}
                                size="large"
                                placeholder={UPEX.lang.template('请输入短信验证码')}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
