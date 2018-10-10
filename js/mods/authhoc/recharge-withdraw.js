/**
 * 充提币 充提现 校验
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Alert, Button } from 'antd';
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
        const userStore = this.props.userInfoStore;
        Promise.all([userStore.getUserInfo(), userStore.getActionLimit()])
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
        const { userInfo } = this.props.userInfoStore;
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
        // withdraw 检测交易密码
        if(['withdraw', 'withdraw coin'].indexOf(props.name) !== -1) {
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

        // 一切正常
        return this.props.children;
    }
}

export default View;
