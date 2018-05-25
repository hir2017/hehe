/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input } from 'antd'
import Steps from './steps'

@observer
export default class FirstStep extends Component {

  render() {
    return (
      <div>
        <Steps />
        <div className="item one-item">
          <span className="lable">
          真实姓名
          </span>
          <span className="input">
            <Input />
            <span></span>
            <span className="message">
              *{UPEX.lang.template('填写之姓名必须与日后提领的银行账户名相同')}
            </span>
          </span>
        </div>
        <div>
        <span>
          </span>
          <span>
          </span>
        </div>
        <div>
        <span>
          </span>
          <span>
          </span>
        </div>
      </div>
    )
  }

}