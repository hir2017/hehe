/**
 * @fileoverview  绑定手机
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch } from 'antd'
import { Link } from 'react-router'

@inject('userInfoStore')
@observer
export default class Email extends Component {

  componentWillMount() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    Object.keys(userInfo).length || this.props.userInfoStore.getUserInfo()
  }

  render() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    const checked = userInfo.email ? true : false
    return (
      <div className="binding-phone-content">
        <div className="binding-phone-left">
          <div>
            <span className="phone">{userInfo.email || UPEX.lang.template('请添加邮箱')}</span>
              {
                userInfo.email
                ? null
                :<Button><Link to="/user/settingEmail"> {UPEX.lang.template('添加')}</Link></Button>
              }
          </div>
          <div className="message">
            {UPEX.lang.template('郵箱用於登錄、提幣及部分安全設置使用。我們也會給您提供 登錄提醒服務')}
          </div>
          <div style={{display: 'none'}} className="switch">
            {UPEX.lang.template('登录邮件提醒')}&nbsp;&nbsp;&nbsp;<Switch checked={checked}/>
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