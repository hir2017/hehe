/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd'

let time

@inject('userInfoStore')
@observer
export default class SettingTradingPassword extends Component {

  constructor() {
    super()
    this.sendCode = this.sendCode.bind(this)
  }

  state = {
    num: 60,
    show: true
  }

  get type() {
    switch (this.props.type) {
      case 'phone' : return 2; break;
      case 'email' : return 1; break;
      default : break;
    }
  }

  async sendCode() {
    const res = await this.props.userInfoStore.sendCode(this.type)
    if (res.status === 200) {
      const ctx = this;
      this.setState({
        show: false
      })
      time = setInterval(() => {
        let num = ctx.state.num
        console.log(num, 'num')
        ctx.setState({
          num: num - 1
        })
        if (num === 1) {
          clearInterval(time)
          ctx.setState({
            num: 60,
            show: true
          })
        }
      }, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(time)
  }

  render() {
    return (
      <div>
        {
          this.state.show
            ? <div onClick={this.sendCode} className="send-v-code-button">
              {UPEX.lang.template('发送验证码')}
            </div>
            : <div className="send-v-code-button">
              {this.state.num}
            </div>
        }
      </div>
    )
  }
}