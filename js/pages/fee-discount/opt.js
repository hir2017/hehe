/**
 * filename: 手续费开通操作弹窗
 */
import React from 'react';
import { Modal, Button } from 'antd';

class View extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    dates = [
        {
            num: 1,
        }
    ]

    modalProps = {
        title:UPEX.lang.template('开通手续费折扣特权'),
        wrapClassName: 'fee-discount'
    }

    handle(status) {
        this.props.onClose(status);
    }

    discountOnSelect(item) {

    }

    dateOnSelect(item) {

    }

    get billCost() {

    }

    render() {
        const {state, props, dates} = this;
        return (
            <Modal  {...this.modalProps} visible={props.visible} onOk={this.handle.bind(this, 'ok')} onCancel={this.handle.bind(this, 'cancel')}>
                <div className="discounts">
                    {
                        props.sourceData.map((item, i) => <div className="item" key={i} onClick={this.discountOnSelect.bind(this, item)}>{UPEX.lang.template('{num}折', {num: data.discount})}</div>)
                    }
                </div>
                <div className="expiry-date">
                    {
                        dates.map((item, i) => <div className="item" key={i} onClick={this.dateOnSelect.bind(this, item)}>{UPEX.lang.template('{num}月', {num: item.num})}</div>)
                    }
                </div>
                <div className="cost">
                    {this.billCost}
                </div>
            </Modal>
        );
    }
}

export default View;
