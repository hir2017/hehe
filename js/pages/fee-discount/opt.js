/**
 * filename: 手续费开通操作弹窗
 */
import React from 'react';
import { Modal, Button, message, Icon } from 'antd';
import { transLabel_discount } from './util';
import { Link, browserHistory } from 'react-router';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import Api from '@/api';
import { getTakeCoinInfo } from '@/api/http';
import { observer, inject } from 'mobx-react';
import { Item } from './mod';
import moment from 'moment';

const Success = ({ data, deadline }) => {
    let discount = transLabel_discount(data.discount);
    return (
        <div className="success-info">
            <div className="text-warpper">
                <ul className="inner">
                    <li className="text title">
                        {UPEX.lang.template('已开通')}: <span dangerouslySetInnerHTML={{ __html: discount }} />
                    </li>
                    <li className="text content">
                        <label>{UPEX.lang.template('服务内容')}:</label>{' '}
                        <span dangerouslySetInnerHTML={{ __html: UPEX.lang.template('{discount}交易手续费折扣特权', { discount }) }} />
                    </li>
                    <li className="text deadline">
                        <label>{UPEX.lang.template('有效期')}:</label> {deadline}
                    </li>
                </ul>
            </div>
            <FormView>
                <FormItem>
                    <Button
                        className="submit-btn"
                        onClick={e => {
                            browserHistory.push('/webtrade');
                        }}
                    >
                        {UPEX.lang.template('去交易')}
                    </Button>
                </FormItem>
            </FormView>
        </div>
    );
};

@inject('userInfoStore', 'authStore')
@observer
class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectItem: {},
            month: 1,
            pwd: '',
            success: false,
            coinAccount: 0,
            dateStamp: 0
        };
    }

    componentDidMount() {
        this.getSeverTime();
        // 获取GIFTO或者ACEX的id然后调用那个接口获取数量
        getTakeCoinInfo(UPEX.config.feeDiscountCurrencyId).then(res => {
            if (res.status == 200) {
                const { resp } = res.attachment;
                this.setState({
                    coinAccount: resp.cashAmount
                });
            }
        });
    }

    getSeverTime() {
        Api.common.getSeverTime().then(res => {
            if(res.status === 200) {
                this.setState({
                    dateStamp: res.attachment
                })
            }
        });
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
        this.setState({
            visible: false,
            pwd: ''
        });
    }

    discountOnSelect(item) {
        this.setState({
            selectItem: item
        });
    }

    dateOnSelect(...assets) {
        // console.log(assets);
    }

    get billCost() {
        const { month, selectItem } = this.state;
        return selectItem.price * month;
    }

    // 选中折扣
    openDialog = item => {
        const {userInfo} = this.props.userInfoStore;
        // 登录校验
        if(!this.props.authStore.checkLoginState()) {
            browserHistory.push('/login');
            return;
        }
        if(userInfo.isValidatePass !== 1) {
            message.destroy();
            message.warning(UPEX.lang.template('请先设置资金密码'));
            return;
        }

        this.getSeverTime();
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
        if (parseFloat(this.state.coinAccount) < selectItem.price) {
            message.error(UPEX.lang.template('余额不足'));
            return;
        }
        if (pwd === '') {
            message.error(UPEX.lang.template('请输入资金密码'));
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

    get deadline() {
        const { dateStamp } = this.state;
        var _date = moment(new Date(dateStamp)).add(1, 'months');
        return _date.format('YYYY-MM-DD HH:mm') + ':00';
    }

    get account() {
        return this.state.coinAccount;
    }

    render() {
        const { state } = this;
        if (state.success) {
            return <Success data={state.selectItem} deadline={this.deadline} />;
        }
        const { source } = this.props;
        let Currency = UPEX.config.feeDiscountCurrencyEn;
        let $discounts = source.map((item, i) => (
            <div className={`item ${state.selectItem.discount == item.discount ? 'selected' : ''}`} key={i} onClick={this.discountOnSelect.bind(this, item)}>
                <div dangerouslySetInnerHTML={{ __html: transLabel_discount(item.discount) }} />
                {state.selectItem.discount == item.discount ? <Icon type="check" /> : null}
            </div>
        ));
        return (
            <div className="discount-list-wrapper">
                <header className="title">{UPEX.lang.template('开通手续费折扣特权')}</header>
                <Modal
                    {...this.modalProps}
                    width={750}
                    footer={null}
                    visible={state.visible}
                    onOk={this.handleClose.bind(this, 'ok')}
                    onCancel={this.handleClose.bind(this, 'cancel')}
                >
                    <FormView>
                        <FormItem
                            className="discounts"
                            label={UPEX.lang.template('开通折扣')}
                            after={
                                <div className="tip-text">
                                    <Icon type="exclamation" />
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: UPEX.lang.template('交易手续费{discount}，开通当前折扣后，在有效期内将无法再次变更折扣套餐', {
                                                discount: transLabel_discount(state.selectItem.discount)
                                            })
                                        }}
                                    />
                                </div>
                            }
                        >
                            {$discounts}
                        </FormItem>
                        <FormItem className="inline expiry-date" label={UPEX.lang.template('开通时长')}>
                            <div className="bill">{UPEX.lang.template('{num}月', { num: 1 })}</div>
                            <div className="deadline">{UPEX.lang.template('有效期至: {date}', { date: this.deadline })}</div>
                        </FormItem>
                        <FormItem className="inline cost" label={UPEX.lang.template('应付')}>
                            <div className="bill">
                                {this.billCost}
                                {Currency}
                            </div>
                            <div className="inline account">
                                {UPEX.lang.template('可用 {num} {unit}', { num: this.account, unit: Currency })}
                                <Link to={`/account/coin/recharge/${Currency}`}>{UPEX.lang.template('充币')}</Link>
                            </div>
                        </FormItem>
                        <FormItem
                            className="pwd inline"
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
                        <Item key={i} data={item} unit={UPEX.config.feeDiscountCurrencyEn} onClick={this.openDialog} />
                    ))}
                </div>
            </div>
        );
    }
}

export default View;
