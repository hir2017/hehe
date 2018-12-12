/**
 * @fileoverview IEO 数字币信息
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Modal, Row, Col, Progress, Select } from 'antd';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import { StatusIcon } from '../view';
import CountDown from '../countdown';
import NumberUtil from '@/lib/util/number';
import ValidateUtil from '@/lib/util/validate';
import {getSingleIEOPurchaseInfo} from '@/api/http';

const Option = Select.Option;

@inject('userInfoStore', 'authStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        const {data} = props;
        // 法币购买-身份认证判断等级
        this.level = UPEX.config.version === 'ace' ? 2 : 1;
        this.state = {
            // 购买弹窗触发状态
            projectState: '',
            visible: false,
            // 购买-当前选择币种
            selectCoin: {},
            // 购买-购买方式所有币种
            coins: [],
            // 购买-购买数量
            number: 0,
            // 购买-购买总价
            amount: 0,
        };
        // 购买弹窗触发按钮文案
        this.btnTxtMap = {
            // 未登录
            login: UPEX.lang.template('加入 IEO'),
            // 未订阅 (未开始)
            'not-subscribed': UPEX.lang.template('加入 IEO'),
            // 已订阅 (未开始)
            subscribed: UPEX.lang.template('即将开始'),
            // 购买 (已开始)
            start: UPEX.lang.template('现在购买'),
            // 结束
            done: UPEX.lang.template('已结束')
        };
        // 倒计时属性
        this.CountDownProp = {
            startTime: data._beginTimeStamp,
            skin: 'dark',
            endTime: data._endTimeStamp,
            serverTime: data._systemTimeStamp,
            flag: 0,
        };
        // 弹窗属性
        this.ModalProp = {
            wrapClassName: "ieo-buy",
            title: null,
            footer: null,
        };
    }

    componentDidMount() {
        this.checkProjectState();
    }
    // 获取购买信息（购买方式）
    getPurchaseInfo() {
        this.setState({
            selectCoin: {},
            coins: [],
            number: 0,
            amount: 0,
        })
        getSingleIEOPurchaseInfo({
            ieoId: this.props.ieoId
        }).then(res => {
            if(res.status === 200) {
                let { list } = res.attachment;
                // 默认选第一个
                let selectCoin = list.length > 0 ? list[0] : {};
                this.setState({
                    selectCoin,
                    coins: list,
                    number: 0,
                })
            }
        }).catch(err => {
            console.log('ieo getSingleIEOPurchaseInfo', err)
        })
    }

    checkProjectState() {
        // 判断用户是否登录，该IEO是否开始
        this.setState({
            projectState: 'not-subscribed'
        });
    }

    onSubmit = () => {
        console.log('onSubmit')
    }

    setVal(name, e) {
        const {selectCoin} = this.state;
        let {value} = e.target;
        let data = {};
        // 数量:正整数 换算总额:两位小数
        if(name === 'number') {
            if(!ValidateUtil.isNumber(value)) {
                return;
            }
            let _amount = parseFloat(value) * selectCoin.tokenRate;
            // TODO: 精确度到小数点后几位
            data.amount = isNaN(_amount) ? 0 : _amount;
            // 添加小数过滤
            data.number = value;
        }
        this.setState(data);
    }

    // 操作按钮
    handleClick = () => {
        this.getPurchaseInfo();
        // 登录判断
        // IEO是否已开始判断, 购买|订阅
        // IEO未开始，是否已订阅判断 订阅|未订阅
        this.setState({
            visible: true
        });
    };
    // 切换弹窗状态
    handleModalVisite(action) {
        this.setState({
            visible: action
        });
    }
    // 币种切换
    handleSelect = (value, option) => {
        let _coin = this.state.coins.filter(item => item.tokenId === value);
        // TODO: 重新计算数值
        this.setState({
            selectCoin: _coin[0] || {}
        })
    }


    render() {
        const { state, btnTxtMap, CountDownProp, props, ModalProp } = this;
        // 父级传递的数据
        const { data, authStore, userInfoStore } = props;
        // 选中的coin
        const {selectCoin} = state;
        // 可选币种
        let $coinOptions = state.coins.map((item, i) => {
            return <Option key={i} value={item.tokenId}>{item.tokenName}</Option>
        })
        // 余额信息
        let $amount = (
            <div className="amount-info">
                {UPEX.lang.template('余额')} <em>{NumberUtil.separate(selectCoin.tokenAmount)}</em> {selectCoin.tokenName}
                {
                    UPEX.config.baseCurrencyEn === selectCoin.tokenName ?
                    (<a className="deposit" href="/account/balance/recharge" target="_blank">{UPEX.lang.template('充值')}</a>) :
                    (<a className="deposit" href={`/account/coin/recharge/${selectCoin.tokenName}`} target="_blank">{UPEX.lang.template('充币')}</a>)
                }
            </div>
        );
        // 协议条款
        let $coinAgreement = (
            <div className="coin-agreement">
                {selectCoin.tokenAgreement}
            </div>
        )
        // 法币购买-身份认证提示
        let $authTip = null;
        if(userInfoStore.authLevel < this.level && selectCoin.tokenName === UPEX.config.baseCurrencyEn) {
            $authTip = (<div className="coin-condition">
                {selectCoin.tokenAgreement}
            </div>);
        }

        return (
            <div className="coin-info clearfix">
                <div className="left-box">
                    <img src={data.logoUrl} alt="" />
                    <StatusIcon status={1} />
                    <p className="label">{UPEX.lang.template('剩余时间')}</p>
                    <CountDown {...CountDownProp} />
                </div>

                <div className="right-box">
                    <Row>
                        <Col className="name" span={24}>
                            {data.tokenName}
                        </Col>
                        <Col className="text date" span={12}>
                            <label>{UPEX.lang.template('IEO时间')}:</label>
                            {data._beginTime} - {data._endTime}
                        </Col>
                        <Col className="text count" span={12}>
                            <label>{UPEX.lang.template('已经募集')}:</label>
                            {NumberUtil.separate(data.raisedAmount)} {data.tokenName}
                        </Col>
                        <Col className="text price" span={12}>
                            <label>{UPEX.lang.template('IEO价格')}:</label>1 {data.tokenName} ≈ {data.price} {UPEX.config.baseCurrencyEn}
                        </Col>
                        <Col className="text progress" span={12}>
                            <label>{UPEX.lang.template('IEO进度')}:</label>
                            <Progress percent={data._percent} size="small"/>
                        </Col>
                        <Col className="text description" span={24}>
                            <label>{UPEX.lang.template('项目介绍')}:</label>
                            {data.tokenDesc}
                        </Col>
                        <Col span={24} className="text buy">
                            <Button onClick={this.handleClick}>{btnTxtMap[state.projectState] || ''}</Button>
                        </Col>
                    </Row>
                </div>

                <Modal {...ModalProp} visible={state.visible}>
                    <FormView>
                        <FormItem label={UPEX.lang.template('购买单价')}>
                            <div className="text">
                                1 {data.tokenName} ≈ {selectCoin.tokenRate} {selectCoin.tokenName}  <span className="tip">{UPEX.lang.template('当前比例是根据 ACE 10分钟内价格计算')}</span>
                            </div>
                        </FormItem>
                        <FormItem label={UPEX.lang.template('购买方式')} after={$authTip}>
                            <Select defaultValue={selectCoin.tokenId} value={selectCoin.tokenId} onChange={this.handleSelect}>
                                {$coinOptions}
                            </Select>
                        </FormItem>
                        <FormItem label={UPEX.lang.template('购买数量')} value={state.number} inputProps={{onChange: this.setVal.bind(this, 'number'), suffix: data.tokenName}}/>
                        <FormItem label={UPEX.lang.template('金额')} after={$amount}>
                            <div className="text">
                            ≈ {state.amount} {selectCoin.tokenName}
                            </div>
                        </FormItem>

                        <FormItem after={$coinAgreement}>
                            <Button className="submit-btn" onClick={this.onSubmit}>
                                {UPEX.lang.template('购买')}
                            </Button>
                        </FormItem>
                    </FormView>
                    <div className="bottom-tip">

                    </div>
                </Modal>
            </div>
        );
    }
}

export default View;
