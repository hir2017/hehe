/**
 * @fileoverview IEO 数字币信息
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {Button, Modal} from 'antd';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';

@inject('userInfoStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectState: '',
            visible: false
        }
        this.btnTxtMap = {
            // 未登录
            'login': UPEX.lang.template('加入 IEO'),
            // 未订阅 (未开始)
            'not-subscribed': UPEX.lang.template('加入 IEO'),
            // 已订阅 (未开始)
            'subscribed': UPEX.lang.template('即将开始'),
            // 购买 (已开始)
            'start': UPEX.lang.template('现在购买'),
            // 结束
            'done': UPEX.lang.template('已结束'),
        }
        this.inputProps = {
            // 购买方式
            type: {
                label: UPEX.lang.template('购买方式'),
            }
        }
    }

    componentDidMount() {
        this.getData().then(res => {
            this.checkProjectState();
        });
    }

    getData() {
        // mock
        return new Promise(function(reslove, reject) {
            reslove({status: 200});
        })
    }

    checkProjectState() {
        // 判断用户是否登录，该IEO是否开始
        this.setState({
            projectState: 'not-subscribed'
        })
    }

    // 操作按钮
    handleClick = () => {
        this.setState({
            visible: true
        })
        // 登录判断
        // IEO是否已开始判断, 购买|订阅
        // IEO未开始，是否已订阅判断 订阅|未订阅
    }

    handleModalVisite(action) {
        this.setState({
            visible: false
        })
    }

    render() {
        const {state, btnTxtMap} = this;
        const {data} = this.props;
        return (
            <div className="coin-info">
                <img src={data.picPath} alt=""/>
                <ul>
                    <li className="symbol"><label>{UPEX.lang.template('IEO时间')}:</label>{data.symbol}</li>
                    <li className="time"><label>{UPEX.lang.template('IEO价格')}:</label>{data.time}</li>
                    <li className="price"><label>{UPEX.lang.template('IEO进度')}:</label>1 {data.symbol} ≈ {data.price} {UPEX.config.baseCurrencyEn}</li>
                    <li className="progress"><label>{UPEX.lang.template('剩余时间')}:</label>{data.symbol}</li>
                </ul>
                <Button onClick={this.handleClick}>{btnTxtMap[state.projectState] || ''}</Button>
                <Modal
                    title={UPEX.lang.template('购买')}
                    visible={state.visible}
                    onOk={this.handleModalVisite.bind(this, 'submit')}
                    onCancel={this.handleModalVisite.bind(this, 'cancel')}
                    >
                    <FormView>
                        <FormItem ></FormItem>
                    </FormView>

                </Modal>
            </div>
        );
    }
}

export default View;
