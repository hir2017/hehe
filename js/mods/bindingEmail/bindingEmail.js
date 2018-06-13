/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd'
import { Link } from 'react-router'
import Vcodebutton from '../common/authcode-btn'

@inject('userInfoStore', 'captchaStore')
@observer
export default class BindingEmail extends Component {

  constructor() {
    super()
    this.emailChange = this.emailChange.bind(this)
    this.ivCodeChange = this.ivCodeChange.bind(this)
    this.submit = this.submit.bind(this)
    this.vCodeChange = this.vCodeChange.bind(this)
    this.pvCodeChange = this.pvCodeChange.bind(this)
  }

  componentWillMount() {
    this.props.captchaStore.fetch()
  }

  state = {
    email: '',
    vCode: '',
    ivCode: '',
    pvCode: ''
  }

  emailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  vCodeChange(e) {
    this.setState({
      vCode: e.target.value
    })
  }

  ivCodeChange(e) {
    this.setState({
      ivCode: e.target.value
    })
  }

  pvCodeChange(e) {
    this.setState({
      pvCode: e.target.value
    })
  }

  captchaChange() {
    this.props.captchaStore.fetch()
  }

  submit() {
    const codeid = this.props.captchaStore.codeid
    if (!this.state.email) {
      message.error(UPEX.lang.template('邮箱不能为空'))
      return
    }
    if (!this.state.vCode) {
      message.error(UPEX.lang.template('邮箱验证码不能为空'))
      return
    }
    if (!this.state.pvCode) {
      message.error(UPEX.lang.template('手机验证码不能为空'))
      return
    }

    this.props.userInfoStore.bindPEAction(this.state.vCode, this.state.pvCode, this.state.email, 1)
  }

  render() {
    const loading = this.props.userInfoStore.submit_loading
    const codeid = this.props.captchaStore.codeid
    const captcha = this.props.captchaStore.captcha
    return (
      <div>
        <div className="modify-password-title">
          {UPEX.lang.template('绑定邮箱')}
        </div>
        <div className="modify-password-box">
          <div className="item">
            <span className="lable">{UPEX.lang.template('邮箱')}</span>
            <input onChange={this.emailChange} className="input" />
          </div>
          <div className="item v-code">
            <span className="lable">{UPEX.lang.template('图片验证码')}</span>
            <input onChange={this.ivCodeChange} onChange={this.ivCodeChange} className="input" />
          </div>
          <div className="item v-code-button">
            <img onClick={this.captchaChange} src={captcha} />
          </div>
          <div>
            <div className="item">
              <span className="lable">{UPEX.lang.template('邮箱验证码')}</span>
              <input onChange={this.vCodeChange} className="input" />
            </div>
          </div>
          <div>
            <div className="item v-code">
              <span className="lable">{UPEX.lang.template('短信验证码')}</span>
              <input onChange={this.pvCodeChange} className="input" />
            </div>
            <div className="item v-code-button">
              <Vcodebutton message="邮箱不能为空" emailOrphone={this.state.email} areacode='' newBind={true} type={1} imgCode={this.state.ivCode} codeid={codeid} />
            </div>
          </div>
          <div className="massage" style={{display: 'none'}}>
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