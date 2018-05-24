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
export default class ModifyPassword extends Component {
  render() {
    return (
      <div>
        <div className="modify-password-title">
          {UPEX.lang.template('修改登錄密碼')}
        </div>
        <div className="modify-password-box">
          <div className="item">
            <span className="lable">登陆密码</span>
            <input className="input" />
          </div>
          <div className="item">
            <span className="lable">新登陆密码</span>
            <input className="input" />
          </div>
          <div className="item">
            <span className="lable">确认密码</span>
            <input className="input" />
          </div>
          <div>
            <div className="item v-code">
              <span className="lable">短信验证码</span>
              <input className="input" />
            </div>
            <div className="item v-code-button">
              发送验证码
            </div>
          </div>
          <div className="massage">
            不方便接短信？可使用&nbsp;&nbsp;&nbsp;&nbsp;<Link>Google驗證碼</Link>
          </div>
          <div className="submit">
            <Button>提交</Button>
          </div>
        </div>
      </div>
    )
  }
}