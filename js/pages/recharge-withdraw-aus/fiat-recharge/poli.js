import React from 'react';
import FormItem from '@/mods/common/form/item';
import {ausGetPoliUrl} from '@/api/http';
import NumberUtils from '@/lib/util/number';
import {Row, Col} from 'antd';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            url: '',
            loading: false
        };
        this.MaxLimit = 2000;
        this.timer = null;
        this.delay = false;
        this.inputData = {
            className: 'tip-code',
            inputProps: {
                onChange: e => {
                    let { value = '' } = e.target;
                    // 保留两位小数
                    const _state = {
                        loading: true,
                    }
                    if(value !== '') {
                        if(!NumberUtils.isFloatWithTwoDecimal(value)) {
                            // 最后一位是点
                            let result = value.indexOf('.') === (value.length -1) && NumberUtils.isFloatWithTwoDecimal(value.slice(0, -1))
                            if(!result) {
                                return;
                            }
                        }
                        _state.amount = parseFloat(value) >= 2000 ? 2000 : value;
                    } else {
                        _state.amount = '';
                    }
                    this.setState(_state);
                    if (value !== '') {
                        this.delayToDo();
                    }
                }
            }
        };
        this.$tip = <div className="input-right-tag">{UPEX.config.baseCurrencyEn}</div>;

        this.$max = <div className="max-tip">{UPEX.lang.template('充值金额')} <em>({UPEX.lang.template('单笔限额: {count}', {count: this.MaxLimit})} {UPEX.config.baseCurrencyEn})</em></div>;
    }

    delayToDo() {
        if(this.timer !== null) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.timer = null;
            this.getUrl();
        }, 500);
    }

    getUrl() {
        const {state, props} = this;
        // tradeType: 2=poli amount:state.amount refId:uid
        ausGetPoliUrl({
            tradeType: 2,
            amount: state.amount,
            refId: props.referenceNo
        }).then(res => {
            this.setState({
                url: res.attachment
            })
        }).catch(err => {
            console.error('ausGetPoliUrl', err);
        }).then(res => {
            this.setState({
                loading: false
            })
        });
    }

    showTip(e) {

    }

    render() {
        const { $max, state, inputData, $tip } = this;
        return (
            <div>
                <FormItem label={$max} value={state.amount} {...inputData} after={$tip} />
                <FormItem>
                        {state.loading ? <div className="mini-loading" ></div> : null}
                        <Row className="poli-img">
                            <Col span={12}>
                                {UPEX.lang.template('唯一正确入口')}
                            </Col>
                            <Col span={12}>
                                <div className={`empty ${state.amount === '' ? 'is' : 'not'}`} onClick={this.showTip.bind(this)}></div>
                                <a target="_blank" href={state.url}>
                                    <img src="https://resources.apac.paywithpoli.com/poli-logo-37.png"  alt="POLi Logo" />
                                </a>
                            </Col>
                        </Row>

                </FormItem>
                <FormItem>
                    <div className="bottom-tips" dangerouslySetInnerHTML={{ __html: UPEX.lang.template('使用Poli充值操作温馨提示,受银行处理时间影响...') }} />
                </FormItem>
            </div>
        );
    }
}
