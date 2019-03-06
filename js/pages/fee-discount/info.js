/**
 * filename: 已购买 信息展示
 */
import React from 'react';
import { Button } from 'antd';
import { Item } from './mod';
import { browserHistory } from 'react-router';
import FormView from '@/mods/common/form';
import FormItem from '@/mods/common/form/item';
import TimeUtil from '@/lib/util/date';

export default ({ data }) => {
    // TODO: endTimeStamp还没加
    const _bill = data;
    return (
        <div className="bill-detail">
            <header className="title">{UPEX.lang.template('当前手续费折扣特权')}</header>
            <div className="discount-list">
                <Item isUsed={true} data={_bill} unit={UPEX.config.feeDiscountCurrencyEn} />
            </div>
            <div className="deadline" >
                <label>{UPEX.lang.template('有效期')}:</label> {TimeUtil.formatDate(data.endTimeStamp)}
            </div>
            <FormView>
                <FormItem>
                    <Button
                        className="submit-btn"
                        onClick={e => {
                            browserHistory.push('/webtrade');
                        }}
                    >
                        {UPEX.lang.template('去行情中心')}
                    </Button>
                </FormItem>
            </FormView>
        </div>
    );
};
