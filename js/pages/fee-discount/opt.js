/**
 * filename: 手续费开通操作弹窗
 */
import React from 'react';
import { Modal, Button, message } from 'antd';
import { transLabel_discount } from './util';
import { Link, browserHistory } from 'react-router';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import Api from '@/api';
import { observer, inject } from 'mobx-react';

const Success = props => {
    const { selectItem, month } = props.data;
    console.log()
    let discount = transLabel_discount(selectItem.discount);
    return (
        <FormView className="success-info">
            <FormItem className="title">
                {UPEX.lang.template('已开通')}: {discount}
            </FormItem>
            <FormItem className="content">
                <label>{UPEX.lang.template('服务内容')}:</label> {UPEX.lang.template('{discount}交易手续费折扣特权', { discount })}
            </FormItem>
            <FormItem className="content">
            <label>{UPEX.lang.template('有效期')}:</label> {UPEX.lang.template('{discount}交易手续费折扣特权', { discount })}
            </FormItem>
            <FormItem>
                <Button className="submit-btn" onClick={e => {
                    browserHistory.push('/webtrade');
                }}>
                    {UPEX.lang.template('去行情中心')}
                </Button>
            </FormItem>
        </FormView>
    );
};

const Item = ({ data, onClick }) => {
    return (
        <div className="item">
            <p>{UPEX.lang.template('交易手续费折扣')}</p>
            <p className="discount">{transLabel_discount(data.discount)}</p>
            <p className="price">{UPEX.lang.template('{num}/月', { num: data.price + (data.unit || '') })}</p>
            <Button
                onClick={e => {
                    onClick(data);
                }}
            >
                {UPEX.lang.template('开通')}
            </Button>
        </div>
    );
};

@inject('userInfoStore')
@observer
class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectItem: {},
            month: 1,
            pwd: '',
            success: false
        };
    }

    componentDidMount() {
        // 获取GIFTO或者ACEX的id然后调用那个接口获取数量
    }

    months = [
        {
            num: 1
        }
    ];

    modalProps = {
        title: UPEX.lang.template('开通手续费折扣特权'),
        wrapClassName: 'fee-discount'
    };
    // 关闭弹窗
    handleClose(status) {
        console.log('close', status);
        this.setState({
            visible: false
        });
    }

    discountOnSelect(item) {
        this.setState({
            selectItem: item
        });
    }

    dateOnSelect(item) {}

    get billCost() {
        const { month, selectItem } = this.state;
        return selectItem.price * month;
    }

    close = status => {};
    // 选中折扣
    openDialog = item => {
        console.log('onSelect', item);
        this.setState({
            visible: true,
            selectItem: item
        });
    };

    pwdChange = e => {
        this.setState({
            pwd: e.target.value
        });
    };

    onSubmit = () => {
        const { pwd, selectItem } = this.state;
        const { userInfo } = this.props.userInfoStore;
        if (pwd === '') {
            message.error('请输入资金密码');
            return;
        }
        const params = {
            fdPwd: md5(pwd + UPEX.config.dealSalt + userInfo.uid),
            goodsName: selectItem.goodsName,
            price: selectItem.price
        };
        this.setState({
            loading: true
        });
        Api.feeDiscount
            .setPackage(params)
            .then(res => {
                if (res.status !== 200) {
                    message.error(res.message);
                }
                return res;
            })
            .catch(err => {
                console.error('Api.feeDiscount.setPackage', err);
                message.error('network error');
            })
            .then(res => {
                this.setState({
                    loading: false,
                    visible: res.status === 200 ? false : true,
                    success: res.status === 200 ? true : false
                });
            });
    };

    render() {
        const { state } = this;
        if (state.success) {
            return <Success data={state} />;
        }
        const { source } = this.props;
        let Currency = UPEX.config.feeDiscountCurrencyEn;
        let $discounts = source.map((item, i) => (
            <div className={`item ${state.selectItem.discount == item.discount ? 'selected' : ''}`} key={i} onClick={this.discountOnSelect.bind(this, item)}>
                {transLabel_discount(item.discount)}
            </div>
        ));
        return (
            <div className="discount-list-wrapper">
                <Modal
                    {...this.modalProps}
                    footer={null}
                    visible={state.visible}
                    onOk={this.handleClose.bind(this, 'ok')}
                    onCancel={this.handleClose.bind(this, 'cancel')}
                >
                    <FormView>
                        <FormItem
                            className="discounts"
                            label={UPEX.lang.template('开通折扣')}
                            tip={UPEX.lang.template('交易手续费{discount}，开通当前折扣后，在有效期内将无法再次变更折扣套餐', {
                                discount: transLabel_discount(state.selectItem.discount)
                            })}
                        >
                            {$discounts}
                        </FormItem>
                        <FormItem className="expiry-date" label={UPEX.lang.template('开通时长')}>
                            {this.months.map((item, i) => (
                                <div className="item" key={i} onClick={this.dateOnSelect.bind(this, item)}>
                                    {UPEX.lang.template('{num}月', { num: item.num })}
                                </div>
                            ))}
                        </FormItem>
                        <FormItem className="cost" label={UPEX.lang.template('应付')}>
                            <div className="bill">
                                {this.billCost}
                                {Currency}
                            </div>
                            <div className="account">
                                {state.account}
                                {Currency} <Link to={`/account/coin/withdraw/${Currency}`}>{UPEX.lang.template('充币')}</Link>
                            </div>
                        </FormItem>
                        <FormItem
                            className="pwd"
                            label={UPEX.lang.template('资金密码')}
                            inputProps={{ onChange: this.pwdChange, type: 'password' }}
                            value={state.pwd}
                        />
                        <FormItem>
                            <Button loading={state.loading} className="submit-btn" onClick={this.onSubmit}>
                                {UPEX.lang.template('提交')}
                            </Button>
                        </FormItem>
                    </FormView>
                </Modal>
                <div className="discount-list">
                    {source.map((item, i) => (
                        <Item key={i} data={item} onClick={this.openDialog} />
                    ))}
                </div>
            </div>
        );
    }
}

export default View;
