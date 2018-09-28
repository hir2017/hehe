/**
 * 支付通
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, browserHistory } from 'react-router';
import { Button } from 'antd';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import TableView from '@/mods/common/form/table';


@inject('fiatRechargeStore')
@observer
class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNumber: '',
            date: ''
        };
    }

    componentDidMount() {
        /*
        * TODO:
        * ATM: 获取转账号码、转账备注
        */
    }

    onSubmit(action) {

    }

    render() {
        const { props, state } = this;
        const { data = {} } = props;
        let tableData = [
            {
                label: UPEX.lang.template('转账金额'),
                text: `${data.amount} ${UPEX.config.baseCurrencyEn}`
            },
            {
                label: UPEX.lang.template('转账号码'),
                text: state.cardNumber
            },
            {
                label: UPEX.lang.template('转账备注'),
                text: state.note
            }
        ];

        return (
            <FormView>
                <Modal
                    closable={false}
                    visible={this.state.visible}
                    footer={null}
                    width={540}
                    wrapClassName="exc-modal-alert coin-recharge"
                    >
                    <p>
                        11111
                    </p>
                    <Button onClick={e => {this.setState({visible: false})}}>{UPEX.lang.template('我了解风险，继续')}</Button>
                </Modal>
                <FormItem label={UPEX.lang.template('充值信息')}>
                    <TableView data={tableData}></TableView>
                </FormItem>
                <FormItem>
                    <Button className="submit-btn" onClick={this.onSubmit.bind(this)}>
                        {UPEX.lang.template('支付成功, 去账户资金记录查看')}
                    </Button>
                </FormItem>
            </FormView>
        );
    }
}

export default View;
