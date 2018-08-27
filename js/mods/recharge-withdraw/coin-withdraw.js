import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message, Alert } from 'antd';
const Option = Select.Option;
import { Link, browserHistory } from 'react-router';
import toAction from './coin-withdraw-action';
import InputNumber from '../input-number';
import AutoCompleteHack from '../common/auto-complete-hack';

@inject('coinWithdrawStore', 'accountStore', 'userInfoStore', 'commonStore')
@observer
class WithdrawCoin extends Component {
    static defaultProps = {
        userInfo: {}
    };
    constructor(props) {
        super(props);

        let { coinWithdrawStore, accountStore } = this.props;

        this.action = toAction(coinWithdrawStore, accountStore);
        this.state = {
            msgCode: ''
        }
    }

    componentDidMount() {
        let store = this.props.coinWithdrawStore;
        this.props.commonStore.getAllCoinPoint().then(() => {
            this.fetchCoinList().then(() => {
                // 兼容ie11 placeholder会触发focus的bug
                // setTimeout(() => {
                //     this.refs.amountInput.placeholder = UPEX.lang.template('最小提币数量为{count}', {
                //         count: `${store.amountLowLimit}${store.currentCoin.currencyNameEn}`
                //     })
                // }, 100)
            });
        });
        this.action.getImgCaptcha();
        this.initCodeVerifyType();
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

            this.action.initWithdrawCoin({
                currencyId: defaultCoin.currencyId,
                currencyNameEn: defaultCoin.currencyNameEn
            });
        });
    }

    initCodeVerifyType() {
        let { userInfoStore } = this.props;

        if (userInfoStore.userInfo.isGoogleAuth == 1) {
            this.action.changeAuthTypeTo('google');
        } else if (userInfoStore.userInfo.isValidatePhone) {
            this.action.changeAuthTypeTo('phone');
        }
    }

    selectWithdrawCoin = value => {
        this.action.initWithdrawCoin({
            currencyId: value.key,
            currencyNameEn: value.label
        });
    };

    selectAddress(resp, value) {
        action.selectChangeAddress(value);
        let item = resp.addressList.filter((item) => {
            return item.address === value;
        })
        this.setState({
            msgCode: item[0].msgCode
        })
    }

    onSubmit() {
        let msgCode = '';
        const { resp } = this.props.coinWithdrawStore.takeCoinInfo;
        if(resp.needMsgCode === 1) {
            msgCode = this.state.msgCode;
        }
        this.action.handleSubmit(msgCode)
    }

    render() {
        let { accountStore, userInfoStore } = this.props;
        let store = this.props.coinWithdrawStore;
        const { detail, resp } = store.takeCoinInfo;
        let action = this.action;
        let $options = [];
        let $addressOptions = [];

        $options = accountStore.coinList.map((item, index) => {
            return (
                <Option value={item.currencyId} key={item.currencyId}>
                    {item.currencyNameEn}
                </Option>
            );
        });

        $addressOptions = store.addressList.map((cur, index) => {
            return (
                <Option key={index} value={`${cur.address}`}>
                    {cur.address}
                </Option>
            );
        });

        return (
            <div>
                <form className="rw-form" autoComplete="off">
                    <AutoCompleteHack />
                    {store.isFetching ? <div className="mini-loading" /> : null}
                    <div className="rw-form-item">
                        <Alert
                            message={UPEX.lang.template('当前认证为{level}，每日可提{num}或等值数位资产', {
                                level: userInfoStore.authLevel,
                                currency: UPEX.config.baseCurrencyEn,
                                num: store.dayLimit,
                                num1: store.oneLimit
                            })}
                            type="warning"
                        />
                    </div>
                    <div className="rw-form-item">
                        <label className="rw-form-label">{UPEX.lang.template('选择币种')}</label>
                        <div className="rw-form-info">
                            <Select labelInValue value={{ key: store.currentCoin.currencyNameEn }} onChange={this.selectWithdrawCoin}>
                                {$options}
                            </Select>
                        </div>
                    </div>
                    <div className="rw-form-item">
                        <label className="rw-form-label">{UPEX.lang.template('提币地址')}</label>
                        <div className="rw-form-info">
                            <div className="select-button-box">
                                <div className="select-box">
                                    <Select
                                        key={store.currentCoin.currencyNameEn}
                                        value={store.defaultAddress.address || UPEX.lang.template('请在下方输入本次提币地址')}
                                        notFoundContent={UPEX.lang.template('无')}
                                        onChange={this.selectAddress.bind(this, resp)}
                                    >
                                        {$addressOptions}
                                    </Select>
                                </div>
                                <button
                                    type="button"
                                    className="rw-sp-vcode-btn"
                                    onClick={e => {
                                        browserHistory.push(`/account/coin/address/${store.currentCoin.currencyNameEn}`);
                                    }}
                                >
                                    {UPEX.lang.template('添加地址')}
                                </button>
                            </div>
                            <div className="address-custom mt10">
                                <div className={`input-box ${store.validNote ? '' : 'wrong'}`}>
                                    <input
                                        type="text"
                                        name="wid_no_auto_1"
                                        placeholder={UPEX.lang.template('地址备注')}
                                        value={store.note}
                                        data-key="note"
                                        autoComplete="off"
                                        onChange={action.onChangeInput}
                                    />
                                </div>
                                <div className={`input-box mt10 ${store.validAddress ? '' : 'wrong'}`}>
                                    <input
                                        type="text"
                                        name="wid_no_auto_2"
                                        placeholder={UPEX.lang.template('提币地址')}
                                        value={store.address}
                                        data-key="address"
                                        autoComplete="off"
                                        onChange={action.onChangeInput}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rw-form-item">
                        <label className="rw-form-label">{UPEX.lang.template('提币数量')}</label>
                        <div className="rw-form-info">
                            <div className={`input-coin-account input-box ${store.validAmount ? '' : 'wrong'}`}>
                                {store.amount ? null : (
                                    <span className="ie11-placeholder-hack">
                                        {UPEX.lang.template('最小提币数量为{count}', {
                                            count: `${store.amountLowLimit}${store.currentCoin.currencyNameEn}`
                                        })}
                                    </span>
                                )}
                                <InputNumber
                                    className="amount-input"
                                    value={store.amount}
                                    data-key="amount"
                                    min={store.amountLowLimit}
                                    max={store.cashAmount}
                                    precision={8}
                                    onChange={action.onChangeInput}
                                />
                            </div>
                            <span className="remain-amount">
                                {UPEX.lang.template('可用提币数量:{count}', { count: `${store.cashAmount || 0}${store.currentCoin.currencyNameEn}` })}
                            </span>
                        </div>
                    </div>
                    {resp.needMsgCode === 1 ? (
                        <div className="rw-form-item">
                            <label className="rw-form-label">{UPEX.lang.template('标签')}</label>
                            <div className="rw-form-info">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        value={this.state.msgCode}
                                        placeholder={UPEX.lang.template('请输入标签信息')}
                                        onChange={(e) => {
                                            this.setState({
                                                msgCode: e.target.value.trim()
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <AutoCompleteHack />
                    <div className="rw-form-item sp-v-code">
                        <label className="rw-form-label">{UPEX.lang.template('图片验证码')}</label>
                        <div className="rw-form-info">
                            <div className="yz-box">
                                <div className={`input-box ${store.validImgCode ? '' : 'wrong'}`}>
                                    <input type="text" name="wid_no_auto_3" style={{ display: 'none' }} />
                                    <input
                                        type="text"
                                        name="wid_no_auto_3"
                                        placeholder={UPEX.lang.template('图片验证')}
                                        data-key="vercode"
                                        autoComplete="off"
                                        value={store.vercode}
                                        onChange={action.onChangeInput}
                                    />
                                    <div className="codeimg">
                                        <img src={store.captchaStore.captcha} onClick={action.getImgCaptcha} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rw-form-item">
                        <label className="rw-form-label">{UPEX.lang.template('资金密码')}</label>
                        <div className="rw-form-info">
                            <div className={`input-box ${store.validTradePwd ? '' : 'wrong'}`}>
                                <input
                                    type="password"
                                    name="wid_no_auto_6"
                                    data-key="tradepwd"
                                    autoComplete="off"
                                    value={store.tradepwd}
                                    placeholder={UPEX.lang.template('请输入资金密码')}
                                    onChange={action.onChangeInput}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="rw-form-item">
                        <label className="rw-form-label">{UPEX.lang.template('验证方式')}</label>
                        <div className="rw-form-info">
                            <ul className="tab-nav">
                                {store.supportAuthTypes.map((item, index) => {
                                    let text;

                                    if (item == 'phone') {
                                        text = UPEX.lang.template('手机验证');
                                    } else if (item == 'google') {
                                        text = UPEX.lang.template('Google验证');
                                    }

                                    return (
                                        <li
                                            key={item}
                                            onClick={() => action.changeAuthTypeTo(item)}
                                            className={store.authType == item ? 'tab-item selected' : 'tab-item'}
                                        >
                                            {text}
                                        </li>
                                    );
                                })}
                            </ul>
                            {store.authType == 'phone' ? (
                                <div className="input-button-box">
                                    <div className="input-box">
                                        <input
                                            type="text"
                                            name="wid_no_auto_4"
                                            data-key="phonecode"
                                            autoComplete="off"
                                            value={store.phoneCode}
                                            placeholder={UPEX.lang.template('请填写短信验证码')}
                                            onChange={action.onChangeInput}
                                        />
                                    </div>
                                    <button
                                        onClick={action.sendEmailPhoneCode}
                                        type="button"
                                        className={`rw-sp-vcode-btn ${store.sendingcode ? 'disabled' : ''}`}
                                    >
                                        <div className={store.sendingcode ? 'code-sending' : 'code-sending hidden'}>
                                            {UPEX.lang.template('重发')}（<span data-second="second" ref="second" />
                                            s）
                                        </div>
                                        <div className={store.sendingcode ? 'code-txt hidden' : 'code-txt'}>{UPEX.lang.template('获取验证码')}</div>
                                    </button>
                                </div>
                            ) : (
                                <div className="input-box">
                                    <input
                                        type="number"
                                        autoComplete="off"
                                        name="wid_no_auto_5"
                                        data-key="googlecode"
                                        value={store.googleCode}
                                        placeholder={UPEX.lang.template('请填写Google验证码')}
                                        onChange={action.onChangeInput}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rw-form-item">
                        <div className="rw-form-info">
                            {UPEX.lang.template('实际到账金额:{num}', { num: `${store.withdrawValue}${store.currentCoin.currencyNameEn}` })}
                        </div>
                    </div>

                    <div className="rw-form-item">
                        <div className="rw-form-info">
                            <button type="button" className="submit-btn" onClick={this.onSubmit.bind(this)}>
                                {UPEX.lang.template('确认提币')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default WithdrawCoin;
