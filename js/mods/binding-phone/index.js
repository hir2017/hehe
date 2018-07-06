import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch, Modal, Input, message, Row, Col } from 'antd';
import { browserHistory } from 'react-router';
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
            message.error(UPEX.lang.template('请填写短信验证码'));
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
        let optData = {
            set: {
                path: '/user/settingPhone',
                label: UPEX.lang.template('添加'),
                class: 'ace-secondary',
            },
            modify: {
                path: '/user/modify-phone',
                label: UPEX.lang.template('修改'),
                class: 'ace-btn-white',
            },
        }
        let currBtn = optData[userInfo.phone ? 'modify' : 'set'];
        return (
            <div className="common-setting-box">
                <Row className="pwd top-radius-6 bottom-radius-6">
                    <Col className="title" span={8}>
                        <p>{userInfo.phone || UPEX.lang.template('请添加手机')}</p>
                        <p>{UPEX.lang.template('提现、修改密码，及安全设置时接收短信使用')}</p>
                    </Col>
                    <Col  span={8} />
                    <Col className="operator" span={8}>
                        <Button className={currBtn.class} onClick={e => {browserHistory.push(currBtn.path)}}>
                            {currBtn.label}
                        </Button>
                    </Col>
                </Row>
                <div className="message">
                    <p>{UPEX.lang.template('为了您的安全或者降低手机遗失的风险，请在绑定手机号后立即绑定Google验证器')}。</p>
                    <p>{UPEX.lang.template('为了您的资金安全，修改手机绑定后，24小时内不可以提现提币')}</p>
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
