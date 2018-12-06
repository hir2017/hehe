/**
 * @file 公共组件
 */
import TimeUtil from '@/lib/util/date';
import React, { Component } from 'react';

// 分批上账列表组件
export const DepositDetailList = (props) => {
    // data:列表 num:余额
    const {data, num} = props;
    let $list = (
        <div className="deposit-detail-list">
            {
                data.map((item, i) => {
                    return (
                        <div key={i} className="text">
                            <span className="label">{UPEX.lang.template('时间')}：</span>
                            {TimeUtil.formatDate(item.entryAmount)}
                            <span className="label num">{UPEX.lang.template('上账金额')}：</span>
                            {item.entryAmount}
                        </div>
                    )
                })
            }
            {
                num === 'none' ? null : (
                    <div  className="single text">
                        <span className="label">{UPEX.lang.template('等待上账')}：</span>
                        {num}
                    </div>
                )
            }

        </div>
    )
    return $list;
}
