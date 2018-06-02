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
          <span className="icon-text">恭喜您！</span>
        </div>
        <div className="item">
        您已经成功绑定邮箱 <span className="email">10234713@qq.com</span>
        </div>
        <div className="item">
        还差一步，您就可以开始交易了
        </div>
        <div className="item">
          <Link to="/user/bankInfo">
            去身份验证
            <span className="icon">1</span>
          </Link>
        </div>
      </div>
    )
  }
}