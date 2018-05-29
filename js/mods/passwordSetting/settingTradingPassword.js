/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd'
import { Link } from 'react-router'
import Vcodebutton from '../common/sendAuthCodeBtn'

@inject('userInfoStore')
@observer
export default class SettingTradingPassword extends Component {

  constructor () {
    super()
    this.submit = this.submit.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
    this.comfirmChange = this.comfirmChange.bind(this)
    this.vCodeChange = this.vCodeChange.bind(this)
  }

  state = {
    password: '',
    comfirmPwd: '',
    vCode: ''
  }

  passwordChange (e) {
    this.setState({
      password: e.target.value
    })
  }

  comfirmChange (e) {
    this.setState({
      comfirmPwd: e.target.value
    })
  }

  vCodeChange (e) {
    this.setState({
      vCode: e.target.value
    })
  }

  submit () {
    if (!this.state.password) {
      message.error(UPEX.lang.template('交易密码不能为空'))
      return
    }
    if (!this.state.comfirmPwd) {
      message.error(UPEX.lang.template('确认密码不能为空'))
      return
    }
    if (this.state.password !== this.state.comfirmPwd) {
      message.error(UPEX.lang.template('交易密码和确认密码不一致'))
      return
    }
    if (!this.state.vCode) {
      message.error(UPEX.lang.template('短信验证码不能为空'))
      return
    }

    this.props.userInfoStore.bindTradingPwd(this.state.password, this.state.vCode)
  }

  render() {
    const loading = this.props.userInfoStore.submit_loading_tpwd
    return (
      <div>
        <div className="modify-password-title">
          {UPEX.lang.template('設置交易密碼')}
        </div>
        <div className="modify-password-box">
          <div className="item">
            <span className="lable">{UPEX.lang.template('交易密码')}</span>
            <input onChange={this.passwordChange} className="input" />
          </div>
          <div className="item">
            <span className="lable">{UPEX.lang.template('确认密码')}</span>
            <input onChange={this.comfirmChange} className="input" />
          </div>
          <div>
            <div className="item v-code">
              <span className="lable">{UPEX.lang.template('短信验证码')}</span>
              <input onChange={this.vCodeChange} className="input" />
            </div>
            <div className="item v-code-button">
              <Vcodebutton type="phone"/>
            </div>
          </div>
          <div className="massage">
            {UPEX.lang.template('不方便接短信？可使用')}&nbsp;&nbsp;&nbsp;&nbsp;<Link>Google{UPEX.lang.template('驗證碼')}</Link>
          </div>
          <div className="submit">
            <Button loading={loading} onClick={this.submit}>{UPEX.lang.template('提交')}</Button>
          </div>
        </div>
      </div>
    )
  }
}