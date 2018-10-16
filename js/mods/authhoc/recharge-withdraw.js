/**
 * 充提币 充提现 kyc校验 资金密码检测
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Alert, Button, Icon } from 'antd';
import PageWrapper from '@/mods/common/wrapper/full-page';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import { browserHistory } from 'react-router';

@inject('commonStore', 'userInfoStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        const { userInfoStore, commonStore } = this.props;
        Promise.all([userInfoStore.getUserInfo(), userInfoStore.getActionLimit(), commonStore.getAllCoinPoint()])
            .then(res => {
                this.setState({
                    loading: false
                });
            })
            .catch(err => {
                console.error('getUserInfo getActionLimit', err);
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        /**
         * props {pageInfo, name}
         * name：actionRoles字段， 不同action逻辑判定 （w）
         * recharge: "1"
            recharge coin: "1"
            sell: "1"
            transfer: "1"
            withdraw: "1"
            withdraw coin: "1"
         *  */
        const { state, props } = this;
        let $content = null;

        // 加载中
        if (state.loading) {
            return <PageWrapper {...props.pageInfo}>{$content}</PageWrapper>;
        }
        // 通用 检测kyc
        const { userInfo, actionRoles } = this.props.userInfoStore;
        const { coinsMap } = this.props.commonStore;
        if ([-1, 0, 1].indexOf(userInfo.isAuthPrimary) !== -1) {
            // kyc 不符合
            return (
                <PageWrapper {...props.pageInfo}>
                    <FormView>
                        <div className="userauth-guide">
                            <h4>{UPEX.lang.template('请您进行身份认证，否则无法进行充值、提现、充币、提币操作')}</h4>
                            <Button
                                className="submit-btn"
                                onClick={e => {
                                    browserHistory.push('/user/authentication');
                                }}
                            >
                                {UPEX.lang.template('身份认证')}
                            </Button>
                        </div>
                    </FormView>
                </PageWrapper>
            );
        }
        // withdraw 资金密码检测
        if (['withdraw', 'withdraw coin'].indexOf(props.name) !== -1) {
            if (userInfo.isValidatePass !== 1) {
                //  未设置交易密码
                return (
                    <PageWrapper {...props.pageInfo}>
                        <FormView>
                            <div className="userauth-guide">
                                <h4>{UPEX.lang.template('请您先设置资金密码，否则无法进行提币、提现操作')}</h4>
                                <Button
                                    className="submit-btn"
                                    onClick={e => {
                                        browserHistory.push('/user/set-trade-pwd');
                                    }}
                                >
                                    {UPEX.lang.template('设置资金密码')}
                                </Button>
                            </div>
                        </FormView>
                    </PageWrapper>
                );
            }
        }

        // ace recharge withdraw 充提现 限制
        if (UPEX.config.version === 'ace') {
            let actionDisabled = false;
            let warnContent = null;
            console.log(actionRoles, coinsMap);
            let currency = coinsMap[UPEX.config.baseCurrencyEn] || {};
            // 充值
            if (props.name === 'recharge') {
                if (parseInt(actionRoles.recharge) !== 1 || parseInt(currency.rechargeStatus) !== 1) {
                    actionDisabled = true;
                }
                warnContent =
                    parseInt(actionRoles.recharge) !== 1
                        ? UPEX.lang.template('账号被限制充值，如有疑问请联系客服')
                        : UPEX.lang.template('系统维护中，暂停充值');
            }
            // 提现
            if (props.name === 'withdraw') {
                if (parseInt(actionRoles.withdraw) !== 1 || parseInt(currency.withdrawStatus) !== 1) {
                    actionDisabled = true;
                }
                warnContent =
                    parseInt(actionRoles.withdraw) !== 1 ? UPEX.lang.template('账号被限制提现，如有疑问请联系客服') : UPEX.lang.template('系统维护中，暂停提');
            }
            if (actionDisabled) {
                return (
                    <PageWrapper {...props.pageInfo}>
                        <FormView>
                            <FormItem>
                                <Alert
                                    message={
                                        <span className="warn-text">
                                            <Icon type="exclamation-circle" />
                                            {warnContent}
                                        </span>
                                    }
                                    type="error"
                                />
                            </FormItem>

                            <div className="userauth-guide">
                                <Button
                                    className="submit-btn"
                                    onClick={e => {
                                        browserHistory.push('/account');
                                    }}
                                >
                                    {UPEX.lang.template('返回')}
                                </Button>
                            </div>
                        </FormView>
                    </PageWrapper>
                );
            }
        }

        // 一切正常
        return this.props.children;
    }
}

export default View;
