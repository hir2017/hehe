/*
 * modify by haiyang 2018-07-23
 * bugfix:
 *  描述：添加多个input用于抵消浏览器探测到password自动填充的bug
 *  解决方案：<input type="text" name="wid_no_auto_3" style={{display: 'none'}}/>
 */
import React from 'react';

export default class View extends React.Component {
    render() {
        return (
            <div className="auto-cpl-hack" style={{width: '1px', height: '1px', opacity: 0, overflow: 'hidden'}}>
                <input type="password" />
                <input type="password" />
                <input type="text" />
                <input type="text" />
            </div>
        );
    }
}
