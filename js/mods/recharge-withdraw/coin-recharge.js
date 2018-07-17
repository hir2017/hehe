/**
 * 充币
 * TODO msgCode=0的情况
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, message, Alert } from 'antd';
const Option = Select.Option;
import { browserHistory } from 'react-router';
import Clipboard from 'clipboard';

import { getCoinAccount, selectUserAddress } from '../../api/http';

@inject('accountStore')
@observer
class CoinRecharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinsInfo: {},
            coins: [],
            currencyNameEn: '',
            currencyId: '',
            addressInfo: {}
        };
    }

    componentDidMount() {
        const currencyNameEn = this.props.params.code;
        if (currencyNameEn) {
            this.setState({
                currencyNameEn
            });
        }

        this.fetchCoinList().then(() => {
            const currCoin = this.state.coins.filter(item => item.currencyNameEn === currencyNameEn);
            if (currCoin.length !== 0) {
                const { currencyId } = currCoin[0];
                this.setState({
                    currencyId
                });
                this.fetchCoinAddress(currencyId);
            } else {
                console.error('componentDidMount fetchCoinList 暂无选中货币')
            }
        });
        this.bindCopyEvent();
        this.bindEvent();
    }

    fetchCoinList() {
        return getCoinAccount()
            .then(res => {
                this.setState({
                    coinsInfo: res,
                    coins: res.attachment ? res.attachment.coinList : []
                });
            })
            .catch(err => {
                console.error('fetchCoinList getCoinAccount', err);
            });
    }

    fetchCoinAddress(currencyId) {
        selectUserAddress(currencyId)
            .then(res => {
                this.setState({
                    addressInfo: res.attachment ? res.attachment : {},
                });
            })
            .catch(err => {
                console.error('fetchCoinList getCoinAccount', err);
            });
    }

    handleChange = val => {
        const [currencyId, currencyNameEn] = val.split('_');
        this.setState({
            currencyId,
            currencyNameEn
        });
        this.fetchCoinAddress(currencyId);
    };
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
        const {coins, currencyId, addressInfo, currencyNameEn} = this.state;
        let store = this.props.accountStore;

        return (
            <div>
                <div className="rw-form">
                    <div className="rw-form-item">
                        <Alert description={UPEX.lang.template('充币提醒信息内容')} type="warning" />
                    </div>
                    <div className="rw-form-item">
                        <label className="rw-form-label">{UPEX.lang.template('选择币种')}</label>
                        <div className="rw-form-info">
                            <Select value={currencyId ? `${currencyId}_${currencyNameEn}` : ''} onChange={this.handleChange}>
                                {coins.map((item, i) => (
                                    <Option value={`${item.currencyId}_${item.currencyNameEn}`} key={i}>
                                        {item.currencyNameEn}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="rw-form-item">
                        <label className="rw-form-label">{UPEX.lang.template('充币地址')}</label>
                        <div className="rw-form-info">
                            <ul>
                                <li className="input-button-box">
                                    <div className="input-box">
                                        <input ref="address" data-address={addressInfo} value={addressInfo.address} readOnly />
                                    </div>
                                    <button id="copy-address" className="rw-sp-vcode-btn">
                                        {UPEX.lang.template('复制地址')}
                                    </button>
                                </li>
                                <li>{UPEX.lang.template('网络手续费: {fee}', { fee: addressInfo.fee || '--' })}</li>
                                <li className="qrcode-box">
                                    <label className="qrcode-label">{UPEX.lang.template('{name}充值地址', { name: currencyNameEn })}</label>
                                    <div className="qrcode-img">
                                        <img src={`data:image/png;base64,${addressInfo.image}`} alt="" />
                                    </div>
                                </li>
                                <li>
                                    <div className="warmprompt">
                                        <div className="warmprompt-title">{UPEX.lang.template('温馨提示')}</div>
                                        <div
                                            className="warmprompt-content"
                                            dangerouslySetInnerHTML={{
                                                __html: UPEX.lang.template(
                                                    '充币温馨提示内容',
                                                    { name: currencyNameEn || '--', num: addressInfo.confirmNum || '--' },
                                                    1
                                                )
                                            }}
                                        />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CoinRecharge;
