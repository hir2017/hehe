import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Input, message } from 'antd';
import Vcodebutton from '@/mods/common/authcode-btn';
import AceSection from '@/components/page-user/section';
const Confirm = Modal.confirm;

class List extends Component {
    render() {
        const { dataSource, getStatus, clickHandle } = this.props;
        return (
            <ul>
                {dataSource.map((item, index) => {
                    return (
                        <li key={index}>
                            <dl>
                                <dd className="time">{item.createTime}</dd>
                                <dd className="bank">{item.branchName}</dd>
                                <dd className="sub">{item.openBank}</dd>
                                <dd className="account">{item.cardNo}</dd>
                                <dd className="status">{getStatus(item.status)}</dd>
                                <dd
                                    className="btn"
                                    onClick={() => {
                                        clickHandle(item.status, item.id);
                                    }}
                                    style={{ cursor: 'pointer', color: '#cc9900' }}
                                >
                                    {item.status === 2 ? UPEX.lang.template('删除') : item.status === 1 ? UPEX.lang.template('解绑') : '-'}
                                </dd>
                            </dl>
                        </li>
                    );
                })}
            </ul>
        );
    }
}



@inject('userInfoStore', 'captchaStore', 'authStore')
@observer
export default class BankList extends Component {
    state = {
        visible: false,
        vCode: '',
        pwd: '',
        ivCode: '',
        id: ''
    };

    componentWillMount() {
        this.props.userInfoStore.bankCardInfo();
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        gaBindSuccess || this.props.userInfoStore.isGoogleAuth();
    }

    status(num) {
        switch (num) {
            case 3:
                return UPEX.lang.template('等待审核');
                break;
            case 2:
                return UPEX.lang.template('已拒绝');
                break;
            case 1:
                return UPEX.lang.template('已绑定');
                break;
            default:
                return num;
                break;
        }
    }

    bankHandle = (num, id) => {
        const bankCardList = this.props.userInfoStore.bankCardList || [];
        if (num === 1) {
            let bindList = bankCardList.filter(item => item.status === 1);
            if (bindList.length < 2) {
                message.error(UPEX.lang.template('当前级别至少要绑定一张银行卡'));
                return;
            }
        }

        if (num === 2) {
            Confirm({
                title: UPEX.lang.template('是否删除该银行卡?'),
                content: '',
                okText: UPEX.lang.template('确定'),
                okType: 'danger',
                cancelText: UPEX.lang.template('取消'),
                onOk: () => {
                    this.props.userInfoStore.deleteBindBankCard(id);
                },
                onCancel() {

                }
            });
        } else if (num === 1) {
            this.props.captchaStore.fetch();
            this.setState({
                visible: true,
                id: id
            });
        }
    };
    handleOk = () => {
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        if (!this.state.pwd) {
            message.error(UPEX.lang.template('请输入资金密码'));
            return;
        }
        if (!this.state.vCode && gaBindSuccess) {
            message.error(UPEX.lang.template('请填写Google验证码'));
            return;
        }
        if (!this.state.ivCode && !gaBindSuccess) {
            message.error(UPEX.lang.template('请填写图片验证码'));
            return;
        }
        if (!this.state.vCode && !gaBindSuccess) {
            message.error(UPEX.lang.template('请填写手机验证码'));
            return;
        }
        const pwd = md5(this.state.pwd + UPEX.config.dealSalt + this.props.authStore.uid);
        let req;
        if (gaBindSuccess) {
            req = this.props.userInfoStore.updateBindBankCard(this.state.id, pwd, this.state.vCode);
        } else {
            req = this.props.userInfoStore.updateBindBankCard(this.state.id, pwd, '', this.state.vCode);
        }
        req.then((res = {}) => {
            if(res.status !== 200) {
                this.props.captchaStore.fetch();
            } else {
                this.props.userInfoStore.bankCardInfo();
                this.setState({
                    visible: false,
                    vCode: '',
                    pwd: '',
                    ivCode: ''
                });
            }

        })

    };

    handleCancel = () => {
        this.setState({
            visible: false,
            vCode: '',
            pwd: '',
            ivCode: ''
        });
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

    ivCodeChange = e => {
        this.setState({
            ivCode: e.target.value
        });
    };

    captchaChange = () => {
        this.props.captchaStore.fetch();
    };

    render() {
        const codeid = this.props.captchaStore.codeid;
        const bankCardList = this.props.userInfoStore.bankCardList || [];
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        const captcha = this.props.captchaStore.captcha;
        let $content;

        if (bankCardList.length == 0) {
            $content = <div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无数据')}</div>;
        } else {
            $content = <List getStatus={this.status.bind(this)} clickHandle={this.bankHandle.bind(this)} dataSource={bankCardList}/>;
        }
        return (
            <AceSection title={UPEX.lang.template('银行卡账号设定记录')} className="list">
                <div className="account-result-list bank-card-log">
                    <div className="table-hd">
                        <ul>
                            <li>
                                <dl>
                                    <dd className="time">{UPEX.lang.template('提交时间')}</dd>
                                    <dd className="bank">{UPEX.lang.template('银行')}</dd>
                                    <dd className="sub">{UPEX.lang.template('分行')}</dd>
                                    <dd className="account">{UPEX.lang.template('账号')}</dd>
                                    <dd className="status">{UPEX.lang.template('状态')}</dd>
                                    <dd className="btn">{UPEX.lang.template('操作')}</dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <div className="table-bd">{$content}</div>
                </div>
                <Modal title={UPEX.lang.template('解绑银行卡')} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div className="item" style={{ marginBottom: '20px' }}>
                        <Input type="password" value={this.state.pwd} onChange={this.pwdChange} placeholder={UPEX.lang.template('请输入资金密码')} />
                    </div>
                    {gaBindSuccess ? (
                        <div className="item">
                            <Input value={this.state.vCode} onChange={this.vCodeChange} size="large" placeholder={UPEX.lang.template('请填写Google验证码')} />
                        </div>
                    ) : (
                        <div className="item">
                            <Input
                                style={{ marginBottom: '20px' }}
                                value={this.state.ivCode}
                                onChange={this.ivCodeChange}
                                addonAfter={<img onClick={this.captchaChange} src={captcha} />}
                                size="large"
                                placeholder={UPEX.lang.template('请填写图片验证码')}
                            />
                            <Input
                                value={this.state.vCode}
                                onChange={this.vCodeChange}
                                addonAfter={
                                    <Vcodebutton
                                        imgCode={this.state.ivCode}
                                        codeid={codeid}
                                        bankAndWithdraw={true}
                                        style={{ lineHeight: 'normal', height: 'auto' }}
                                    />
                                }
                                size="large"
                                placeholder={UPEX.lang.template('请填写短信验证码')}
                            />
                        </div>
                    )}
                </Modal>
            </AceSection>
        );
    }
}
