/**
 * @fileoverview: 公共视图组件
 * @author: ShangJin
 * @date: 2018/12/7
 */
import React from 'react';

/**
 * @fn  状态标签
 * @param {status} props
 */
export const StatusIcon = (props) => {
    const {status} = props;
    const statusMap = {
        0: ['即将开始', 'start'],
        1: ['进行中', 'on'],
        2: ['已结束', 'end'],
        3: ['已结束', 'end'],
        4: ['已结束', 'end']
    };
    let current = statusMap[status] ? statusMap[status] : ['已结束', 'end'];

    return (<div className={`status-icon ${current[1]}`}>
        {UPEX.lang.template(current[0])}
    </div>);
};
