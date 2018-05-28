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
export default class ReBinding extends Component {
  render() {
    return (
      <div>
        <div className="google-auth-title">
          {UPEX.lang.template('重置google验证器')}
        </div>
        <div className="binding-phone-content">
          <div className="binding-phone-left reBinding-left">
            <img src="13.png" />
            <div>
              <div className="key-title">Google{UPEX.lang.template('密鑰')}</div>
              <div className="key">5MAAZSWQB5FNC2DA</div>
              <div className="key-message">{UPEX.lang.template('請將密鑰記錄在紙上并安全的保存')}</div>
            </div>
          </div>
          <div className="binding-phone-right reBinding-right">
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