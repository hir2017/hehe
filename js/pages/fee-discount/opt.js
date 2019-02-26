/**
 * filename: 手续费开通操作弹窗
 */
import React from 'react';
import { Modal, Button } from 'antd';
import {transLabel_discount} from './util';
import {aaa} from '@/api/http';
const  Success = ()  => {
    return (
        <div className="success-info">
            开通成功
        </div>
    )
}

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

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectItem: {},
        };
    }

    componentDidMount() {
        // 获取GIFTO或者ACEX的id然后调用那个接口获取数量
    }

    dates = [
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
        })
    }

    dateOnSelect(item) {}

    get billCost() {}

    close = status => {

    };
    // 选中折扣
    openDialog = item => {
        console.log('onSelect', item);
        this.setState({
            visible: true,
            selectItem: item
        });
    };

    render() {
        const { state, dates } = this;
        const { source } = this.props;
        return (
            <div className="discount-list-wrapper">
                <Modal {...this.modalProps} visible={state.visible} onOk={this.handleClose.bind(this, 'ok')} onCancel={this.handleClose.bind(this, 'cancel')}>
                    <div className="discounts">
                        {source.map((item, i) => (
                            <div className={`item ${state.selectItem.discount == item.discount ? 'selected' : ''}`} key={i} onClick={this.discountOnSelect.bind(this, item)}>
                                {transLabel_discount(item.discount)}
                            </div>
                        ))}
                    </div>
                    <div className="warning">
                            {UPEX.lang.template('交易手续费{discount}，开通当前折扣后，在有效期内将无法再次变更折扣套餐', {discount: '5折'})}
                    </div>
                    <div className="expiry-date">
                        {dates.map((item, i) => (
                            <div className="item" key={i} onClick={this.dateOnSelect.bind(this, item)}>
                                {UPEX.lang.template('{num}月', { num: item.num })}
                            </div>
                        ))}
                    </div>
                    <div className="cost">{this.billCost}</div>
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
