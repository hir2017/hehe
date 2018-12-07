/**
 * @fileoverview: 公共视图组件
 * @author: ShangJin
 * @date: 2018/12/7
 */
import React from 'react';

export const StatusIcon = (props) => {
    const {status} = props;
    const statusMap = {
        0: ['未开始', 'start'],
        1: ['进行中', 'on'],
        2: ['已结束', 'end']
    };
    let current = statusMap[status];
    return (<div className={`status-icon ${current[1]}`}>
        {UPEX.lang.template(current[0])}
    </div>);
};
