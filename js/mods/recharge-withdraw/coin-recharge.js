/**
 * 充币
 * TODO msgCode=0的情况
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message, Alert, Input, Popover, Icon, Modal, Button } from 'antd';
const Option = Select.Option;
import { browserHistory } from 'react-router';
import Clipboard from 'clipboard';

import { selectUserAddress } from '@/api/http';
import { initStateAndChange, initCoinList } from './coin-actions';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';

@inject('accountStore', 'commonStore', 'userInfoStore')
@observer
class CoinRecharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgCode: '',
            visible: false,
            actionDisabled: false
        };
        this.tipArr = [UPEX.lang.template('钱包维护中，暂停充币'), UPEX.lang.template('账号被限制充币，如有疑问请联系客服')];
        this.actionDisabledTip = '';
        this.actionRole = '';
        initStateAndChange(this);
    }

    componentDidMount() {
        this.props.commonStore.getAllCoinPoint().then(res => {
            initCoinList(this);
        });
        // 用户充币限制
        this.actionRole = parseInt(this.props.userInfoStore.actionRoles['recharge coin']);

        this.bindCopyEvent('address');
        this.bindCopyEvent('msgcode');
        this.bindEvent();
    }

    checkCoinStatus(currencyId) {
        const coin = this.props.commonStore.getCoinInfo(currencyId, 'id');
        // 禁止充币， 币种限制|用户限制
        if (coin.rechargeStatus !== 1 || this.actionRole !== 1) {
            this.actionDisabledTip = this.actionRole !== 1 ? this.tipArr[1] : this.tipArr[0];
            this.setState({
                actionDisabled: true,
                addressInfo: {},
                msgCode: '',
                visible: false
            });
            return false;
        } else {
            this.setState({
                actionDisabled: false
            });
            return true;
        }
    }

    fetchCoinAddress(currencyId) {

        // 检测币种限制
        if(!this.checkCoinStatus(currencyId)) {
            return;
        }

        selectUserAddress(currencyId)
            .then(res => {
                let data = res.attachment ? res.attachment : {};
                let _state = {
                    addressInfo: data,
                    msgCode: data.msgCode || ''
                };
                if (['none', ''].indexOf(_state.msgCode) === -1) {
                    _state.visible = true;
                }
                this.setState(_state);
            })
            .catch(err => {
                console.error('fetchCoinList getCoinAccount', err);
            });
    }

    /**
     * 复制地址
     */
    bindCopyEvent(name) {
        let self = this;

        const clip = (this.clip = new Clipboard(`#copy-${name}`, {
            text() {
                let node = $(self.refs[name]);

                return node.val();
            }
        }));

        clip.on('success', () => {
            message.success(UPEX.lang.template('复制成功'));
        });

        clip.on('error', () => {
            message.error(UPEX.lang.template('复制失败'));
        });
    }

    bindEvent() {
        let box = $(this.refs.wrapper);

        box.on('click', '.r-coin-record', e => {
            browserHistory.push('/account/coinrecord');
        });
    }

    render() {
        const { state } = this;
        let { coins, currencyId, addressInfo, currencyNameEn } = this.state;
        let $content = null;
        let $afterNode = null;
        // 判断是否禁用
        if (state.actionDisabled) {
            $afterNode = (
                <Alert
                        message={
                            <span className="warn-text">
                                <Icon type="exclamation-circle" />
                                {this.actionDisabledTip}
                            </span>
                        }
                        type="error"
                    />
            )
            $content = null;
        } else {
            let $mark = null;
            // 标签
            if (!(state.msgCode === '' || state.msgCode === 'none')) {
                $mark = (
                    <FormItem label={UPEX.lang.template('标签')}>
                        <input
                            type="text"
                            className="ant-input exc-input address"
                            value={addressInfo.msgCode}
                            ref="msgcode"
                            data-address={addressInfo}
                            readOnly
                        />
                        <div className="input-right-tag" id="copy-msgcode">
                            {UPEX.lang.template('复制')}
                        </div>
                        <Alert
                            message={
                                <span className="warn-text">
                                    <Icon type="exclamation-circle" />
                                    {UPEX.lang.template(
                                        '警告！充值 {name} 到 {ACE} 同时需要一个充值地址和 {name} 标签。如果未遵守正确的 {name} 充值步骤，币会丢失',
                                        { name: currencyNameEn, ACE: UPEX.config.sitename }
                                    )}
                                </span>
                            }
                            type="error"
                        />
                    </FormItem>
                );
            }
            $content = (
                <div>
                    <FormItem label={UPEX.lang.template('{name}充值地址', { name: currencyNameEn })}>
                        <input
                            type="text"
                            className="ant-input exc-input address"
                            value={addressInfo.address}
                            ref="address"
                            data-address={addressInfo}
                            readOnly
                        />

                        <div className="input-right-tag" id="copy-address">
                            {UPEX.lang.template('复制')}
                        </div>
                        {/* <p className="fee">{UPEX.lang.template('网络手续费: {fee}', { fee: addressInfo.fee || '--' })}</p> */}
                        <Popover
                            placement="right"
                            overlayClassName="coin-recharge-qrcode"
                            content={
                                <div className="qrcode-img">
                                    <img src={addressInfo.image ? `data:image/png;base64,${addressInfo.image}` : ''} alt="" />
                                </div>
                            }
                        >
                            <Icon type="qrcode" />
                        </Popover>
                    </FormItem>
                    {$mark}
                </div>
            );
        }
        return (
            <div>
                <Modal closable={false} visible={this.state.visible} footer={null} width={540} wrapClassName="exc-modal-alert coin-recharge">
                    <p className="warn-text">
                        {UPEX.lang.template('充值 {name} 到 {ACE} 同时需要一个充值地址和 {name} 标签!', { name: currencyNameEn, ACE: UPEX.config.sitename })}
                    </p>
                    <p className="warn-text">{UPEX.lang.template('警告：如果未遵守正确的 {name} 充值步骤，币会丢失!', { name: currencyNameEn })}</p>
                    <Button
                        onClick={e => {
                            this.setState({ visible: false });
                        }}
                    >
                        {UPEX.lang.template('我了解风险，继续')}
                    </Button>
                </Modal>
                <Alert className="ace-form-tips" type="warning" showIcon message={UPEX.lang.template('充币提醒信息内容')} />
                <FormView>
                    <FormItem label={UPEX.lang.template('选择币种')} after={$afterNode}>
                        <Select value={currencyId ? `${currencyId}_${currencyNameEn}` : ''} onChange={this.coinChange}>
                            {coins.map((item, i) => (
                                <Option value={`${item.currencyId}_${item.currencyNameEn}`} key={i}>
                                    {item.currencyNameEn}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    {$content}
                </FormView>
                <FormView>
                    <FormItem>
                        <div className="bottom-tips">
                            <div className="warmprompt-title">{UPEX.lang.template('温馨提示')}</div>
                            <div
                                className="warmprompt-content"
                                dangerouslySetInnerHTML={{
                                    __html: UPEX.lang.template('充币温馨提示内容', {
                                        name: currencyNameEn || '--',
                                        num: addressInfo.confirmNum || '--',
                                        link: UPEX.config.docUrls.InfinitexDigitalCurrencyTransferAgreements
                                    })
                                }}
                            />
                        </div>
                    </FormItem>
                </FormView>
            </div>
        );
    }
}

export default CoinRecharge;
