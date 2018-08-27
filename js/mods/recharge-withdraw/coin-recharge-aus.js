/**
 * 充币
 * TODO msgCode=0的情况
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message, Alert, Input, Popover, Icon } from 'antd';
const Option = Select.Option;
import { browserHistory } from 'react-router';
import Clipboard from 'clipboard';

import { selectUserAddress } from '@/api/http';
import { initStateAndChange, initCoinList } from './coin-actions-aus';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';

@inject('accountStore')
@observer
class CoinRecharge extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        initStateAndChange(this);
    }

    componentDidMount() {
        initCoinList(this);

        this.bindCopyEvent();
        this.bindEvent();
    }

    fetchCoinAddress(currencyId) {
        selectUserAddress(currencyId)
            .then(res => {
                this.setState({
                    addressInfo: res.attachment ? res.attachment : {}
                });
            })
            .catch(err => {
                console.error('fetchCoinList getCoinAccount', err);
            });
    }

    /**
     * 复制地址
     */
    bindCopyEvent() {
        let self = this;

        const clip = (this.clip = new Clipboard('#copy-address', {
            text() {
                let node = $(self.refs.address);

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
        const { coins, currencyId, addressInfo, currencyNameEn } = this.state;
        let store = this.props.accountStore;

        return (
            <div>
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
                            className="ant-input exchange-input address"
                            value={addressInfo.address}
                            ref="address"
                            data-address={addressInfo}
                            readOnly
                        />

                        <div className="input-right-tag" id="copy-address">
                            {UPEX.lang.template('Copy')}
                        </div>
                        <p className="fee">{UPEX.lang.template('网络手续费: {fee}', { fee: addressInfo.fee || '--' })}</p>
                        <Popover
                            placement="right"
                            content={
                                <div className="qrcode-img">
                                    <img src={addressInfo.image ? `data:image/png;base64,${addressInfo.image}` : ''} alt="" />
                                </div>
                            }
                        >
                            <Icon type="qrcode" />
                        </Popover>
                    </FormItem>
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
