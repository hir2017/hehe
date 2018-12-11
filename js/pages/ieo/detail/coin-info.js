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
import {getSingleIEOPurchaseInfo} from '@/api/http';

const Option = Select.Option;

@inject('userInfoStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.inputProps = {
            // 购买方式
            type: {
                label: UPEX.lang.template('购买方式')
            }
        };
    }

    componentDidMount() {
        this.checkProjectState();
    }

    getPurchaseInfo() {
        console.log('getPurchaseInfo')
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

    setVal(name, e) {
        const {selectCoin} = this.state;
        let {value} = e.target;
        let data = {};
        if(name === 'number') {
            data.amount = parseFloat(value) * selectCoin.tokenRate;
        }
        // 添加小数过滤
        data[name] = value;
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

    handleModalVisite(action) {

        this.setState({
            visible: false
        });
    }

    handleSelect = (value, option) => {
        let _coin = this.state.coins.filter(item => item.tokenId === value)
        this.setState({
            selectCoin: _coin[0] || {}
        })
    }

    onSubmit = () => {
        console.log('onSubmit')
    }

    render() {
        const { state, btnTxtMap, formatTime } = this;
        // 父级传递的数据
        const { data } = this.props;
        // 选中的coin
        const {selectCoin} = state;
        // 倒计时属性
        let CountDownProp = {
            startTime: data._beginTimeStamp,
            skin: 'dark',
            endTime: data._endTimeStamp,
            serverTime: data._systemTimeStamp,
            flag: 0,
        };
        // 可选币种
        let $coinOptions = state.coins.map((item, i) => {
            return <Option key={i} value={item.tokenId}>{item.tokenName}</Option>
        })
        // 余额信息
        let $amount = (
            <div className="amount-info">
                {UPEX.lang.template('余额')} {NumberUtil.separate(selectCoin.tokenAmount)} {selectCoin.tokenName}
                {
                    UPEX.config.baseCurrencyEn === selectCoin.tokenName ?
                    (<a className="deposit" href="/account/balance/recharge" target="_blank">{UPEX.lang.template('充值')}</a>) :
                    (<a className="deposit" href={`/account/coin/recharge/${selectCoin.tokenName}`} target="_blank">{UPEX.lang.template('充币')}</a>)
                }
            </div>
        );
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
                            {NumberUtil.separate(data.raisedAmount)}
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

                <Modal
                    wrapClassName="ieo-buy"
                    title={null}
                    visible={state.visible}
                    footer={null}
                >
                    <FormView>
                        <FormItem label={UPEX.lang.template('购买单价')}>
                            <div className="text">
                                1 {data.tokenName} ≈ {selectCoin.tokenRate} {selectCoin.tokenName}  <span className="tip">{UPEX.lang.template('当前比例是根据 ACE 10分钟内价格计算')}</span>
                            </div>
                        </FormItem>
                        <FormItem label={UPEX.lang.template('购买方式')}>
                            <Select defaultValue={selectCoin.tokenId} value={selectCoin.tokenId} onChange={this.handleSelect}>
                                {$coinOptions}
                            </Select>
                        </FormItem>
                        <FormItem label={UPEX.lang.template('购买数量')} value={state.number} inputProps={{onChange: this.setVal.bind(this, 'number'), suffix: data.tokenName}}/>
                        <FormItem label={UPEX.lang.template('金额')} after={$amount}>
                            <div className="text">
                            ≈ {state.amount}
                            </div>
                        </FormItem>

                        <FormItem >
                            <Button className="submit-btn" onClick={this.onSubmit}>
                                {UPEX.lang.template('购买')}
                            </Button>
                        </FormItem>
                    </FormView>
                </Modal>
            </div>
        );
    }
}

export default View;
