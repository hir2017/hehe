/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Icon } from 'antd'
import { Link } from 'react-router'

@observer
export default class extends Component {
  render() {
    return (
      <div className="bind-success">
        <div className="item">
          <span className="icon">
            <Icon type="check" />
          </span>
          <span className="icon-text">{UPEX.lang.template('恭喜您')}！</span>
        </div>
        <div className="item">
        {UPEX.lang.template('您已经成功绑定手机')} <span className="email">18701073624</span>
        </div>
        <div className="item">
        {UPEX.lang.template('还差一步，您就可以开始交易了')}
        </div>
        <div className="item">
          <Link to="/user/bankInfo">
          {UPEX.lang.template('去身份验证')}
            <span className="icon">1</span>
          </Link>
        </div>
      </div>
    )
  }
}