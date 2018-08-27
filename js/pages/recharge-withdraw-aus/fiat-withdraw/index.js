/**
 * 法币提现
 */
import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message, Alert } from 'antd';
import { browserHistory } from 'react-router';
import { ausOrderFiatWithdraw, ausGetQuotaManagementInfo } from '@/api/http';
import PageWrapper from '@/mods/common/wrapper/full-page';
import NumberUtils from '@/lib/util/number';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';

import Step1 from './step1';
import Step2 from './step2';

@inject('userInfoStore', 'authStore')
@observer
class View extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            info: {},
            loading: true,
            dayLimit: 0,
            perLimit: 0
        };
        this.errorMsgMap = {
            // 查询发生异常
            '13501': UPEX.lang.template('请求发送失败'),
            // 参数验证失败
            '13502': UPEX.lang.template('请填写完整提现信息'),
            // 用户KYC等级不正确
            '13503': UPEX.lang.template('用户身份认证未完成'),
            // 用户当日提现总额超过当日限制额度
            '13505': UPEX.lang.template('用户提现金额超过当日提现限制额度余额'),
            // 用户当日提现总额超过当月限制额度
            '135051': UPEX.lang.template('用户提现金额超过当月提现限制额度余额'),
            // 未查询到限额管理数据信息
            '13506': UPEX.lang.template('未查询到限额管理数据信息'),
            // 用户未发送手机验证码
            '13109': UPEX.lang.template('请点击获取手机验证码')
        };
    }

    setVal(name, e) {
        this.setState({
            [name]: typeof e === 'object' ? e.target.value.trim() : e
        });
    }

    componentDidMount() {
        // 请求用户信息
        this.props.userInfoStore
            .getUserInfo()
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        step: [-1, 0, 1].indexOf(res.attachment.isAuthPrimary) !== -1 ? -1 : 1
                    });
                }
            })
            .catch(err => {
                console.error(err, 'componentDidMount');
                this.setState({
                    step: 1
                });
            })
            .then(data => {
                this.setState({
                    loading: false
                });
            });
        // 请求BPAY和银行账号信息
        ausGetQuotaManagementInfo({
            actionId: 2,
            currencyId: 1
        })
            .then(res => {
                let result = {};
                if (res.status === 200) {
                    const { authLevel = 1 } = this.props.userInfoStore.userInfo;
                    result.dayLimit = NumberUtils.separate(res.attachment[0][`kyc${authLevel}DayLimit`]);
                    result.perLimit = NumberUtils.separate(res.attachment[0][`kyc${authLevel}PerLimit`]);
                }

                this.setState(result);
            })
            .catch(err => {
                console.error('AusGetQuotaManagementInfo', err);
            });
    }

    next(step, data) {
        const { userInfoStore, authStore } = this.props;
        const {userInfo} = userInfoStore
        if (step === 1) {
            this.setState({
                step: 1,
                pwd: {}
            });
        }
        if (step === 2) {
            this.setState({
                step: 2,
                info: data
            });
        }
        if (step === 3) {
            const { info } = this.state;
            const params = {
                currencyId: 1,
                tradePwd: md5(data.tradePwd + UPEX.config.dealSalt + authStore.uid),
                accountNumber: info.account,
                bsb: info.BSB,
                swiftCode: '',
                address: '',
                accountName: info.name,
                amount: info.amount,
                gAuth: data.gaCode,
                phoneCode: data.smsCode,
                validateType: userInfo.isGoogleAuth === 1 ? 1 : 2
            };
            ausOrderFiatWithdraw(params)
                .then(res => {
                    if (res.status === 200) {
                        this.setState({
                            step: 3,
                            pwd: data
                        });
                    } else {
                        message.error(this.errorMsgMap[res.status] || res.message);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    render() {
        const { state } = this;
        const userInfo = this.props.userInfoStore.userInfo || {};

        if (state.loading) {
            return (
                <PageWrapper title={UPEX.lang.template('账户提现')} className="fiat-withdraw-aus">
                    <FormView>
                        <FormItem className="success-info">
                            <p />
                        </FormItem>
                    </FormView>
                </PageWrapper>
            );
        }
        // 未未身份认证或设置资金密码
        if (state.step === -1 || userInfo.isValidatePass !== 1) {
            return (
                <PageWrapper title={UPEX.lang.template('账户提现')} className="fiat-withdraw-aus">
                    <FormView>
                        <FormItem className="success-info">
                            <p />
                        </FormItem>
                        <FormItem className="success-opt">
                            <Button
                                className="submit-btn width-auto"
                                onClick={e => {
                                    browserHistory.push(state.step === -1 ? '/user/authentication' : '/user/set-trade-pwd');
                                }}
                            >
                                {state.step === -1 ? UPEX.lang.template('去完成身份认证') : UPEX.lang.template('请先设置资金密码')}
                            </Button>
                        </FormItem>
                    </FormView>
                </PageWrapper>
            );
        } else {
            return (
                <PageWrapper title={UPEX.lang.template('账户提现')} className="fiat-withdraw-aus header-shadow">
                    {[1, 2].indexOf(state.step) !== -1 ? (
                        <Alert
                            className="ace-form-tips"
                            showIcon
                            message={UPEX.lang.template('单日提现限额 {num1}', { num1: state.dayLimit }) + ' ' + UPEX.config.baseCurrencyEn}
                            type="warning"
                        />
                    ) : null}
                    {state.step === 1 ? <Step1 init={state.info} perLimit={state.perLimit} next={this.next.bind(this)} /> : null}
                    {state.step === 2 ? <Step2 name={state.info.name} isGa={userInfo.isGoogleAuth} info={state.info} next={this.next.bind(this)} /> : null}
                    {state.step !== 3 && state.step !== -1 ? (
                        <FormView>
                            <FormItem>
                                <div
                                    className="bottom-tips"
                                    dangerouslySetInnerHTML={{ __html: UPEX.lang.template('提现遇到了问题,我们只支持本人开户的银行卡提现...') }}
                                />
                            </FormItem>
                        </FormView>
                    ) : null}
                    {state.step === 3 ? (
                        <FormView>
                            <FormItem className="success-info">
                                <p>{UPEX.lang.template('提现申请已提交')}</p>
                                <p>{UPEX.lang.template('申请进度请通过资金记录查询')}</p>
                            </FormItem>
                            <FormItem className="success-opt">
                                <Button className="link-btn ">{UPEX.lang.template('继续提现')}</Button>
                                <Button
                                    className="submit-btn width-auto"
                                    onClick={e => {
                                        browserHistory.push('/account/fiatrecord');
                                    }}
                                >
                                    {UPEX.lang.template('前往资金记录')}
                                </Button>
                                <Button
                                    className="link-btn "
                                    onClick={e => {
                                        this.setState({
                                            step: 1,
                                            info: {}
                                        });
                                    }}
                                >
                                    {UPEX.lang.template('继续提现')}
                                </Button>
                            </FormItem>
                        </FormView>
                    ) : null}
                </PageWrapper>
            );
        }
    }
}

export default View;
