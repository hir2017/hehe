import React from 'react';
import { Button } from 'antd';
import { transLabel_discount } from './util';

export class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        }
    }

    handleClick = () => {
        this.setState({
            disabled: true
        });
        setTimeout(() => {
            this.setState({
                disabled: false
            })
        }, 800)
    }

    render() {
        const { data, onClick, unit, isUsed = false } = this.props;
        return (
            <div className="item">
                <div className="item-inner">
                    <div className="label">{UPEX.lang.template('交易手续费折扣')}</div>
                    <div className="discount" dangerouslySetInnerHTML={{__html: transLabel_discount(data.discount)}} />
                    <div className="price">{UPEX.lang.template('{num}/月', { num: data.price + (unit || '') })}</div>
                    {isUsed ? (
                         <Button disabled>
                         {UPEX.lang.template('使用中')}
                     </Button>
                    ) : (
                        <Button
                            disabled={this.state.disabled}
                            onClick={e => {
                                this.handleClick();
                                onClick(data);
                            }}
                        >
                            {UPEX.lang.template('开通')}
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

