/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd'
import { Link } from 'react-router'

@observer
export default class ModifyEmail extends Component {
  render() {
    return (
      <div>
        <div className="modify-password-title">
          {UPEX.lang.template('修改绑定邮箱')}
        </div>
        <div className="modify-password-box">
          <div className="item">
            <span className="lable">{UPEX.lang.template('新邮箱')}</span>
            <input className="input email-content" />
          </div>
          <div>
            <div className="item v-code">
              <span className="lable">{UPEX.lang.template('邮箱验证码')}</span>
              <input className="input" />
            </div>
            <div className="item v-code-button">
              {UPEX.lang.template('发送验证码')}
            </div>
            <div className="item v-code">
              <span className="lable">{UPEX.lang.template('短信确认码')}</span>
              <input className="input" />
            </div>
            <div className="item v-code-button">
              {UPEX.lang.template('发送确认码')}
            </div>
          </div>
          <div className="massage" style={{display: 'none'}}>
            {UPEX.lang.template('不方便接短信？可使用')}&nbsp;&nbsp;&nbsp;&nbsp;<Link>Google{UPEX.lang.template('驗證碼')}</Link>
          </div>
          <div className="submit">
            <Button>{UPEX.lang.template('提交')}</Button>
          </div>
        </div>
      </div>
    )
  }
}
