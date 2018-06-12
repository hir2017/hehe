/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd'
import Steps from './steps'

@inject('userInfoStore')
@observer
export default class ThirdStep extends Component {

  constructor() {
    super()
    this.next = this.next.bind(this)
  }

  next() {
    this.props.changeStep(1)
  }

  render() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    return (
      <div>
        <Steps step={3} />
        {
          userInfo.isAuthPrimary == 1
            ?
            <div className="await-examine">
              <span>{UPEX.lang.template('已接受到您的信息，我们正在权力审核中')}……</span>
              <span>{UPEX.lang.template('一般状况下，审核周期为3个工作内')}</span>
            </div>
            : <div className="await-examine">
              <span>{UPEX.lang.template('您的申请审核失败了，失败原因是')}</span>
              <span>{userInfo.authFailReason}</span>
              <span>{UPEX.lang.template('请重新提交审核申请')}</span>
            </div>
        }
        <div>
          <div className="submit">
            {
              userInfo.isAuthPrimary == 1
                ? <Button onClick={this.next}>{UPEX.lang.template('撤回重新提交')}</Button>
                : <Button onClick={this.next}>{UPEX.lang.template('重新提交')}</Button>
            }
          </div>
        </div>
      </div>
    )
  }

}