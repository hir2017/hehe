/**
 * @fileoverview  google 认证
 * @author xia xiang feng
 * @date 2018-05-25
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd'
import { Link } from 'react-router'

@observer
class Google extends Component {
  render() {
    return (
      <div className="google-auth-box">
        <div className="google-auth-message">
          <span className="error-message">*</span>
          {UPEX.lang.template('为了您的资金安全，修改Google验证码后，24小时不可以提币')}
        </div>
        <div>
          <div className="google-auth-left">
            <img src="123.pgn" />
            <div>5MAAZSWQB5FNC2DA</div>
          </div>
          <div className="google-auth-right">
            <div className="modify-password-box">
              <div className="item">
                <span className="lable">{UPEX.lang.template('Google验证码')}</span>
                <input className="input" />
              </div>
              <div className="item v-code">
                <span className="lable">{UPEX.lang.template('短信验证码')}</span>
                <input className="input" />
              </div>
              <div className="item v-code-button">
                {UPEX.lang.template('发送验证码')}
              </div>
              <div className="info">
                <Link to="">
                  Google{UPEX.lang.template('验证器使用教程')}
                </Link>
              </div>
              <div>
                <Button>{UPEX.lang.template('绑定')}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Google;