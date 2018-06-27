/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Input, message } from 'antd';
import Vcodebutton from '../common/authcode-btn';
const Confirm = Modal.confirm;

import AceSection from '../../common-mods/page-user/section';

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
        this.props.captchaStore.fetch();
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
        /*
        {item.status === 2
        ? UPEX.lang.template('删除')
        : item.status === 1
            ? UPEX.lang.template('解绑')
            : '-'}
        */
        const bankCardList = this.props.userInfoStore.bankCardList || [];
        if(num === 1) {
            if(bankCardList.length === 1) {
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
                    console.log('Cancel');
                },
            });

        } else if (num === 1) {
            this.setState({
                visible: true,
                id: id
            });
        }
    };
    handleOk = () => {
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        if (!this.state.pwd) {
            message.error(UPEX.lang.template('交易密码不能空'));
            return;
        }
        if (!this.state.vCode && gaBindSuccess) {
            message.error(UPEX.lang.template('谷歌验证码不能空'));
            return;
        }
        if (!this.state.ivCode && !gaBindSuccess) {
            message.error(UPEX.lang.template('图片验证码不能空'));
            return;
        }
        if (!this.state.vCode && !gaBindSuccess) {
            message.error(UPEX.lang.template('手机验证码不能空'));
            return;
        }
        const pwd = md5(this.state.pwd + UPEX.config.dealSalt + this.props.authStore.uid);
        if (gaBindSuccess) {
            this.props.userInfoStore.updateBindBankCard(this.state.id, pwd, this.state.vCode);
        } else {
            this.props.userInfoStore.updateBindBankCard(this.state.id, pwd, '', this.state.vCode);
        }
        this.setState({
            visible: false,
            vCode: '',
            pwd: '',
            ivCode: '',
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            vCode: '',
            pwd: '',
            ivCode: '',
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
        return (

            <AceSection title={UPEX.lang.template('银行卡账号设定记录')} className="list">
                <div>
                    <div className="ant-table ant-table-large ant-table-fixed-header ant-table-scroll-position-left">
                        <div className="ant-table-content">
                            <div className="ant-table-scroll">
                                <div className="ant-table-header">
                                    <table className="">
                                        <colgroup>
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                        </colgroup>
                                        <thead className="ant-table-thead">
                                            <tr>
                                                <th>{UPEX.lang.template('提交时间')}</th>
                                                <th>{UPEX.lang.template('银行')}</th>
                                                <th>{UPEX.lang.template('分行')}</th>
                                                <th>{UPEX.lang.template('账号')}</th>
                                                <th>{UPEX.lang.template('状态')}</th>
                                                <th>{UPEX.lang.template('操作')}</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="ant-table-body">
                                    <table className="">
                                        <colgroup>
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                            <col style={{ width: '172px', minWidth: '172px' }} />
                                        </colgroup>
                                        <tbody className="ant-table-tbody">
                                            {bankCardList.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.createTime}</td>
                                                        <td>{item.branchName}</td>
                                                        <td>{item.openBank}</td>
                                                        <td>{item.cardNo}</td>
                                                        <td>{this.status(item.status)}</td>
                                                        <td
                                                            onClick={() => {
                                                                this.bankHandle(item.status, item.id);
                                                            }}
                                                            style={{ cursor: 'pointer', color: '#cc9900' }}
                                                        >
                                                            {item.status === 2
                                                                ? UPEX.lang.template('删除')
                                                                : item.status === 1
                                                                    ? UPEX.lang.template('解绑')
                                                                    : '-'}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal title={UPEX.lang.template('解绑银行卡')} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div className="item" style={{ marginBottom: '20px' }}>
                        <Input type="password"  value={this.state.pwd} onChange={this.pwdChange} placeholder={UPEX.lang.template('请输入交易密码')} />
                    </div>
                    {gaBindSuccess ? (
                        <div className="item">
                            <Input value={this.state.vCode} onChange={this.vCodeChange} size="large" placeholder={UPEX.lang.template('请输入谷歌验证码')} />
                        </div>
                    ) : (
                        <div className="item">
                            <Input
                                style={{ marginBottom: '20px' }}
                                value={this.state.ivCode}
                                onChange={this.ivCodeChange}
                                addonAfter={<img onClick={this.captchaChange} src={captcha} />}
                                size="large"
                                placeholder={UPEX.lang.template('请输入图片验证码')}
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
                                placeholder={UPEX.lang.template('请输入短信验证码')}
                            />
                        </div>
                    )}
                </Modal>
            </AceSection>
        );
    }
}
