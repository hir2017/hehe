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

@inject('accountStore')
@observer
class CoinRecharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msgCode: '',
            visible: false
        };
        initStateAndChange(this);
    }

    componentDidMount() {
        initCoinList(this);

        this.bindCopyEvent('address');
        this.bindCopyEvent('msgcode');
        this.bindEvent();
    }

    fetchCoinAddress(currencyId) {

        selectUserAddress(currencyId)
            .then(res => {
                let data = res.attachment ? res.attachment : {};
                let _state = {
                    addressInfo: data,
                    msgCode: data.msgCode || ''
                }
                if(['none', ''].indexOf(_state.msgCode) === -1) {
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
        const {state} = this;
        let { coins, currencyId, addressInfo, currencyNameEn } = this.state;
        let store = this.props.accountStore;
        return (
            <div>
                <Modal
                    closable={false}
                    visible={this.state.visible}
                    footer={null}
                    width={540}
                    wrapClassName="exc-modal-alert coin-recharge"
                    >
                    <p className="warn-text">
                        {UPEX.lang.template('充值 {name} 到 {ACE} 同时需要一个充值地址和 {name} 标签!', {name: currencyNameEn, ACE: UPEX.config.sitename})}
                    </p>
                    <p className="warn-text">
                        {UPEX.lang.template('警告：如果未遵守正确的 {name} 充值步骤，币会丢失!', {name: currencyNameEn})}
                    </p>
                    <Button onClick={e => {this.setState({visible: false})}}>{UPEX.lang.template('我了解风险，继续')}</Button>
                </Modal>
                <Alert className="ace-form-tips" type="warning" showIcon message={UPEX.lang.template('充币提醒信息内容')} />
                <FormView>
                    <FormItem label={UPEX.lang.template('选择币种')}>
                        <Select value={currencyId ? `${currencyId}_${currencyNameEn}` : ''} onChange={this.coinChange}>
                            {coins.map((item, i) => (
                                <Option value={`${item.currencyId}_${item.currencyNameEn}`} key={i}>
                                    {item.currencyNameEn}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
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
                    {state.msgCode === '' || state.msgCode === 'none' ? null : (
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
                            <Alert message={(
                                <span className="warn-text">
                                    <Icon type="exclamation-circle" />
                                    {UPEX.lang.template('警告！充值 {name} 到 {ACE} 同时需要一个充值地址和 {name} 标签。如果未遵守正确的 {name} 充值步骤，币会丢失', {name: currencyNameEn})}
                                </span>
                            )} type="error"/>
                        </FormItem>
                    )}

                    <FormItem>
                        <div className="bottom-tips">
                            <div className="warmprompt-title">{UPEX.lang.template('温馨提示')}</div>
                            <div
                                className="warmprompt-content"
                                dangerouslySetInnerHTML={{
                                    __html: UPEX.lang.template('充币温馨提示内容', { name: currencyNameEn || '--', num: addressInfo.confirmNum || '--' }, 1)
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
