/**
 * @fileoverview  绑定手机
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch } from 'antd'
import { Link } from 'react-router'

@observer
export default class Email extends Component {
  render() {
    return (
      <div className="binding-phone-content">
        <div className="binding-phone-left">
          <div>
            <span className="phone">102*****13@163.com</span>
            <Button>
              <Link to="/user/modifyEmail">
                {UPEX.lang.template('修改')}
              </Link>
            </Button>
          </div>
          <div className="message">
            {UPEX.lang.template('郵箱用於登錄、提幣及部分安全設置使用。我們也會給您提供 登錄提醒服務')}
          </div>
          <div className="switch">
            {UPEX.lang.template('登录邮件提醒')}&nbsp;&nbsp;&nbsp;<Switch />
          </div>
        </div>
        <div className="binding-phone-right">
          <ul>
            <li>{UPEX.lang.template('郵箱的私人性質很強，所以請牢記您郵箱的密碼，一旦您設定了電子郵箱，除非極特殊的情況，我們無法為您提供修改綁定服務。')}。</li>
          </ul>
        </div>
      </div>
    )
  }
}