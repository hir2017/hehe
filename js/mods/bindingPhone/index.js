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
export default class Phone extends Component {

  componentWillMount() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    Object.keys(userInfo).length || this.props.userInfoStore.getUserInfo()
  }

  render() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    const checked = userInfo.phone ? true : false
    return (
      <div className="binding-phone-content">
        <div className="binding-phone-left">
          <div>
            <span className="phone">{userInfo.phone || UPEX.lang.template('请添加手机')}</span>
            <Button>
              {
                userInfo.phone
                ? <Link to="/user/modifyPhone">
                    {UPEX.lang.template('修改')}
                  </Link>
                : <Link to="/user/settingPhone">
                    {UPEX.lang.template('添加')}
                  </Link>
              }
            </Button>
          </div>
          <div className="message">
            {UPEX.lang.template('提現、修改密碼，及安全設置時接收短信使用')}
          </div>
          <div className="switch">
            {UPEX.lang.template('启用登录手机认证')}&nbsp;&nbsp;&nbsp;<Switch checked={checked}/>
          </div>
        </div>
        <div className="binding-phone-right">
          <ul>
            <li>※{UPEX.lang.template('為了您的安全或者降低手機遺失的風險，請在綁定手機號后立即綁定Google驗證器')}。</li>
            <li>※{UPEX.lang.template('為了您的資金安全，修改手機綁定后，24小時內不可以提現提幣')}</li>
          </ul>
        </div>
      </div>
    )
  }
}