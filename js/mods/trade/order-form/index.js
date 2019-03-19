import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory, Link } from 'react-router';
import { Slider, Tooltip, message, Modal } from 'antd';
import PopupTradePwd from './tradepwd';
import InputNumber from '../../input-number';
import toAction from './action';
import Gtag from '@/lib/ga-analytics';
import AutoCompleteHack from '@/mods/common/auto-complete-hack';

@inject('tradeStore', 'authStore', 'userInfoStore')
@observer
class TradeForm extends Component {
    static defaultProps = {
        data: {
            baseCurrencyId: '',
            baseCurrencyNameEn: '',
            tradeCurrencyId: '',
            tradeCurrencyNameEn: '',
            pointPrice: '',
            pointNum: ''
        }
    };

    constructor(props) {
        super(props);

        this.tabs = [
            {
                id: 'limit',
                title: UPEX.lang.template('限价委托title')
            },
            {
                id: 'market',
                title: UPEX.lang.template('市价委托title')
            }
        ];

        this.action = toAction(this.props.tradeStore, this.props.authStore);
    }

    componentDidMount() {
        this.getBarTransform();
    }

    gaTagTigger(path) {
         // 谷歌埋点
        Gtag.click(`webtrade${path}`);
    }

    goRecharge = (type, coinName, e) => {
        let userInfoStore = this.props.userInfoStore;

        if (!userInfoStore.userInfo.uid) {
            browserHistory.push('/login');
            return;
        }
        // 判断货币是法币还是数字币
        let rechargeUrl = coinName === UPEX.config.baseCurrencyEn ? '/account/balance/recharge' : `/account/coin/recharge/${coinName}`;
        this.gaTagTigger(type == 'fiat' ? 'FiatRecharge' : 'CoinRecharge' )
        if (type == 'fiat') {
            if (UPEX.config.version == 'infinitex') {
                // 澳洲版，leve=1即可进行下单
                switch (userInfoStore.userInfo.authLevel) {
                    case 0:
                        this.showDialogGuideAuth();
                        break;
                    default:
                        browserHistory.push(rechargeUrl);
                }
            } else {
                // 点击充值，弹窗提示绑定银行卡后可以进行充值
                switch (userInfoStore.userInfo.authLevel) {
                    case 0:
                        this.showDialogGuideAuth();
                        break;
                    case 1:
                        this.showDialogGuideBindCard();
                        break;
                    default:
                        browserHistory.push(rechargeUrl);
                }
            }
        } else {
            browserHistory.push(rechargeUrl);
        }
    };

    showDialogGuideAuth() {
        Modal.confirm({
            prefixCls: 'exc-dialog',
            width: 540,
            className: this.props.tradeStore.theme == 'dark' ? 'exc-dialog-dark' : 'exc-dialog-light',
            content: UPEX.lang.template('请先进行身份认证'),
            okText: UPEX.lang.template('去身份认证'),
            cancelText: UPEX.lang.template('我再想想'),
            onOk() {
                browserHistory.push('/user/authentication');
            }
        });
    }

    showDialogGuideBindCard() {
        Modal.confirm({
            prefixCls: 'exc-dialog',
            width: 540,
            className: this.props.tradeStore.theme == 'dark' ? 'exc-dialog-dark' : 'exc-dialog-light',
            content: UPEX.lang.template('绑定银行卡后可以进行充值'),
            okText: UPEX.lang.template('绑定银行卡'),
            cancelText: UPEX.lang.template('我再想想'),
            onOk() {
                browserHistory.push('/user/bankInfo');
            }
        });
    }

    showDialogGuideTradePWD() {
        Modal.confirm({
            prefixCls: 'exc-dialog',
            width: 540,
            className: this.props.tradeStore.theme == 'dark' ? 'exc-dialog-dark' : 'exc-dialog-light',
            content: UPEX.lang.template('交易前请先设置资金密码'),
            okText: UPEX.lang.template('资金密码设置'),
            cancelText: UPEX.lang.template('我再想想'),
            onOk() {
                browserHistory.push('/user/set-trade-pwd');
            }
        });
    }

    onChangeBuySlider = num => {
        // 买入量百分比，需要填写价格之后才可以调整
        if (!this.props.tradeStore.dealBuyPrice) {
            return;
        }

        this.props.tradeStore.setBuySliderValue(num);
    };

    onChangeSellSlider = num => {
        this.props.tradeStore.setSellSliderValue(num);
    };

    onChange = (key, e) => {
        let value = e.currentTarget.value.trim();

        this.action.updateInput(key, value);
    };
    // 失去焦点的时候验证填入的价格
    checkTradePrice = (type, e) => {
        let value = e.currentTarget.value.trim();

        this.props.tradeStore.checkTradePrice(value, type);
    };

    // 失去焦点的时候验证填入的数量
    checkTradeNumber = (type, e) => {
        let value = e.currentTarget.value.trim();

        this.props.tradeStore.checkTradeNumber(value, type);
    };

    submitOrder = type => {
        let { verifyInfoBeforeSubmit, createTradeOrder } = this.props.tradeStore;
        let userInfoStore = this.props.userInfoStore;
        console.log('submitOrder', userInfoStore.userInfo.isValidatePass)
        if (userInfoStore.userInfo.authLevel == 0) {
            this.showDialogGuideAuth();
            return;
        } else if (userInfoStore.userInfo.isValidatePass == 0) {
            // 未设置交易密码
            this.showDialogGuideTradePWD();
            return;
        }

        let result = verifyInfoBeforeSubmit(type);

        if (result.pass) {
            this.action.createTradeOrder(type);
        } else {
            if (result.action == 'pwdpop') {
                this.refs.pwdpop.show(value => {
                    if (type == 'buy') {
                        this.props.tradeStore.setTradeBuyPassword(value);
                    } else if (type == 'sell') {
                        this.props.tradeStore.setTradeSellPassword(value);
                    }

                    this.action.createTradeOrder(type).then(res => {
                        this.props.tradeStore.setTradeBuyPassword('');
                        this.props.tradeStore.setTradeSellPassword('');
                    });
                });
            } else {
                message.error(result['message']);
            }
        }
    };

    handleClickTab(index) {
        this.props.tradeStore.updateTradeType(index);
        this.getBarTransform();
    }

    getBarTransform() {
        let x = 0;
        let tabs = $(this.refs.tabs);
        let bar = $(this.refs.bar);

        if (tabs.length == 0 || bar.length == 0) {
            return;
        }

        let ulOffset = tabs.offset();
        let limitOffset = $('[data-key="limit"]', tabs).offset();
        let marketOffset = $('[data-key="market"]', tabs).offset();
        let barOffset = $(bar).offset();

        switch (this.props.tradeStore.tradeType) {
            case 'limit':
                x = limitOffset.left - ulOffset.left + (limitOffset.width / 2 - barOffset.width / 2);
                break;
            case 'market':
                x = marketOffset.left - ulOffset.left + (marketOffset.width / 2 - barOffset.width / 2);
                break;
        }
        //  为了改动小，先简单的处理

        bar.css({
            visibility: 'visible',
            msTransform: 'translate3d(' + x + 'px,0,0)',
            WebkitTransform: 'translate3d(' + x + 'px,0,0)',
            transform: 'translate3d(' + x + 'px,0,0)'
        });
    }

    render() {
        let store = this.props.tradeStore;
        let authStore = this.props.authStore;
        let btnGuideToLogin;

        let sliderMarks = {
            0: '0%',
            25: '25%',
            50: '50%',
            75: '75%',
            100: '100%'
        };

        let { baseCurrencyNameEn, currencyNameEn } = store.currentTradeCoin;

        btnGuideToLogin = (
            <div className="btn-box guide-btn">
                <Link to="/login" onClick={e => {this.gaTagTigger('Login')}}>{UPEX.lang.template('登录')}</Link>
                <label>{UPEX.lang.template('或')}</label>
                <Link to="/register" onClick={e => {this.gaTagTigger('Register')}}>{UPEX.lang.template('注册')}</Link>
                <label>{UPEX.lang.template('开始交易')}</label>
            </div>
        );
        let rechargeTitle = baseCurrencyNameEn === UPEX.config.baseCurrencyEn ? UPEX.lang.template('充值') : UPEX.lang.template('充币');

        let limitcontent = (
            <div className={store.tradeType == 'limit' ? 'trade-form-mod' : 'trade-form-mod hidden'}>
                <div className="trade-form-l">
                    <ul className="form-mod-hd">
                        <li className="name">
                            {UPEX.lang.template('买入')} {currencyNameEn}
                        </li>
                        <li className="count">
                            <label>{UPEX.lang.template('余额')}</label>
                            <em>{store.personalAccount.baseCoinBalanceText}</em>
                            <label>{baseCurrencyNameEn}</label>
                        </li>
                        <Tooltip placement="top" overlayClassName={store.theme == 'dark' ? 'ant-tooltip-dark' : 'ant-tooltip-light'} title={rechargeTitle}>
                            <li className="icon" onClick={this.goRecharge.bind(this, 'fiat', baseCurrencyNameEn)} />
                        </Tooltip>
                    </ul>
                    <ul className="form-mod-bd">
                        <li className="hidden">
                            <label>{UPEX.lang.template('最佳买价')}</label>
                            <em>
                                {store.bestBuyPrice} ({baseCurrencyNameEn}){' '}
                            </em>
                        </li>
                        <li className="item-input">
                            <label>{UPEX.lang.template('价格')}</label>
                            <div className="input-box">
                                <Tooltip placement="top" visible={store.tradePriceErr == '' ? false : true} title={store.tradePriceErr}>
                                    <InputNumber
                                        type="text"
                                        value={store.dealBuyPrice}
                                        precision={store.pointPrice}
                                        onChange={this.onChange.bind(this, 'buyprice')}
                                        onBlur={this.checkTradePrice.bind(this, 'buy')}
                                    />
                                </Tooltip>
                            </div>
                            <i>{baseCurrencyNameEn}</i>
                        </li>
                        <li className="item-input">
                            <label>{UPEX.lang.template('数量')}</label>
                            <div className="input-box">
                                <InputNumber
                                    type="text"
                                    value={store.dealBuyNum}
                                    precision={store.pointNum}
                                    onChange={this.onChange.bind(this, 'buynum')}
                                    onBlur={this.checkTradeNumber.bind(this, 'buy')}
                                />
                            </div>
                            <i>{currencyNameEn}</i>
                        </li>
                        <li className="item-slider">
                            <div className="slider-box">
                                <Slider
                                    tipFormatter={null}
                                    marks={sliderMarks}
                                    tipFormatter={value => `${value}%`}
                                    onChange={this.onChangeBuySlider}
                                    value={store.buySliderValue}
                                    disabled={authStore.isLogin ? false : true}
                                />
                            </div>
                        </li>
                        <li className="item-input disabled">
                            <label>{UPEX.lang.template('总金额')}</label>
                            <div className="input-box">
                                <input value={store.dealBuyTotalAmount} disabled />
                            </div>
                            <i>{baseCurrencyNameEn}</i>
                        </li>
                        <li className="item-submit">
                            {authStore.isLogin ? (
                                <button type="button" className="btn-box buy" onClick={this.submitOrder.bind(this, 'buy')}>
                                    {UPEX.lang.template('买入')}
                                </button>
                            ) : (
                                btnGuideToLogin
                            )}
                        </li>
                    </ul>
                </div>

                <div className="trade-form-r">
                    <ul className="form-mod-hd">
                        <li className="name">
                            {UPEX.lang.template('卖出')} {currencyNameEn}
                        </li>
                        <li className="count">
                            <label>{UPEX.lang.template('余额')}</label>
                            <em>{store.personalAccount.tradeCoinBalanceText}</em>
                            <label>{currencyNameEn}</label>
                        </li>
                        <Tooltip
                            placement="top"
                            overlayClassName={store.theme == 'dark' ? 'ant-tooltip-dark' : 'ant-tooltip-light'}
                            title={UPEX.lang.template('充币')}
                        >
                            <li className="icon" onClick={this.goRecharge.bind(this, 'coin', currencyNameEn)} />
                        </Tooltip>
                    </ul>
                    <ul className="form-mod-bd">
                        <li className="hidden">
                            <label>{UPEX.lang.template('最佳卖价')}</label>
                            <em>
                                {store.bestSellPrice} ({baseCurrencyNameEn}){' '}
                            </em>
                        </li>
                        <li className="item-input">
                            <label>{UPEX.lang.template('价格')}</label>
                            <div className="input-box">
                                <InputNumber
                                    type="text"
                                    value={store.dealSellPrice}
                                    precision={store.pointPrice}
                                    onChange={this.onChange.bind(this, 'sellprice')}
                                    onBlur={this.checkTradePrice.bind(this, 'sell')}
                                />
                            </div>
                            <i>{baseCurrencyNameEn}</i>
                        </li>
                        <li className="item-input">
                            <label>{UPEX.lang.template('数量')}</label>
                            <div className="input-box">
                                <InputNumber
                                    type="text"
                                    value={store.dealSellNum}
                                    precision={store.pointNum}
                                    onChange={this.onChange.bind(this, 'sellnum')}
                                    onBlur={this.checkTradeNumber.bind(this, 'sell')}
                                />
                            </div>
                            <i>{currencyNameEn}</i>
                        </li>
                        <li className="item-slider">
                            <div className="slider-box">
                                <Slider
                                    defaultValue={0}
                                    tipFormatter={null}
                                    marks={sliderMarks}
                                    tipFormatter={value => `${value}%`}
                                    onChange={this.onChangeSellSlider}
                                    value={store.sellSliderValue}
                                    disabled={authStore.isLogin ? false : true}
                                />
                            </div>
                        </li>
                        <li className="item-input disabled">
                            <label>{UPEX.lang.template('总金额')}</label>
                            <div className="input-box">
                                <input value={store.dealSellTotalAmount} disabled />
                            </div>
                            <i>{baseCurrencyNameEn}</i>
                        </li>
                        <li className="item-submit">
                            {authStore.isLogin ? (
                                <button type="button" className="btn-box sell" onClick={this.submitOrder.bind(this, 'sell')}>
                                    {UPEX.lang.template('卖出')}
                                </button>
                            ) : (
                                btnGuideToLogin
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        );

        let marketcontent = (
            <div className={store.tradeType == 'market' ? 'trade-form-mod' : 'trade-form-mod hidden'}>
                <div className="trade-form-l">
                    <AutoCompleteHack />
                    <ul className="form-mod-hd">
                        <li className="name">
                            {UPEX.lang.template('买入')} {currencyNameEn}
                        </li>
                        <li className="count">
                            <label>{UPEX.lang.template('余额')}</label>
                            <em>{store.personalAccount.baseCoinBalanceText}</em>
                            <label>{baseCurrencyNameEn}</label>
                        </li>
                        <Tooltip placement="top" overlayClassName={store.theme == 'dark' ? 'ant-tooltip-dark' : 'ant-tooltip-light'} title={rechargeTitle}>
                            <li className="icon" onClick={this.goRecharge.bind(this, 'fiat', baseCurrencyNameEn)} />
                        </Tooltip>
                    </ul>
                    <ul className="form-mod-bd">
                        <li className="hidden">
                            <label>{UPEX.lang.template('最佳买价')}</label>
                            <em>
                                {store.bestBuyPrice} ({baseCurrencyNameEn}){' '}
                            </em>
                        </li>
                        <li className="item-input disabled">
                            <label>{UPEX.lang.template('价格')}</label>
                            <div className="input-box">
                                <InputNumber
                                    type="text"
                                    disabled
                                    value={store.tradeType == 'market' ? UPEX.lang.template('市场价格') : store.dealBuyPrice}
                                    precision={store.pointPrice}
                                    onChange={this.onChange.bind(this, 'buyprice')}
                                    onBlur={this.checkTradePrice.bind(this, 'buy')}
                                />
                            </div>
                            <i>{baseCurrencyNameEn}</i>
                        </li>
                        <li className="item-input">
                            <label>{UPEX.lang.template('数量')}</label>
                            <div className="input-box">
                                <InputNumber
                                    type="text"
                                    value={store.dealBuyNum}
                                    precision={store.pointNum}
                                    onChange={this.onChange.bind(this, 'buynum')}
                                    onBlur={this.checkTradeNumber.bind(this, 'buy')}
                                />
                            </div>
                            <i>{currencyNameEn}</i>
                        </li>
                        <li className="item-slider">
                            <div className="slider-box">
                                <Slider
                                    tipFormatter={null}
                                    marks={sliderMarks}
                                    tipFormatter={value => `${value}%`}
                                    onChange={this.onChangeBuySlider}
                                    value={store.buySliderValue}
                                    disabled={authStore.isLogin ? false : true}
                                />
                            </div>
                        </li>
                        <li className="item-input disabled">
                            <div className="total">
                                {UPEX.lang.template('总金额')} &asymp; {store.dealBuyTotalAmount}
                                {baseCurrencyNameEn}({UPEX.lang.template('仅供参考')})
                            </div>
                        </li>
                        <li className="item-submit">
                            {authStore.isLogin ? (
                                <button type="button" className="btn-box buy" onClick={this.submitOrder.bind(this, 'buy')}>
                                    {UPEX.lang.template('买入')}
                                </button>
                            ) : (
                                btnGuideToLogin
                            )}
                        </li>
                    </ul>
                </div>
                <div className="trade-form-r">
                    <AutoCompleteHack />
                    <ul className="form-mod-hd">
                        <li className="name">
                            {UPEX.lang.template('卖出')} {currencyNameEn}
                        </li>
                        <li className="count">
                            <label>{UPEX.lang.template('余额')}</label>
                            <em>{store.personalAccount.tradeCoinBalanceText}</em>
                            <label>{currencyNameEn}</label>
                        </li>
                        <Tooltip
                            placement="top"
                            overlayClassName={store.theme == 'dark' ? 'ant-tooltip-dark' : 'ant-tooltip-light'}
                            title={UPEX.lang.template('充币')}
                        >
                            <li className="icon" onClick={this.goRecharge.bind(this, 'coin', currencyNameEn)} />
                        </Tooltip>
                    </ul>
                    <ul className="form-mod-bd">
                        <li className="hidden">
                            <label>{UPEX.lang.template('最佳卖价')}</label>
                            <em>
                                {store.bestSellPrice} ({baseCurrencyNameEn}){' '}
                            </em>
                        </li>
                        <li className="item-input disabled">
                            <label>{UPEX.lang.template('价格')}</label>
                            <div className="input-box">
                                <InputNumber
                                    type="text"
                                    disabled
                                    value={store.tradeType == 'market' ? UPEX.lang.template('市场价格') : store.dealSellPrice}
                                    precision={store.pointPrice}
                                    onChange={this.onChange.bind(this, 'sellprice')}
                                    onBlur={this.checkTradePrice.bind(this, 'sell')}
                                />
                            </div>
                            <i>{baseCurrencyNameEn}</i>
                        </li>
                        <li className="item-input">
                            <label>{UPEX.lang.template('数量')}</label>
                            <div className="input-box">
                                <InputNumber
                                    type="text"
                                    value={store.dealSellNum}
                                    precision={store.pointNum}
                                    onChange={this.onChange.bind(this, 'sellnum')}
                                    onBlur={this.checkTradeNumber.bind(this, 'sell')}
                                />
                            </div>
                            <i>{currencyNameEn}</i>
                        </li>
                        <li className="item-slider">
                            <div className="slider-box">
                                <Slider
                                    defaultValue={0}
                                    tipFormatter={null}
                                    marks={sliderMarks}
                                    tipFormatter={value => `${value}%`}
                                    onChange={this.onChangeSellSlider}
                                    value={store.sellSliderValue}
                                    disabled={authStore.isLogin ? false : true}
                                />
                            </div>
                        </li>
                        <li className="item-input disabled">
                            <div className="total">
                                {UPEX.lang.template('总金额')} &asymp; {store.dealSellTotalAmount}
                                {baseCurrencyNameEn}({UPEX.lang.template('仅供参考')})
                            </div>
                        </li>
                        <li className="item-submit">
                            {authStore.isLogin ? (
                                <button type="button" className="btn-box sell" onClick={this.submitOrder.bind(this, 'sell')}>
                                    {UPEX.lang.template('卖出')}
                                </button>
                            ) : (
                                btnGuideToLogin
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        );

        return (
            <div className="trade-form">
                <AutoCompleteHack />
                <div className="trade-form-hd" data-type={store.tradeType}>
                    <ul ref="tabs">
                        {this.tabs.map((item, index) => {
                            let cls = store.tradeType == item.id ? 'selected' : '';

                            return (
                                <li key={item.id} data-role="tab" data-key={item.id} className={cls} onClick={this.handleClickTab.bind(this, item.id)}>
                                    {item.title}
                                </li>
                            );
                        })}
                        <li key="bar" data-role="bar" ref="bar" className="tab-bar exc-tab-animated" />
                    </ul>
                </div>
                <div className="trade-form-bd clearfix">
                    {limitcontent}
                    {marketcontent}
                </div>
                <PopupTradePwd ref="pwdpop" prefix={`exc-pwdpop exc-pwdpop-${store.theme}`} />
            </div>
        );
    }
}

export default TradeForm;
