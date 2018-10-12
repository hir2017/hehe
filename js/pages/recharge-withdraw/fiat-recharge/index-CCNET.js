/**
 * 法币充值
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Alert, Button, Icon, message } from 'antd';
import { browserHistory } from 'react-router';
import ClipboardJS from 'clipboard';
import { getCCNET2Info } from '@/api/http';
import PageWrapper from '@/mods/common/wrapper/full-page';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import TableView from '@/mods/common/form/table';

@inject('userInfoStore', 'fiatRechargeStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayLimit: 0,
            info: {}
        };
        this.clip = null;
    }

    componentDidMount() {
        this.clip = new ClipboardJS('.copy.copy-btn');
        this.clip.on('success', (e) => {
            message.success(UPEX.lang.template('复制成功'));
            e.clearSelection();
        });

        this.clip.on('error', () => {
            message.error(UPEX.lang.template('复制失败'));
        });

        // TODO: dayLimit
        this.props.fiatRechargeStore.getRechargeDayLimit();
        getCCNET2Info()
            .then(res => {
                if (res.status === 200) {
                    const data = res.attachment;
                    this.setState({
                        info: {
                            bank: `${data.bankName}(${data.bankCode})`,
                            cardNum: data.virtualAccount
                        }
                    });
                } else {
                    console.error('getCCNET2Info', res.message);
                }
            })
            .catch(err => {
                console.error('getCCNET2Info', err);
            });
    }

    componentWillUnmount() {
        this.clip.destroy();
    }

    onSubmit(action) {
        let url = action === 'back' ? '/account' : '/account/fiatrecord';
        browserHistory.push(url);
    }

    render() {
        const store = this.props.fiatRechargeStore;
        const { state } = this;
        const Props = {
            parentCtx: this
        };
        let $alert = null;
        let tableData = [
            {
                label: UPEX.lang.template('銀行信息'),
                text: state.info.bank
            },
            {
                label: UPEX.lang.template('汇款账号'),
                text: (
                    <div>
                        <span className="val" id="card-no">
                            {state.info.cardNum}
                        </span>
                        <span className="copy copy-btn" data-clipboard-target="#card-no">
                            {UPEX.lang.template('Copy')}
                        </span>
                    </div>
                )
            }
        ];
        return (
            <PageWrapper title={UPEX.lang.template('账户充值')} className="fiat-recharge header-shadow">
                <FormView className="ccnet-2">
                    <FormItem>
                        <Alert
                            className="ace-form-tips"
                            showIcon
                            message={UPEX.lang.template('单日充值限额 {num1} ，充值時請勿超過限額', {
                                num1: store.rechargeDayLimit + UPEX.config.baseCurrencyEn
                            })}
                            type="warning"
                        />
                    </FormItem>
                    <FormItem label={UPEX.lang.template('充值信息')}>
                        <TableView data={tableData} />
                    </FormItem>
                    <FormItem className="type">
                        <div className="warn-tip">
                            <p>{UPEX.lang.template('請務必使用已綁定的銀行卡進行加值，否則金額將無法到賬。')}</p>
                            <p>{UPEX.lang.template('支付渠道收取1%的手续费，上限為13元。')}</p>
                        </div>
                    </FormItem>
                    <FormItem>
                        <Button className="submit-btn" onClick={this.onSubmit.bind(this)}>
                            {UPEX.lang.template('已完成支付, 去查看')}
                        </Button>
                        <Button className="exc-btn-cancel" onClick={this.onSubmit.bind(this, 'back')}>
                            {UPEX.lang.template('返回')}
                        </Button>
                    </FormItem>
                    <FormItem>
                        <div className="bottom-tips" dangerouslySetInnerHTML={{ __html: UPEX.lang.template('使用CCNET2充值操作温馨提示:請使用绑定的银行卡進行支付...') }} />
                    </FormItem>
                </FormView>

            </PageWrapper>
        );
    }
}

export default View;
