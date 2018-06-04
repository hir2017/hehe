/**
 * @fileoverview  google
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch } from 'antd'
import { Link } from 'react-router'

@observer
export default class Success extends Component {
  render() {
    return (
      <div className="binding-phone-content">
        <div className="binding-phone-left">
          <div>
            <span className="phone google">{UPEX.lang.template('重置 Google验证器')}</span>
            <Button>
              <Link to="/user/rmbindingGoogle">
                {UPEX.lang.template('解绑')}
              </Link>
            </Button>
          </div>
          <div className="message">
            {UPEX.lang.template('提现，修改密码，及安全设置时用以输入谷歌验证码')}
          </div>
          <div className="switch">
            {UPEX.lang.template('开启Google验证')}&nbsp;&nbsp;&nbsp;<Switch checked={true}/>
          </div>
        </div>
        <div className="binding-phone-right">
          <ul>
            <li className="google-info-link">
              {UPEX.lang.template('使用Google认证请详细阅读')}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/user/googleGuide">
                {UPEX.lang.template('使用指南')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}