import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message, Alert, AutoComplete, Input, Icon, Button } from 'antd';
const Option = Select.Option;
import toAction from './coin-withdraw-action-aus';
import AutoCompleteHack from '@/mods/common/auto-complete-hack';
import { ausGetQuotaManagementInfo, takeCoinSendPhoneCode, setTradePwdSendCode, twdGetQuotaManagementInfo } from '@/api/http';
import NumberUtils from '@/lib/util/number';
import InputNumber from '../input-number';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import AmountInfo from '@/mods/common/form/amount-info-row';
import SmsBtn from '@/mods/common/sms-btn';

const AutoOption = AutoComplete.Option;

@inject('coinWithdrawStore', 'accountStore', 'userInfoStore', 'commonStore', 'coinWithdrawRecordStore')
@observer
class WithdrawCoin extends Component {
    constructor(props) {
        super(props);
        let { coinWithdrawStore, accountStore } = this.props;
        this.action = toAction(coinWithdrawStore, accountStore);
        this.$sendBtn = <SmsBtn sendCode={takeCoinSendPhoneCode.bind(this, { vercode: '1', type: 2, codeid: '1' })} />;
        this.state = {
            dayLimit: 0,
            smsCode: '',
            gaCode: '',
            msgCode: '',
            actionDisabled: false,
            loading: true
        };
        this.tipArr = [UPEX.lang.template('钱包维护中，暂停提币'), UPEX.lang.template('账号被限制提币，如有疑问请联系客服')];
        this.inputData = {
            smsCode: {
                label: UPEX.lang.template('手机验证'),
                target: '',
                className: 'sms-code',
                inputProps: {
                    onChange: this.setVal.bind(this, 'smsCode')
                }
            },
            gaCode: {
                label: UPEX.lang.template('Google验证'),
                target: '',
                inputProps: {
                    onChange: this.setVal.bind(this, 'gaCode')
                }
            },
            msgCode: {
                label: UPEX.lang.template('标签'),
                target: '',
                inputProps: {
                    onChange: this.setVal.bind(this, 'msgCode')
                }
            }
        };
    }

    componentDidMount() {
        let store = this.props.coinWithdrawStore;

        this.props.commonStore.getAllCoinPoint().then(() => {
            this.fetchCoinList();
        });

        // 用户提币限制
        this.actionRole = parseInt(this.props.userInfoStore.actionRoles['withdraw coin']);

        this.initCodeVerifyType();
        let request = UPEX.config.version === 'ace' ? twdGetQuotaManagementInfo : ausGetQuotaManagementInfo;
        request({
            actionId: 4,
            currencyId: 2
        })
            .then(res => {
                const { authLevel = 1 } = this.props.userInfoStore.userInfo;
                let result = {};
                if (res.status === 200) {
                    result.dayLimit = NumberUtils.separate(res.attachment[0][`kyc${authLevel}DayLimit`]);
                }
                this.setState(result);
            })
            .catch(err => {
                console.error('AusGetQuotaManagementInfo', err);
            }).then(res => {
                this.setState({
                    loading: false
                })
            });
    }

    setVal(name, e) {
        this.setState({
            [name]: typeof e === 'object' ? e.target.value.trim() : e
        });
    }

    componentWillUnmount() {
        this.action.destroy();
    }

    fetchCoinList() {
        let { accountStore } = this.props;

        return accountStore.getUserCoinAccount(() => {
            const coinNameEn = this.props.params.code;
            let defaultCoin;

            if (coinNameEn) {
                defaultCoin = accountStore.originAccountData.coinList.filter(function(item) {
                    return item.currencyNameEn === coinNameEn.toUpperCase();
                })[0];
            }

            if (!defaultCoin) {
                defaultCoin = accountStore.originAccountData.coinList[0];
            }
            this.checkCoinStatus(defaultCoin.currencyNameEn);
            this.action.initWithdrawCoin({
                currencyId: defaultCoin.currencyId,
                currencyNameEn: defaultCoin.currencyNameEn
            });
        });
    }

    // 初始化验证码类型
    initCodeVerifyType() {
        let { userInfoStore } = this.props;

        if (userInfoStore.userInfo.isGoogleAuth == 1) {
            this.action.changeAuthTypeTo('google');
        } else if (userInfoStore.userInfo.isValidatePhone) {
            this.action.changeAuthTypeTo('phone');
        }
    }

    checkCoinStatus(currencyNameEn) {
        const coin = this.props.commonStore.getCoinInfo(currencyNameEn);
        // 禁止提币， 币种限制|用户限制
        if (coin.withdrawStatus !== 1 || this.actionRole !== 1) {
            this.actionDisabledTip = this.actionRole !== 1 ? this.tipArr[1] : this.tipArr[0];
            this.setState({
                actionDisabled: true
            });
            return false;
        } else {
            this.setState({
                actionDisabled: false
            });
            return true;
        }
    }

    selectWithdrawCoin = value => {
        this.checkCoinStatus(value.label);

        this.action
            .initWithdrawCoin({
                currencyId: value.key,
                currencyNameEn: value.label
            })
            .then(res => {
                const { resp } = this.props.coinWithdrawStore.takeCoinInfo;
                let _addressList = resp.addressList || [];
                let item = _addressList.filter(item => {
                    return item.currencyId === value.key;
                });
                if (item.length > 0) {
                    this.setState({
                        msgCode: item[0].msgCode
                    });
                }
            });
    };

    addressChange(address) {
        this.props.coinWithdrawStore.setAddress(address);
    }

    submit() {
        const { state, props } = this;
        if (props.coinWithdrawStore.address === '') {
            message.error(UPEX.lang.template('请填写提币地址'));
            return;
        }
        if (props.coinWithdrawStore.amount === '') {
            message.error(UPEX.lang.template('请填写提币数量'));
            return;
        }
        if (props.coinWithdrawStore.tradepwd === '') {
            message.error(UPEX.lang.template('请填写资金密码'));
            return;
        }
        if (props.userInfoStore.userInfo.isGoogleAuth) {
            if (state.gaCode === '') {
                message.error(UPEX.lang.template('请填写Google验证码'));
                return;
            }
        } else {
            if (state.smsCode === '') {
                message.error(UPEX.lang.template('请填写短信验证码'));
                return;
            }
        }

        if (parseFloat(props.coinWithdrawStore.withdrawValue) === 0) {
            message.error(UPEX.lang.template('提币到账数量为0'));
            return;
        }

        let msgCode = '';
        const info = this.props.coinWithdrawStore.takeCoinInfo;
        if (info.resp.needMsgCode === 1) {
            msgCode = this.state.msgCode;
        }
        let actionResult = this.action.handleSubmit(state, msgCode);
        if (actionResult !== null) {
            actionResult.then(() => {
                this.props.coinWithdrawRecordStore.getData({
                    start: 1
                });
            });
        }
    }

    render() {
        const { state, props, inputData, action, $sendBtn } = this;
        let { accountStore, userInfoStore, coinWithdrawStore } = props;
        let store = coinWithdrawStore;
        const { resp } = store.takeCoinInfo;
        let $options = [];

        $options = accountStore.coinList.map((item, index) => {
            return (
                <Option value={item.currencyId} key={item.currencyId}>
                    {item.currencyNameEn}
                </Option>
            );
        });
        let $content = null;
        let $selectAfterNode = null;
        if (state.actionDisabled) {
            $selectAfterNode = (
                <Alert
                    message={
                        <span className="warn-text">
                            <Icon type="exclamation-circle" />
                            {this.actionDisabledTip}
                        </span>
                    }
                    type="error"
                />
            );
            $content = null;
        } else {
            $addressOptions2 = store.addressList.map((cur, index) => {
                return (
                    <AutoOption key={index} value={`${cur.address}`}>
                        {cur.address}
                    </AutoOption>
                );
            });

            let $afterNode = (
                <AmountInfo
                    left={
                        <p className="balance">
                            <span className="text">{UPEX.lang.template('可用提币数量')}</span>
                            <em>{store.cashAmount || 0}</em> {store.currentCoin.currencyNameEn}
                        </p>
                    }
                    right={
                        <p className="balance">
                            <span className="text">{UPEX.lang.template('实际到账金额')}</span>
                            <em>{store.withdrawValue}</em> {store.currentCoin.currencyNameEn}
                        </p>
                    }
                />
            );
            $content = (
                <div>
                    <FormItem label={UPEX.lang.template('提币地址')}>
                        <AutoComplete
                            className="certain-address-search"
                            dropdownClassName="certain-address-search-dropdown"
                            dropdownMatchSelectWidth={true}
                            dataSource={$addressOptions2}
                            value={store.address}
                            placeholder={UPEX.lang.template('提币地址')}
                            optionLabelProp="value"
                            onChange={this.addressChange.bind(this)}
                        >
                            <Input className="address-input" suffix={store.addressList.length === 0 ? null : <Icon type="caret-down" />} />
                        </AutoComplete>
                    </FormItem>
                    <FormItem label={UPEX.lang.template('提币数量')} after={$afterNode}>
                        <div className={`input-coin-account input-box ${store.validAmount ? '' : 'wrong'}`}>
                            {store.amount ? null : (
                                <span className="ie11-placeholder-hack">
                                    {UPEX.lang.template('最小提币数量为{count}', {
                                        count: `${store.amountLowLimit}${store.currentCoin.currencyNameEn}`
                                    })}
                                </span>
                            )}

                            <InputNumber
                                className="ant-input exchange-input amount-input"
                                value={store.amount}
                                data-key="amount"
                                min={store.amountLowLimit}
                                max={store.cashAmount}
                                precision={8}
                                onChange={action.onChangeInput}
                            />
                        </div>
                    </FormItem>
                    <AutoCompleteHack />
                    {resp.needMsgCode === 1 ? <FormItem value={state.msgCode} {...inputData.msgCode} /> : null}
                    {userInfoStore.userInfo.isGoogleAuth ? <FormItem {...inputData.gaCode} /> : <FormItem {...inputData.smsCode} after={$sendBtn} />}
                    <FormItem label={UPEX.lang.template('资金密码')}>
                        <div className={`input-box ${store.validTradePwd ? '' : 'wrong'}`}>
                            <Input
                                value={store.tradepwd}
                                onChange={action.onChangeInput}
                                placeholder={UPEX.lang.template('请输入资金密码')}
                                className="ant-input exchange-input"
                                data-key="tradepwd"
                                type="password"
                                onChange={action.onChangeInput}
                            />
                        </div>
                    </FormItem>
                    <FormItem>
                        <Button className="submit-btn" onClick={this.submit.bind(this)}>
                            {UPEX.lang.template('确认提币')}
                        </Button>
                    </FormItem>
                </div>
            );
        }

        return (
            <div>
                <Alert
                    className="ace-form-tips"
                    type="info"
                    showIcon
                    message={
                        UPEX.lang.template('单日数位资产提币额度为{num}', {
                            num: state.dayLimit
                        }) + UPEX.config.baseCurrencyEn
                    }
                    type="warning"
                />
                <FormView>
                    {state.loading ? <div className="mini-loading" /> : null}
                    <FormItem label={UPEX.lang.template('选择币种')} after={$selectAfterNode}>
                        <Select labelInValue value={{ key: store.currentCoin.currencyNameEn }} onChange={this.selectWithdrawCoin}>
                            {$options}
                        </Select>
                    </FormItem>
                    {$content}
                    <FormItem>
                        <div className="bottom-tips">
                            <div className="warmprompt-title">{UPEX.lang.template('温馨提示')}</div>
                            <div
                                className="warmprompt-content"
                                dangerouslySetInnerHTML={{
                                    __html: UPEX.lang.template('提币温馨提示内容', { link: UPEX.lang.template('提币温馨提示内容网页链接')})
                                }}
                            />
                        </div>
                    </FormItem>
                </FormView>
            </div>
        );
    }
}

export default WithdrawCoin;
