/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd'
import Steps from './steps'

@observer
export default class ThirdStep extends Component {

  render() {
    return (
      <div>
        <Steps />
        <div className="await-examine">
          <span>{UPEX.lang.template('已接受到您的信息，我们正在权力审核中')}……</span>
          <span>{UPEX.lang.template('一般状况下，审核周期为3个工作内')}</span>
        </div>
        <div>
          <div className="submit">
            <Button>{UPEX.lang.template('撤回重新提交')}</Button>
          </div>
        </div>
      </div>
    )
  }

}