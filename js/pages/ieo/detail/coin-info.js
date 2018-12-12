/**
 * @fileoverview IEO 数字币信息
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Modal, Row, Col, Progress, Select, message } from 'antd';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import { StatusIcon } from '../view';
import CountDown from '../countdown';
import NumberUtil from '@/lib/util/number';
import TimeUtil from '@/lib/util/date';
import { isNumber } from '@/lib/util/validate';
import {getSingleIEOPurchaseInfo, buyIEOToken, getIEOIsSubscribe, IEOToDoSubscribe} from '@/api/http';

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
            // 购买弹窗状态
            visible: false,
            // 购买结果弹窗状态
            msgVisible: false,
            // 购买结果信息 message status
            msgData: {},
            // 购买-当前选择币种
            selectCoin: {},
            // 购买-购买方式所有币种
            coins: [],
            // 购买-购买数量
            number: 0,
            // 购买-购买总价
            amount: 0,
        };
        // 发行状态，'0:未开始 1:进行中 2:已结束(募集成功) 3:已结束(募集失败) 4:已上币
        // 购买弹窗触发按钮的状态映射
        this.btnStatusMap = {
            '0': ['login', 'not-subscribed', 'subscribed'],
            '1': 'start',
            '2': 'done',
            '3': 'done',
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
            onCancel: () => {
                this.setState({
                    visible: false
                })
            }
        };
        // 弹窗属性
        this.msgModalProp = {
            wrapClassName: "ieo-buy-msg",
            title: null,
            footer: null,
            closable: false,
            onCancel: () => {
                this.setState({
                    msgVisible: false
                })
            }
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
        return getSingleIEOPurchaseInfo({
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
            console.error('ieo getSingleIEOPurchaseInfo', err)
        })
    }

    checkProjectState() {

        /**
         * 判断用户是否登录，该IEO是否开始 status 0:未开始 1:进行中 2:已结束(募集成功) 3:已结束(募集失败) 4:已上币
         * 未开始: 未登录=>提示登录  登录=>发起订阅
         */
        const {status} = this.props.data;
        let projectState = this.btnStatusMap[status];
        // 是否已开始
        if(status !== 0) {
            this.setState({
                projectState
            });
            return ;
        }
        // 未开始
        const { data, authStore, userInfoStore } = this.props;
        // 是否已登录
        if(!authStore.isLogin) {
            // 未登录
            this.setState({
                projectState: projectState[0]
            });
            return;
        }
        // 获取订阅结果
        getIEOIsSubscribe({
            ieoId: this.props.ieoId
        }).catch(err => {

            console.error('getIEOIsSubscribe', err);
            return {status: 50000}
        }).then(res => {
            let _state = projectState[0];
            if(res.status === 200) {
                _state = projectState[res.attachment.isSubscribe === 1 ? 2 : 1]
            }
            this.setState({
                projectState: _state
            });
        })

    }

    onSubmit = () => {
        const {selectCoin, number, amount} = this.state;
        // TODO: 校验 余额、币种最小购买、token剩余数量
        this.setState({
            visible: false,
            selectCoin: {},
            coins: [],
            number: 0,
            amount: 0,
            msgData: {}
        })
        let _order = {
            ieoId: this.props.ieoId,
            tokenId: selectCoin.tokenId, //购买使用的代币ID
            count: number
        };
        buyIEOToken(_order).then(res => {
            let msgData = {
                selectCoin,
                status: res.status === 200 ? 'success' : 'fail',
                title: res.status === 200 ? UPEX.lang.template('购买成功, 请在资产管理中查看') : UPEX.lang.template('购买失败, 请重新尝试购买'),
            };
            // 成功 显示时间
            if(res.status === 200) {
                msgData.order = {
                    ..._order,
                    amount: res.attachment.payCount
                };
                msgData.date = TimeUtil.formatDate(res.attachment.buyTime);
            }
            let _state = {
                msgVisible: true,
                msgData
            }
            this.setState(_state)

        }).catch(err => {
            console.error('buyIEOToken', err)
        })
    }
    // 计算金额
    computeAmount(value, tokenRate) {
        // 换算总额精确度到小数点后8位
        let _amount = NumberUtil.mul(value, tokenRate);
        _amount = isNaN(_amount) ? 0 : _amount;
        return NumberUtil.toFixed(_amount, 8);
    }

    formateNumber(value, total) {
        if(value === '') {
            // 清空金额
            return {
                amount: 0,
                number: ''
            }
        }
        // 小数过滤
        if(!isNumber(value)) {
            return;
        }
        let param = {};
        value = parseInt(value);
        // 数量最大为发行量
        value = value > total ? total : value;
        param.number = value;
        const {tokenRate} = this.state.selectCoin;
        param.amount = this.computeAmount(value, tokenRate);

        return param;
    }
    setVal(name, e) {
        const {data} = this.props;
        let {value} = e.target;
        let _param = {};
        // 数量:正整数 换算总额:两位小数
        if(name === 'number') {
            _param = this.formateNumber(value, data.totalCirculation);
        }
        this.setState(_param);
    }

    handleSubscribe() {
        IEOToDoSubscribe({
            ieoId: this.props.ieoId
        }).then(res => {
            if(res.status === 200) {
                if(res.attachment.success === 1) {
                    message.success(UPEX.lang.template('订阅成功'))
                } else {
                    message.warning(res.message);
                }
            }
        }).catch(err => {
            console.error('IEOToDoSubscribe', err);
        }).then(res => {
            this.checkProjectState();
        })
    }

    // 订阅、购买操作按钮
    handleClick = () => {
        const {projectState} = this.state;
        // 登录判断
        // IEO是否已开始判断, 购买|订阅
        // IEO未开始，是否已订阅判断 订阅|未订阅
        // 是否允许操作
        let _disabled = false;
        switch (projectState) {
            case 'login':
                message.warning(UPEX.lang.template('请先登录'));
                _disabled = true;
                break;
            case 'not-subscribed':
                this.handleSubscribe();
                _disabled = true;
                break;
            case 'subscribed':
                // message.warning(UPEX.lang.template('请先登录'));
                _disabled = true;
                break;
            default:
                break;
        }
        if(_disabled) {
            return ;
        }
        this.getPurchaseInfo();
        this.setState({
            visible: true,
            msgVisible: false
        });
    };
    // 操作按钮
    handleMsgClick = () => {
        const {msgData} = this.state;
        let _state = {
            msgVisible: false
        }
        if(msgData.status === 'fail') {
            _state.visible = true;
            this.getPurchaseInfo();
        }
        this.setState(_state);
    }

    // 切换弹窗状态
    handleModalVisite(action) {
        this.setState({
            visible: action
        });
    }
    // 币种切换
    handleSelect = (value, option) => {
        let _coin = this.state.coins.filter(item => item.tokenId === value);
        let selectCoin = _coin[0] || {};
        // 重新计算数值
        let amount = this.computeAmount(this.state.number, selectCoin.tokenRate);
        this.setState({
            selectCoin,
            amount
        });

    }


    render() {
        const { state, btnTxtMap, CountDownProp, props, ModalProp, msgModalProp } = this;
        // 父级传递的数据
        const { data, authStore, userInfoStore } = props;
        // 选中的coin 购买结果
        const {selectCoin, msgData} = state;
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
        let $msgContent = null, $msgBtn = null;
        if(state.msgVisible) {
            // 订单显示信息 成功|失败
            $msgContent = msgData.status === 'success' ? (
                <div className="content">
                    <p>
                        <label>{UPEX.lang.template('支付时间')}</label>{msgData.date}
                    </p>
                    <p>
                        <label>{UPEX.lang.template('购买方式')}</label>{msgData.selectCoin.tokenName}
                    </p>
                    <p>
                        <label>{UPEX.lang.template('购买数量')}</label>{msgData.order.count} {data.tokenName}
                    </p>
                    <p>
                        <label>{UPEX.lang.template('购买金额')}</label>{msgData.order.amount} {msgData.selectCoin.tokenName}
                    </p>
                </div>
            ) : (
                <div className="content">

                </div>
            );
            $msgBtn = <Button className="close" onClick={this.handleMsgClick}>{msgData.status === 'success' ? UPEX.lang.template('关闭') : UPEX.lang.template('重新购买')}</Button>
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
                </Modal>
                <Modal {...msgModalProp} visible={state.msgVisible}>
                    <div className={`msg-box ${msgData.status}`}>
                        <h3><span className="inner">{msgData.title}</span></h3>
                        { $msgContent }
                    </div>
                    {$msgBtn}
                </Modal>
            </div>
        );
    }
}

export default View;
