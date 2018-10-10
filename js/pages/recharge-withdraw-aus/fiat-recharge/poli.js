import React from 'react';
import { browserHistory } from 'react-router';
import FormItem from '@/mods/common/form/item';
import { ausGetPoliUrl } from '@/api/http';
import NumberUtils from '@/lib/util/number';
import { Row, Col, message, Modal } from 'antd';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            url: '',
            success: '',
            loading: false,
            visible: false,
            disable: false
        };
        this.MaxLimit = 2000;
        // poli窗体
        this.poliWin = null;
        this.timer = null;
        this.inputData = {
            className: 'tip-code',
            inputProps: {
                onChange: e => {
                    let { value = '' } = e.target;
                    // 保留两位小数
                    const _state = {};
                    if (value !== '') {
                        if (!NumberUtils.isFloatWithTwoDecimal(value)) {
                            // 最后一位是点
                            let result = value.indexOf('.') === value.length - 1 && NumberUtils.isFloatWithTwoDecimal(value.slice(0, -1));
                            if (!result) {
                                return;
                            }
                        }
                        _state.amount = parseFloat(value) >= 2000 ? 2000 : value;
                    } else {
                        _state.amount = '';
                    }
                    this.setState(_state);
                }
            }
        };
        this.$tip = <div className="input-right-tag">{UPEX.config.baseCurrencyEn}</div>;
        this.$max = (
            <div className="max-tip">
                {UPEX.lang.template('充值金额')}{' '}
                <em>
                    ({UPEX.lang.template('单笔限额: {count}', { count: this.MaxLimit })} {UPEX.config.baseCurrencyEn})
                </em>
            </div>
        );
    }

    getUrl() {
        const { state, props } = this;
        // tradeType: 2=poli amount:state.amount refId:uid
        return ausGetPoliUrl({
            tradeType: 2,
            amount: state.amount,
            refId: props.referenceNo
        })
            .then(res => {
                return res;
            })
            .catch(err => {
                console.error('ausGetPoliUrl', err);
                return {
                    status: 5000,
                    message: 'NETWORK error'
                };
            });
    }

    showTip(e) {
        if(this.props.actionStatus === 2) {
            message.error(UPEX.lang.template('当前币种暂停此操作'));
            return;
        }
    }
    handleSubmit() {
        this.setState({
            loading: true,
            disable: true
        });
        this.getUrl().then(res => {
            if (res.status === 200) {
                this.setState({
                    visible: true,
                    url: res.attachment
                });
            } else {
                message.error(res.message);
                this.setState({
                    loading: false,
                    disable: false
                });
            }
        });
    }
    handleOpen(action) {
        if (action === 'load') {
            this.setState({
                loading: false,
                disable: false
            });
        }
    }

    handleClose() {
        this.setState({ visible: false, url: '' });
    }

    componentDidMount() {
        window.addEventListener(
            'message',
            event => {
                // 没做来源校验
                // var origin = event.origin || event.originalEvent.origin;
                if (event.data === 'close' || event.data === 'cancel') {
                    this.setState({
                        loading: false,
                        visible: false,
                        disable: false,
                        amount: '',
                        url: ''
                    });
                }

                if (event.data === 'success') {
                    this.setState({
                        loading: false,
                        visible: false,
                        disable: false
                    });
                    setTimeout(() => {
                        browserHistory.push('/account/fiatrecord');
                    }, 100);
                }
            },
            false
        );
    }

    render() {
        const { $max, state, inputData, $tip } = this;
        let poliDisable = 'not';

        // 检测充值状态
        inputData.inputProps.disabled = this.props.actionStatus === 2 ? true : false;

        if (state.amount === '' || state.disable) {
            poliDisable = 'is';
        }
        return (
            <div>
                <Modal
                    onCancel={this.handleClose.bind(this)}
                    style={{ top: 20 }}
                    width={600}
                    wrapClassName="modal-poli-content-wrapper"
                    title={UPEX.lang.template('POLi支付')}
                    visible={state.visible}
                    footer={null}
                    maskClosable={false}
                >
                    <div className="poli-content">
                        {state.loading ? <div className="mini-loading" /> : null}
                        <iframe id="poli-win" width="100%" height="100%" onLoad={this.handleOpen.bind(this, 'load')} src={state.url} frameBorder="0" />
                    </div>
                </Modal>
                <FormItem label={$max} value={state.amount} {...inputData} after={$tip} />
                <FormItem>
                    <Row className="poli-img">
                        <Col span={12}>{UPEX.lang.template('唯一正确入口')}</Col>
                        <Col span={12}>
                            <div className={`empty ${poliDisable}`} onClick={this.showTip.bind(this)} />
                            <img onClick={this.handleSubmit.bind(this)} src="https://resources.apac.paywithpoli.com/poli-logo-37.png" alt="POLi Logo" />
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <div className="bottom-tips" dangerouslySetInnerHTML={{ __html: UPEX.lang.template('使用POLi充值操作温馨提示,受银行处理时间影响...') }} />
                </FormItem>
            </div>
        );
    }
}
