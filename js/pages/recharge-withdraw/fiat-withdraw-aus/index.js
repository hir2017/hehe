/**
 * 法币提现
 */
import React from 'react';
import {observer, inject} from 'mobx-react';
import {Button, message, Alert} from 'antd';
import {browserHistory} from 'react-router';
import {ausOrderFiatWithdraw, ausGetQuotaManagementInfo, ausGetCurrencyFee} from '@/api/http';
import PageWrapper from '@/mods/common/wrapper/full-page';
import NumberUtils from '@/lib/util/number';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import AuthWrapper from '@/mods/authhoc/recharge-withdraw';
import Step1 from './step1';
import Step2 from './step2';

@inject('userInfoStore', 'authStore', 'commonStore')
@observer
class View extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            info: {},
            loading: true,
            dayLimit: 0,
            perLimit: 0,
            actionStatus: 0, // 提现行为限制  0:未获取 1:允许  2:禁止
            feeInfo: {}
        };
        this.errorMsgMap = {
            // 用户当日提现总额超过当日限制额度
            '13505': UPEX.lang.template('用户提现金额超过当日提现限制额度余额'),
            // 用户当日提现总额超过当月限制额度
            '135051': UPEX.lang.template('用户提现金额超过当月提现限制额度余额'),
            // 未查询到限额管理数据信息
            '13506': UPEX.lang.template('未查询到限额管理数据信息'),
            // 用户未发送手机验证码
            '13109': UPEX.lang.template('请点击获取手机验证码')
        };
        this.pageInfo = {
            title: UPEX.lang.template('账户提现'),
            className: 'fiat-withdraw-aus header-shadow fiat-withdraw-base'
        };

        this.bottomTip = (
            <FormView>
                <FormItem>
                    <div className="bottom-tips"
                         dangerouslySetInnerHTML={{__html: UPEX.lang.template('提现遇到了问题,我们只支持本人开户的银行卡提现...')}}/>
                </FormItem>
            </FormView>
        );
    }

    setVal(name, e) {
        this.setState({
            [name]: typeof e === 'object' ? e.target.value.trim() : e
        });
    }

    componentDidMount() {
        const {userInfoStore, commonStore} = this.props;

        Promise.all([commonStore.getAllCoinPoint(), userInfoStore.getActionLimit()])
            .then(([res1, res2]) => {
                if (res2.status !== 200) {
                    return;
                }
                const {withdraw} = userInfoStore.actionRoles;
                let baseCurrency = commonStore.coinsMap[UPEX.config.baseCurrencyEn];
                // 检测充值限制
                let disabled = parseInt(withdraw) !== 1 || parseInt(baseCurrency.withdrawStatus) !== 1;
                if (disabled) {
                    this.setState({
                        actionStatus: 2
                    });
                } else {
                    this.setState({
                        actionStatus: 1
                    });
                }

            })
            .catch(err => {
                console.error('componentDidMount withdraw aus', err);
            }).then(res => {
            this.setState({
                step: 1,
                loading: false
            });
        });

        // kyc限额信息
        ausGetQuotaManagementInfo({
            actionId: 2,
            currencyId: 1
        })
            .then(res => {
                let result = {};
                if (res.status === 200) {
                    const {authLevel = 1} = this.props.userInfoStore.userInfo;
                    result.dayLimit = NumberUtils.separate(res.attachment[0][`kyc${authLevel}DayLimit`]);
                    result.perLimit = NumberUtils.separate(res.attachment[0][`kyc${authLevel}PerLimit`]);
                }

                this.setState(result);
            })
            .catch(err => {
                console.error('AusGetQuotaManagementInfo', err);
            });
        // 获取提现手续费信息
        ausGetCurrencyFee({
            actionId: 2,
            currencyId: 1
        }).then(res => {
            if (res.status === 200) {
                this.setState({
                    feeInfo: res.attachment
                })
            }
        })
    }

    next(step, data) {
        const {userInfoStore, authStore} = this.props;
        const {userInfo} = userInfoStore;
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
            const {info} = this.state;
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

    step3Action(action) {
        if (action === 'record') {
            browserHistory.push('/account/asset-change/withdraw');
        }
        if (action === 'reset') {
            this.setState({
                step: 1,
                info: {}
            });
        }
    }

    render() {
        const {state} = this;
        const userInfo = this.props.userInfoStore.userInfo || {};

        let $alert = null;
        let $step = null;
        let $bottomTip = null;
        if ([1, 2].indexOf(state.step) !== -1) {
            let alertMsg = UPEX.lang.template('单日提现限额 {num1}', {num1: state.dayLimit}) + ' ' + UPEX.config.baseCurrencyEn;
            if (state.actionStatus === 2) {
                alertMsg = UPEX.lang.template('当前币种暂停此操作');
            }
            $alert = (
                <Alert
                    className="ace-form-tips"
                    showIcon
                    message={alertMsg}
                    type="warning"
                />
            );
        }

        // 一二步骤 有alert和bottom
        switch (state.step) {
            case 1:
                $step = <Step1 init={state.info} actionStatus={state.actionStatus} perLimit={state.perLimit} feeInfo={state.feeInfo}
                               next={this.next.bind(this)}/>;
                $bottomTip = this.bottomTip;
                break;
            case 2:
                $step = <Step2 name={state.info.name} isGa={userInfo.isGoogleAuth} info={state.info}
                               next={this.next.bind(this)}/>;
                $bottomTip = this.bottomTip;
                break;
            case 3:
                $step = (
                    <FormView>
                        <FormItem className="success-info">
                            <p>{UPEX.lang.template('提现申请已提交')}</p>
                            <p>{UPEX.lang.template('申请进度请通过资金记录查询')}</p>
                        </FormItem>
                        <FormItem className="success-opt">
                            <Button className="link-btn ">{UPEX.lang.template('继续提现')}</Button>
                            <Button className="submit-btn width-auto" onClick={this.step3Action.bind(this, 'record')}>
                                {UPEX.lang.template('前往资金记录')}
                            </Button>
                            <Button className="link-btn " onClick={this.step3Action.bind(this, 'reset')}>
                                {UPEX.lang.template('继续提现')}
                            </Button>
                        </FormItem>
                    </FormView>
                );
                break;
            default:
                break;
        }
        return (
            <AuthWrapper pageInfo={this.pageInfo} name="withdraw">
                <PageWrapper {...this.pageInfo}>
                    {$alert}
                    {$step}
                    {$bottomTip}
                </PageWrapper>
            </AuthWrapper>
        );
    }
}

export default View;
