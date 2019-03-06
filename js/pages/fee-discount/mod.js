import React from 'react';
import { Button } from 'antd';
import { transLabel_discount } from './util';

export const Item = ({ data, onClick, unit, isUsed = false }) => {
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
                        onClick={e => {
                            onClick(data);
                        }}
                    >
                        {UPEX.lang.template('开通')}
                    </Button>
                )}
            </div>
        </div>
    );
};
